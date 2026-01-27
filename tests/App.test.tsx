import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('renders the header', () => {
    render(<App />);
    expect(screen.getByText('AD COOP | ALBAN DERICBOURG')).toBeInTheDocument();
  });

  it('renders the page title', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: "Aide au choix d'un processus de décision" })
    ).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: 'Identifier les processus adaptés' })
    ).toBeInTheDocument();
  });

  it('renders all criteria (excluding removed "Besoin de trancher")', () => {
    render(<App />);
    expect(screen.getByText('Temps disponible')).toBeInTheDocument();
    expect(screen.getByText("Niveau d'enjeu")).toBeInTheDocument();
    expect(screen.getByText('Simplicité')).toBeInTheDocument();
    expect(screen.getByText('Taille de groupe')).toBeInTheDocument();
    expect(screen.getByText("Niveau d'adhésion nécessaire")).toBeInTheDocument();
    expect(screen.getByText('Besoin de créativité')).toBeInTheDocument();
    expect(screen.getByText('Sujet conflictuel')).toBeInTheDocument();
    expect(screen.getByText('Asynchrone')).toBeInTheDocument();
    expect(screen.queryByText('Besoin de trancher')).not.toBeInTheDocument();
  });

  it('renders the external link with correct attributes', () => {
    render(<App />);
    const link = screen.getByRole('link', { name: /Gouvernance Intégrative/i });
    expect(link).toHaveAttribute('href', 'https://gouvernanceintegrative.com/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
