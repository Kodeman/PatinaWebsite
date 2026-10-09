import { after } from "next/server";
import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

export function getServerPostHog(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;

  if (!posthogClient) {
    posthogClient = new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return posthogClient;
}

/** Keep this request's analytics delivery alive after the response on Workers. */
export function captureServerEvent(
  event: Parameters<PostHog["captureImmediate"]>[0],
): void {
  try {
    after(async () => {
      try {
        const posthog = getServerPostHog();
        // Await this event's network request instead of an isolate-wide queue.
        await posthog?.captureImmediate(event);
      } catch {
        // Analytics remains best-effort and cannot change the saved response.
      }
    });
  } catch {
    // Missing request context must not turn a saved lead into an API failure.
  }
}
