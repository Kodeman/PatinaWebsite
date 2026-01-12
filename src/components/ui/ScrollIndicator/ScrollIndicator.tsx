"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

export function ScrollIndicator({ targetId, className }: ScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to explore"
      className={cn(
        "flex flex-col items-center gap-3 cursor-pointer group",
        "text-[var(--patina-off-white)]/60 hover:text-[var(--patina-off-white)]",
        "transition-colors duration-300",
        className
      )}
    >
      <span className="text-[0.7rem] tracking-[0.2em] uppercase font-medium">
        Explore
      </span>
      <div
        className={cn(
          "w-[1px] h-10",
          "bg-gradient-to-b from-current to-transparent",
          !prefersReducedMotion && "animate-[scrollPulse_2s_ease-in-out_infinite]"
        )}
      />
    </button>
  );
}
