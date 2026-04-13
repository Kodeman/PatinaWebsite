"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextClipRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function TextClipReveal({
  children,
  className,
  delay = 0,
}: TextClipRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  // Double rAF ensures initial state is painted before triggering transition
  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  return (
    <span className={cn("overflow-hidden inline-block", className)}>
      <span
        className="inline-block"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : isVisible
              ? "translateY(0)"
              : "translateY(105%)",
          transition: prefersReducedMotion
            ? "none"
            : `transform 1.1s var(--ease-out-expo) ${delay}s`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
