"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { systemMessages } from "@/lib/copy/system-messages";

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
  { value: "general", label: "General Inquiry" },
  { value: "product", label: "Product Question" },
  { value: "order", label: "Order Support" },
  { value: "designer", label: "Designer Partnership" },
  { value: "maker", label: "Maker Application" },
  { value: "press", label: "Press & Media" },
];

const defaultQuickLinks = [
  { label: "Work with a Designer", href: "/services" },
  { label: "Apply as a Maker", href: "/makers/apply" },
  { label: "See the App", href: "/app" },
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

  const contactReasons = props.contactReasons?.length ? props.contactReasons : defaultContactReasons;
  const quickLinks = props.quickLinks?.length ? props.quickLinks : defaultQuickLinks;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || systemMessages.errors.generic);
      }
      setSubmitted(true);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : systemMessages.errors.generic);
    }
  };

  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 bg-[var(--patina-soft-cream)] overflow-hidden">
          <div
            className="absolute -bottom-20 -left-20 w-[300px] h-[200px] bg-[var(--patina-clay-beige)] opacity-[0.04] pointer-events-none"
            style={{
              borderRadius: "60% 40% 50% 50% / 50% 50% 40% 60%",
              transform: "rotate(-15deg)",
            }}
          />

          <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              {props.heroEyebrow || "Get in Touch"}
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              {props.heroHeadline || "We'd love to"}{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">{props.heroHeadlineEmphasis || "hear"}</em> from you
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed">
              {props.heroDescription || "Whether you have a question about a piece, want to partner with us, or just want to say hello—we're here."}
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-6">
                  {props.contactInfoHeader || "Other ways to reach us"}
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-medium text-[var(--patina-charcoal)] mb-2">
                      Email
                    </h3>
                    <a
                      href={`mailto:${props.email || "hello@patina.cloud"}`}
                      className="text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors"
                    >
                      {props.email || "hello@patina.cloud"}
                    </a>
                    <p className="text-sm text-[var(--patina-clay-beige)] mt-1">
                      {props.phoneHours || "We read every message and reply within two business days."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[var(--patina-charcoal)] mb-2">
                      Where we are
                    </h3>
                    <address className="text-[var(--patina-mocha-brown)] not-italic whitespace-pre-line">
                      {props.showroomAddress || "Madison, Wisconsin"}
                    </address>
                    <p className="text-sm text-[var(--patina-clay-beige)] mt-1">
                      {props.showroomNote || "Home of Middlewest Studio"}
                    </p>
                  </div>

                  {props.phone && (
                    <div>
                      <h3 className="text-sm font-medium text-[var(--patina-charcoal)] mb-2">
                        Phone
                      </h3>
                      <a
                        href={`tel:${props.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors"
                      >
                        {props.phone}
                      </a>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[rgba(163,146,124,0.15)]">
                    <h3 className="text-sm font-medium text-[var(--patina-charcoal)] mb-3">
                      Quick Links
                    </h3>
                    <div className="flex flex-col gap-2">
                      {quickLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-sm text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] p-8 text-center">
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
                      {props.successMessage || "Thank you for reaching out. We read every message ourselves and usually reply within two business days."}
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setStatus("idle");
                        setErrorMsg("");
                        setFormData({ name: "", email: "", reason: "general", message: "", company_url: "" });
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
                      onChange={(e) => setFormData({ ...formData, company_url: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
