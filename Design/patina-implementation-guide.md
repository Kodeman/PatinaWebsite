# Patina Landing Page Implementation Guide
## "The Morning Light" Hero Design

**Version 1.0 | December 2024**
**For: Development Team, Photography Direction, Marketing Copy**

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Hero Section Technical Specifications](#2-hero-section-technical-specifications)
3. [Below-the-Fold Page Structure](#3-below-the-fold-page-structure)
4. [Photography Guidelines](#4-photography-guidelines)
5. [Copy Worksheet](#5-copy-worksheet)
6. [Design Tokens & CSS Variables](#6-design-tokens--css-variables)
7. [Accessibility Requirements](#7-accessibility-requirements)
8. [Performance Targets](#8-performance-targets)

---

## 1. Executive Summary

### Design Vision

"The Morning Light" hero transforms the Patina landing page into an immersive brand experience. The hero section owns 100% of the viewport on initial load, featuring a full-bleed lifestyle photograph with refined typographic overlay and a single, focused call-to-action.

### Core Principles

1. **Single CTA Focus** — "Get the App" is the only action above the fold
2. **Full-Viewport Immersion** — Hero fills entire screen, no partial views
3. **Emotional Before Functional** — Lead with feeling, follow with features
4. **Progressive Disclosure** — Navigation reveals on scroll
5. **Brand-First Experience** — Tagline as headline, image tells the story

### Key Deliverables

| Deliverable | Owner | Priority |
|-------------|-------|----------|
| Hero section implementation | Frontend Dev | P0 |
| Below-fold page sections | Frontend Dev | P0 |
| Lifestyle photography (3-5 images) | Photography/Creative | P0 |
| Final copy refinement | Marketing | P1 |
| A/B testing framework | Analytics | P1 |

---

## 2. Hero Section Technical Specifications

### 2.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo: PATINA + Strata]              [Get the App - subtle] │ ← Minimal nav
│                                                              │
│                                                              │
│                                                              │
│              ┌─────────────────────────────────┐             │
│              │                                 │             │
│              │    FULL-BLEED LIFESTYLE IMAGE   │             │
│              │    (with gradient overlay)       │             │
│              │                                 │             │
│              └─────────────────────────────────┘             │
│                                                              │
│                    Where Time Adds Value                     │ ← Headline
│                                                              │
│        Discover furniture that grows more beautiful          │ ← Subheadline
│                     with every year.                         │
│                                                              │
│                    [ Get the App ]                           │ ← Primary CTA
│                                                              │
│               Heritage makers since 1904                     │ ← Trust line
│                                                              │
│                          ↓                                   │ ← Scroll indicator
└─────────────────────────────────────────────────────────────┘
```

### 2.2 HTML Structure

```html
<!-- Hero Section -->
<section class="hero" id="hero">
  <!-- Minimal Navigation - Fixed, Transparent initially -->
  <nav class="hero-nav" id="hero-nav">
    <a href="/" class="hero-nav__logo" aria-label="Patina Home">
      <svg class="logo-mark"><!-- Patina wordmark + strata lines --></svg>
    </a>
    <a href="#download" class="hero-nav__cta hero-nav__cta--subtle">
      Get the App
    </a>
  </nav>

  <!-- Background Image Container -->
  <div class="hero__background">
    <picture>
      <!-- Art direction for different viewports -->
      <source 
        media="(min-width: 1200px)" 
        srcset="hero-desktop.webp 1x, hero-desktop@2x.webp 2x"
        type="image/webp">
      <source 
        media="(min-width: 768px)" 
        srcset="hero-tablet.webp 1x, hero-tablet@2x.webp 2x"
        type="image/webp">
      <source 
        srcset="hero-mobile.webp 1x, hero-mobile@2x.webp 2x"
        type="image/webp">
      <!-- Fallback -->
      <img 
        src="hero-desktop.jpg" 
        alt="Morning light illuminating a beautifully aged leather armchair in a warm, lived-in living room"
        class="hero__image"
        loading="eager"
        fetchpriority="high">
    </picture>
    <!-- Gradient Overlay for Text Legibility -->
    <div class="hero__overlay"></div>
  </div>

  <!-- Hero Content -->
  <div class="hero__content">
    <h1 class="hero__headline">
      Where Time <em>Adds Value</em>
    </h1>
    <p class="hero__subheadline">
      Discover furniture that grows more beautiful with every year.
    </p>
    <a href="#download" class="hero__cta" id="hero-cta">
      Get the App
    </a>
    <p class="hero__trust">
      Heritage makers since 1904
    </p>
  </div>

  <!-- Scroll Indicator -->
  <button class="hero__scroll-indicator" aria-label="Scroll to explore">
    <span class="hero__scroll-arrow"></span>
  </button>
</section>

<!-- Sticky Navigation (Hidden Initially, Appears on Scroll) -->
<nav class="nav-sticky" id="nav-sticky" aria-hidden="true">
  <a href="/" class="nav-sticky__logo">PATINA</a>
  <ul class="nav-sticky__links">
    <li><a href="/discover">Discover</a></li>
    <li><a href="/furniture">Furniture</a></li>
    <li><a href="/designers">Designers</a></li>
    <li><a href="/our-story">Our Story</a></li>
  </ul>
  <a href="#download" class="nav-sticky__cta">Get the App</a>
</nav>
```

### 2.3 CSS Implementation

```css
/* ============================================
   DESIGN TOKENS (see Section 6 for full list)
   ============================================ */
:root {
  /* Core Colors */
  --patina-off-white: #EDE9E4;
  --patina-clay-beige: #A3927C;
  --patina-mocha-brown: #655B52;
  --patina-charcoal: #3F3B37;
  --patina-soft-cream: #F5F2ED;
  --patina-warm-white: #FAF7F2;
  
  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  
  /* Spacing */
  --hero-padding-x: clamp(1.5rem, 5vw, 4rem);
  --hero-padding-y: clamp(1.5rem, 4vh, 3rem);
  
  /* Transitions */
  --transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* ============================================
   HERO SECTION
   ============================================ */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: var(--hero-padding-y) var(--hero-padding-x);
  padding-bottom: calc(var(--hero-padding-y) + 4rem);
  overflow: hidden;
}

/* Background Image */
.hero__background {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%; /* Adjust based on image composition */
}

/* Gradient Overlay - Creates text legibility zone at bottom */
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(63, 59, 55, 0.7) 0%,
    rgba(63, 59, 55, 0.4) 30%,
    rgba(63, 59, 55, 0.1) 60%,
    transparent 100%
  );
}

/* Hero Content */
.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 720px;
}

.hero__headline {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 500;
  line-height: 1.1;
  color: var(--patina-off-white);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  
  /* Entrance animation */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out 0.2s forwards;
}

.hero__headline em {
  font-style: italic;
  color: var(--patina-clay-beige);
}

.hero__subheadline {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 400;
  line-height: 1.5;
  color: rgba(237, 233, 228, 0.85);
  margin-bottom: 2rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  
  /* Entrance animation */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out 0.4s forwards;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--patina-charcoal);
  background: var(--patina-clay-beige);
  border: none;
  border-radius: 100px;
  text-decoration: none;
  cursor: pointer;
  transition: 
    transform var(--transition-smooth),
    box-shadow var(--transition-smooth),
    background-color var(--transition-smooth);
  
  /* Entrance animation */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out 0.6s forwards;
}

.hero__cta:hover {
  background: var(--patina-mocha-brown);
  color: var(--patina-off-white);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(101, 91, 82, 0.3);
}

.hero__cta:active {
  transform: translateY(0) scale(0.98);
}

.hero__trust {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(237, 233, 228, 0.6);
  margin-top: 1.5rem;
  letter-spacing: 0.05em;
  
  /* Entrance animation */
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.8s forwards;
}

/* Minimal Hero Navigation */
.hero-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem var(--hero-padding-x);
  transition: background-color var(--transition-smooth);
}

.hero-nav__logo {
  color: var(--patina-off-white);
  transition: opacity var(--transition-smooth);
}

.hero-nav__logo:hover {
  opacity: 0.8;
}

.hero-nav__cta--subtle {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--patina-off-white);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(237, 233, 228, 0.3);
  border-radius: 100px;
  opacity: 0.7;
  transition: 
    opacity var(--transition-smooth),
    background-color var(--transition-smooth);
}

.hero-nav__cta--subtle:hover {
  opacity: 1;
  background: rgba(237, 233, 228, 0.1);
}

/* Scroll Indicator */
.hero__scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
  /* Entrance animation */
  opacity: 0;
  animation: fadeIn 1s ease-out 1.2s forwards;
}

.hero__scroll-arrow {
  display: block;
  width: 24px;
  height: 24px;
  border-right: 2px solid rgba(237, 233, 228, 0.5);
  border-bottom: 2px solid rgba(237, 233, 228, 0.5);
  transform: rotate(45deg);
  animation: scrollBounce 2s ease-in-out infinite;
}

/* Sticky Navigation (Appears on Scroll) */
.nav-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem var(--hero-padding-x);
  background: rgba(237, 233, 228, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(163, 146, 124, 0.15);
  transform: translateY(-100%);
  transition: transform var(--transition-smooth);
}

.nav-sticky.visible {
  transform: translateY(0);
}

.nav-sticky__logo {
  font-family: var(--font-display);
  font-size: 1.125rem;
  letter-spacing: 0.15em;
  color: var(--patina-charcoal);
  text-decoration: none;
}

.nav-sticky__links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-sticky__links a {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--patina-mocha-brown);
  text-decoration: none;
  transition: color var(--transition-smooth);
}

.nav-sticky__links a:hover {
  color: var(--patina-charcoal);
}

.nav-sticky__cta {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--patina-off-white);
  background: var(--patina-charcoal);
  padding: 0.625rem 1.25rem;
  border-radius: 100px;
  text-decoration: none;
  transition: background-color var(--transition-smooth);
}

.nav-sticky__cta:hover {
  background: var(--patina-mocha-brown);
}

/* Animations */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes scrollBounce {
  0%, 100% {
    transform: rotate(45deg) translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: rotate(45deg) translateY(6px);
    opacity: 1;
  }
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .hero-nav__cta--subtle {
    display: none; /* Hide secondary CTA on mobile for cleaner look */
  }
  
  .nav-sticky__links {
    display: none; /* Use hamburger menu on mobile */
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .hero__headline,
  .hero__subheadline,
  .hero__cta,
  .hero__trust,
  .hero__scroll-indicator {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  .hero__scroll-arrow {
    animation: none;
  }
}
```

### 2.4 JavaScript Implementation

```javascript
/**
 * Patina Hero Section Controller
 * Handles scroll-based navigation reveal and smooth scroll
 */

class PatinaHero {
  constructor() {
    this.hero = document.getElementById('hero');
    this.heroNav = document.getElementById('hero-nav');
    this.stickyNav = document.getElementById('nav-sticky');
    this.scrollIndicator = document.querySelector('.hero__scroll-indicator');
    
    this.heroHeight = 0;
    this.scrollThreshold = 0;
    this.ticking = false;
    
    this.init();
  }
  
  init() {
    this.calculateDimensions();
    this.bindEvents();
    this.checkInitialScroll();
  }
  
  calculateDimensions() {
    this.heroHeight = this.hero.offsetHeight;
    this.scrollThreshold = this.heroHeight * 0.7; // Show nav at 70% scroll
  }
  
  bindEvents() {
    // Scroll handler with requestAnimationFrame throttling
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    
    // Resize handler
    window.addEventListener('resize', () => {
      this.calculateDimensions();
    });
    
    // Scroll indicator click
    if (this.scrollIndicator) {
      this.scrollIndicator.addEventListener('click', () => {
        this.scrollToContent();
      });
    }
  }
  
  onScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateNavigation();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }
  
  updateNavigation() {
    const scrollY = window.scrollY;
    
    if (scrollY > this.scrollThreshold) {
      // Show sticky nav
      this.stickyNav.classList.add('visible');
      this.stickyNav.setAttribute('aria-hidden', 'false');
      
      // Fade out hero nav
      this.heroNav.style.opacity = '0';
      this.heroNav.style.pointerEvents = 'none';
    } else {
      // Hide sticky nav
      this.stickyNav.classList.remove('visible');
      this.stickyNav.setAttribute('aria-hidden', 'true');
      
      // Show hero nav
      this.heroNav.style.opacity = '1';
      this.heroNav.style.pointerEvents = 'auto';
    }
    
    // Parallax effect on hero image (subtle)
    if (scrollY < this.heroHeight) {
      const parallaxOffset = scrollY * 0.3;
      const heroImage = this.hero.querySelector('.hero__image');
      if (heroImage) {
        heroImage.style.transform = `translateY(${parallaxOffset}px) scale(1.05)`;
      }
    }
  }
  
  scrollToContent() {
    const nextSection = this.hero.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  checkInitialScroll() {
    // Handle page refresh with scroll position
    if (window.scrollY > 0) {
      this.updateNavigation();
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new PatinaHero();
});

// Track CTA clicks for analytics
document.querySelectorAll('[href="#download"], .hero__cta').forEach(cta => {
  cta.addEventListener('click', (e) => {
    // Analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Hero - Get the App',
        event_value: 1
      });
    }
    
    // If this is an anchor link, handle App Store redirect
    // (Replace with actual App Store URL when available)
    e.preventDefault();
    window.open('https://apps.apple.com/app/patina', '_blank');
  });
});
```

### 2.5 Image Requirements

| Breakpoint | Dimensions | Format | Max File Size |
|------------|-----------|--------|---------------|
| Mobile | 750 x 1334 px | WebP + JPG fallback | 150 KB |
| Mobile @2x | 1500 x 2668 px | WebP + JPG fallback | 300 KB |
| Tablet | 1536 x 1024 px | WebP + JPG fallback | 200 KB |
| Tablet @2x | 3072 x 2048 px | WebP + JPG fallback | 400 KB |
| Desktop | 1920 x 1080 px | WebP + JPG fallback | 250 KB |
| Desktop @2x | 3840 x 2160 px | WebP + JPG fallback | 500 KB |

**Critical:** Use `<picture>` element for art direction—mobile crops should focus on furniture detail, desktop shows full room context.

---

## 3. Below-the-Fold Page Structure

### 3.1 Section Hierarchy

The page scroll journey should progressively reveal Patina's value proposition in a narrative sequence:

```
┌─────────────────────────────────────────┐
│           HERO (100vh)                  │  ← Emotional hook
│        "Where Time Adds Value"          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         SECTION 1: VALUE PROP           │  ← What we do
│      "Furniture with meaning"           │
│                                         │
│    [AR Icon]   [Makers Icon]   [Quality]│
│    See It      Know the        Built to │
│    In Space    Makers          Last     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      SECTION 2: AR EXPERIENCE           │  ← How it works
│     "See before you decide"             │
│                                         │
│   ┌─────────┐                           │
│   │  Phone  │  1. Scan your room        │
│   │  with   │  2. Browse curated pieces │
│   │  AR     │  3. Place & visualize     │
│   │  Demo   │  4. Purchase with clarity │
│   └─────────┘                           │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      SECTION 3: FEATURED MAKERS         │  ← Trust & story
│      "Meet the craftspeople"            │
│                                         │
│   ┌───────┐ ┌───────┐ ┌───────┐        │
│   │ Maker │ │ Maker │ │ Maker │        │
│   │   1   │ │   2   │ │   3   │        │
│   └───────┘ └───────┘ └───────┘        │
│                                         │
│   "Vermont • Since 1892 • 4th Gen"      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      SECTION 4: SOCIAL PROOF            │  ← Validation
│     "What our community says"           │
│                                         │
│   "The app helped me find..."           │
│   — Sarah M., Chicago                   │
│                                         │
│   [4.8 ★ App Store]  [10K+ Downloads]   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      SECTION 5: DESIGNER SERVICES       │  ← Upsell path
│    "Work with a professional"           │
│                                         │
│   Need more guidance? Our designers     │
│   can help bring your vision to life.   │
│                                         │
│   [ Learn About Design Services ]       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      SECTION 6: FINAL CTA               │  ← Conversion
│   "Ready to find your next heirloom?"   │
│                                         │
│   [ Download on the App Store ]         │
│                                         │
│   Or explore furniture on web →         │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│              FOOTER                      │
│                                         │
│   PATINA                                │
│   "Where Time Adds Value"               │
│                                         │
│   Explore    Work With Us    Company    │
│   Furniture  Designers       Our Story  │
│   Makers     For Makers      Contact    │
│   Materials  Services        Careers    │
└─────────────────────────────────────────┘
```

### 3.2 Section Specifications

#### Section 1: Value Proposition Cards

```html
<section class="value-prop" id="why-patina">
  <div class="container">
    <span class="section-label">Why Patina</span>
    <h2 class="section-title">Furniture with <em>meaning</em></h2>
    <p class="section-intro">
      Every piece tells a story of craftsmanship, materials, 
      and the makers who bring them to life.
    </p>
    
    <div class="value-cards">
      <article class="value-card">
        <div class="value-card__icon">
          <!-- AR/Spatial icon -->
        </div>
        <h3 class="value-card__title">See It In Your Space</h3>
        <p class="value-card__description">
          Use AR to place furniture in your room before you buy. 
          No guessing, no measuring—just clarity.
        </p>
      </article>
      
      <article class="value-card">
        <div class="value-card__icon">
          <!-- Clock/Heritage icon -->
        </div>
        <h3 class="value-card__title">Know the Makers</h3>
        <p class="value-card__description">
          Every piece comes with its story—the craftspeople, 
          traditions, and materials that make it special.
        </p>
      </article>
      
      <article class="value-card">
        <div class="value-card__icon">
          <!-- Heart/Quality icon -->
        </div>
        <h3 class="value-card__title">Quality That Lasts</h3>
        <p class="value-card__description">
          Furniture built to become heirlooms. Materials and 
          craftsmanship that age beautifully.
        </p>
      </article>
    </div>
  </div>
</section>
```

**Design Notes:**
- Cards should have subtle entrance animations on scroll (stagger by 0.1s)
- Icon style: Line icons with 2px stroke, Clay Beige color
- Background: Soft gradient from Off-White to Soft Cream
- Card styling: Soft Cream background, subtle shadow on hover

#### Section 2: AR Experience Showcase

```html
<section class="ar-showcase" id="how-it-works">
  <div class="container">
    <div class="ar-showcase__content">
      <span class="section-label">The Experience</span>
      <h2 class="section-title">See before you <em>decide</em></h2>
      <p class="section-intro">
        Our AR technology lets you place furniture in your actual 
        space—so you know it fits before it arrives.
      </p>
      
      <ol class="ar-steps">
        <li class="ar-step">
          <span class="ar-step__number">1</span>
          <span class="ar-step__text">Scan your room with your phone</span>
        </li>
        <li class="ar-step">
          <span class="ar-step__number">2</span>
          <span class="ar-step__text">Browse curated, quality pieces</span>
        </li>
        <li class="ar-step">
          <span class="ar-step__number">3</span>
          <span class="ar-step__text">Place and visualize in your space</span>
        </li>
        <li class="ar-step">
          <span class="ar-step__number">4</span>
          <span class="ar-step__text">Purchase with complete confidence</span>
        </li>
      </ol>
      
      <a href="#download" class="btn btn--primary">Get the App</a>
    </div>
    
    <div class="ar-showcase__visual">
      <!-- Animated phone mockup showing AR in action -->
      <!-- Consider: Lottie animation or video loop -->
    </div>
  </div>
</section>
```

**Design Notes:**
- Split layout: Content left, visual right (stacked on mobile)
- Visual should be an engaging demonstration—video loop or animation
- Steps use Clay Beige numbered circles
- Background: Off-White

#### Section 3: Featured Makers

```html
<section class="makers" id="makers">
  <div class="container">
    <span class="section-label">The Makers</span>
    <h2 class="section-title">Meet the <em>craftspeople</em></h2>
    <p class="section-intro">
      Every piece in our collection comes from makers we trust—
      artisans with generations of expertise and a commitment to quality.
    </p>
    
    <div class="makers__carousel">
      <!-- Horizontal scrolling cards -->
      <article class="maker-card">
        <div class="maker-card__image">
          <img src="maker-1.jpg" alt="John working at his woodshop in Vermont">
        </div>
        <div class="maker-card__content">
          <h3 class="maker-card__name">Vermont Woodworks</h3>
          <p class="maker-card__location">Bennington, Vermont</p>
          <p class="maker-card__heritage">Since 1892 • 4th Generation</p>
          <p class="maker-card__specialty">Solid hardwood furniture</p>
        </div>
      </article>
      <!-- Additional maker cards -->
    </div>
    
    <a href="/makers" class="link link--arrow">Explore all makers</a>
  </div>
</section>
```

**Design Notes:**
- Horizontal scroll carousel with peek indicators
- Cards have full-bleed maker photos
- Warm, editorial photography style
- Background: Soft cream with subtle texture

#### Section 4: Social Proof

```html
<section class="testimonials" id="testimonials">
  <div class="container">
    <div class="testimonials__header">
      <span class="section-label">Community</span>
      <h2 class="section-title">Loved by <em>design enthusiasts</em></h2>
    </div>
    
    <div class="testimonials__grid">
      <blockquote class="testimonial">
        <p class="testimonial__text">
          "The AR feature saved me from a huge mistake. I could see 
          the sofa was too large before ordering. Game changer."
        </p>
        <footer class="testimonial__author">
          <span class="testimonial__name">Sarah M.</span>
          <span class="testimonial__location">Chicago, IL</span>
        </footer>
      </blockquote>
      <!-- Additional testimonials -->
    </div>
    
    <div class="trust-badges">
      <div class="trust-badge">
        <span class="trust-badge__value">4.8★</span>
        <span class="trust-badge__label">App Store Rating</span>
      </div>
      <div class="trust-badge">
        <span class="trust-badge__value">10K+</span>
        <span class="trust-badge__label">Happy Users</span>
      </div>
      <div class="trust-badge">
        <span class="trust-badge__value">50+</span>
        <span class="trust-badge__label">Heritage Makers</span>
      </div>
    </div>
  </div>
</section>
```

**Design Notes:**
- Testimonial cards with subtle quote marks
- Trust badges in a row, centered
- Background: Charcoal (dark section for contrast)
- Text in Off-White

#### Section 5: Designer Services

```html
<section class="designer-services" id="designers">
  <div class="container">
    <div class="designer-services__content">
      <span class="section-label">Professional Help</span>
      <h2 class="section-title">Work with a <em>designer</em></h2>
      <p class="section-intro">
        Need more guidance? Our network of professional designers 
        can help bring your vision to life—from single rooms 
        to whole-home transformations.
      </p>
      <a href="/designers" class="btn btn--secondary">
        Learn About Design Services
      </a>
    </div>
    
    <div class="designer-services__image">
      <img src="designer-consultation.jpg" 
           alt="Designer reviewing room plans with client">
    </div>
  </div>
</section>
```

**Design Notes:**
- Positioned as optional path, not primary CTA
- Split layout with lifestyle image
- Background: Soft Cream
- Secondary button style (outline)

#### Section 6: Final CTA

```html
<section class="final-cta" id="download">
  <div class="container">
    <h2 class="final-cta__headline">
      Ready to find your next <em>heirloom</em>?
    </h2>
    <p class="final-cta__subtext">
      Download the Patina app to explore furniture in AR, 
      discover makers, and connect with designers.
    </p>
    
    <a href="https://apps.apple.com/app/patina" class="app-store-badge">
      <img src="app-store-badge.svg" alt="Download on the App Store">
    </a>
    
    <p class="final-cta__alternative">
      Or <a href="/furniture">explore furniture on web</a>
    </p>
  </div>
</section>
```

**Design Notes:**
- Dark background (Charcoal) for visual separation
- Large headline with italicized accent
- Official App Store badge
- Alternative link for non-iOS users

### 3.3 Scroll Animation Guidelines

Use Intersection Observer for scroll-triggered animations:

```javascript
// Scroll Animation Controller
const animateOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all animatable elements
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
};

document.addEventListener('DOMContentLoaded', animateOnScroll);
```

**Animation Types:**
- `data-animate="fade-up"` — Fade in + translate from below
- `data-animate="fade-in"` — Simple opacity fade
- `data-animate="stagger"` — Parent container, children animate sequentially

---

## 4. Photography Guidelines

### 4.1 Hero Image Requirements

#### Mood & Atmosphere

The hero image must instantly communicate Patina's brand essence: **timelessness, warmth, and the beauty of well-loved things.**

| Attribute | Direction |
|-----------|-----------|
| **Lighting** | Natural light, preferably morning "golden hour." Soft, warm, directional light that creates gentle shadows and highlights texture. |
| **Color Temperature** | Warm (3000-4000K feel). Avoid cool, clinical lighting. |
| **Environment** | Real, lived-in spaces—not staged showrooms. Spaces that feel like homes, not sets. |
| **Focal Point** | A piece of furniture that demonstrates patina—aged leather, worn wood grain, soft fabrics that show gentle use. |
| **Composition** | Leave breathing room at bottom third for text overlay. Avoid busy patterns or competing focal points. |
| **Emotion** | Calm, inviting, aspirational but attainable. The viewer should want to sit in that chair, live in that room. |

#### Specific Shot List

**Primary Hero (Required):**
1. **"Morning Light on Leather"**
   - Subject: Well-aged leather armchair or sofa
   - Setting: Living room with large window
   - Light: Morning sun streaming in, creating warmth
   - Supporting elements: Perhaps a book, a throw, signs of life
   - Crop guidance: Furniture prominent but not isolated; environmental context

**Alternate Heroes (For A/B Testing):**

2. **"The Maker's Touch"**
   - Subject: Hands of a craftsperson working on furniture
   - Detail: Wood grain, tools, workshop environment
   - Feel: Process-focused, artisanal

3. **"Gathered Around"**
   - Subject: Dining table with natural wood patina
   - Setting: Dining room with warm lighting
   - Feel: Gathering, home, togetherness (empty chairs suggest potential)

4. **"Quiet Corner"**
   - Subject: Reading nook or small vignette
   - Elements: Chair, side table, lamp, personal objects
   - Feel: Intimacy, personal space, retreat

5. **"Heritage Piece"**
   - Subject: Single statement piece (cabinet, credenza)
   - Focus: Material quality, joinery details, aging gracefully
   - Feel: Investment, longevity, heirloom

#### Technical Specifications

| Requirement | Specification |
|-------------|---------------|
| Resolution | Minimum 5000px on longest edge (for 2x retina) |
| Format | RAW capture, delivered as high-quality JPEG + WebP |
| Aspect Ratio | Provide crops for 16:9 (desktop), 4:3 (tablet), 3:4 (mobile portrait) |
| Color Profile | sRGB for web delivery |
| Sharpness | Moderate—avoid over-sharpening; maintain soft, natural feel |
| Post-Processing | Minimal. Preserve natural colors. Light warmth enhancement OK. |

#### What to Avoid

❌ **Don't photograph:**
- Sterile, showroom-perfect environments
- Furniture that looks brand new without character
- Stark white backgrounds or studio lighting
- Multiple furniture pieces competing for attention
- Cluttered or distracting backgrounds
- Cool, blue-tinted lighting
- Stock photo aesthetic (forced poses, fake scenarios)
- Branding or logos visible on products

### 4.2 Below-Fold Photography

#### Maker Portraits
- Environmental portraits in workshops
- Show craftspeople engaged in work (not posed looking at camera)
- Warm, natural lighting
- Include tools, materials, works-in-progress
- Convey expertise and passion

#### AR/App Screenshots
- Real device photography (not mockups)
- Show app in use in real homes
- Hands holding phone naturally
- Screen content clearly visible
- Context of room visible around device

#### Detail Shots
- Wood grain close-ups
- Leather texture and aging
- Joinery and craftsmanship details
- Material samples and swatches
- Natural, directional lighting to show texture

### 4.3 Image Optimization Checklist

Before delivery, all images must be:

- [ ] Color-corrected for consistent warmth
- [ ] Exported in WebP format (primary) + JPEG (fallback)
- [ ] Resized to required breakpoint dimensions
- [ ] Compressed to meet file size targets
- [ ] Alt text written for accessibility
- [ ] Named descriptively (e.g., `hero-morning-light-leather-chair.webp`)

---

## 5. Copy Worksheet

### 5.1 Placeholder Copy (Current)

The following copy is placeholder. Marketing team should refine based on brand voice guidelines and A/B testing priorities.

#### Hero Section

| Element | Placeholder Copy | Character Count |
|---------|------------------|-----------------|
| **Headline** | Where Time Adds Value | 22 |
| **Subheadline** | Discover furniture that grows more beautiful with every year. | 62 |
| **CTA Button** | Get the App | 11 |
| **Trust Line** | Heritage makers since 1904 | 26 |

#### Value Proposition Section

| Element | Placeholder Copy |
|---------|------------------|
| **Section Label** | Why Patina |
| **Title** | Furniture with meaning |
| **Intro** | Every piece tells a story of craftsmanship, materials, and the makers who bring them to life. |

| Card | Title | Description |
|------|-------|-------------|
| 1 | See It In Your Space | Use AR to place furniture in your room before you buy. No guessing, no measuring—just clarity. |
| 2 | Know the Makers | Every piece comes with its story—the craftspeople, traditions, and materials that make it special. |
| 3 | Quality That Lasts | Furniture built to become heirlooms. Materials and craftsmanship that age beautifully. |

#### AR Experience Section

| Element | Placeholder Copy |
|---------|------------------|
| **Section Label** | The Experience |
| **Title** | See before you decide |
| **Intro** | Our AR technology lets you place furniture in your actual space—so you know it fits before it arrives. |
| **Step 1** | Scan your room with your phone |
| **Step 2** | Browse curated, quality pieces |
| **Step 3** | Place and visualize in your space |
| **Step 4** | Purchase with complete confidence |

#### Final CTA Section

| Element | Placeholder Copy |
|---------|------------------|
| **Headline** | Ready to find your next heirloom? |
| **Subtext** | Download the Patina app to explore furniture in AR, discover makers, and connect with designers. |
| **Alternative** | Or explore furniture on web |

---

### 5.2 Copy Refinement Worksheet

Use this worksheet to develop and test alternative copy options.

#### HEADLINE OPTIONS

The headline appears in the hero section and sets the emotional tone for the entire experience. It should be memorable, differentiated, and communicate Patina's core value.

**Current:** Where Time Adds Value

| Option | Copy | Rationale | Test Priority |
|--------|------|-----------|---------------|
| A (Control) | Where Time Adds Value | Brand tagline, establishes unique positioning | — |
| B | Design That Lasts | Simpler, more direct benefit | High |
| C | Furniture Worth Keeping | Emotional, implies quality | High |
| D | The Furniture Your Future Self Will Thank You For | Longer, more specific emotional appeal | Medium |
| E | Built to Become Heirlooms | Direct quality claim | Medium |
| F | Every Piece Tells a Story | Narrative-focused | Low |
| G | Your Space Deserves Better | Problem-aware | Low |
| **Your Option:** | | | |

**Selection Criteria:**
- Does it differentiate from competitors (Wayfair, West Elm)?
- Does it communicate timelessness/quality?
- Is it memorable after a single viewing?
- Does it work with our visual (lifestyle photography)?

---

#### SUBHEADLINE OPTIONS

The subheadline supports the headline with more specific benefit language. Should be scannable and reinforce the emotional promise.

**Current:** Discover furniture that grows more beautiful with every year.

| Option | Copy | Character Count |
|--------|------|-----------------|
| A (Control) | Discover furniture that grows more beautiful with every year. | 62 |
| B | See it in your space. Know the story. Own it for generations. | 60 |
| C | Curated furniture from heritage makers—visualized in your home before you buy. | 75 |
| D | The pieces you'll still love in twenty years. | 45 |
| E | Furniture with stories worth telling. See it in AR first. | 55 |
| **Your Option:** | | |

**Guidelines:**
- Keep under 80 characters for readability
- Should answer "What do I get?" or "Why should I care?"
- Avoid jargon; keep accessible

---

#### CTA BUTTON OPTIONS

The call-to-action must be clear, specific, and action-oriented. Single CTA focus means this button carries conversion weight.

**Current:** Get the App

| Option | Copy | Notes |
|--------|------|-------|
| A (Control) | Get the App | Simple, clear |
| B | Download Free | Emphasizes no cost |
| C | Start Exploring | Lower commitment feel |
| D | See Your Space | Benefit-focused |
| E | Try AR Free | Feature-specific |
| F | Discover Now | Action + urgency |
| **Your Option:** | | |

**Testing Note:** CTA copy often has outsized impact on conversion. Plan for multiple A/B tests.

---

#### TRUST LINE OPTIONS

The trust line appears below the CTA to reduce friction. Should be subtle but credible.

**Current:** Heritage makers since 1904

| Option | Copy | Notes |
|--------|------|-------|
| A (Control) | Heritage makers since 1904 | Establishes longevity |
| B | 50+ years of craft tradition | Number-specific |
| C | 4.8★ rated on the App Store | Social proof |
| D | Trusted by 10,000+ design lovers | Community proof |
| E | Free to explore. No commitment. | Reduces friction |
| F | Featured in Architectural Digest | Press credibility |
| **Your Option:** | | |

**Note:** Can A/B test or combine (e.g., "4.8★ • Heritage makers since 1904")

---

### 5.3 Voice & Tone Checklist

Before finalizing any copy, verify it meets Patina's brand voice guidelines:

**Voice Attributes (from Brand Guidelines):**

- [ ] **Confident yet Unpretentious** — Expert guidance delivered with warmth
- [ ] **Sensory & Tangible** — Language that evokes touch and texture
- [ ] **Story-Driven** — Every piece has a provenance
- [ ] **Midwestern Warmth** — Plain-spoken honesty, friendly neighbor energy

**Copy Should:**

- [ ] Lead with benefits, not features
- [ ] Use active voice ("Discover" not "Can be discovered")
- [ ] Avoid superlatives ("best," "amazing," "revolutionary")
- [ ] Include sensory words when relevant (grain, leather, warmth)
- [ ] Be scannable (short sentences, clear hierarchy)
- [ ] Pass the "would a real person say this?" test

**Copy Should NOT:**

- [ ] Sound like a tech startup ("AI-powered," "leverage," "optimize")
- [ ] Use luxury brand clichés ("curated," "elevated," "bespoke"—use sparingly)
- [ ] Include generic marketing phrases ("limited time," "act now")
- [ ] Be longer than necessary

---

### 5.4 A/B Testing Priority Matrix

| Test | Elements | Hypothesis | Priority |
|------|----------|------------|----------|
| 1 | Headline A vs B | "Design That Lasts" may outperform tagline due to directness | P1 |
| 2 | CTA "Get the App" vs "Start Exploring" | Lower-commitment CTA may increase clicks | P1 |
| 3 | Trust line variants | Social proof (★ rating) vs heritage claim | P2 |
| 4 | Subheadline length | Short (45 char) vs medium (62 char) | P2 |
| 5 | Hero image variants | Lifestyle vs craft close-up | P1 |

---

## 6. Design Tokens & CSS Variables

### Complete Token Reference

```css
:root {
  /* ==================
     COLOR PALETTE
     ================== */
  
  /* Core Brand Colors */
  --patina-off-white: #EDE9E4;
  --patina-clay-beige: #A3927C;
  --patina-mocha-brown: #655B52;
  --patina-charcoal: #3F3B37;
  
  /* Extended Palette */
  --patina-soft-cream: #F5F2ED;
  --patina-warm-white: #FAF7F2;
  
  /* Semantic Colors */
  --color-background-primary: var(--patina-off-white);
  --color-background-secondary: var(--patina-soft-cream);
  --color-background-dark: var(--patina-charcoal);
  --color-background-warm: var(--patina-warm-white);
  
  --color-text-primary: var(--patina-charcoal);
  --color-text-secondary: var(--patina-mocha-brown);
  --color-text-muted: var(--patina-clay-beige);
  --color-text-inverse: var(--patina-off-white);
  
  --color-interactive-default: var(--patina-clay-beige);
  --color-interactive-hover: var(--patina-mocha-brown);
  --color-interactive-active: var(--patina-charcoal);
  
  --color-border-default: rgba(163, 146, 124, 0.3);
  --color-border-subtle: rgba(163, 146, 124, 0.15);
  
  /* ==================
     TYPOGRAPHY
     ================== */
  
  --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Font Sizes (fluid) */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);
  --text-sm: clamp(0.8125rem, 0.775rem + 0.25vw, 0.875rem);
  --text-base: clamp(0.9375rem, 0.9rem + 0.25vw, 1rem);
  --text-lg: clamp(1rem, 0.95rem + 0.35vw, 1.125rem);
  --text-xl: clamp(1.125rem, 1.05rem + 0.5vw, 1.25rem);
  --text-2xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-3xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-4xl: clamp(2rem, 1.6rem + 2vw, 3rem);
  --text-5xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
  --text-6xl: clamp(3rem, 2.2rem + 4vw, 5rem);
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.15;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;
  --leading-loose: 1.8;
  
  /* Letter Spacing */
  --tracking-tighter: -0.03em;
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
  --tracking-caps: 0.15em;
  
  /* Font Weights */
  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  
  /* ==================
     SPACING
     ================== */
  
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  
  /* Container */
  --container-max: 1200px;
  --container-padding: clamp(1rem, 5vw, 4rem);
  
  /* Section Spacing */
  --section-padding-y: clamp(4rem, 10vh, 8rem);
  
  /* ==================
     BORDERS & RADIUS
     ================== */
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
  
  /* ==================
     SHADOWS
     ================== */
  
  --shadow-sm: 0 2px 8px rgba(101, 91, 82, 0.06);
  --shadow-md: 0 4px 16px rgba(101, 91, 82, 0.08);
  --shadow-lg: 0 8px 32px rgba(101, 91, 82, 0.12);
  --shadow-xl: 0 16px 48px rgba(101, 91, 82, 0.16);
  
  /* ==================
     TRANSITIONS
     ================== */
  
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
  
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* ==================
     Z-INDEX SCALE
     ================== */
  
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 50;
  --z-sticky: 90;
  --z-fixed: 100;
  --z-overlay: 200;
  --z-modal: 300;
  --z-toast: 400;
}
```

---

## 7. Accessibility Requirements

### WCAG 2.1 AA Compliance Checklist

#### Color Contrast
- [ ] Body text on Off-White: minimum 4.5:1 (Charcoal = 8.5:1 ✓)
- [ ] Large text on Off-White: minimum 3:1 (Mocha Brown = 4.8:1 ✓)
- [ ] Button text on Clay Beige: minimum 4.5:1 (Charcoal = 3.2:1 — needs testing)
- [ ] Hero text on gradient overlay: ensure sufficient contrast at all points

#### Keyboard Navigation
- [ ] All interactive elements focusable via Tab
- [ ] Focus states clearly visible (use `:focus-visible`)
- [ ] Skip link to main content
- [ ] Logical tab order follows visual hierarchy

#### Screen Reader Support
- [ ] All images have descriptive `alt` text
- [ ] Decorative images use `alt=""`
- [ ] Headings follow proper hierarchy (h1 → h2 → h3)
- [ ] Landmark regions defined (`<nav>`, `<main>`, `<section>`, `<footer>`)
- [ ] ARIA labels on icon-only buttons
- [ ] Live regions for dynamic content updates

#### Motion & Animation
- [ ] Respect `prefers-reduced-motion` media query
- [ ] Provide alternative for video content
- [ ] No auto-playing video with sound
- [ ] Animations shorter than 5 seconds

#### Touch Targets
- [ ] Minimum touch target size: 44x44px
- [ ] Adequate spacing between interactive elements

### Focus State Styles

```css
/* Custom focus styles that match brand */
:focus-visible {
  outline: 2px solid var(--patina-clay-beige);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 8. Performance Targets

### Core Web Vitals Goals

| Metric | Target | Measurement |
|--------|--------|-------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Hero image load time |
| **FID** (First Input Delay) | < 100ms | Time to interactive |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability |
| **FCP** (First Contentful Paint) | < 1.8s | Initial render |
| **TTI** (Time to Interactive) | < 3.8s | Full interactivity |

### Image Optimization Requirements

1. **Format Priority:** WebP > AVIF > JPEG
2. **Lazy Loading:** All images below fold use `loading="lazy"`
3. **Hero Image:** Use `fetchpriority="high"` and `loading="eager"`
4. **Responsive Images:** Serve appropriately sized images per breakpoint
5. **Compression:** Use quality setting of 80-85% for JPEG/WebP

### Critical CSS

Inline critical CSS for above-the-fold content to reduce render-blocking:

```html
<head>
  <style>
    /* Inline critical styles for hero section */
    /* Extract using tools like Critical or Penthouse */
  </style>
  <link rel="preload" href="hero-desktop.webp" as="image">
  <link rel="stylesheet" href="main.css" media="print" onload="this.media='all'">
</head>
```

### Font Loading Strategy

```html
<head>
  <!-- Preconnect to font origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Load fonts with display=swap -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
</head>
```

### JavaScript Budget

| Category | Budget |
|----------|--------|
| Total JS (compressed) | < 100 KB |
| Third-party scripts | < 50 KB |
| First-party JS | < 50 KB |

---

## Appendix A: File Checklist

### Required Assets

**Images:**
- [ ] `hero-mobile.webp` (750x1334)
- [ ] `hero-mobile@2x.webp` (1500x2668)
- [ ] `hero-tablet.webp` (1536x1024)
- [ ] `hero-tablet@2x.webp` (3072x2048)
- [ ] `hero-desktop.webp` (1920x1080)
- [ ] `hero-desktop@2x.webp` (3840x2160)
- [ ] JPEG fallbacks for all above
- [ ] `app-store-badge.svg`
- [ ] Maker photos (3-5)
- [ ] AR demo animation/video

**Icons:**
- [ ] Patina logo SVG (wordmark + strata)
- [ ] AR/spatial icon
- [ ] Heritage/clock icon
- [ ] Quality/heart icon
- [ ] Scroll arrow
- [ ] Navigation icons (mobile menu)

**Fonts:**
- [ ] Playfair Display (400, 500, 400i)
- [ ] Inter (400, 500, 600)

---

## Appendix B: Browser Support

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | Last 2 | Full |
| Firefox | Last 2 | Full |
| Safari | Last 2 | Full |
| Edge | Last 2 | Full |
| iOS Safari | 14+ | Full |
| Chrome Android | Last 2 | Full |
| Samsung Internet | Last 2 | Full |

**Progressive Enhancement Notes:**
- CSS Grid with Flexbox fallback
- WebP with JPEG fallback
- Intersection Observer with scroll event fallback

---

*Document Version 1.0 | December 2024*
*Prepared for Patina Development & Marketing Teams*
