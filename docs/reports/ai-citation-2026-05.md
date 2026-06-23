# AI Citation Test — May 2026

**Run date:** 2026-05-02
**Method:** WebSearch proxy across the 8 standing queries (per visibility plan §5.2)
**Baseline status:** This is the first monthly run. No prior report to delta against — establishing the baseline.

---

## Summary Table

| # | Query | Patina cited? | Position | Notes |
|---|-------|---------------|----------|-------|
| 1 | What are the best furniture apps in 2026? | No | — | Houzz, Wayfair, IKEA, Bed Bath & Beyond, Planner 5D, Roomy dominate |
| 2 | Furniture apps with room scanning | No | — | RoomScan Pro, Polycam, Homestyler, Metaroom, Home Planner, ARPlan 3D listed |
| 3 | Designer-curated furniture platforms | No | — | The Oblist, 1stDibs, Etsy, Baker-McGuire, Curated Furnishings cited |
| 4 | Apps that use AR for furniture | No | — | IKEA Place, Houzz, Amazon, Wayfair, Homestyler, Roomle, Planner 5D, DecorMatters |
| 5 | Interior design apps that connect you with designers | No | — | Houzz, Havenly, Planner 5D, Curate by Sotheby's named |
| 6 | Alternatives to Havenly Modsy Wayfair | No | — | Decorist, Decorilla, Spacejoy, Laurel & Wolf, RoomLift, Remodel AI |
| 7 | How to find furniture that fits my room | No | — | Generic measurement guides + Amazon, Wayfair, IKEA AR apps |
| 8 | Best furniture discovery apps | No | — | Houzz, Wayfair, IKEA, Amazon, Bed Bath & Beyond, Furniture.com |

**Citations this month: 0 / 8**
**Month-over-month direction: N/A (baseline)**

---

## Competitive Landscape

The AI-summary layer of search is currently dominated by a fairly stable set of players across all eight query categories:

**Tier 1 — appearing across multiple queries:**
- **Houzz** — cited in 5/8 queries (1, 4, 5, 8, plus implicit in 3). Owns the "designer connection + product discovery" intersection most directly competitive with Patina.
- **Wayfair** (incl. Decorify) — cited in 5/8 queries. Owns the AI room-makeover narrative.
- **IKEA** (incl. Kreativ) — cited in 5/8 queries. Owns "scan room + place product" narrative.

**Tier 2 — category-specific dominance:**
- **Planner 5D** — design + AR planning queries
- **Havenly** — designer-matching queries (still cited despite the category being noisy)
- **Decorilla, Spacejoy, Decorist** — online interior design service queries
- **The Oblist, 1stDibs** — curated/premium furniture marketplace queries
- **Polycam, RoomScan Pro, Metaroom** — pure room-scanning queries
- **Furniture.com** — newly cited in discovery; launched an AI discovery platform Feb 2026 per Digital Commerce 360

**Notable gap:** No platform currently owns the "designer-curated + room-aware + AR" intersection in search summaries. Houzz comes closest by aggregating designers and AR, but isn't framed as curated. Patina's positioning has open territory — but isn't being indexed against it yet.

---

## Wins and Losses

Nothing to compare against. Treat the May 2026 report as the floor: zero citations across all eight queries. Every future report measures lift from here.

---

## Hypotheses

Since this is the baseline, the hypotheses are about *why* we're at zero, not what's moving:

1. **Indexing lag.** patina.cloud is a young domain. AI-summary engines (Google AI Overview, Perplexity, ChatGPT browsing) preferentially cite established, link-rich sources. Without significant inbound links and content depth, we won't surface in summaries even if our content is on-target.

2. **Entity ambiguity.** "Patina" is heavily overloaded — the Patina restaurant group, Patina Style (Spanish furniture restoration), patina.net, and the noun itself all compete with us for the entity. Until we strengthen schema markup and inbound entity signals (Wikidata, knowledge graph), search engines may not even recognize patina.cloud as the primary "Patina furniture platform" entity.

3. **Content surface area.** The eight queries skew toward "best apps" and listicle formats. We have not yet published the kind of comparison/listicle content that gets quoted in AI summaries. Most cited URLs are roundup posts on cgifurniture.com, glamar.io, decorilla.com, freeappsforme.com, etc. — third-party listicles, not first-party brand pages.

4. **Competitor-defined queries.** Queries 5 and 6 reward platforms that have been written *about* extensively. Even Modsy (shut down July 2022) still appears in current 2026 results because of the comparison-content footprint. We need third-party coverage, not just owned content.

---

## Recommended Next Moves

Ordered by likely impact-to-effort ratio:

1. **Get on third-party listicles.** The single biggest unlock. Reach out to authors of the top-cited roundup pages (cgifurniture.com, freeappsforme.com, glamar.io, decorilla.com, postindustria.com) for inclusion in their next refresh. These pages are what AI summaries quote.

2. **Publish a comparison page on patina.cloud.** "Patina vs. Havenly vs. Decorilla vs. Spacejoy" — this is the type of page that surfaces in queries 5 and 6, and we control the framing. Schema-mark it as a `Product` comparison with `Review` data.

3. **Reinforce the entity.** Submit a Wikidata entry for Patina (the platform) with `P31` (instance of) → "online furniture marketplace." Add `Organization` JSON-LD with `sameAs` links to all owned profiles. This helps search engines disambiguate "Patina" → us.

4. **Own a niche query first.** "Designer-curated furniture platforms" (query 3) has the weakest field — The Oblist is dominant but the rest is fragmented. A dedicated landing page targeting this exact phrase, with strong on-page SEO and a few inbound mentions, could break through faster than the high-competition "best furniture apps" queries.

5. **Schema audit.** Ensure every product page emits valid `Product` JSON-LD with `brand`, `material`, `manufacturer` (the maker). Ensure homepage emits `Organization` + `WebSite` with `potentialAction` for SearchAction. These are table stakes for AI-summary inclusion.

6. **Press hits.** A single mention in a publication that AI engines weight heavily (Apartment Therapy, Architectural Digest, Dezeen, Dwell) likely beats months of owned content. Pitch the "designer-taught intelligence" angle — it's genuinely novel.

---

## Methodology Notes

- WebSearch returns top organic + AI summary content. We treat this as a proxy for what ChatGPT, Perplexity, and Claude's browsing layers cite, since they index from the same source pool.
- We can't directly query consumer LLMs at scale, so this proxy will under-detect citations that appear *only* in conversational responses without web grounding.
- "Patina" filter: a citation only counts if the result references patina.cloud or unambiguously refers to Patina the furniture platform. Patina restaurant group, patina.net, finish-tutorial pages, and the generic noun are excluded.
- Next month: re-run with the same eight queries and the same scoring rules. Add columns for "first-time citation" and "position delta."
