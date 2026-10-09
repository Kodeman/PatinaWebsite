# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Patina is a premium furniture marketplace website built with Next.js 16 (App Router). The current branch is "The Living Study" redesign: story-led pages with hardcoded copy, lead capture into Supabase, and a Cloudflare Workers deploy. Tagline: "Where Time Adds Value". The app and marketplace are pre-launch.

A codebase map lives in `.claude/.codebase-info/` (injected at session start); live rules in `.claude/live-rules/rules/`. Trust those and the code over older sections of this file.

## Commands

```bash
npm run dev               # Start development server (localhost:3000)
npm run build             # Production build (Next only)
npm run build:cloudflare  # OpenNext Worker build; strips private env from the artifact
npm run preview:cloudflare # Worker preview on :8787 (private bindings from ignored .dev.vars)
npm run deploy:cloudflare # Publish the existing build; see docs/launch/living-study/CLOUDFLARE-DEPLOYMENT.md
npm run check:production-env # Required env keys present locally
npm run lint              # ESLint
npm run test:server       # node --test tests/*.test.mjs (route lifecycle, lead payload, rate limit, sitemap)
npm run test:e2e          # Run all Playwright e2e tests
npm run test:e2e:ui       # Playwright UI mode
npm run test:cloudflare   # Playwright against the Worker preview (PATINA_PREVIEW_URL)
node "/Users/kody/.claude/plugins/cache/eigenwise-toolshed/quartermaster/0.11.1/bin/quartermaster.js" crap --project .  # CRAP gate, must pass before a src/ change is done

# Run single test file
npx playwright test e2e/about.spec.ts

# Run tests matching pattern
npx playwright test -g "should display hero"
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router (React 19)
- **Tailwind CSS v4** with CSS-based theme configuration
- **Sanity CMS** for editorial content: on this branch only `/careers`, `/journal`, and `sitemap.ts` read Sanity; every other page is hardcoded. Check `sanityFetch` imports before assuming a page is CMS-backed.
- **Supabase Postgres** (hosted project in `NEXT_PUBLIC_SUPABASE_URL`, service role, server-only) for lead tables
- **Cloudflare Workers** via `@opennextjs/cloudflare` (`wrangler.jsonc`); `vercel.json` is the previous host
- **Framer Motion** for animations with reduced motion support
- **Playwright** for e2e testing

### Design System

Colors are defined as CSS variables in `src/app/globals.css` and exposed via `@theme inline` for Tailwind v4:
- `--patina-off-white: #EDE9E4`
- `--patina-clay-beige: #A3927C`
- `--patina-mocha-brown: #655B52`
- `--patina-charcoal: #3F3B37`
- `--patina-soft-cream: #F5F2ED`
- `--patina-warm-white: #FAF7F2`

Typography uses `text-display-1`, `text-heading-1`, `text-label` utility classes defined in globals.css.

### Component Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Each folder = route with page.tsx
│   └── layout.tsx         # Root layout with fonts, analytics, SEO
├── components/
│   ├── ui/                # Atomic: Button, StrataMark, FilterChip, MaterialTag, Skeleton, SkipLink
│   ├── layout/            # Navigation, Footer, MobileMenu, Container
│   ├── sections/          # Page sections: Hero
│   ├── features/          # Domain: ProductCard, ProductGallery, ARPreviewButton
│   └── motion/            # Animation wrappers: FadeIn, StaggerChildren, ScaleIn, PageTransition
├── hooks/                 # useReducedMotion, useInView
├── lib/
│   ├── seo.ts            # JSON-LD generators, default metadata
│   └── utils/            # cn() helper (clsx + tailwind-merge)
└── types/
    └── sanity.ts         # Product, Maker, Material TypeScript interfaces
```

### Key Patterns

**Animation Components**: Motion components in `src/components/motion/` wrap Framer Motion with `useReducedMotion` hook support. Use `<FadeIn>`, `<StaggerChildren>`, `<StaggerItem>` for scroll-triggered animations.

**SEO**: Use `generateProductJsonLd()`, `generateOrganizationJsonLd()` from `src/lib/seo.ts` for structured data. Root layout includes Organization and Website JSON-LD.

**Page Structure**: Each page follows the pattern:
```tsx
<Navigation />
<main id="main-content">
  {/* sections */}
</main>
<Footer />
```

**Client Components**: Mark with `"use client"` only when needed (interactivity, hooks, Framer Motion). Server components are default.

### Routes

- `/` - Homepage (Living Study scroll narrative)
- `/founding` - Founding Circle (`/waitlist`, `/join` redirect here); `/signup` - waitlist with SMS consent
- `/designers`, `/makers`, `/makers/apply`, `/services`, `/about`, `/app`, `/contact`, `/careers`, `/journal`, `/press`, `/privacy`, `/terms`
- `/studio` - embedded Sanity Studio
- `/furniture/*` and `/materials` redirect to `/makers`; the marketplace is pre-launch

### Tests

- `e2e/` - one Playwright spec per page; run the matching spec after touching a page. Needs network to the Sanity CDN for CMS pages.
- `tests/` - `node --test`. Route handlers load through `tests/helpers/load-module.mjs` (TypeScript transpiled with inline source maps, run in a `vm` context, every import mocked). Coverage maps back to `src/`, which the CRAP gate consumes.
- Gotchas: a new `src/lib` import in a route must be added to `handlerHarness` dependencies (see `errors`), or the loader throws `Unmocked import`. Objects created inside the VM have a different prototype, so use `assert.equal` per field or JSON round-trips, not strict `deepEqual`.
- Route catch blocks log with `errorMessage(err)` from `src/lib/errors.ts`; do not inline the `instanceof Error` ternary.

## Engagement Tracking — Full Cross-Platform Workflow

**📋 Full plan: `docs/engagement-tracking-plan.md`** — Read this first. It has schemas, code examples, and phasing.

### What We're Building (Website's Role)

The website is the **top of the funnel**. Users land here → browse → sign up for waitlist → eventually convert to authenticated users on portal/extension/iOS. PostHog tracks them across all surfaces with a unified identity.

### Current State (SHIPPED — this section was previously a to-do list; it is now built)
- `src/lib/analytics.ts` — typed analytics abstraction; PostHog is wired for prod via `src/lib/posthog.ts` (autocapture off, session recording on, `respect_dnt`, consent-gated). `@vercel/analytics` runs alongside.
- **Lead capture is built.** The waitlist is now the **Founding Circle**: `FoundingCircleForm`, `FoundingCircleModal`, and the nav `FoundingPopover` → `POST /api/founding` → Supabase `waitlist`, with UTM + first/last-touch attribution and PostHog identity (`src/lib/lead-payload.ts`, `lead-capture.ts`, `attribution.ts`, `identity.ts`). `WaitlistForm`/`WaitlistPopover` are back-compat shims; `/waitlist` redirects to `/founding`.
- **Newsletter** ("The Designer's Eye") uses double opt-in → `/api/newsletter` + `/api/newsletter/confirm`. Designer (`/api/designers-apply`), maker (`/api/makers-apply`), and contact (`/api/contact`) all persist to Supabase and send email.
- **Transactional/lifecycle email** via Resend, one shared visual frame in `src/lib/emails/template.ts`: Founding welcome ("first letter from Leah"), newsletter confirm + welcome, designer/maker acks, contact auto-reply + founder notification. Every marketing email carries an unsubscribe line.
- **Cookie consent** banner wired to PostHog opt-in/out; fires `consent_updated`.

### Messaging & Voice — source of truth
- **`docs/messaging/patina-messaging-system.md`** governs ALL customer-facing copy: positioning, the dual-track (trade + consumer) audience map, voice/tone, lexicon, the restrained-AI rule (designers lead; no accuracy %, no "invisible signals"), CTA hierarchy, and proof/honesty rules. Read it before writing any headline, button, email, or system string.
- System/UI strings (errors, success, consent, newsletter-confirm) live in `src/lib/copy/system-messages.ts`.
- Canonical brand facts: email `hello@patina.cloud`, location Madison WI, domain `patina.cloud`. The app/marketplace are **pre-launch** — never imply the app is downloadable today.

### Key Architecture Decisions
- **PostHog Cloud** (not self-hosted) — zero ops, free tier 1M events/month
- **Single PostHog project** across all Patina surfaces — unified user identity
- **Supabase `waitlist` table** on the hosted project in `NEXT_PUBLIC_SUPABASE_URL` (earlier plans targeted a self-hosted `api.patina.cloud` instance; the code no longer does)
- **Identity merge:** Anonymous PostHog `distinct_id` → stored in waitlist row → linked to `auth.users` on conversion via trigger
- Keep the typed `AnalyticsEvents` abstraction in `analytics.ts` — it's clean

### Supabase Connection
- Hosted project referenced by `NEXT_PUBLIC_SUPABASE_URL` (the self-hosted `api.patina.cloud` instance is no longer what the code targets)
- Tables the routes write: `waitlist`, `newsletter_subscribers`, `contact_messages`, `founding_designer_applications`, `maker_applications`. No migrations in this repo; inspect the live schema before adding columns (see `docs/reports/engagement-capture-audit-2026-06.md` on drift)
- Waitlist table schema in `docs/engagement-tracking-plan.md` Section 1.1
- The `handle_new_user()` trigger auto-creates profiles from waitlist data when users convert

### Events (Website-Specific)
Already defined in `src/lib/analytics.ts`:
- Product discovery: `product_card_viewed`, `product_card_clicked`
- Detail engagement: `product_detail_viewed`, `image_gallery_scrolled`, `material_chip_clicked`
- AR: `view_in_space_clicked`, `ar_qr_code_shown`
- Conversion: `work_with_designer_clicked`, `app_download_clicked`
- Search: `search_opened`, `search_query`, `search_result_clicked`
- Forms: `contact_form_submitted`, `maker_application_submitted`
- Navigation: `page_viewed`, `nav_link_clicked`, `filter_applied`
- **New:** `waitlist_signup`, `cta_click`, `content_engagement`, `consent_updated`

## Environment Variables

Copy `.env.example` to `.env.local`. Required for Sanity CMS integration:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_POSTHOG_KEY` — PostHog project API key (public, safe for client)
- `NEXT_PUBLIC_POSTHOG_HOST` — PostHog ingest URL (default: `https://us.i.posthog.com`)
- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` — lead persistence and email; routes return a retryable 503 without them
- Production secrets live as Worker bindings, never in source; `scripts/production-env.mjs` lists required build vs runtime keys
