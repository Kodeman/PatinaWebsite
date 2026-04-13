"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedStrataMark } from "@/components/ui/AnimatedStrataMark";

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

          // --- Background: fade to black (0→0.4 progress = 0→1 opacity) ---
          if (blackOverlayRef.current) {
            const blackOpacity = clamp(progress / 0.4, 0, 1);
            blackOverlayRef.current.style.opacity = String(blackOpacity);
          }

          // --- Secondary content: fade out fast (0→0.15 progress) ---
          const fadeOutProgress = clamp(progress / 0.15, 0, 1);
          const fadeOutOpacity = 1 - fadeOutProgress;
          const fadeOutY = fadeOutProgress * 40;

          if (ctaRef.current) {
            ctaRef.current.style.opacity = String(fadeOutOpacity);
            ctaRef.current.style.transform = `translateY(${fadeOutY}px)`;
          }
          if (topBarRef.current) {
            topBarRef.current.style.opacity = String(fadeOutOpacity);
            topBarRef.current.style.transform = `translateY(-${fadeOutProgress * 20}px)`;
          }
          if (badgesRef.current) {
            badgesRef.current.style.opacity = String(fadeOutOpacity * 0.4); // badges start at 0.4 opacity
            badgesRef.current.style.transform = `translateY(${fadeOutY}px)`;
          }

          // Description fades slightly slower
          const descEl = contentRef.current?.querySelector("[data-desc]") as HTMLElement | null;
          if (descEl) {
            const descFade = clamp(progress / 0.2, 0, 1);
            descEl.style.opacity = String(0.75 * (1 - descFade));
            descEl.style.transform = `translateY(${descFade * 30}px)`;
          }

          // --- Headline: translate to bottom + scale down ---
          if (headlineRef.current) {
            const headlineMoveProgress = clamp(progress / 0.35, 0, 1);
            const eased = 1 - Math.pow(1 - headlineMoveProgress, 3); // ease-out cubic

            const targetY = vh * 0.45;
            const headlineY = lerp(0, targetY, eased);
            const headlineScale = lerp(1, 0.45, eased);

            headlineRef.current.style.transform = `translateY(${headlineY}px) scale(${headlineScale})`;
            headlineRef.current.style.transformOrigin = "left bottom";

            // Fade out headline after it's settled (progress 0.6→0.9)
            const headlineFadeProgress = clamp((progress - 0.6) / 0.3, 0, 1);
            headlineRef.current.style.opacity = String(1 - headlineFadeProgress);
          }

          // --- Strata mark + tagline: fade out with description ---
          if (strataRef.current) {
            const strataFade = clamp(progress / 0.2, 0, 1);
            strataRef.current.style.opacity = String(1 - strataFade);
            strataRef.current.style.transform = `translateY(${strataFade * 30}px)`;
          }
          if (taglineRef.current) {
            const taglineFade = clamp(progress / 0.2, 0, 1);
            taglineRef.current.style.opacity = String(0.75 * (1 - taglineFade));
            taglineRef.current.style.transform = `translateY(${taglineFade * 30}px)`;
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
