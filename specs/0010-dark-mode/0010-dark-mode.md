# Dark Mode

## Goal

Add automatic dark mode support via `prefers-color-scheme: dark`, ensuring WCAG 2.2 Level AA compliance in both light and dark themes.

The app currently declares `color-scheme: light dark` in `index.css` but defines no dark styles. All colors are hardcoded across CSS files and one TSX component. Users with a dark system preference get broken rendering (light text on white backgrounds via browser defaults conflicting with hardcoded colors).

## Approach

- **System preference only** — no manual toggle, no localStorage, no JavaScript theme management
- **Pure CSS custom properties** — define tokens in `:root` (light) and `@media (prefers-color-scheme: dark)` (dark override)
- **Eco-design** — zero JS overhead for theming; CSS-only solution reduces bundle size and runtime cost
- **Mobile-first** — dark mode works identically on all screen sizes

---

## Design Constraints

- All text/background pairings must meet **WCAG 2.2 AA contrast** (4.5:1 normal text, 3:1 large text and UI components)
- Focus indicators (`outline`) must remain visible in both modes
- No new JavaScript dependencies
- Logo (`logo.webp`) must be verified to have a transparent background and remain visible on both light and dark surfaces; same for `favicon.webp` and `apple-touch-icon.webp`

---

## Color Token Table

### Consolidation of current hardcoded values

Several duplicate or near-duplicate colors exist today and should be consolidated into shared tokens:

| Current values                        | Consolidated token       | Purpose                                                                                     |
| ------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| `#007a75`                             | `--color-primary`        | Primary brand / interactive color                                                           |
| `#008f89`                             | `--color-primary-hover`  | Primary hover state                                                                         |
| `#00a9a2`                             | `--color-primary-vivid`  | Star icon filled color (lighter teal)                                                       |
| `#7dd4d0`                             | `--color-primary-light`  | Secondary scale squares                                                                     |
| `rgba(0,122,117,0.06)`                | `--color-primary-subtle` | Hover backgrounds                                                                           |
| `rgba(0,122,117,0.3)`                 | `--color-primary-muted`  | Underline indicators                                                                        |
| `#fff` / `white` (on primary bg)      | `--color-on-primary`     | Text on primary-colored backgrounds (skip-link, submit btn, rank badge, context title)      |
| `#fff` / `white`                      | `--color-bg`             | Page background                                                                             |
| `#f9fafb`                             | `--color-bg-subtle`      | Subtle background (close button hover, context list)                                        |
| `#e5e7eb` (banner bg in Results)      | `--color-bg-muted`       | Muted background (banner, sections) — distinct from `--color-border`                        |
| `#e5e7eb` / `#e0e0e0`                 | `--color-border`         | Borders and dividers (decorative)                                                           |
| `#d1d5db`                             | `--color-border-light`   | Light borders (scale squares)                                                               |
| `#111827`                             | `--color-text`           | Primary body text                                                                           |
| `#333`                                | `--color-text-strong`    | Emphasized text (star labels)                                                               |
| `#374151`                             | `--color-text-heading`   | Section headings                                                                            |
| `#4b5563`                             | `--color-text-body`      | Body text in detail views                                                                   |
| `#666` / `#6b7280`                    | `--color-text-secondary` | Secondary/muted text (consolidate these two)                                                |
| `#737f8c`                             | `--color-text-tertiary`  | Tertiary text (variable labels) — **changed from `#9ca3af`** to meet WCAG AA 4.5:1 on white |
| `#CCCCCC` / `#d1d5db` (Results stars) | `--color-star-empty`     | Empty star stroke — **consolidate both values to this single token**                        |
| `#c92a2a`                             | `--color-error`          | Error text — **changed from `#dc2626`** to meet WCAG AA 4.5:1 on error-bg                   |
| `#fef2f2`                             | `--color-error-bg`       | Error background                                                                            |
| `#fecaca`                             | `--color-error-border`   | Error border                                                                                |
| `#f0f0f0`                             | `--color-hover-bg`       | Reset button hover                                                                          |
| `rgb(0 0 0 / 0.1)`                    | `--color-shadow`         | Box shadows (modal)                                                                         |
| `rgba(0,0,0,0.5)`                     | `--color-modal-backdrop` | Modal backdrop overlay                                                                      |
| `#2d2d2d`                             | `--color-footer-bg`      | Footer background                                                                           |
| `#e0e0e0` (footer)                    | `--color-footer-text`    | Footer body text                                                                            |
| `#ffffff` (footer)                    | `--color-footer-link`    | Footer link text                                                                            |

### Light theme values (`:root`)

Tokens map directly to the consolidated current values listed above. Note two light-mode color adjustments from the original hardcoded values:

- `--color-text-tertiary`: changed from `#9ca3af` (2.54:1 on white — **WCAG fail**) to `#737f8c` (4.67:1 on white)
- `--color-error`: changed from `#dc2626` (4.41:1 on `#fef2f2` — **borderline fail**) to `#c92a2a` (5.02:1 on `#fef2f2`)

### Dark theme overrides (`@media (prefers-color-scheme: dark)`)

| Token                    | Light                  | Dark                   | Rationale                                                                                    |
| ------------------------ | ---------------------- | ---------------------- | -------------------------------------------------------------------------------------------- |
| `--color-primary`        | `#007a75`              | `#4fd1c5`              | Lighter teal for dark backgrounds; 9.15:1 on `#1a1a2e`                                       |
| `--color-primary-hover`  | `#008f89`              | `#5eddd1`              | Hover variant; 10.35:1 on `#1a1a2e`                                                          |
| `--color-primary-vivid`  | `#00a9a2`              | `#4fd1c5`              | Aligns with primary in dark mode                                                             |
| `--color-primary-light`  | `#7dd4d0`              | `#2a6b68`              | Darker shade for scale squares                                                               |
| `--color-primary-subtle` | `rgba(0,122,117,0.06)` | `rgba(79,209,197,0.1)` | Subtle hover tint                                                                            |
| `--color-primary-muted`  | `rgba(0,122,117,0.3)`  | `rgba(79,209,197,0.3)` | Underline indicators                                                                         |
| `--color-on-primary`     | `#ffffff`              | `#1a1a2e`              | Inverts: white on dark teal (light) → dark navy on light teal (dark)                         |
| `--color-bg`             | `#ffffff`              | `#1a1a2e`              | Dark navy — easier on eyes than pure black                                                   |
| `--color-bg-subtle`      | `#f9fafb`              | `#242444`              | Slightly lighter than bg                                                                     |
| `--color-bg-muted`       | `#e5e7eb`              | `#2a2a4a`              | Muted surface (banner); distinct from border                                                 |
| `--color-border`         | `#e5e7eb`              | `#3a3a60`              | Decorative borders and dividers                                                              |
| `--color-border-light`   | `#d1d5db`              | `#6e6e92`              | Light borders for meaningful UI components (scale squares); 3.07:1 on `#1a1a2e`              |
| `--color-text`           | `#111827`              | `#e2e8f0`              | 13.84:1 on `#1a1a2e`                                                                         |
| `--color-text-strong`    | `#333333`              | `#f1f5f9`              | High contrast text; 15.57:1 on `#1a1a2e`                                                     |
| `--color-text-heading`   | `#374151`              | `#e2e8f0`              | Section headings; 13.84:1 on `#1a1a2e`                                                       |
| `--color-text-body`      | `#4b5563`              | `#cbd5e1`              | Body text; 11.49:1 on `#1a1a2e`                                                              |
| `--color-text-secondary` | `#6b7280`              | `#94a3b8`              | 6.65:1 on `#1a1a2e`                                                                          |
| `--color-text-tertiary`  | `#737f8c`              | `#8a9bb0`              | 5.02:1 on `#1a1a2e` — **changed from `#64748b`** (was 3.58:1, failed AA)                     |
| `--color-star-empty`     | `#CCCCCC`              | `#6a6a8a`              | 3.14:1 on `#1a1a2e` — **changed from `#4a4a6a`** (was 2.01:1, failed UI component threshold) |
| `--color-error`          | `#c92a2a`              | `#f87171`              | 6.17:1 on `#1a1a2e`                                                                          |
| `--color-error-bg`       | `#fef2f2`              | `#3b1c1c`              | Dark error background                                                                        |
| `--color-error-border`   | `#fecaca`              | `#a93030`              | **Changed from `#7f1d1d`** (was 1.53:1 on error-bg, invisible); 3.12:1 on `#3b1c1c`          |
| `--color-hover-bg`       | `#f0f0f0`              | `#2d2d52`              | Hover background                                                                             |
| `--color-shadow`         | `rgb(0 0 0 / 0.1)`     | `rgb(0 0 0 / 0.4)`     | Stronger shadows on dark backgrounds for visibility                                          |
| `--color-modal-backdrop` | `rgba(0,0,0,0.5)`      | `rgba(0,0,0,0.7)`      | Darker backdrop for contrast against dark modal surface                                      |
| `--color-footer-bg`      | `#2d2d2d`              | `#111128`              | Darker than page bg                                                                          |
| `--color-footer-text`    | `#e0e0e0`              | `#b0b0c8`              | Subdued footer text; 8.72:1 on `#111128`                                                     |
| `--color-footer-link`    | `#ffffff`              | `#ffffff`              | White links in both modes                                                                    |

### Border contrast note

Borders are split into two tokens based on semantic role:

- `--color-border` (decorative) — used for visual separators (list item borders, header borders, dividers). These do not need to meet WCAG contrast requirements as they are not the sole means of conveying information.
- `--color-border-light` (meaningful) — used for UI component boundaries (scale squares) where the border helps identify the interactive region. Must meet 3:1 minimum against `--color-bg`.

### Contrast verification summary

All dark-mode pairings must meet these minimums (ratios computed via WCAG relative luminance formula):

| Pairing                                           | Ratio   | WCAG AA requirement                     |
| ------------------------------------------------- | ------- | --------------------------------------- |
| `--color-text` on `--color-bg`                    | 13.84:1 | 4.5:1 (normal text)                     |
| `--color-text-strong` on `--color-bg`             | 15.57:1 | 4.5:1 (normal text)                     |
| `--color-text-heading` on `--color-bg`            | 13.84:1 | 4.5:1 (normal text)                     |
| `--color-text-body` on `--color-bg`               | 11.49:1 | 4.5:1 (normal text)                     |
| `--color-text-body` on `--color-bg-subtle`        | ~7.5:1  | 4.5:1 (context list items on subtle bg) |
| `--color-text-secondary` on `--color-bg`          | 6.65:1  | 4.5:1 (normal text)                     |
| `--color-text-secondary` on `--color-bg-subtle`   | ~5.8:1  | 4.5:1 (normal text on subtle bg)        |
| `--color-text-secondary` on `--color-bg-muted`    | ~4.6:1  | 4.5:1 (banner title on muted bg)        |
| `--color-text-tertiary` on `--color-bg`           | 5.02:1  | 4.5:1 (normal text)                     |
| `--color-text-heading` on `--color-bg-muted`      | ~8.7:1  | 4.5:1 (criterion label on banner)       |
| `--color-primary` on `--color-bg`                 | 9.15:1  | 4.5:1 (link text)                       |
| `--color-primary` on `--color-bg-subtle`          | ~7.98:1 | 3:1 (large text / UI)                   |
| `--color-on-primary` on `--color-primary`         | ~9.15:1 | 4.5:1 (text on primary buttons/badges)  |
| `--color-error` on `--color-bg`                   | 6.17:1  | 4.5:1 (error messages)                  |
| `--color-error` on `--color-error-bg`             | ~5.55:1 | 4.5:1 (error text on error bg)          |
| `--color-error-border` on `--color-error-bg`      | ~3.12:1 | 3:1 (UI component boundary)             |
| `--color-star-empty` on `--color-bg`              | 3.14:1  | 3:1 (UI component)                      |
| `--color-border-light` on `--color-bg`            | 3.07:1  | 3:1 (meaningful UI border)              |
| `--color-footer-text` on `--color-footer-bg`      | 8.72:1  | 4.5:1 (normal text)                     |
| `--color-footer-link` on `--color-footer-bg`      | 18.51:1 | 4.5:1 (normal text)                     |
| Focus outline (`--color-primary`) on `--color-bg` | 9.15:1  | 3:1 (UI component)                      |

---

## Files to Modify

### CSS files — replace hardcoded colors with `var()` tokens

| File                                                      | Hardcoded colors to replace                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.css`                                           | `#007a75` (back link, page title, focus outline) — **also define all `:root` tokens and dark media query here**                                                                                                                                                                                                                                                                                               |
| `src/components/ui/Layout/Layout.css`                     | `#007a75` (skip link bg), `white` (skip link text → `--color-on-primary`)                                                                                                                                                                                                                                                                                                                                     |
| `src/components/ui/Layout/Header.css`                     | `#007a75` (title, links, toggle, focus, active), `#e0e0e0` (borders), `#fff` (nav bg), `rgba(0,122,117,…)` (hover/underline)                                                                                                                                                                                                                                                                                  |
| `src/components/ui/Layout/Footer.css`                     | `#2d2d2d` (bg), `#e0e0e0` (text), `#ffffff` (links, focus). **Add `border-top: 1px solid var(--color-border)` to `.footer`** to visually separate footer from content in dark mode (the `#1a1a2e` → `#111128` transition is barely perceptible without it)                                                                                                                                                    |
| `src/components/common/Modal/Modal.css`                   | `#007a75` (title, hover, focus), `#e5e7eb` (borders), `#6b7280` (close icon), `white` (close bg), `#f9fafb` (close hover bg), `rgba(0,0,0,0.5)` (backdrop → `--color-modal-backdrop`), `rgb(0 0 0 / 0.1)` (box-shadow → `--color-shadow`). **Add explicit `background-color: var(--color-bg)` and `color: var(--color-text)` on `.modal`** to override dialog-polyfill defaults and ensure consistent theming |
| `src/components/common/StarRating/StarRating.css`         | `#007a75` (focus), `#333` (label), `#e0e0e0` (border), `#666` (star labels, reset), `#f0f0f0` (reset hover)                                                                                                                                                                                                                                                                                                   |
| `src/components/common/CriterionScale/CriterionScale.css` | `#007a75` (primary squares), `#7dd4d0` (secondary squares), `#374151` (label), `#d1d5db` (square border), `white` (square bg), `#6b7280` (value), `#9ca3af` (variable)                                                                                                                                                                                                                                        |
| `src/pages/CriteriaForm/CriteriaForm.css`                 | `#007a75` (links, submit btn bg, focus), `#008f89` (submit hover), `white` (submit text → `--color-on-primary`), `#dc2626` / `#fef2f2` / `#fecaca` (error)                                                                                                                                                                                                                                                    |
| `src/pages/Catalogue/Catalogue.css`                       | `#374151` (column title), `#e5e7eb` (item borders), `#111827` (link), `#007a75` (link hover, focus)                                                                                                                                                                                                                                                                                                           |
| `src/pages/ProcessDetail/ProcessDetail.css`               | `#007a75` (context titles bg, links, focus), `#374151` (section titles), `#4b5563` (steps, context items), `#6b7280` (not-found, attribution), `#f9fafb` (context list bg), `#e5e7eb` (borders), `white` (context title text → `--color-on-primary`)                                                                                                                                                          |
| `src/pages/Results/Results.css`                           | `#007a75` (process names, rank bg, links, buttons, stars, focus), `#e5e7eb` (banner bg → `--color-bg-muted`, **not** `--color-border`), `#374151` (labels), `#6b7280` (empty text, values, banner title), `white` (rank text → `--color-on-primary`, button hover, button bg), `#d1d5db` (empty stars → `--color-star-empty`, **consolidate with StarIcon**)                                                  |

### TSX file — migrate inline colors to CSS custom properties

| File                                            | Change                                                                                                                                                                                                                            |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/common/StarRating/StarIcon.tsx` | Replace `FILLED_COLOR = '#00a9a2'` and `EMPTY_COLOR = '#CCCCCC'` constants with CSS custom properties read via `getComputedStyle` or, preferably, use `currentColor`/`var()` via inline `style` attributes referencing the tokens |

---

## Out of Scope

- Manual light/dark toggle button
- localStorage or cookie-based theme persistence
- JavaScript-based theme management (e.g., `class="dark"` on `<html>`)
- Dark mode variants of the logo
- Color theme customization beyond light/dark
- `::selection` styling (delegated to browser defaults via `color-scheme: light dark`)
- Scrollbar styling (delegated to browser defaults via `color-scheme: light dark`)

---

## Testing

### Manual testing

- **Browser DevTools** — Use "Rendering > Emulate CSS media feature prefers-color-scheme" to switch between light and dark without changing OS settings
- **Visual inspection** — Verify every page (Criteria Form, Results, Catalogue, Process Detail) in both modes
- **Focus indicators** — Tab through all interactive elements in dark mode; verify focus outlines are visible
- **Modal** — Open process detail modal in dark mode; verify backdrop contrast, box-shadow visibility, and content readability
- **Logo** — Verify `logo.webp` renders correctly on both light and dark header backgrounds (transparent background required)
- **"On-primary" elements** — Verify skip-link, submit button, rank badge, and context titles are legible in dark mode (dark text on light teal)

### Automated testing

- **Lighthouse accessibility audit** — Run in both light and dark mode; score must remain >= current baseline
- **Contrast checks** — Use axe DevTools or Colour Contrast Analyser to verify all pairings listed in the contrast table above
- **Responsive** — Test dark mode at 320px, 768px, and 1024px+ breakpoints

### Unit tests

- **StarIcon** — Test that the component renders with the correct CSS custom property references (not hardcoded hex values)
- **Snapshot/regression** — Verify no unintended visual changes in light mode after token migration

---

## Acceptance Criteria

- [ ] All hardcoded color values in CSS files are replaced with CSS custom properties
- [ ] Light theme tokens defined in `:root` produce identical rendering to current app (no visual regression), with the exception of the two adjusted light-mode colors (`--color-text-tertiary`, `--color-error`)
- [ ] Dark theme tokens defined in `@media (prefers-color-scheme: dark)` provide a complete dark palette
- [ ] All text/background pairings in both modes meet WCAG 2.2 AA contrast ratios (4.5:1 normal, 3:1 large/UI)
- [ ] `StarIcon.tsx` inline colors migrated to CSS custom properties
- [ ] Focus outlines (`outline: 2px solid`) are visible in both modes
- [ ] Modal has explicit `background-color` and `color` overriding polyfill/browser defaults
- [ ] Modal backdrop uses `--color-modal-backdrop` (darker in dark mode)
- [ ] Modal box-shadow uses `--color-shadow` (stronger in dark mode)
- [ ] Elements with white text on primary backgrounds (skip-link, submit button, rank badge, context title) use `--color-on-primary` token
- [ ] Results banner background uses `--color-bg-muted` (not `--color-border`)
- [ ] Empty star colors consolidated: both `Results.css` (`#d1d5db`) and `StarIcon.tsx` (`#CCCCCC`) use `--color-star-empty`
- [ ] Duplicate greys (`#666` and `#6b7280`) are consolidated into `--color-text-secondary`
- [ ] Decorative vs. meaningful borders documented; meaningful borders (`--color-border-light`) meet 3:1 contrast
- [ ] Footer has visible boundary in dark mode (top border)
- [ ] No JavaScript added for theming
- [ ] All pages render correctly in both modes at mobile (320px), tablet (768px), and desktop (1024px+) breakpoints
- [ ] Lighthouse accessibility score unchanged or improved in both modes
- [ ] `logo.webp` verified to have transparent background and be visible in both modes
