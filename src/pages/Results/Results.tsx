import type { ReactNode } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { DECISION_PROCESSES } from '../../data/processes';
import type { CriterionId } from '../../data/processes';
import { rankProcesses, selectTopProcesses } from '../../utils/scoring';
import type { UserCriteria } from '../../utils/scoring';
import './Results.css';

const CRITERION_LABELS: Record<CriterionId, string> = {
  'temps-disponible': 'Temps disponible',
  'niveau-enjeu': "Niveau d'enjeu",
  simplicite: 'Simplicité',
  'taille-groupe': 'Taille de groupe',
  'niveau-adhesion': "Niveau d'adhésion nécessaire",
  'besoin-creativite': 'Besoin de créativité',
  'sujet-conflictuel': 'Sujet conflictuel',
  asynchrone: 'Asynchrone',
};

const ALL_CRITERIA: CriterionId[] = [
  'temps-disponible',
  'niveau-enjeu',
  'simplicite',
  'taille-groupe',
  'niveau-adhesion',
  'besoin-creativite',
  'sujet-conflictuel',
  'asynchrone',
];

function parseUserCriteria(searchParams: URLSearchParams): UserCriteria {
  const criteria: UserCriteria = {};

  for (const criterionId of ALL_CRITERIA) {
    const value = searchParams.get(criterionId);
    if (value !== null) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        criteria[criterionId] = numValue;
      }
    }
  }

  return criteria;
}

function renderStars(value: number): ReactNode {
  const stars: ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`results__star ${i <= value ? 'results__star--filled' : ''}`}
        aria-hidden="true"
      >
        ★
      </span>
    );
  }
  return (
    <span className="results__stars" aria-label={`${value} étoiles sur 5`}>
      {stars}
    </span>
  );
}

function getCriterionDisplayValue(
  criterionId: CriterionId,
  process: (typeof DECISION_PROCESSES)[0]
): string {
  const value = process.criteria[criterionId];

  if (value === '*') {
    return 'Variable';
  }

  if (Array.isArray(value)) {
    return formatRange(criterionId, value);
  }

  return formatSingleValue(criterionId, value);
}

function formatRange(criterionId: CriterionId, [min, max]: [number, number]): string {
  const minText = formatSingleValue(criterionId, min);
  const maxText = formatSingleValue(criterionId, max);
  if (minText === maxText) {
    return minText;
  }
  return `${minText} à ${maxText}`;
}

function formatSingleValue(criterionId: CriterionId, value: number): string {
  switch (criterionId) {
    case 'temps-disponible':
      if (value <= 1) return 'Secondes';
      if (value <= 2) return 'Minutes';
      if (value <= 3) return 'Heures';
      if (value <= 4) return 'Jours';
      return 'Semaines';

    case 'niveau-enjeu':
      if (value <= 1.5) return 'Faible';
      if (value <= 3) return 'Moyen';
      if (value <= 4) return 'Fort';
      return 'Très fort';

    case 'simplicite':
      if (value <= 1.5) return 'Simple';
      if (value <= 3) return 'Moyen';
      return 'Complexe';

    case 'taille-groupe':
      if (value <= 1) return '~4 personnes';
      if (value <= 2) return '~8 personnes';
      if (value <= 3) return '4 à 20 personnes';
      if (value <= 4) return '~50 personnes';
      return 'Milliers';

    case 'niveau-adhesion':
      if (value <= 1.5) return 'Faible';
      if (value <= 3) return 'Moyen';
      return 'Fort';

    case 'besoin-creativite':
      if (value <= 1) return 'Aucun';
      if (value <= 2) return 'Faible';
      if (value <= 3) return 'Moyen';
      return 'Fort';

    case 'sujet-conflictuel':
      if (value <= 1) return 'Non adapté';
      if (value <= 2) return 'Déconseillé';
      if (value <= 3) return 'Variable';
      if (value <= 3.5) return 'Possible';
      if (value <= 4) return 'Peut aider';
      return 'Adapté';

    case 'asynchrone':
      if (value <= 1) return 'Non';
      if (value <= 2) return 'Difficile';
      if (value <= 3.5) return 'Possible';
      return 'Oui';

    default:
      return String(value);
  }
}

export function Results() {
  const [searchParams] = useSearchParams();
  const userCriteria = parseUserCriteria(searchParams);

  const selectedCriteria = Object.entries(userCriteria) as [CriterionId, number][];

  if (selectedCriteria.length === 0) {
    return (
      <div className="results">
        <h1 className="results__title">Processus adaptés</h1>
        <p className="results__empty">
          Aucun critère sélectionné.{' '}
          <Link to="/" className="results__link">
            Retour au formulaire
          </Link>
        </p>
      </div>
    );
  }

  const rankedProcesses = rankProcesses(DECISION_PROCESSES, userCriteria);
  const topProcesses = selectTopProcesses(rankedProcesses);

  const processesWithDetails = topProcesses.map((scoredProcess) => ({
    ...scoredProcess,
    process: DECISION_PROCESSES.find((p) => p.name === scoredProcess.name)!,
  }));

  return (
    <div className="results">
      <h1 className="results__title">Processus adaptés</h1>

      <div className="results__banner" role="region" aria-label="Vos critères sélectionnés">
        <h2 className="results__banner-title">Vos critères</h2>
        <div className="results__criteria-list">
          {selectedCriteria.map(([criterionId, value]) => (
            <div key={criterionId} className="results__criterion">
              <span className="results__criterion-label">{CRITERION_LABELS[criterionId]}</span>
              {renderStars(value)}
            </div>
          ))}
        </div>
      </div>

      <ol className="results__list" aria-label="Liste des processus recommandés">
        {processesWithDetails.map(({ name, process }, index) => (
          <li key={name} className="results__item">
            <div className="results__rank" aria-label={`Rang ${index + 1}`}>
              {index + 1}
            </div>
            <div className="results__content">
              <div className="results__header">
                <h2 className="results__process-name">{name}</h2>
                <button type="button" className="results__detail-button" disabled>
                  Voir le détail
                </button>
              </div>
              <dl className="results__details">
                {ALL_CRITERIA.map((criterionId) => (
                  <div key={criterionId} className="results__detail-item">
                    <dt className="results__detail-label">{CRITERION_LABELS[criterionId]}</dt>
                    <dd className="results__detail-value">
                      {getCriterionDisplayValue(criterionId, process)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </li>
        ))}
      </ol>

      <div className="results__footer">
        <Link to="/" className="results__back-link">
          ← Modifier les critères
        </Link>
      </div>
    </div>
  );
}
