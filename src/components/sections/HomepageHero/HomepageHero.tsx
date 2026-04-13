"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedStrataMark } from "@/components/ui/AnimatedStrataMark";
import { StrataMark } from "@/components/ui/StrataMark";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface HomepageHeroProps {
  ctaLabel?: string;
  ctaHref?: string;
  description?: string;
}

export function HomepageHero({
  ctaLabel = "Join the Founding Circle",
  ctaHref = "/founding",
  description = "Learn what works in your space. Find furniture you can trust. And when you're ready for more, a designer continues right where you left off.",
}: HomepageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  // Refs for scroll-driven DOM manipulation (no state updates = 60fps)
  const bgRef = useRef<HTMLImageElement>(null);
  const blackOverlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const strataRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLSpanElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const scrollPulseRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  // Ken Burns on load
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setTimeout(() => {
      if (bgRef.current) bgRef.current.style.transform = "scale(1.0)";
    }, 100);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Remove hero-reveal class after entrance animation completes
  // so that scroll-driven inline styles can take effect
  // (animation fill-mode: both overrides inline styles)
  useEffect(() => {
    const timer = setTimeout(() => {
      [strataRef, taglineRef, ctaRef, topBarRef, badgesRef].forEach((ref) => {
        ref.current?.classList.remove("hero-reveal");
      });
      // Also remove from the description element
      const descEl = contentRef.current?.querySelector("[data-desc]");
      descEl?.classList.remove("hero-reveal");
    }, 1200); // after entrance animations finish (~1.1s max)
    return () => clearTimeout(timer);
  }, []);

  // Scroll-driven animations
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const vh = window.innerHeight;
          const y = window.scrollY;
          const progress = clamp(y / vh, 0, 1);

          // --- Background: fade to black (0→0.5 progress) ---
          if (blackOverlayRef.current) {
            const blackOpacity = clamp(progress / 0.5, 0, 1);
            blackOverlayRef.current.style.opacity = String(blackOpacity);
          }

          // --- All hero content: unified fade out + drift up (0→0.3 progress) ---
          const fadeOutProgress = clamp(progress / 0.3, 0, 1);
          const eased = 1 - Math.pow(1 - fadeOutProgress, 3); // ease-out cubic
          const fadeOutOpacity = 1 - eased;
          const fadeOutY = eased * -30; // drift upward

          const contentEls = [
            { el: headlineRef.current, baseOpacity: 1 },
            { el: strataRef.current, baseOpacity: 1 },
            { el: taglineRef.current, baseOpacity: 0.75 },
            { el: ctaRef.current, baseOpacity: 1 },
            { el: topBarRef.current, baseOpacity: 1 },
            { el: badgesRef.current, baseOpacity: 0.4 },
          ];

          for (const { el, baseOpacity } of contentEls) {
            if (el) {
              el.style.opacity = String(fadeOutOpacity * baseOpacity);
              el.style.transform = `translateY(${fadeOutY}px)`;
            }
          }

          // Description (nested inside contentRef)
          const descEl = contentRef.current?.querySelector("[data-desc]") as HTMLElement | null;
          if (descEl) {
            descEl.style.opacity = String(fadeOutOpacity * 0.75);
            descEl.style.transform = `translateY(${fadeOutY}px)`;
          }

          // --- "Discover Patina": emerge from black (0.4→0.7 progress) ---
          if (discoverRef.current) {
            const discoverProgress = clamp((progress - 0.4) / 0.3, 0, 1);
            const discoverEased = 1 - Math.pow(1 - discoverProgress, 3);
            const discoverY = lerp(40, 0, discoverEased);
            discoverRef.current.style.opacity = String(discoverEased);
            discoverRef.current.style.transform = `translateY(${discoverY}px)`;
          }

          // --- Scroll indicator: theme-aware (stays fixed, detects bg) ---
          if (scrollIndicatorRef.current) {
            // Detect which section is behind the indicator's screen position
            const indicatorY = window.innerHeight - 56;
            const sections = document.querySelectorAll("section[data-bg]");
            let isDarkBg = true;
            sections.forEach((section) => {
              const rect = section.getBoundingClientRect();
              if (rect.top < indicatorY && rect.bottom > indicatorY) {
                isDarkBg = section.getAttribute("data-bg") === "dark";
              }
            });

            // Colors: dark bg → white, light bg → charcoal
            const color = isDarkBg ? "rgb(255,255,255)" : "rgb(63,59,55)";
            const textOpacity = isDarkBg ? "0.4" : "0.6";
            const lineOpacity = isDarkBg ? "0.2" : "0.4";

            if (scrollTextRef.current) {
              scrollTextRef.current.style.color = color;
              scrollTextRef.current.style.opacity = textOpacity;
              scrollTextRef.current.style.transition = "color 0.4s ease, opacity 0.4s ease";
            }
            if (scrollLineRef.current) {
              scrollLineRef.current.style.backgroundColor = color;
              scrollLineRef.current.style.opacity = lineOpacity;
              scrollLineRef.current.style.transition = "background-color 0.4s ease, opacity 0.4s ease";
            }
            if (scrollPulseRef.current) {
              scrollPulseRef.current.style.backgroundColor = isDarkBg
                ? "var(--patina-clay-beige)"
                : "var(--patina-mocha-brown)";
              scrollPulseRef.current.style.transition = "background-color 0.4s ease";
            }

            // Fade out near bottom of page
            const pageHeight = document.documentElement.scrollHeight;
            const fadeStart = pageHeight - window.innerHeight * 2;
            const pageFade = clamp((y - fadeStart) / window.innerHeight, 0, 1);
            scrollIndicatorRef.current.style.opacity = String(1 - pageFade);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  return (
    <>
    <section data-bg="dark" className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&h=1200&fit=crop&q=85"
          alt="Living space with natural materials and warm light"
          className="w-full h-full object-cover will-change-transform"
          style={{
            transform: "scale(1.08)",
            transition: prefersReducedMotion ? "none" : "transform 8s linear",
          }}
        />
        {/* Gradient Overlay (always present) */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, rgba(26,24,22,0.82) 0%, rgba(26,24,22,0.4) 50%, rgba(26,24,22,0.2) 100%),
              linear-gradient(0deg, rgba(26,24,22,0.5) 0%, transparent 40%)
            `,
          }}
        />
        {/* Black overlay — driven by scroll */}
        <div
          ref={blackOverlayRef}
          className="absolute inset-0 bg-black"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Top Bar — Strata Mark + CTA (visible before nav appears) */}
      <div
        ref={topBarRef}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end px-4 sm:px-6 lg:px-12 h-[60px] lg:h-[80px] will-change-transform hero-reveal"
        style={{ animationDelay: "0.05s" }}
      >
        <MagneticButton href={ctaHref} variant="dark">
          {ctaLabel}
        </MagneticButton>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1200px] mx-auto px-[clamp(24px,5vw,72px)] py-[clamp(140px,16vh,200px)]"
      >
        {/* Title — stays and repositions on scroll */}
        <h1
          ref={headlineRef}
          className="font-display font-medium leading-[0.95] tracking-[0.2em] text-[var(--patina-off-white)] mb-4 will-change-transform"
          style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
        >
          <span className="overflow-hidden inline-block">
            <span className="inline-block hero-text-reveal" style={{ animationDelay: "0.1s" }}>
              PATINA
            </span>
          </span>
        </h1>

        {/* Strata Mark — below title */}
        <div ref={strataRef} className="mb-6 hero-reveal will-change-transform" style={{ animationDelay: "0.2s" }}>
          <AnimatedStrataMark variant="reversed-gradient" size="large" align="left" delay={0.2} />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-display font-light italic tracking-[0.02em] text-[var(--patina-off-white)]/75 mb-8 hero-reveal will-change-transform"
          style={{ fontSize: "clamp(18px, 2.5vw, 28px)", animationDelay: "0.3s" }}
        >
          Where Time Adds Value
        </p>

        {/* Description — animates out on scroll */}
        <p
          data-desc
          className="font-body font-light text-[var(--patina-off-white)]/75 leading-[1.8] max-w-[480px] mb-11 hero-reveal will-change-transform"
          style={{ fontSize: "clamp(15px, 1.6vw, 18px)", animationDelay: "0.4s" }}
        >
          {description}
        </p>

        {/* CTA — animates out on scroll */}
        <div ref={ctaRef} className="hero-reveal will-change-transform" style={{ animationDelay: "0.5s" }}>
          <MagneticButton href={ctaHref} variant="dark">
            {ctaLabel}
          </MagneticButton>
          <p className="text-xs font-light text-[var(--patina-off-white)] opacity-50 mt-3.5 tracking-[0.02em]">
            Be among the first 200 to shape what we&apos;re building.
          </p>
        </div>
      </div>

      {/* Bottom Left — Trust Badges — animate out on scroll */}
      <div
        ref={badgesRef}
        className={cn(
          "absolute z-10 flex gap-6 hero-reveal will-change-transform max-[900px]:flex-col max-[900px]:gap-2",
          "bottom-[clamp(32px,5vh,56px)] left-[clamp(24px,5vw,72px)]"
        )}
        style={{ animationDelay: "0.5s" }}
      >
        {["200 Founding Spots", "15 Founding Makers", "50 Founding Designers", "Madison, WI"].map(
          (badge) => (
            <span
              key={badge}
              className="font-mono text-[10px] text-[var(--patina-off-white)] opacity-40 tracking-[0.06em]"
            >
              {badge}
            </span>
          )
        )}
      </div>

      {/* "Discover Patina" — emerges from black on scroll */}
      <div
        ref={discoverRef}
        className="absolute bottom-[clamp(60px,10vh,100px)] left-0 right-0 z-20 text-center pointer-events-none will-change-transform"
        style={{ opacity: 0 }}
      >
        <span style={{ fontSize: "clamp(24px, 4vw, 48px)" }}>
          <span className="font-display font-light italic tracking-[0.08em] text-[var(--patina-clay-beige)]">
            Discover
          </span>
          <span className="font-display font-medium tracking-[0.15em] text-[var(--patina-off-white)] ml-[0.3em]">
            Patina
          </span>
        </span>
        <div className="mt-5 flex justify-center">
          <StrataMark variant="reversed" size="medium" align="center" />
        </div>
      </div>
    </section>

    {/* Fixed Scroll Indicator — outside section, persists across page */}
    <div
      ref={scrollIndicatorRef}
      className={cn(
        "fixed z-40 flex flex-col items-center gap-2 hero-reveal",
        "bottom-[clamp(32px,5vh,56px)] right-[clamp(24px,5vw,72px)]",
        "max-[900px]:hidden"
      )}
      style={{ animationDelay: "0.6s" }}
    >
      <span
        ref={scrollTextRef}
        className="font-mono text-[9px] opacity-40 tracking-[0.15em] uppercase"
        style={{ writingMode: "vertical-rl", color: "var(--patina-off-white)" }}
      >
        Scroll
      </span>
      <div
        ref={scrollLineRef}
        className="w-px h-12 relative overflow-hidden"
        style={{ backgroundColor: "var(--patina-off-white)", opacity: 0.2 }}
      >
        <div
          ref={scrollPulseRef}
          className="absolute left-0 w-full h-full bg-[var(--patina-clay-beige)]"
          style={{ animation: "scrollLinePulse 2s ease-in-out infinite" }}
        />
      </div>
    </div>
    </>
  );
}
