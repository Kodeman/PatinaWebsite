const STORAGE_KEY = "patina_attribution";
const ATTRIBUTION_WINDOW_DAYS = 30;

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
}

export interface Attribution {
  first_touch: UTMParams & { timestamp: number; referrer: string };
  last_touch: UTMParams & { timestamp: number; referrer: string };
}

export type Channel = "organic" | "paid" | "social" | "referral" | "direct";

function getUTMFromURL(): UTMParams {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
    "msclkid",
  ] as const;
  for (const key of keys) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

function hasUTM(params: UTMParams): boolean {
  return Object.values(params).some(Boolean);
}

function isExpired(timestamp: number): boolean {
  const now = Date.now();
  return now - timestamp > ATTRIBUTION_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const utm = getUTMFromURL();
  const referrer = document.referrer || "";

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let attribution: Attribution | null = stored ? JSON.parse(stored) : null;

    if (attribution && isExpired(attribution.first_touch.timestamp)) {
      attribution = null;
    }

    const touchData = { ...utm, timestamp: Date.now(), referrer };

    if (!attribution) {
      attribution = { first_touch: touchData, last_touch: touchData };
    } else if (hasUTM(utm)) {
      attribution.last_touch = touchData;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));

    // Register UTM as PostHog super properties
    if (hasUTM(utm)) {
      import("./posthog").then(({ getPostHogClient }) => {
        const posthog = getPostHogClient();
        posthog?.register({
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
          utm_term: utm.utm_term,
          gclid: utm.gclid,
          fbclid: utm.fbclid,
          msclkid: utm.msclkid,
        });
      });
    }
  } catch {
    // localStorage unavailable
  }
}

/**
 * Classify the marketing channel for an attribution record.
 *
 * Uses last_touch utm_medium/utm_source + click IDs, falling back to the
 * referrer when UTM data is absent:
 *  - paid:     cpc/ppc/paid mediums, or a gclid/fbclid/msclkid click ID
 *  - social:   known social networks via utm_source or referrer
 *  - organic:  organic search mediums or a search-engine referrer
 *  - referral: any other non-empty external referrer
 *  - direct:   no signal at all
 */
export function classifyChannel(attribution: Attribution | null): Channel {
  if (!attribution) return "direct";

  const touch = attribution.last_touch;
  const medium = (touch.utm_medium || "").toLowerCase();
  const source = (touch.utm_source || "").toLowerCase();
  const referrer = (touch.referrer || "").toLowerCase();
  const hasClickId = Boolean(touch.gclid || touch.fbclid || touch.msclkid);

  // Paid: explicit paid mediums or a paid-click identifier
  if (/cpc|ppc|paid|paidsearch|paid_search/.test(medium) || hasClickId) {
    return "paid";
  }

  const socialNetworks = [
    "facebook",
    "instagram",
    "twitter",
    "x.com",
    "linkedin",
    "pinterest",
    "tiktok",
    "youtube",
    "reddit",
    "snapchat",
    "threads",
  ];
  const isSocial =
    /social|paid_social/.test(medium) ||
    socialNetworks.some((n) => source.includes(n) || referrer.includes(n));
  if (isSocial) return "social";

  const searchEngines = ["google", "bing", "yahoo", "duckduckgo", "ecosia", "baidu"];
  const isOrganicSearch =
    /organic/.test(medium) ||
    (!medium && searchEngines.some((s) => referrer.includes(s)));
  if (isOrganicSearch) return "organic";

  // Any other external referrer
  if (referrer) return "referral";

  return "direct";
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const attribution: Attribution = JSON.parse(stored);
    if (isExpired(attribution.first_touch.timestamp)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return attribution;
  } catch {
    return null;
  }
}
