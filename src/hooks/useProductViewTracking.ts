"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

interface ProductViewData {
  product_id: string;
  product_name?: string;
  price?: number;
  category?: string;
  maker?: string;
  position: number;
  source: "catalog" | "related" | "search" | "homepage";
}

interface UseProductViewTrackingOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook to track when a product card enters the viewport
 * Tracks only once per product per page load
 */
export function useProductViewTracking<T extends HTMLElement = HTMLDivElement>(
  data: ProductViewData,
  options: UseProductViewTrackingOptions = {}
): React.RefObject<T | null> {
  const { threshold = 0.5, rootMargin = "0px" } = options;
  const ref = useRef<T>(null);
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasTracked) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked) {
          track("product_card_viewed", data);
          setHasTracked(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [data, threshold, rootMargin, hasTracked]);

  return ref;
}
