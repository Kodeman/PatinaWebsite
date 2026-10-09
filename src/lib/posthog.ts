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

// Whether this browser session may load PostHog at all.
function analyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;

  // Do Not Track means nothing at all. posthog-js's own respect_dnt treats DNT
  // as a rejection, which cookieless "on_reject" would still capture, so the
  // client is never initialised for these visitors.
  if (navigator.doNotTrack === "1") return false;

  // Skip in dev unless explicitly opted in — PostHog network failures pollute
  // the Next.js dev error overlay and mask real application errors.
  return (
    process.env.NODE_ENV !== "development" ||
    process.env.NEXT_PUBLIC_POSTHOG_ENABLE_IN_DEV === "true"
  );
}

function initPostHog(key: string): void {
  const consent = getConsent();

  // No choice yet or Decline: opted out by default, which "on_reject" turns
  // into cookieless capture (no cookies or storage identity; the server hashes
  // an aggregate id). Accept: opt_in_capturing switches to normal persistence.
  // The PostHog project must have cookieless mode enabled, or these events
  // are dropped at ingestion.
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    cookieless_mode: "on_reject",
    autocapture: true,
    capture_dead_clicks: true,
    enable_heatmaps: true,
    capture_pageview: false,
    capture_pageleave: true,
    persistence: "localStorage+cookie",
    respect_dnt: true,
    enable_recording_console_log: false,
    opt_out_capturing_by_default: consent !== "granted",
  });

  // `surface` super-property — rides on every event from this app
  // (custom captures, autocapture, $pageview). Primary segmentation key
  // across all Patina surfaces (designer-web, client-web, admin-web,
  // extension, patina-ios, field-ios, marketing-web). See
  // patina-merged/docs/analytics/event-conventions.md.
  posthog.register({ surface: "marketing-web" });

  // If user previously granted consent, opt back in
  if (consent === "granted") {
    posthog.opt_in_capturing();
  }
}

export function getPostHogClient() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || !analyticsAllowed()) return null;

  if (!posthog.__loaded) initPostHog(key);
  return posthog;
}
