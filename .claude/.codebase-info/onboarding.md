# Onboarding

*Last Updated: 2026-10-09*

## Quick start

```bash
nvm use            # Node 24 per .nvmrc (engines >=22.12)
npm ci
cp .env.example .env.local   # fill in values; never commit
npm run dev        # http://localhost:3000
```

Without Supabase/Resend credentials the site renders fully; lead forms return a retryable 503 and the founding counter shows unavailable.

## Common tasks

- **Change page copy**: find the page in `entry-points.md`. Almost every page is code on this branch; `/careers` and `/journal` come from Sanity (edit in `/studio` or Sanity Studio, then the webhook revalidates). Read the canon in `../patina-merged/marketing/canon` and the rulings in `docs/messaging/patina-messaging-system.md` first, and run voice-lint on new copy.
- **Change a form or API route**: edit the client island and the matching `src/app/api/*/route.ts`, keep the shared handler shape, then add or update a case in `tests/server-lifecycle.test.mjs` and run `npm run test:server`.
- **Add an analytics event**: add it to `AnalyticsEvents` in `src/lib/analytics.ts`, then call `track()`. Document it in `docs/analytics-source-of-truth.md`.
- **Add an email**: compose with `frame()`/`button()` in `src/lib/emails/template.ts`, send with `sendHtmlEmail`, preview with `npx tsx scripts/preview-signup-emails.ts`.
- **Verify a page**: `npx playwright test e2e/<page>.spec.ts` (needs network to the Sanity CDN for CMS pages; see live rule `e2e-verification`).
- **Build and preview production**: `npm run build:cloudflare && npm run preview:cloudflare` (Worker on :8787; private bindings in ignored `.dev.vars`). `npm run test:cloudflare` runs e2e against it.
- **Deploy**: follow `docs/launch/living-study/CLOUDFLARE-DEPLOYMENT.md`; `npm run deploy:cloudflare` after a build. `npm run check:production-env` first.
- **Quality gate**: `node "/Users/kody/.claude/plugins/cache/eigenwise-toolshed/quartermaster/0.11.1/bin/quartermaster.js" crap --project .` before calling a `src/` change done.

## Gotchas

- Under the Bash sandbox `next dev` can die with EMFILE if a stray lockfile in `$HOME` widens the watch root; run Playwright outside the sandbox if the web server times out.
- `sanityFetch` caches for an hour; clear `.next` if a rebuild shows stale CMS copy.
- `CLAUDE.md` predates parts of the Living Study branch (it still describes a self-hosted Supabase at `api.patina.cloud`, Vercel analytics, and Sanity-backed `/about`, `/app`, `/contact`, `/services`, `/makers/apply`). Trust this map and the code for the current branch.
- The `waitlist` phone/SMS consent columns and `SMS_CONSENT_TEXT` are tied to a Twilio A2P campaign; do not reword the consent text.
- `src/components/sections/*` and `src/components/features/*` are largely from the catalogue era and may be unrouted; confirm an import before extending them.
