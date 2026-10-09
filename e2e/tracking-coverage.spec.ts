import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";
import { test, expect, type Page, type Request } from "@playwright/test";

/**
 * Tracking-coverage guard. Every public route must send a $pageview, and every
 * visible link or button in the header/nav, footer and main must produce a
 * PostHog event when clicked. PostHog runs with the dummy key from
 * playwright.config.ts; this spec intercepts /ingest so nothing leaves the browser.
 */

const CONSENT_KEY = "patina_analytics_consent";
const PROBE_ATTR = "data-sq-probe";
const CMS_ROUTES = new Set(["/journal", "/careers"]);
// posthog-js flushes its request queue every 3s.
const FLUSH_WAIT_MS = 8_000;

/** Static sitemap entries plus the routes the sitemap leaves out. */
function coveredRoutes(): string[] {
  const source = readFileSync(join(__dirname, "../src/app/sitemap.ts"), "utf8");
  const block = source.slice(source.indexOf("staticRoutes"), source.indexOf("let posts"));
  const paths = [...block.matchAll(/url:\s*(?:baseUrl|`\$\{baseUrl\}([^`]*)`)/g)].map(
    (m) => m[1] || "/",
  );
  return [...new Set([...paths, "/signup", "/makers/apply"])];
}

type CapturedEvent = {
  event: string;
  properties?: Record<string, unknown>;
};

function decodeBody(request: Request): CapturedEvent[] {
  const body = request.postDataBuffer();
  if (!body || body.length === 0) return [];
  let text: string;
  if (body[0] === 0x1f && body[1] === 0x8b) {
    text = gunzipSync(body).toString("utf8");
  } else {
    text = body.toString("utf8");
    if (text.startsWith("data=")) {
      text = Buffer.from(decodeURIComponent(text.slice(5)), "base64").toString("utf8");
    }
  }
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed?.batch)) return parsed.batch;
    return parsed?.event ? [parsed] : [];
  } catch {
    return [];
  }
}

/**
 * Fulfil every /ingest call locally and collect the events it carried.
 * posthog-js drops events from likely bots, and it reads navigator.webdriver
 * and the HeadlessChrome brand as bots, so the page presents as a plain browser.
 */
async function interceptIngest(page: Page): Promise<CapturedEvent[]> {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "webdriver", { get: () => false });
    Object.defineProperty(Navigator.prototype, "userAgentData", { get: () => undefined });
  });
  const events: CapturedEvent[] = [];
  await page.route("**/ingest/**", async (route) => {
    const { pathname } = new URL(route.request().url());
    if (pathname.includes("/static/") || pathname.endsWith(".js")) {
      return route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
    }
    // Remote config: autocapture stays off until the project config allows it,
    // as the live project does.
    if (pathname.endsWith("/config")) {
      return route.fulfill({ status: 200, contentType: "application/json", body: '{"autocapture_opt_out":false}' });
    }
    if (/\/(flags|decide)\b/.test(pathname)) {
      return route.fulfill({ status: 200, contentType: "application/json", body: '{"featureFlags":{}}' });
    }
    events.push(...decodeBody(route.request()));
    return route.fulfill({ status: 200, contentType: "application/json", body: '{"status":1}' });
  });
  return events;
}

function pageviewsFor(events: CapturedEvent[], path: string) {
  return events.filter((e) => {
    if (e.event !== "$pageview") return false;
    const url = e.properties?.$current_url;
    return typeof url === "string" && new URL(url).pathname === path;
  });
}

async function expectPageview(events: CapturedEvent[], path: string) {
  await expect
    .poll(() => pageviewsFor(events, path).length, {
      message: `no $pageview for ${path}. Is a dev server without the playwright.config env already on :3000?`,
      timeout: 20_000,
    })
    .toBeGreaterThan(0);
  return pageviewsFor(events, path)[0];
}

async function skipIfSanityDown(path: string, request: import("@playwright/test").APIRequestContext) {
  if (!CMS_ROUTES.has(path)) return;
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const query = encodeURIComponent('count(*[_type == "journalPost"])');
  const reachable = await request
    .get(`https://${id}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`, { timeout: 10_000 })
    .then((res) => res.ok())
    .catch(() => false);
  test.skip(!reachable, `${path} reads Sanity, and the Sanity CDN is unreachable`);
}

type Probe = { token: string; region: string; selector: string; text: string };

/** Tag every visible, enabled a/button in header/nav, footer and main. */
function markProbes(page: Page): Promise<Probe[]> {
  return page.evaluate((attr) => {
    const seen = new Set<Element>();
    const probes: Probe[] = [];
    const candidates = document.querySelectorAll(
      ["header", "nav", "footer", "main"].flatMap((r) => [`${r} a`, `${r} button`]).join(","),
    );
    for (const el of candidates) {
      if (seen.has(el)) continue;
      seen.add(el);
      const html = el as HTMLElement;
      if ((html as HTMLButtonElement).disabled) continue;
      if (!html.checkVisibility({ visibilityProperty: true })) continue;
      const rect = html.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const token = `sqp-${probes.length}-`;
      html.setAttribute(attr, token);
      const region = html.closest("footer") ? "footer" : html.closest("main") ? "main" : "nav";
      const id = html.id ? `#${html.id}` : "";
      const href = html.getAttribute("href");
      const label = html.getAttribute("aria-label");
      const selector =
        `${region} ${html.tagName.toLowerCase()}${id}` +
        (href ? `[href="${href}"]` : "") +
        (label ? `[aria-label="${label}"]` : "");
      const text = (html.innerText || "").replace(/\s+/g, " ").trim().slice(0, 60);
      probes.push({ token, region, selector, text });
    }
    return probes;
  }, PROBE_ATTR);
}

/** Stop links, forms and new tabs from leaving the page; React handlers still run. */
function preventNavigation(page: Page) {
  return page.evaluate(() => {
    window.addEventListener("click", (e) => e.preventDefault(), { capture: true });
  });
}

/** Click one probe in place; returns the page-clock window the click ran in. */
function clickProbe(page: Page, attr: string, token: string) {
  return page.evaluate(
    ([a, t]) => {
      const el = document.querySelector<HTMLElement>(`[${a}="${t}"]`);
      if (!el) return null;
      const before = Date.now();
      el.click();
      return { before, after: Date.now() };
    },
    [attr, token] as const,
  );
}

function autocaptureToken(event: CapturedEvent): string | undefined {
  const elements = event.properties?.$elements as Array<Record<string, unknown>> | undefined;
  if (elements?.[0]) return elements[0][`attr__${PROBE_ATTR}`] as string | undefined;
  const chain = event.properties?.$elements_chain;
  if (typeof chain !== "string") return undefined;
  return chain.split(";")[0].match(new RegExp(`${PROBE_ATTR}="(sqp-\\d+-)"`))?.[1];
}

type ClickSpan = { before: number; after: number };

/** An $autocapture tagged with the probe, or a named event fired during its click. */
function isCovered(events: CapturedEvent[], token: string, span: ClickSpan) {
  return events.some((e) => {
    if (e.event === "$autocapture") return autocaptureToken(e) === token;
    const time = e.properties?.$time; // epoch seconds from the page clock
    if (e.event.startsWith("$") || typeof time !== "number") return false;
    const at = time * 1000;
    return at >= span.before - 1 && at <= span.after + 1;
  });
}

const routes = coveredRoutes();

// Two ordered groups keep the dev server to two concurrent workers.
for (const group of [0, 1]) {
  test.describe(`tracking coverage (group ${group + 1})`, () => {
    test.describe.configure({ mode: "default" });

    for (const path of routes.filter((_, i) => i % 2 === group)) {
      test(`${path} pageviews and every link or button emits an event`, async ({ page, request, browser }, testInfo) => {
        test.setTimeout(180_000);
        await skipIfSanityDown(path, request);

        // Consented pass.
        await page.addInitScript(([key]) => localStorage.setItem(key, "granted"), [CONSENT_KEY]);
        const events = await interceptIngest(page);
        await page.goto(path);

        const pageview = await expectPageview(events, path);
        expect(pageview.properties?.surface, `${path} $pageview surface`).toBe("marketing-web");

        const probes = await markProbes(page);
        await preventNavigation(page);
        const clicked: Array<{ probe: Probe; span: ClickSpan | null }> = [];
        for (const probe of probes) {
          const span = await clickProbe(page, PROBE_ATTR, probe.token);
          clicked.push({ probe, span });
          await page.keyboard.press("Escape");
        }
        expect(new URL(page.url()).pathname, "a click navigated away").toBe(path);

        const uncovered = () =>
          clicked.filter(({ probe, span }) => !span || !isCovered(events, probe.token, span));
        const deadline = Date.now() + FLUSH_WAIT_MS;
        while (uncovered().length > 0 && Date.now() < deadline) await page.waitForTimeout(250);

        const failures = uncovered().map(({ probe, span }) =>
          `${path} | ${probe.selector} | "${probe.text}"${span ? "" : " (gone before its click)"}`,
        );
        await testInfo.attach("tracking-coverage.json", {
          body: JSON.stringify({ path, clicked: probes.length, failures }, null, 2),
          contentType: "application/json",
        });
        // Soft, so the full list and the no-consent pass still report.
        expect.soft(failures, `untracked elements on ${path}:\n${failures.join("\n")}`).toEqual([]);

        // No-consent pass: cookieless capture with no persistent PostHog cookie.
        const context = await browser.newContext();
        try {
          const fresh = await context.newPage();
          const anonEvents = await interceptIngest(fresh);
          await fresh.goto(path);
          const anonPageview = await expectPageview(anonEvents, path);
          expect(anonPageview.properties?.$cookieless_mode, `${path} pre-consent $pageview is cookieless`).toBe(true);
          const phCookies = (await context.cookies()).filter((c) => c.name.startsWith("ph_"));
          expect(phCookies.map((c) => c.name), `${path} set a PostHog cookie without consent`).toEqual([]);
        } finally {
          await context.close();
        }
      });
    }
  });
}
