# SMS Sign-Up & Consent Page — Design

**Date:** 2026-08-11 · **Status:** Approved approach, pending spec review
**Goal:** Clear Twilio A2P 10DLC rejection 30909 ("CTA could not be verified") by making `https://patina.cloud/signup` a real, publicly accessible page whose SMS opt-in exactly matches the campaign registration — then resubmit.

## Problem

The A2P campaign registration describes an opt-in at `https://patina.cloud/signup` (account creation with an unchecked SMS-consent checkbox). That page does not exist — the URL 404s — and the privacy/terms pages carry none of the SMS disclosures carriers check. Reviewers could not verify the CTA, so the campaign was rejected with error 30909.

## Decisions (made with Kody)

- Build the real opt-in **on this marketing site** at `/signup` (not portal-only, not a disclosure-only page).
- Campaign scope is **transactional/account only** (login verification codes, account and order notifications). No marketing SMS; no second consent checkbox.
- Phone is **optional**; the consent checkbox is **unchecked by default**. Consent is never a condition of signing up.

## What gets built

### 1. `/signup` page (new, public)

`src/app/signup/page.tsx` (server, metadata) + `SignupContent.tsx` (client form). Consumer-track surface (messaging §2B): creating a Patina account today means joining the Founding Circle and getting first access when the app launches — stated plainly per the honesty rules (§6). No implication the app is downloadable now.

Form fields:

- First name (optional)
- Email (required)
- Mobile number (optional, `type="tel"`, label "Mobile number (optional)")
- SMS consent checkbox — unchecked, directly under the phone field, exact text:

  > I agree to receive account and order notification text messages and login verification codes from Patina at the mobile number provided. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to cancel at any time. See our [Privacy Policy](/privacy) and [SMS Terms](/terms#sms).

  This paragraph is the compliance artifact: the campaign's message-flow description will quote it verbatim, so its wording is frozen once submitted. It lives in `src/lib/copy/system-messages.ts` as `SMS_CONSENT_TEXT` so the form, the API snapshot, and any future surface share one string.

- Honeypot field + rate limiting, same as `FoundingCircleForm`.

Validation: email required/regex (matches API); if consent is checked with no phone → inline "Add a mobile number, or uncheck the texts option." If phone present but unchecked → submit fine, no SMS fields sent. Phone lightly validated (strip formatting; 10–15 digits) and normalized toward E.164 (`+1` default for 10-digit US numbers).

Submit → existing `POST /api/founding` with `source: "signup_page"`, plus the standard lead payload (attribution, PostHog identity) via the existing `lead-payload`/`lead-capture` helpers, and new `phone`, `sms_consent` fields. Success state reuses the Founding Circle welcome messaging (letter from Leah).

### 2. `/api/founding` extension

Accept optional `phone` (string) and `sms_consent` (boolean). Upsert adds:

- `phone` (column already exists from CRM extension 00145) — only overwritten when a non-empty phone is submitted
- `sms_consent: true`, `sms_consent_at: now()`, `sms_consent_text: SMS_CONSENT_TEXT` — only set when consent is true **and** phone is present; a later re-submit without consent must not clear previously recorded consent (revocation happens via STOP, not this form)

Reject nothing new: bad phone → 400 with the same warm error voice.

### 3. Migration (patina-merged repo — schema owner)

`/Users/kody/Code/patina-merged/supabase/migrations/00433_waitlist_sms_consent.sql` (next free number after 00432):

```sql
ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS sms_consent      boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sms_consent_at   timestamptz,
  ADD COLUMN IF NOT EXISTS sms_consent_text text;
```

Applied by Kody via the usual `pnpm supabase:remote:push` flow. Until applied, the API must tolerate the columns' absence (feature-detect: on Supabase error 42703, retry the upsert without the SMS fields and log a warning) so `/signup` can deploy first and never 500s.

### 4. `/privacy` — new "Text messages (SMS)" section

Added after the data-collection section: what we send (account/order notifications, login codes), that consent is optional and collected via unchecked checkbox at signup, frequency varies, message/data rates, opt-out (STOP) and help (HELP or hello@patina.cloud), and the carrier-mandated sentence, verbatim:

> No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.

Also update the existing "phone number" bullet to reference the signup form.

### 5. `/terms` — new "SMS terms" section, `id="sms"`

Anchor-linkable as `/terms#sms` (referenced from the consent checkbox and the campaign registration). Covers: program description (Patina account notifications — transactional only), opt-in method, frequency varies, Msg & data rates may apply, STOP/HELP keywords, "carriers are not liable for delayed or undelivered messages," support contact `hello@patina.cloud`.

### 6. Discoverability

- Add `/signup` to `src/app/sitemap.ts`.
- Add a "Sign Up" link in the footer's legal/link row so reviewers can reach the CTA from the homepage.

### 7. Analytics

Reuses the founding pipeline (`founding_circle_signup` server event). Client fires the existing `waitlist_signup` event with `signup_page: "/signup"`, plus a `sms_consent` boolean property. No new event names.

### 8. E2E test

`e2e/signup.spec.ts`, following existing spec patterns: page renders publicly, consent checkbox exists and is **unchecked** by default, consent-without-phone shows the inline error, and the consent paragraph contains "STOP", "HELP", and "Message and data rates may apply".

## Twilio resubmission (manual, after deploy)

Paste-ready for the campaign edit — final text lives in this spec so both sessions agree:

- **CTA / opt-in URL:** `https://patina.cloud/signup` (public, no login)
- **Message flow description:** "End users opt in while creating a Patina account at https://patina.cloud/signup (publicly accessible, no login required). The form includes an optional mobile number field and an unchecked consent checkbox reading: '<SMS_CONSENT_TEXT verbatim>'. Consent is optional and not a condition of account creation. SMS disclosures: https://patina.cloud/privacy and https://patina.cloud/terms#sms."
- Opt-in keywords: none (web form only). Opt-out: STOP. Help: HELP.

Resubmit only after the site deploys and both URLs render the described content.

## Error handling

Same posture as founding: honeypot swallow, IP rate-limit 429, Supabase failure → warm 500 copy + `founding_signup_error` capture. New: missing-column fallback (see §3) so deploy order (site first, migration second) is safe.

## Out of scope

Actually sending SMS (lives in patina-merged, already Twilio-integrated), marketing-SMS consent, portal signup changes, phone verification (OTP), CMS backing for the new page (hardcoded like `/founding`).
