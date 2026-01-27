import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { MemoryRouter } from 'react-router-dom';
import { CriteriaForm } from '../src/pages/CriteriaForm';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe('CriteriaForm', () => {
  it('shows error when submitting without selecting any criterion', async () => {
    renderWithRouter(<CriteriaForm />);

    const submitButton = screen.getByRole('button', { name: 'Identifier les processus adaptés' });
    await userEvent.click(submitButton);

    expect(screen.getByText('Sélectionnez au moins un critère')).toBeInTheDocument();
  });

  it('error message has aria-live for accessibility', async () => {
    renderWithRouter(<CriteriaForm />);

    const submitButton = screen.getByRole('button', { name: 'Identifier les processus adaptés' });
    await userEvent.click(submitButton);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });

  it('form has aria-describedby linking to error message', async () => {
    renderWithRouter(<CriteriaForm />);

    const form = document.querySelector('form');
    expect(form).not.toHaveAttribute('aria-describedby');

    const submitButton = screen.getByRole('button', { name: 'Identifier les processus adaptés' });
    await userEvent.click(submitButton);

    expect(form).toHaveAttribute('aria-describedby', 'criteria-form-error');
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveAttribute('id', 'criteria-form-error');
  });

  it('clears error when user selects a criterion', async () => {
    renderWithRouter(<CriteriaForm />);

    const submitButton = screen.getByRole('button', { name: 'Identifier les processus adaptés' });
    await userEvent.click(submitButton);
    expect(screen.getByText('Sélectionnez au moins un critère')).toBeInTheDocument();

    const sliders = screen.getAllByRole('slider');
    sliders[0].focus();
    fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });

    expect(screen.queryByText('Sélectionnez au moins un critère')).not.toBeInTheDocument();
  });

  it('renders all 8 criteria after removing "Besoin de trancher"', () => {
    renderWithRouter(<CriteriaForm />);

    expect(screen.getByText('Temps disponible')).toBeInTheDocument();
    expect(screen.getByText("Niveau d'enjeu")).toBeInTheDocument();
    expect(screen.getByText('Simplicité')).toBeInTheDocument();
    expect(screen.getByText('Taille de groupe')).toBeInTheDocument();
    expect(screen.getByText("Niveau d'adhésion nécessaire")).toBeInTheDocument();
    expect(screen.getByText('Besoin de créativité')).toBeInTheDocument();
    expect(screen.getByText('Sujet conflictuel')).toBeInTheDocument();
    expect(screen.getByText('Asynchrone')).toBeInTheDocument();
    expect(screen.queryByText('Besoin de trancher')).not.toBeInTheDocument();

    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(8);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<CriteriaForm />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
