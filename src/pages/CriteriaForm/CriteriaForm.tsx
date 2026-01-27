import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarRating } from '../../components/common/StarRating';
import './CriteriaForm.css';

interface Criterion {
  id: string;
  label: string;
  starLabels: [string, string, string, string, string];
}

const CRITERIA: Criterion[] = [
  {
    id: 'temps-disponible',
    label: 'Temps disponible',
    starLabels: ['Secondes', 'Minutes', 'Heures', 'Jours', 'Semaines'],
  },
  {
    id: 'niveau-enjeu',
    label: "Niveau d'enjeu",
    starLabels: ['Faible', '', '', '', 'Fort'],
  },
  {
    id: 'simplicite',
    label: 'Simplicité',
    starLabels: ['Simple', '', '', '', 'Complexe'],
  },
  {
    id: 'taille-groupe',
    label: 'Taille de groupe',
    starLabels: ['Quelques personnes', '', 'Centaines de personnes', '', 'Milliers de personnes'],
  },
  {
    id: 'niveau-adhesion',
    label: "Niveau d'adhésion nécessaire",
    starLabels: ['Faible (être informé)', '', 'Moyen (accepter)', '', 'Fort'],
  },
  {
    id: 'besoin-creativite',
    label: 'Besoin de créativité',
    starLabels: ['Faible', '', 'Modéré', '', 'Fort'],
  },
  {
    id: 'sujet-conflictuel',
    label: 'Sujet conflictuel',
    starLabels: ['Non', '', 'Modérément conflictuel', '', 'Très conflictuel'],
  },
  {
    id: 'asynchrone',
    label: 'Asynchrone',
    starLabels: ['Non', '', 'Modérément', '', 'Oui'],
  },
];

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
      <h1 className="criteria-form__title">Aide au choix d'un processus de décision</h1>

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

      <form onSubmit={handleSubmit}>
        <div className="criteria-form__list">
          {CRITERIA.map((criterion) => (
            <StarRating
              key={criterion.id}
              label={criterion.label}
              starLabels={criterion.starLabels}
              value={ratings[criterion.id] ?? null}
              onChange={(value) => handleRatingChange(criterion.id, value)}
            />
          ))}
        </div>

        <div className="criteria-form__footer">
          {error && (
            <p className="criteria-form__error" role="alert" aria-live="polite">
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
