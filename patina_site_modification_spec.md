# patina.cloud — Site Modification Specification

**Version 1.0 · February 28, 2026**
**Prepared for:** Development Team
**Authored by:** Kody (Product), with strategy input from Lakeshore Strategy Group engagement deck

---

## Executive Summary

This spec defines every change needed on patina.cloud to shift from a passive "join the waitlist" posture to an active Founding Circle invitation model. The app is real and in development — founding members will be invited to test it. The site should reflect that energy honestly, without overpromising what isn't ready yet.

**Three governing rules for every change in this document:**

1. **Never promise what doesn't exist yet.** If a feature isn't live, frame it as "in development" or "coming to founding members first" — never as available now.
2. **The app page stays.** It explains real functionality that's being built. Founding members will test it. Keep it, but reframe the CTAs.
3. **Founding Circle replaces Waitlist everywhere.** Every instance of "waitlist" language site-wide gets replaced with Founding Circle language that conveys participation, not passive waiting.

---

## Table of Contents

1. [Global Changes (All Pages)](#1-global-changes-all-pages)
2. [Homepage (/)](#2-homepage)
3. [App Page (/app)](#3-app-page-app)
4. [New: Founding Page (/founding)](#4-new-founding-page-founding)
5. [Makers Page (/makers)](#5-makers-page-makers)
6. [Designers Page (/designers)](#6-designers-page-designers)
7. [About Page (/about)](#7-about-page-about)
8. [Furniture Page (/furniture)](#8-furniture-page-furniture)
9. [Footer (Global)](#9-footer-global)
10. [Email & Post-Signup Flow](#10-email--post-signup-flow)
11. [New Routes & Redirects](#11-new-routes--redirects)
12. [Analytics Events](#12-analytics-events)
13. [Content Guidelines for All Copy Changes](#13-content-guidelines-for-all-copy-changes)
14. [Priority & Sequencing](#14-priority--sequencing)

---

## 1. Global Changes (All Pages)

These changes apply across every page on the site.

### 1.1 Top Navigation Bar

**Current state:**

```
[PATINA]                    [Get the App]
[PATINA]  [Your Room] [Our Makers] [For Designers] [Our Story]
```

The mobile-collapsed nav has a "Get notified when the app launches. → Join Waitlist" banner at top.

**Required changes:**

| Element | Current | New | Notes |
|---------|---------|-----|-------|
| Right-aligned CTA button | "Get the App" → links to `/app` | "Become a Founding Member" → links to `/founding` | Primary conversion CTA, visible on every page. Style as filled button (Clay Beige background, Charcoal text) |
| Mobile banner text | "Get notified when the app launches." | "We're building something different. Come see how." | Remove the "Join Waitlist" button from the mobile banner. Replace with a single text link to `/founding` |
| Mobile banner CTA | "Join Waitlist" | "Join the Founding Circle →" | Links to `/founding` |
| Nav item: "Your Room" | Links to `/furniture` | No change to link. Rename to "Explore" if catalog is still placeholder/coming-soon content | If `/furniture` has real browsable content, keep "Your Room." If it's placeholder, rename to avoid dead-end feeling |
| `/app` nav link | Not in main nav (only in top-right button) | Add "The App" as a nav item between "Our Makers" and "For Designers" | This keeps app functionality visible and discoverable without making it the primary CTA |

**Updated nav structure:**

```
[PATINA]                              [Become a Founding Member]
[PATINA]  [Your Room] [Our Makers] [The App] [For Designers] [Our Story]
```

### 1.2 Global CTA Language Replacements

Search the entire codebase for these strings and replace them. This is a find-and-replace pass across all pages, components, and metadata.

| Find (exact or fuzzy) | Replace with | Context |
|----------------------|--------------|---------|
| "Join the Waitlist" | "Join the Founding Circle" | All instances, all pages |
| "Join Waitlist" | "Join the Founding Circle" | Button variants |
| "Get the App" | "Become a Founding Member" | Nav button only — NOT the `/app` page itself |
| "Get notified when the app launches" | "We're building something different. Come see how." | Mobile banner, any email capture context |
| "explore furniture on web" | "Meet the Makers" | Footer CTA, links to `/makers` |
| "Join the Waitlist" (footer bottom CTA) | "Join the Founding Circle" | Footer section |

### 1.3 Founding Circle Counter (New Global Component)

**Add a live counter component** that can be placed on any page. This shows the current number of Founding Circle signups.

**Component spec:**

- Display format: "Join [N] people helping shape Patina" where [N] is a real count from your signup database
- Typography: DM Sans / Inter, 14px, Clay Beige (#A3927C) text
- Placement: Directly beneath any primary CTA button where space allows (hero, founding page, footer)
- Update frequency: Real-time or cached with 5-minute refresh
- If count < 50: Hide the counter entirely (don't show a lonely number)
- If count ≥ 50: Show counter
- Fallback if data unavailable: Hide, don't show "0" or error state

---

## 2. Homepage (/)

The homepage does enormous emotional work already. The brand voice is excellent. The style selector, maker profiles, and "How It Feels" journey section are all strong. Changes here are surgical — rewiring CTAs and removing dead promises, not redesigning.

### 2.1 Hero Section

**Current:**

```
Where Time Adds Value
Discover furniture that grows more beautiful with every year.
See it in your space. Know the makers.
[Join the Waitlist]
Heritage makers since 2026    [Explore]
```

**New:**

```
Where Time Adds Value
Discover furniture that grows more beautiful with every year.
Real designers. Real makers. A room that's really yours.
[Become a Founding Member]
[N] people are already helping shape Patina    [Explore ↓]
```

| Element | Change | Detail |
|---------|--------|--------|
| Headline H1 | No change | "Where Time Adds Value" is perfect |
| Subhead line 1 | No change | "Discover furniture that grows more beautiful with every year." |
| Subhead line 2 | Replace | OLD: "See it in your space. Know the makers." → NEW: "Real designers. Real makers. A room that's really yours." |
| Primary CTA button | Replace | OLD: "Join the Waitlist" → NEW: "Become a Founding Member" — links to `/founding` |
| Below CTA | Add counter | Show Founding Circle counter component (see 1.3) |
| "Heritage makers since 2026" | Remove or replace | "since 2026" feels premature — you launched this year. Replace with: "Curated by real designers" or remove entirely |
| "Explore" scroll button | No change | Keep the down-scroll behavior |

### 2.2 "The Patina Difference" Section

**Current:** Three-column layout explaining Maker Pieces, Designer Picks, Every Detail.

**Change:** None. This section is strong and accurately describes the vision. Leave it.

### 2.3 Style Selector Section ("What world do you want to live in?")

**Current:** Six style cards (Warm Minimalist, Moody Traditional, Coastal Calm, Bold Eclectic, Modern Luxe, Organic Modern). "Select up to 3 that resonate with you" prompt at bottom. Selecting cards does nothing functional.

**Changes:**

| Element | Change | Detail |
|---------|--------|--------|
| Section header + subhead | No change | "What world do you want to live in?" is great |
| Style cards | No change to design or content | Cards are beautifully executed |
| "Select up to 3" prompt | Replace | NEW: "We're building recommendations around styles like these. Founding members help us decide what comes first." |
| Card selection behavior | Wire to localStorage or session state | If the user selects cards, store their choices. When they later sign up for the Founding Circle, pass these selections as metadata on the signup record. This gives you preference data from day one without promising personalized results. |
| Below cards | Add soft CTA | After the style cards, add: "Want to help shape which styles launch first? → Join the Founding Circle" — text link to `/founding`, not a button. Subtle, not pushy. |

**Technical note:** The card selection state should persist in the user's browser session. If they navigate to `/founding` and sign up, include the selected style names in the form submission as a hidden field (e.g., `preferred_styles: ["Warm Minimalist", "Organic Modern"]`). This data feeds future Aesthete Engine training.

### 2.4 "See the Complete Room" Interactive Section

**Current:** Interactive hotspot image showing a designer-curated room with Maker Pieces, Designer Picks, and Every Detail callouts. "Shop this Room" button at bottom.

**Changes:**

| Element | Change | Detail |
|---------|--------|--------|
| Interactive hotspots | No change | Great UX, keep it |
| "Shop this Room" button | Replace | If the room isn't shoppable yet, change to: "Rooms like this, curated for you — coming soon to founding members." No button, just a text statement. If the room IS linked to real products, keep the button. |
| "7 products in this room" counter | Keep if real | Only show this if it links to actual products. If placeholder, remove. |

### 2.5 Makers Section

**Current:** Three maker cards (Nordic Atelier, Woodward & Sons, Studio Piet) with details.

**Change:** None. These are well-executed. If these are placeholder/fictional makers, note this internally but don't change the section — it demonstrates the concept effectively.

### 2.6 Testimonial Inline (Rachel K.)

**Current:** Quote from "Rachel K., Minneapolis, MN" about product notes.

**Change:** No change to the testimonial. If this is a real testimonial, keep it. If it's illustrative, consider adding a subtle "(Beta tester)" or "(Early user)" attribution to maintain honesty.

### 2.7 Materials Section (Oak, Leather, Linen)

**Current:** Three material story cards.

**Change:** None. Beautiful content, accurate to brand.

### 2.8 "How It Feels" Journey Section

This is the longest and most important narrative section on the homepage. It describes the app experience in four stages.

**Current four stages and their testimonials:**

1. "First, you walk your room with us" — room scanning description
2. "Then, you see your whole room — not a single chair" — recommendation engine
3. "Watch the morning light catch the grain" — AR visualization
4. "Finally, you bring it all home" — purchase + designer handoff

**Changes:**

| Element | Change | Detail |
|---------|--------|--------|
| Section header "How it feels" | No change | |
| Subhead "Not a product tour..." | No change | |
| All four journey stages | No change to copy or images | This content accurately describes app functionality being built. It reads as aspirational product vision, which is appropriate. |
| Testimonials within section | Add framing | The inline testimonials from "Alex R., Denver" and "Sarah M., Chicago" currently read as if the app is live. Add a subtle label: either "(Beta)" after the name, or add a small italic line beneath the testimonial section: *"From early testing with founding members"* |
| "Know it works before it arrives" | No change | Strong copy |

**Important:** Do NOT remove this section or water it down. It accurately describes real functionality in development. Founding members will test it. The section serves as a product preview that earns signups.

### 2.9 Professional Help Section

**Current:** "When you're ready for more, so is your profile." Links to `/services`.

**Changes:**

| Element | Change | Detail |
|---------|--------|--------|
| Section copy | No change | This accurately describes the designer handoff vision |
| "Learn About Design Services" CTA | Evaluate | If `/services` has real content about Middlewest Studio's design services, keep it. If it's a placeholder, change to: "Design services coming soon" with no link |
| Bullet list (room dimensions, style profile, etc.) | No change | Accurately describes planned features |

### 2.10 "Loved by design enthusiasts" Testimonials

**Current:** Three testimonials (Marcus Webb, Sarah Chen, Rachel K.)

**Changes:**

| Element | Change | Detail |
|---------|--------|--------|
| Testimonials | Keep, with framing | If these are from real beta testers, add "(Beta tester)" or "(Early user)" to attributions. If illustrative, add a small section footnote: *"Feedback from early access testing"* |
| After testimonials | Add Founding Circle counter | Place the counter component here: "Join [N] people already shaping Patina" — provides social proof in a natural location |

### 2.11 "Designer-taught recommendations" Explainer

**Current:** Long-form section explaining the Aesthete Engine concept.

**Change:** None. This is well-written and accurately describes the system being built. Leave it entirely.

### 2.12 Final CTA Section ("Ready to discover what belongs?")

**Current:**

```
The best interiors aren't decorated—they're cultivated over time...
Let The Aesthete Engine show you where to start.
[Join the Waitlist]   [explore furniture on web]
```

**New:**

```
The best interiors aren't decorated—they're cultivated over time,
with pieces that grow more beautiful with age.
We're building that experience now — and founding members get first access.
[Join the Founding Circle]   [Meet the Makers]
```

| Element | Change | Detail |
|---------|--------|--------|
| Section header | No change | "Ready to discover what belongs?" |
| Body copy line 1 | No change | "The best interiors aren't decorated—they're cultivated over time, with pieces that grow more beautiful with age." |
| Body copy line 2 | Replace | OLD: "Let The Aesthete Engine show you where to start." → NEW: "We're building that experience now — and founding members get first access." |
| Primary CTA | Replace | OLD: "Join the Waitlist" → NEW: "Join the Founding Circle" — links to `/founding` |
| Secondary CTA | Replace | OLD: "explore furniture on web" → NEW: "Meet the Makers" — links to `/makers` |

---

## 3. App Page (/app)

**Strategy:** The app page stays. It explains real functionality being built. But its CTAs and framing need to shift from "get the app" (which doesn't exist yet for public download) to "this is what we're building — founding members test it first."

**Note:** I was unable to fetch `/app` directly during the audit. The following spec assumes a page that describes app features (room scanning, AR, style quiz, recommendations). Adjust element-by-element if the actual page structure differs.

### 3.1 Page Header / Hero

**Current (assumed):** Something like "Get the App" or "Download Patina" with app store links or a waitlist signup.

**New:**

```
The Patina App
See your room the way a designer would.
We're building an app that combines AR room scanning, designer-curated
recommendations, and the Aesthete Engine — our AI trained by real interior
designers. Founding members will be the first to test it.
[Become a Founding Member]
```

| Element | Change | Detail |
|---------|--------|--------|
| Page title | Change | OLD: "Get the App" (or similar) → NEW: "The Patina App" |
| Subhead | Add/replace | "See your room the way a designer would." |
| Body copy | Add/replace | 2-3 sentences describing what the app does and that it's in active development. Founding members test first. |
| Primary CTA | Replace | Any "Download" / "Get the App" / app store buttons → "Become a Founding Member" linking to `/founding` |
| App store badges | Remove | If Apple/Google Play badges are present, remove them. The app is not in stores yet. |

### 3.2 Feature Sections

**Keep all existing feature descriptions.** The app page should continue to explain:

- Room scanning with AR
- Style quiz / preference capture
- Designer-curated recommendations (Aesthete Engine)
- AR furniture placement and visualization
- Complete room compositions
- Designer handoff / professional services connection

**For each feature section, add a status indicator:**

Create a small, consistent component — a tag or badge — that appears in the corner or below the header of each feature block:

| Status | Badge Text | Style |
|--------|-----------|-------|
| In development | "In Development" | Clay Beige text, transparent background, subtle border |
| Coming to founding members | "Founding Members First" | Mocha background, Off-White text |
| Available at launch | "At Launch" | Charcoal background, Off-White text |

This maintains honesty while building excitement. Apply appropriate status to each feature based on actual development state. Kody to provide status per feature.

### 3.3 App Page Bottom CTA

**Replace any bottom-of-page "Join the Waitlist" or "Download" CTA with:**

```
Founding members get first access.
Help us test, shape, and refine the app before it launches.
[Join the Founding Circle]   [Back to Our Story]
```

### 3.4 Nav & Meta

| Element | Change |
|---------|--------|
| Page `<title>` | "The Patina App — Designer-Curated Rooms, AR Visualization" |
| `<meta description>` | "Patina combines AR room scanning with designer-curated furniture recommendations. Founding members get first access to test the app." |
| OG image | Keep existing or update to show app concept screens |
| Canonical URL | `/app` (no change) |

---

## 4. New: Founding Page (/founding)

**This is a new page.** It's the destination for all "Become a Founding Member" and "Join the Founding Circle" CTAs across the site. This is the single most important conversion page.

### 4.1 Page Structure

```
┌─────────────────────────────────────────────────────┐
│  HERO                                                │
│  "The Founding Circle"                               │
│  We're building a new kind of furniture platform...  │
│  [Signup Form]                                       │
│  [Counter: N people have joined]                     │
├─────────────────────────────────────────────────────┤
│  WHAT YOU GET                                        │
│  4 benefit cards                                     │
├─────────────────────────────────────────────────────┤
│  WHAT WE'RE BUILDING                                 │
│  Brief, honest description of Patina                 │
├─────────────────────────────────────────────────────┤
│  WHO WE ARE                                          │
│  Kody & Leah intro with photo                        │
├─────────────────────────────────────────────────────┤
│  BOTTOM CTA                                          │
│  Repeat signup form                                  │
└─────────────────────────────────────────────────────┘
```

### 4.2 Hero Section

```
The Founding Circle

We're building a furniture platform where real designers teach the AI,
real makers craft the pieces, and your room gets the attention it deserves.

We're not ready to launch yet — but we'd love your help getting there.

[Email input field]  [Join the Founding Circle →]

Join [N] people already shaping Patina
```

**Form spec:**
- Single email field + submit button
- If the user arrived from the style selector with stored preferences, include a hidden field: `preferred_styles`
- On submit: Add to Founding Circle list in your email platform (Mailchimp, Resend, ConvertKit, etc.)
- Success state: Replace form with "Welcome to the Founding Circle. Check your inbox." — trigger welcome email immediately
- Error state: "Something went wrong. Try again?" with retry button
- Duplicate email: "You're already in! Check your inbox for our latest update."

### 4.3 What You Get Section

**Four benefit cards in a 2×2 grid (desktop) or stacked (mobile):**

| Card | Icon | Title | Body |
|------|------|-------|------|
| 1 | ★ | Named Recognition | "Founding members get credited at launch. Your name on the thing you helped build." |
| 2 | ◈ | Behind the Curtain | "Exclusive updates from Kody & Leah as the catalog grows, makers sign on, and the AI learns. The real, unpolished building story." |
| 3 | ⟡ | Real Influence | "Monthly questions on what matters: which makers to partner with, which style categories to prioritize. Your input shapes the product." |
| 4 | ⌂ | First Access | "When the app launches, you're first through the door — and first to test it as we build. Your feedback makes it better for everyone." |

**Design:** White card backgrounds, subtle shadow, Charcoal titles (Cormorant Garamond / Playfair Display), Mocha body text (DM Sans / Inter). Consistent with existing site card styling.

### 4.4 What We're Building Section

A brief, honest section — no more than 3-4 short paragraphs:

```
What We're Building

Patina is a furniture platform that works the way a great designer thinks —
in complete rooms, not isolated products.

Our Aesthete Engine is an AI recommendation system taught by professional
interior designers. Not trained on click data or ad revenue — trained on
the instincts that make a room feel right.

We're curating a catalog of heritage makers and trusted brands, building
AR room visualization tools, and developing style profiles that actually
understand your taste.

It's not ready yet. But it's getting closer every week.
```

### 4.5 Who We Are Section

```
[Photo: Kody & Leah — real, warm, not corporate]

Kody & Leah

Leah runs Middlewest Studio, an interior design practice in [city].
Her clients trust her taste — and her taste is what teaches the
Aesthete Engine.

Kody builds the technology. His background is in enterprise software
(Starbucks Corporate, Microsoft-funded startups), but his heart is
in making tools that actually help real people make better decisions
about their homes.

Together, we're building what we wish existed: a way to get the benefit
of working with a great designer, whether or not you hire one.
```

**Design:** Side-by-side layout — photo on left, text on right. Use a real photo of Kody and Leah. If no photo is ready, use a warm placeholder with their names and "Photo coming soon."

### 4.6 Bottom CTA

Repeat the signup form from the hero section. Same behavior, same validation.

```
Ready to help us build this?

[Email input field]  [Join the Founding Circle →]
```

### 4.7 Page Meta

| Element | Value |
|---------|-------|
| `<title>` | "Join the Founding Circle — Patina" |
| `<meta description>` | "Be part of building a new kind of furniture platform. Founding Circle members get first access, real influence, and behind-the-scenes updates from the team." |
| OG title | "The Founding Circle — Patina" |
| OG description | "We're building something different. Come help us shape it." |
| OG image | Custom social share card (design TBD — Patina brand colors, "The Founding Circle" text, counter if possible) |
| Canonical URL | `https://patina.cloud/founding` |

---

## 5. Makers Page (/makers)

### 5.1 Changes

| Element | Change | Detail |
|---------|--------|--------|
| Any "Join the Waitlist" CTA | Replace | "Join the Founding Circle" → `/founding` |
| Any "Shop" or "Buy" buttons | Evaluate | If products aren't purchasable yet, change to "Coming soon to founding members" or remove |
| Maker Apply section (/makers/apply) | No change | Keep the maker application flow — this supports business development |

### 5.2 Addition

At the bottom of the makers page, after the last maker card, add:

```
Know a maker who belongs here?
We're building our founding catalog with makers who value craft over volume.
If you know someone, we'd love an introduction.
[Tell Us About a Maker →]  (links to /makers/apply or a contact form)
```

---

## 6. Designers Page (/designers)

### 6.1 Changes

| Element | Change | Detail |
|---------|--------|--------|
| Any "Join the Waitlist" CTA | Replace | "Join the Founding Circle" → `/founding` |
| Any references to the app being available | Reframe | "Founding members will be the first to test the app" |
| Designer portal / application CTAs | No change if functional | If there's a designer application form, keep it |

---

## 7. About Page (/about)

### 7.1 Changes

| Element | Change | Detail |
|---------|--------|--------|
| Any "Join the Waitlist" CTA | Replace | "Join the Founding Circle" → `/founding` |
| Middlewest Studio story | Ensure it's present | If not already on this page, add 1-2 paragraphs about Leah's design practice and how it inspired Patina |
| Bottom CTA | Replace | Whatever the current bottom CTA is → "Join the Founding Circle" |

---

## 8. Furniture Page (/furniture)

### 8.1 Assessment

If `/furniture` has real, browsable product content: keep it, update CTAs only.

If `/furniture` is placeholder or empty: add an honest interstitial:

```
We're curating the catalog now.

Every piece will be vetted by professional designers who think in
complete rooms — not just individual products. Heritage makers,
trusted brands, and materials that age beautifully.

Founding members help us decide what gets curated first.

[Join the Founding Circle →]   [Meet the Makers →]
```

### 8.2 CTA Changes

Replace all "Join the Waitlist" or "Shop" buttons that lead to dead ends with Founding Circle CTAs.

---

## 9. Footer (Global)

### 9.1 Current Footer Structure

```
[PATINA]  Where Time Adds Value

Explore              Work With Us          Company
- Your Room          - For Designers       - Our Story
- Makers             - For Makers          - Contact
- Materials          - Design Services     - Careers
- How It Works

© 2026 Patina. All rights reserved.
Privacy  Terms
```

### 9.2 Changes

| Element | Change | Detail |
|---------|--------|--------|
| Add "The App" link | Add to Explore column | Between "Makers" and "Materials" — links to `/app` |
| Add "Founding Circle" link | Add to top of Work With Us column | Links to `/founding` — first item in the column |
| "How It Works" link | Evaluate | If this is an anchor to the homepage journey section (`/#journey`), keep it. If it's a broken link, fix or remove. |
| Footer CTA area (if present above footer links) | Replace | If there's a pre-footer CTA block with "Join the Waitlist," replace with: "Join the Founding Circle" button + counter component |
| "Design Services" link | Evaluate | Keep if `/services` has content. Remove or grey out if placeholder. |
| "Careers" link | Evaluate | Keep if `/careers` has content. Remove if placeholder — a dead careers page hurts credibility. |
| "Contact" link | Keep | Ensure `/contact` works and has a real way to reach the team |

### 9.3 Updated Footer Structure

```
[PATINA]  Where Time Adds Value

Explore                Work With Us            Company
- Your Room            - Founding Circle ←NEW  - Our Story
- Our Makers           - For Designers         - Contact
- The App ←NEW         - For Makers
- Materials            - Design Services
- How It Works

© 2026 Patina. All rights reserved.
Privacy  Terms
```

---

## 10. Email & Post-Signup Flow

When someone joins the Founding Circle, they should receive a short welcome sequence. This can be manual or automated through any email platform. Keep it simple — three emails over four weeks.

### 10.1 Email 1: Welcome (Immediately after signup)

**Subject:** "Welcome to the build site."
**From:** Kody & Leah (personal name, not "Patina Team")
**Tone:** Warm, honest, personal

**Content outline:**
- Thank them for joining
- Brief origin story — how Leah's design practice inspired Patina
- What they can expect as founding members (updates, polls, first access)
- What you're working on right now (1-2 sentences, specific)
- Close: "We'll be in touch. Not often — but when we have something worth sharing."

**Technical:** If the user selected style preferences on the site, include a line: "By the way — we noticed you're drawn to [Warm Minimalist / Organic Modern / etc.]. Good taste. We'll keep that in mind."

### 10.2 Email 2: Meet the Makers (Week 2)

**Subject:** "Meet the first makers who said yes."
**Content:** Introduce 2-3 maker partners with real stories — their workshops, their craft, why they joined. Use content from the site's maker profiles. Include photos.

### 10.3 Email 3: First Poll (Week 4)

**Subject:** "Your first question: help us decide."
**Content:** One simple community question. Examples: "Which style world should we curate first?" or "What room do you want to design first — living room, bedroom, or dining room?"

**Implementation:** Can be a simple Typeform, Google Form, or embedded poll. Link in the email.

### 10.4 Ongoing

After the initial 3-email sequence, send updates as genuine milestones happen (new maker partnerships, app testing invitations, feature previews). No automated drip — real updates when there's something real to share.

---

## 11. New Routes & Redirects

| Route | Type | Destination |
|-------|------|-------------|
| `/founding` | New page | Founding Circle signup page (see Section 4) |
| `/waitlist` | 301 redirect | → `/founding` (in case any old links exist) |
| `/join` | 301 redirect | → `/founding` (convenience URL for marketing) |
| `/founding-circle` | 301 redirect | → `/founding` |

All existing routes (`/app`, `/makers`, `/designers`, `/about`, `/furniture`, `/services`, `/materials`, `/contact`, `/careers`, `/privacy`, `/terms`, `/makers/apply`) should remain functional. Audit each for broken states and either populate with content or add honest "coming soon" interstitials.

---

## 12. Analytics Events

Track these events to measure the engagement strategy's effectiveness.

### 12.1 New Events to Implement

| Event Name | Trigger | Properties |
|------------|---------|------------|
| `founding_circle_signup` | Form submission on `/founding` or any embedded form | `source` (page URL), `preferred_styles` (if captured), `referrer` |
| `founding_cta_click` | Click on any "Become a Founding Member" or "Join the Founding Circle" button | `source` (page URL), `element_location` (hero/nav/footer/inline) |
| `style_card_selected` | User selects a style card on homepage | `style_name`, `selection_count` (1st, 2nd, 3rd) |
| `style_cta_click` | User clicks the "help shape which styles launch first" link below style cards | `styles_selected` (array of selected style names) |
| `app_page_view` | User visits `/app` | `referrer`, `time_on_page` |
| `app_feature_status_view` | User views a feature section on `/app` | `feature_name`, `status` (in-development/founding-first/at-launch) |
| `email_welcome_open` | Welcome email opened | `email_number` (1/2/3) |
| `email_poll_click` | User clicks poll link in email 3 | `poll_id` |
| `maker_apply_click` | User clicks "Tell Us About a Maker" | `source` (page URL) |

### 12.2 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Founding Circle signup rate | 2× current waitlist conversion | `founding_circle_signup` / unique page views |
| Welcome email open rate | 50%+ | Email platform analytics |
| Email 3 open rate | 40%+ | If still opening by email 3, genuine engagement |
| Poll participation | 25% of founding members | Poll responses / total founding members |
| App page engagement | 60%+ scroll depth | Scroll tracking on `/app` |

---

## 13. Content Guidelines for All Copy Changes

Every copy change on the site should follow these rules:

### Voice

- **Warm, not corporate.** "Come build this with us" not "Subscribe for updates."
- **Honest, not hedging.** "We're not ready yet" is better than "Coming soon!" with no date.
- **Specific, not vague.** "Founding members test the app first" beats "Exclusive early access."
- **Inviting, not transactional.** "Join the Founding Circle" beats "Sign up for our newsletter."

### What to say about the app

- ✅ "We're building an app that..."
- ✅ "Founding members will be the first to test..."
- ✅ "In development now — here's what it does..."
- ❌ "Get the App" (implies it's available)
- ❌ "Download now" (it's not downloadable)
- ❌ "Coming soon!" (vague and overused)

### What to say about recommendations/AI

- ✅ "Our Aesthete Engine is an AI trained by real interior designers"
- ✅ "Designer-taught recommendations" (this is accurate and differentiating)
- ❌ "AI-powered" by itself (generic, undifferentiated)
- ❌ "Our algorithm optimizes..." (tech jargon, off-brand)

### Testimonials

- If from real beta testers/early users: attribute normally with "(Beta)" or "(Early user)"
- If illustrative/placeholder: add a section footnote: *"Feedback from early access testing"*
- Never present fictional testimonials as real customer reviews

---

## 14. Priority & Sequencing

### Sprint 1: Immediate (This Week) — ~1 Day of Work

These are copy changes and link updates. No new pages, no new infrastructure.

| Task | Estimated Time | Owner |
|------|---------------|-------|
| Global find-and-replace: all "Join the Waitlist" → "Join the Founding Circle" | 30 min | Dev |
| Nav bar: "Get the App" button → "Become a Founding Member" → `/founding` (temporary: link to homepage anchor until `/founding` is built) | 15 min | Dev |
| Add "The App" to main nav linking to `/app` | 15 min | Dev |
| Homepage hero: update subhead copy and CTA | 15 min | Dev |
| Homepage style selector: update bottom prompt text | 15 min | Dev |
| Homepage final CTA section: update copy and button text | 15 min | Dev |
| Footer: add Founding Circle and The App links | 15 min | Dev |
| Remove/replace "Heritage makers since 2026" line | 5 min | Dev |
| Audit all pages for remaining "waitlist" references | 30 min | Dev |

### Sprint 2: Founding Page (Week 2) — ~2-3 Days

| Task | Estimated Time | Owner |
|------|---------------|-------|
| Create `/founding` page with hero, form, benefits, story | 1-2 days | Dev + Kody (copy) |
| Email capture integration (connect form to email platform) | 2-3 hours | Dev |
| Founding Circle counter component | 2-3 hours | Dev |
| Place counter on homepage hero, testimonials section, and founding page | 30 min | Dev |
| Set up redirects: `/waitlist`, `/join`, `/founding-circle` → `/founding` | 15 min | Dev |
| Update all "Become a Founding Member" links to point to `/founding` | 30 min | Dev |
| Kody & Leah photo + bio for founding page | N/A | Kody |
| Write founding page copy (use Section 4 as draft) | 1-2 hours | Kody |

### Sprint 3: App Page Refresh + Email Sequence (Week 3) — ~2 Days

| Task | Estimated Time | Owner |
|------|---------------|-------|
| App page: reframe hero, remove app store badges, update CTAs | 2-3 hours | Dev |
| App page: add feature status badges | 2-3 hours | Dev + Kody (status per feature) |
| Write and configure welcome email sequence (3 emails) | 3-4 hours | Kody + Dev |
| Connect signup form to email sequence trigger | 1-2 hours | Dev |
| Set up analytics events (Section 12) | 2-3 hours | Dev |
| Style card selection → localStorage → form metadata | 2-3 hours | Dev |

### Sprint 4: Polish & Audit (Week 4) — ~1 Day

| Task | Estimated Time | Owner |
|------|---------------|-------|
| Full site link audit — every link on every page works or is intentionally removed | 2-3 hours | Dev |
| Testimonial attribution cleanup (add Beta/Early user framing) | 30 min | Dev |
| OG meta tags and social share cards for `/founding` and `/app` | 1-2 hours | Dev |
| Mobile responsive QA on all changed pages | 2-3 hours | Dev |
| Review dead pages (`/services`, `/careers`, `/materials`) — content or removal | 1 hour | Kody decision |
| First community poll created and ready for email 3 | 1 hour | Kody |

---

## Appendix: Current Site Link Inventory

Every link found on the current homepage, with disposition:

| Link | Destination | Status | Action |
|------|-------------|--------|--------|
| PATINA (logo) | `/` | Working | No change |
| Get the App | `/app` | Working | Rename to "Become a Founding Member" → `/founding` |
| Your Room | `/furniture` | Verify | Check if page has content |
| Our Makers | `/makers` | Verify | Check if page has content |
| For Designers | `/designers` | Verify | Check if page has content |
| Our Story | `/about` | Verify | Check if page has content |
| Join Waitlist (hero) | Form/anchor | Working | Replace with Founding Circle CTA |
| Shop this Room | Unknown | Verify | Remove if not functional |
| Learn About Design Services | `/services` | Verify | Keep if content exists, else remove |
| Your Room (footer) | `/furniture` | Verify | Keep |
| Makers (footer) | `/makers` | Verify | Keep |
| Materials (footer) | `/materials` | Verify | Check if page exists |
| How It Works (footer) | `/#journey` | Verify | Keep if anchor works |
| For Designers (footer) | `/designers` | Verify | Keep |
| For Makers (footer) | `/makers/apply` | Verify | Keep |
| Design Services (footer) | `/services` | Verify | Keep if content exists |
| Our Story (footer) | `/about` | Verify | Keep |
| Contact (footer) | `/contact` | Verify | Ensure functional |
| Careers (footer) | `/careers` | Verify | Remove if placeholder |
| Privacy (footer) | `/privacy` | Verify | Keep |
| Terms (footer) | `/terms` | Verify | Keep |
| Join the Waitlist (bottom CTA) | Form/anchor | Working | Replace with Founding Circle CTA |
| explore furniture on web | `/furniture` | Working | Replace with "Meet the Makers" → `/makers` |
