"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

const inputClasses =
  "w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(163,146,124,0.3)] rounded-[var(--radius-md)] text-[var(--patina-off-white)] placeholder-[rgba(237,233,228,0.4)] focus:outline-none focus:border-[var(--patina-clay-beige)] transition-colors";

type FormState = "idle" | "loading" | "success" | "error";

export function DesignerApplicationForm() {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    website: "",
    motivation: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading" || state === "success") return;

    const email = fields.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      setState("error");
      return;
    }
    if (!fields.firstName.trim() || !fields.lastName.trim()) {
      setError("First and last name are required");
      setState("error");
      return;
    }

    setState("loading");
    setError("");

    try {
      const attribution = getAttribution();
      const res = await fetch("/api/designers-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: fields.firstName.trim(),
          last_name: fields.lastName.trim(),
          email,
          company: fields.company.trim(),
          website: fields.website.trim(),
          motivation: fields.motivation.trim(),
          referral_source: attribution?.last_touch?.utm_source || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      setState("success");
      track("designer_application_submitted", {
        email_domain: email.split("@")[1] || "",
        has_company: !!fields.company.trim(),
        has_website: !!fields.website.trim(),
        has_motivation: !!fields.motivation.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--patina-clay-beige)]/20 mb-6">
          <svg
            className="w-8 h-8 text-[var(--patina-clay-beige)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-[var(--patina-off-white)] mb-3">
          Application received.
        </h3>
        <p className="text-[rgba(237,233,228,0.75)] max-w-md mx-auto">
          We review Founding 50 applications weekly. You&apos;ll hear from Kody
          or Leah within 7 days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={fields.firstName}
            onChange={(e) => {
              setFields((f) => ({ ...f, firstName: e.target.value }));
              if (state === "error") setState("idle");
            }}
            className={inputClasses}
            placeholder="Jane"
            required
            autoComplete="given-name"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={fields.lastName}
            onChange={(e) => {
              setFields((f) => ({ ...f, lastName: e.target.value }));
              if (state === "error") setState("idle");
            }}
            className={inputClasses}
            placeholder="Smith"
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={fields.email}
          onChange={(e) => {
            setFields((f) => ({ ...f, email: e.target.value }));
            if (state === "error") setState("idle");
          }}
          className={inputClasses}
          placeholder="jane@designstudio.com"
          required
          autoComplete="email"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
        >
          Company / Studio Name
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={fields.company}
          onChange={(e) => setFields((f) => ({ ...f, company: e.target.value }))}
          className={inputClasses}
          placeholder="Smith Design Studio"
          autoComplete="organization"
        />
      </div>

      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
        >
          Website / Portfolio
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={fields.website}
          onChange={(e) => setFields((f) => ({ ...f, website: e.target.value }))}
          className={inputClasses}
          placeholder="https://smithdesign.com"
          autoComplete="url"
        />
      </div>

      <div>
        <label
          htmlFor="motivation"
          className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
        >
          Why do you want to help build this?
        </label>
        <textarea
          id="motivation"
          name="motivation"
          rows={3}
          value={fields.motivation}
          onChange={(e) => setFields((f) => ({ ...f, motivation: e.target.value }))}
          className={`${inputClasses} resize-none`}
          placeholder="A sentence or two is fine."
        />
      </div>

      {state === "error" && error && (
        <p className="text-sm text-[#e8a69b]">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Submitting…" : "Apply to the Founding 50"}
      </button>
    </form>
  );
}
