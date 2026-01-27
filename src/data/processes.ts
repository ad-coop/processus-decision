import type { ProcessDetails } from './processDetails';
import { PROCESS_DETAILS_MAP } from './processDetails';

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

export interface CriterionValue {
  value: ProcessValue;
  label: string;
}

export interface DecisionProcess {
  name: string;
  criteria: Record<CriterionId, CriterionValue>;
  details: ProcessDetails;
  isFamily: boolean;
}

export const DECISION_PROCESSES: DecisionProcess[] = [
  // Families of processes
  {
    name: 'Votes à choix multiples',
    isFamily: true,
    details: PROCESS_DETAILS_MAP['Votes à choix multiples'],
    criteria: {
      'temps-disponible': { value: 3, label: 'Heures' },
      'niveau-enjeu': { value: [3, 4], label: 'Moyen à Fort' },
      simplicite: { value: [3, 4.5], label: 'Moyen à Complexe' },
      'taille-groupe': { value: [1, 5], label: '4 à 50+ personnes' },
      'niveau-adhesion': { value: [3, 4.5], label: 'Moyen à Fort' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 5, label: 'Adapté' },
      asynchrone: { value: 1, label: 'Non' },
    },
  },
  {
    name: 'Processus consultatifs',
    isFamily: true,
    details: PROCESS_DETAILS_MAP['Processus consultatifs'],
    criteria: {
      'temps-disponible': { value: [3, 4], label: 'Heures à Jours' },
      'niveau-enjeu': { value: [1.5, 3], label: 'Faible à Moyen' },
      simplicite: { value: [1.5, 3], label: 'Simple à Moyen' },
      'taille-groupe': { value: [1, 5], label: '4 à 50+ personnes' },
      'niveau-adhesion': { value: [1.5, 3], label: 'Faible à Moyen' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 2, label: 'Déconseillé' },
      asynchrone: { value: 3.5, label: 'Possible' },
    },
  },
  {
    name: 'Processus horizontaux - égalitaires',
    isFamily: true,
    details: PROCESS_DETAILS_MAP['Processus horizontaux - égalitaires'],
    criteria: {
      'temps-disponible': { value: [3, 5], label: 'Heures à Semaines' },
      'niveau-enjeu': { value: [4, 5], label: 'Fort à Très fort' },
      simplicite: { value: 4.5, label: 'Complexe (nécessite formation et posture)' },
      'taille-groupe': { value: [1, 3], label: '4 à 20 personnes' },
      'niveau-adhesion': { value: 4.5, label: 'Fort' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 2, label: 'Déconseillé si avis irréconciliables' },
      asynchrone: { value: 2, label: 'Difficile' },
    },
  },
  {
    name: 'Mode de décisions libertaires',
    isFamily: true,
    details: PROCESS_DETAILS_MAP['Mode de décisions libertaires'],
    criteria: {
      'temps-disponible': { value: [1, 2], label: 'Instantané à Minutes' },
      'niveau-enjeu': { value: 1.5, label: 'Faible' },
      simplicite: { value: 1.5, label: 'Simple' },
      'taille-groupe': { value: [1, 5], label: '4 à des milliers' },
      'niveau-adhesion': { value: 1.5, label: 'Faible' },
      'besoin-creativite': { value: 4.5, label: 'Fort (créativité individuelle)' },
      'sujet-conflictuel': { value: 1, label: 'Non adapté' },
      asynchrone: { value: 5, label: 'Oui (facile)' },
    },
  },
  {
    name: 'Suivre un signe',
    isFamily: true,
    details: PROCESS_DETAILS_MAP['Suivre un signe'],
    criteria: {
      'temps-disponible': { value: [2, 3], label: 'Minutes à Heures' },
      'niveau-enjeu': { value: [1.5, 3], label: 'Faible à Moyen' },
      simplicite: { value: 3, label: 'Moyen' },
      'taille-groupe': { value: [1, 2], label: 'Petits groupes' },
      'niveau-adhesion': { value: 3, label: 'Moyen' },
      'besoin-creativite': { value: 2, label: 'Faible' },
      'sujet-conflictuel': { value: 3, label: 'Variable' },
      asynchrone: { value: 3, label: 'Variable' },
    },
  },
  {
    name: 'Hasard',
    isFamily: true,
    details: PROCESS_DETAILS_MAP['Hasard'],
    criteria: {
      'temps-disponible': { value: 2, label: 'Minutes' },
      'niveau-enjeu': { value: 1.5, label: 'Faible' },
      simplicite: { value: 1.5, label: 'Simple' },
      'taille-groupe': { value: [1, 5], label: '4 à des milliers' },
      'niveau-adhesion': { value: 1.5, label: 'Faible (acceptation)' },
      'besoin-creativite': { value: 2, label: 'Faible' },
      'sujet-conflictuel': { value: 4, label: 'Peut aider à départager' },
      asynchrone: { value: 5, label: 'Oui (facile)' },
    },
  },
  {
    name: 'Tradition, habitudes',
    isFamily: true,
    details: PROCESS_DETAILS_MAP['Tradition, habitudes'],
    criteria: {
      'temps-disponible': { value: 1, label: 'Instantané' },
      'niveau-enjeu': { value: [1.5, 4], label: 'Faible à Fort' },
      simplicite: { value: 1.5, label: 'Simple' },
      'taille-groupe': { value: [1, 5], label: '4 à des milliers' },
      'niveau-adhesion': { value: 1.5, label: 'Faible' },
      'besoin-creativite': { value: 1, label: 'Aucun' },
      'sujet-conflictuel': { value: 1, label: 'Non adapté' },
      asynchrone: { value: 5, label: 'Oui' },
    },
  },
  {
    name: 'Non-choix',
    isFamily: true,
    details: PROCESS_DETAILS_MAP['Non-choix'],
    criteria: {
      'temps-disponible': { value: '*', label: 'Variable' },
      'niveau-enjeu': { value: '*', label: 'Variable' },
      simplicite: { value: 1.5, label: 'Simple' },
      'taille-groupe': { value: [1, 5], label: 'Toutes tailles' },
      'niveau-adhesion': { value: 1.5, label: 'Faible' },
      'besoin-creativite': { value: 1, label: 'Aucun' },
      'sujet-conflictuel': { value: 3, label: 'Parfois utilisé par défaut' },
      asynchrone: { value: 5, label: 'Oui' },
    },
  },
  {
    name: 'Déléguer la décision à un rôle',
    isFamily: true,
    details: PROCESS_DETAILS_MAP['Déléguer la décision à un rôle'],
    criteria: {
      'temps-disponible': { value: 3, label: 'Heures' },
      'niveau-enjeu': { value: [1.5, 4], label: 'Faible à Fort' },
      simplicite: { value: [1.5, 3], label: 'Simple à Moyen' },
      'taille-groupe': { value: [1, 5], label: '4 à des milliers' },
      'niveau-adhesion': { value: [1.5, 3], label: 'Faible à Moyen' },
      'besoin-creativite': { value: 4.5, label: 'Fort (individuel)' },
      'sujet-conflictuel': { value: 3, label: 'Attention aux limites floues' },
      asynchrone: { value: 5, label: 'Oui (facile)' },
    },
  },
  // Individual processes
  {
    name: 'Vote à la majorité',
    isFamily: false,
    details: PROCESS_DETAILS_MAP['Vote à la majorité'],
    criteria: {
      'temps-disponible': { value: 3, label: 'Heures' },
      'niveau-enjeu': { value: [3, 4], label: 'Moyen à Fort' },
      simplicite: { value: 1.5, label: 'Simple' },
      'taille-groupe': { value: [2, 5], label: '8 à des millions' },
      'niveau-adhesion': { value: 3, label: 'Moyen (Acceptation)' },
      'besoin-creativite': { value: 2, label: 'Faible' },
      'sujet-conflictuel': { value: 3.5, label: 'Risqué (clivant)' },
      asynchrone: { value: 5, label: 'Oui (possible à distance)' },
    },
  },
  {
    name: "Partage d'intention",
    isFamily: false,
    details: PROCESS_DETAILS_MAP["Partage d'intention"],
    criteria: {
      'temps-disponible': { value: 4, label: 'Jours' },
      'niveau-enjeu': { value: 1.5, label: 'Faible' },
      simplicite: { value: 1.5, label: 'Simple' },
      'taille-groupe': { value: [1, 3], label: '4 à 20 personnes' },
      'niveau-adhesion': { value: 3, label: 'Moyen' },
      'besoin-creativite': { value: 2, label: 'Faible' },
      'sujet-conflictuel': { value: 2, label: 'Déconseillé' },
      asynchrone: { value: 5, label: 'Oui (possible sans être réunis)' },
    },
  },
  {
    name: "Sollicitation d'avis",
    isFamily: false,
    details: PROCESS_DETAILS_MAP["Sollicitation d'avis"],
    criteria: {
      'temps-disponible': { value: 4, label: 'Jours' },
      'niveau-enjeu': { value: 3, label: 'Moyen' },
      simplicite: { value: 3, label: 'Moyen' },
      'taille-groupe': { value: [1, 5], label: '4 à 50+ personnes' },
      'niveau-adhesion': { value: 3, label: 'Moyen' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 2, label: 'Déconseillé' },
      asynchrone: { value: 5, label: 'Oui (possible sans être réunis)' },
    },
  },
  {
    name: 'Consultation collective',
    isFamily: false,
    details: PROCESS_DETAILS_MAP['Consultation collective'],
    criteria: {
      'temps-disponible': { value: 3, label: 'Heures' },
      'niveau-enjeu': { value: [3, 4], label: 'Moyen à Fort' },
      simplicite: { value: 3, label: 'Moyen' },
      'taille-groupe': { value: [1, 3], label: '4 à 20 personnes' },
      'niveau-adhesion': { value: [3, 4.5], label: 'Moyen à Fort' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 3, label: 'Attention si décideur non neutre' },
      asynchrone: { value: 1, label: "Non (nécessite d'être réunis)" },
    },
  },
  {
    name: 'Consentement',
    isFamily: false,
    details: PROCESS_DETAILS_MAP['Consentement'],
    criteria: {
      'temps-disponible': { value: 3, label: 'Heures' },
      'niveau-enjeu': { value: 4, label: 'Fort' },
      simplicite: { value: 4.5, label: 'Complexe' },
      'taille-groupe': { value: [1, 3], label: '4 à 20 personnes' },
      'niveau-adhesion': { value: 4.5, label: 'Fort' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 2, label: 'Déconseillé si avis irréconciliables' },
      asynchrone: { value: 2, label: 'Difficile' },
    },
  },
  {
    name: 'Consensus (formel)',
    isFamily: false,
    details: PROCESS_DETAILS_MAP['Consensus (formel)'],
    criteria: {
      'temps-disponible': { value: [3, 5], label: 'Heures à Semaines' },
      'niveau-enjeu': { value: 4, label: 'Fort' },
      simplicite: { value: 4.5, label: 'Complexe' },
      'taille-groupe': { value: [1, 3], label: '4 à 20 personnes' },
      'niveau-adhesion': { value: 4.5, label: 'Fort' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 2, label: 'Déconseillé si avis irréconciliables' },
      asynchrone: { value: 2, label: 'Difficile' },
    },
  },
  {
    name: 'Consensus informel',
    isFamily: false,
    details: PROCESS_DETAILS_MAP['Consensus informel'],
    criteria: {
      'temps-disponible': { value: 3, label: 'Heures' },
      'niveau-enjeu': { value: 4, label: 'Fort' },
      simplicite: { value: [3, 4.5], label: 'Moyen à Complexe' },
      'taille-groupe': { value: [1, 3], label: '4 à 20 personnes' },
      'niveau-adhesion': { value: 4.5, label: 'Fort' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 2, label: 'Déconseillé si avis irréconciliables' },
      asynchrone: { value: 2, label: 'Difficile' },
    },
  },
  {
    name: 'Décisions algorithmiques',
    isFamily: false,
    details: PROCESS_DETAILS_MAP['Décisions algorithmiques'],
    criteria: {
      'temps-disponible': { value: [2, 3], label: 'Minutes à Heures' },
      'niveau-enjeu': { value: [1.5, 3], label: 'Faible à Moyen' },
      simplicite: { value: 3, label: 'Moyen' },
      'taille-groupe': { value: [2, 5], label: '8 à des millions' },
      'niveau-adhesion': { value: 3, label: 'Moyen' },
      'besoin-creativite': { value: 2, label: 'Faible' },
      'sujet-conflictuel': { value: 3.5, label: 'Peut être sensible aux manipulations' },
      asynchrone: { value: 5, label: 'Oui (possible à distance)' },
    },
  },
  {
    name: 'Vote par approbation',
    isFamily: false,
    details: PROCESS_DETAILS_MAP['Vote par approbation'],
    criteria: {
      'temps-disponible': { value: 3, label: 'Heures' },
      'niveau-enjeu': { value: [3, 4], label: 'Moyen à Fort' },
      simplicite: { value: [3, 4.5], label: 'Moyen à Complexe' },
      'taille-groupe': { value: [2, 5], label: '8 à 50+ personnes' },
      'niveau-adhesion': { value: 4.5, label: 'Fort' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 5, label: 'Adapté' },
      asynchrone: { value: 1, label: 'Non (nécessite réunion)' },
    },
  },
  {
    name: 'Règle de trois',
    isFamily: false,
    details: PROCESS_DETAILS_MAP['Règle de trois'],
    criteria: {
      'temps-disponible': { value: 3, label: 'Heures' },
      'niveau-enjeu': { value: 3, label: 'Moyen' },
      simplicite: { value: 1.5, label: 'Simple' },
      'taille-groupe': { value: [2, 5], label: '8 à 50+ personnes' },
      'niveau-adhesion': { value: 3, label: 'Moyen' },
      'besoin-creativite': { value: 4.5, label: 'Fort' },
      'sujet-conflictuel': { value: 2, label: 'Déconseillé' },
      asynchrone: { value: 5, label: 'Oui (possible sans être réuni)' },
    },
  },
];
