import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { StarRating } from '../src/components/common/StarRating';

describe('StarRating', () => {
  const defaultProps = {
    label: 'Test criterion',
    value: null,
    onChange: vi.fn(),
  };

  it('renders the label', () => {
    render(<StarRating {...defaultProps} />);
    expect(screen.getByText('Test criterion')).toBeInTheDocument();
  });

  it('renders 5 star elements and 1 reset button', () => {
    const { container } = render(<StarRating {...defaultProps} />);

    const starElements = container.querySelectorAll('.star-rating__star-button');
    expect(starElements).toHaveLength(5);

    const resetButton = screen.getByRole('button', { name: /effacer/i });
    expect(resetButton).toBeInTheDocument();
  });

  it('renders star labels when provided', () => {
    render(<StarRating {...defaultProps} starLabels={['Low', '', 'Medium', '', 'High']} />);
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('displays correct aria-label when no value', () => {
    render(<StarRating {...defaultProps} />);
    expect(
      screen.getByRole('slider', { name: 'Test criterion: non renseigné' })
    ).toBeInTheDocument();
  });

  it('displays correct aria-label when value is set', () => {
    render(<StarRating {...defaultProps} value={3.5} />);
    expect(screen.getByRole('slider', { name: 'Test criterion: 3.5 sur 5' })).toBeInTheDocument();
  });

  it('calls onChange when reset button is clicked', async () => {
    const onChange = vi.fn();
    render(<StarRating {...defaultProps} value={3} onChange={onChange} />);

    const resetButton = screen.getByRole('button', { name: 'Effacer Test criterion' });
    await userEvent.click(resetButton);

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('supports keyboard navigation with arrow keys', async () => {
    const onChange = vi.fn();
    render(<StarRating {...defaultProps} value={2} onChange={onChange} />);

    const slider = screen.getByRole('slider');
    slider.focus();

    // Arrow right increases by 0.5
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(2.5);

    // Arrow left decreases by 0.5
    onChange.mockClear();
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(1.5);
  });

  it('sets value to null when decreasing below 0.5', () => {
    const onChange = vi.fn();
    render(<StarRating {...defaultProps} value={0.5} onChange={onChange} />);

    const slider = screen.getByRole('slider');
    slider.focus();

    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('does not exceed max value of 5', () => {
    const onChange = vi.fn();
    render(<StarRating {...defaultProps} value={5} onChange={onChange} />);

    const slider = screen.getByRole('slider');
    slider.focus();

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('has accessible reset button', () => {
    render(<StarRating {...defaultProps} label="My rating" />);
    expect(screen.getByRole('button', { name: 'Effacer My rating' })).toBeInTheDocument();
  });
});
