# Technology Landscape

*Last Updated: 2026-09-15*

## Source-of-Truth Files

| Information | File |
|-------------|------|
| Dependencies and scripts | `package.json` (Node `>=22.12`, `.nvmrc` says 24) |
| Next config: headers, redirects, PostHog rewrites, image hosts | `next.config.ts` |
| Cloudflare Worker config: routes, R2 cache, Durable Objects, public vars | `wrangler.jsonc` |
| OpenNext adapter overrides | `open-next.config.ts` |
| Env variable names | `.env.example` (never commit values) |
| TypeScript, `@/*` → `src/*` | `tsconfig.json` |
| Lint | `eslint.config.mjs` (next core-web-vitals + typescript) |
| Tailwind v4 theme and design tokens | `src/app/globals.css`; studio styling in `src/app/studio.css` |
| E2E | `playwright.config.ts`, `playwright.cloudflare.config.ts` |
| Sanity Studio | `sanity/sanity.config.ts`, `sanity/desk-structure.ts` |
| Legacy Vercel headers/regions | `vercel.json` |
| Deployment runbook | `docs/launch/living-study/CLOUDFLARE-DEPLOYMENT.md` |

## Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Language | TypeScript 5, strict | `.mjs` for build scripts and node tests |
| Framework | Next.js 16.3 App Router, React 19.3 | Server components default; `after()` for post-response work |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline`), CSS modules for studio pages | Tokens `--patina-*` in `globals.css` |
| Motion | framer-motion 12 | Wrapped in `src/components/motion` and `StudioMotion` |
| CMS | Sanity 5 via `next-sanity` 13, `@portabletext/react` | Studio embedded at `/studio` |
| Database | Supabase Postgres (hosted project, service role only) | `@supabase/supabase-js` |
| Analytics | PostHog (posthog-js, posthog-node) | Proxied at `/ingest`; consent gated |
| Email | Resend REST API via `fetch` | `src/lib/emails/send.ts` |
| Runtime | Cloudflare Workers via `@opennextjs/cloudflare` 1.20, wrangler 4 | R2 incremental cache, DO queue and tag cache |
| Tests | Playwright 1.57 (e2e), `node --test` (server lifecycle) | |

## Environment variables (names only)

Public build-time: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_POSTHOG_ENABLE_IN_DEV` (dev only).
Private runtime (Worker secrets or `.env.local`): `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `SANITY_API_READ_TOKEN`, `SANITY_WEBHOOK_SECRET`, `SANITY_PREVIEW_SECRET`. Scripts also use `SANITY_API_WRITE_TOKEN`.
`scripts/production-env.mjs` lists the required build vs runtime keys and `npm run check:production-env` checks them locally.

## Infrastructure

- **Production**: Cloudflare Worker `patina-website` on `patina.cloud` and `www.patina.cloud` (www redirects to apex in `next.config.ts`). Assets binding, `IMAGES` binding, R2 bucket `patina-website-cache`, Durable Objects `DOQueueHandler` and `DOShardedTagCache`.
- **Preview**: `npm run preview:cloudflare` on `localhost:8787`; private bindings from an ignored `.dev.vars`.
- **Previous host**: Vercel (`vercel.json`, `@vercel/analytics` era). Git history mentions Vercel deploys; treat Cloudflare as current per README.
- **External services**: Sanity (CDN + Studio), Supabase project `bkvcixdmuyejfzcijpdg` (URL is public in `wrangler.jsonc`), PostHog US cloud, Resend.
