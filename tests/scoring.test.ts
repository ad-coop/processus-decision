import { describe, it, expect } from 'vitest';
import {
  scoreProcess,
  rankProcesses,
  selectTopProcesses,
  ScoredProcess,
} from '../src/utils/scoring';
import { DecisionProcess } from '../src/data/processes';

const mockProcess: DecisionProcess = {
  name: 'Test Process',
  criteria: {
    'temps-disponible': 3,
    'niveau-enjeu': [2, 4],
    simplicite: '*',
    'taille-groupe': 2,
    'niveau-adhesion': [1, 3],
    'besoin-creativite': 4,
    'sujet-conflictuel': 3,
    asynchrone: 5,
  },
};

describe('scoreProcess', () => {
  describe('single value scoring', () => {
    it('returns 5 for exact match', () => {
      const score = scoreProcess(mockProcess, { 'temps-disponible': 3 });
      expect(score).toBe(5);
    });

    it('returns 5 - distance for non-match', () => {
      const score = scoreProcess(mockProcess, { 'temps-disponible': 1 });
      expect(score).toBe(3);
    });

    it('returns 0 for distance >= 5', () => {
      const score = scoreProcess(mockProcess, { 'temps-disponible': 10 });
      expect(score).toBe(0);
    });
  });

  describe('range value scoring', () => {
    it('returns 5 when user value is within range', () => {
      const score = scoreProcess(mockProcess, { 'niveau-enjeu': 3 });
      expect(score).toBe(5);
    });

    it('returns 5 when user value equals min', () => {
      const score = scoreProcess(mockProcess, { 'niveau-enjeu': 2 });
      expect(score).toBe(5);
    });

    it('returns 5 when user value equals max', () => {
      const score = scoreProcess(mockProcess, { 'niveau-enjeu': 4 });
      expect(score).toBe(5);
    });

    it('returns 5 - distance when user value is below min', () => {
      const score = scoreProcess(mockProcess, { 'niveau-enjeu': 1 });
      expect(score).toBe(4);
    });

    it('returns 5 - distance when user value is above max', () => {
      const score = scoreProcess(mockProcess, { 'niveau-enjeu': 5 });
      expect(score).toBe(4);
    });
  });

  describe('wildcard value scoring', () => {
    it('returns 5 for any user value', () => {
      expect(scoreProcess(mockProcess, { simplicite: 1 })).toBe(5);
      expect(scoreProcess(mockProcess, { simplicite: 3 })).toBe(5);
      expect(scoreProcess(mockProcess, { simplicite: 5 })).toBe(5);
    });
  });

  describe('multiple criteria', () => {
    it('sums scores for all selected criteria', () => {
      const score = scoreProcess(mockProcess, {
        'temps-disponible': 3,
        'niveau-enjeu': 3,
      });
      expect(score).toBe(10);
    });

    it('ignores unselected criteria', () => {
      const score = scoreProcess(mockProcess, { 'temps-disponible': 3 });
      expect(score).toBe(5);
    });

    it('handles empty criteria', () => {
      const score = scoreProcess(mockProcess, {});
      expect(score).toBe(0);
    });
  });
});

describe('rankProcesses', () => {
  const processes: DecisionProcess[] = [
    {
      name: 'Process A',
      criteria: {
        'temps-disponible': 1,
        'niveau-enjeu': 1,
        simplicite: 1,
        'taille-groupe': 1,
        'niveau-adhesion': 1,
        'besoin-creativite': 1,
        'sujet-conflictuel': 1,
        asynchrone: 1,
      },
    },
    {
      name: 'Process B',
      criteria: {
        'temps-disponible': 3,
        'niveau-enjeu': 3,
        simplicite: 3,
        'taille-groupe': 3,
        'niveau-adhesion': 3,
        'besoin-creativite': 3,
        'sujet-conflictuel': 3,
        asynchrone: 3,
      },
    },
    {
      name: 'Process C',
      criteria: {
        'temps-disponible': 5,
        'niveau-enjeu': 5,
        simplicite: 5,
        'taille-groupe': 5,
        'niveau-adhesion': 5,
        'besoin-creativite': 5,
        'sujet-conflictuel': 5,
        asynchrone: 5,
      },
    },
  ];

  it('ranks processes by score in descending order', () => {
    const ranked = rankProcesses(processes, { 'temps-disponible': 3 });

    expect(ranked[0].name).toBe('Process B');
    expect(ranked[0].score).toBe(5);
    expect(ranked[1].name).toBe('Process A');
    expect(ranked[1].score).toBe(3);
    expect(ranked[2].name).toBe('Process C');
    expect(ranked[2].score).toBe(3);
  });

  it('returns all processes with their scores', () => {
    const ranked = rankProcesses(processes, { 'temps-disponible': 1 });

    expect(ranked).toHaveLength(3);
    expect(ranked[0].name).toBe('Process A');
    expect(ranked[0].score).toBe(5);
  });
});

describe('selectTopProcesses', () => {
  it('returns all processes when there are 3 or fewer', () => {
    const processes: ScoredProcess[] = [
      { name: 'A', score: 10 },
      { name: 'B', score: 8 },
    ];

    const selected = selectTopProcesses(processes);
    expect(selected).toHaveLength(2);
  });

  it('returns top 3 when no ex-aequo at position 3', () => {
    const processes: ScoredProcess[] = [
      { name: 'A', score: 10 },
      { name: 'B', score: 8 },
      { name: 'C', score: 6 },
      { name: 'D', score: 4 },
      { name: 'E', score: 2 },
    ];

    const selected = selectTopProcesses(processes);
    expect(selected).toHaveLength(3);
    expect(selected.map((p) => p.name)).toEqual(['A', 'B', 'C']);
  });

  it('includes ex-aequo processes up to 5', () => {
    const processes: ScoredProcess[] = [
      { name: 'A', score: 10 },
      { name: 'B', score: 8 },
      { name: 'C', score: 6 },
      { name: 'D', score: 6 },
      { name: 'E', score: 6 },
      { name: 'F', score: 4 },
    ];

    const selected = selectTopProcesses(processes);
    expect(selected).toHaveLength(5);
    expect(selected.map((p) => p.name)).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('limits to 5 even when more ex-aequo exist', () => {
    const processes: ScoredProcess[] = [
      { name: 'A', score: 10 },
      { name: 'B', score: 8 },
      { name: 'C', score: 6 },
      { name: 'D', score: 6 },
      { name: 'E', score: 6 },
      { name: 'F', score: 6 },
      { name: 'G', score: 6 },
    ];

    const selected = selectTopProcesses(processes);
    expect(selected).toHaveLength(5);
  });

  it('handles exact 3 processes', () => {
    const processes: ScoredProcess[] = [
      { name: 'A', score: 10 },
      { name: 'B', score: 8 },
      { name: 'C', score: 6 },
    ];

    const selected = selectTopProcesses(processes);
    expect(selected).toHaveLength(3);
  });
});
