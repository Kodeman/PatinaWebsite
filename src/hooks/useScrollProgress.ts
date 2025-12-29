"use client";

import { useState, useEffect, RefObject } from "react";

/**
 * Hook to track scroll progress as a percentage of an element's height
 * Returns a value between 0 and 1
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const elementHeight = ref.current.offsetHeight;
      const scrollY = window.scrollY;
      const newProgress = Math.min(scrollY / elementHeight, 1);

      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}
