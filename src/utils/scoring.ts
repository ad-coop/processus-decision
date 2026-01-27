import type { CriterionId, CriterionValue, DecisionProcess, ProcessValue } from '../data/processes';

export interface ScoredProcess {
  name: string;
  score: number;
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
  const scoredProcesses = processes
    .map((process) => ({
      name: process.name,
      score: scoreProcess(process, userCriteria),
    }))
    .sort((a, b) => b.score - a.score);

  return scoredProcesses;
}

export function selectTopProcesses(scoredProcesses: ScoredProcess[]): ScoredProcess[] {
  if (scoredProcesses.length <= 3) {
    return scoredProcesses;
  }

  const thirdPlaceScore = scoredProcesses[2].score;

  const result: ScoredProcess[] = [];
  for (let i = 0; i < scoredProcesses.length && result.length < 5; i++) {
    const process = scoredProcesses[i];
    if (i < 3 || process.score === thirdPlaceScore) {
      result.push(process);
    } else {
      break;
    }
  }

  return result;
}
