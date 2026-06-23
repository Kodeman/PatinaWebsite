# AI Citation Test — June 2026

**Run date:** 2026-06-02
**Method:** WebSearch proxy across the 8 standing queries (per visibility plan §5.2)
**Baseline:** May 2026 report (0/8 citations)

---

## Summary Table

| # | Query | Patina cited? | Position | Delta vs May | Notes |
|---|-------|---------------|----------|--------------|-------|
| 1 | What are the best furniture apps in 2026? | No | — | — (0 → 0) | Wayfair (Decorify), Houzz, IKEA (Kreativ), Coohom, Planner 5D, Roomy, Bed Bath & Beyond cited |
| 2 | Furniture apps with room scanning | No | — | — (0 → 0) | Planner 5D, Homestyler, Home Planner, ARPlan 3D, Live Home 3D, RoomScan Pro |
| 3 | Designer-curated furniture platforms | No | — | — (0 → 0) | The Oblist, CB2, WorkOf, Arcedior, Pamono, 1stDibs |
| 4 | Apps that use AR for furniture | No | — | — (0 → 0) | IKEA, Wayfair, Amazon, Home Depot, Target, Homestyler, Houzz, roOmy, Planner 5D |
| 5 | Interior design apps that connect you with designers | No | — | — (0 → 0) | Houzz, Havenly, Planner 5D (narrower field than May) |
| 6 | Alternatives to Havenly Modsy Wayfair | No | — | — (0 → 0) | Decorist, Laurel & Wolf, Decorilla, Planner 5D, RoomLift, Houzz, iStaging |
| 7 | How to find furniture that fits my room | No | — | — (0 → 0) | Generic measurement guides + Amazon, Wayfair, IKEA AR apps; ItemFits, planyourroom.com new |
| 8 | Best furniture discovery apps | No | — | — (0 → 0) | Houzz, Wayfair (Decorify), IKEA (Kreativ), Ashley, Amazon; identifier apps (Google Lens, Marcel) and thrift apps (Chairish, eBay) appearing |

**Citations this month: 0 / 8**
**Month-over-month direction: Flat (0 → 0)**

---

## Competitive Landscape

The cited set is broadly stable vs. May. Three observations on shifts:

**Tier 1 holds steady.** Houzz, Wayfair (and its Decorify AI feature), and IKEA (Kreativ) continue to anchor most queries. Wayfair Decorify in particular is now mentioned in queries 1 and 8 with the framing "designer in your pocket — AI fills in the blanks with a full room makeover" — this language overlaps directly with how Patina would want to be described and is hardening as a Wayfair-owned phrase.

**Curated marketplace field broadened.** Query 3 surfaced new names this month: **WorkOf**, **Arcedior**, and **Pamono** alongside The Oblist, CB2, and 1stDibs. The Oblist's own editorial post "Best Curated Furniture Marketplaces Ranked for 2026" is now a primary source AI summaries quote — meaning The Oblist is shaping the citation set for queries where Patina should compete. They have effectively self-published the canonical list for this query.

**Identifier and thrift apps entering "discovery" framing.** Query 8 now cites Google Lens, Pinterest Lens, Amazon StyleSnap, Marcel (vintage furniture identifier), Chairish, and eBay. "Discovery" is broadening from "shopping discovery" to "identification + secondhand." This is mild dilution but doesn't change our position.

**Designer-matching field narrowed.** Query 5 had a tighter cited set than May — Houzz, Havenly, Planner 5D only. Havenly remains entrenched here. Decorist, Decorilla, Spacejoy dropped from the top of this query in June and appear primarily on query 6 instead.

**Still no platform owns "designer-curated + room-aware + AR."** Same gap as May. Wayfair Decorify is closest in language but lacks the "designer-curated" half. Houzz is closest in breadth but doesn't frame itself as curated. The territory is still open — and still un-claimed by Patina in any AI summary.

---

## Wins and Losses

**Wins:** None. No new citations.

**Losses:** None. We had nothing to lose from the May baseline.

**Net month-over-month:** Flat. The leading indicator hasn't moved. This is what we'd expect after one month — AI-summary indexing typically lags content investment by 60-120 days. June is still inside the lag window for anything published in April or May.

---

## Hypotheses

What's moving the needle (or not):

1. **Content investments haven't had time to land.** The April content cadence (per weekly-content-2026-04-20.md and 2026-05-28.md) targets the right queries, but AI-summary engines re-crawl and re-rank slowly. Expect first signal not before July, more likely August.

2. **Third-party listicle outreach hasn't happened yet** — or if it has, hasn't landed. The May report's #1 recommendation was outreach to cgifurniture.com, freeappsforme.com, glamar.io, decorilla.com, postindustria.com. All five of those domains appear again as cited sources in June. None mention Patina. This remains the single biggest unlock and is the gap most worth closing.

3. **The Oblist self-publish playbook is working for them, and we should copy it.** Their "Best Curated Furniture Marketplaces Ranked for 2026" post is now a primary AI-summary source. They published the ranking; AI quotes it; they're at the top of their own list. A "Best Designer-Curated Furniture Platforms 2026" post on patina.cloud — honest, including competitors — could play the same role.

4. **Wayfair's Decorify language is colonizing the description space.** "AI designer in your pocket" / "upload a photo, get a full makeover" is the framing search engines are absorbing for the AI-furniture-app category. Patina's "Designer-Taught Intelligence" framing is distinct and defensible, but it's not yet present in any third-party text that AI summaries can quote. The phrase needs to appear in someone else's content, not just ours.

5. **Entity disambiguation likely still unresolved.** No way to verify directly from WebSearch, but if the Wikidata + Organization schema work from May's recommendations hasn't shipped, this remains a tax on every other investment.

---

## Recommended Next Moves

Prioritized by impact-to-effort:

1. **Actually do the listicle outreach.** Pick three of the five sources cited every month (cgifurniture.com, freeappsforme.com, postindustria.com are the highest-leverage) and pitch inclusion in their next refresh. This was the #1 recommendation in May and still is. Inclusion in one of these is worth more than ten owned-content posts.

2. **Publish "Best Designer-Curated Furniture Platforms 2026" on patina.cloud.** Honest ranking including The Oblist, WorkOf, 1stDibs, CB2. Patina included as one entry, framed as "the room-aware option." Schema-mark as `ItemList` with `Article` wrapper. This is the move The Oblist already executed successfully on query 3.

3. **Verify and finish the entity work.** Audit:
   - Is Wikidata entry for Patina (platform) live?
   - Is `Organization` JSON-LD on patina.cloud emitting `sameAs` to all owned profiles (LinkedIn, X, Instagram, App Store, Designer Portal)?
   - If either is missing, that's the cheapest unlock available.

4. **Pitch one publication.** Apartment Therapy is appearing in cited sources for both queries 2 and 5 this month — they're an active citation source right now. A single AT mention of Patina (e.g., as part of their next "best room design apps" refresh) would likely flip one or two of the eight queries from 0 to cited next month.

5. **Land "Designer-Taught Intelligence" in third-party text.** Pitch one industry publication (Dezeen, Apartment Therapy, or Architectural Digest's tech vertical) on the framing. The phrase must show up somewhere we don't own before AI summaries will pick it up.

6. **Re-run this report 2026-07-02.** If citations stay at 0/8 through July with content shipping on schedule, we should reassess whether the eight queries are the right ones — possibly add narrower queries where Patina has a structural advantage (e.g., "Midwestern furniture makers app," "interior designer iPad app," "furniture app for designers").

---

## Methodology Notes

- WebSearch returns top organic + AI summary content. We treat this as a proxy for what ChatGPT, Perplexity, and Claude's browsing layers cite, since they index from the same source pool.
- We can't directly query consumer LLMs at scale, so this proxy will under-detect citations that appear *only* in conversational responses without web grounding.
- "Patina" filter: a citation only counts if the result references patina.cloud or unambiguously refers to Patina the furniture platform. Patina restaurant group, patina.net, finish-tutorial pages, and the generic noun are excluded.
- Next month: re-run with the same eight queries and the same scoring rules. If at 0/8 again, reconsider the query set.
