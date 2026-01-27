import type { ProcessValue } from '../../../data/processes';
import { getScalePositions, generateAccessibilityLabel } from '../../../utils/scaleQualifiers';
import './CriterionScale.css';

export interface CriterionScaleProps {
  label: string;
  value: ProcessValue;
}

export function CriterionScale({ label, value }: CriterionScaleProps) {
  const accessibilityLabel = generateAccessibilityLabel(label, value);

  // Handle wildcard
  if (value === '*') {
    return (
      <div className="criterion-scale">
        <div className="criterion-scale__label">{label}</div>
        <div className="criterion-scale__value" aria-label={accessibilityLabel}>
          <span className="criterion-scale__variable">Variable</span>
        </div>
      </div>
    );
  }

  const { primary, secondary } = getScalePositions(value);

  // Render 10 squares
  const squares = [];
  for (let i = 1; i <= 10; i++) {
    let className = 'criterion-scale__square';

    if (primary.includes(i)) {
      className += ' criterion-scale__square--primary';
    } else if (secondary.includes(i)) {
      className += ' criterion-scale__square--secondary';
    }

    squares.push(<div key={i} className={className} aria-hidden="true" />);
  }

  return (
    <div className="criterion-scale">
      <div className="criterion-scale__label">{label}</div>
      <div className="criterion-scale__squares" aria-label={accessibilityLabel}>
        {squares}
        <span className="criterion-scale__sr-only">{accessibilityLabel}</span>
      </div>
    </div>
  );
}
