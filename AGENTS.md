# processus-decision

## Project Status

**Bootstrapped** - Ready for feature development.

## Quick Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm test             # Run Vitest tests
npm run test:watch   # Run Vitest in watch mode
npm run test:coverage # Run with coverage report
npm run preview      # Preview production build locally
npm run build        # Production build
npm run lint         # ESLint check
npm run format       # Prettier format
npm run format:check # Check formatting (CI)
```

## Tech Stack

### Current

- **Framework**: React 19 + TypeScript
- **Build**: Vite
- **Testing**: Vitest + React Testing Library
- **Quality**: ESLint + Prettier + Husky
- **Routing**: React Router v7

### Planned (not yet installed)

- **State**: Zustand
- **UI**: Ant Design + Tailwind CSS
- **HTTP**: Axios

## Project Structure

```
src/
├── components/
│   ├── common/        # Shared components (Button, Modal, etc.)
│   │   └── ComponentName/
│   │       ├── ComponentName.tsx
│   │       ├── ComponentName.css
│   │       ├── ComponentName.test.tsx   # Tests colocated with components
│   │       └── index.ts
│   └── ui/            # Domain-specific UI components
├── data/              # Static/seed data
├── pages/             # Route page components
└── utils/             # Helper functions
specs/                 # Feature specifications
```

Note: `hooks/`, `store/`, `services/`, `types/`, `constants/`, `styles/` are planned — create as needed.

## Code Conventions

### Mindset

- Mobile-first design approach
- Support both desktop and mobile views
- (important) Follow eco-design principles (low resource consumption, accessibility)
- (important) Accessibility is a first-class citizen
- Support Screen readers
- Always write unit tests and integration tests

### Components

- Use function components with hooks (no class components)
- Define `interface Props` for all component props
- PascalCase for components, file name matches component name
- One component per file, single responsibility

### Testing

- Test files: `ComponentName.test.tsx` colocated alongside component (same directory)
- Use `vi.fn()` for mocks
- Prefer `screen.getByRole()` over `getByTestId()`

## Environment Variables

Prefix with `VITE_` for client-side access:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_TITLE=Processus Decision
```

## Development Requirements

- Node.js >= 22.0.0
- npm >= 10.0.0

## Deployment

- **Target**: GitHub Pages
- **Trigger**: Git tags matching `v*`
- **Base path**: `/processus-decision/`
- **URL**: `https://<username>.github.io/processus-decision/`

### Static Assets (important)

Assets in `public/` must use `import.meta.env.BASE_URL` to work with the GitHub Pages subdirectory:

```tsx
// ✅ Correct - works in dev and production
<img src={`${import.meta.env.BASE_URL}logo.png`} />

// ❌ Wrong - breaks on GitHub Pages (resolves to domain root)
<img src="/logo.png" />
```

Alternatively, import assets directly (Vite handles the path):

```tsx
import logo from '/logo.png'; // Vite resolves this correctly
<img src={logo} />;
```

## Specification

- When refining a specification, only plan updates on that specification.
