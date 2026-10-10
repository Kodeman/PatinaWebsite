# Architecture

*Last Updated: 2026-10-09*

## Summary

A single Next.js 16 App Router application. Pages are mostly server components composed from "studio" presentation components with hardcoded copy; two editorial routes read Sanity. Six route handlers under `src/app/api/` form the lead-capture backend: validate, rate-limit, write to Supabase, then schedule email and analytics with `after()`. The production runtime is a Cloudflare Worker produced by `@opennextjs/cloudflare`; Vercel config remains in the repo from the previous host.

## High-Level Diagram

```
Browser ──► Next.js (Cloudflare Worker, .open-next/worker.js)
  │             │
  │  pages      ├─ src/app/**/page.tsx  ──► src/components/studio/*, sections/*, ui/*
  │             │        └─ /careers, /journal read Sanity via sanity/lib/client.ts (CDN, 1h revalidate)
  │             │
  │  /ingest/*  ├─ next.config.ts rewrites ──► PostHog US cloud (first-party proxy)
  │             │
  │  forms      └─ src/app/api/{founding,newsletter,contact,designers-apply,makers-apply}
  │                    │ rate-limit.ts + honeypot
  │                    ├─► Supabase Postgres (service role, src/lib/supabase.ts)
  │                    └─► after(): Resend email (src/lib/emails/*), internal alert to kody@ (lead-notification.ts),
  │                                 PostHog server event (lead-capture.ts)
  │
  └─ posthog-js (cookieless until consent, src/lib/posthog.ts) ──► /ingest ──► PostHog
Sanity Studio: /studio/[[...tool]] embeds sanity/sanity.config.ts
Sanity webhook: POST /api/revalidate ──► revalidatePath()
```

## Components

- **Pages** (`src/app/*/page.tsx`): server components. Most render `StudioPage` or bespoke studio layouts (`src/components/studio/`). Interactive islands are separate `"use client"` files next to the page (`ContactContent.tsx`, `SignupContent.tsx`, `MakerStudy.tsx`, `FoundingPageContent.tsx`).
- **Root layout** (`src/app/layout.tsx`): local fonts (Libre Caslon Display, Manrope), Organization + Website JSON-LD, `SkipLink`, `PostHogProviders`, `StudioMotionProvider`, `FoundingModalProvider`, `CookieConsent`, and the global `FoundingCircleModal`.
- **Lead capture** (client): `FoundingCircleForm`, `NewsletterSignup`, `SignupContent`, `DesignerApplicationForm`, `MakersApplyContent`, `ContactContent` build a payload with `src/lib/lead-payload.ts` (UTM + first/last-touch attribution + PostHog distinct id + honeypot) and POST to the matching API route, then `track()` a typed event.
- **Lead capture** (server): route handlers share `src/lib/rate-limit.ts`, `src/lib/supabase.ts`, `src/lib/lead-capture.ts`, `src/lib/lead-route.ts`, `src/lib/copy/system-messages.ts`, and `src/lib/emails/*`.
- **Analytics**: `src/lib/analytics.ts` is the typed event catalogue (`track()`); `src/lib/posthog.ts` initialises posthog-js (cookieless until consent); `src/lib/posthog-server.ts` wraps posthog-node with `after()`.
- **Content**: Sanity schemas in `sanity/schemas/`, GROQ in `sanity/lib/queries.ts`, client in `sanity/lib/client.ts`. Only `/careers`, `/journal`, `/journal/[slug]`, and `sitemap.ts` fetch Sanity on this branch; other page copy is in code.
- **Motion**: `src/components/motion/*` (Framer Motion wrappers honouring `useReducedMotion`) and `StudioMotion` (a user-toggleable motion context that sets `body[data-studio-motion]`).

## Data Flow

Founding Circle signup, end to end:
1. `FoundingCircleForm.tsx` → `buildLeadPayload()` → `POST /api/founding`.
2. `src/app/api/founding/route.ts`: honeypot and rate-limit → validate email/source/phone → upsert `waitlist` (SMS consent columns) → respond.
3. `after()`: `captureLeadEvent()` (PostHog server, ties anonymous distinct id to lead) and `sendFoundingWelcome()` (Resend). Failures are logged, never surfaced.
4. Client fires `track("founding_circle_signup")`. Homepage counter reads `GET /api/founding/count`.

Newsletter is double opt-in: `POST /api/newsletter` stores a pending row and emails a confirm link; `GET /api/newsletter/confirm?token=` flips it and schedules the welcome letter after redirecting.

## Key Decisions & Constraints

- Supabase is accessed only with the service-role key, server-side. There is no browser Supabase client and no auth on this site.
- Missing persistence or mail credentials produce a retryable `503` with `Retry-After`, never a fabricated success or count (`tests/server-lifecycle.test.mjs` pins this).
- PostHog: cookieless until consent, autocapture and dead clicks on, DNT respected, proxied through `/ingest`. `skipTrailingSlashRedirect` is set so ingest paths are not redirected.
- Cloudflare build (`scripts/cloudflare-build.mjs`) strips private env from the OpenNext artifact; secrets live as Worker bindings only.
- Old catalogue routes (`/furniture/*`, `/materials`, `/waitlist`, `/join`) redirect; the marketplace is pre-launch.
- Customer-facing copy follows the marketing canon in `../patina-merged/marketing/canon` (lint with `marketing/tools/voice-lint.mjs`); `docs/messaging/patina-messaging-system.md` holds only site-only rules and the 2026-10-09 founders' rulings (studio door first, no titles, no price, tagline sparing).
