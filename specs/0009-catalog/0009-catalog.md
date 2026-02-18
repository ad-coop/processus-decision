# 0009 — Catalogue

## Context

The app currently only offers a search-based workflow. A catalogue provides direct access
to all processes and families without needing to fill the criteria form.

## Navigation

A top navbar is added to the header with two entries:

- **"Recherche de processus"** — links to `/`, active on `/` and `/results`
- **"Catalogue"** — links to `/catalogue`, active on `/catalogue` and `/processus/*`

### Desktop (≥ 768px)

Nav links are displayed inline in the header, aligned to the right.

Active state: 3px solid green bottom border (`#007a75`), font-weight 600. Hover state: subtle translucent bottom border. No background fill — avoids visual confusion with buttons.

### Mobile (< 768px)

A hamburger button replaces the inline nav links. It is positioned at the right of the header.

- Button: icon-only (☰ / ✕), with a visible accessible label (`aria-label="Ouvrir le menu"` / `"Fermer le menu"`).
- Pressing the button toggles a full-width dropdown panel below the header.
- The panel lists the nav entries as full-width tappable rows (min 44px touch target).
- Active entry is highlighted with a left border (`4px solid #007a75`) and font-weight 600.
- Tapping a nav entry closes the panel and navigates to the target page.
- Pressing Escape or navigating also closes the panel.
- The panel does not push page content down — it overlays it.

## Catalogue page (`/catalogue`)

- Alphabetically ordered list of all processes and families
- Two-column layout on desktop, single column on mobile (processes first, then families)
- Left column (desktop) / first section (mobile): individual processes, sorted alphabetically
- Right column (desktop) / second section (mobile): families, sorted alphabetically
- No type badge — the column heading provides the type context
- Each entry is a link to the process detail page (`/processus/:slug`)

## Process detail page (`/processus/:slug`)

- Replaces the former modal-based detail view
- Shows the same content: criterion scales, steps (if individual process), context blocks
- URL is shareable: opening the URL directly shows the correct detail
- Slug is auto-generated from the process name (normalize accents, lowercase, hyphenate)
- Back navigation:
  - When reached from search results: "Retour aux résultats" (preserves search query)
  - When reached from catalogue: "Retour au catalogue"
  - Direct URL access: no back link

## Impact on search results

The "Voir le détail" button in results now navigates to `/processus/:slug` instead of
opening a modal. The `ProcessDetailsModal` component is removed.
