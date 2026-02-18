import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Catalogue } from './Catalogue';
import { ProcessDetail } from '../ProcessDetail/ProcessDetail';
import { DECISION_PROCESSES } from '../../data/processes';
import { slugify } from '../../utils/slug';

function renderCatalogue() {
  return render(
    <MemoryRouter>
      <Catalogue />
    </MemoryRouter>
  );
}

describe('Catalogue', () => {
  it('renders_processesSection', () => {
    renderCatalogue();
    expect(screen.getByRole('heading', { name: 'Processus' })).toBeInTheDocument();
  });

  it('renders_familiesSection', () => {
    renderCatalogue();
    expect(screen.getByRole('heading', { name: 'Familles' })).toBeInTheDocument();
  });

  it('renders_allProcessEntries', () => {
    renderCatalogue();
    const processCount = DECISION_PROCESSES.filter((p) => !p.isFamily).length;
    const processLinks = DECISION_PROCESSES.filter((p) => !p.isFamily).map((p) =>
      screen.getByRole('link', { name: p.name })
    );
    expect(processLinks).toHaveLength(processCount);
  });

  it('renders_allFamilyEntries', () => {
    renderCatalogue();
    const familyCount = DECISION_PROCESSES.filter((p) => p.isFamily).length;
    const familyLinks = DECISION_PROCESSES.filter((p) => p.isFamily).map((p) =>
      screen.getByRole('link', { name: p.name })
    );
    expect(familyLinks).toHaveLength(familyCount);
  });

  it('renders_linkWithCorrectSlug', () => {
    renderCatalogue();
    const process = DECISION_PROCESSES.find((p) => !p.isFamily)!;
    const link = screen.getByRole('link', { name: process.name });
    expect(link).toHaveAttribute('href', `/processus/${slugify(process.name)}`);
  });

  it('link_whenClicked_navigatesToDetailWithBackToCatalogueLink', async () => {
    const user = userEvent.setup();
    const process = DECISION_PROCESSES.find((p) => !p.isFamily)!;
    const router = createMemoryRouter(
      [
        { path: '/catalogue', element: <Catalogue /> },
        { path: '/processus/:slug', element: <ProcessDetail /> },
      ],
      { initialEntries: ['/catalogue'] }
    );

    render(<RouterProvider router={router} />);
    await user.click(screen.getByRole('link', { name: process.name }));

    expect(screen.getByRole('link', { name: /retour au catalogue/i })).toBeInTheDocument();
  });

  it('renders_processesInAlphabeticalOrder', () => {
    renderCatalogue();
    const sorted = DECISION_PROCESSES.filter((p) => !p.isFamily).sort((a, b) =>
      a.name.localeCompare(b.name, 'fr')
    );
    const processesHeading = screen.getByRole('heading', { name: 'Processus' });
    const processesSection = processesHeading.closest('section')!;
    const links = Array.from(processesSection.querySelectorAll('a'));
    expect(links[0]).toHaveTextContent(sorted[0].name);
    expect(links[links.length - 1]).toHaveTextContent(sorted[sorted.length - 1].name);
  });
});
