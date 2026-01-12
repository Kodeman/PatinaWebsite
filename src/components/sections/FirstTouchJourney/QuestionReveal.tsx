"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

interface QuestionRevealProps {
  className?: string;
}

/**
 * QuestionReveal - Fixed center text with scroll-triggered animations
 * Text is fixed in viewport center, animates in, then scrolls off after fully rendered
 */
export function QuestionReveal({ className }: QuestionRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],  // Track from section top at viewport top to section bottom at viewport top
  });

  // scrollYProgress: 0 = section just started, 1 = section has scrolled completely past viewport top
  // With 300vh section: animations in first ~20%, then visible, then scroll off

  // Eyebrow - fades in early
  const eyebrowOpacity = useTransform(
    scrollYProgress,
    [0, 0.08],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );

  // Main question - starts after eyebrow, scale 65% → 100%
  const mainOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.16],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );
  const mainScale = useTransform(
    scrollYProgress,
    [0.08, 0.16],
    prefersReducedMotion ? [1, 1] : [0.65, 1]
  );

  // Subtitle - follows main
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0.16, 0.22],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );
  const subtitleScale = useTransform(
    scrollYProgress,
    [0.16, 0.22],
    prefersReducedMotion ? [1, 1] : [0.85, 1]
  );

  // Container visibility - hidden before section, visible during, hidden after
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.9, 1],
    [0, 1, 1, 0]
  );

  // Content Y position - stays at 0 until animations done, then scrolls up
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.65, 1],
    ["0vh", "0vh", "0vh", "-100vh"]
  );

  // Scroll indicator - appears immediately when section starts (Hero's Explore scrolling away)
  // Fades out as content starts scrolling off
  const indicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.55, 0.65],
    prefersReducedMotion ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative bg-black",
        "h-[300vh]",  // Tall section: animations + hold + scroll off
        className
      )}
    >
      {/* Fixed content container */}
      <motion.div
        style={{ y: contentY, opacity: containerOpacity }}
        className={cn(
          "fixed inset-0",
          "flex items-center justify-center",
          "px-4 sm:px-6 lg:px-8",
          "pointer-events-none z-20"
        )}
      >
        <div className="max-w-[900px] mx-auto text-center">
          {/* Eyebrow - fades in first */}
          <motion.p
            style={{ opacity: eyebrowOpacity }}
            className="text-label text-[var(--patina-clay-beige)] mb-6 sm:mb-8"
          >
            First, a question
          </motion.p>

          {/* Main Question - Display font with highlight */}
          <motion.h2
            style={{ opacity: mainOpacity, scale: mainScale }}
            className="font-display text-[var(--patina-off-white)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6 sm:mb-8"
          >
            What world do you want{" "}
            <em className="italic text-[var(--patina-clay-beige)]">
              to live in?
            </em>
          </motion.h2>

          {/* Subtitle - Body font, muted */}
          <motion.p
            style={{ opacity: subtitleOpacity, scale: subtitleScale }}
            className="font-body text-[var(--patina-off-white)]/60 text-lg sm:text-xl md:text-2xl font-light tracking-wide"
          >
            Choose the one that feels like home.
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator - fixed to bottom, appears when Hero's Explore scrolls away */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-3 text-[var(--patina-off-white)]/60">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase font-medium">
            Scroll
          </span>
          <div
            className={cn(
              "w-[1px] h-10",
              "bg-gradient-to-b from-current to-transparent",
              !prefersReducedMotion && "animate-[scrollPulse_2s_ease-in-out_infinite]"
            )}
          />
        </div>
      </motion.div>
    </section>
  );
}
