"use client";

import { useCallback, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal({
  threshold = 0.08,
  rootMargin = "0px 0px -60px 0px",
  once = true,
}: UseScrollRevealOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(node);
          } else if (!once) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [threshold, rootMargin, once]
  );

  return { ref, isVisible };
}
