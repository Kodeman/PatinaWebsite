# Database

*Last Updated: 2026-09-15*

## Overview

- **Engine:** Supabase Postgres, hosted project referenced by `NEXT_PUBLIC_SUPABASE_URL` (project id visible in `wrangler.jsonc`). `CLAUDE.md` still mentions a self-hosted instance at `api.patina.cloud`; the code and `docs/engagement-tracking-plan.md` now point at the hosted project.
- **Access layer:** `@supabase/supabase-js` with the service-role key, server-side only (`src/lib/supabase.ts`).
- **Migrations:** none in this repo. `docs/engagement-tracking-plan.md` §1.1 holds the original `waitlist` DDL; `docs/reports/engagement-capture-audit-2026-06.md` documents schema drift between routes and any committed DDL. The live schema is the source of truth; inspect it before adding columns.

## Tables written by this site

| Table | Route | Notable columns (from the route bodies) |
|-------|-------|------------------------------------------|
| `waitlist` | `POST /api/founding` (upsert on email), `GET /api/founding/count` | `email`, `source`, `role`, `first_name`, phone + SMS consent columns, `utm_*`, `referrer`, `signup_page`, `cta_text`, `posthog_distinct_id`, `first_touch_attribution`, `last_touch_attribution` |
| `newsletter_subscribers` | `POST /api/newsletter` (upsert), `GET /api/newsletter/confirm` | `email`, confirmation token, confirmed/pending status, attribution |
| `contact_messages` | `POST /api/contact` | `name`, `email`, `message`, attribution |
| `founding_designer_applications` | `POST /api/designers-apply` | designer profile fields including `location`, `sourcing_process` |
| `maker_applications` | `POST /api/makers-apply` | `brand_name`, `contact_name`, `location`, `materials`, `trade_program` |

Open the route file for the exact column list before changing an insert; the audit report notes columns the routes write that older DDL lacked.

## Relationships

The plan links `waitlist.auth_user_id` → `auth.users` and a `handle_new_user()` trigger that seeds `profiles` on conversion; this site never reads those. No foreign keys are enforced from this codebase.

## Sanity content model (`sanity/schemas/`)

- **Objects:** `cta`, `sectionHeader`, `featureItem`, `imageWithMeta`, `statistic`.
- **Documents:** `product`, `maker`, `material`, `testimonial`, `teamMember`, `servicePackage`, `trustBadge`, `journalPost`.
- **Singletons (pages):** `homePage`, `aboutPage`, `appPage`, `servicesPage`, `designersPage`, `careersPage`, `contactPage`, `makersApplyPage`, `siteSettings` (creation blocked in `sanity.config.ts`; listed in `desk-structure.ts` `SINGLETONS`).
- Only `careersPage` and `journalPost` are read by pages on this branch; the other singleton queries in `sanity/lib/queries.ts` are currently unused by routes.
- TypeScript shapes for products/makers/materials live in `src/types/sanity.ts`.
