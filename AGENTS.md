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

- **Framework**: React 19 + TypeScript
- **Build**: Vite
- **State**: Zustand
- **Routing**: React Router v7
- **UI**: Ant Design + Tailwind CSS
- **HTTP**: Axios
- **Testing**: Vitest + React Testing Library
- **Quality**: ESLint + Prettier + Husky

## Project Structure

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

### Components

- Use function components with hooks (no class components)
- Define `interface Props` for all component props
- PascalCase for components, file name matches component name
- One component per file, single responsibility

### State Management (Zustand)

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

### API Services

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
