import posthog from "posthog-js";

const CONSENT_KEY = "patina_analytics_consent";

export type ConsentStatus = "granted" | "denied" | null;

export function getConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CONSENT_KEY) as ConsentStatus;
  } catch {
    return null;
  }
}

export function setConsent(status: "granted" | "denied"): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_KEY, status);
  } catch {
    // localStorage unavailable
  }

  const client = getPostHogClient();
  if (!client) return;

  if (status === "granted") {
    client.opt_in_capturing();
  } else {
    client.opt_out_capturing();
  }
}

export function getPostHogClient() {
  if (typeof window === "undefined") return null;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;

  // Skip in dev unless explicitly opted in — PostHog network failures pollute
  // the Next.js dev error overlay and mask real application errors.
  if (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_POSTHOG_ENABLE_IN_DEV !== "true"
  ) {
    return null;
  }

  if (!posthog.__loaded) {
    const consent = getConsent();
    const dnt = navigator.doNotTrack === "1";

    posthog.init(key, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      persistence: "localStorage+cookie",
      enable_recording_console_log: false,
      opt_out_capturing_by_default: dnt || consent !== "granted",
    });

    // `surface` super-property — rides on every event from this app
    // (custom captures, autocapture, $pageview). Primary segmentation key
    // across all Patina surfaces (designer-web, client-web, admin-web,
    // extension, patina-ios, field-ios, marketing-web). See
    // patina-merged/docs/analytics/event-conventions.md.
    posthog.register({ surface: "marketing-web" });

    // If user previously granted consent (and no DNT), opt back in
    if (consent === "granted" && !dnt) {
      posthog.opt_in_capturing();
    }
  }

  return posthog;
}
