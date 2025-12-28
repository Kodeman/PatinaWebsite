"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/analytics";

/**
 * Track page views automatically
 * Add to root layout or specific page components
 */
export function usePageView(title?: string) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      analytics.pageView(pathname, title || document.title);
    }
  }, [pathname, title]);
}
