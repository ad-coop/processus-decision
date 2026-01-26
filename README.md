# processus-decision

A React 19 + TypeScript + Vite application.

## Development

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:3000
npm test         # Run tests
npm run lint     # Check for linting errors
npm run format   # Format code with Prettier
```

## Deployment

This project deploys to **GitHub Pages** automatically when you create a version tag.

### One-time setup

1. Go to your repository **Settings** → **Pages**
2. Under "Build and deployment", select **Source: GitHub Actions**

### Creating a release

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

The deploy workflow will automatically:

1. Build the production bundle
2. Deploy to GitHub Pages

Your site will be available at: `https://<username>.github.io/<repo-name>/`

### Version numbering

Use [semantic versioning](https://semver.org/):

- `v1.0.0` - Major release (breaking changes)
- `v1.1.0` - Minor release (new features)
- `v1.0.1` - Patch release (bug fixes)

## CI/CD

| Workflow | Trigger            | Actions                          |
| -------- | ------------------ | -------------------------------- |
| CI       | Push/PR to `main`  | Lint, test, build                |
| Deploy   | Tags matching `v*` | Build and deploy to GitHub Pages |
