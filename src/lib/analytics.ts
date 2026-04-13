/**
 * Analytics utility for tracking user interactions
 *
 * Logs to console in development, sends to PostHog in production.
 */

import { getPostHogClient } from "./posthog";

type ProductEventData = {
  product_id: string;
  product_name?: string;
  price?: number;
  category?: string;
  maker?: string;
};

type AnalyticsEvents = {
  // Product discovery
  product_card_viewed: ProductEventData & {
    position: number;
    source: "catalog" | "related" | "search" | "homepage";
  };
  product_card_clicked: ProductEventData & {
    position: number;
  };

  // Product detail engagement
  product_detail_viewed: ProductEventData & {
    referrer: string;
  };
  image_gallery_scrolled: ProductEventData & {
    image_index: number;
  };
  material_chip_clicked: ProductEventData & {
    material: string;
  };

  // AR and visualization
  view_in_space_clicked: ProductEventData & {
    device_type: "ios" | "android" | "desktop";
  };
  ar_qr_code_shown: ProductEventData;

  // Conversion actions
  work_with_designer_clicked: {
    source: "pdp" | "services" | "hero" | "nav";
    product_id?: string;
  };
  app_download_clicked: {
    source: "header" | "hero" | "footer" | "app_page";
  };

  // Search
  search_opened: Record<string, never>;
  search_query: {
    query: string;
    results_count: number;
  };
  search_result_clicked: {
    query: string;
    result_type: "product" | "maker" | "material" | "page";
    result_title: string;
    position: number;
  };

  // Contact and forms
  contact_form_submitted: {
    reason: string;
  };
  maker_application_submitted: {
    specialty: string;
    location: string;
  };

  // Navigation
  page_viewed: {
    path: string;
    title: string;
  };
  nav_link_clicked: {
    label: string;
    href: string;
  };

  // Filter interactions
  filter_applied: {
    filter_type: "category" | "price" | "sort";
    filter_value: string;
  };
  filter_cleared: Record<string, never>;

  // Founding Circle
  founding_circle_signup: {
    email_domain: string;
    source: string;
    signup_page: string;
    cta_text: string;
    has_utm: boolean;
    preferred_styles?: string[];
    referrer?: string;
  };

  founding_cta_click: {
    source: string;
    element_location: 'hero' | 'nav' | 'footer' | 'inline' | 'mobile_menu';
  };

  // Style selection
  style_card_selected: {
    style_name: string;
    selection_count: number;
  };

  style_cta_click: {
    styles_selected: string[];
  };

  // App features
  app_feature_status_view: {
    feature_name: string;
    status: 'in-development' | 'founding-first' | 'at-launch';
  };

  // Maker recruitment
  maker_apply_click: {
    source: string;
  };

  // Newsletter
  newsletter_signup: {
    email_domain: string;
    source: string;
    signup_page: string;
    has_utm: boolean;
  };

  // Consent
  consent_updated: {
    status: "granted" | "denied";
    previous_status: "granted" | "denied" | "none";
  };

  // Legacy alias
  waitlist_signup: {
    email_domain: string;
    source: string;
    signup_page: string;
    cta_text: string;
    has_utm: boolean;
  };

  // CTA interactions
  cta_click: {
    cta_text: string;
    cta_location: string;
    destination: string;
    page: string;
  };

  // Content engagement
  scroll_depth_reached: {
    depth: 25 | 50 | 75 | 100;
    page: string;
  };

  // Room & Promise sections
  promise_section_viewed: Record<string, never>;
  room_hotspot_clicked: {
    hotspot_id: string;
    product_name: string;
    tier: "partner" | "curated" | "sourced";
  };
  room_hotspot_tier: {
    tier: "partner" | "curated" | "sourced";
    interaction_count: number;
  };
  room_summary_viewed: {
    total_products: number;
    partner_count: number;
    curated_count: number;
    sourced_count: number;
  };
  shop_this_room_clicked: {
    source: string;
    total_products: number;
  };
};

type EventName = keyof AnalyticsEvents;
type EventData<T extends EventName> = AnalyticsEvents[T];

class Analytics {
  private isProduction = process.env.NODE_ENV === "production";

  /**
   * Track an analytics event
   */
  track<T extends EventName>(eventName: T, data: EventData<T>): void {
    if (typeof window === "undefined") return;

    // Log in development
    if (!this.isProduction) {
      console.log(`[Analytics] ${eventName}`, data);
    }

    if (this.isProduction) {
      const posthog = getPostHogClient();
      posthog?.capture(eventName, data);
    }
  }

  /**
   * Track page view
   */
  pageView(path: string, title: string): void {
    this.track("page_viewed", { path, title });
  }

  /**
   * Identify user (for logged-in users)
   */
  identify(userId: string, traits?: Record<string, unknown>): void {
    if (typeof window === "undefined") return;

    if (!this.isProduction) {
      console.log(`[Analytics] identify`, { userId, traits });
    }

    if (this.isProduction) {
      const posthog = getPostHogClient();
      posthog?.identify(userId, traits);
    }
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
