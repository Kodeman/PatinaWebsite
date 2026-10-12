# Key Modules

*Last Updated: 2026-10-12*

### Analytics (client)
- **Location:** `src/lib/analytics.ts`, `src/lib/posthog.ts`, `src/lib/attribution.ts`, `src/lib/identity.ts`
- **Purpose:** typed event catalogue and PostHog client. Before consent (or after Decline) posthog-js runs `cookieless_mode: "on_reject"` (no cookies, server-hashed identity); Accept upgrades to a persistent profile. Autocapture, dead clicks, `capture_pageleave` and the `surface: marketing-web` super-property are on; DNT is respected.
- **Exposes:** `track(event, props)`, `analytics`, `getPostHogClient()`, `getConsent()/setConsent()`, `captureAttribution()` (UTMs, click ids incl. `ttclid`, `li_fat_id`, `ref`; first and last touch), `getAttribution()`, `classifyChannel()`, `identifyUser()`, `aliasOnConversion()`.
- **Events:** `page_viewed`, `nav_link_clicked`, `cta_click`, `founding_cta_click`, `founding_modal_*`, `consent_updated` (Accept and Decline), `user_identified`. Signup events (`founding_circle_signup`, `newsletter_signup`, `designer_application_submitted`, `maker_application_submitted`, `contact_form_submitted`) are server-only; never `track()` them from a form.
- **TrackedLink:** `src/components/ui/TrackedLink/` wraps `next/link` or `<a>` and fires `cta_click` (default), `nav_link_clicked`, or `maker_apply_click` with a `location`; use it for any CTA, mailto, or outbound link so `e2e/tracking-coverage.spec.ts` passes.
- **Depends on:** posthog-js. Disabled in development unless `NEXT_PUBLIC_POSTHOG_ENABLE_IN_DEV=true`. `tests/posthog.test.mjs` covers the init options.

### Analytics (server)
- **Location:** `src/lib/posthog-server.ts`, `src/lib/lead-capture.ts`
- **Exposes:** `getServerPostHog()`, `captureServerEvent()` (wraps `after()`, isolates failure), `captureLeadEvent({...})` which keeps the anonymous distinct id, attribution and person properties, and `$set_once`s first-touch `initial_*` UTMs. These server events are the authoritative signup counts.

### Lead route helpers
- **Location:** `src/lib/lead-route.ts`
- **Exposes:** response helpers (`success`, `badRequest`, `serviceUnavailable`, `invalidRequest`), `rateLimitResponse`, `screenSubmission` (rate limit + honeypot), email helpers (`isValidEmail`, `emailError`, `normalizeEmail`, `emailDomain`), `leadAttribution`, `logSupabaseError`/`saveFailed`, `scheduleDelivery` and `scheduleLeadNotification` (both `after()`). Each lead route's `POST` is a short pipeline of these, kept under the CRAP gate.

### Lead payload
- **Location:** `src/lib/lead-payload.ts`
- **Exposes:** `buildLeadPayload()`, `inferRole()`, `LEAD_HONEYPOT_FIELD` (`company_url`), `LeadPayload` type. Used by every client form.

### Request guards
- **Location:** `src/lib/rate-limit.ts`
- **Exposes:** `getClientIp()`, `checkRateLimit(key, limit, window)` (in-memory, per isolate), `isHoneypotTripped()`. `src/lib/errors.ts` adds `errorMessage(err)` for every route's catch logging.

### Persistence
- **Location:** `src/lib/supabase.ts`
- **Exposes:** `supabaseAdmin` (null when `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is unset; routes then return 503).

### Email
- **Location:** `src/lib/emails/`
- **Key files:** `send.ts` (`sendHtmlEmail` → Resend REST; logs failure when `RESEND_API_KEY` missing), `template.ts` (`frame`, `button`, `signedBy`, `signOff`, `escapeHtml`, `UNSUBSCRIBE_MAILTO`), `senders.ts` (`kodySignupSender`, `LEAD_NOTIFY_TO` = kody@patina.cloud), `lead-notification.ts` (`sendLeadNotification`: internal alert per signup with kind, contact, campaign/channel and a PostHog person link), `founding-welcome.ts`, `newsletter-welcome.ts`, `application-received.ts` (`sendDesignerReceived`, `sendMakerReceived`), `contact-received.ts` (`sendContactNotification`, `sendContactAutoReply`). Newsletter confirmation lives at `src/app/api/newsletter/confirmation-email.ts`.

### Copy and SEO
- `src/lib/copy/system-messages.ts`: `systemMessages` (errors, success, consent, newsletter states), `SMS_CONSENT_TEXT` (frozen, matches the Twilio A2P campaign).
- `src/lib/seo.ts`: `defaultMetadata`, `generateOrganizationJsonLd`, `generateWebsiteJsonLd`, `generateProductJsonLd`, `generateArticleJsonLd`, `generateBreadcrumbJsonLd`, `generateServiceJsonLd`, `generateAboutPageJsonLd`, `generateSoftwareApplicationJsonLd`.
- `src/lib/site-url.ts`: `SITE_URL` (defaults to `https://patina.cloud`).

### Studio components
- **Location:** `src/components/studio/`
- **Purpose:** the Living Study visual system. `StudioPage` is the shared page shell (eyebrow, title, description, hero image/art, `tone: "paper" | "olive"`). `StudioMotion` exposes `StudioMotionProvider`, `StudioMotion` (scroll-linked wrapper), `MotionControl`, `useStudioMotion`. `LivingStudy` is the homepage scroll narrative, `FoundingInvitation` the closing CTA, `JoinCircleButton` opens the global modal. `BackgroundVideo` is the decorative muted loop (AV1 webm + mp4, optional mobile sources at ≤767px): it plays only while intersecting, falls back to its optimized poster when `useStudioMotion().enabled` is false or Save-Data is on, takes `active={false}` for stacked hidden layers, and `playbackRate` (default 1; set as `defaultPlaybackRate` so `load()` keeps it). Used by the LivingStudy scenes (under a matte `.photo` filter and a `.shade::before` warm wash; the hero `home-table` loop plays at 1×, the install loop at 0.7×) and the /makers hero (1×).

### Founding Circle modal
- **Location:** `src/components/ui/FoundingCircleModal/` (`FoundingCircleModal.tsx`, `FoundingModalContext.tsx`, CSS module)
- **Exposes:** `FoundingModalProvider`, `FoundingCircleModal`, `useFoundingModal()`; opened from `JoinCircleButton`, `FoundingPopover`, and CTAs with a `source` string that lands in `waitlist.source`.

### Sanity
- **Location:** `sanity/`
- **Exposes:** `client`, `previewClient`, `urlFor`, `sanityFetch({query, params, revalidate, isDraftMode})` from `sanity/lib/client.ts`; GROQ constants in `sanity/lib/queries.ts` (page singletons, products, makers, materials, journal, sitemap queries); `schemaTypes` in `sanity/schemas/index.ts`.
- **Consumers on this branch:** `/careers`, `/journal`, `/journal/[slug]`, `sitemap.ts`.

### Build scripts
- `scripts/cloudflare-build.mjs` → `retainPublicBuildEnv()` and `assertNoPrivateValues()` from `scripts/cloudflare-artifact.mjs`, keys from `scripts/production-env.mjs` (`buildKeys`, `runtimeKeys`, `loadProductionEnv`, `missingKeys`).
