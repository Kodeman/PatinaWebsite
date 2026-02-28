const STORAGE_KEY = "patina_attribution";
const ATTRIBUTION_WINDOW_DAYS = 30;

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

interface Attribution {
  first_touch: UTMParams & { timestamp: number; referrer: string };
  last_touch: UTMParams & { timestamp: number; referrer: string };
}

function getUTMFromURL(): UTMParams {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
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
        });
      });
    }
  } catch {
    // localStorage unavailable
  }
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
