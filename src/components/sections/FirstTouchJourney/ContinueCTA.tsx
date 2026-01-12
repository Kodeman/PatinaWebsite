"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

interface ContinueCTAProps {
  isVisible: boolean;
  targetId: string;
  className?: string;
}

/**
 * ContinueCTA - Scroll-to-next-section button
 * Appears after palette selection, triggers smooth scroll
 */
export function ContinueCTA({ isVisible, targetId, className }: ContinueCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            delay: prefersReducedMotion ? 0 : 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={cn(
            "bg-black pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8",
            className
          )}
        >
          <div className="max-w-[800px] mx-auto text-center">
            <button
              type="button"
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              className={cn(
                "inline-flex items-center justify-center gap-3",
                "px-10 py-4 text-base font-medium",
                "bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)]",
                "rounded-full",
                "transition-all duration-300 ease-[var(--ease-patina)]",
                "hover:bg-[var(--patina-off-white)]",
                "hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patina-off-white)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              )}
            >
              <span>Continue</span>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
