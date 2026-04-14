# Founding Circle Modal — Full-Bleed Curtain Design

**Date:** 2026-04-14
**Status:** Approved by user — implementation pending

## Summary

Replace the various inline "Join the Founding Circle" flows (hero CTA, CloseSection, nav popover, mobile menu, AppCTA, AboutCTA) with a single shared full-screen modal that opens with a cinematic curtain sweep and presents a richly styled editorial sign-up card. Content mirrors the user-supplied reference HTML exactly.

## User intent

User provided reference HTML (Playfair + Inter + DM Mono, warm-white + clay + mocha palette, editorial accent bar, strata mark, Leah quote, 4-benefit grid, spots counter, first/last/email/optional "what brings you" fields, Apple/Google social buttons, privacy footer) and said "just use the example." Animation style = Option 1 (curtain takeover). Triggered from every CTA.

## Architecture

### New files

```
src/components/ui/FoundingCircleModal/
  FoundingCircleModal.tsx     — modal chrome, curtain animation, content
  FoundingModalContext.tsx    — React context + provider
  index.ts
```

### Context API

```ts
const { isOpen, open, close } = useFoundingModal();
open(source: string, ctaText?: string);
```

`source` flows into the existing `/api/founding` POST body so attribution/CTA tracking is preserved.

### Provider mount

`FoundingModalProvider` wraps `<body>` children in `src/app/layout.tsx`. Modal renders into a React portal on `document.body`.

### Existing CTA updates

Replace each existing trigger so clicking calls `open()` instead of navigating to `/founding` or opening inline form / popover:

- `HomepageHero.tsx` — primary CTA
- `CloseSection.tsx` — primary CTA
- `FoundingPopover.tsx` — becomes a plain button that calls `open('nav')` (drop the dropdown)
- `MobileMenu.tsx` — the "Join the Founding Circle" item
- `AppCTA.tsx`, `AboutCTA.tsx` — primary CTAs

`/founding` route remains (for deep linking, SEO, rich content).

## Animation — curtain takeover

Framer Motion with `AnimatePresence`. Respects `useReducedMotion`.

| Time | Element | Motion |
|------|---------|--------|
| 0ms | Dim overlay | opacity `0→1`, `backdrop-filter: blur(5px)`, 300ms |
| 0ms | Curtain (warm-white sheet with paper texture, fixed inset-0) | `clip-path: inset(100% 0 0 0) → inset(0 0 0 0)`, 500ms `cubic-bezier(0.16,1,0.3,1)` |
| 400ms | Card | opacity `0→1`, `translateY 16→0`, `scale 0.98→1`, 550ms |
| 550ms | Masthead | fadeUp 450ms |
| 700ms | Quote block | fadeUp |
| 850ms | Benefits grid | fadeUp |
| 950ms | Spots counter | fadeUp |
| 1000ms | Form | fadeUp |

Close reverses: card fades + translates down (200ms), then curtain sweeps back down (400ms).

**Reduced motion:** all animations collapse to simple 200ms opacity fade, no clip-path, no translate.

## Content (from reference HTML verbatim)

**Masthead:** "PATINA" wordmark · strata mark (3 bars) · "The Founding *Circle*" · tagline "Help us build how furniture discovery should work."

**Quote block:**
> "I've sourced furniture for clients for years. The tools never matched how designers actually think. So we're building the one I wish existed."
> — LEAH KOCHAVER, CO-FOUNDER · MIDDLEWEST STUDIO · MADISON, WI

**Benefits (4 cells):**
- ★ Named at Launch — Your name on what you helped build
- ◈ Behind the Curtain — The real, unpolished building story
- ⟡ Real Influence — Shape makers, categories, features
- ⌂ First Access — First through the door at launch

**Spots counter:** Pulls from `/api/founding/count`. Displays `"{200 - count} of 200 spots remaining · Madison, WI"` with a pulsing sage dot. Hides if count ≥ 200 or if fetch fails (graceful).

**Form fields:**
- First Name (optional)
- Last Name (optional)
- Email (required, validated)
- "What brings you to Patina?" (optional)

Submit → `POST /api/founding` (existing endpoint). Server already accepts `first_touch_attribution` / `last_touch_attribution` / etc. First/last name + "what brings you" go into `first_touch_attribution` alongside `preferred_styles` to avoid schema changes (keep existing schema untouched).

**Social row:** "or join with" divider, then Apple and Google buttons. These are visual-only for now (no social auth configured). Clicking them tracks `founding_modal_social_click` with `{ provider }` and shows inline hint "Email signup is live — social login at launch." Buttons remain styled per reference but don't navigate.

**Footer:** "By joining you agree to our [Privacy Policy](/privacy) · No spam, ever."

## Styling

Reuse existing Patina CSS variables from `globals.css` where they map; import Playfair + DM Mono via `next/font` (Inter already present). The reference's color tokens map as:

- `--ow` → `var(--patina-warm-white)` / `#FAF7F2`
- `--pe` (#E5E2DD) → new or existing pergament/border — will use `rgba(163,146,124,0.2)` from existing patterns
- `--cl` (#C4A57B) → `var(--patina-clay-beige)` (close enough; existing is #A3927C — will use a slightly lighter hex for the italic accents to match the editorial feel)
- `--ao` (#8B7355) → `var(--patina-mocha-brown)` variant
- `--mo` (#5C4A3C) → `var(--patina-mocha-brown)` (#655B52)
- `--ch` (#2C2926) → `var(--patina-charcoal)` (#3F3B37)

Card uses white background (not warm-white) to "pop" against the warm-white curtain. Top accent bar: 3px linear-gradient(90deg, mocha → clay → transparent), radius-matched.

## Success state

On successful submit, card content replaces with a centered success block:
- Strata mark (animated reveal)
- "Welcome to the Founding Circle" (display font)
- "Watch your inbox for your first letter from Leah."
- Small "Close" button

Modal stays open until user dismisses (X, ESC, click outside).

## Accessibility

- `role="dialog" aria-modal="true" aria-labelledby={titleId}`
- First input autofocused on open
- ESC closes; click outside closes; X closes
- Focus trap (tabbing cycles within modal)
- Focus returns to the triggering CTA on close
- `<html>` gets `overflow: hidden` while open (iOS-safe)
- Underlying `<main>` gets `aria-hidden="true"` while open

## Analytics

- `founding_modal_opened` — `{ source, cta_text }`
- `founding_modal_closed` — `{ reason: "x" | "esc" | "outside" | "success" }`
- Existing `founding_circle_signup` event fires on success (unchanged)
- `founding_modal_social_click` — `{ provider }`

## Out of scope

- Actual Apple/Google social auth wiring
- Editing `/founding` route page
- Schema changes to waitlist table
- Sanity content sourcing (copy is hardcoded per reference — can be Sanity-ized later)

## Deferred questions

None — user approved matching the example.

## Implementation notes

Because this is a well-scoped, single-component feature with a concrete reference spec, we're skipping the formal `writing-plans` step and implementing directly. Work ordering:

1. Create `FoundingModalContext` + provider
2. Mount provider in root layout
3. Build `FoundingCircleModal` chrome (portal, backdrop, curtain, card)
4. Build animation timeline (Framer Motion variants)
5. Build content sections (masthead → quote → benefits → spots → form → social → footer)
6. Wire submit to `/api/founding` (reuse logic from existing `FoundingCircleForm`)
7. Add fetch-on-open for spots count
8. Build success state
9. Accessibility (focus trap, ESC, scroll lock, aria)
10. Wire each existing CTA to `open()`
11. Test (manual + reduced motion + keyboard nav)
12. Deploy
