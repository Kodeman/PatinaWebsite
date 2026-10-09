# Weekly Content Pipeline Check — Patina

**Report date:** Thursday, 2026-07-23 *(scheduled task fired today; normally Monday)*
**Month-to-date:** 23 of 31 days in July (74% through the month)
**Source:** Sanity CMS (project `kv3qrinl` / dataset `production`), type `journalPost`
**Previous report:** `weekly-content-2026-07-13.md` (10 days ago)

---

## TL;DR — Sixth flat journal report. The pause is now the only story worth telling.

The journal numbers haven't moved and won't in July: **3 published, 0 drafts, 0 scheduled, 107 days since the last publish.** Every tier is red, and at 74% of the month elapsed with nothing in flight, that's arithmetic, not risk.

Two things sharpened since Jul 13:

1. **The "content is happening elsewhere" thesis got stronger — and moved off the CMS.** Last week's headline was the Jul 10 `helpContent` burst. That was a *one-time push*: the newest write of **any** type in Sanity is still Jul 10, so the CMS has been quiet for **13 days**. The real energy is in the repo — `DECISIONS.md` went from **R98 → R115 (+17 rulings)** in the same ten days (last edited Jul 21). The Designer Portal design workstream isn't just alive, it's accelerating. Content capacity is committed there, on purpose.
2. **The pause still isn't written down.** Sixth ask. The visibility plan is byte-for-byte unchanged since Apr 13; `DECISIONS.md` has no journal/newsletter/content-pause entry. The lane has been chosen in practice for 107 days and recorded nowhere.

**The ask is unchanged and now overdue: record the one-line pause, then repoint this check to the restart trigger.** A report that returns the same three reds six times running is training you to ignore the channel you'll actually need when content restarts. Paste-ready line is in *What's Due*.

---

## Status Snapshot

| Bucket | Count | Notes |
|---|---|---|
| Published in last 7 days (Jul 16 – Jul 23) | **0** | No journal activity |
| Currently in draft | **0** | Nothing in flight |
| Scheduled (`publishedAt` in future) | **0** | No runway queued |
| Total journal posts in CMS | **3** | Unchanged since Apr 7 |
| Newest CMS write, **any** type | **2026-07-10** | 13 days quiet (was the "busy" signal last week) |

### All journal posts in CMS (unchanged, six reports running)

| Published | Title | Slug | Category | Tier field |
|---|---|---|---|---|
| 2026-04-07 | Why We're Building Patina | `why-were-building-patina` | building-patina | null |
| 2026-04-05 | The Designer as Intelligence Layer | `designer-as-intelligence-layer` | design-thinking | null |
| 2026-04-03 | What We Look For in a Founding Maker | `what-we-look-for-founding-maker` | maker-stories | null |

Most recent journal `_updatedAt`: **2026-04-07T15:02:12Z** — **107 days ago.**

### Data hygiene flags (unchanged, 14+ weeks)
- All 3 posts still carry `tier: null`, `status: null`. `author` is "Leah" on all three. This check still can't self-audit tier from the CMS.
- Still no `newsletterIssue` doctype among the **19 types / 304 docs**. Newsletter cadence remains invisible to automation.

---

## Cadence Health (against visibility-plan targets)

### July 2026 — month-to-date (74% elapsed)

| Tier | July target | Published in July | Status |
|---|---|---|---|
| **Tier 1** — AI-citation / expert Q&A | 2 | **0** | 🔴 RED |
| **Tier 2** — Behind-the-build narrative | 1 | **0** | 🔴 RED |
| **Tier 3** — Quick-reference / listicle | 1 | **0** | 🔴 RED |
| **Newsletter** ("The Designer's Eye") | ~2 (biweekly) | Unknown | 🟡 YELLOW — no CMS visibility |

July is mathematically gone (declared gone at 42% on Jul 13; now 74% with still-zero drafts). As last week noted, these reds are accurate against a target no one is currently trying to hit — which is exactly why the target needs to be formally suspended rather than missed in silence.

### Quarter-to-date (May 1 → Jul 23, ~2.7 months)

| Tier | Cumulative target | Published | Gap |
|---|---|---|---|
| Tier 1 | ~5 | 0 | **−5** |
| Tier 2 | ~3 | 0 | **−3** |
| Tier 3 | ~3 | 0 | **−3** |

---

## Priority Topics — Still Untouched (0 / 10)

Unchanged across all six reports:

1. How to Tell If Furniture Will Last 20 Years *(top priority — Leah's sourcing lane)*
2. What Interior Designers Look For That You'd Never Notice *(top priority — designer POV)*
3. The Real Difference Between $800 and $3,000 Furniture
4. How to Furnish a Room in the Right Order
5. What AR Room Scanning Actually Tells You About Your Space *(Kody lane)*
6. How Designers Choose Furniture for Clients (The Real Process)
7. Why Most Furniture Recommendations Are Wrong
8. How to Mix High and Low Price Points Without It Looking Cheap
9. What to Ask a Furniture Maker Before You Buy
10. The Furniture Your Designer Wishes You'd Stop Buying

**Still worth noting:** the Jul 10 help corpus (Library, Margin, Orders, "Send a proposal") is adjacent to #6 — "How Designers Choose Furniture for Clients" is effectively being written as product help copy, for an audience of one designer, behind a login. When the journal restarts, that corpus is a source, not a blank page.

---

## Newsletter Check — "The Designer's Eye"

No `newsletterIssue` doctype exists (confirmed against the full 19-type list). If issues are going out, they live outside the CMS (Resend) and this check can't see them. Biweekly target → ~1 expected in the last 14 days; **unverifiable from automation.** Working assumption remains "also paused." Low-priority fix unchanged: add a thin `newsletterIssue` doctype (`subject`, `sentAt`, `previewText`, `linkedPost`) or point this check at Resend — or skip entirely if content is formally paused.

---

## What's Due This Week (Jul 23–30)

Two items. Both Kody, both short, neither is writing an article.

1. **Record the pause (15 min).** One line in `docs/patina-digital-visibility-plan.md` (or a DECISIONS entry) makes six reports' worth of red reflect reality instead of drift:
   > *"Journal + newsletter paused as of 2026-04-07. Content capacity is committed to Designer Portal help content + design workstream through launch. Restart trigger: [Portal launch shipped / specific date]. Resume with 1 Tier 3 (no dependencies) + 1 Leah interview (Tier 1 #1)."*
2. **Repoint this check (2 min).** Snooze the weekly task to fire on the restart trigger instead of every Monday. Six identical reports is the signal that the cadence, not the content, is what's misconfigured.

---

## Recommended Next Actions

### Path A — Formally pause *(the correct call; stronger evidence than ever)*

The Jul 10 help writes plus the R98→R115 jump in `DECISIONS.md` are the receipt: capacity is being **spent**, deliberately, on the surface that ships with the product. Shipping the Portal beats publishing about it. Name that decision instead of letting it surface as red cells.

- Record the pause + restart trigger (*What's Due* #1).
- Repoint/snooze this task (*What's Due* #2).
- Decide the newsletter's fate in the same breath — don't pause one lane and let the other quietly rot.

### Path B — If you'd rather restart than pause (unchanged, and cheapest it'll ever be)

- **Kody, solo — no dependencies:** draft *"10 Materials That Age Beautifully in Furniture"* (Tier 3, 600–1,000 words, FAQ schema). Breaks a 107-day streak in one sitting. Voice it the way you'd actually say it:
  > *"I've found the materials I trust most aren't the flashy ones. They're the ones that look better the day you hand the piece down than the day it showed up — white oak (~1,360 Janka), full-grain leather, linen, soapstone. Patina isn't damage. It's the record of a thing being lived with."*
  70% practical (what it is, how it ages, how to care for it), 30% why it matters.
- **Leah — the one gating input:** a single 60–90 min interview for Tier 1 #1, *"How to Tell If Furniture Will Last 20 Years."* Needs: species + Janka numbers, joint types (dovetail vs. dowel vs. staple), the construction tells she spots at retail, the 3–5 questions she asks a vendor before specifying. This one interview has gated the entire Tier 1 lane for **15+ weeks.**
- **Then the 30-min schema fix:** add `tier` as an enum on `journalPost` and backfill the 3 posts, so this check can self-audit.

---

## Blockers

- **No recorded decision — still the only real blocker.** Asked Jun 15, Jul 6, Jul 13, and now. Visibility plan unchanged since Apr 13; `DECISIONS.md` (now R115) has no journal/newsletter/pause entry. Chosen in practice for 107 days, written down nowhere.
- **Leah-input bottleneck (15+ weeks).** Every Tier 1 topic gated on one unbooked interview. Only matters under Path B.
- **Schema gaps unshipped (14+ weeks).** `tier`, `status`, `newsletterIssue` flagged since Apr 20; none built.
- **No pipeline buffer.** Zero drafts, zero scheduled — any restart begins from a standing stop.
- **~~Competing priority~~ → Confirmed, accelerating priority.** The Designer Portal isn't crowding out the journal by accident. R98→R115 in ten days is the receipt. Ratify it, don't lament it.

---

## Trend vs. Previous Reports

| Metric | May 28 | Jun 15 | Jul 6 | Jul 13 | **Jul 23** | Δ |
|---|---|---|---|---|---|---|
| Total published | 3 | 3 | 3 | 3 | **3** | 0 |
| In draft | 0 | 0 | 0 | 0 | **0** | 0 |
| Scheduled | 0 | 0 | 0 | 0 | **0** | 0 |
| Days since last publish | 51 | 69 | 90 | 97 | **107** | +10 |
| Tier 1 priority topics drafted | 0/10 | 0/10 | 0/10 | 0/10 | **0/10** | 0 |
| Schema fixes shipped | 0/3 | 0/3 | 0/3 | 0/3 | **0/3** | 0 |
| Non-journal CMS writes (last 7d) | — | — | 0 | ~17 | **0** | −17 |
| `DECISIONS.md` head (R-number) | — | — | — | R98 | **R115** | +17 |

Six consecutive flat journal reports. The only two moving numbers live outside the journal — days-since-publish (climbing) and the R-count (climbing faster). The journal isn't drifting; it's parked while the product ships.

---

## Methodology Notes

- Queried Sanity via MCP, project `kv3qrinl` / dataset `production`, `raw` perspective (includes drafts; zero `drafts.*` returned → 0 drafts confirmed).
- Confirmed newest write across all 19 types = `2026-07-10T22:32:54Z` (appPage/careersPage/contactPage) → CMS quiet 13 days; last week's `helpContent` activity was a single Jul 10 push, not an ongoing stream.
- Verified no recorded pause: `patina-digital-visibility-plan.md` unchanged since 2026-04-13; `patina-merged/.../DECISIONS.md` (head R115, mtime Jul 21) has no journal/newsletter/content-pause entry.
- Tier cadence assessed by inference from publish dates, titles, and `category`, since `tier` is unset on all posts.
- "Published in last 7 days" window: 2026-07-16 → 2026-07-23.
- Ran autonomously as a scheduled task (Kody not present). **Read-only** — no writes to Sanity or any send platform; the only file created is this report, per the task's constraints.
