"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { systemMessages } from "@/lib/copy/system-messages";

export function NewsletterDivider() {
  const [email, setEmail] = useState("");
  const [companyUrl, setCompanyUrl] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "homepage_divider",
          signup_page: "/",
          company_url: companyUrl,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section data-bg="light" className="relative py-12">
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--patina-pearl), transparent)",
        }}
      />
      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--patina-pearl), transparent)",
        }}
      />

      <FadeIn>
        <div className="max-w-[900px] mx-auto px-[clamp(24px,5vw,72px)] grid grid-cols-1 min-[901px]:grid-cols-[1fr_auto] gap-10 items-center">
          {/* Left — Label */}
          <div>
            <p className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--patina-charcoal)] mb-1">
              The Designer&apos;s Eye
            </p>
            <p className="text-[13px] font-light text-[var(--patina-mocha-brown)] leading-snug">
              A biweekly letter about design decisions, product discoveries, and what we&apos;re
              building.
            </p>
          </div>

          {/* Right — Form / confirmation */}
          <div className="min-[901px]:w-auto w-full">
            {status === "success" ? (
              <p className="font-body text-[13px] text-[var(--patina-charcoal)] min-[901px]:text-right">
                {systemMessages.newsletter.pending}
              </p>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex w-full">
                  {/* Honeypot — hidden from real users, catches bots */}
                  <input
                    type="text"
                    name="company_url"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    className="absolute left-[-9999px] w-px h-px opacity-0"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    required
                    className="font-body text-[13px] px-[18px] py-[13px] border border-[var(--patina-clay-beige)] border-r-0 bg-transparent text-[var(--patina-charcoal)] outline-none transition-colors duration-300 focus:border-[var(--patina-charcoal)] placeholder:text-[var(--patina-clay-light)] min-[901px]:w-60 flex-1 min-[901px]:flex-initial"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="font-body text-xs font-medium px-6 py-[13px] bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] border border-[var(--patina-charcoal)] cursor-pointer transition-colors duration-300 tracking-[0.02em] hover:bg-[var(--patina-mocha-brown)] hover:border-[var(--patina-mocha-brown)] disabled:opacity-60"
                  >
                    {status === "submitting" ? "..." : "Subscribe"}
                  </button>
                </form>
                {status === "error" && (
                  <p className="mt-2 font-body text-[12px] text-[#A14434]" role="alert">
                    {systemMessages.errors.generic}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
