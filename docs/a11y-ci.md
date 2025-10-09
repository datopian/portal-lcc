# Accessibility CI (WCAG 2.2 AA)

This repo runs automated a11y checks on PRs and main:

- **Playwright + axe**: Scans key routes from `public/__routes.json`. CI **fails** on serious/critical violations.
- **Pa11y CI**: Broad crawl of the same routes. Only error-level issues fail CI.
- **Lighthouse CI**: Asserts `categories:accessibility >= 0.95` on key routes.

## Local usage

```bash
npm run build
npm run generate:routes
npm start
# in another terminal:
BASE_URL=http://localhost:3000 npx playwright test
BASE_URL=http://localhost:3000 npm run test:pa11y
BASE_URL=http://localhost:3000 npm run test:lhci