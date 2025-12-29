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
        "flex flex-col items-center gap-2 cursor-pointer group",
        "text-[var(--patina-off-white)]/60 hover:text-[var(--patina-off-white)]",
        "transition-colors duration-300",
        className
      )}
    >
      <span className="text-xs tracking-[0.15em] uppercase font-medium">
        Scroll
      </span>
      <svg
        className={cn(
          "w-5 h-5",
          !prefersReducedMotion && "animate-[scrollBounce_1.5s_ease-in-out_infinite]"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
        />
      </svg>
    </button>
  );
}
