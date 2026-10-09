# Communication

*Last Updated: 2026-10-09*

## HTTP API (same origin, JSON)

All form routes accept `application/json` bodies built by `buildLeadPayload()` and share this contract:
- `400` with `{ error }` for validation (messages from `systemMessages` or literal strings such as `"Valid email is required"`).
- `429` with `Retry-After` when `checkRateLimit` trips; honeypot hits return a quiet success without persisting.
- `503` with `Retry-After: 60` when `supabaseAdmin` is null or the write fails in a retryable way.
- `500` `{ error: "Failed to save …" }` for non-retryable persistence errors.
- `200`/`201` `{ ok / message }` after the row is saved; email and analytics run in `after()` and never change the response.

`GET /api/founding/count` returns `{ count }` with `Cache-Control: no-store`, or `503` when unavailable (never a fabricated zero).
`GET /api/newsletter/confirm?token=` redirects to `/?newsletter=confirmed|invalid|error` (`NewsletterConfirmStatus`).

## Client → analytics

`track()` in `src/lib/analytics.ts` is the only sanctioned path for named events; it no-ops without a key. Without consent posthog-js still captures in cookieless mode, so pageviews and clicks are counted anonymously. Page views come from `PostHogPageView` in `src/app/providers.tsx`; clicks from autocapture plus `TrackedLink`/`track()` named events. Attribution is captured once per session by `captureAttribution()` and read back into every lead payload, including `/api/contact`. Signup events are never sent from the browser; the server event is authoritative.

## Campaign links

`next.config.ts` has temporary vanity redirects for print: `/parade`, `/studio-door`, `/hire` → `/designers?utm_source=…&utm_medium=print&utm_campaign=2026-10-…`. UTM rules and the link table for every October piece are in `docs/marketing/utm-convention.md`; reporting (dashboard 2084092, daily subscription 167653 to kody@) in `docs/posthog-reporting.md`.

## PostHog proxy

`next.config.ts` rewrites `/ingest/static/*` and `/ingest/array/*` to `us-assets.i.posthog.com` and `/ingest/*` to `us.i.posthog.com`. `skipTrailingSlashRedirect: true` keeps ingest URLs intact.

## Server → PostHog

`captureLeadEvent()` → `captureServerEvent()` → posthog-node `capture` + `shutdown`, scheduled with `after()` so the response is never delayed and failures are swallowed with a log line.

## Server → Resend

`sendHtmlEmail()` POSTs to Resend's REST API with `fetch`. Every new signup (Founding, newsletter request, designer, maker, contact) also sends an internal `sendLeadNotification()` to `LEAD_NOTIFY_TO` (kody@patina.cloud) via `scheduleLeadNotification()` in `after()`; repeat founding signups and honeypot hits do not. The contact founder notification goes to hello@ and kody@. Sender identities come from `src/lib/emails/senders.ts`; every marketing email includes the unsubscribe line from `template.ts`. When `RESEND_API_KEY` is absent the send is logged as failed and the API response is unaffected, except `/api/contact`, which requires the founder notification to be accepted when the DB insert failed.

## Sanity

- Reads: `sanityFetch` with `next: { revalidate: 3600 }` and CDN, `perspective: "published"`; draft mode switches to `previewClient`.
- Webhook: Sanity → `POST /api/revalidate` (signature via `next-sanity/webhook` `parseBody` + `SANITY_WEBHOOK_SECRET`) → `revalidatePath` for the affected routes.
- Preview: `GET /api/draft?secret=…` enables draft mode; `/api/draft/disable` clears it.

## Supabase

Service-role REST via supabase-js from route handlers only. Tables in `database.md`. No realtime, storage, or auth usage on this site.
