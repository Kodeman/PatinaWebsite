"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";

export function NewsletterDivider() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    // TODO: Wire to newsletter API
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
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

          {/* Right — Form */}
          <form onSubmit={handleSubmit} className="flex min-[901px]:w-auto w-full">
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
              {status === "submitting"
                ? "..."
                : status === "success"
                  ? "Subscribed"
                  : "Subscribe"}
            </button>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}
