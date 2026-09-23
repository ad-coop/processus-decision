import { useParams, useLocation, Link } from 'react-router-dom';
import { getProcessBySlug } from '../../utils/slug';
import { CriterionScale } from '../../components/common/CriterionScale';
import { CRITERION_IDS } from '../../data/processes';
import './ProcessDetail.css';

const CONTEXT_SECTIONS = [
  { key: 'advantages', title: 'Avantages', modifier: 'advantages' },
  { key: 'suitedFor', title: 'Adapté', modifier: 'suited' },
  { key: 'risks', title: 'Risques', modifier: 'risks' },
  { key: 'notRecommendedFor', title: 'Déconseillé pour', modifier: 'not-recommended' },
] as const;

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
        <nav className="page-back-nav" aria-label="Navigation de retour">
          <Link to="/catalogue" className="page-back-link">
            &larr; Retour au catalogue
          </Link>
        </nav>
        <h1 className="page-title">Processus non trouvé</h1>
        <p className="process-detail__not-found">Ce processus n&apos;existe pas.</p>
      </main>
    );
  }

  const { name, details, criteria, isFamily } = process;
  const hasSteps = !isFamily && details.steps && details.steps.length > 0;

  const backLink =
    state?.from === 'results' ? (
      <Link to={`/results${state.search ?? ''}`} className="page-back-link">
        &larr; Retour aux résultats
      </Link>
    ) : state?.from === 'catalogue' ? (
      <Link to="/catalogue" className="page-back-link">
        &larr; Retour au catalogue
      </Link>
    ) : null;

  return (
    <main className="process-detail">
      {backLink ? (
        <nav className="page-back-nav" aria-label="Navigation de retour">
          {backLink}
        </nav>
      ) : (
        <div className="page-back-nav" aria-hidden="true" />
      )}
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
              {CRITERION_IDS.map((criterionId) => (
                <CriterionScale
                  key={criterionId}
                  criterionId={criterionId}
                  value={criteria[criterionId].value}
                />
              ))}
            </div>
          </div>

          <div className="process-details__section process-details__section--context">
            {CONTEXT_SECTIONS.map(
              ({ key, title, modifier }) =>
                details[key].length > 0 && (
                  <div key={key} className="process-details__context-block">
                    <h3
                      className={`process-details__context-title process-details__context-title--${modifier}`}
                    >
                      {title}
                    </h3>
                    <ul className="process-details__context-list">
                      {details[key].map((item, index) => (
                        <li key={index} className="process-details__context-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
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
