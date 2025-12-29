"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StrataMark } from "@/components/ui/StrataMark";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MinimalNavProps {
  /** Opacity value from 0 to 1, controlled by scroll progress */
  opacity?: number;
}

/**
 * MinimalNav - Transparent navigation for the hero section
 * Shows only logo + subtle CTA, fades out on scroll
 */
export function MinimalNav({ opacity = 1 }: MinimalNavProps) {
  const prefersReducedMotion = useReducedMotion();

  // Don't render if fully faded out
  if (opacity <= 0) return null;

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        "pointer-events-auto"
      )}
      style={{
        opacity: prefersReducedMotion ? (opacity > 0.5 ? 1 : 0) : opacity,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: prefersReducedMotion ? 1 : opacity }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-[60px] lg:h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <span className="font-display text-xl font-medium tracking-[0.2em] text-[var(--patina-off-white)]">
              PATINA
            </span>
            <StrataMark size="compact" variant="reversed" align="left" />
          </Link>

          {/* Subtle CTA - Hidden on mobile */}
          <Link
            href="/app"
            className={cn(
              "hidden sm:inline-flex items-center justify-center",
              "px-4 py-2 text-sm font-medium",
              "border border-[var(--patina-off-white)]/30",
              "text-[var(--patina-off-white)]/80 hover:text-[var(--patina-off-white)]",
              "hover:border-[var(--patina-off-white)]/50 hover:bg-[var(--patina-off-white)]/5",
              "rounded-[var(--radius-lg)]",
              "transition-all duration-300"
            )}
          >
            Get the App
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
