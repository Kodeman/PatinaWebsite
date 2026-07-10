"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { systemMessages } from "@/lib/copy/system-messages";

const MESSAGES: Record<string, string> = {
  confirmed: systemMessages.newsletter.confirmed,
  invalid: systemMessages.newsletter.confirmInvalid,
  error: systemMessages.newsletter.confirmError,
};

/**
 * Consumes the ?newsletter=confirmed|invalid|error param the newsletter
 * confirm route redirects to. Without this, clicking "confirm" in the email
 * dead-ended on the homepage with no feedback. Dismissible; also strips the
 * param from the URL once shown.
 */
export function NewsletterConfirmBanner() {
  const params = useSearchParams();
  const status = params.get("newsletter");
  const message = status ? MESSAGES[status] : undefined;
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!message) return;
    // Strip the param so a refresh doesn't re-show the banner. Uses the History
    // API directly (not router state) to avoid a re-render loop.
    const url = new URL(window.location.href);
    url.searchParams.delete("newsletter");
    window.history.replaceState({}, "", url.toString());
  }, [message]);

  if (!message || dismissed) return null;

  const isError = status !== "confirmed";

  return (
    <div className="fixed top-4 inset-x-0 z-[60] flex justify-center px-4 pointer-events-none">
      <div
        role="status"
        className="pointer-events-auto flex items-center gap-4 max-w-[560px] rounded-full bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] pl-5 pr-3 py-2.5 shadow-lg"
      >
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: isError ? "#D4A574" : "#7A9C85" }}
        />
        <p className="text-sm leading-snug">{message}</p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="text-[var(--patina-off-white)]/70 hover:text-[var(--patina-off-white)] transition-colors text-lg leading-none px-1"
        >
          ×
        </button>
      </div>
    </div>
  );
}
