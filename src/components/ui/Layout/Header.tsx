import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import './Header.css';

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isProcessDetail = location.pathname.startsWith('/processus/');
  const isFromSearch = (location.state as { from?: string } | null)?.from === 'results';
  const isSearchActive =
    location.pathname === '/' ||
    location.pathname === '/results' ||
    (isProcessDetail && isFromSearch);
  const isCatalogueActive =
    location.pathname.startsWith('/catalogue') || (isProcessDetail && !isFromSearch);

  const navLinkClass = (isActive: boolean) =>
    `header__nav-link${isActive ? ' header__nav-link--active' : ''}`;

  return (
    <header className="header">
      <img src={`${import.meta.env.BASE_URL}logo.webp`} alt="" className="header__logo" />
      <span className="header__title">AD COOP | ALBAN DERICBOURG</span>

      <button
        className="header__menu-toggle"
        aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isMenuOpen}
        aria-controls="main-nav"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <nav
        id="main-nav"
        aria-label="Navigation principale"
        className={`header__nav${isMenuOpen ? ' header__nav--open' : ''}`}
      >
        <NavLink
          to="/"
          className={navLinkClass(isSearchActive)}
          onClick={() => setIsMenuOpen(false)}
        >
          Recherche de processus
        </NavLink>
        <NavLink
          to="/catalogue"
          className={navLinkClass(isCatalogueActive)}
          onClick={() => setIsMenuOpen(false)}
        >
          Catalogue
        </NavLink>
      </nav>
    </header>
  );
}
