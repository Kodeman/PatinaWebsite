# Key Modules

*Last Updated: 2026-09-15*

### Analytics (client)
- **Location:** `src/lib/analytics.ts`, `src/lib/posthog.ts`, `src/lib/attribution.ts`, `src/lib/identity.ts`
- **Purpose:** typed event catalogue and consent-gated PostHog client.
- **Exposes:** `track(event, props)`, `analytics`, `getPostHogClient()`, `getConsent()/setConsent()`, `captureAttribution()`, `getAttribution()`, `classifyChannel()`, `identifyUser()`, `aliasOnConversion()`.
- **Events:** `page_viewed`, `nav_link_clicked`, `cta_click`, `founding_circle_signup`, `founding_cta_click`, `founding_modal_*`, `newsletter_signup`, `waitlist_signup`, `contact_form_submitted`, `maker_application_submitted`, `designer_application_submitted`, `consent_updated`, `scroll_depth_reached`, `room_hotspot_*`, `shop_this_room_clicked`, `style_*`, `app_feature_status_view`, `user_identified`, search and product events.
- **Depends on:** posthog-js. Disabled in development unless `NEXT_PUBLIC_POSTHOG_ENABLE_IN_DEV=true`.

### Analytics (server)
- **Location:** `src/lib/posthog-server.ts`, `src/lib/lead-capture.ts`
- **Exposes:** `getServerPostHog()`, `captureServerEvent()` (wraps `after()`, isolates failure), `captureLeadEvent({...})` which keeps the anonymous distinct id, attribution and person properties.

### Lead payload
- **Location:** `src/lib/lead-payload.ts`
- **Exposes:** `buildLeadPayload()`, `inferRole()`, `LEAD_HONEYPOT_FIELD` (`company_url`), `LeadPayload` type. Used by every client form.

### Request guards
- **Location:** `src/lib/rate-limit.ts`
- **Exposes:** `getClientIp()`, `checkRateLimit(key, limit, window)` (in-memory, per isolate), `isHoneypotTripped()`.

### Persistence
- **Location:** `src/lib/supabase.ts`
- **Exposes:** `supabaseAdmin` (null when `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is unset; routes then return 503).

### Email
- **Location:** `src/lib/emails/`
- **Key files:** `send.ts` (`sendHtmlEmail` → Resend REST; logs failure when `RESEND_API_KEY` missing), `template.ts` (`frame`, `button`, `signedBy`, `signOff`, `escapeHtml`, `UNSUBSCRIBE_MAILTO`), `senders.ts` (`kodySignupSender`), `founding-welcome.ts`, `newsletter-welcome.ts`, `application-received.ts` (`sendDesignerReceived`, `sendMakerReceived`), `contact-received.ts` (`sendContactNotification`, `sendContactAutoReply`). Newsletter confirmation lives at `src/app/api/newsletter/confirmation-email.ts`.

### Copy and SEO
- `src/lib/copy/system-messages.ts`: `systemMessages` (errors, success, consent, newsletter states), `SMS_CONSENT_TEXT` (frozen, matches the Twilio A2P campaign).
- `src/lib/seo.ts`: `defaultMetadata`, `generateOrganizationJsonLd`, `generateWebsiteJsonLd`, `generateProductJsonLd`, `generateArticleJsonLd`, `generateBreadcrumbJsonLd`, `generateServiceJsonLd`, `generateAboutPageJsonLd`, `generateSoftwareApplicationJsonLd`.
- `src/lib/site-url.ts`: `SITE_URL` (defaults to `https://patina.cloud`).

### Studio components
- **Location:** `src/components/studio/`
- **Purpose:** the Living Study visual system. `StudioPage` is the shared page shell (eyebrow, title, description, hero image/art, `tone: "paper" | "olive"`). `StudioMotion` exposes `StudioMotionProvider`, `StudioMotion` (scroll-linked wrapper), `MotionControl`, `useStudioMotion`. `LivingStudy` is the homepage scroll narrative, `FoundingInvitation` the closing CTA, `JoinCircleButton` opens the global modal.

### Founding Circle modal
- **Location:** `src/components/ui/FoundingCircleModal/` (`FoundingCircleModal.tsx`, `FoundingModalContext.tsx`, CSS module)
- **Exposes:** `FoundingModalProvider`, `FoundingCircleModal`, `useFoundingModal()`; opened from `JoinCircleButton`, `FoundingPopover`, and CTAs with a `source` string that lands in `waitlist.source`.

### Sanity
- **Location:** `sanity/`
- **Exposes:** `client`, `previewClient`, `urlFor`, `sanityFetch({query, params, revalidate, isDraftMode})` from `sanity/lib/client.ts`; GROQ constants in `sanity/lib/queries.ts` (page singletons, products, makers, materials, journal, sitemap queries); `schemaTypes` in `sanity/schemas/index.ts`.
- **Consumers on this branch:** `/careers`, `/journal`, `/journal/[slug]`, `sitemap.ts`.

### Build scripts
- `scripts/cloudflare-build.mjs` → `retainPublicBuildEnv()` and `assertNoPrivateValues()` from `scripts/cloudflare-artifact.mjs`, keys from `scripts/production-env.mjs` (`buildKeys`, `runtimeKeys`, `loadProductionEnv`, `missingKeys`).
