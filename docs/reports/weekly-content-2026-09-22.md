# Weekly Content Check — Tuesday, September 22, 2026

Automated run of `patina-weekly-content-check`. Source: Sanity CMS (project `kv3qrinl`, dataset `production`), compared against `docs/patina-digital-visibility-plan.md`. Previous report: `weekly-content-2026-09-21.md` — **yesterday**. This is a second run one day later (the schedule appears to be firing off-cadence after the missed Sept 7 / Sept 14 runs). Nothing changed in 24 hours; this report is deliberately short and defers to yesterday's for the full picture.

## Status Snapshot

| Bucket | Count |
|---|---|
| Published, last 7 days | 0 |
| Journal drafts in progress | 0 |
| Scheduled (future `publishedAt`) | 0 |
| Total journalPosts in CMS | 3 (April 3, 5, 7 — launch seed, unchanged) |

- **168 days** since the last journal publish (April 7).
- The dataset holds 10 draft documents, but none are journal posts: 6 seed `maker` drafts (Dec 2025) and 4 `trustBadge` drafts (April 8). Stale, not pipeline.
- Only Sanity activity since Sept 15: `helpContent` for the designer portal (Sept 16). That's product help, not journal.
- `tier` still null on all three posts.
- No `newsletterIssue` type exists; 19 content types, none records a send.

## Cadence Health — September, Day 22 of 30

| Tier | Target | Sept MTD | Status |
|---|---|---|---|
| Tier 1 | 2 | 0 | 🔴 |
| Tier 2 | 1 | 0 | 🔴 |
| Tier 3 | 1 | 0 | 🔴 |
| Newsletter (biweekly) | 1 issue in last 14 days | Not verifiable | 🟡 No send-log; manual Resend check needed |

Eight days left in the month. A Tier 3 piece is the only target still realistically reachable.

## What's Due This Week

Unchanged from yesterday:

- **Decide** commit / re-scope / pause. This is the fourth report to ask. The Cloudflare migration is still uncommitted (144 changed files in the working tree) and is where the capacity is going — pausing this check until it lands is the honest default.
- If committing: **Tier 3 "Room-by-Room Furniture Dimensions Guide"** (AI-draftable, Leah accuracy pass only) and a **30-minute recorded Leah interview** on construction tells — raw material for priority topics #1 and #2.
- **Backfill `tier`** on the three live posts (five minutes in Studio).
- **Newsletter:** confirm in the Resend dashboard whether a "Designer's Eye" issue went out since Sept 8. If not, the biweekly promise on the signup form is unkept.

## Priority Topics

All 10 untouched since April, including #1 "How to Tell If Furniture Will Last 20 Years" and #2 "What Interior Designers Look For That You'd Never Notice". Full list: `docs/patina-digital-visibility-plan.md` §Tier 1.

## Blockers

- **No raw material** — zero journal drafts; the Leah interview is still the single unblocking action.
- **Newsletter sends unobservable** from Sanity or the repo.
- **Capacity is on the Cloudflare migration**, not content.
- **Scheduled task drift** — this run landed Tuesday, one day after Monday's. The task file still references a `nifty-optimistic-hawking` session path that no longer exists; both runs wrote to the live mount instead. Worth re-saving the task with a stable path and confirming the Monday-only schedule.

---

*Generated automatically. Next expected run: Monday, September 28, 2026 — unless paused.*
