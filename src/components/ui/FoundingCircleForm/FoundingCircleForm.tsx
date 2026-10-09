"use client";

import { useState, useRef, useId } from "react";
import { StrataMark } from "@/components/ui/StrataMark";
import { systemMessages } from "@/lib/copy/system-messages";
import styles from "@/components/ui/FoundingCircleModal/FoundingCircleModal.module.css";
import { cn } from "@/lib/utils";
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
  const fieldId = useId();
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
      setErrorMessage(systemMessages.errors.invalidEmail);
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
        throw new Error(data.error || systemMessages.errors.generic);
      }

      setState("success");

      // Identify in PostHog
      posthog?.identify(trimmed, { email: trimmed, founding_source: source });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : systemMessages.errors.generic);
      setState("error");
    }
  }

  if (state === "success") {
    return <div role="status" className={cn(styles.inlineSuccess, isDark && styles.inlineDark, className)}>
      <StrataMark size="compact" align="left" variant={isDark ? "on-clay" : "default"} />
      <h3>{systemMessages.founding.successTitle}</h3>
      <p>{systemMessages.founding.successBody}</p>
    </div>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={state === "loading"}
      className={cn(styles.inlineForm, isDark && styles.inlineDark, isCompact && styles.inlineCompact, className)}>
      <input ref={honeypotRef} type="text" name={LEAD_HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honeypot} />
      <div className={styles.field}>
        <label htmlFor={fieldId}>Email</label>
        <input id={fieldId} ref={inputRef} type="email" autoComplete="email" placeholder="you@example.com" value={email} required
          aria-invalid={state === "error"} aria-describedby={state === "error" ? `${fieldId}-error` : undefined}
          onChange={event => { setEmail(event.target.value); if (state === "error") setState("idle"); }} />
      </div>
      {!isCompact && <fieldset className={styles.roleOptions}>
        <legend>I’m a… <span>(optional)</span></legend>
        {([{ value: "designer", label: "Designer" }, { value: "consumer", label: "Homeowner" }] as const).map(option =>
          <button key={option.value} type="button" aria-pressed={selectedRole === option.value}
            onClick={() => setSelectedRole(previous => previous === option.value ? null : option.value)}>{option.label}</button>,
        )}
      </fieldset>}
      {state === "error" && errorMessage && <p id={`${fieldId}-error`} role="alert" className={styles.errorText}>{errorMessage}</p>}
      <button type="submit" className={styles.submit} disabled={state === "loading"}>
        {state === "loading" ? "Joining…" : ctaText}<span aria-hidden="true">↗</span>
      </button>
      <p className={styles.foot}>First access when the app launches. By joining, you agree to our <a href="/privacy">Privacy Policy</a>.</p>
    </form>
  );
}
