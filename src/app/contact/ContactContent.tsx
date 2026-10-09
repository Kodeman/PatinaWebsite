"use client";

import { useState } from "react";
import Link from "next/link";
import { StudioPage } from "@/components/studio/StudioPage";
import { StrataMark } from "@/components/ui/StrataMark";
import styles from "@/components/studio/TradePages.module.css";
import { systemMessages } from "@/lib/copy/system-messages";
import { buildLeadPayload } from "@/lib/lead-payload";
import { getPostHogClient } from "@/lib/posthog";

interface ContactContentProps {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHeadlineEmphasis?: string;
  heroDescription?: string;
  contactInfoHeader?: string;
  email?: string;
  phone?: string;
  phoneHours?: string;
  showroomAddress?: string;
  showroomNote?: string;
  quickLinks?: Array<{ label: string; href: string }>;
  contactReasons?: Array<{ value: string; label: string }>;
  successMessage?: string;
}

const defaultContactReasons = [
  { value: "general", label: "A question or idea" },
  { value: "designer", label: "Designer partnership" },
  { value: "maker", label: "Maker partnership" },
  { value: "press", label: "Press & media" },
];

const defaultQuickLinks = [
  { label: "Join the Founding Circle", href: "/founding" },
  { label: "For designers", href: "/designers" },
  { label: "For makers", href: "/makers" },
];

export default function ContactContent(props: ContactContentProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "general",
    message: "",
    company_url: "", // honeypot — real users never fill this
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const contactReasons = props.contactReasons?.length
    ? props.contactReasons
    : defaultContactReasons;
  const quickLinks = props.quickLinks?.length
    ? props.quickLinks
    : defaultQuickLinks;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The lead payload carries the anonymous PostHog id and attribution, so
        // the server's contact event merges with the visitor's browsing.
        body: JSON.stringify(
          buildLeadPayload({
            source: "contact_page",
            signupPage: window.location.pathname,
            posthogDistinctId: getPostHogClient()?.get_distinct_id?.() || null,
            extra: formData,
          }),
        ),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || systemMessages.errors.generic);
      }
      setSubmitted(true);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : systemMessages.errors.generic,
      );
    }
  };

  return (
    <StudioPage
      eyebrow="A note to the studio"
      title={
        <>
          Good things start
          <br />
          <em>with a conversation.</em>
        </>
      }
      description="A question about Patina, an idea for a partnership, or a room on your mind. We’d love to hear from you."
      image="/images/studio/materials.jpg"
      imageAlt="Illustrative materials and a furniture sketch laid out on a studio table"
      imageCaption="Illustrative imagery — awaiting partner photography."
      heroAction={
        <a className="studio-button" href="#your-note">
          Write to us <span aria-hidden="true">↗</span>
        </a>
      }
    >
      <section className={`studio-section ${styles.contactLayout}`}>
        <aside className={styles.contactDetails}>
          <StrataMark size="compact" align="left" />
          <span className="studio-kicker">
            Kody &amp; Leah / Madison, Wisconsin
          </span>
          <h2>
            Pull up
            <br />
            <em>a chair.</em>
          </h2>
          <p>We read these messages ourselves. Tell us what you’re thinking.</p>
          <a className="studio-link" href="mailto:hello@patina.cloud">
            hello@patina.cloud <span aria-hidden="true">↗</span>
          </a>
          <div className={styles.contactLinks}>
            <span className="studio-kicker">
              Looking for a particular door?
            </span>
            {quickLinks.map((link) => (
              <Link className="studio-link" key={link.href} href={link.href}>
                {link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <p className={styles.small}>
            Patina’s app and marketplace are pre-launch. Founding members help
            shape what comes next.
          </p>
        </aside>
        <div id="your-note" className={`${styles.form} ${styles.lightForm}`}>
          <div className={styles.formMasthead}>
            <StrataMark size="compact" align="left" />
            <span>
              Patina / Correspondence
              <br />
              Madison, Wisconsin
            </span>
          </div>
          <h2 className={styles.formTitle}>A note to the studio.</h2>
          {submitted ? (
            <div
              className="bg-[var(--patina-soft-cream)] p-8 text-center"
              role="status"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[var(--patina-clay-beige)] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--patina-charcoal)] mb-2">
                Message Sent
              </h3>
              <p className="text-[var(--patina-mocha-brown)] mb-6">
                {props.successMessage ||
                  "Thank you for the note. Kody or Leah will be in touch."}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStatus("idle");
                  setErrorMsg("");
                  setFormData({
                    name: "",
                    email: "",
                    reason: "general",
                    message: "",
                    company_url: "",
                  });
                }}
                className="text-sm text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot — hidden from real users, catches bots */}
              <input
                type="text"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={formData.company_url}
                onChange={(e) =>
                  setFormData({ ...formData, company_url: e.target.value })
                }
                className="absolute left-[-9999px] w-px h-px opacity-0"
              />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                >
                  What&apos;s this about?
                </label>
                <select
                  id="reason"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors appearance-none cursor-pointer"
                >
                  {contactReasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-[#A14434]" role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-mocha-brown)] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </StudioPage>
  );
}
