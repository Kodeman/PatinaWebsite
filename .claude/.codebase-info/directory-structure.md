# Directory Structure

*Last Updated: 2026-10-09*

## Root Layout

```
PatinaWebsite/
├── src/                    # Application code (235 tracked files + Living Study additions)
├── sanity/                 # Sanity Studio config, schemas, client, GROQ queries
├── scripts/                # Cloudflare build/env scripts, Sanity seeders, email preview
├── tests/                  # node --test: server lifecycle, lead payload, lead notification, posthog init, rate limit, sitemap, build artifact; helpers/load-module.mjs
├── e2e/                    # Playwright specs, one per page, plus tracking-coverage.spec.ts
├── docs/                   # Messaging system, engagement plan, launch runbooks, reports
├── public/                 # Fonts, images (studio imagery under public/images/studio)
├── Design/                 # Design references (not code)
├── design-proposals/       # Untracked design explorations
├── next.config.ts  wrangler.jsonc  open-next.config.ts  vercel.json
├── playwright.config.ts  playwright.cloudflare.config.ts  eslint.config.mjs  tsconfig.json
└── CLAUDE.md               # Project instructions (partly predates the Living Study branch)
```

## Key Directories

### src/app/
App Router. Each folder is a route with `page.tsx`; client islands sit beside the page. `layout.tsx` is the root shell, `globals.css` + `studio.css` the styling, `sitemap.ts`/`robots.ts`/`opengraph-image.tsx`/`icon.svg` the metadata routes, `not-found.tsx` the 404.
- `api/` route handlers: `founding/`, `founding/count/`, `newsletter/`, `newsletter/confirm/`, `contact/`, `designers-apply/`, `makers-apply/`, `revalidate/`, `draft/`, `draft/disable/`.
- `studio/[[...tool]]/` embeds Sanity Studio.
- `furniture/`, `furniture/[slug]/`, `materials/`, `waitlist/` are legacy routes that now redirect.

### src/components/
- `studio/` Living Study presentation: `StudioPage.tsx` (page shell), `LivingStudy.tsx` (homepage scroll scenes), `DesignerWorkbench.tsx`, `StoryJourney.tsx`, `FoundingInvitation.tsx`, `JoinCircleButton.tsx`, `StudioMotion.tsx`, plus CSS modules per page family.
- `sections/` older homepage/app/about sections (`HomepageHero`, `AppJourney`, `FirstTouchJourney`, …). Some are no longer imported by pages; check before extending.
- `ui/` atoms and lead-capture widgets: `Button`, `StrataMark`, `FoundingCircleForm`, `FoundingCircleModal` (+ `FoundingModalContext`), `FoundingPopover`, `NewsletterSignup`, `NewsletterConfirmBanner`, `CookieConsent`, `TrackedLink`, `Skeleton`, `SkipLink`, …
- `layout/` `Navigation`, `MobileMenu`, `Footer`, `Container`.
- `features/` `ProductCard`, `ProductGallery`, `ARPreviewButton` (catalogue era, currently unrouted).
- `motion/` `FadeIn`, `StaggerChildren`, `ScaleIn`, `PageTransition`, `ScrollFadeOut`, `ScrollRevealText`, `TextClipReveal`.

### src/lib/
`analytics.ts`, `errors.ts` (`errorMessage`), `posthog.ts`, `posthog-server.ts`, `attribution.ts`, `identity.ts`, `lead-payload.ts`, `lead-capture.ts`, `lead-route.ts`, `rate-limit.ts`, `supabase.ts`, `seo.ts`, `site-url.ts`, `copy/system-messages.ts`, `emails/{send,senders,template,founding-welcome,newsletter-welcome,application-received,contact-received,lead-notification}.ts`, `utils/{cn,index}.ts`. `lib/sanity/` is an empty placeholder; the real client is `sanity/lib/`.

### src/hooks/, src/types/, src/data/
Hooks: `useReducedMotion`, `useInView`, `useScrollProgress`, `useScrollReveal`. Types: `sanity.ts` (Product/Maker/Material), `about.ts`, `app.ts`. Data: `aboutContent.ts`, `appContent.ts` (typed copy for the older about/app sections).

### sanity/
`sanity.config.ts`, `desk-structure.ts` (singleton handling), `lib/client.ts` (`client`, `previewClient`, `urlFor`, `sanityFetch`), `lib/queries.ts` (all GROQ), `schemas/` (objects, documents, singletons, `index.ts`).

### scripts/
`cloudflare-build.mjs` (build + strip private env), `cloudflare-artifact.mjs` (helpers, tested), `production-env.mjs` (key lists), `check-production-env.mjs`, `seed-journal.mjs` + `.ndjson`, `migrate-content.ts`, `preview-signup-emails.ts`.

### docs/
`messaging/patina-messaging-system.md` (copy source of truth), `engagement-tracking-plan.md`, `analytics-source-of-truth.md`, `identity-contract.md`, `utm-governance.md`, `marketing/utm-convention.md` (campaign links), `posthog-reporting.md` (provisioned dashboard + daily report), `launch/living-study/` (Cloudflare runbook, production handoff, deployment record), `launch/launch-package-2026-09/`, `reports/` (monthly SEO, perf, AI-citation, weekly content), `superpowers/specs/`.
