"use client";

import { useState, useEffect } from "react";
import { getConsent, setConsent } from "@/lib/posthog";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === null) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  function handleAccept() {
    setConsent("granted");
    setVisible(false);
  }

  function handleDecline() {
    setConsent("denied");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom duration-500"
    >
      <div className="mx-auto max-w-lg rounded-[var(--radius-lg)] bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] px-5 py-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <p className="text-sm leading-relaxed flex-1">
          We use cookies to understand how you interact with Patina and improve your experience.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 text-sm rounded-[var(--radius-lg)] border border-[rgba(237,233,228,0.2)] hover:border-[rgba(237,233,228,0.4)] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 text-sm rounded-[var(--radius-lg)] bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] font-medium hover:bg-[var(--patina-off-white)] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
