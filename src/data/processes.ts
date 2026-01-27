export type CriterionId =
  | 'temps-disponible'
  | 'niveau-enjeu'
  | 'simplicite'
  | 'taille-groupe'
  | 'niveau-adhesion'
  | 'besoin-creativite'
  | 'sujet-conflictuel'
  | 'asynchrone';

export type ProcessValue = number | [number, number] | '*';

export interface DecisionProcess {
  name: string;
  criteria: Record<CriterionId, ProcessValue>;
}

export const DECISION_PROCESSES: DecisionProcess[] = [
  // Families of processes
  {
    name: 'Votes à choix multiples',
    criteria: {
      'temps-disponible': 3,
      'niveau-enjeu': [3, 4],
      simplicite: [3, 4.5],
      'taille-groupe': [1, 5],
      'niveau-adhesion': [3, 4.5],
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 5,
      asynchrone: 1,
    },
  },
  {
    name: 'Processus consultatifs',
    criteria: {
      'temps-disponible': [3, 4],
      'niveau-enjeu': [1.5, 3],
      simplicite: [1.5, 3],
      'taille-groupe': [1, 5],
      'niveau-adhesion': [1.5, 3],
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 2,
      asynchrone: 3.5,
    },
  },
  {
    name: 'Processus horizontaux - égalitaires',
    criteria: {
      'temps-disponible': [3, 5],
      'niveau-enjeu': [4, 5],
      simplicite: 4.5,
      'taille-groupe': [1, 3],
      'niveau-adhesion': 4.5,
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 2,
      asynchrone: 2,
    },
  },
  {
    name: 'Mode de décisions libertaires',
    criteria: {
      'temps-disponible': [1, 2],
      'niveau-enjeu': 1.5,
      simplicite: 1.5,
      'taille-groupe': [1, 5],
      'niveau-adhesion': 1.5,
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 1,
      asynchrone: 5,
    },
  },
  {
    name: 'Suivre un signe',
    criteria: {
      'temps-disponible': [2, 3],
      'niveau-enjeu': [1.5, 3],
      simplicite: 3,
      'taille-groupe': [1, 2],
      'niveau-adhesion': 3,
      'besoin-creativite': 2,
      'sujet-conflictuel': 3,
      asynchrone: 3,
    },
  },
  {
    name: 'Hasard',
    criteria: {
      'temps-disponible': 2,
      'niveau-enjeu': 1.5,
      simplicite: 1.5,
      'taille-groupe': [1, 5],
      'niveau-adhesion': 1.5,
      'besoin-creativite': 2,
      'sujet-conflictuel': 4,
      asynchrone: 5,
    },
  },
  {
    name: 'Tradition, habitudes',
    criteria: {
      'temps-disponible': 1,
      'niveau-enjeu': [1.5, 4],
      simplicite: 1.5,
      'taille-groupe': [1, 5],
      'niveau-adhesion': 1.5,
      'besoin-creativite': 1,
      'sujet-conflictuel': 1,
      asynchrone: 5,
    },
  },
  {
    name: 'Non-choix',
    criteria: {
      'temps-disponible': '*',
      'niveau-enjeu': '*',
      simplicite: 1.5,
      'taille-groupe': [1, 5],
      'niveau-adhesion': 1.5,
      'besoin-creativite': 1,
      'sujet-conflictuel': 3,
      asynchrone: 5,
    },
  },
  {
    name: 'Déléguer la décision à un rôle',
    criteria: {
      'temps-disponible': 3,
      'niveau-enjeu': [1.5, 4],
      simplicite: [1.5, 3],
      'taille-groupe': [1, 5],
      'niveau-adhesion': [1.5, 3],
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 3,
      asynchrone: 5,
    },
  },
  // Individual processes
  {
    name: 'Vote à la majorité',
    criteria: {
      'temps-disponible': 3,
      'niveau-enjeu': [3, 4],
      simplicite: 1.5,
      'taille-groupe': [2, 5],
      'niveau-adhesion': 3,
      'besoin-creativite': 2,
      'sujet-conflictuel': 3.5,
      asynchrone: 5,
    },
  },
  {
    name: "Partage d'intention",
    criteria: {
      'temps-disponible': 4,
      'niveau-enjeu': 1.5,
      simplicite: 1.5,
      'taille-groupe': [1, 3],
      'niveau-adhesion': 3,
      'besoin-creativite': 2,
      'sujet-conflictuel': 2,
      asynchrone: 5,
    },
  },
  {
    name: "Sollicitation d'avis",
    criteria: {
      'temps-disponible': 4,
      'niveau-enjeu': 3,
      simplicite: 3,
      'taille-groupe': [1, 5],
      'niveau-adhesion': 3,
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 2,
      asynchrone: 5,
    },
  },
  {
    name: 'Consultation collective',
    criteria: {
      'temps-disponible': 3,
      'niveau-enjeu': [3, 4],
      simplicite: 3,
      'taille-groupe': [1, 3],
      'niveau-adhesion': [3, 4.5],
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 3,
      asynchrone: 1,
    },
  },
  {
    name: 'Consentement',
    criteria: {
      'temps-disponible': 3,
      'niveau-enjeu': 4,
      simplicite: 4.5,
      'taille-groupe': [1, 3],
      'niveau-adhesion': 4.5,
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 2,
      asynchrone: 2,
    },
  },
  {
    name: 'Consensus (formel)',
    criteria: {
      'temps-disponible': [3, 5],
      'niveau-enjeu': 4,
      simplicite: 4.5,
      'taille-groupe': [1, 3],
      'niveau-adhesion': 4.5,
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 2,
      asynchrone: 2,
    },
  },
  {
    name: 'Consensus informel',
    criteria: {
      'temps-disponible': 3,
      'niveau-enjeu': 4,
      simplicite: [3, 4.5],
      'taille-groupe': [1, 3],
      'niveau-adhesion': 4.5,
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 2,
      asynchrone: 2,
    },
  },
  {
    name: 'Décisions algorithmiques',
    criteria: {
      'temps-disponible': [2, 3],
      'niveau-enjeu': [1.5, 3],
      simplicite: 3,
      'taille-groupe': [2, 5],
      'niveau-adhesion': 3,
      'besoin-creativite': 2,
      'sujet-conflictuel': 3.5,
      asynchrone: 5,
    },
  },
  {
    name: 'Vote par approbation',
    criteria: {
      'temps-disponible': 3,
      'niveau-enjeu': [3, 4],
      simplicite: [3, 4.5],
      'taille-groupe': [2, 5],
      'niveau-adhesion': 4.5,
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 5,
      asynchrone: 1,
    },
  },
  {
    name: 'Règle de trois',
    criteria: {
      'temps-disponible': 3,
      'niveau-enjeu': 3,
      simplicite: 1.5,
      'taille-groupe': [2, 5],
      'niveau-adhesion': 3,
      'besoin-creativite': 4.5,
      'sujet-conflictuel': 2,
      asynchrone: 5,
    },
  },
];
