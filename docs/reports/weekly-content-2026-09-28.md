# Weekly Content Check — Monday, September 28, 2026

Automated run of `patina-weekly-content-check`. Sources: Sanity (project `kv3qrinl`, dataset `production`), `docs/patina-digital-visibility-plan.md`, and a Gmail search for newsletter sends. Previous report: `weekly-content-2026-09-22.md`.

**Short version:** the journal hasn't moved in 174 days. September closes at 0 of 4. What's new this week: the writing that *is* happening lives in Sanity as designer-portal teaching notes, and that gives us a Tier 2 piece Kody can write without Leah.

## Status Snapshot

| Bucket | Count |
|---|---|
| Published, last 7 days | 0 |
| Journal drafts in progress | 0 |
| Scheduled (future `publishedAt`) | 0 |
| Total journalPosts in CMS | 3 (April 3, 5, 7: the launch seed, unchanged) |

- **174 days** since the last journal post went live (April 7).
- **New since last report:** 11 drafts created Sept 26: 8 `teachingNote` and 3 `teachingRelease` (galley parts, invoice print, invoice delivery status, field hours, second-seat hours, invite handoff). This is in-product help for the designer portal, not journal. It's still the most writing Sanity has seen since April.
- The old drafts are still there: 6 seed `maker` drafts (Dec 2025) and 4 `trustBadge` drafts (April 8).
- `tier` is still null on all three live posts.

## Cadence Health: September, Day 28 of 30 (month effectively closed)

| Tier | Target | Sept | Status |
|---|---|---|---|
| Tier 1 | 2 | 0 | 🔴 |
| Tier 2 | 1 | 0 | 🔴 |
| Tier 3 | 1 | 0 | 🔴 |
| Newsletter (biweekly) | 1 issue in last 14 days | None found | 🔴 probable |

**Newsletter:** this is the first run with evidence. Kody's Gmail has `hello@patina.cloud` mail flowing all month (morning briefs, invoice reminders), so Resend is delivering. But no "Designer's Eye" subject line shows up in the last 90 days. That's not proof if Kody isn't on the subscriber list. Still, it's the strongest signal so far that no issue has gone out. Kody can confirm in the Resend dashboard in 30 seconds.

## What's Due This Week (October starts Thursday)

1. **Decide: commit, re-scope, or pause.** This is the fifth report to ask. Nothing has changed: 145 uncommitted files in the website working tree, and all the capacity is going to the product. Pausing this check (or moving it to monthly) until content restarts is an honest option, not a failure.
2. **If re-scoping** (new option, see Blockers): update the visibility plan's Tier 1 list so it serves studios, not homeowners, before anyone drafts against it.
3. **If committing, the easiest October win is a Tier 2 piece built from the teaching releases.** The Sept 10–11 releases (galley parts, invoice print, ledger invoice delivery) are already a behind-the-build story. Working angle: *"What building for one design studio taught us about invoices, hours, and the second pair of hands."* Kody only, about 2 hours, no Leah time needed. Check it against `docs/messaging/patina-messaging-system.md` before publishing (pre-launch framing, restrained-AI rule).
4. **Backfill `tier`** on the three live posts (about five minutes in Studio). This is the eighth report carrying it.
5. **Confirm the newsletter** in Resend. If nothing has gone out, either send one short issue or soften the "biweekly" promise on the signup form.

## Priority Topics

All 10 are untouched, including #1 "How to Tell If Furniture Will Last 20 Years" and #2 "What Interior Designers Look For That You'd Never Notice". Both still need raw material from Leah. The 30-minute recorded interview on construction tells remains the one action that unblocks them.

## Recommended Next Draft

| Order | Piece | Tier | Needs Leah? | Why now |
|---|---|---|---|---|
| 1 | September teaching releases → build narrative | 2 | No | Material already exists in Sanity |
| 2 | Room-by-Room Furniture Dimensions Guide | 3 | 15-min accuracy pass | AI-draftable, reference-style |
| 3 | How to Tell If Furniture Will Last 20 Years | 1 | Yes, interview | Top priority, highest citation value |

## Blockers

- **The plan and the vision may have drifted apart.** The visibility plan (April) aims Tier 1 at homeowner search queries. The current vision in `patina-merged` says the customer is the growing design studio and that homeowners are the studio's clients, not ours yet. Drafting consumer Tier 1 pieces before settling this could mean writing for the wrong reader. Worth a quick look with the `doc-alignment` skill, or a ruling.
- **No raw material from Leah.** There are zero journal drafts, and the interview hasn't happened.
- **Capacity is on the product and the Cloudflare migration.** That's a legitimate choice, but the cadence targets don't reflect it yet.
- **Scheduled task hygiene.** The task file still points at the dead `nifty-optimistic-hawking` session path, and this run wrote to the live mount again. Last week's run fired on Tuesday as well as Monday. Worth re-saving the task with a stable path.

---

*Generated automatically. Method notes: Sanity queried across all document types for activity since Sept 14. Newsletter checked with a Gmail subject search (90 days), since there is no send log in Sanity or the repo. Next expected run: Monday, October 5, 2026, unless paused.*
