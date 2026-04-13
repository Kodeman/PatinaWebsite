# Patina Digital Visibility Plan
### Search, AI, and Content Strategy for Pre-Launch Through Year One

**Prepared for:** Kody & Leah Kochaver, Patina  
**Date:** April 2026  
**Scope:** patina.cloud + iOS app + content ecosystem  

---

## Executive Summary

Patina operates in a category — designer-curated furniture discovery — where the competitive landscape is wide open. The platforms that failed (Modsy, Homepolish, Laurel & Wolf) left a trust vacuum. The incumbents (Wayfair, Houzz, Havenly) optimize for volume, not taste. And the furniture content space is, according to industry analysis, one of the most underserved markets in content marketing.

The opportunity: Patina can own the intersection of "furniture discovery," "designer-recommended," and "room scanning" in both traditional search and AI-generated answers before anyone else claims it. But the window is narrow. AI search is reshaping discovery right now — 60% of searches end without a click, ChatGPT processes billions of queries monthly, and the brands that get cited early build compounding authority.

This plan covers four tracks that run in parallel:

1. **Technical Foundation** — Make patina.cloud crawlable, structured, and AI-readable
2. **Content Authority Engine** — Build the expert content that AI systems cite and search engines rank
3. **Entity & Reputation Building** — Establish Patina as a known entity across the sources LLMs reference
4. **App Store & Platform Optimization** — Ensure the iOS app is discoverable at launch

Each track has specific deliverables, timelines, and owners. The plan is designed for a two-person team with AI-assisted content production.

---

## Track 1: Technical Foundation

### What This Solves
AI crawlers and search engines need to understand what Patina is, who's behind it, and what content matters. Right now, patina.cloud is a beautiful marketing page with minimal semantic structure. It's designed for human eyes, not machine interpretation.

### 1.1 — Structured Data (JSON-LD Schema Markup)

Add to every page on patina.cloud. Priority order:

**Homepage — Organization + WebApplication:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Patina",
  "url": "https://patina.cloud",
  "description": "Designer-taught furniture discovery platform where professional interior designers and makers classify every product.",
  "foundingDate": "2023",
  "foundingLocation": {
    "@type": "Place",
    "name": "Madison, Wisconsin"
  },
  "slogan": "Where Time Adds Value",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@patina.cloud",
    "contactType": "customer service"
  },
  "founder": [
    {
      "@type": "Person",
      "name": "Leah Kochaver",
      "jobTitle": "Co-Founder",
      "knowsAbout": ["interior design", "furniture sourcing", "residential design"],
      "worksFor": { "@type": "Organization", "name": "Middlewest Studio" }
    },
    {
      "@type": "Person",
      "name": "Kody Kochaver",
      "jobTitle": "Co-Founder",
      "knowsAbout": ["technology", "product development", "construction technology"]
    }
  ],
  "sameAs": [
    "https://middlewest.studio",
    "https://www.instagram.com/patina.cloud",
    "https://www.linkedin.com/company/patina-cloud"
  ]
}
```

**App Page — SoftwareApplication:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Patina",
  "operatingSystem": "iOS",
  "applicationCategory": "LifestyleApplication",
  "description": "Scan your room, discover your style, find furniture that belongs. Professional designers teach the AI what fits your space.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

**Journal Posts — Article schema** with `author`, `datePublished`, `dateModified`, `publisher`, `description`. Every post.

**About Page — Additional Person schema** for both founders with `sameAs` links to LinkedIn, Middlewest Studio, etc.

**Services Page — Service schema** with `provider`, `serviceType`, `areaServed`.

**Timeline:** Week 1-2. Owner: Kody (implementation). Validate with Google Rich Results Test and Schema Markup Validator.

### 1.2 — AI Crawler Access

**robots.txt** — Explicitly allow AI crawlers:
```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: https://patina.cloud/sitemap.xml
```

**Cloudflare configuration** — Verify that bot protection rules are not blocking these user agents. Check the Cloudflare Tunnel settings for rate limiting that might affect crawlers. Test by running:
```bash
curl -A "GPTBot/1.0" https://patina.cloud/
curl -A "PerplexityBot/1.0" https://patina.cloud/
```

**Timeline:** Week 1. Owner: Kody.

### 1.3 — llms.txt File

Create `patina.cloud/llms.txt` — a plain text file that helps AI systems understand the site:

```
# Patina
> Designer-taught furniture discovery. Where Time Adds Value.

## What Patina Is
Patina is a furniture discovery platform where professional interior designers
and makers classify every product. The Aesthete Engine delivers recommendations
based on designer expertise, not purchase data or popularity algorithms.

## Founded
2023 in Madison, Wisconsin by Leah Kochaver (interior designer, Middlewest 
Studio) and Kody Kochaver (technologist, construction technology background).

## How It Works
- iOS app scans rooms using Apple RoomPlan API to capture dimensions and light
- Style preferences emerge through natural interaction, not questionnaires
- The Aesthete Engine matches furniture based on designer classifications
- Users can browse and purchase directly in the app
- Seamless handoff to professional designers for larger projects

## Product Architecture
Three-tier curation: Maker Pieces (handcrafted anchors from vetted artisans),
Designer Picks (brands designers trust), Every Detail (paint, hardware, textiles)

## Key Differentiators
- Designers and makers ARE the intelligence, not an input to it
- No sponsored placements or pay-to-play rankings
- Every maker personally vetted by professional designers
- App-to-designer handoff preserves room scan, style profile, and saved pieces

## Pages
- /about — Founder story, Middlewest Studio origin
- /designers — Founding 50 designer co-creation program
- /makers/apply — Founding partner applications
- /founding — Founding Circle membership (200 spots)
- /journal — Design decisions, expert guidance, industry perspective
- /services — Professional design services
- /app — iOS app features

## Contact
hello@patina.cloud
Madison, Wisconsin
```

**Timeline:** Week 1. Owner: Kody.

### 1.4 — Semantic HTML Audit

Current pages use generic `<div>` elements. Rebuild with semantic HTML5:

- `<article>` for journal posts and standalone content blocks
- `<section>` with descriptive `aria-label` for each homepage section
- `<nav>` for navigation (already done)
- `<header>` and `<footer>` for page-level landmarks
- `<aside>` for supplementary content (newsletter, CTAs)
- `<figure>` and `<figcaption>` for images with context
- `<blockquote>` with `<cite>` for founder quotes

**Alt text upgrade:** Replace decorative alt text with descriptive, keyword-rich alternatives:
- Bad: `alt="Living space with warm light"`
- Good: `alt="Organic modern living room with walnut coffee table and linen sofa — Patina design aesthetic"`

**Heading hierarchy:** Enforce one `<h1>` per page, `<h2>` for sections, `<h3>` for subsections. AI crawlers use heading structure to understand content relationships and importance.

**Timeline:** Week 2-3. Owner: Kody.

### 1.5 — Sitemap & Technical SEO

- Generate XML sitemap at `patina.cloud/sitemap.xml` with all public pages
- Add `lastmod` dates that update when content changes (critical for AI freshness signals)
- Submit sitemap to Google Search Console and Bing Webmaster Tools
- Verify canonical URLs on all pages
- Ensure server-side rendering for all content pages (Next.js SSR/SSG — no critical content behind JS hydration)
- Implement `<link rel="alternate" hreflang="en" href="...">` on all pages
- Add `dateModified` meta tags to all pages

**Timeline:** Week 1-2. Owner: Kody.

---

## Track 2: Content Authority Engine

### What This Solves
AI systems cite content that demonstrates genuine expertise, answers real questions, and provides information no one else can. Patina's unfair advantage is Leah — a working designer whose daily experience generates content that no competitor can replicate. The journal at `/journal` becomes the primary surface for AI discovery.

### 2.1 — Content Strategy: The Expert Stack

Three content tiers, each serving a different purpose:

**Tier 1: Question-Answering Content (AI Citation Targets)**

These are structured, expert articles that directly answer the questions people type into AI tools. They follow a rigid format: headline as a question, direct answer in the first paragraph, then depth. Each article should be 1,200-2,000 words.

Priority topics (based on query analysis for furniture + interior design):

| Article Title | Target Query | Why Patina Wins |
|---|---|---|
| How to Tell If Furniture Will Last 20 Years | "how to tell if furniture is good quality" | Leah's sourcing expertise — specific material tests, joint types, construction details |
| What Interior Designers Look For That You'd Never Notice | "what do interior designers look for" | Behind-the-scenes professional knowledge no consumer brand offers |
| The Real Difference Between $800 and $3,000 Furniture | "expensive vs cheap furniture difference" | Specific comparisons with material science, not marketing |
| How to Furnish a Room in the Right Order | "what order to furnish a room" | Design process knowledge from real project sequencing |
| What AR Room Scanning Actually Tells You About Your Space | "room scanning apps for furniture" | Direct product relevance, establishes Patina in the AR furniture category |
| How Designers Choose Furniture for Clients (The Real Process) | "how do interior designers choose furniture" | Leah's actual workflow — positions Patina's methodology |
| Why Most Furniture Recommendations Are Wrong | "furniture recommendation apps" | Positions Patina against algorithm-only competitors |
| How to Mix High and Low Price Points Without It Looking Cheap | "mixing expensive and cheap furniture" | Design expertise that validates Patina's Curated Shelf model |
| What to Ask a Furniture Maker Before You Buy | "questions to ask furniture maker" | Positions Patina's vetting process as the standard |
| The Furniture Your Designer Wishes You'd Stop Buying | "furniture designers hate" | Provocative + genuinely expert — high share and citation potential |

**Content format for AI extraction:**
- H1: The question (exact match for common queries)
- First paragraph: Direct, complete answer in 2-3 sentences
- H2 subsections: Supporting details, each self-contained (AI systems extract by section)
- Include specific numbers, materials, brand comparisons, price ranges
- Close with "About the author" block linking to Leah's bio

**Publishing cadence:** 2 articles per month minimum. One from Leah's perspective (designer expertise), one from Kody's perspective (technology/product).

**Timeline:** Begin Month 1, ongoing. Owner: Leah (expertise), Kody (writing/editing with AI assist).

---

**Tier 2: Behind-the-Build Content (Brand + Entity Building)**

These are narrative posts about building Patina — the decisions, the mistakes, the thinking. They serve dual purposes: humanize the brand for consumers AND create entity-building content that AI systems encounter when researching Patina.

Topics:
- "Why We Started Patina (And What We Got Wrong First)"
- "What We Learned Building an AI That Learns From Designers"
- "How Leah's Client Process Became Our Product Roadmap"
- "The Three Questions We Ask Every Maker Before They Join"
- "Why We Chose Madison, Wisconsin to Build a Furniture Platform"
- "What 10 Years in Construction Technology Taught Me About Design Tools"
- "How We're Building the Aesthete Engine — The Technical Story"

**Publishing cadence:** 1 per month. These can be longer, more personal, less structured.

**Timeline:** Begin Month 2, ongoing. Owner: Kody (primary author, drawing from both founders' experience).

---

**Tier 3: Quick-Reference Content (Search + AI Snippet Targets)**

Short, structured, highly extractable content pieces. These target featured snippets in Google and direct citations in AI answers:

- "10 Materials That Age Beautifully in Furniture" (listicle with images)
- "Furniture Care Guide: Wood, Leather, Linen, Stone" (reference content)
- "Interior Design Styles Explained: 12 Styles, What Defines Each" (taxonomy content)
- "Room-by-Room Furniture Dimensions Guide" (utility content)
- "Sustainable Furniture: What the Labels Actually Mean" (explainer)

**Format:** FAQ schema markup, tables, bullet points, scannable structure. 600-1,000 words. These are reference pages that stay on the site permanently and get updated quarterly.

**Publishing cadence:** 1 per month. Owner: Kody (production), Leah (review for accuracy).

---

### 2.2 — Content Structure Rules for AI Optimization

Every piece of content on patina.cloud should follow these structural rules:

1. **Lead with the answer.** First paragraph directly answers the headline question. No throat-clearing, no "In today's fast-paced world..." AI systems extract the first substantive paragraph.

2. **Self-contained sections.** Each H2 section should make sense on its own — AI systems extract individual sections, not whole articles. If a section references another section, include enough context to stand alone.

3. **Include verifiable specifics.** Numbers, material names, price ranges, dimensions, brand comparisons. "Oak is durable" is invisible to AI. "White oak rates 1,360 on the Janka hardness scale, making it 20% harder than walnut" gets cited.

4. **Author attribution on every page.** Full name, title, link to bio. AI systems weight content with clear authorship higher than anonymous content.

5. **Date published and date modified.** In the HTML meta tags, in the schema markup, and visible on the page. AI systems use freshness as a ranking signal.

6. **Short paragraphs.** 2-3 sentences maximum. Long text blocks are harder for AI to parse and less likely to be extracted.

7. **Internal linking with descriptive anchor text.** Not "click here" — use "our guide to choosing furniture that lasts" as anchor text. AI systems use anchor text to understand page relationships.

### 2.3 — Newsletter as Content Amplification

"The Designer's Eye" newsletter serves three purposes:

1. **Email list building** — captures visitors not ready for Founding Circle
2. **Content distribution** — drives traffic to journal posts, improving their search signals
3. **Engagement signal** — regular readership and sharing improves domain authority

**Structure per issue:**
- One featured journal post (link drives traffic)
- One "what Leah's working on this week" insight (exclusive to email, builds personal connection)
- One product or maker spotlight (future monetization pathway)
- One "what we're building" update (Founding Circle engagement)

**Cadence:** Biweekly (aligns with current site copy).

**Timeline:** Launch Month 1. Owner: Kody (production), Leah (insight contribution).

---

## Track 3: Entity & Reputation Building

### What This Solves
LLMs don't just crawl your website — they synthesize information about your brand from across the entire internet. To be cited, Patina needs to exist as a recognized entity in the places AI systems reference during retrieval.

### 3.1 — Platform Presence (Weeks 1-4)

Create and optimize profiles on every platform that AI systems index:

| Platform | Priority | Purpose |
|---|---|---|
| LinkedIn Company Page | Critical | Professional presence, founder thought leadership |
| Crunchbase | Critical | Startup entity data — AI systems index this heavily |
| Product Hunt | High | Tech/product discovery — launch when app is ready |
| Google Business Profile | High | Local entity + map presence for "Madison, WI" queries |
| AngelList/Wellfound | Medium | Startup ecosystem visibility |
| Pinterest Business | Medium | Visual discovery — furniture is inherently Pinterest-native |
| Instagram Business | Medium | Portfolio + community (Leah's design work) |
| Twitter/X | Medium | Founder thought leadership, industry commentary |

**Key principle:** Every profile must have consistent NAP (Name, Address, Phone), consistent description language, and cross-links to patina.cloud and middlewest.studio.

### 3.2 — Middlewest Studio Cross-Linking

Middlewest Studio's website should prominently reference Patina:
- "Technology" or "Innovation" page describing the Patina platform
- Leah's bio should mention her role as Patina co-founder
- Link exchange between middlewest.studio and patina.cloud
- Both sites should use `sameAs` schema to connect the entities

This cross-referencing builds the entity graph that LLMs use to understand relationships between organizations and people.

### 3.3 — Genuine Community Participation

Reddit, design forums, and industry communities are high-signal sources for LLMs. But the participation must be genuine — not promotional.

**Where to participate:**
- r/InteriorDesign — Leah answering design questions from her professional perspective
- r/furniture — material quality discussions, purchasing advice
- r/HomeImprovement — room layout and furniture selection guidance
- r/startups — building-in-public updates (Kody)
- Houzz forums — designer community engagement

**Rules:**
- Never mention Patina in the first 20+ contributions. Build reputation first.
- Answer questions thoroughly with real expertise
- Only reference Patina when it's genuinely relevant and helpful
- Use consistent usernames that link to identifiable profiles

**Timeline:** Begin Month 1, minimum 2-3 contributions per week. Owner: Both founders.

### 3.4 — Press, Podcasts, and Guest Content

External mentions on trusted sites are the highest-signal input for AI citation. Target:

**Design & home publications:**
- Apartment Therapy, Architectural Digest (digital), Dwell, Domino, Design Milk
- Pitch angle: "A designer and technologist building the anti-algorithm furniture platform"

**Tech & startup publications:**
- TechCrunch (at app launch), Built In Wisconsin, Midwest startup press
- Pitch angle: "Madison couple building designer-taught AI for furniture discovery"

**Design podcasts:**
- The Chaise Lounge (interior design business)
- Clever Podcast (design + architecture)
- Business of Home Podcast
- Pitch angle: Leah on "what technology gets wrong about design" — positions her as thought leader

**Guest posts on high-authority sites:**
- Write for Medium publications (Interior Design, Technology)
- Contribute to design trade publications (Interior Design Magazine, Contract)
- Write for startup/product publications about the build process

Each external piece should include Patina in the author bio and ideally link to patina.cloud.

**Timeline:** Begin outreach Month 2. Target 1-2 external placements per month. Owner: Kody (outreach), Leah (expertise/interviews).

### 3.5 — Review & Mention Seeding

When the app launches, actively solicit reviews on:
- App Store (iOS)
- Google Business Profile
- Trustpilot
- G2 (if positioning as a design tool)

AI systems weight review platforms heavily when making recommendations. Early reviews from Founding Circle members create the initial signal.

---

## Track 4: App Store Optimization (ASO)

### What This Solves
App Store search is its own ecosystem. When the iOS app launches, it needs to be discoverable for the queries that matter.

### 4.1 — App Store Listing (Pre-Launch Preparation)

**App Name:** Patina — Where Time Adds Value

**Subtitle (30 char):** Furniture worth coming home to

**Keywords (100 char):**
```
furniture,interior design,AR,room scan,home decor,style,designer,handcrafted,makers,room planner
```

**Description:** (Use the approved copy from this session — leads with value, three beats, designer handoff as the dangle)

**Category:** Lifestyle (primary), Shopping (secondary)

**Screenshots:** 6 screenshots showing the actual app experience:
1. Room scanning in action
2. Style questions surfacing during scan
3. Recommendation results with designer notes
4. Product detail with maker story
5. Saved collection / evolving recommendations
6. Designer handoff screen

**App Preview Video:** 15-30 second video showing the scan → discover → save flow. No voiceover — just the app with subtle music. End with the Strata Mark and "Where Time Adds Value."

### 4.2 — ASO Keyword Strategy

Target keywords by intent tier:

**High intent (direct competition):**
- furniture app, furniture shopping app, room design app
- interior design app, home design app
- AR furniture, room scanner

**Discovery intent (broader reach):**
- room planner, room designer, home decor
- furniture ideas, room inspiration
- style quiz, design style

**Unique positioning (own-able):**
- designer curated furniture, designer recommended
- handcrafted furniture app, maker furniture
- room scanning furniture

Monitor keyword rankings weekly using App Store Connect analytics + ASO tools (Sensor Tower or AppFollow).

### 4.3 — Launch Strategy

**Pre-launch:**
- TestFlight beta with Founding Circle members (generates early engagement)
- Collect feedback and iterate before public launch
- Prepare launch-day App Store assets

**Launch day:**
- Coordinate with press outreach (Track 3.4)
- Product Hunt launch
- Email blast to newsletter list + Founding Circle
- Social media announcement across all platforms
- Encourage Founding Circle members to leave Day 1 reviews

**Post-launch:**
- Respond to every App Store review within 24 hours
- Update "What's New" with each release (search signal)
- A/B test screenshots quarterly

---

## Track 5: Measurement & Iteration

### 5.1 — Search & AI Visibility Metrics

Track monthly:

| Metric | Tool | Target (6 months) |
|---|---|---|
| Organic search impressions | Google Search Console | 10K/month |
| Organic click-through rate | Google Search Console | >3% |
| Domain authority | Ahrefs/Semrush | 25+ |
| AI brand mentions (ChatGPT) | Manual testing + Otterly.AI | Appear for "furniture app" and "designer furniture platform" queries |
| AI brand mentions (Perplexity) | Manual testing | Cited in furniture discovery queries |
| AI Overview appearances | Google Search Console | Appear for 3+ target queries |
| Journal post organic traffic | PostHog/Analytics | 500 visits/month by Month 6 |
| Backlinks from external content | Ahrefs | 20+ referring domains |

### 5.2 — AI Citation Testing Protocol

Monthly, run these queries through ChatGPT, Perplexity, Claude, and Google AI Overviews:

1. "What are the best furniture apps in 2026?"
2. "Furniture apps with room scanning"
3. "Designer-curated furniture platforms"
4. "Apps that use AR for furniture"
5. "Interior design apps that connect you with designers"
6. "Alternatives to Havenly / Modsy / Wayfair"
7. "How to find furniture that fits my room"
8. "Best furniture discovery apps"

Document whether Patina is mentioned, cited, or linked. Track changes month over month. This is your leading indicator — you'll see AI visibility before you see meaningful search traffic.

### 5.3 — Content Performance

Track per journal post:
- Organic impressions and clicks (Search Console)
- Time on page (PostHog)
- Newsletter referral traffic
- Social shares
- AI citation (does this post get cited in AI answers to related queries?)

Kill underperforming content formats by Month 4. Double down on what gets cited.

---

## Implementation Timeline

### Month 1: Foundation

| Week | Deliverable | Owner |
|---|---|---|
| 1 | Deploy robots.txt, llms.txt, sitemap.xml | Kody |
| 1 | Implement Organization + WebApplication schema on homepage | Kody |
| 2 | Semantic HTML audit and upgrade | Kody |
| 2 | Create LinkedIn, Crunchbase, Google Business profiles | Kody |
| 2 | Launch newsletter "The Designer's Eye" | Both |
| 3 | Publish first Tier 1 article (Leah's expertise) | Leah + Kody |
| 3 | Begin Reddit/forum participation | Both |
| 4 | Publish first Tier 2 article (behind-the-build) | Kody |
| 4 | Cross-link Middlewest Studio ↔ Patina | Kody |

### Month 2: Content Engine

| Week | Deliverable | Owner |
|---|---|---|
| 5-6 | Publish 2 more Tier 1 articles | Both |
| 6 | Schema markup on journal posts (Article schema) | Kody |
| 7 | First Tier 3 reference content piece | Kody |
| 7 | Begin press/podcast outreach | Kody |
| 8 | Publish first behind-the-build narrative | Kody |
| 8 | Pinterest Business setup + first 20 pins | Kody |

### Month 3: Amplification

| Week | Deliverable | Owner |
|---|---|---|
| 9-10 | 2 Tier 1 articles + 1 Tier 3 reference piece | Both |
| 10 | First external press placement or podcast appearance | Both |
| 11 | First AI citation test — baseline measurement | Kody |
| 12 | Content performance review — kill/double-down decisions | Both |

### Months 4-6: Scale & App Launch

- Maintain 4 articles/month cadence (2 Tier 1, 1 Tier 2, 1 Tier 3)
- Secure 2+ external press/podcast placements per month
- Prepare App Store listing and assets
- Product Hunt launch coordination
- Post-launch review generation campaign
- Monthly AI citation testing and reporting

---

## Budget Considerations

### Tools (Monthly)

| Tool | Cost | Purpose |
|---|---|---|
| Google Search Console | Free | Search performance tracking |
| Bing Webmaster Tools | Free | Secondary search + AI index |
| PostHog (self-hosted) | Free | Analytics (already in stack) |
| Ahrefs Lite or Semrush | ~$99/mo | Keyword tracking, backlink monitoring, competitor analysis |
| Otterly.AI or Profound | ~$50-100/mo | AI citation tracking |
| Sensor Tower (ASO) | ~$79/mo | App Store keyword tracking (at launch) |
| Schema validation tools | Free | Google Rich Results Test, Schema Markup Validator |

**Total tools budget: ~$230-280/month**

### Content Production

With AI-assisted writing (Claude for drafts, founders for expertise and review), content production cost is primarily time:

- Tier 1 article: ~3-4 hours (1 hour interview/outline, 1-2 hours draft, 1 hour review/edit)
- Tier 2 narrative: ~2-3 hours (founder writes with AI assist)
- Tier 3 reference: ~2 hours (structured, AI-drafted, expert-reviewed)
- Newsletter: ~1.5 hours biweekly

**Total content time: ~15-20 hours/month across both founders**

### External (Optional)

- Professional photography for journal + homepage: $500-1,500 one-time
- Freelance editor for journal quality assurance: $200-400/month
- PR agency support for press outreach: $1,500-3,000/month (defer until Month 3-4)

---

## What Success Looks Like

### 3-Month Checkpoint
- 10+ journal articles published with schema markup
- patina.cloud appearing in Google Search Console for 50+ queries
- 3+ platform profiles live and cross-linked
- Baseline AI citation test completed
- Newsletter at 200+ subscribers
- First external press or podcast placement secured

### 6-Month Checkpoint
- 25+ journal articles published
- Patina mentioned in AI responses for at least 2 target queries
- 500+ organic visits/month to journal content
- Domain authority at 20+
- 10+ referring domains from external content
- Newsletter at 500+ subscribers
- App Store listing live and optimized

### 12-Month Checkpoint
- 50+ journal articles — patina.cloud is a genuine content authority in designer furniture
- Patina consistently cited in AI responses for furniture discovery queries
- 2,000+ organic visits/month
- Domain authority at 30+
- 25+ referring domains
- Leah recognized as a quotable expert in design/furniture space
- App Store rating at 4.5+ with 100+ reviews

---

## The Competitive Moat

Most furniture brands will approach AI optimization by stuffing keywords and publishing generic content at volume. Patina's advantage is structural:

1. **Leah's expertise is irreplicable.** A working designer's daily sourcing decisions, client conversations, and material knowledge create content no AI-generated article can match. LLMs reward genuine expertise.

2. **The build story is unique.** "Designer and technologist build the anti-algorithm furniture platform from Madison, Wisconsin" is a narrative that press, podcasts, and AI systems find compelling. Nobody else has this story.

3. **The content is the product.** Journal articles about how designers choose furniture aren't just marketing — they're demonstrations of the Aesthete Engine's methodology. Every article proves the thesis.

4. **Early authority compounds.** The brands that establish AI citation patterns in 2026 build compounding advantage. LLMs reference sources they've referenced before. First-mover advantage in AI visibility is real and durable.

The window is open. The content is in your heads. The infrastructure is a two-week sprint. Everything after that is consistency.

---

*This plan should be reviewed and updated quarterly. AI search optimization is evolving rapidly — what works in April 2026 may need adjustment by fall. The fundamentals (expertise, structure, authority) are durable. The tactics may shift.*
