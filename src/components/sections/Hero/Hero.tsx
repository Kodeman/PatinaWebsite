"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { MinimalNav } from "@/components/layout/MinimalNav";
import { StickyNav } from "@/components/layout/StickyNav";

export interface HeroProps {
  title: string;
  titleEmphasis?: string;
  description: string;
  /** Secondary line displayed below description, styled in brand accent color */
  secondaryLine?: string;
  provenanceLine?: string;
  trustLine?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  imageUrl?: string;
  imagePlaceholder?: string;
  /** ID of the section to scroll to when clicking the scroll indicator */
  scrollTargetId?: string;
}

/**
 * Hero Section - "The Morning Light" design
 * Full viewport immersive hero with gradient overlay and scroll-reveal navigation
 */
export function Hero({
  title,
  titleEmphasis,
  description,
  secondaryLine,
  trustLine = "Trusted by 10,000+ design enthusiasts",
  primaryCta,
  imageUrl,
  imagePlaceholder = "Hero Photography",
  scrollTargetId = "value-proposition",
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const elementHeight = sectionRef.current.offsetHeight;
        const progress = Math.min(window.scrollY / elementHeight, 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split title if emphasis is provided
  const titleParts = titleEmphasis ? title.split(titleEmphasis) : [title];

  // Navigation visibility logic
  const minimalNavOpacity = 1 - scrollProgress / 0.5; // Fades out by 50% scroll
  const showStickyNav = scrollProgress >= 0.7;

  // Parallax offset for background image
  const parallaxOffset = prefersReducedMotion ? 0 : scrollProgress * 100;

  // Fade-to-black overlay using Framer Motion scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Black overlay opacity: starts at 30% scroll, complete at 60%
  const blackOverlayOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.6],
    prefersReducedMotion ? [0, 0] : [0, 1]
  );

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 1.2,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <>
      {/* Navigation Components */}
      <MinimalNav opacity={Math.max(0, minimalNavOpacity)} />
      <StickyNav isVisible={showStickyNav} />

      <section
        ref={sectionRef}
        className={cn(
          "relative overflow-hidden",
          "min-h-screen min-h-[100dvh]", // 100vh with dynamic viewport fallback
          "flex flex-col justify-end" // Content at bottom
        )}
        id="hero"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Featured furniture in natural setting"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{
                transform: `translateY(${parallaxOffset}px) scale(1.1)`,
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--patina-warm-white)]">
              {/* Radial gradient overlays for depth */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(163, 146, 124, 0.08) 0%, transparent 50%),
                    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(212, 165, 116, 0.06) 0%, transparent 50%),
                    linear-gradient(180deg, var(--patina-warm-white) 0%, var(--patina-off-white) 100%)
                  `,
                }}
              />
            </div>
          )}

          {/* Gradient Overlay for Text Legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to top,
                rgba(63, 59, 55, 0.8) 0%,
                rgba(63, 59, 55, 0.5) 30%,
                rgba(63, 59, 55, 0.2) 60%,
                transparent 100%
              )`,
            }}
          />

          {/* Fade-to-Black Overlay - Transitions Hero into Void */}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none z-10"
            style={{ opacity: blackOverlayOpacity }}
            aria-hidden="true"
          />
        </div>

        {/* Content Container */}
        <motion.div
          className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 lg:pb-32 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <motion.h1
            className="text-display-1 text-[var(--patina-off-white)] mb-6 max-w-[720px]"
            variants={itemVariants}
          >
            {titleParts[0]}
            {titleEmphasis && (
              <em className="italic text-[var(--patina-clay-beige)]">
                {titleEmphasis}
              </em>
            )}
            {titleParts[1]}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg lg:text-xl text-[var(--patina-off-white)]/90 leading-relaxed mb-4 max-w-[500px]"
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {/* Secondary Line - Aesthete Engine positioning */}
          {secondaryLine && (
            <motion.p
              className="text-base text-[var(--patina-clay-beige)] mb-8 max-w-[500px]"
              variants={itemVariants}
            >
              {secondaryLine}
            </motion.p>
          )}

          {/* CTA Button - Single focus */}
          {primaryCta && (
            <motion.div variants={itemVariants} className="mb-8">
              <Link
                href={primaryCta.href}
                className={cn(
                  "inline-flex items-center justify-center",
                  "px-8 py-4 text-[0.9375rem] font-medium",
                  "bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)]",
                  "rounded-[var(--radius-lg)]",
                  "transition-all duration-300 ease-[var(--ease-patina)]",
                  "hover:bg-[var(--patina-off-white)]",
                  "shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
                  "hover:shadow-[0_6px_30px_rgba(0,0,0,0.3)]"
                )}
              >
                {primaryCta.label}
              </Link>
            </motion.div>
          )}

          {/* Trust Line */}
          {trustLine && (
            <motion.p
              className="text-sm text-[var(--patina-off-white)]/60"
              variants={fadeVariants}
            >
              {trustLine}
            </motion.p>
          )}
        </motion.div>

        {/* Scroll Indicator - Centered at bottom */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate="visible"
        >
          <ScrollIndicator targetId={scrollTargetId} />
        </motion.div>
      </section>
    </>
  );
}
