# Patterns & Conventions

*Last Updated: 2026-09-15*

## Code Organization

Route-per-folder under `src/app`; server `page.tsx` composes presentation components and delegates interactivity to a sibling `"use client"` file. Shared UI lives in `src/components/{studio,ui,layout,sections,features,motion}` with barrel `index.ts` files (not all components are exported through barrels; import by path when unsure). Cross-cutting logic lives in `src/lib`. Path alias `@/` → `src/`.

## Recurring Patterns

- **Route handler shape** (`src/app/api/*/route.ts`): parse JSON → honeypot → rate limit → validate → `if (!supabaseAdmin) return 503` → write → respond → `after(() => side effects)`. Copy the closest existing route rather than inventing a new shape.
- **`after()` for side effects**: email and PostHog never block or alter the response; each is wrapped in `.catch` that logs. `captureServerEvent` owns its own `after`.
- **Lead payload** built client-side by `buildLeadPayload()` so every form carries UTM, first/last touch, distinct id, and the `company_url` honeypot.
- **Copy from one place**: `systemMessages` for UI/system strings, `docs/messaging/patina-messaging-system.md` for voice. Email HTML goes through `frame()` in `src/lib/emails/template.ts`.
- **Motion**: `useReducedMotion` in every animated component; Living Study pages wrap in `StudioMotion` and respect the user toggle via `useStudioMotion()`.
- **CTAs carry a `source`** string that flows into `waitlist.source` and analytics props (e.g. `studio_home_invitation`).
- **Metadata**: each page exports `metadata` built from `defaultMetadata` in `src/lib/seo.ts`; JSON-LD injected as `<script type="application/ld+json">`.

## Error Handling

- Never fabricate success: missing DB/mail credentials → `503` + `Retry-After`; a count that cannot be read is unavailable, not zero.
- Client forms map non-2xx to `systemMessages.*` and keep the user's input.
- Server logs are `console.error` with a route prefix; no error tracking SDK on this site.

## Testing

- **E2E** (`e2e/*.spec.ts`): one spec per page named after the route; they assert critical UI and navigation against `next dev`. Run the matching spec after touching a page (`npx playwright test e2e/<page>.spec.ts`). Full suite before a PR. `test:cloudflare` reruns them against the Worker preview.
- **Server lifecycle** (`tests/server-lifecycle.test.mjs`): loads route handlers through `tests/helpers/load-module.mjs`, which transpiles the TypeScript with an inline source map and runs it in a `vm` context with every import mocked. It asserts the 503/after/email ordering contract per route. Add a case here when changing a route's persistence or side-effect order. The same loader backs `tests/lead-payload.test.mjs`, `tests/rate-limit.test.mjs`, and `tests/sitemap.test.mjs`.
- **Build artifact** (`tests/cloudflare-artifact.test.mjs`): the OpenNext env module keeps only `NEXT_PUBLIC_*` values.
- **CRAP gate**: `.claude/quartermaster/crap.json`, ceiling 6 ratcheted against `main`, `.ts` files only. Coverage from `node --test --experimental-test-coverage` maps back to `src/` through the loader's source maps, so a covered function passes at its complexity; an uncovered one must stay at one branch. `.tsx` is excluded because lizard counts `?` inside JSX text as a ternary. Any new `.ts` module that a route imports must be mocked or loaded in the lifecycle harness (see `errors` in `handlerHarness`).

## Configuration

- Public config is `NEXT_PUBLIC_*` and baked at build; private config is Worker secrets (`wrangler secret`) or `.env.local` locally, `.dev.vars` for Worker preview. `scripts/cloudflare-build.mjs` refuses to ship private values.
- `next.config.ts` owns headers, redirects, and the PostHog rewrites; `vercel.json` duplicates headers for the old host.
- Sanity project/dataset/version come from env with defaults in `sanity/lib/client.ts`.
