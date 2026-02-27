# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Patina is a premium furniture marketplace website built with Next.js 15 (App Router). The brand emphasizes handcrafted furniture with stories - artisan makers, material provenance, and AR visualization. Tagline: "Where Time Adds Value".

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run test:e2e     # Run all Playwright e2e tests
npm run test:e2e:ui  # Playwright UI mode

# Run single test file
npx playwright test e2e/about.spec.ts

# Run tests matching pattern
npx playwright test -g "should display hero"
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router (React 19)
- **Tailwind CSS v4** with CSS-based theme configuration
- **Sanity CMS** for content (schemas defined, using sample data currently)
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

- `/` - Homepage
- `/furniture` - Catalog with filters
- `/furniture/[slug]` - Product detail
- `/designers` - Designer portal (dark theme)
- `/services` - Design services packages
- `/about` - Company story
- `/app` - Mobile app download

### E2E Tests

Tests are in `e2e/` directory. Each page has a corresponding spec file testing critical UI elements and navigation.

## Engagement Tracking — Full Cross-Platform Workflow

**📋 Full plan: `docs/engagement-tracking-plan.md`** — Read this first. It has schemas, code examples, and phasing.

### What We're Building (Website's Role)

The website is the **top of the funnel**. Users land here → browse → sign up for waitlist → eventually convert to authenticated users on portal/extension/iOS. PostHog tracks them across all surfaces with a unified identity.

### Current State
- `src/lib/analytics.ts` — Fully typed analytics abstraction with 15+ event types. Currently logs to console in dev, no-op in prod. **PostHog is a backend swap into this existing layer.**
- `@vercel/analytics` — Already installed (basic pageviews/Web Vitals). Keep alongside PostHog.
- No signup/waitlist form exists yet — **this needs to be built**.

### Phase 1 Deliverables (This Website)

1. **PostHog Cloud integration:**
   - `npm install posthog-js posthog-node`
   - Create `src/lib/posthog.ts` — init with `NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST`
   - Add `PostHogProvider` wrapper component in layout (client component)
   - Wire `analytics.ts` → PostHog: replace production placeholder in `track()` with `posthog.capture()`
   - Autocapture OFF, session recording ON
   - `capture_pageview: false` (we handle manually for SPA navigation)

2. **Waitlist signup form:**
   - Add signup form component — appears on hero, designers page, footer, maybe a dedicated `/waitlist` route
   - Capture: email, role (designer/consumer/unknown), signup page, CTA text
   - UTM parameters auto-captured from URL and stored with signup
   - Attribution: first-touch and last-touch stored in localStorage, sent with signup
   - Server action or API route → Supabase `waitlist` table (on self-hosted `api.patina.cloud`)
   - On signup: `posthog.identify()` with email + `posthog.capture('waitlist_signup', {...})`
   - PostHog `distinct_id` stored in waitlist row for later cross-platform identity merge

3. **UTM attribution capture:**
   - `AttributionManager` class (see plan) — captures UTM params from URL on landing
   - Stores first-touch + last-touch in localStorage with 30-day window
   - Registers UTM params with PostHog via `posthog.register()` for session persistence
   - Attribution data sent with every waitlist signup

4. **Cookie consent:**
   - Minimal consent banner (GDPR/CCPA)
   - PostHog only initializes after analytics consent
   - `respect_dnt: true`, IP anonymization via `sanitize_properties`

### Key Architecture Decisions
- **PostHog Cloud** (not self-hosted) — zero ops, free tier 1M events/month
- **Single PostHog project** across all Patina surfaces — unified user identity
- **Supabase `waitlist` table** on self-hosted instance (`api.patina.cloud`) — NOT the cloud Supabase
- **Identity merge:** Anonymous PostHog `distinct_id` → stored in waitlist row → linked to `auth.users` on conversion via trigger
- Keep the typed `AnalyticsEvents` abstraction in `analytics.ts` — it's clean

### Supabase Connection
- Self-hosted at `api.patina.cloud` (192.168.1.14)
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
