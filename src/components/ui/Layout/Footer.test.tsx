import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  describe('content rendering', () => {
    it('displays copyright with current year', () => {
      render(<Footer />);

      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} Alban Dericbourg`)).toBeInTheDocument();
    });

    it('displays attribution text with link to Gouvernance Intégrative', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: /gouvernance intégrative/i });
      expect(link).toHaveAttribute('href', 'https://gouvernanceintegrative.com/');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('displays license text with link to GPLv3', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: /gplv3/i });
      expect(link).toHaveAttribute('href', 'https://www.gnu.org/licenses/gpl-3.0.html');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('social links', () => {
    it('renders Facebook link with accessible label', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: /facebook/i });
      expect(link).toHaveAttribute('href', 'https://www.facebook.com/adcoop.alban.dericbourg');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders LinkedIn link with accessible label', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: /linkedin/i });
      expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/alban-dericbourg/');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders GitHub link with accessible label', () => {
      render(<Footer />);

      const link = screen.getByRole('link', { name: /github/i });
      expect(link).toHaveAttribute('href', 'https://github.com/ad-coop/processus-decision');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('accessibility', () => {
    it('renders footer element', () => {
      render(<Footer />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders social links navigation with label', () => {
      render(<Footer />);

      const nav = screen.getByRole('navigation', { name: /réseaux sociaux/i });
      expect(nav).toBeInTheDocument();
    });

    it('all social links indicate they open in new tab in their aria-label', () => {
      render(<Footer />);

      const nav = screen.getByRole('navigation', { name: /réseaux sociaux/i });
      const links = within(nav).getAllByRole('link');

      links.forEach((link) => {
        expect(link.getAttribute('aria-label')).toMatch(/ouvre dans un nouvel onglet/i);
      });
    });

    it('SVG icons are hidden from screen readers', () => {
      render(<Footer />);

      const nav = screen.getByRole('navigation', { name: /réseaux sociaux/i });
      const svgs = nav.querySelectorAll('svg');

      svgs.forEach((svg) => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
        expect(svg).toHaveAttribute('focusable', 'false');
      });
    });
  });
});
