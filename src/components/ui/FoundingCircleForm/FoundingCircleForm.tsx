"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { getPostHogClient } from "@/lib/posthog";
import { buildLeadPayload, inferRole, LEAD_HONEYPOT_FIELD } from "@/lib/lead-payload";

interface FoundingCircleFormProps {
  source: string;
  ctaText?: string;
  variant?: "default" | "dark" | "compact";
  className?: string;
}

type FormState = "idle" | "loading" | "success" | "error";

type SelectedRole = "designer" | "consumer" | null;

export function FoundingCircleForm({
  source,
  ctaText = "Join the Founding Circle",
  variant = "default",
  className,
}: FoundingCircleFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

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
      const posthog = getPostHogClient();
      const signupPage =
        typeof window !== "undefined" ? window.location.pathname : "";
      const role = selectedRole || inferRole(source, signupPage);

      // Read style preferences from localStorage if available
      let preferredStyles: string[] | null = null;
      try {
        const stored = localStorage.getItem('patina_style_preferences');
        if (stored) preferredStyles = JSON.parse(stored);
      } catch {
        // localStorage unavailable
      }

      const payload = buildLeadPayload({
        source,
        signupPage,
        ctaText,
        posthogDistinctId: posthog?.get_distinct_id?.() || null,
        extra: {
          email: trimmed,
          role,
          preferred_styles: preferredStyles,
          [LEAD_HONEYPOT_FIELD]: honeypotRef.current?.value || "",
        },
      });

      const res = await fetch("/api/founding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Signup failed");
      }

      setState("success");

      const emailDomain = trimmed.split("@")[1] || "";
      track("founding_circle_signup", {
        email_domain: emailDomain,
        source,
        signup_page: signupPage,
        cta_text: ctaText,
        has_utm: !!payload.utm_source,
        preferred_styles: preferredStyles || undefined,
        role,
        channel: payload.channel,
      });

      // Identify in PostHog
      posthog?.identify(trimmed, { email: trimmed, founding_source: source });
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
          Welcome to the Founding Circle!
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex gap-2 flex-wrap",
        isCompact ? "flex-row" : "flex-col sm:flex-row",
        className
      )}
    >
      {/* Honeypot — hidden from users, catches bots that auto-fill every field. */}
      <input
        ref={honeypotRef}
        type="text"
        name={LEAD_HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
      />
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
      {!isCompact && (
        <fieldset className="basis-full flex flex-wrap items-center gap-2 border-0 p-0 m-0">
          <legend
            className={cn(
              "text-xs mb-1 basis-full",
              isDark
                ? "text-[rgba(237,233,228,0.6)]"
                : "text-[var(--patina-mocha-brown)]/70"
            )}
          >
            I&apos;m a… (optional)
          </legend>
          {([
            { value: "designer", label: "Designer" },
            { value: "consumer", label: "Homeowner" },
          ] as const).map((option) => {
            const isActive = selectedRole === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  setSelectedRole((prev) =>
                    prev === option.value ? null : option.value
                  )
                }
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[var(--patina-clay-beige)]",
                  isDark
                    ? isActive
                      ? "bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] border border-[var(--patina-clay-beige)]"
                      : "bg-transparent text-[var(--patina-off-white)] border border-[rgba(237,233,228,0.25)] hover:border-[var(--patina-clay-beige)]"
                    : isActive
                      ? "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] border border-[var(--patina-charcoal)]"
                      : "bg-transparent text-[var(--patina-mocha-brown)] border border-[rgba(163,146,124,0.3)] hover:border-[var(--patina-clay-beige)]"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </fieldset>
      )}
      {state === "error" && errorMessage && (
        <p className={cn(
          "text-red-400 basis-full",
          isCompact ? "text-xs" : "text-sm"
        )}>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
