import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CriterionScale } from './CriterionScale';

describe('CriterionScale', () => {
  it('renders label correctly', () => {
    render(<CriterionScale label="Rapidité" value={3} />);
    expect(screen.getByText('Rapidité')).toBeInTheDocument();
  });

  it('renders 10 squares', () => {
    const { container } = render(<CriterionScale label="Test" value={3} />);
    const squares = container.querySelectorAll('.criterion-scale__square');
    expect(squares).toHaveLength(10);
  });

  it('colors squares correctly for single value', () => {
    const { container } = render(<CriterionScale label="Test" value={3} />);
    const squares = container.querySelectorAll('.criterion-scale__square');

    // Value 3 * 2 = position 6 should be primary
    expect(squares[5]).toHaveClass('criterion-scale__square--primary');

    // Other squares should not be primary or secondary
    expect(squares[0]).not.toHaveClass('criterion-scale__square--primary');
    expect(squares[0]).not.toHaveClass('criterion-scale__square--secondary');
  });

  it('colors squares correctly for range', () => {
    const { container } = render(<CriterionScale label="Test" value={[1.5, 3]} />);
    const squares = container.querySelectorAll('.criterion-scale__square');

    // Range [1.5, 3] * 2 = [3, 6], so positions 3-6 should be primary
    expect(squares[2]).toHaveClass('criterion-scale__square--primary');
    expect(squares[3]).toHaveClass('criterion-scale__square--primary');
    expect(squares[4]).toHaveClass('criterion-scale__square--primary');
    expect(squares[5]).toHaveClass('criterion-scale__square--primary');

    // Outside range should not be colored
    expect(squares[1]).not.toHaveClass('criterion-scale__square--primary');
    expect(squares[6]).not.toHaveClass('criterion-scale__square--primary');
  });

  it('handles wildcard display', () => {
    render(<CriterionScale label="Test" value="*" />);
    expect(screen.getByText('Variable')).toBeInTheDocument();
  });

  it('generates correct aria-label for single value', () => {
    const { container } = render(<CriterionScale label="Rapidité" value={3} />);
    const scalesContainer = container.querySelector('.criterion-scale__squares');
    expect(scalesContainer).toHaveAttribute('aria-label');

    const ariaLabel = scalesContainer?.getAttribute('aria-label');
    expect(ariaLabel).toContain('Rapidité');
    expect(ariaLabel).toContain('quelques heures');
  });

  it('generates correct aria-label for range', () => {
    const { container } = render(<CriterionScale label="Rapidité" value={[3, 4]} />);
    const scalesContainer = container.querySelector('.criterion-scale__squares');
    const ariaLabel = scalesContainer?.getAttribute('aria-label');

    expect(ariaLabel).toContain('Rapidité');
    expect(ariaLabel).toContain('idéal');
    expect(ariaLabel).toContain('acceptable');
  });

  it('generates correct aria-label for wildcard', () => {
    const { container } = render(<CriterionScale label="Test" value="*" />);
    const valueContainer = container.querySelector('.criterion-scale__value');
    const ariaLabel = valueContainer?.getAttribute('aria-label');

    expect(ariaLabel).toContain('Variable');
  });

  it('includes screen reader only text', () => {
    const { container } = render(<CriterionScale label="Rapidité" value={3} />);
    const srText = container.querySelector('.criterion-scale__sr-only');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveTextContent('Rapidité');
  });

  it('hides decorative squares from screen readers', () => {
    const { container } = render(<CriterionScale label="Test" value={3} />);
    const squares = container.querySelectorAll('.criterion-scale__square');

    squares.forEach((square) => {
      expect(square).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
