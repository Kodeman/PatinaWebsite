"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { getPostHogClient } from "@/lib/posthog";
import { captureAttribution } from "@/lib/attribution";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const posthog = getPostHogClient();
    if (!posthog || !pathname) return;

    let url = window.origin + pathname;
    if (searchParams.toString()) {
      url += "?" + searchParams.toString();
    }

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    getPostHogClient();
    captureAttribution();
  }, []);

  const posthog = typeof window !== "undefined" ? getPostHogClient() : null;

  if (!posthog) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
