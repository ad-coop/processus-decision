import type { ReactNode } from 'react';
import { useSearchParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { DECISION_PROCESSES } from '../../data/processes';
import type { CriterionId } from '../../data/processes';
import { rankProcesses, filterByThreshold, assignRanks } from '../../utils/scoring';
import type { UserCriteria } from '../../utils/scoring';
import { slugify } from '../../utils/slug';
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

const PROCESS_CRITERION_LABELS: Record<CriterionId, string> = {
  'temps-disponible': 'Rapidité',
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
  return process.criteria[criterionId].label;
}

export function Results() {
  const [searchParams] = useSearchParams();
  const userCriteria = parseUserCriteria(searchParams);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCriteria = Object.entries(userCriteria) as [CriterionId, number][];

  if (selectedCriteria.length === 0) {
    return (
      <div className="results">
        <div className="page-back-nav" aria-hidden="true" />
        <h1 className="page-title">Processus adaptés</h1>
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
  const filteredProcesses = filterByThreshold(rankedProcesses);
  const ranks = assignRanks(filteredProcesses);

  const processesWithDetails = filteredProcesses.map((scoredProcess, index) => ({
    ...scoredProcess,
    rank: ranks[index],
    process: DECISION_PROCESSES.find((p) => p.name === scoredProcess.name)!,
  }));

  return (
    <div className="results">
      <div className="page-back-nav" aria-hidden="true" />
      <h1 className="page-title">Processus adaptés</h1>

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
        {processesWithDetails.map(({ name, percentage, rank, process }) => (
          <li key={name} className="results__item">
            <div
              className="results__rank"
              aria-label={`Rang ${rank}, ${percentage}% de correspondance`}
            >
              <span className="results__rank-number">{rank}</span>
              <span className="results__rank-percentage">{percentage}%</span>
            </div>
            <div className="results__content">
              <div className="results__header">
                <h2 className="results__process-name">{name}</h2>
                <button
                  type="button"
                  className="results__detail-button"
                  onClick={() =>
                    navigate('/processus/' + slugify(process.name), {
                      state: { from: 'results', search: location.search },
                    })
                  }
                >
                  Voir le détail
                </button>
              </div>
              <dl className="results__details">
                {ALL_CRITERIA.map((criterionId) => (
                  <div key={criterionId} className="results__detail-item">
                    <dt className="results__detail-label">
                      {PROCESS_CRITERION_LABELS[criterionId]}
                    </dt>
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
