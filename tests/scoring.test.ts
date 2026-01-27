import { describe, it, expect } from 'vitest';
import {
  scoreProcess,
  rankProcesses,
  filterByThreshold,
  assignRanks,
  ScoredProcess,
} from '../src/utils/scoring';
import { DecisionProcess } from '../src/data/processes';

const mockProcess: DecisionProcess = {
  name: 'Test Process',
  criteria: {
    'temps-disponible': { value: 3, label: 'Heures' },
    'niveau-enjeu': { value: [2, 4], label: 'Faible à Fort' },
    simplicite: { value: '*', label: 'Variable' },
    'taille-groupe': { value: 2, label: '~8 personnes' },
    'niveau-adhesion': { value: [1, 3], label: 'Faible à Moyen' },
    'besoin-creativite': { value: 4, label: 'Fort' },
    'sujet-conflictuel': { value: 3, label: 'Variable' },
    asynchrone: { value: 5, label: 'Oui' },
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
        'temps-disponible': { value: 1, label: 'Instantané' },
        'niveau-enjeu': { value: 1, label: 'Faible' },
        simplicite: { value: 1, label: 'Simple' },
        'taille-groupe': { value: 1, label: '~4 personnes' },
        'niveau-adhesion': { value: 1, label: 'Faible' },
        'besoin-creativite': { value: 1, label: 'Aucun' },
        'sujet-conflictuel': { value: 1, label: 'Non adapté' },
        asynchrone: { value: 1, label: 'Non' },
      },
    },
    {
      name: 'Process B',
      criteria: {
        'temps-disponible': { value: 3, label: 'Heures' },
        'niveau-enjeu': { value: 3, label: 'Moyen' },
        simplicite: { value: 3, label: 'Moyen' },
        'taille-groupe': { value: 3, label: '4 à 20 personnes' },
        'niveau-adhesion': { value: 3, label: 'Moyen' },
        'besoin-creativite': { value: 3, label: 'Moyen' },
        'sujet-conflictuel': { value: 3, label: 'Variable' },
        asynchrone: { value: 3, label: 'Possible' },
      },
    },
    {
      name: 'Process C',
      criteria: {
        'temps-disponible': { value: 5, label: 'Semaines' },
        'niveau-enjeu': { value: 5, label: 'Très fort' },
        simplicite: { value: 5, label: 'Complexe' },
        'taille-groupe': { value: 5, label: 'Milliers' },
        'niveau-adhesion': { value: 5, label: 'Fort' },
        'besoin-creativite': { value: 5, label: 'Fort' },
        'sujet-conflictuel': { value: 5, label: 'Adapté' },
        asynchrone: { value: 5, label: 'Oui' },
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

  describe('percentage calculation', () => {
    it('calculates percentage based on max possible score', () => {
      const ranked = rankProcesses(processes, { 'temps-disponible': 3 });

      expect(ranked[0].percentage).toBe(100);
      expect(ranked[1].percentage).toBe(60);
      expect(ranked[2].percentage).toBe(60);
    });

    it('calculates percentage correctly with multiple criteria', () => {
      const ranked = rankProcesses(processes, {
        'temps-disponible': 3,
        'niveau-enjeu': 3,
      });

      expect(ranked[0].percentage).toBe(100);
    });

    it('returns 0 percentage when no criteria selected', () => {
      const ranked = rankProcesses(processes, {});

      expect(ranked[0].percentage).toBe(0);
    });
  });
});

describe('filterByThreshold', () => {
  it('returns empty array for empty input', () => {
    const filtered = filterByThreshold([]);
    expect(filtered).toHaveLength(0);
  });

  describe('90% threshold (at least 1 result)', () => {
    it('shows all results >= 90% when at least one exists', () => {
      const processes: ScoredProcess[] = [
        { name: 'A', score: 10, percentage: 95 },
        { name: 'B', score: 9, percentage: 92 },
        { name: 'C', score: 7, percentage: 75 },
        { name: 'D', score: 6, percentage: 60 },
      ];

      const filtered = filterByThreshold(processes);
      expect(filtered).toHaveLength(2);
      expect(filtered.map((p) => p.name)).toEqual(['A', 'B']);
    });

    it('shows single result at exactly 90%', () => {
      const processes: ScoredProcess[] = [
        { name: 'A', score: 9, percentage: 90 },
        { name: 'B', score: 8, percentage: 85 },
        { name: 'C', score: 7, percentage: 75 },
      ];

      const filtered = filterByThreshold(processes);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('A');
    });
  });

  describe('80% threshold (at least 2 results)', () => {
    it('shows all results >= 80% when at least 2 exist', () => {
      const processes: ScoredProcess[] = [
        { name: 'A', score: 8, percentage: 85 },
        { name: 'B', score: 8, percentage: 85 },
        { name: 'C', score: 7, percentage: 70 },
        { name: 'D', score: 5, percentage: 50 },
      ];

      const filtered = filterByThreshold(processes);
      expect(filtered).toHaveLength(2);
      expect(filtered.map((p) => p.name)).toEqual(['A', 'B']);
    });

    it('does not use 80% threshold if only 1 result meets it, falls to 60% threshold', () => {
      const processes: ScoredProcess[] = [
        { name: 'A', score: 8, percentage: 85 },
        { name: 'B', score: 7, percentage: 70 },
        { name: 'C', score: 6, percentage: 65 },
        { name: 'D', score: 6, percentage: 62 },
      ];

      const filtered = filterByThreshold(processes);
      expect(filtered).toHaveLength(4);
      expect(filtered.map((p) => p.name)).toEqual(['A', 'B', 'C', 'D']);
    });
  });

  describe('60% threshold (at least 3 results)', () => {
    it('shows all results >= 60% when at least 3 exist', () => {
      const processes: ScoredProcess[] = [
        { name: 'A', score: 6, percentage: 65 },
        { name: 'B', score: 6, percentage: 62 },
        { name: 'C', score: 6, percentage: 61 },
        { name: 'D', score: 5, percentage: 55 },
        { name: 'E', score: 4, percentage: 40 },
      ];

      const filtered = filterByThreshold(processes);
      expect(filtered).toHaveLength(3);
      expect(filtered.map((p) => p.name)).toEqual(['A', 'B', 'C']);
    });

    it('does not use 60% threshold if only 2 results meet it', () => {
      const processes: ScoredProcess[] = [
        { name: 'A', score: 6, percentage: 65 },
        { name: 'B', score: 6, percentage: 62 },
        { name: 'C', score: 5, percentage: 55 },
        { name: 'D', score: 5, percentage: 50 },
        { name: 'E', score: 4, percentage: 45 },
        { name: 'F', score: 4, percentage: 40 },
      ];

      const filtered = filterByThreshold(processes);
      expect(filtered).toHaveLength(5);
    });
  });

  describe('fallback to top 5', () => {
    it('returns top 5 when no threshold is met', () => {
      const processes: ScoredProcess[] = [
        { name: 'A', score: 5, percentage: 55 },
        { name: 'B', score: 5, percentage: 50 },
        { name: 'C', score: 4, percentage: 45 },
        { name: 'D', score: 4, percentage: 40 },
        { name: 'E', score: 3, percentage: 35 },
        { name: 'F', score: 3, percentage: 30 },
      ];

      const filtered = filterByThreshold(processes);
      expect(filtered).toHaveLength(5);
      expect(filtered.map((p) => p.name)).toEqual(['A', 'B', 'C', 'D', 'E']);
    });

    it('returns all if fewer than 5 processes', () => {
      const processes: ScoredProcess[] = [
        { name: 'A', score: 5, percentage: 55 },
        { name: 'B', score: 5, percentage: 50 },
        { name: 'C', score: 4, percentage: 45 },
      ];

      const filtered = filterByThreshold(processes);
      expect(filtered).toHaveLength(3);
    });
  });
});

describe('assignRanks', () => {
  it('assigns sequential ranks for different scores', () => {
    const processes: ScoredProcess[] = [
      { name: 'A', score: 10, percentage: 100 },
      { name: 'B', score: 8, percentage: 80 },
      { name: 'C', score: 6, percentage: 60 },
    ];

    const ranks = assignRanks(processes);
    expect(ranks).toEqual([1, 2, 3]);
  });

  it('assigns same rank for tied scores (competition ranking)', () => {
    const processes: ScoredProcess[] = [
      { name: 'A', score: 10, percentage: 100 },
      { name: 'B', score: 8, percentage: 85 },
      { name: 'C', score: 8, percentage: 85 },
      { name: 'D', score: 6, percentage: 60 },
    ];

    const ranks = assignRanks(processes);
    expect(ranks).toEqual([1, 2, 2, 4]);
  });

  it('handles all tied scores', () => {
    const processes: ScoredProcess[] = [
      { name: 'A', score: 8, percentage: 80 },
      { name: 'B', score: 8, percentage: 80 },
      { name: 'C', score: 8, percentage: 80 },
    ];

    const ranks = assignRanks(processes);
    expect(ranks).toEqual([1, 1, 1]);
  });

  it('handles empty array', () => {
    const ranks = assignRanks([]);
    expect(ranks).toEqual([]);
  });

  it('handles single process', () => {
    const processes: ScoredProcess[] = [{ name: 'A', score: 10, percentage: 100 }];

    const ranks = assignRanks(processes);
    expect(ranks).toEqual([1]);
  });

  it('handles multiple tie groups', () => {
    const processes: ScoredProcess[] = [
      { name: 'A', score: 10, percentage: 100 },
      { name: 'B', score: 10, percentage: 100 },
      { name: 'C', score: 8, percentage: 80 },
      { name: 'D', score: 8, percentage: 80 },
      { name: 'E', score: 6, percentage: 60 },
    ];

    const ranks = assignRanks(processes);
    expect(ranks).toEqual([1, 1, 3, 3, 5]);
  });
});
