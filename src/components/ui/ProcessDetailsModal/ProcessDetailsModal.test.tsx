import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProcessDetailsModal } from './ProcessDetailsModal';
import type { DecisionProcess } from '../../../data/processes';

const mockIndividualProcess: DecisionProcess = {
  name: 'Test Individual Process',
  isFamily: false,
  criteria: {
    'temps-disponible': { value: 3, label: 'Heures' },
    'niveau-enjeu': { value: 4, label: 'Fort' },
    simplicite: { value: 2, label: 'Simple' },
    'taille-groupe': { value: 3, label: 'Moyen' },
    'niveau-adhesion': { value: 4, label: 'Fort' },
    'besoin-creativite': { value: 3, label: 'Moyen' },
    'sujet-conflictuel': { value: 2, label: 'Déconseillé' },
    asynchrone: { value: 5, label: 'Oui' },
  },
  details: {
    steps: ['Step 1', 'Step 2', 'Step 3'],
    advantages: ['Advantage 1', 'Advantage 2'],
    suitedFor: ['Suited for situation 1'],
    risks: ['Risk 1'],
    notRecommendedFor: ['Not recommended for X'],
  },
};

const mockFamilyProcess: DecisionProcess = {
  name: 'Test Family Process',
  isFamily: true,
  criteria: {
    'temps-disponible': { value: 3, label: 'Heures' },
    'niveau-enjeu': { value: 4, label: 'Fort' },
    simplicite: { value: 2, label: 'Simple' },
    'taille-groupe': { value: 3, label: 'Moyen' },
    'niveau-adhesion': { value: 4, label: 'Fort' },
    'besoin-creativite': { value: 3, label: 'Moyen' },
    'sujet-conflictuel': { value: 2, label: 'Déconseillé' },
    asynchrone: { value: 5, label: 'Oui' },
  },
  details: {
    advantages: ['Family advantage 1'],
    suitedFor: ['Family suited for 1'],
    risks: ['Family risk 1'],
    notRecommendedFor: [],
  },
};

describe('ProcessDetailsModal', () => {
  it('renders process name in title', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText('Test Individual Process')).toBeInTheDocument();
  });

  it('renders process steps for individual processes', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText('Déroulé du processus')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('does not render process steps for family processes', () => {
    render(<ProcessDetailsModal process={mockFamilyProcess} isOpen={true} onClose={vi.fn()} />);

    expect(screen.queryByText('Déroulé du processus')).not.toBeInTheDocument();
  });

  it('renders all 8 criteria scales', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    // Check for custom modal labels
    expect(screen.getByText('Rapidité')).toBeInTheDocument();
    expect(screen.getByText("Niveau d'enjeu")).toBeInTheDocument();
    expect(screen.getByText('Simplicité')).toBeInTheDocument();
    expect(screen.getByText('Taille de groupe idéale')).toBeInTheDocument();
    expect(screen.getByText("Niveau d'adhésion")).toBeInTheDocument();
    expect(screen.getByText('Besoin de créativité')).toBeInTheDocument();
    expect(screen.getByText('Sujet conflictuel')).toBeInTheDocument();
    expect(screen.getByText('Asynchrone')).toBeInTheDocument();
  });

  it('renders all 4 contextual blocks', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText('Avantages')).toBeInTheDocument();
    expect(screen.getByText('Adapté')).toBeInTheDocument();
    expect(screen.getByText('Risques')).toBeInTheDocument();
    expect(screen.getByText('Déconseillé pour')).toBeInTheDocument();
  });

  it('renders advantages list', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText('Advantage 1')).toBeInTheDocument();
    expect(screen.getByText('Advantage 2')).toBeInTheDocument();
  });

  it('renders suited for list', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText('Suited for situation 1')).toBeInTheDocument();
  });

  it('renders risks list', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText('Risk 1')).toBeInTheDocument();
  });

  it('renders not recommended for list', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText('Not recommended for X')).toBeInTheDocument();
  });

  it('renders footer attribution', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText(/Contenu tiré de la boîte à outils/i)).toBeInTheDocument();
    expect(screen.getByText('Gouvernance Intégrative')).toBeInTheDocument();
  });

  it('renders attribution link with correct attributes', () => {
    render(<ProcessDetailsModal process={mockIndividualProcess} isOpen={true} onClose={vi.fn()} />);

    const link = screen.getByRole('link', { name: /Gouvernance Intégrative/i });
    expect(link).toHaveAttribute('href', 'https://gouvernanceintegrative.com/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('returns null when process is null', () => {
    const { container } = render(
      <ProcessDetailsModal process={null} isOpen={true} onClose={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('does not render empty contextual blocks', () => {
    const processWithEmptyBlocks: DecisionProcess = {
      ...mockFamilyProcess,
      details: {
        advantages: ['Advantage 1'],
        suitedFor: [],
        risks: [],
        notRecommendedFor: [],
      },
    };

    render(
      <ProcessDetailsModal process={processWithEmptyBlocks} isOpen={true} onClose={vi.fn()} />
    );

    expect(screen.getByText('Avantages')).toBeInTheDocument();
    expect(screen.queryByText('Adapté')).not.toBeInTheDocument();
    expect(screen.queryByText('Risques')).not.toBeInTheDocument();
    expect(screen.queryByText('Déconseillé pour')).not.toBeInTheDocument();
  });
});
