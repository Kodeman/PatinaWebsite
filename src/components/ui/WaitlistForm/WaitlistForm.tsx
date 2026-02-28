"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { getPostHogClient } from "@/lib/posthog";

interface WaitlistFormProps {
  source: string;
  ctaText?: string;
  variant?: "default" | "dark" | "compact";
  className?: string;
}

type FormState = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  source,
  ctaText = "Join Waitlist",
  variant = "default",
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isCompact = variant === "compact";
  const isDark = variant === "dark";

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

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source,
          signup_page: typeof window !== "undefined" ? window.location.pathname : "",
          cta_text: ctaText,
          utm: attribution?.last_touch,
          posthog_distinct_id: posthog?.get_distinct_id?.() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Signup failed");
      }

      setState("success");

      const emailDomain = trimmed.split("@")[1] || "";
      track("waitlist_signup", {
        email_domain: emailDomain,
        source,
        signup_page: typeof window !== "undefined" ? window.location.pathname : "",
        cta_text: ctaText,
        has_utm: !!attribution?.last_touch?.utm_source,
      });

      // Identify in PostHog
      posthog?.identify(trimmed, { email: trimmed, waitlist_source: source });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-2",
          isCompact ? "py-2 px-3" : "py-3 px-4",
          isDark
            ? "text-[var(--patina-clay-beige)]"
            : "text-[var(--patina-mocha-brown)]",
          className
        )}
      >
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className={cn("font-medium", isCompact ? "text-sm" : "text-base")}>
          You&apos;re on the list!
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex gap-2",
        isCompact ? "flex-row" : "flex-col sm:flex-row",
        className
      )}
    >
      <input
        ref={inputRef}
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state === "error") setState("idle");
        }}
        required
        className={cn(
          "rounded-[var(--radius-lg)] transition-all duration-200 outline-none",
          isCompact
            ? "px-3 py-2 text-sm flex-1 min-w-0"
            : "px-4 py-3 text-[0.9375rem] flex-1 min-w-0",
          isDark
            ? "bg-[rgba(237,233,228,0.1)] text-[var(--patina-off-white)] placeholder:text-[rgba(237,233,228,0.4)] border border-[rgba(237,233,228,0.15)] focus:border-[var(--patina-clay-beige)]"
            : "bg-white text-[var(--patina-charcoal)] placeholder:text-[var(--patina-mocha-brown)]/50 border border-[rgba(163,146,124,0.25)] focus:border-[var(--patina-clay-beige)]",
          state === "error" && "border-red-400"
        )}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-[var(--radius-lg)]",
          "transition-all duration-300 ease-[var(--ease-patina)] whitespace-nowrap",
          isCompact
            ? "px-4 py-2 text-sm"
            : "px-6 py-3 text-[0.9375rem]",
          isDark
            ? "bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] hover:bg-[var(--patina-off-white)]"
            : "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] hover:bg-[var(--patina-mocha-brown)]",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {state === "loading" ? (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          ctaText
        )}
      </button>
      {state === "error" && errorMessage && (
        <p className={cn(
          "text-sm text-red-400 sm:col-span-2",
          isCompact ? "text-xs" : "text-sm"
        )}>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
