import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

function renderHeader(initialPath: string | { pathname: string; state?: unknown } = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Header />
    </MemoryRouter>
  );
}

describe('Header', () => {
  describe('menu toggle button', () => {
    it('menuButton_hasOpenLabel_whenClosed', () => {
      renderHeader();

      expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toBeInTheDocument();
    });

    it('menuButton_isNotExpanded_whenClosed', () => {
      renderHeader();

      expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('menuButton_hasCloseLabel_whenOpen', () => {
      renderHeader();

      fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));

      expect(screen.getByRole('button', { name: 'Fermer le menu' })).toBeInTheDocument();
    });

    it('menuButton_isExpanded_whenOpen', () => {
      renderHeader();

      fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));

      expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('menuButton_toggle_closesOpenMenu', () => {
      renderHeader();
      fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));

      fireEvent.click(screen.getByRole('button', { name: 'Fermer le menu' }));

      expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toBeInTheDocument();
    });
  });

  describe('close behaviour', () => {
    it('escapeKey_whenOpen_closesMenu', () => {
      renderHeader();
      fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toBeInTheDocument();
    });

    it('navLinkClick_whenOpen_closesMenu', () => {
      renderHeader();
      fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));

      fireEvent.click(screen.getByRole('link', { name: 'Catalogue' }));

      expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toBeInTheDocument();
    });
  });

  describe('active link state', () => {
    it('searchLink_isActive_onRootPath', () => {
      renderHeader('/');

      expect(screen.getByRole('link', { name: 'Recherche de processus' })).toHaveClass(
        'header__nav-link--active'
      );
    });

    it('catalogueLink_isActive_onCataloguePath', () => {
      renderHeader('/catalogue');

      expect(screen.getByRole('link', { name: 'Catalogue' })).toHaveClass(
        'header__nav-link--active'
      );
    });

    it('catalogueLink_isActive_onProcessusPath_whenFromCatalogue', () => {
      renderHeader({ pathname: '/processus/vote', state: { from: 'catalogue' } });

      expect(screen.getByRole('link', { name: 'Catalogue' })).toHaveClass(
        'header__nav-link--active'
      );
    });

    it('searchLink_isActive_onProcessusPath_whenFromResults', () => {
      renderHeader({ pathname: '/processus/vote', state: { from: 'results' } });

      expect(screen.getByRole('link', { name: 'Recherche de processus' })).toHaveClass(
        'header__nav-link--active'
      );
    });
  });
});
