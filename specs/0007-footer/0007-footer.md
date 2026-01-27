# Add footer

## Goal

Add a footer for copyrights and external links.

## Spec

### Layout

- Add a footer to the global `Layout` component
- Two-column layout:
  - **Left column**: Copyright, attribution, and license text
  - **Right column**: Social/external link icons
- Mobile: Stacks vertically (content first, then icons)
- Desktop: Side by side with space-between alignment

```
Desktop:
┌─────────────────────────────────────────────────────┐
│ © 2026 Alban Dericbourg              [FB] [LI] [GH] │
│ Attribution text...                                 │
│ License text...                                     │
└─────────────────────────────────────────────────────┘

Mobile:
┌─────────────────────┐
│ © 2026 ...          │
│ Attribution...      │
│ License...          │
│                     │
│   [FB] [LI] [GH]    │
└─────────────────────┘
```

### Visual Design (Accessibility-focused)

- **Background**: Dark grey (`#2d2d2d`) for good contrast
- **Text**: Light grey (`#e0e0e0`) for body text, white (`#ffffff`) for links
- **Contrast**: Minimum 4.5:1 ratio for WCAG AA compliance
- **Link focus states**: Visible focus outline for keyboard navigation
- **Spacing**: Adequate padding (1.5rem vertical minimum) for touch targets

### Content

1. **Copyright line**:
   - "© {current year} Alban Dericbourg" (dynamic year)

2. **Attribution block**:
   - "Les outils de la [Gouvernance Intégrative](https://gouvernanceintegrative.com/) sont la propriété de Sasha Epp et sont distribués sous licence CC BY-SA"

3. **Application license**:
   - "Application distribuée sous licence [GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)"

### Social/External Links

Use SVG icons with accessible labels (`aria-label` for screen readers):

- Facebook: https://www.facebook.com/adcoop.alban.dericbourg
- LinkedIn: https://www.linkedin.com/in/alban-dericbourg/
- GitHub repository: https://github.com/ad-coop/processus-decision

### Accessibility Requirements

- All links must have visible focus states
- Icons must have `aria-label` describing their destination
- External links should have `rel="noopener noreferrer"` and optionally indicate they open in a new tab
- Text must meet WCAG AA contrast requirements
