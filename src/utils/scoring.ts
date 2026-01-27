import type { CriterionId, CriterionValue, DecisionProcess, ProcessValue } from '../data/processes';

export interface ScoredProcess {
  name: string;
  score: number;
  percentage: number;
}

export type UserCriteria = Partial<Record<CriterionId, number>>;

function calculateCriterionScore(userValue: number, processValue: ProcessValue): number {
  if (processValue === '*') {
    return 5;
  }

  if (Array.isArray(processValue)) {
    const [min, max] = processValue;
    if (userValue >= min && userValue <= max) {
      return 5;
    }
    const distance = Math.min(Math.abs(userValue - min), Math.abs(userValue - max));
    return Math.max(0, 5 - distance);
  }

  const distance = Math.abs(userValue - processValue);
  return Math.max(0, 5 - distance);
}

export function scoreProcess(process: DecisionProcess, userCriteria: UserCriteria): number {
  let totalScore = 0;

  for (const [criterionId, userValue] of Object.entries(userCriteria)) {
    if (userValue === undefined || userValue === null) {
      continue;
    }

    const criterionValue: CriterionValue = process.criteria[criterionId as CriterionId];
    totalScore += calculateCriterionScore(userValue, criterionValue.value);
  }

  return totalScore;
}

export function rankProcesses(
  processes: DecisionProcess[],
  userCriteria: UserCriteria
): ScoredProcess[] {
  const criteriaCount = Object.keys(userCriteria).length;
  const maxPossibleScore = 5 * criteriaCount;

  const scoredProcesses = processes
    .map((process) => {
      const score = scoreProcess(process, userCriteria);
      const percentage = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
      return {
        name: process.name,
        score,
        percentage,
      };
    })
    .sort((a, b) => b.score - a.score);

  return scoredProcesses;
}

export function filterByThreshold(scoredProcesses: ScoredProcess[]): ScoredProcess[] {
  if (scoredProcesses.length === 0) {
    return [];
  }

  const countAtOrAbove = (threshold: number) =>
    scoredProcesses.filter((p) => p.percentage >= threshold).length;

  const filterAtOrAbove = (threshold: number) =>
    scoredProcesses.filter((p) => p.percentage >= threshold);

  if (countAtOrAbove(90) >= 1) {
    return filterAtOrAbove(90);
  }

  if (countAtOrAbove(80) >= 2) {
    return filterAtOrAbove(80);
  }

  if (countAtOrAbove(60) >= 3) {
    return filterAtOrAbove(60);
  }

  return scoredProcesses.slice(0, 5);
}

export function assignRanks(scoredProcesses: ScoredProcess[]): number[] {
  const ranks: number[] = [];
  let currentRank = 1;

  for (let i = 0; i < scoredProcesses.length; i++) {
    if (i === 0) {
      ranks.push(currentRank);
    } else if (scoredProcesses[i].percentage === scoredProcesses[i - 1].percentage) {
      ranks.push(ranks[i - 1]);
    } else {
      currentRank = i + 1;
      ranks.push(currentRank);
    }
  }

  return ranks;
}
