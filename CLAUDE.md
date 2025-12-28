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

## Environment Variables

Copy `.env.example` to `.env.local`. Required for Sanity CMS integration:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SITE_URL`
