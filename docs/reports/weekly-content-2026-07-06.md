# Weekly Content Pipeline Check — Patina

**Report date:** Monday, 2026-07-06
**Month-to-date:** 6 of 31 days in July (19% through the month)
**Source:** Sanity CMS (project `kv3qrinl` / dataset `production`), type `journalPost`
**Previous report:** `weekly-content-2026-06-15.md` (21 days ago)

---

## TL;DR — Fourth flat report. The decision the last one asked for still hasn't been made.

**Nothing has moved.** Same 3 published posts, 0 drafts, 0 scheduled — identical to the April 20, May 28, and June 15 reports. That's now **90 days since the last publish** (April 7), **0 of 10** Tier 1 priority topics drafted, and **0 of 3** schema fixes shipped.

The June 15 report already stopped re-ringing the alarm and put a fork on the table: **formally pause content until post-launch, or restart with one low-lift piece.** Twenty-one days later, none of it happened — not the article, not the schema fix, and (going by the docs) not even the 15-minute decision. No pause was recorded in the visibility plan or a DECISIONS entry; the plan is byte-for-byte unchanged since April.

So here's the honest read: **the pause decision has effectively been made by inaction.** Content is parked, and that's a defensible call while the Designer Portal is the product. The only thing missing is *saying so on paper* and **snoozing this Monday check** so it stops generating a red flag no one is acting on. That's the whole ask this week.

---

## Status Snapshot

| Bucket | Count | Notes |
|---|---|---|
| Published in last 7 days (Jun 29 – Jul 6) | **0** | No publishing activity |
| Currently in draft | **0** | Nothing in flight |
| Scheduled (`publishedAt` in future) | **0** | No runway queued |
| Total journal posts in CMS | **3** | Unchanged since April 7 |

### All journal posts in CMS (unchanged from last three reports)

| Published | Title | Slug | Category | Tier field |
|---|---|---|---|---|
| 2026-04-07 | Why We're Building Patina | `why-were-building-patina` | building-patina | null |
| 2026-04-05 | The Designer as Intelligence Layer | `designer-as-intelligence-layer` | design-thinking | null |
| 2026-04-03 | What We Look For in a Founding Maker | `what-we-look-for-founding-maker` | maker-stories | null |

Most recent journal activity in Sanity: **2026-04-07** (publish) / `_updatedAt` **2026-04-07T15:02:12Z** — **90 days ago**.

### Data hygiene flags (unchanged for 12+ weeks)
- All 3 posts still have `tier: null`, `status: null`, `tags: null`. `author` is set ("Leah") on all three. Cadence still can't be self-audited from the CMS until `tier` exists as a real field.
- Still **19 document types**, no `newsletterIssue` doctype. Explicit name-match query for `*ewsletter* / *ssue* / *mail* / *digest*` → 0 hits. Newsletter cadence remains invisible to this report.

---

## Cadence Health (against visibility-plan targets)

### July 2026 — month-to-date (19% elapsed)

| Tier | July target | Published in July | Status |
|---|---|---|---|
| **Tier 1** — AI citation / expert Q&A | 2 | **0** | 🔴 RED — trajectory, not calendar (see note) |
| **Tier 2** — Behind-the-build narrative | 1 | **0** | 🔴 RED |
| **Tier 3** — Quick-reference / listicle | 1 | **0** | 🔴 RED |
| **Newsletter** ("The Designer's Eye") | 2 (biweekly) | Unknown | 🟡 YELLOW — no CMS visibility |

**Honest caveat on the reds:** July is only 19% elapsed, so the *month* isn't mathematically lost — a Tier 1 piece shipping mid-month would still be roughly on monthly pace. The red is about **trajectory, not the calendar**: with 0 drafts and 0 scheduled after 90 parked days, there is no runway for anything to ship in July without starting from a standing stop right now.

### Quarter-to-date snapshot (May + Jun + Jul so far)

| Tier | Cumulative target (since May 1) | Published | Gap |
|---|---|---|---|
| Tier 1 | ~4 | 0 | **−4** |
| Tier 2 | ~2 | 0 | **−2** |
| Tier 3 | ~2 | 0 | **−2** |

Every published post predates this window. The AI-discovery content the visibility plan actually rests on (Tier 1 + Tier 3) has produced nothing since April.

---

## Priority Topics — Still Untouched (0 / 10)

All 10 Tier 1 priority topics remain undrafted, unchanged across all four reports:

1. How to Tell If Furniture Will Last 20 Years *(top priority — Leah's sourcing lane)*
2. What Interior Designers Look For That You'd Never Notice *(top priority — designer POV)*
3. The Real Difference Between $800 and $3,000 Furniture
4. How to Furnish a Room in the Right Order
5. What AR Room Scanning Actually Tells You About Your Space *(Kody lane — product fit)*
6. How Designers Choose Furniture for Clients (The Real Process)
7. Why Most Furniture Recommendations Are Wrong
8. How to Mix High and Low Price Points Without It Looking Cheap
9. What to Ask a Furniture Maker Before You Buy
10. The Furniture Your Designer Wishes You'd Stop Buying

---

## Newsletter Check — "The Designer's Eye"

No `newsletterIssue` doctype exists in Sanity (confirmed against the full 19-type list). If issues are going out, they live outside the CMS and this report can't see them. Plan target is **biweekly** — for the last 14 days that's ~1 issue. Based on carry-over from prior reports and zero CMS activity, the working assumption is the newsletter is also stalled, but it **cannot be verified from automation.**

**Recommendation (unchanged, and low-priority if pausing):** either add a thin `newsletterIssue` doctype (`subject`, `sentAt`, `previewText`, `linkedPost`) or point this check at the sending platform (Klaviyo / Mailchimp / ConvertKit / Resend). Skip entirely if content is being formally paused.

---

## What's Due This Week (Jul 6–12)

This is a **decision week**, not a catch-up week. Backfilling a quarter of gap isn't realistic and isn't worth it — rushing expert content would undercut the exact quality the AI-citation thesis depends on.

1. **Make the pause official (15 minutes, Kody).** One line in the visibility plan or a DECISIONS entry: *"Content engine paused until [launch / target week]. Resume with 1 Tier 3 + 1 Leah interview."* Three weeks ago this was one of two options; the intervening silence has made it the default. Just record it.
2. **Snooze this check (2 minutes).** Reschedule the weekly content task to fire on the chosen restart date instead of every Monday, so it stops flagging RED into the void. This report has now said the same thing four times — that's the signal that the *cadence of the check* is wrong, not just the content.
3. **Only if you'd rather restart than pause:** draft the one piece that needs no one but you — *"10 Materials That Age Beautifully in Furniture"* (Tier 3). Lowest lift on the board, zero Leah dependency, breaks the 90-day streak in a single sitting.

---

## Recommended Next Actions — The Fork (now weighted toward Path A)

### Path A — Formally pause until post-launch *(the honest default at this point)*
- Record the pause (see "What's Due" #1). Name a restart trigger — a date, or an event like "Designer Portal launch shipped."
- Snooze/repoint this weekly task to the restart date.
- **Why this is fine:** the Designer Portal *is* the product right now, and per project context it's mid-flight (Dissolve track building, spec v1.4 pending, 22-week launch timeline). Shipping it beats publishing about it. A deliberate, *named* pause with a known restart is a strategy. The drift — automation crying RED while everyone ignores it — is the only actual failure, and it's now on its fourth iteration.

### Path B — Restart with the lowest-friction piece on the board
- **Kody, solo, this week:** draft *"10 Materials That Age Beautifully in Furniture"* (Tier 3, 600–1,000 words, FAQ schema). No interview required. Voice it the way you'd actually say it — lead with a relatable beat, embed the specifics, close on meaning:
  > *"I've found the materials I trust most aren't the flashy ones. They're the ones that look better the day you finally hand the piece down than the day it showed up — white oak (~1,360 on the Janka scale), full-grain leather, linen, soapstone. Patina isn't damage. It's the record of a thing being lived with."*
  70% practical (what each material is, how it ages, how to care for it), 30% why-it-matters.
- **Leah, this week:** confirm a single 60–90 min interview slot for Tier 1 #1, *"How to Tell If Furniture Will Last 20 Years."* Inputs needed: species + Janka numbers, joint types (dovetail vs. dowel vs. staple), the construction tells she spots at retail, and the 3–5 questions she asks a vendor before specifying. This one interview has gated the entire Tier 1 lane for 13+ weeks.
- **Then the 30-min schema fix (Kody):** add `tier` as an enum on `journalPost` and backfill the 3 existing posts, so the next check self-audits instead of inferring.

### Either path
- Decide the newsletter's fate in the same breath as the journal's. Don't pause one and silently let the other rot.

---

## Blockers

- **No recorded decision — now the primary blocker.** The June 15 fork asked for a 15-minute pause-or-restart call. It wasn't made, or at least wasn't written down anywhere this report can see (visibility plan unchanged; no DECISIONS pause entry). Four reports, same reds, because no lane has been formally chosen.
- **Leah-input bottleneck (13+ weeks).** Every Tier 1 topic is gated on one 60–90 min interview that keeps not getting booked. Highest-leverage unblock *if* Path B.
- **Schema gaps unshipped (12+ weeks).** `tier`, `status`, `newsletterIssue` flagged since April 20; none built. Cadence auditing stays partially blind.
- **No pipeline buffer.** Zero drafts, zero scheduled — every week starts from a standing stop.
- **Competing priority is legitimate, not an excuse.** The Designer Portal / "The Document" workstream is real, sanctioned work, and it won the priority fight fairly. That's exactly why the pause should be *named* rather than drifted into.

---

## Trend vs. Previous Reports

| Metric | Apr 20 | May 28 | Jun 15 | **Jul 6** | Δ (since Jun 15) |
|---|---|---|---|---|---|
| Total published | 3 | 3 | 3 | **3** | 0 |
| In draft | 0 | 0 | 0 | **0** | 0 |
| Scheduled | 0 | 0 | 0 | **0** | 0 |
| Days since last publish | 13 | 51 | 69 | **90** | +21 |
| Tier 1 priority topics drafted | 0/10 | 0/10 | 0/10 | **0/10** | 0 |
| Schema fixes (tier/status/newsletter) shipped | 0/3 | 0/3 | 0/3 | **0/3** | 0 |

The pipeline has been fully stopped for four consecutive reports. The only number that moves is "days since last publish," and it only goes up.

---

## Methodology Notes

- Queried Sanity via MCP against project `kv3qrinl`, dataset `production`, `raw` perspective (includes drafts; zero `drafts.*` docs returned, so 0 drafts confirmed).
- Enumerated all 19 `_type` values to verify no newsletter doctype exists; ran an explicit name-match query for `*ewsletter* / *ssue* / *mail* / *digest*` → 0 hits.
- Checked the visibility plan and searched local Patina docs for a recorded content pause/restart decision → none found; `patina-digital-visibility-plan.md` is unchanged since April.
- Tier cadence assessed by inference from publish dates, titles, and `category`, since `tier` is still unset across all posts.
- "Published in last 7 days" window: 2026-06-29 → 2026-07-06.
- This run executed autonomously as a scheduled task (Kody not present). No write actions taken against Sanity or any send platform — read-only audit plus this report file, per the task's constraints.
- Scheduled-task file referenced an older session path; this run is on a different session, so the report was written to the equivalent `docs/reports/` path under the current workspace folder. Sanity is session-independent, so no functional impact.
