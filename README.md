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

Go to **Actions → Release → Run workflow**, select `patch`, `minor`, or `major`, and click **Run workflow**.

The workflow will automatically:

1. Compute the next version from the latest git tag
2. Update `package.json` and create a version bump commit
3. Create and push a git tag
4. Create a GitHub Release with auto-generated notes
5. Trigger the deploy workflow, building and deploying to GitHub Pages

Your site will be available at: `https://<username>.github.io/<repo-name>/`

## CI/CD

| Workflow | Trigger                      | Actions                                          |
| -------- | ---------------------------- | ------------------------------------------------ |
| CI       | Push/PR to `main`            | Lint, test, build                                |
| Release  | Manual (`workflow_dispatch`) | Bump version, tag, create GitHub Release, deploy |
| Deploy   | Tags matching `v*`           | Build and deploy to GitHub Pages                 |
