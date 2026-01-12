"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

interface ResponseMessageProps {
  message: string;
  isVisible: boolean;
  className?: string;
}

/**
 * ResponseMessage - Personalized feedback after palette selection
 * Slides in from below with fade animation
 */
export function ResponseMessage({ message, isVisible, className }: ResponseMessageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {isVisible && message && (
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={cn(
            "bg-black py-8 sm:py-12 px-4 sm:px-6 lg:px-8",
            className
          )}
        >
          <div className="max-w-[800px] mx-auto text-center">
            <motion.p
              key={message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
              className="text-[var(--patina-off-white)] text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed"
            >
              &ldquo;{message}&rdquo;
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
