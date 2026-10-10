---
description: Customer-facing copy follows the messaging system
globs: ["src/app/**/*.tsx", "src/lib/copy/**", "src/lib/emails/**", "src/data/**", "src/components/**/*.tsx"]
prompt: ["copy", "headline", "tagline", "CTA", "email", "newsletter", "voice", "messaging", "wording"]
priority: 60
---
- Before writing or editing any headline, button label, email, error string, or meta description, read the canon at `/Users/kody/Code/patina-merged/marketing/canon` (`voice.md`, `lexicon.json`, `claims.md`, `art-direction.md`), the source of truth for positioning, studios-first audience, voice, lexicon, claims and CTAs, and lint with `node /Users/kody/Code/patina-merged/marketing/tools/voice-lint.mjs <file|dir>`. Site-only rules and the 2026-10-09 rulings are in `docs/messaging/patina-messaging-system.md`.
- System strings live in `src/lib/copy/system-messages.ts`; email frames in `src/lib/emails/template.ts`. Change them there, not inline.
- Restrained AI: designers lead. Never write accuracy percentages, "invisible signals", "AI-powered" on its own, or anything that reads as surveillance.
- The app and marketplace are pre-launch. Never imply the app is downloadable today. Never fake urgency, scarcity, testimonials, or team members.
- Canonical facts: `hello@patina.cloud`, Madison WI, `patina.cloud`. Tagline "Where Time Adds Value" stays canon; use sparingly (footer, metadata, one brand moment).
- No titles in bylines (names only) and no price or fee language until the founders rule otherwise.
- On the Living Study branch only `/careers`, `/journal`, and the sitemap read Sanity; homepage, `/founding`, `/designers`, `/about`, `/app`, `/contact`, `/services`, and `/makers/apply` are hardcoded studio pages. Check `sanityFetch` imports before assuming a page is CMS-backed; when it is, editing the code default alone does not change the live page.
