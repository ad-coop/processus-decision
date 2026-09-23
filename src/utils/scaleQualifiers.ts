import type { CriterionId, ProcessValue } from '../data/processes';

/**
 * Gets the positions (1-10) that should be colored for a given 0-5 process value
 */
export function getScalePositions(value: ProcessValue): number[] {
  if (value === '*') {
    return [];
  }

  const [min, max] = Array.isArray(value) ? value : [value, value];
  const from = Math.round(min * 2);
  return Array.from({ length: Math.round(max * 2) - from + 1 }, (_, i) => from + i);
}

export const SCALE_LABELS: Record<CriterionId, string> = {
  'temps-disponible': 'Rapidit\u00e9',
  'niveau-enjeu': "Niveau d'enjeu",
  simplicite: 'Simplicit\u00e9',
  'taille-groupe': 'Taille de groupe id\u00e9ale',
  'niveau-adhesion': "Niveau d'adh\u00e9sion",
  'besoin-creativite': 'Besoin de cr\u00e9ativit\u00e9',
  'sujet-conflictuel': 'Sujet conflictuel',
  asynchrone: 'Asynchrone',
};

/**
 * Qualifiers for each criterion, one per pair of positions on the 1-10 scale (1-2, 3-4, ...)
 * Spec lines 86-110
 */
const QUALIFIERS: Record<CriterionId, string[]> = {
  'temps-disponible': [
    'Instantané',
    'Quelques minutes',
    'Quelques heures',
    'Quelques jours',
    'Plusieurs semaines',
  ],
  'niveau-enjeu': [
    'Enjeu faible',
    'Enjeu modéré',
    'Enjeu important',
    'Enjeu fort',
    'Enjeu très fort',
  ],
  simplicite: ['Très simple', 'Simple', 'Moyennement complexe', 'Complexe', 'Très complexe'],
  'taille-groupe': [
    'Petit groupe (4 pers.)',
    'Groupe moyen (8 pers.)',
    'Grand groupe (20 pers.)',
    'Très grand groupe (50 pers.)',
    'Groupe massif (50+ pers.)',
  ],
  'niveau-adhesion': [
    'Adhésion faible',
    'Adhésion modérée',
    'Bonne adhésion',
    'Forte adhésion',
    'Très forte adhésion',
  ],
  'besoin-creativite': [
    'Peu de créativité',
    'Créativité modérée',
    'Créativité importante',
    'Forte créativité',
    'Très forte créativité',
  ],
  'sujet-conflictuel': [
    'Non adapté aux conflits',
    'Déconseillé si conflit',
    'Possible avec précaution',
    'Adapté en cas de tensions',
    'Idéal en situation de conflits',
  ],
  asynchrone: [
    'Réunion nécessaire',
    'Difficile à distance',
    'Partiellement possible',
    'Facilement à distance',
    'Totalement asynchrone',
  ],
};

function getQualifierForPosition(criterionId: CriterionId, position: number): string {
  return QUALIFIERS[criterionId][
    Math.min(Math.max(Math.ceil(position / 2), 1), 5) - 1
  ].toLowerCase();
}

/**
 * Generates an accessibility label for screen readers
 * Format: "[Criterion label]: [qualifier for ideal range]. [Extended range qualifier if applicable]."
 *
 * Examples:
 * - Single value: "Rapidité: réalisable en quelques heures"
 * - Range: "Rapidité: idéal en quelques heures, acceptable en quelques jours"
 */
export function generateAccessibilityLabel(criterionId: CriterionId, value: ProcessValue): string {
  const criterionLabel = SCALE_LABELS[criterionId];
  if (value === '*') {
    return `${criterionLabel}: Variable`;
  }

  const positions = getScalePositions(value);
  const ideal = getQualifierForPosition(criterionId, positions[0]);
  const acceptable = getQualifierForPosition(criterionId, positions[positions.length - 1]);

  return ideal === acceptable
    ? `${criterionLabel}: ${ideal}`
    : `${criterionLabel}: idéal ${ideal}, acceptable ${acceptable}`;
}
