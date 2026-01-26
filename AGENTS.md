# processus-decision

## Project Status

**Bootstrapped** - Ready for feature development.

## Quick Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm test             # Run Vitest tests
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

### Planned (not yet installed)

- **State**: Zustand
- **Routing**: React Router v7
- **UI**: Ant Design + Tailwind CSS
- **HTTP**: Axios

## Project Structure

Target structure - create directories as needed:

```
src/
├── components/
│   ├── common/        # Shared components (Button, Modal, etc.)
│   └── ui/            # Domain-specific UI components
├── pages/             # Route page components
├── hooks/             # Custom React hooks
├── store/             # Zustand stores
├── services/          # API services (axios)
├── types/             # Shared TypeScript definitions
├── utils/             # Helper functions
├── constants/         # App constants
└── styles/            # Global styles
specs/                 # Feature specifications
tests/                 # Test files (mirror src/ structure)
```

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

### State Management (Zustand) - when installed

```typescript
// store/useExampleStore.ts
interface ExampleState {
  data: Data | null;
  setData: (data: Data) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
```

### API Services - when installed

- All API calls go through `services/api.ts`
- Use axios interceptors for auth headers and error handling
- Type all request/response payloads

### Testing

- Test files: `ComponentName.test.tsx` in `tests/` mirroring `src/`
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
