# Identity Contract — Canonical ID Across Surfaces

**Status:** Contract (normative — every surface that emits to PostHog must follow this)
**Date:** 2026-06-23
**Owners:** Growth / Platform
**References:** `docs/reports/engagement-capture-audit-2026-06.md` — gaps **G11** (identity merge half-wired), **G15** (identity spine not built), **G16** (no canonical-ID decision).

---

## The problem this solves

A person browses the marketing site anonymously, signs up with their email, later logs into the portal / Chrome extension / iOS app, and becomes an authenticated user. PostHog must recognize all of that as **one person** — otherwise pre-signup browsing is orphaned from the identified profile (audit G11) and cross-surface behavior never stitches (audit G15). This contract defines the **single canonical identifier** and the exact `identify` / `alias` calls each surface makes so the stitch always holds.

A single PostHog project spans all Patina surfaces (per `docs/engagement-tracking-plan.md`), which is what makes a shared identity contract both possible and mandatory.

---

## The canonical ID, in one sentence

> **Email is the canonical `distinct_id` before authentication; the Supabase `auth.uid()` becomes canonical after authentication; `alias()` welds the two together at the moment of conversion so the entire history — anonymous, email-stage, and authenticated — is one person.**

### The three identity stages

| Stage | Canonical `distinct_id` | Who sets it |
|---|---|---|
| **Anonymous** | PostHog-generated `posthog_distinct_id` (random) | PostHog SDK, automatically |
| **Pre-auth (email known, not yet a user)** | **email** | Client `identify(email)` at signup |
| **Authenticated** | **`auth.uid()`** | Each surface on login, `identify(auth.uid())`, then `alias(email)` |

---

## The contract, step by step

### 1. Anonymous browsing

The PostHog SDK assigns a random `posthog_distinct_id` and persists it in `localStorage+cookie`. All pre-signup events attach to it. No code action required beyond initialization.

### 2. Client-side signup → `identify(email)`

When a visitor submits a signup form, the **client** calls `identify(email)`. This is already correct on the founding and newsletter forms — e.g. `FoundingCircleForm.tsx`:

```ts
posthog?.identify(trimmed, { email: trimmed, founding_source: source });
```

`identify` on the live client **merges** the current anonymous `distinct_id` into the email identity, so pre-signup browsing is retained. **This client call is the load-bearing merge.** Server-side events alone cannot perform it, because only the browser holds the anonymous `distinct_id`.

### 3. Server-side lead events → use the anonymous `posthog_distinct_id`, never the email

This is the crux of audit **G11**. Server routes that mirror a signup must emit with the **anonymous** `posthog_distinct_id` the client captured and sent in the request body — **not** the email.

- **Correct (founding route, `src/app/api/founding/route.ts`):**
  ```ts
  posthog.capture({
    distinctId: posthog_distinct_id || normalizedEmail, // anonymous id preferred
    // ...
  });
  ```
- **Incorrect (designer/maker routes today, `designers-apply` / `makers-apply`):**
  ```ts
  posthog.capture({
    distinctId: normalizedEmail, // ❌ never sends the anonymous id
    // ...
  });
  ```

**Why it matters:** if the server emits a lead event keyed on the email while the **only** merge of anonymous→email happens client-side, a designer who applies but whose client `identify` is blocked (ad-blocker, no consent yet) has their pre-application browsing orphaned. **Rule: every form posts `posthog_distinct_id` to its route, and every server route uses that anonymous id as `distinctId`, falling back to email only when it is genuinely absent.** Designer and maker forms must start sending it (they currently send neither the id nor a client `identify`).

### 4. Conversion (waitlist/lead → authenticated user) → `alias(auth.uid(), email)`

When the person creates an authenticated account (Supabase `auth.users`), the email identity must be welded to the new `auth.uid()`:

```ts
// auth.uid() becomes the canonical id; the email identity is aliased onto it
posthog.alias(auth.uid(), email);
```

- `alias(A, B)` tells PostHog "A and B are the same person." After this, **`auth.uid()` is the canonical `distinct_id`** and the full email-stage (and, transitively, anonymous-stage) history rolls up under it.
- This is the one-time bridge. Do it exactly **once**, at conversion.
- On the Supabase side, the `handle_new_user()` trigger (per the plan, **G15** — not yet built) copies `posthog_distinct_id` from the lead row onto the new `profiles` record, giving the backend the same linkage the `alias` gives PostHog.

> **Why `alias` and not just `identify(auth.uid())`?** Because the person already has a *named* identity (their email) from step 2. Re-`identify`-ing to a brand-new `auth.uid()` would **not** retroactively merge the email-keyed history — PostHog only merges *anonymous* ids into a named id, not one named id into another. `alias` is the explicit "these two named ids are the same" instruction. This is the decision that resolves the email-vs-`auth.uid()` collision flagged in audit **G16**.

---

## Cross-surface rule (extension / iOS / portal)

Every authenticated surface — Chrome extension, iOS app, designer portal — follows the **same** two-call pattern on login:

```ts
// 1. Canonical id is always the Supabase auth.uid()
posthog.identify(auth.uid(), { email, platform: "<extension|ios|portal>" });

// 2. Weld the email identity onto it (idempotent; safe to repeat per login)
posthog.alias(email);
```

Rules:

- **`auth.uid()` is the *only* canonical id post-auth, on every surface.** Never `identify` an authenticated user by email, device id, or extension id — those become **person properties**, not the `distinct_id`.
- **Always `alias(email)` after the `identify`.** This guarantees that a person who first appeared via email on the marketing site (step 2) merges with their authenticated identity, regardless of which surface they authenticate on first.
- `alias` is idempotent for an already-linked pair, so calling it on every login is safe and is the defensive default.
- Device-specific ids (`ios_device_id`, `extension_user_id`) are stored as `$set` person properties / on the `profiles` row — they are attributes of the canonical person, never the canonical id itself.

### One person, every surface — the resulting graph

```
anonymous posthog_distinct_id ──merge via client identify(email)──► email
                                                                      │
                                              alias(auth.uid(), email) at conversion
                                                                      ▼
                                                                  auth.uid()  ◄── canonical
                                                                      ▲
              every surface: identify(auth.uid()) + alias(email) on login
```

---

## Quick reference

| Moment | Surface | Call |
|---|---|---|
| Anonymous browse | web | (SDK assigns random id; no action) |
| Signup form submit | web client | `identify(email)` |
| Signup server mirror | web server route | `capture({ distinctId: posthog_distinct_id ?? email })` |
| Account conversion | web / backend | `alias(auth.uid(), email)` **once** + trigger copies `posthog_distinct_id` to `profiles` |
| Login | extension / iOS / portal | `identify(auth.uid())` then `alias(email)` |

**Three non-negotiables:**
1. Server lead events use the **anonymous** `posthog_distinct_id`, never the email (G11 — designer/maker routes must be fixed).
2. Conversion uses **`alias`**, never a re-`identify`, so email-stage history survives (G16).
3. Post-auth, **`auth.uid()` is the canonical id everywhere**; email is aliased, device ids are properties (G15/G16).
