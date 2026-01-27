import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Results } from '../src/pages/Results';

const renderWithRouter = (route: string) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Results />
    </MemoryRouter>
  );
};

describe('Results', () => {
  describe('empty criteria', () => {
    it('shows empty state when no criteria are selected', () => {
      renderWithRouter('/results');

      expect(screen.getByText('Processus adaptés')).toBeInTheDocument();
      expect(screen.getByText('Aucun critère sélectionné.')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Retour au formulaire' })).toBeInTheDocument();
    });
  });

  describe('with criteria', () => {
    it('displays the page title', () => {
      renderWithRouter('/results?temps-disponible=3');

      expect(
        screen.getByRole('heading', { level: 1, name: 'Processus adaptés' })
      ).toBeInTheDocument();
    });

    it('displays selected criteria in banner', () => {
      renderWithRouter('/results?temps-disponible=3&niveau-enjeu=4');

      const banner = screen.getByRole('region', { name: 'Vos critères sélectionnés' });
      expect(banner).toBeInTheDocument();
      expect(screen.getByText('Vos critères')).toBeInTheDocument();

      const criteriaLabels = banner.querySelectorAll('.results__criterion-label');
      expect(criteriaLabels).toHaveLength(2);
      expect(criteriaLabels[0].textContent).toBe('Temps disponible');
      expect(criteriaLabels[1].textContent).toBe("Niveau d'enjeu");
    });

    it('displays process results', () => {
      renderWithRouter('/results?temps-disponible=3');

      const processList = screen.getByRole('list', { name: 'Liste des processus recommandés' });
      expect(processList).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThanOrEqual(3);
      expect(listItems.length).toBeLessThanOrEqual(5);
    });

    it('displays rank numbers for each process', () => {
      renderWithRouter('/results?temps-disponible=3');

      expect(screen.getByLabelText('Rang 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Rang 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Rang 3')).toBeInTheDocument();
    });

    it('displays process names', () => {
      renderWithRouter('/results?temps-disponible=3');

      const processNames = screen.getAllByRole('heading', { level: 2 });
      expect(processNames.length).toBeGreaterThanOrEqual(3);
    });

    it('displays "Voir le détail" buttons that are disabled', () => {
      renderWithRouter('/results?temps-disponible=3');

      const detailButtons = screen.getAllByRole('button', { name: 'Voir le détail' });
      expect(detailButtons.length).toBeGreaterThanOrEqual(3);

      detailButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('displays back link to modify criteria', () => {
      renderWithRouter('/results?temps-disponible=3');

      const backLink = screen.getByRole('link', { name: '← Modifier les critères' });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute('href', '/');
    });
  });

  describe('accessibility', () => {
    it('has proper aria-labels for criteria region', () => {
      renderWithRouter('/results?temps-disponible=3');

      expect(screen.getByRole('region', { name: 'Vos critères sélectionnés' })).toBeInTheDocument();
    });

    it('has proper star rating accessibility labels', () => {
      renderWithRouter('/results?temps-disponible=3');

      expect(screen.getByLabelText('3 étoiles sur 5')).toBeInTheDocument();
    });
  });
});
