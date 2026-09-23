import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarRating } from '../../components/common/StarRating';
import { CRITERION_IDS, CRITERION_LABELS } from '../../data/processes';
import type { CriterionId } from '../../data/processes';
import './CriteriaForm.css';

const STAR_LABELS: Record<CriterionId, [string, string, string, string, string]> = {
  'temps-disponible': ['Secondes', 'Minutes', 'Heures', 'Jours', 'Semaines'],
  'niveau-enjeu': ['Faible', '', '', '', 'Fort'],
  simplicite: ['Simple', '', '', '', 'Complexe'],
  'taille-groupe': [
    'Quelques personnes',
    '',
    'Centaines de personnes',
    '',
    'Milliers de personnes',
  ],
  'niveau-adhesion': ['Faible (être informé)', '', 'Moyen (accepter)', '', 'Fort'],
  'besoin-creativite': ['Faible', '', 'Modéré', '', 'Fort'],
  'sujet-conflictuel': ['Non', '', 'Modérément conflictuel', '', 'Très conflictuel'],
  asynchrone: ['Non', '', 'Modérément', '', 'Oui'],
};

export function CriteriaForm() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<Record<string, number | null>>({});
  const [error, setError] = useState<string | null>(null);

  const handleRatingChange = (criterionId: string, value: number | null) => {
    setRatings((prev) => ({ ...prev, [criterionId]: value }));
    // Clear error when user selects at least one criterion
    if (value !== null) {
      setError(null);
    }
  };

  const hasAtLeastOneRating = Object.values(ratings).some((v) => v !== null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasAtLeastOneRating) {
      setError('Sélectionnez au moins un critère');
      return;
    }

    setError(null);

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(ratings)) {
      if (value !== null) {
        params.set(key, String(value));
      }
    }

    navigate(`/results?${params.toString()}`);
  };

  return (
    <div className="criteria-form">
      <div className="page-back-nav" aria-hidden="true" />
      <h1 className="page-title">Aide au choix d'un processus de décision</h1>

      <div className="criteria-form__intro">
        <p>
          Cet outil est directement issu de la{' '}
          <a
            href="https://gouvernanceintegrative.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Gouvernance Intégrative (nouvelle fenêtre)"
          >
            Gouvernance Intégrative
          </a>
          .
        </p>
        <p>
          Renseignez les critères ci-dessous pour identifier les processus les plus adaptés à la
          décision que vous allez prendre.
        </p>
        <p>
          Tous les critères sont facultatifs : sélectionnez ceux qui sont vraiment importants et
          laissez vides ceux qui n'ont pas d'importance dans votre contexte.
        </p>
      </div>

      <form onSubmit={handleSubmit} aria-describedby={error ? 'criteria-form-error' : undefined}>
        <div className="criteria-form__list">
          {CRITERION_IDS.map((id) => (
            <StarRating
              key={id}
              label={CRITERION_LABELS[id]}
              starLabels={STAR_LABELS[id]}
              value={ratings[id] ?? null}
              onChange={(value) => handleRatingChange(id, value)}
            />
          ))}
        </div>

        <div className="criteria-form__footer">
          {error && (
            <p
              id="criteria-form-error"
              className="criteria-form__error"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}
          <button type="submit" className="criteria-form__submit">
            Identifier les processus adaptés
          </button>
        </div>
      </form>
    </div>
  );
}
