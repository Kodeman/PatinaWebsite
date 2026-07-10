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
