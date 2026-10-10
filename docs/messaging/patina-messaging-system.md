# Patina messaging: site rules

**Source of truth:** `/Users/kody/Code/patina-merged/marketing/canon` (`voice.md`, `lexicon.json`, `claims.md`, `art-direction.md`). It governs positioning, audience (studios first), voice, lexicon, claims and CTAs for every customer-facing string on this site. Founders' ruling, 2026-10-09. Read it before writing any headline, button, email, or system string. The previous version of this document (dual-track, consumer-led) is in git history.

## Lint

```bash
node /Users/kody/Code/patina-merged/marketing/tools/voice-lint.mjs <file|dir>
```

Rules are data in `marketing/canon/lexicon.json`. Exit 1 on any error.

## Site-only rules (not covered by the canon)

- **System strings** (errors, success, empty, consent, newsletter-confirm) live in `src/lib/copy/system-messages.ts`. Email frames live in `src/lib/emails/template.ts`. Change them there, not inline.
- **`SMS_CONSENT_TEXT` is frozen verbatim.** It matches the Twilio A2P campaign submission. Never retype or reword it; always derive from the constant.
- **Consent copy:** minimal, honest, linked. One-paragraph banner, a Privacy Policy link, and Decline as a real, equal choice.
- **Pre-launch:** the app and marketplace are not live. Never imply the app is downloadable today.
- **Canonical facts:** `hello@patina.cloud`, Madison WI, `patina.cloud`.

## Rulings 2026-10-09

- **V3:** the Founding Circle is a second, quieter door, not the lead call to action.
- **V5:** the tagline "Where Time Adds Value" is kept and used sparingly (footer, metadata, one brand moment).
- **V4:** names, no titles, in bylines and attributions.
- **V2:** no price or fee language until the founders rule otherwise.
- **Canon rules:** where this site and the canon disagree on voice, lexicon or claims, the canon wins.
- **/designers:** carries a quiet homeowner newsletter line.
