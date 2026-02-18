import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Results } from '../src/pages/Results';

function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
}

const renderWithRouter = (route: string) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/results" element={<Results />} />
        <Route path="/processus/:slug" element={<LocationDisplay />} />
      </Routes>
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
      expect(listItems.length).toBeGreaterThanOrEqual(1);
    });

    it('displays rank numbers with percentage for each process', () => {
      renderWithRouter('/results?temps-disponible=3');

      const rankBadges = screen.getAllByLabelText(/Rang \d+, \d+% de correspondance/);
      expect(rankBadges.length).toBeGreaterThanOrEqual(1);
    });

    it('displays process names', () => {
      renderWithRouter('/results?temps-disponible=3');

      const processNames = screen.getAllByRole('heading', { level: 2 });
      expect(processNames.length).toBeGreaterThanOrEqual(1);
    });

    it('displays enabled "Voir le détail" buttons', () => {
      renderWithRouter('/results?temps-disponible=3');

      const detailButtons = screen.getAllByRole('button', { name: 'Voir le détail' });
      expect(detailButtons.length).toBeGreaterThanOrEqual(1);

      detailButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });

    it('navigates to process detail page when clicking "Voir le détail" button', async () => {
      const user = userEvent.setup();
      renderWithRouter('/results?temps-disponible=3');

      const detailButtons = screen.getAllByRole('button', { name: 'Voir le détail' });
      await user.click(detailButtons[0]);

      expect(screen.getByTestId('location-display')).toBeInTheDocument();
      expect(screen.getByTestId('location-display').textContent).toMatch(/^\/processus\/.+/);
    });

    it('displays back link to modify criteria', () => {
      renderWithRouter('/results?temps-disponible=3');

      const backLink = screen.getByRole('link', { name: '← Modifier les critères' });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute('href', '/');
    });

    it('uses different labels for criterion banner and process cards', () => {
      renderWithRouter('/results?temps-disponible=3');

      const banner = screen.getByRole('region', { name: 'Vos critères sélectionnés' });
      const bannerLabel = banner.querySelector('.results__criterion-label');
      expect(bannerLabel?.textContent).toBe('Temps disponible');

      const processCards = screen.getAllByRole('listitem');
      const processDetailLabels = processCards[0].querySelectorAll('.results__detail-label');
      const rapiditeLabel = Array.from(processDetailLabels).find(
        (label) => label.textContent === 'Rapidité'
      );
      expect(rapiditeLabel).toBeDefined();
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

  describe('threshold filtering', () => {
    it('shows percentage in rank badges', () => {
      renderWithRouter('/results?temps-disponible=3');

      const percentageLabels = screen.getAllByText(/%$/);
      expect(percentageLabels.length).toBeGreaterThanOrEqual(1);
    });
  });
});
