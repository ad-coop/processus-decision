---
author: Alban Dericbourg
date: 2026-01-26
---

# 0001 - Technical Bootstrap

## Goal

Initialize the project with a working React + TypeScript skeleton.

## Tech Stack (from AGENTS.md)

- React 19 + TypeScript + Vite
- Vitest + React Testing Library
- ESLint + Prettier + Husky
- Node 22+

## Acceptance Criteria

### Build & Dev

- [x] `npm install` succeeds with no warnings
- [x] `npm run dev` starts dev server on port 3000
- [x] `npm run build` produces `dist/` with no errors
- [x] `npm run lint` passes
- [x] `npm run format:check` passes

### Testing

- [x] `npm test` runs Vitest
- [x] Sample test exists and passes
- [x] Coverage reporting enabled (no threshold required yet)

### CI/CD (GitHub Actions)

- [x] `.github/workflows/ci.yml` - runs on push/PR to main:
  - Install dependencies
  - Run linter
  - Run tests
  - Build project
- [x] `.github/workflows/deploy.yml` - runs on tags matching `v*`:
  - Build and deploy to GitHub Pages

### Project Structure

Create minimal structure per AGENTS.md:

- [x] `src/main.tsx` - entry point
- [x] `src/App.tsx` - root component
- [x] `src/components/.keep`
- [x] `tests/App.test.tsx` - sample test

## Out of Scope

- Authentication
- API integration (Axios setup deferred)
- State management (Zustand setup deferred)
- UI library setup (Ant Design, Tailwind deferred)
- Actual application features
- Production environment variables

## Decisions

1. **Deployment target** - GitHub Pages
2. **Branch protection rules** - CI required to pass before merge
3. **Husky hooks** - Pre-commit with lint-staged (state of the art)
