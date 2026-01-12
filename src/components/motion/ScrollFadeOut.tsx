"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks";

interface ScrollFadeOutProps {
  children: ReactNode;
  className?: string;
  /** Scroll progress (0-1) at which fade begins */
  fadeStart?: number;
  /** Scroll progress (0-1) at which fade completes */
  fadeEnd?: number;
}

/**
 * Wraps content with a black overlay that fades in as user scrolls.
 * Used for Hero fade-to-black transition into the Void section.
 */
export function ScrollFadeOut({
  children,
  className,
  fadeStart = 0.7,
  fadeEnd = 1,
}: ScrollFadeOutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress to overlay opacity
  const overlayOpacity = useTransform(
    scrollYProgress,
    [fadeStart, fadeEnd],
    prefersReducedMotion ? [0, 0] : [0, 1]
  );

  return (
    <div ref={containerRef} className={className} style={{ position: "relative" }}>
      {children}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000",
          opacity: overlayOpacity,
          pointerEvents: "none",
          zIndex: 10,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
