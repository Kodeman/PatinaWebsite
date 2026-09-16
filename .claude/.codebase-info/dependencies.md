# Dependencies

*Last Updated: 2026-09-15*

## Runtime

### Core
| Package | Purpose |
|---------|---------|
| `next` 16.3, `react` / `react-dom` 19.3 | App Router, server components, `after()` |
| `framer-motion` 12 | Motion wrappers and Living Study scroll scenes |
| `clsx`, `tailwind-merge` | `cn()` helper |

### Data / External
| Package | Purpose |
|---------|---------|
| `@supabase/supabase-js` | Service-role writes to lead tables |
| `posthog-js`, `posthog-node` | Client and server analytics |
| `next-sanity`, `sanity`, `@sanity/image-url`, `@sanity/vision`, `@portabletext/react` | Sanity client, embedded Studio, image URLs, rich text |
| `@opennextjs/cloudflare` | Next → Cloudflare Worker adapter (R2 cache, DO queue/tag cache) |

Resend and the PostHog proxy are plain `fetch`/rewrites, no SDK.

## Development
| Package | Purpose |
|---------|---------|
| `typescript` 5, `@types/*` | Types; `tsserver` also powers the node lifecycle tests' transpile step |
| `eslint` 9, `eslint-config-next` | Lint (core-web-vitals + typescript) |
| `tailwindcss` 4, `@tailwindcss/postcss` | Styling |
| `@playwright/test` | E2E |
| `wrangler` 4 | Worker preview/deploy, `cf:typegen` |
| `tsx`, `dotenv` | Scripts |

## Notes

- `overrides` in `package.json` pin `js-yaml` under `@vercel/frameworks` and `uuid` under `typeid-js` for audit reasons.
- No test coverage tool is installed; the CRAP gate uses Node's built-in `--experimental-test-coverage` lcov reporter (see `.claude/quartermaster/crap.json`).
- Do not add a package for a single call site (live rule `reuse-first-implementation`).
