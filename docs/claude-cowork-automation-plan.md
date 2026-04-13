# Patina Growth Automation Plan
### What Claude Cowork Can Run For You

**Date:** April 12, 2026
**Scope:** Marketing, SEO, content, tracking, and traffic across patina.cloud

---

## How This Works

I've gone through both your Digital Visibility Plan and your Engagement Tracking Plan line by line, cross-referenced them against the Patina codebase as it stands today, and mapped every deliverable into one of three buckets:

1. **I can do this right now** — Code changes, content drafts, schema markup, audits. You say go, I execute.
2. **I can do most of this** — I draft, build, or configure; you review and push the button (publish, create an account, approve copy that needs Leah's eye).
3. **You have to do this** — Podcast appearances, Reddit participation, photography. I can prep you, but the human has to show up.

The good news: roughly 70% of both plans falls into buckets 1 and 2. Here's the full breakdown.

---

## Phase 1: Technical Foundation (Weeks 1–2)

These are code changes to your Next.js site. I can implement all of them directly in the codebase.

### 1.1 — robots.txt: Add AI Crawler Rules
**Status:** Your current `robots.ts` only has a generic `*` rule. The visibility plan calls for explicit GPTBot, PerplexityBot, ClaudeBot, etc.
**What I do:** Update `src/app/robots.ts` to add all AI crawler user-agents with explicit Allow rules.
**You do:** Nothing. This is a code change I can make right now.

### 1.2 — llms.txt File
**Status:** Doesn't exist yet.
**What I do:** Create `public/llms.txt` with the exact content from your visibility plan (Patina description, how it works, key differentiators, page directory). Also add a route or static file so Next.js serves it properly.
**You do:** Review the copy for accuracy.

### 1.3 — Enhanced Structured Data (JSON-LD)
**Status:** You already have Organization and Website JSON-LD in `src/lib/seo.ts` plus product JSON-LD generators. But the visibility plan calls for richer Organization schema (founders, foundingDate, foundingLocation, sameAs links), SoftwareApplication schema on `/app`, Service schema on `/services`, and Article schema for journal posts.
**What I do:** Enhance `seo.ts` with new JSON-LD generators. Update each page's layout to inject the right schema. Add Person schema for both founders on `/about`.
**You do:** Verify founder details (LinkedIn URLs, Middlewest Studio URL, founding date).

### 1.4 — Semantic HTML Audit
**Status:** Need to review each page for proper `<article>`, `<section>`, `<figure>`, `<aside>` usage, heading hierarchy, and descriptive alt text.
**What I do:** Run the audit across all page components, then make the fixes — swap generic divs for semantic elements, enforce single `<h1>` per page, upgrade alt text to be descriptive and keyword-aware.
**You do:** Nothing, unless you want to provide specific alt text for hero images.

### 1.5 — Sitemap Improvements
**Status:** `sitemap.ts` exists but uses hardcoded product slugs and `new Date()` for all lastmod dates. Missing `/journal` routes, `/founding`, `/makers/apply`, `/privacy`, `/terms`, `/contact`, `/careers`, `/materials`.
**What I do:** Add all missing routes. When Sanity is wired up, make lastmod dynamic. Add journal post routes.
**You do:** Nothing.

### 1.6 — PostHog Integration (Engagement Tracking Phase 1)
**Status:** Already substantially built! `src/lib/posthog.ts` has the client with consent-aware initialization, `src/lib/attribution.ts` has the full UTM capture with first/last touch, `src/lib/analytics.ts` has 15+ typed events. The `providers.tsx` likely wires it in.
**What I do:** Audit the current implementation against the engagement tracking plan. Fill any gaps (cookie consent banner component if missing, waitlist signup form, server action for Supabase waitlist insert). Make sure `posthog.identify()` fires on waitlist signup with the right properties.
**You do:** Sign up for PostHog Cloud and give me the API key to put in `.env.local`. Create the waitlist table in your self-hosted Supabase (I can give you the exact SQL from the plan to run).

---

## Phase 2: Content Engine (Ongoing — I Draft, You Review)

This is where I save you the most time. The visibility plan calls for ~15-20 hours/month of content work. I can cut that to ~5 hours of review time.

### 2.1 — Journal Articles (Tier 1: AI Citation Targets)
**Cadence:** 2 per month
**What I do:** For each article, I:
- Draft the full 1,200–2,000 word piece following the AI-optimized structure (H1 as question, direct answer first paragraph, self-contained H2 sections, specific numbers/materials/prices)
- Apply your brand voice (conversational, first-person, vulnerability + expertise, 70/30 actionable/inspirational)
- Include Article schema markup
- Format for Sanity CMS publishing
- Run SEO optimization (keyword placement, internal linking with descriptive anchor text, meta description)

**Your 10 priority topics are already defined.** I'll start with the first two:
1. "How to Tell If Furniture Will Last 20 Years"
2. "What Interior Designers Look For That You'd Never Notice"

**You do:** Leah provides 15-20 minutes of bullet points or voice notes per article (her expertise, specific examples, client stories). You both review the draft. I revise. You publish.

### 2.2 — Behind-the-Build Content (Tier 2: Brand Building)
**Cadence:** 1 per month
**What I do:** Draft the narrative post from your perspective (Kody) or both founders. These are longer, more personal — the building-in-public story.
**You do:** Share the raw experience/thinking. I shape it.

### 2.3 — Quick-Reference Content (Tier 3: Snippet Targets)
**Cadence:** 1 per month
**What I do:** These are highly structured — listicles, guides, comparison tables. I can produce these almost completely autonomously. FAQ schema markup included.
**You do:** Leah spot-checks for design accuracy.

### 2.4 — Newsletter: "The Designer's Eye"
**Cadence:** Biweekly
**What I do:** Draft each issue:
- Featured journal post summary + link
- "What Leah's working on" section (from her input)
- Product/maker spotlight
- "What we're building" update
**You do:** Leah gives a few sentences about her week. You review and send via your email platform.

### 2.5 — Content Calendar & Tracking
**What I do:** Create and maintain a content calendar tracking:
- Publication dates and status
- Target keywords per piece
- Which content tier (1/2/3)
- Performance after publication (once Search Console data flows in)
**You do:** Nothing — I maintain this.

---

## Phase 3: SEO & AI Visibility Monitoring (Scheduled)

### 3.1 — SEO Audit (Monthly)
**What I do:** Using the `marketing:seo-audit` skill, I can run monthly audits covering:
- Keyword rankings for your target terms
- On-page optimization checks across all pages
- Content gap analysis vs. competitors (Wayfair, Houzz, Havenly)
- Technical SEO health (broken links, missing meta, schema validation)
- Internal linking opportunities

**You do:** Review the report. Act on recommendations (most of which I can implement directly).

### 3.2 — AI Citation Testing (Monthly)
**What I do:** Run the 8 test queries from your visibility plan through web search:
1. "What are the best furniture apps in 2026?"
2. "Furniture apps with room scanning"
3. "Designer-curated furniture platforms"
4. etc.

Document whether Patina appears. Track month-over-month changes. This is your leading indicator.

**You do:** Nothing — I run this and report back.

### 3.3 — Competitive Intelligence
**What I do:** Using the `marketing:competitive-brief` skill, I can produce quarterly competitive analyses against Havenly, Modsy (legacy), Houzz, and any new entrants. Covers positioning gaps, messaging angles, content opportunities.
**You do:** Review and use for strategic decisions.

### 3.4 — Performance Reports
**What I do:** Using the `marketing:performance-report` skill, build weekly/monthly reports pulling together:
- Search Console data (once connected)
- PostHog engagement metrics
- Content performance (views, time on page, scroll depth)
- Waitlist conversion funnel
- AI citation tracking results

**You do:** Review. Celebrate wins. Adjust strategy.

---

## Phase 4: Campaign & Outreach Support

### 4.1 — Campaign Planning
**What I do:** Using the `marketing:campaign-plan` skill, I can build full campaign briefs for:
- Founding Circle launch
- App launch (Product Hunt, press, email blast)
- Newsletter launch
- Seasonal pushes
Each includes objectives, audience, messaging, channel strategy, content calendar, and success metrics.
**You do:** Approve and execute.

### 4.2 — Email Sequences
**What I do:** Using the `marketing:email-sequence` skill, design and draft:
- Waitlist welcome sequence (post-signup nurture)
- Founding Circle onboarding
- Re-engagement for inactive waitlist members
- App launch announcement sequence
Full copy, timing, branching logic included.
**You do:** Load into your email platform and activate.

### 4.3 — Press & Podcast Outreach
**What I do:** Draft pitch emails for each target publication and podcast from your visibility plan:
- Apartment Therapy, Dwell, Design Milk
- TechCrunch (at app launch), Built In Wisconsin
- The Chaise Lounge, Clever Podcast, Business of Home
Customize each pitch to the outlet's angle. Create a tracking spreadsheet.
**You do:** Send the emails. Do the interviews. This is the human-required part.

### 4.4 — Social Content
**What I do:** Draft social posts for each journal article, each milestone, each press hit. Tailored per platform (LinkedIn for thought leadership, Instagram for visual, Pinterest for discovery).
**You do:** Post them. Engage with responses.

---

## Phase 5: Entity & Reputation Building

### 5.1 — Platform Profile Copy
**What I do:** Write optimized descriptions for each platform profile:
- LinkedIn Company Page
- Crunchbase
- Google Business Profile
- Product Hunt (pre-launch page)
- AngelList/Wellfound
- Pinterest Business
Consistent NAP, consistent language, cross-links.
**You do:** Create the accounts and paste the copy.

### 5.2 — Middlewest Studio Cross-Linking
**What I do:** Draft the "Technology" page copy for middlewest.studio describing Patina. Update Leah's bio copy. Prepare sameAs schema for both sites.
**You do:** Publish on middlewest.studio.

### 5.3 — Reddit/Forum Prep
**What I do:** Research the top questions in r/InteriorDesign, r/furniture, r/HomeImprovement that align with your expertise. Draft response templates that demonstrate genuine knowledge without being promotional. Create a "contribution tracker" so you can build reputation before ever mentioning Patina.
**You do:** The actual posting. This has to be authentic, from your accounts, in your voice.

---

## Phase 6: App Store Optimization (Pre-Launch)

### 6.1 — App Store Listing Copy
**What I do:** Write and optimize the full App Store listing:
- App name with subtitle
- Description (keyword-optimized)
- Keyword field (100 characters)
- "What's New" template for each release
- Screenshot captions
**You do:** Submit through App Store Connect. Provide screenshots.

### 6.2 — Product Hunt Launch Prep
**What I do:** Draft the Product Hunt listing, maker comment, first-day ask, and response templates. Create a launch-day playbook.
**You do:** Execute on launch day.

---

## Scheduled Automation (What Runs Regularly)

I can set up scheduled tasks so these happen automatically:

| Frequency | Task | What Happens |
|---|---|---|
| Weekly | Content progress check | I review what's published, what's in draft, what's due |
| Biweekly | Newsletter draft | I draft the next "Designer's Eye" issue for review |
| Monthly | SEO audit | Full audit with recommendations |
| Monthly | AI citation test | Run all 8 queries, document results |
| Monthly | Performance report | Consolidated metrics across all channels |
| Monthly | Content calendar update | Next month's topics, keywords, assignments |
| Quarterly | Competitive brief | Full competitive landscape analysis |
| Quarterly | Content performance review | Kill underperformers, double down on what's working |

---

## What I Need From You to Start

1. **PostHog Cloud API key** — Sign up at app.posthog.com, create "Patina" project, give me the key
2. **Supabase access confirmation** — Is the self-hosted instance at api.patina.cloud ready? I'll give you the waitlist SQL to run
3. **Sanity project ID** — For wiring up journal/content publishing
4. **Leah's first article input** — Bullet points, voice notes, or a 15-minute brain dump on "How to Tell If Furniture Will Last 20 Years"
5. **Platform account credentials** — Not passwords, just confirmation when LinkedIn, Crunchbase, Google Business profiles are created so I can draft the copy
6. **Green light on priority** — What do you want me to tackle first?

---

## Recommended First Sprint (This Week)

If I were you, I'd have me knock out the technical foundation first — it's pure code, zero review burden on you, and it unlocks everything else:

1. Update robots.txt with AI crawler rules
2. Create llms.txt
3. Enhance JSON-LD structured data across all pages
4. Semantic HTML audit and fixes
5. Expand sitemap with all missing routes
6. Audit PostHog integration against the engagement plan
7. Build the waitlist signup form component
8. Build the cookie consent banner

That's probably a solid working session. While I do that, you could sign up for PostHog Cloud and create the platform profiles. Then we hit content production the following week.

---

---

## Additional Automated Workflows (Gaps Filled)

A few things from your plans that deserve their own callouts:

### Waitlist Funnel Health Checks
**What I do:** Monthly analysis of the waitlist conversion funnel using PostHog cohorts — where are people dropping off? Landing page → signup form → confirmation. Identify the weakest step and recommend fixes.
**Frequency:** Monthly, alongside the performance report.

### Forum Contribution Tracker
**What I do:** Maintain a log tracking your Reddit/forum participation — which subs, how many posts, what topics, dates. Flags when you're approaching the threshold where Patina mentions become appropriate (20+ genuine contributions). Prevents jumping the gun.
**You do:** Log your posts (or I can create a simple form for it).

### Content Kill/Double-Down Reviews
**What I do:** Starting Month 3, monthly (not quarterly) evaluation of every published piece: organic impressions, clicks, time on page, AI citation appearances. Pieces that underperform get a "fix or archive" recommendation. Pieces that overperform get "write more like this" analysis with specific topic suggestions.
**Frequency:** Monthly from Month 3 onward.

### AI Citation Baseline & Version History
**What I do:** Create a versioned tracking document for the monthly AI citation tests. Each month's results are timestamped and compared to the baseline and previous month. This becomes your proof that the strategy is working (or where it needs adjustment).

### App Store Review Response Templates
**What I do:** Pre-launch, create response templates for common review scenarios (5-star thank you, bug report acknowledgment, feature request, negative experience). Post-launch, I can draft responses within a 24-hour SLA — you approve and post.

### Domain Authority & Backlink Monitoring
**What I do:** Track referring domains monthly. When new guest posts, press hits, or external mentions go live, verify the backlink actually exists and passes authority. Flag link-building opportunities from competitor backlink analysis.
**Target:** 20+ referring domains by Month 6, 25+ DA.

---

*This plan maps to every deliverable in both your Digital Visibility Plan and Engagement Tracking Plan. Nothing falls through the cracks — it's just a question of sequencing and your bandwidth for the human-required pieces.*
