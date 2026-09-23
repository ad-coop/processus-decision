import type { CriterionId, ProcessValue } from '../../../data/processes';
import {
  getScalePositions,
  generateAccessibilityLabel,
  SCALE_LABELS,
} from '../../../utils/scaleQualifiers';
import './CriterionScale.css';

export interface CriterionScaleProps {
  criterionId: CriterionId;
  value: ProcessValue;
}

export function CriterionScale({ criterionId, value }: CriterionScaleProps) {
  const accessibilityLabel = generateAccessibilityLabel(criterionId, value);
  const label = SCALE_LABELS[criterionId];

  const positions = getScalePositions(value);

  return (
    <div className="criterion-scale">
      <div className="criterion-scale__label">{label}</div>
      {value === '*' ? (
        <div className="criterion-scale__value" aria-label={accessibilityLabel}>
          <span className="criterion-scale__variable">Variable</span>
        </div>
      ) : (
        <div className="criterion-scale__squares" aria-label={accessibilityLabel}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`criterion-scale__square${positions.includes(i + 1) ? ' criterion-scale__square--primary' : ''}`}
              aria-hidden="true"
            />
          ))}
          <span className="criterion-scale__sr-only">{accessibilityLabel}</span>
        </div>
      )}
    </div>
  );
}
