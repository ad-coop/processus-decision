import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { CriteriaForm } from '../src/pages/CriteriaForm';

describe('CriteriaForm', () => {
  it('shows error when submitting without selecting any criterion', async () => {
    render(<CriteriaForm />);

    const submitButton = screen.getByRole('button', { name: 'Identifier les processus adaptés' });
    await userEvent.click(submitButton);

    expect(screen.getByText('Sélectionnez au moins un critère')).toBeInTheDocument();
  });

  it('error message has aria-live for accessibility', async () => {
    render(<CriteriaForm />);

    const submitButton = screen.getByRole('button', { name: 'Identifier les processus adaptés' });
    await userEvent.click(submitButton);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });

  it('clears error when user selects a criterion', async () => {
    render(<CriteriaForm />);

    // Trigger error first
    const submitButton = screen.getByRole('button', { name: 'Identifier les processus adaptés' });
    await userEvent.click(submitButton);
    expect(screen.getByText('Sélectionnez au moins un critère')).toBeInTheDocument();

    // Select a criterion using keyboard navigation
    const sliders = screen.getAllByRole('slider');
    sliders[0].focus();
    fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });

    // Error should be gone
    expect(screen.queryByText('Sélectionnez au moins un critère')).not.toBeInTheDocument();
  });
});
