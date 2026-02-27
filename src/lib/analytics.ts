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
