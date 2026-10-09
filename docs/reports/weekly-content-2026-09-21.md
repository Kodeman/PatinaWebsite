# Weekly Content Check — Monday, September 21, 2026

Automated run of `patina-weekly-content-check`. Source: Sanity CMS (project `kv3qrinl`, dataset `production`), compared against `docs/patina-digital-visibility-plan.md`. Previous report: `weekly-content-2026-08-31.md` — **the September 7 and September 14 runs did not produce a report** (no files in `docs/reports/`). Three weeks of gap, not one.

## Status Snapshot

| Bucket | Count |
|---|---|
| Published, last 7 days | 0 |
| Drafts in progress | 0 |
| Scheduled (future `publishedAt`) | 0 |
| Total journalPosts in CMS | 3 (April 3, 5, 7 — launch seed, unchanged) |

- **167 days** since anything published (April 7 → today; ~24 weeks).
- `tier` still null on all three posts — seventh consecutive report carrying it.
- No `newsletterIssue` document type exists in Sanity; the dataset holds 15 content types and none records a send.

## Cadence Health — September, Day 21 of 30

| Tier | Target | Sept MTD | Status |
|---|---|---|---|
| Tier 1 | 2 | 0 | 🔴 70% through the month, nothing drafted |
| Tier 2 | 1 | 0 | 🔴 |
| Tier 3 | 1 | 0 | 🔴 |
| Newsletter (biweekly) | 1 issue in last 14 days | Not verifiable | 🟡 No send-log in Sanity or `supabase/` (7th report) |

If nothing ships by September 30, that's **May through September — five consecutive months at zero** against a plan that called for four pieces a month from Month 4 onward.

## What Actually Moved (the honest version)

The repo is not idle — it's just not doing content:

- **Sept 12:** `output/pdf/Patina-Maker-Pitch-Packet.pdf` and `Patina-Photographer-Shot-List.pdf` were generated (plus a zipped package). That's maker-recruitment and photo collateral — real brand work, and the shot list is the kind of raw material Tier 2 posts get built from. It isn't journal content, though.
- **Sept 15:** commit adding the codebase map, live rules, and CRAP gate.
- **Uncommitted, in progress:** the Cloudflare Workers migration (`wrangler.jsonc`, `open-next.config.ts`, `tests/cloudflare-artifact.test.mjs`, e2e updates across every page, `CLAUDE.md`/`README.md` rewrites). This is where the hours are going.
- `docs/patina-digital-visibility-plan.md` last touched **April 13**. The cadence target was never re-scoped, so this report still grades against 4/month.

## The Decision, Still Open

The August 31 report asked for one written call — commit, re-scope, or pause — before September 1. None was made, and two scheduled runs went missing in the meantime, which looks more like the task fell over than like a deliberate pause. The three options haven't changed:

1. **Commit** — one dated calendar hold for a 30-minute Leah interview, one dated ship date for a Tier 3 piece. Dates, not tasks. (Cloudflare shipping first is a defensible reason to date these for October rather than this week — but date them.)
2. **Re-scope** — edit the plan to one piece/month. From a standing start with two founders, a portal build, and a hosting migration in flight, that's the honest number.
3. **Pause** — turn this scheduled task off until the migration lands. The plan doc keeps the targets; nothing is lost.

**Default if you'd rather not decide:** option 3, until Cloudflare is deployed. A tripwire firing weekly with no capacity to respond is noise.

## If You Pick "Commit" — Due This Week

- **Tier 3, "Room-by-Room Furniture Dimensions Guide"** — AI-draftable today, needs only Leah's accuracy pass. Cheapest way to break the streak before the month closes.
- **Leah interview, 30 minutes, recorded on a phone** — joints, drawer boxes, veneer tells, upholstery. Raw material for priority topics #1 ("How to Tell If Furniture Will Last 20 Years") and #2 ("What Interior Designers Look For That You'd Never Notice"). Still the single unblocking action for all Tier 1 work.
- **Backfill `tier`** on the three live posts (all read as Tier 2). Five minutes in Studio.
- **Newsletter:** check the Resend dashboard for any "Designer's Eye" send since Sept 7. If none, the biweekly promise on the site's newsletter signup is currently unkept.

All 10 priority topics remain untouched since April. Full list: `docs/patina-digital-visibility-plan.md` §2.1.

## Blockers

- **No raw material.** Zero drafts. The Leah interview is the unblocking action, unchanged since June.
- **Newsletter sends unobservable.** Settled tooling debt; a manual Resend check is the only verification.
- **Capacity is on the migration.** Content isn't losing to neglect, it's losing to Cloudflare. That's a scheduling fact, not a failure — but the plan doc should say so.
- **Scheduled task reliability.** Two consecutive runs produced nothing. The task file references a `nifty-optimistic-hawking` session path that no longer exists; this run wrote to the live mount instead. Worth re-saving the task with a stable path if the check is staying on.

---

*Generated automatically. Next run: Monday, September 28, 2026 — unless paused.*
