"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
  children: ReactNode;
  className?: string;
  /** Scroll progress (0-1) at which reveal begins */
  revealStart?: number;
  /** Scroll progress (0-1) at which reveal completes */
  revealEnd?: number;
  /** Optional external scroll progress to sync with parent */
  scrollProgress?: MotionValue<number>;
}

/**
 * Text that fades in based on scroll position.
 * Can use its own scroll tracking or sync with a parent's scroll progress.
 */
export function ScrollRevealText({
  children,
  className,
  revealStart = 0,
  revealEnd = 0.3,
  scrollProgress: externalProgress,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Use internal scroll tracking if no external progress provided
  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scrollProgress = externalProgress || internalProgress;

  // Map scroll progress to opacity
  const opacity = useTransform(
    scrollProgress,
    [revealStart, revealEnd],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );

  // Subtle Y movement for non-reduced motion
  const y = useTransform(
    scrollProgress,
    [revealStart, revealEnd],
    prefersReducedMotion ? [0, 0] : [20, 0]
  );

  return (
    <motion.div
      ref={containerRef}
      className={cn(className)}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}
