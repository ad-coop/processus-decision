import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ProcessDetail } from './ProcessDetail';

function renderDetail(slug: string, state?: object) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: `/processus/${slug}`, state: state ?? null }]}>
      <Routes>
        <Route path="/processus/:slug" element={<ProcessDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ProcessDetail', () => {
  it('renders_ofKnownSlug_showsProcessName', () => {
    renderDetail('consentement');

    expect(screen.getByRole('heading', { level: 1, name: 'Consentement' })).toBeInTheDocument();
  });

  it('renders_ofUnknownSlug_shows404', () => {
    renderDetail('not-a-real-process');

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Processus non trouv\u00e9',
      })
    ).toBeInTheDocument();
  });

  it('renders_whenFromResults_showsBackToResults', () => {
    renderDetail('consentement', { from: 'results', search: '?simplicite=3' });

    const link = screen.getByRole('link', { name: /retour aux r\u00e9sultats/i });
    expect(link).toHaveAttribute('href', '/results?simplicite=3');
  });

  it('renders_whenFromCatalogue_showsBackToCatalogue', () => {
    renderDetail('consentement', { from: 'catalogue' });

    const link = screen.getByRole('link', { name: /retour au catalogue/i });
    expect(link).toHaveAttribute('href', '/catalogue');
  });

  it('renders_withNoState_noBackLink', () => {
    renderDetail('consentement');

    expect(screen.queryByText(/retour aux r\u00e9sultats/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/retour au catalogue/i)).not.toBeInTheDocument();
  });
});
