---
description: Verify page and component changes with the matching e2e spec
globs: ["src/app/**", "src/components/**", "e2e/**"]
priority: 55
---
- Every route has a spec under `e2e/`. After changing a page or a component it renders, run that spec: `npx playwright test e2e/<page>.spec.ts`. Run the full suite only before a PR.
- Playwright and `npm run build` need network access to the Sanity CDN. Without it CMS-backed pages render code-default copy and specs asserting CMS copy fail spuriously. Do not call a spec stale on that evidence.
- If a rebuild shows stale copy, clear `.next` first; the Sanity client caches with a one-hour revalidate.
- Under the Bash sandbox `next dev` can die with EMFILE because a stray lockfile in the home directory widens the watch root. Run Playwright outside the sandbox if the web server times out.
- Report test output as observed. A skipped or failed run is reported as such, never rounded up to passing.
