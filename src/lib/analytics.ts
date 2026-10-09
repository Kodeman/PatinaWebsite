/**
 * Analytics utility for tracking user interactions
 *
 * Logs to console in development, sends to PostHog in production.
 */

import { getPostHogClient } from "./posthog";

type AnalyticsEvents = {
  // Lead events. These names are locked: the API routes fire them server-side
  // once per signup, so the client never sends them.
  contact_form_submitted: {
    reason: string;
  };
  maker_application_submitted: {
    email_domain: string;
    has_company: boolean;
    has_website: boolean;
    has_motivation: boolean;
  };
  designer_application_submitted: {
    email_domain: string;
    has_company: boolean;
    has_website: boolean;
    has_motivation: boolean;
  };
  founding_circle_signup: {
    email_domain: string;
    source: string;
    signup_page: string;
    cta_text: string;
    has_utm: boolean;
    preferred_styles?: string[];
    referrer?: string;
    role?: string;
    channel?: string;
  };
  newsletter_signup: {
    email_domain: string;
    source: string;
    signup_page: string;
    has_utm: boolean;
    role?: string;
    channel?: string;
  };
  // Legacy alias
  waitlist_signup: {
    email_domain: string;
    source: string;
    signup_page: string;
    cta_text: string;
    has_utm: boolean;
  };

  // Cross-platform identity
  user_identified: {
    platform: string;
    identification_method: string;
  };

  // Navigation
  nav_link_clicked: {
    label: string;
    href: string;
    location?: string;
  };

  // Founding Circle
  founding_cta_click: {
    source: string;
    element_location: 'hero' | 'nav' | 'footer' | 'inline' | 'mobile_menu';
  };

  founding_modal_opened: {
    source: string;
    cta_text?: string;
  };

  founding_modal_closed: {
    reason: 'x' | 'esc' | 'outside' | 'success';
  };

  // Maker recruitment
  maker_apply_click: {
    source: string;
  };

  // Consent
  consent_updated: {
    status: "granted" | "denied";
    previous_status: "granted" | "denied" | "none";
  };

  // CTA interactions
  cta_click: {
    cta_text: string;
    cta_location: string;
    destination: string;
    page: string;
  };
};

type EventName = keyof AnalyticsEvents;
type EventData<T extends EventName> = AnalyticsEvents[T];

class Analytics {
  private isProduction = process.env.NODE_ENV === "production";

  /**
   * Track an analytics event
   *
   * Always sends to PostHog when initialized (regardless of NODE_ENV) so dev
   * environments can verify event wiring before production. Also logs to
   * console in dev for local debugging visibility.
   */
  track<T extends EventName>(eventName: T, data: EventData<T>): void {
    if (typeof window === "undefined") return;

    if (!this.isProduction) {
      console.log(`[Analytics] ${eventName}`, data);
    }

    const posthog = getPostHogClient();
    posthog?.capture(eventName, data);
  }

  /**
   * Identify user (for logged-in users)
   */
  identify(userId: string, traits?: Record<string, unknown>): void {
    if (typeof window === "undefined") return;

    if (!this.isProduction) {
      console.log(`[Analytics] identify`, { userId, traits });
    }

    const posthog = getPostHogClient();
    posthog?.identify(userId, traits);
  }
}

// Singleton instance
export const analytics = new Analytics();

// Type-safe track function
export function track<T extends EventName>(
  eventName: T,
  data: EventData<T>
): void {
  analytics.track(eventName, data);
}
