import type { CriterionId, ProcessValue } from '../data/processes';

/**
 * Converts a 0-5 scale value to 1-10 scale by doubling
 */
export function convertToTenScale(value: number): number {
  return value * 2;
}

/**
 * Gets the range of positions (1-10) that should be colored for a given process value
 */
export function getScalePositions(value: ProcessValue): {
  primary: number[]; // Dark blue positions
  secondary: number[]; // Light blue positions
} {
  if (value === '*') {
    return { primary: [], secondary: [] };
  }

  if (Array.isArray(value)) {
    // Range: [min, max]
    const [min, max] = value;
    const minPos = Math.round(convertToTenScale(min));
    const maxPos = Math.round(convertToTenScale(max));

    // Primary range: the core optimal range
    const primary: number[] = [];
    for (let i = minPos; i <= maxPos; i++) {
      primary.push(i);
    }

    // For now, no secondary range (can be extended later if needed)
    return { primary, secondary: [] };
  }

  // Single value
  const position = Math.round(convertToTenScale(value));
  return { primary: [position], secondary: [] };
}

/**
 * Qualifier mappings for each criterion based on the 1-10 scale
 * Spec lines 86-110
 */
const QUALIFIERS: Record<CriterionId, Record<string, string>> = {
  'temps-disponible': {
    '1-2': 'Instantané',
    '3-4': 'Quelques minutes',
    '5-6': 'Quelques heures',
    '7-8': 'Quelques jours',
    '9-10': 'Plusieurs semaines',
  },
  'niveau-enjeu': {
    '1-2': 'Enjeu faible',
    '3-4': 'Enjeu modéré',
    '5-6': 'Enjeu important',
    '7-8': 'Enjeu fort',
    '9-10': 'Enjeu très fort',
  },
  simplicite: {
    '1-2': 'Très simple',
    '3-4': 'Simple',
    '5-6': 'Moyennement complexe',
    '7-8': 'Complexe',
    '9-10': 'Très complexe',
  },
  'taille-groupe': {
    '1-2': 'Petit groupe (4 pers.)',
    '3-4': 'Groupe moyen (8 pers.)',
    '5-6': 'Grand groupe (20 pers.)',
    '7-8': 'Très grand groupe (50 pers.)',
    '9-10': 'Groupe massif (50+ pers.)',
  },
  'niveau-adhesion': {
    '1-2': 'Adhésion faible',
    '3-4': 'Adhésion modérée',
    '5-6': 'Bonne adhésion',
    '7-8': 'Forte adhésion',
    '9-10': 'Très forte adhésion',
  },
  'besoin-creativite': {
    '1-2': 'Peu de créativité',
    '3-4': 'Créativité modérée',
    '5-6': 'Créativité importante',
    '7-8': 'Forte créativité',
    '9-10': 'Très forte créativité',
  },
  'sujet-conflictuel': {
    '1-2': 'Non adapté aux conflits',
    '3-4': 'Déconseillé si conflit',
    '5-6': 'Possible avec précaution',
    '7-8': 'Adapté en cas de tensions',
    '9-10': 'Idéal en situation de conflits',
  },
  asynchrone: {
    '1-2': 'Réunion nécessaire',
    '3-4': 'Difficile à distance',
    '5-6': 'Partiellement possible',
    '7-8': 'Facilement à distance',
    '9-10': 'Totalement asynchrone',
  },
};

/**
 * Gets the qualifier for a given position (1-10) on a criterion scale
 */
function getQualifierForPosition(criterionId: CriterionId, position: number): string {
  const qualifiers = QUALIFIERS[criterionId];

  if (position <= 2) return qualifiers['1-2'];
  if (position <= 4) return qualifiers['3-4'];
  if (position <= 6) return qualifiers['5-6'];
  if (position <= 8) return qualifiers['7-8'];
  return qualifiers['9-10'];
}

/**
 * Generates an accessibility label for screen readers
 * Format: "[Criterion label]: [qualifier for ideal range]. [Extended range qualifier if applicable]."
 *
 * Examples:
 * - Single value: "Rapidité: réalisable en quelques heures"
 * - Range: "Rapidité: idéal en quelques heures, acceptable en quelques jours"
 */
export function generateAccessibilityLabel(criterionLabel: string, value: ProcessValue): string {
  if (value === '*') {
    return `${criterionLabel}: Variable`;
  }

  const criterionId = getCriterionIdFromLabel(criterionLabel);
  if (!criterionId) {
    return `${criterionLabel}: Non disponible`;
  }

  if (Array.isArray(value)) {
    // Range
    const [min, max] = value;
    const minPos = Math.round(convertToTenScale(min));
    const maxPos = Math.round(convertToTenScale(max));

    const minQualifier = getQualifierForPosition(criterionId, minPos);
    const maxQualifier = getQualifierForPosition(criterionId, maxPos);

    if (minQualifier === maxQualifier) {
      return `${criterionLabel}: ${minQualifier.toLowerCase()}`;
    }

    return `${criterionLabel}: idéal ${minQualifier.toLowerCase()}, acceptable ${maxQualifier.toLowerCase()}`;
  }

  // Single value
  const position = Math.round(convertToTenScale(value));
  const qualifier = getQualifierForPosition(criterionId, position);
  return `${criterionLabel}: ${qualifier.toLowerCase()}`;
}

/**
 * Maps a display label back to its criterion ID
 * This is needed for the accessibility label generation
 */
function getCriterionIdFromLabel(label: string): CriterionId | null {
  const labelMap: Record<string, CriterionId> = {
    Rapidité: 'temps-disponible',
    "Niveau d'enjeu": 'niveau-enjeu',
    Simplicité: 'simplicite',
    'Taille de groupe idéale': 'taille-groupe',
    "Niveau d'adhésion": 'niveau-adhesion',
    'Besoin de créativité': 'besoin-creativite',
    'Sujet conflictuel': 'sujet-conflictuel',
    Asynchrone: 'asynchrone',
  };

  return labelMap[label] || null;
}
