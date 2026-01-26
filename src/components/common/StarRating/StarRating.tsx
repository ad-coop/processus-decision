import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { StarIcon } from './StarIcon';
import './StarRating.css';

interface StarRatingProps {
  label: string;
  starLabels?: [string, string, string, string, string];
  value: number | null;
  onChange: (value: number | null) => void;
}

const STAR_COUNT = 5;

export function StarRating({ label, starLabels, value, onChange }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayValue = hoverValue ?? value ?? 0;

  const getStarFill = (starIndex: number): 'empty' | 'half' | 'full' => {
    const starNumber = starIndex + 1;
    if (displayValue >= starNumber) return 'full';
    if (displayValue >= starNumber - 0.5) return 'half';
    return 'empty';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, starIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    setHoverValue(starIndex + (isLeftHalf ? 0.5 : 1));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, starIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    onChange(starIndex + (isLeftHalf ? 0.5 : 1));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentValue = value ?? 0;
    let newValue: number | null = null;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = Math.min(currentValue + 0.5, STAR_COUNT);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = Math.max(currentValue - 0.5, 0);
        if (newValue === 0) newValue = null;
        break;
      case 'Home':
        e.preventDefault();
        newValue = 0.5;
        break;
      case 'End':
        e.preventDefault();
        newValue = STAR_COUNT;
        break;
    }

    if (newValue !== null || e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      onChange(newValue);
    }
  };

  const handleReset = () => {
    onChange(null);
  };

  const ariaLabel = value ? `${label}: ${value} sur ${STAR_COUNT}` : `${label}: non renseigné`;

  return (
    <div className="star-rating">
      <span className="star-rating__label">{label}</span>

      <div className="star-rating__controls">
        <div
          ref={containerRef}
          className="star-rating__stars"
          role="slider"
          aria-label={ariaLabel}
          aria-valuemin={0}
          aria-valuemax={STAR_COUNT}
          aria-valuenow={value ?? 0}
          aria-valuetext={value ? `${value} sur ${STAR_COUNT}` : 'non renseigné'}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseLeave={() => setHoverValue(null)}
        >
          {Array.from({ length: STAR_COUNT }, (_, i) => (
            <div key={i} className="star-rating__star-wrapper">
              <button
                type="button"
                className="star-rating__star-button"
                onMouseMove={(e) => handleMouseMove(e, i)}
                onClick={(e) => handleClick(e, i)}
                tabIndex={-1}
                aria-hidden="true"
              >
                <StarIcon fill={getStarFill(i)} size={32} />
              </button>
              {starLabels && starLabels[i] && (
                <span className="star-rating__star-label">{starLabels[i]}</span>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="star-rating__reset"
          onClick={handleReset}
          aria-label={`Effacer ${label}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
