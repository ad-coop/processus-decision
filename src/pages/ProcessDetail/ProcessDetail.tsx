import { useParams, useLocation, Link } from 'react-router-dom';
import { getProcessBySlug } from '../../utils/slug';
import { CriterionScale } from '../../components/common/CriterionScale';
import type { CriterionId } from '../../data/processes';
import './ProcessDetail.css';

const CRITERION_LABELS: Record<CriterionId, string> = {
  'temps-disponible': 'Rapidit\u00e9',
  'niveau-enjeu': "Niveau d'enjeu",
  simplicite: 'Simplicit\u00e9',
  'taille-groupe': 'Taille de groupe id\u00e9ale',
  'niveau-adhesion': "Niveau d'adh\u00e9sion",
  'besoin-creativite': 'Besoin de cr\u00e9ativit\u00e9',
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

interface LocationState {
  from?: 'results' | 'catalogue';
  search?: string;
}

export function ProcessDetail() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const process = getProcessBySlug(slug ?? '');

  if (!process) {
    return (
      <main className="process-detail">
        <h1 className="page-title">Processus non trouvé</h1>
        <p className="process-detail__not-found">Ce processus n&apos;existe pas.</p>
        <Link to="/catalogue" className="process-detail__back">
          &larr; Retour au catalogue
        </Link>
      </main>
    );
  }

  const { name, details, criteria, isFamily } = process;
  const hasSteps = !isFamily && details.steps && details.steps.length > 0;

  const backLink =
    state?.from === 'results' ? (
      <Link to={`/results${state.search ?? ''}`} className="process-detail__back">
        &larr; Retour aux résultats
      </Link>
    ) : state?.from === 'catalogue' ? (
      <Link to="/catalogue" className="process-detail__back">
        &larr; Retour au catalogue
      </Link>
    ) : null;

  return (
    <main className="process-detail">
      {backLink}
      <h1 className="page-title">{name}</h1>
      <div className="process-details">
        <div className="process-details__grid">
          {hasSteps && (
            <div className="process-details__section process-details__section--steps">
              <h2 className="process-details__section-title">Déroulé du processus</h2>
              <ol className="process-details__steps">
                {details.steps!.map((step, index) => (
                  <li key={index} className="process-details__step">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="process-details__section process-details__section--scales">
            <div className="process-details__scales">
              {ALL_CRITERIA.map((criterionId) => (
                <CriterionScale
                  key={criterionId}
                  label={CRITERION_LABELS[criterionId]}
                  value={criteria[criterionId].value}
                />
              ))}
            </div>
          </div>

          <div className="process-details__section process-details__section--context">
            {details.advantages.length > 0 && (
              <div className="process-details__context-block">
                <h3 className="process-details__context-title process-details__context-title--advantages">
                  Avantages
                </h3>
                <ul className="process-details__context-list">
                  {details.advantages.map((item, index) => (
                    <li key={index} className="process-details__context-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details.suitedFor.length > 0 && (
              <div className="process-details__context-block">
                <h3 className="process-details__context-title process-details__context-title--suited">
                  Adapté
                </h3>
                <ul className="process-details__context-list">
                  {details.suitedFor.map((item, index) => (
                    <li key={index} className="process-details__context-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details.risks.length > 0 && (
              <div className="process-details__context-block">
                <h3 className="process-details__context-title process-details__context-title--risks">
                  Risques
                </h3>
                <ul className="process-details__context-list">
                  {details.risks.map((item, index) => (
                    <li key={index} className="process-details__context-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details.notRecommendedFor.length > 0 && (
              <div className="process-details__context-block">
                <h3 className="process-details__context-title process-details__context-title--not-recommended">
                  Déconseillé pour
                </h3>
                <ul className="process-details__context-list">
                  {details.notRecommendedFor.map((item, index) => (
                    <li key={index} className="process-details__context-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="process-details__footer">
          <p className="process-details__attribution">
            Contenu tiré de la boîte à outils de la{' '}
            <a
              href="https://gouvernanceintegrative.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="process-details__link"
            >
              Gouvernance Intégrative
            </a>
            , distribuée en CC by SA
          </p>
        </div>
      </div>
    </main>
  );
}
