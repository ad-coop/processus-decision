import type { CriterionId, CriterionValue, DecisionProcess, ProcessValue } from '../data/processes';

export interface ScoredProcess {
  process: DecisionProcess;
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
    if (userValue === undefined) {
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
      return { process, score, percentage };
    })
    .sort((a, b) => b.score - a.score);

  return scoredProcesses;
}

// Keep the first tier with enough matches: 1+ at 90%, 2+ at 80%, 3+ at 60%; otherwise the top 5
const THRESHOLD_TIERS = [
  [90, 1],
  [80, 2],
  [60, 3],
];

export function filterByThreshold(scoredProcesses: ScoredProcess[]): ScoredProcess[] {
  for (const [threshold, minCount] of THRESHOLD_TIERS) {
    const matches = scoredProcesses.filter((p) => p.percentage >= threshold);
    if (matches.length >= minCount) {
      return matches;
    }
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
