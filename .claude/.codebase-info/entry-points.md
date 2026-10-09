# Entry Points

*Last Updated: 2026-10-09*

## Page routes

| Route | File | Data source | Notes |
|-------|------|-------------|-------|
| `/` | `src/app/page.tsx` | code | `LivingStudy`, `FounderJourney`, `FoundingInvitation`; `NewsletterConfirmBanner` reads `?newsletter=` |
| `/founding` | `src/app/founding/page.tsx` → `FoundingPageContent.tsx` | code | Founding Circle page; `/waitlist`, `/join`, `/founding-circle` redirect here |
| `/signup` | `src/app/signup/page.tsx` → `SignupContent.tsx` | code | Waitlist form with SMS consent, posts to `/api/founding` |
| `/designers` | `src/app/designers/page.tsx` + `DesignerApplicationForm.tsx` | code | Posts to `/api/designers-apply` |
| `/makers` | `src/app/makers/page.tsx` + `MakerStudy.tsx` | code | `/materials` and `/furniture/*` redirect here |
| `/makers/apply` | `src/app/makers/apply/page.tsx` → `MakersApplyContent.tsx` | code | Posts to `/api/makers-apply` |
| `/services` | `src/app/services/page.tsx` + `ServicesCTA.tsx` | code | |
| `/about` | `src/app/about/page.tsx` | code | |
| `/app` | `src/app/app/page.tsx` | code | Pre-launch app page |
| `/contact` | `src/app/contact/page.tsx` → `ContactContent.tsx` | code | Posts to `/api/contact` |
| `/careers` | `src/app/careers/page.tsx` | Sanity `careersPageQuery` | |
| `/journal`, `/journal/[slug]` | `src/app/journal/page.tsx`, `[slug]/page.tsx` | Sanity `journalPostsQuery`, `journalPostBySlugQuery` | Portable Text body |
| `/press` | `src/app/press/page.tsx` | code | untracked addition |
| `/privacy`, `/terms` | `src/app/privacy/page.tsx`, `terms/page.tsx` | code | |
| `/studio/*` | `src/app/studio/[[...tool]]/page.tsx` | Sanity Studio | client component, `NextStudio` |
| `/furniture`, `/furniture/[slug]` | `src/app/furniture/*` | `permanentRedirect` | legacy |
| 404 | `src/app/not-found.tsx` | | |
| `sitemap.xml`, `robots.txt`, OG image, icon | `src/app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.svg` | sitemap reads Sanity journal slugs | |

## API routes

| Method + path | File | Writes | Side effects |
|---------------|------|--------|--------------|
| `POST /api/founding` | `src/app/api/founding/route.ts` | `waitlist` upsert | founding welcome email, PostHog lead event |
| `GET /api/founding/count` | `src/app/api/founding/count/route.ts` | reads `waitlist` count | `no-store`; 503 if DB unavailable |
| `POST /api/newsletter` | `src/app/api/newsletter/route.ts` | `newsletter_subscribers` upsert (pending, token) | confirmation email (`confirmation-email.ts` beside it) |
| `GET /api/newsletter/confirm` | `src/app/api/newsletter/confirm/route.ts` | marks confirmed | redirects to `/?newsletter=…`, then welcome email |
| `POST /api/contact` | `src/app/api/contact/route.ts` | `contact_messages` insert | founder notification (must be accepted before 200 if insert failed), auto-reply |
| `POST /api/designers-apply` | `src/app/api/designers-apply/route.ts` | `founding_designer_applications` insert | designer ack email |
| `POST /api/makers-apply` | `src/app/api/makers-apply/route.ts` | `maker_applications` insert | maker ack email |
| `POST /api/revalidate` | `src/app/api/revalidate/route.ts` | — | Sanity webhook (`SANITY_WEBHOOK_SECRET`) → `revalidatePath` |
| `GET /api/draft`, `GET /api/draft/disable` | `src/app/api/draft/*` | — | Toggle Next draft mode with `SANITY_PREVIEW_SECRET` |

## Redirects and rewrites (`next.config.ts`)

`www.patina.cloud` → apex; `/waitlist`, `/join`, `/founding-circle` → `/founding`; `/materials` → `/makers` (temporary); `/furniture/:path*` → `/makers`. Print vanity paths `/parade`, `/studio-door`, `/hire` → `/designers` with campaign UTMs (temporary; see `docs/marketing/utm-convention.md`). `/ingest/*` rewrites to PostHog.

## Commands

| Command | What it runs |
|---------|--------------|
| `npm run dev` | `next dev` on :3000 |
| `npm run build` / `npm run build:cloudflare` | `next build` / `scripts/cloudflare-build.mjs` (OpenNext, strips private env) |
| `npm run preview:cloudflare` / `deploy:cloudflare` | Worker preview on :8787 / `opennextjs-cloudflare deploy --keep-vars` |
| `npm run lint` | eslint |
| `npm run test:e2e` / `test:e2e:ui` | Playwright against `next dev` |
| `npm run test:cloudflare` | Playwright against the preview Worker (`PATINA_PREVIEW_URL`) |
| `npm run test:server` | `node --test tests/*.test.mjs` |
| `npm run check:production-env` | required keys present locally |
| `npm run cf:typegen` | wrangler types → `cloudflare-env.d.ts` |
| `npx tsx scripts/migrate-content.ts`, `node --env-file=.env.local scripts/seed-journal.mjs` | Sanity content seeding (write token) |
| `npx tsx scripts/preview-signup-emails.ts` | render lifecycle emails to files without sending |

## Representative Flow

`POST /api/founding` → `isHoneypotTripped`/`checkRateLimit` (`src/lib/rate-limit.ts`) → validate → `supabaseAdmin.from("waitlist").upsert` → `NextResponse.json` → `after(() => { captureLeadEvent(); sendFoundingWelcome(); })`.
