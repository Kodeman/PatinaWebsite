# Patina Homepage — Design & Implementation Spec

**Document:** Homepage Redesign Implementation Guide  
**Version:** 1.0  
**Date:** April 2026  
**For:** Claude Code implementation  
**Reference mockup:** `patina-homepage-elevated.html`  

---

## 1. Overview

Rebuild the patina.cloud homepage as a 6-section, single-scroll page with cinematic scroll interactions, typography-forward design, and an app-first narrative arc. The page has one conversion goal: Founding Circle signup.

### Narrative Arc

1. **Hero** — Brand statement + visual pull + primary CTA
2. **The App** — What the app does for you (sticky scroll steps)
3. **The Handoff** — The designer dangle (when you're ready for more)
4. **Behind the Scenes** — Who powers the recommendations
5. **Newsletter** — Lightweight secondary conversion
6. **Close** — Mirror the opening, final CTA

### Design Philosophy

- Typography does the work. Type weight replaces containers.
- Whitespace is architecture. Charcoal/off-white alternation creates visual rooms.
- The Strata Mark (three horizontal lines of decreasing width) is punctuation, not decoration.
- Images are earned — only 3 on the page, each serving a specific purpose.
- Interactions are subtle and purposeful. Nothing bounces, nothing spins.

---

## 2. Global Styles

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Headlines | Playfair Display | 400, 500, 600, 700 (+ italic) | All section headlines, hero title, pull quotes |
| Body | Inter | 300, 400, 500, 600 | Body text, descriptions, buttons, nav links |
| Mono / Labels | DM Mono | 300, 400, 500 | Section labels, badges, captions, eyebrows |

Load via Google Fonts. All three families are required.

### Color Palette

```css
--off-white: #EDE9E4;    /* Primary background */
--warm-white: #F7F5F2;   /* Subtle background variation */
--pearl: #E5E2DD;        /* Borders, dividers */
--clay: #A3927C;         /* Accent, emphasis text, Strata Mark */
--clay-light: #B8A999;   /* Secondary text on dark backgrounds */
--mocha: #655B52;        /* Body text, muted elements */
--charcoal: #3F3B37;     /* Primary text, dark backgrounds */
--charcoal-deep: #332F2B; /* Footer, deeper darks */
--ink: #1A1816;          /* Deepest dark (close section, overlays) */
--sage: #8B9E8B;         /* Accent (unused on homepage, reserved) */
--terracotta: #C4745A;   /* Accent (unused on homepage, reserved) */
--golden: #C4A265;       /* Gradient accent in hero/handoff */
```

### Easing Curves

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);   /* Primary animation curve */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);   /* Button/magnetic hover */
```

All animations use these two curves. No `ease-in-out`, no `linear`, no default `ease`.

### Film Grain Overlay

A fixed SVG noise texture covers the entire page at `opacity: 0.025`. Applied via `body::after` with `position: fixed; inset: 0; z-index: 9999; pointer-events: none`. This adds analog warmth. The SVG uses `feTurbulence` with `baseFrequency="0.85"` and `numOctaves="4"`.

### The Strata Mark

The brand element: three horizontal lines of decreasing width.

```
Line 1: width 100%
Line 2: width 70%
Line 3: width 40%
```

Each line: `height: 2px`, `border-radius: 1px`, `background: currentColor`. Container gap: `6px`. Container width varies by context (56px–80px).

**Animation:** Each line animates from `scaleX(0)` to `scaleX(1)` with `transform-origin: left`. Staggered delays: line 1 at 0s, line 2 at 0.12s, line 3 at 0.24s. Triggered on scroll intersection.

---

## 3. Global Interactions

### Scroll Reveal System

All elements with class `.reveal` animate on viewport intersection:
- **Initial state:** `opacity: 0; transform: translateY(30px)`
- **Visible state:** `opacity: 1; transform: translateY(0)`
- **Duration:** `1s` with `--ease-out-expo`
- **Intersection Observer config:** `threshold: 0.08`, `rootMargin: '0px 0px -60px 0px'`

Stagger classes `.d1` through `.d6` add `transition-delay` in 0.1s increments.

### Text Clip Reveal

For dramatic headlines (hero title only). Structure:

```html
<span class="text-reveal reveal d1">
  <span class="text-reveal-inner">Where Time</span>
</span>
```

Outer span: `overflow: hidden`. Inner span: initial `transform: translateY(105%)`, animates to `translateY(0)` on `.visible`. Duration: `1.1s` with `--ease-out-expo`.

### Magnetic Buttons

All primary CTAs use class `.btn-magnetic`. On `mousemove`, the button translates toward the cursor at 15% of cursor offset from button center:

```javascript
const x = e.clientX - rect.left - rect.width / 2;
const y = e.clientY - rect.top - rect.height / 2;
btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
```

On `mouseleave`, resets to `translate(0, 0)` with `--ease-out-quart` transition.

Button variants:
- `.btn-dark`: `background: var(--charcoal); color: var(--off-white)` → hover: `var(--charcoal-deep)`
- `.btn-outline`: `border: 1px solid var(--clay); background: transparent` → hover: fills `var(--charcoal)` with white text
- `.btn-white`: `background: var(--off-white); color: var(--charcoal)` → hover: `var(--pearl)`

All buttons: `padding: 18px 40px`, `font-size: 14px`, `font-weight: 500`, `letter-spacing: 0.03em`.

---

## 4. Navigation

**Position:** Fixed, full width, `z-index: 100`.

### Default State (over hero)
- `padding: 24px 0`
- `mix-blend-mode: difference` — this makes text white over the dark hero image without explicitly setting color on dark backgrounds
- Logo: Playfair Display, 18px, weight 500, `letter-spacing: 0.1em`, uppercase
- Links: Inter 12px, weight 400, `opacity: 0.7`, hover → `opacity: 1`
- CTA button: "Founding Circle", `background: var(--off-white); color: var(--charcoal)`, padding `8px 20px`

### Scrolled State (triggers at `scrollY > 80`)
- `mix-blend-mode: normal`
- `background: rgba(237,233,228,0.9)`
- `backdrop-filter: blur(24px)`
- `padding: 16px 0`
- `border-bottom: 1px solid rgba(163,146,124,0.08)`
- Logo color: `var(--charcoal)`
- Link color: `var(--mocha)`
- CTA inverts: `background: var(--charcoal); color: var(--off-white)`

### Nav Links

```
Our Story     → /about
Journal       → /journal
For Designers → /designers
For Makers    → /makers/apply
[Founding Circle] → /founding  (CTA button)
```

### Mobile (≤900px)
Hide all links except the CTA button. Logo + CTA only.

---

## 5. Section 1 — Hero

### Layout
Full viewport height. The hero image fills the entire section as a background. Text content sits on top with gradient overlay providing contrast.

### Background Image
- **Source:** Full-bleed lifestyle interior photo (currently Unsplash, will be replaced with commissioned photography)
- **Sizing:** `width: 100%; height: 100%; object-fit: cover`
- **Ken Burns effect:** Image loads at `transform: scale(1.08)`, then transitions to `scale(1.0)` over `8s linear` on page load. This creates a barely perceptible slow zoom that adds life.
- **Parallax:** On scroll, the image translates at 25% of scroll speed: `translateY(${scrollY * 0.25}px)`. Only active while hero is in view (`scrollY < viewportHeight * 1.5`).

### Gradient Overlay
Two layered gradients over the image:
```css
background:
  linear-gradient(135deg, rgba(26,24,22,0.82) 0%, rgba(26,24,22,0.4) 50%, rgba(26,24,22,0.2) 100%),
  linear-gradient(0deg, rgba(26,24,22,0.5) 0%, transparent 40%);
```
The diagonal gradient creates heavy coverage on the left (where text sits) fading to transparent on the right (where image shows through). The bottom gradient ensures badge text is readable.

### Content Stack (left-aligned, vertically centered)

1. **Strata Mark** — 56px wide, `color: var(--off-white)`, `opacity: 0.6`, `margin-bottom: 48px`. Draws itself on load.

2. **Title** — Two lines, text-clip reveal animation:
   - Line 1: "Where Time" — Playfair Display, `clamp(56px, 9vw, 120px)`, weight 400, `color: var(--off-white)`, `letter-spacing: -0.03em`, `line-height: 0.95`
   - Line 2: "Adds Value" — Same size, italic, with gradient text fill: `linear-gradient(135deg, var(--clay-light), var(--golden))` applied via `-webkit-background-clip: text`
   - Reveal delay: line 1 at `.d1`, line 2 at `.d2`

3. **Description** — `clamp(15px, 1.6vw, 18px)`, weight 300, `color: var(--off-white)`, `opacity: 0.75`, `line-height: 1.8`, `max-width: 480px`, `margin-bottom: 44px`. Reveal at `.d3`.
   
   Copy: *"Learn what works in your space. Find furniture you can trust. And when you're ready for more, a designer continues right where you left off."*

4. **CTA Button** — "Join the Founding Circle", `.btn-magnetic.btn-dark`. Reveal at `.d4`.

5. **CTA Subtext** — *"Be among the first 200 to shape what we're building."* Inter 12px, weight 300, `color: var(--off-white)`, `opacity: 0.5`, `margin-top: 14px`.

### Bottom Elements (positioned absolute)

**Left — Trust Badges:**
```
200 Founding Spots · 15 Founding Makers · 50 Founding Designers · Madison, WI
```
DM Mono, 10px, `color: var(--off-white)`, `opacity: 0.4`, `letter-spacing: 0.06em`. Positioned `bottom: clamp(32px, 5vh, 56px); left: clamp(24px, 5vw, 72px)`. Flex row, `gap: 24px`.

**Right — Scroll Indicator:**
Vertical text "SCROLL" (DM Mono, 9px, `writing-mode: vertical-rl`, `opacity: 0.4`) above a 1px × 48px line with a pulsing light bar animation:

```css
@keyframes scrollPulse {
  0% { top: -100%; }
  50% { top: 100%; }
  100% { top: 100%; }
}
```

The bar is a `::after` pseudo-element, `background: var(--clay)`, animating `2s ease-in-out infinite`. Hide on mobile (≤900px).

---

## 6. Section 2 — The App Experience

### Layout Structure
Two parts: an intro block (standard flow) and a sticky scroll block (pinned interaction).

**Background:** `var(--off-white)` (continues from hero transition)

### Part A — Intro Block

`padding-top: clamp(100px, 12vh, 160px)`, `padding-bottom: clamp(40px, 4vh, 60px)`.

Two-column grid: `grid-template-columns: 1fr 1fr`, `gap: 64px`, `align-items: end`.

**Left column:**
- Section label: "THE APP" — DM Mono, 11px, `letter-spacing: 0.25em`, uppercase, `color: var(--clay)`
- Headline: Playfair Display, `clamp(36px, 5vw, 60px)`, weight 400, `line-height: 1.1`, `letter-spacing: -0.02em`
  - Copy: *"Learn your space."* (line break) *"Find what belongs."* — "belongs." in italic `color: var(--clay)`

**Right column:**
- Intro paragraph: Inter, 16px, weight 300, `color: var(--mocha)`, `line-height: 1.85`, `max-width: 460px`
  - Copy: *"Patina helps you understand what works in your room — then puts the right furniture in front of you. Browse, purchase, and build a space you're proud of. And when a project calls for more, a designer picks up right where you left off."*

### Part B — Sticky Scroll Steps (Desktop)

**Container:** `height: 300vh` (creates scroll distance for 3 steps — 100vh per step).

**Sticky inner:** `position: sticky; top: 0; height: 100vh; display: flex; align-items: center`.

**Grid inside sticky:** `grid-template-columns: 1fr 1fr`, `gap: 80px`.

**Left column — Step Cards:**

Three step cards stacked absolutely in the same container. Only one visible at a time. Active card: `opacity: 1; transform: translateY(0)`. Inactive: `opacity: 0; transform: translateY(40px)`. Transition: `0.6s var(--ease-out-expo)`.

Each step card contains:
- **Step number:** Playfair Display, 80px, weight 700, `color: var(--clay)`, `opacity: 0.12`, `letter-spacing: -0.04em`
- **Title:** Playfair Display, `clamp(24px, 3vw, 32px)`, weight 500, `margin-bottom: 16px`
- **Body:** Inter, 15px, weight 300, `color: var(--mocha)`, `line-height: 1.8`, `max-width: 400px`

Step content:

| # | Title | Body |
|---|-------|------|
| 01 | Understand your space. | Walk your room with your phone. Patina captures dimensions, light, and architecture while style questions surface naturally — teaching you what works and why. |
| 02 | Find and purchase. | Not thousands of options. A focused selection of pieces that fit your room, your taste, and your life — each one vetted by professional designers. Buy directly from the app. |
| 03 | Go further, seamlessly. | Ready for a full room? A renovation? A designer can continue what you've started — with your room scan, style profile, and every saved piece already in hand. No starting over. |

**Progress dots:** Three dots below the step cards. Each dot: `width: 32px; height: 2px; background: var(--pearl)`. Active dot has a `::after` pseudo-element that scales from `scaleX(0)` to `scaleX(1)` in `var(--clay)`. Dots fill cumulatively (step 2 = dots 1+2 filled).

**Right column — Step Image:**

Single `<img>` element that cross-fades between three images as steps change. On transition: fade to `opacity: 0` + slight `scale(1.05)`, swap `src`, fade back to `opacity: 1` + `scale(1)`. 300ms fade-out, then swap and fade-in.

Image container: `height: 65vh; max-height: 600px; overflow: hidden`. Inner box-shadow: `inset 0 0 80px rgba(26,24,22,0.08)` for subtle edge vignette.

Three images (placeholder Unsplash — will be replaced):
- Step 1: Interior with natural light (scanning context)
- Step 2: Styled furniture vignette (shopping context)  
- Step 3: Designer workspace / collaboration (handoff context)

### Scroll Logic (JavaScript)

```javascript
const rect = stickyWrap.getBoundingClientRect();
const scrollable = stickyWrap.offsetHeight - window.innerHeight;
const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
const step = Math.min(2, Math.floor(progress * 3));
```

This divides the 300vh scroll distance into three equal zones. As the user scrolls through each zone, the corresponding step activates.

### Mobile Behavior (≤900px)

The sticky mechanic is disabled. All three step cards become visible, stacked vertically with `margin-bottom: 40px`. The progress dots are hidden. The image sits below the steps at `height: 50vh`. The container loses its `300vh` height and becomes auto-height.

---

## 7. Section 3 — The Handoff

### Purpose
This is "the dangle" — the moment the page reveals that Patina isn't just an app, it's a bridge to a professional designer. This section should feel like a door opening.

### Layout
**Background:** `var(--charcoal)`, **text:** `var(--off-white)`  
**Padding:** `clamp(100px, 14vh, 180px) 0`  
**Content:** centered, `max-width: 700px`

**Ambient light:** A `::before` pseudo-element with `radial-gradient(circle, rgba(163,146,124,0.06) 0%, transparent 70%)` positioned in the upper right (`top: -200px; right: -200px; width: 600px; height: 600px`). Subtle warmth.

### Content Stack (centered)

1. **Divider line** — `width: 48px; height: 1px; background: var(--clay); opacity: 0.3; margin: 0 auto 28px`

2. **Section label** — "WHEN YOU'RE READY" — DM Mono, 11px, centered, `color: var(--clay)`, `margin-bottom: 20px`

3. **Headline** — Playfair Display, `clamp(32px, 5vw, 56px)`, weight 400, `line-height: 1.1`, `letter-spacing: -0.02em`, centered
   - Copy: *"A designer who already knows"* (line break) *"what you love."*
   - "what you love." in italic with gradient text fill: `linear-gradient(135deg, var(--clay-light), var(--golden))` via `-webkit-background-clip: text` — same treatment as hero "Adds Value"

4. **Body** — Inter, 16px, weight 300, `color: var(--clay-light)`, `line-height: 1.85`, centered, `max-width: 540px; margin: 0 auto 40px`
   - Copy: *"Everything you build in Patina — your room scan, your style profile, every piece you've saved — transfers seamlessly to a professional designer. They don't start from scratch. They continue the conversation you've already started."*

5. **CTA** — "Learn about design services", `.btn-magnetic.btn-outline` with `color: var(--off-white); border-color: var(--clay)`. Centered.

6. **Note** — *"No re-explaining. No starting over."* — Inter, 13px, weight 300, italic, `color: var(--clay)`, `margin-top: 20px`

---

## 8. Section 4 — Behind the Scenes

### Purpose
Now that the viewer has seen the app and the designer handoff, this section answers "who's actually behind this?" Combines the maker/designer credibility with the Middlewest Studio founder story.

### Layout
**Background:** `var(--off-white)`  
**Padding:** `clamp(100px, 12vh, 160px) 0`

Two-column grid: `grid-template-columns: 1.1fr 1fr`, `gap: 80px`, `align-items: center`.

### Left Column — Image

A workshop/craftsman photograph. Container has `overflow: hidden`. Image scales to `1.03` on hover with `1.2s var(--ease-out-expo)` transition. Inner box-shadow vignette: `inset 0 0 80px rgba(26,24,22,0.06)`.

**Caption overlay:** Bottom-left, DM Mono 9px, `letter-spacing: 0.12em`, uppercase, `color: var(--off-white)`, `background: rgba(63,59,55,0.7)`, `padding: 5px 10px`, `backdrop-filter: blur(8px)`.
- Copy: "Middlewest Studio — Madison, WI"

### Right Column — Content

1. **Section label:** "BEHIND THE SCENES" — standard label style, `color: var(--clay)`

2. **Headline:** Playfair Display, `clamp(28px, 3.8vw, 40px)`, weight 400, `line-height: 1.2`
   - Copy: *"The people who make"* (line break) *"the recommendations real."* — "real." in italic `color: var(--clay)`

3. **Body paragraph 1:** Inter, 15px, weight 300, `color: var(--mocha)`, `line-height: 1.85`
   - Copy: *"Every recommendation in Patina carries the eye of working designers and makers — people who classify products, set quality standards, and build the intelligence that powers what you see. The app gets smarter because they keep showing up and doing the work."*

4. **Body paragraph 2:**
   - Copy: *"No sponsored placements. No pay-to-play. Every maker earned their place through craft, not budget."*

5. **Pull quote:** `border-left: 2px solid var(--clay)`, `padding: 20px 28px`, `margin-top: 32px`
   - Quote text: Playfair Display, 18px, italic, weight 400, `color: var(--charcoal)`, `line-height: 1.55`
   - Copy: *"I've sourced furniture for clients for years. The tools never matched how designers actually think. So we're building the one I wish existed."*

6. **Attribution:** DM Mono, 11px, `color: var(--clay)`, `letter-spacing: 0.04em`
   - Copy: "— Leah Kochaver, Co-Founder"

7. **Link:** "Meet the founders →" — Inter, 13px, weight 500, `color: var(--charcoal)`, `border-bottom: 1px solid var(--clay)`, hover → `border-color: var(--charcoal)`. Points to `/about`.

### Mobile (≤900px)
Single column. Image above content, `height: 300px`.

---

## 9. Section 5 — Newsletter

### Purpose
Lightweight secondary conversion. For visitors not ready for the Founding Circle but interested in staying connected.

### Layout
**Background:** `var(--off-white)` (continuation)

This is NOT a full section — it's a divider with utility. No vertical padding beyond `48px` top and bottom. Gradient divider lines above and below (not solid borders):

```css
background: linear-gradient(90deg, transparent, var(--pearl), transparent);
```

Width: 70%, centered. These replace hard borders with soft fades.

**Grid:** `grid-template-columns: 1fr auto`, `gap: 40px`, `align-items: center`, `max-width: 900px`.

### Left — Label
- Title: "THE DESIGNER'S EYE" — DM Mono, 12px, `letter-spacing: 0.12em`, uppercase
- Description: *"A biweekly letter about design decisions, product discoveries, and what we're building."* — Inter, 13px, weight 300, `color: var(--mocha)`

### Right — Form
Email input + submit button in a seamless row (no gap between them — input's right border is removed, button's left border provides the visual join):

- **Input:** Inter, 13px, `padding: 13px 18px`, `border: 1px solid var(--clay)`, `border-right: none`, `width: 240px`. Focus state: `border-color: var(--charcoal)`.
- **Button:** "Subscribe" — Inter, 12px, weight 500, `padding: 13px 24px`, `background: var(--charcoal)`, `color: var(--off-white)`, `border: 1px solid var(--charcoal)`. Hover: `var(--mocha)`.

### Mobile (≤900px)
Single column. Form takes full width, input becomes `flex: 1`.

---

## 10. Section 6 — Close

### Purpose
Mirror the hero's visual weight. One CTA, one statement, symmetry.

### Layout
**Background:** `var(--ink)` (#1A1816 — the darkest value in the palette)  
**Text:** `var(--off-white)`  
**Padding:** `clamp(120px, 18vh, 240px) 0`  
**Text-align:** center

**Ambient light:** Radial gradient from center-top: `rgba(163,146,124,0.06)` → transparent at 60%. Width 80%, centered.

### Content Stack (centered)

1. **Strata Mark** — 64px wide, `color: var(--off-white)`, `opacity: 0.5`, draws itself on scroll.

2. **Headline** — Playfair Display, `clamp(36px, 5.5vw, 64px)`, weight 400, italic, `letter-spacing: -0.02em`
   - Copy: *"Ready to help us build this?"*

3. **Body** — Inter, 16px, weight 300, `color: var(--clay-light)`, `max-width: 420px; margin: 0 auto`, `line-height: 1.75`
   - Copy: *"The best platforms are shaped by their earliest community. Join the Founding Circle and help define how furniture discovery should work."*

4. **CTA** — "Join the Founding Circle", `.btn-magnetic.btn-white`. Centered.

5. **URL** — "patina.cloud" — DM Mono, 11px, `color: var(--clay)`, `opacity: 0.5`, `letter-spacing: 0.08em`, `margin-top: 44px`

---

## 11. Footer

**Background:** `var(--charcoal-deep)` — continuous with the close section's dark treatment.  
**Border-top:** `1px solid rgba(163,146,124,0.06)`  
**Padding:** `56px 0 36px`

### Layout
Four-column grid: `1.8fr 1fr 1fr 1fr`, `gap: 48px`.

**Column 1 — Brand:**
- "Patina" — Playfair Display, 22px, weight 500, `color: var(--off-white)`
- "Where Time Adds Value" — Inter, 13px, weight 300, italic, `color: var(--clay)`, `opacity: 0.7`

**Column 2 — Explore:**
Links: Your Room (`/furniture`), Makers (`/makers`), The App (`/app`), Journal (`/journal`)

**Column 3 — Work With Us:**
Links: Founding Circle (`/founding`), For Designers (`/designers`), For Makers (`/makers/apply`), Design Services (`/services`)

**Column 4 — Company:**
Links: Our Story (`/about`), Contact (`/contact`)

Column headers: DM Mono, 9px, `letter-spacing: 0.15em`, uppercase, `color: var(--clay)`, `opacity: 0.7`.  
Links: Inter, 13px, weight 300, `color: var(--clay-light)`, `opacity: 0.7`, hover → `color: var(--off-white); opacity: 1`.

### Bottom Bar
Flex row, space-between. Top border: `1px solid rgba(163,146,124,0.05)`, `padding-top: 28px`.

- Left: "© 2026 Patina. All rights reserved." — 11px, `color: var(--mocha)`, `opacity: 0.5`
- Right: Privacy (`/privacy`) · Terms (`/terms`) — 11px, same styling

### Mobile
- ≤900px: 2-column grid
- ≤600px: single column

---

## 12. Sanity CMS Mapping

The homepage content should be driven by the Sanity `homePage` document. Here's how the sections map to CMS fields:

### Existing fields to reuse:
- `heroCta` → Hero CTA label + href
- `heroSecondaryLine` → Hero description text
- `heroTrustLine` → Not used (badges are hardcoded for now)
- `engineHeader` / `engineBody` → Could map to App section intro
- `ctaPrimary` / `ctaHeader` → Close section CTA

### New fields needed:
The current schema doesn't cleanly support this layout. The implementation should:

1. Use existing CMS fields where they map naturally
2. Hardcode copy for sections where no clean CMS field exists
3. Add new fields as a follow-up task (not blocking launch)

The priority is getting the page live. CMS flexibility comes second.

---

## 13. Performance Notes

- **Images:** Use Next.js `<Image>` with `priority` on hero, `loading="lazy"` on all others. Serve WebP where supported.
- **Fonts:** Preconnect to Google Fonts. Use `display=swap`.
- **Animations:** All CSS-driven except the sticky scroll step logic and magnetic buttons (JS). Use `requestAnimationFrame` for scroll listeners. Throttle with `ticking` flags.
- **Intersection Observer:** Single observer instance for all `.reveal` elements. Disconnect after all elements have been revealed if desired.
- **Preload step images:** Create `new Image()` objects for all three step images on page load so cross-fades are instant.

---

## 14. Responsive Breakpoints

| Breakpoint | Key Changes |
|------------|-------------|
| ≤ 900px | Nav collapses to logo + CTA. Hero becomes single column (image above, content below). Sticky scroll disabled — steps stack. Two-column grids become single column. Scroll indicator hidden. |
| ≤ 600px | Hero title: 48px. Style adjustments for tighter spacing. Footer becomes single column. |

The page should feel complete at every breakpoint. Mobile is not a degraded experience — it's a focused one.

---

## 15. What's NOT on This Page

These sections existed on the previous homepage and have been intentionally removed. They are NOT deleted — they live on their respective subpages:

| Removed Section | New Home |
|----------------|----------|
| Interactive room hotspot demo | /app |
| Materials grid (oak, leather, linen) | /materials or /app |
| "How It Feels" 4-step walkthrough | /app |
| Aesthete Engine explainer (pillars) | /app |
| "Curious how it works?" bottom explainer | Deleted (redundant) |
| Designer services detail | /services |
| Founding Partners / Makers grid | /makers |
| Style discovery cards | /app or deferred |
| Multiple founder testimonials | Single Leah quote in Section 4 |
| "Why This Is Different" prose section | Absorbed into Section 4 copy |
| Value Proposition cards | Absorbed into Section 2 steps |

---

## 16. Implementation Checklist

```
[ ] Set up global styles (colors, typography, easing curves, grain overlay)
[ ] Build Strata Mark component with draw animation
[ ] Build scroll reveal system (IntersectionObserver + CSS)
[ ] Build magnetic button component
[ ] Build nav with scroll state toggle and blend mode
[ ] Build Section 1 — Hero (parallax, text-clip reveal, Ken Burns)
[ ] Build Section 2A — App intro block (two-column)
[ ] Build Section 2B — Sticky scroll steps (desktop) + stacked fallback (mobile)
[ ] Build Section 3 — Handoff (centered, gradient text)
[ ] Build Section 4 — Behind the Scenes (two-column with quote)
[ ] Build Section 5 — Newsletter (inline divider)
[ ] Build Section 6 — Close (Strata Mark, CTA)
[ ] Build Footer
[ ] Responsive testing (900px, 600px breakpoints)
[ ] Performance audit (image optimization, font loading, animation perf)
[ ] Accessibility pass (focus states, reduced-motion, semantic HTML)
[ ] Connect CMS fields where applicable
```

---

*Reference the HTML mockup file for exact visual output. This spec provides the structural and behavioral detail needed to implement it in the Next.js codebase. When in doubt, match the mockup pixel-for-pixel.*
