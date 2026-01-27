import type { DecisionProcess, CriterionId } from '../../../data/processes';
import { Modal } from '../../common/Modal';
import { CriterionScale } from '../../common/CriterionScale';
import './ProcessDetailsModal.css';

export interface ProcessDetailsModalProps {
  process: DecisionProcess | null;
  isOpen: boolean;
  onClose: () => void;
}

const MODAL_CRITERION_LABELS: Record<CriterionId, string> = {
  'temps-disponible': 'Rapidité',
  'niveau-enjeu': "Niveau d'enjeu",
  simplicite: 'Simplicité',
  'taille-groupe': 'Taille de groupe idéale',
  'niveau-adhesion': "Niveau d'adhésion",
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

export function ProcessDetailsModal({ process, isOpen, onClose }: ProcessDetailsModalProps) {
  if (!process) {
    return null;
  }

  const { name, details, criteria, isFamily } = process;
  const hasSteps = !isFamily && details.steps && details.steps.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={name}>
      <div className="process-details">
        <div className="process-details__grid">
          {/* Left column: Process steps (only for individual processes) */}
          {hasSteps && (
            <div className="process-details__section process-details__section--steps">
              <h3 className="process-details__section-title">Déroulé du processus</h3>
              <ol className="process-details__steps">
                {details.steps!.map((step, index) => (
                  <li key={index} className="process-details__step">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Center column: Criteria scales */}
          <div className="process-details__section process-details__section--scales">
            <div className="process-details__scales">
              {ALL_CRITERIA.map((criterionId) => (
                <CriterionScale
                  key={criterionId}
                  label={MODAL_CRITERION_LABELS[criterionId]}
                  value={criteria[criterionId].value}
                />
              ))}
            </div>
          </div>

          {/* Right column: Contextual usage blocks */}
          <div className="process-details__section process-details__section--context">
            {/* Avantages */}
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

            {/* Adapté */}
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

            {/* Risques */}
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

            {/* Déconseillé pour */}
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

        {/* Footer */}
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
    </Modal>
  );
}
