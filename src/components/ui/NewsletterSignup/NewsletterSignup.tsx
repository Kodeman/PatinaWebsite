"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { getPostHogClient } from "@/lib/posthog";

interface NewsletterSignupProps {
  variant?: "inline" | "footer";
  source?: string;
  className?: string;
}

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterSignup({
  variant = "inline",
  source = "website",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isFooter = variant === "footer";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading" || state === "success") return;

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMessage("Please enter a valid email");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const attribution = getAttribution();
      const posthog = getPostHogClient();

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source,
          signup_page: window.location.pathname,
          posthog_distinct_id: posthog?.get_distinct_id?.() || null,
          utm: {
            utm_source: attribution?.last_touch?.utm_source,
            utm_medium: attribution?.last_touch?.utm_medium,
            utm_campaign: attribution?.last_touch?.utm_campaign,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setState("success");
      setEmail("");

      // Identify user in PostHog so anonymous browsing merges with this email
      posthog?.identify(trimmed, { email: trimmed, newsletter_source: source });

      const emailDomain = trimmed.split("@")[1] || "";
      track("newsletter_signup", {
        email_domain: emailDomain,
        source,
        signup_page: window.location.pathname,
        has_utm: !!attribution?.last_touch?.utm_source,
      });
    } catch {
      setErrorMessage("Something went wrong. Try again?");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className={cn(isFooter ? "py-4" : "py-8", className)}>
        <p
          className={cn(
            "font-display text-lg italic",
            isFooter
              ? "text-[var(--patina-clay-beige)]"
              : "text-[var(--patina-charcoal)] text-center"
          )}
        >
          Welcome. Your first letter is on its way.
        </p>
      </div>
    );
  }

  if (isFooter) {
    return (
      <div className={cn("max-w-sm", className)}>
        <p className="font-display text-sm text-[var(--patina-off-white)] mb-2">
          The Designer&apos;s Eye
        </p>
        <p className="text-xs text-[var(--patina-off-white)]/60 mb-3">
          A biweekly letter about design decisions and what we&apos;re building.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            placeholder="your@email.com"
            className="flex-1 min-w-0 px-3 py-2 text-sm bg-[rgba(255,255,255,0.05)] border border-[rgba(163,146,124,0.3)] rounded-[var(--radius-md)] text-[var(--patina-off-white)] placeholder-[rgba(237,233,228,0.4)] focus:outline-none focus:border-[var(--patina-clay-beige)] transition-colors"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="px-4 py-2 text-sm font-medium bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-md)] transition-all duration-300 hover:bg-[var(--patina-off-white)] disabled:opacity-50"
          >
            {state === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
        {state === "error" && (
          <p className="text-xs text-red-400 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }

  // Inline variant
  return (
    <div
      className={cn(
        "max-w-[600px] mx-auto py-12 px-4 text-center",
        className
      )}
    >
      <p className="text-label text-[var(--patina-clay-beige)] mb-2">
        The Designer&apos;s Eye
      </p>
      <p className="font-display text-xl text-[var(--patina-charcoal)] mb-2">
        A biweekly letter about design decisions, product discoveries, and what we&apos;re building.
      </p>
      <p className="text-sm text-[var(--patina-mocha-brown)] mb-6">
        From Leah&apos;s desk at Middlewest Studio.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="your@email.com"
          className="flex-1 min-w-0 px-4 py-3 bg-white border border-[var(--patina-clay-beige)]/30 rounded-[var(--radius-md)] text-[var(--patina-charcoal)] placeholder-[var(--patina-mocha-brown)]/40 focus:outline-none focus:border-[var(--patina-clay-beige)] transition-colors"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-6 py-3 font-medium bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] rounded-[var(--radius-md)] transition-all duration-300 hover:bg-[var(--patina-mocha-brown)] disabled:opacity-50"
        >
          {state === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {state === "error" && (
        <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
