"use client";

import { useState } from "react";
import Link from "next/link";
import { StudioPage } from "@/components/studio/StudioPage";
import { StrataMark } from "@/components/ui/StrataMark";
import styles from "@/components/studio/TradePages.module.css";
import { track } from "@/lib/analytics";
import { buildLeadPayload, LEAD_HONEYPOT_FIELD } from "@/lib/lead-payload";
import { getPostHogClient } from "@/lib/posthog";

interface MakersApplyContentProps {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHeadlineEmphasis?: string;
  heroDescription?: string;
  criteriaHeader?: string;
  criteria?: Array<{ title: string; description: string; icon?: string }>;
  formHeader?: string;
  formDescription?: string;
  specialties?: string[];
  successMessage?: string;
  successLinkText?: string;
  successLinkHref?: string;
}

const defaultSpecialties = [
  "Wood furniture",
  "Upholstery",
  "Metal work",
  "Leather goods",
  "Ceramics",
  "Textiles",
  "Mixed media",
  "Other",
];

const defaultCriteria = [
  {
    title: "Exceptional Craft",
    description:
      "Mastery of your medium, attention to detail, and pride in every piece.",
    icon: "sparkle",
  },
  {
    title: "Sustainable Practices",
    description:
      "Commitment to responsible sourcing and environmental stewardship.",
    icon: "globe",
  },
  {
    title: "Authentic Story",
    description:
      "A compelling narrative about your craft, heritage, or approach.",
    icon: "comment",
  },
  {
    title: "Partnership Mindset",
    description: "Willingness to collaborate, communicate, and grow together.",
    icon: "users",
  },
];

export default function MakersApplyContent(props: MakersApplyContentProps) {
  const [formData, setFormData] = useState({
    workshopName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    specialty: "",
    yearsExperience: "",
    description: "",
    portfolio: "",
    sustainabilityPractices: "",
    tradeProgram: "",
    heardFrom: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const specialties = props.specialties?.length
    ? props.specialties
    : defaultSpecialties;
  const criteria = props.criteria?.length ? props.criteria : defaultCriteria;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const posthog = getPostHogClient();
      const email = formData.email.trim();
      const website = formData.website || formData.portfolio || null;
      const applicationDescription = [
        formData.description.trim(),
        formData.yearsExperience.trim() &&
          `Experience: ${formData.yearsExperience.trim()}`,
        formData.phone.trim() && `Phone: ${formData.phone.trim()}`,
        formData.sustainabilityPractices.trim() &&
          `Sustainability practices: ${formData.sustainabilityPractices.trim()}`,
        formData.portfolio.trim() && `Portfolio: ${formData.portfolio.trim()}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      const payload = buildLeadPayload({
        source: "makers_apply",
        signupPage:
          typeof window !== "undefined" ? window.location.pathname : "",
        posthogDistinctId: posthog?.get_distinct_id?.() || null,
        extra: {
          brand_name: formData.workshopName,
          contact_name: formData.contactName,
          email,
          location: formData.location || null,
          website,
          description: applicationDescription,
          materials: formData.specialty || null,
          trade_program: formData.tradeProgram || null,
          referral_source: formData.heardFrom || null,
          [LEAD_HONEYPOT_FIELD]: honeypot,
        },
      });

      const res = await fetch("/api/makers-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);

      posthog?.identify(email, { email, role: "maker" });
      track("maker_application_submitted", {
        email_domain: email.split("@")[1] || "",
        has_company: !!formData.workshopName.trim(),
        has_website: !!website,
        has_motivation: !!formData.description.trim(),
      });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StudioPage
      eyebrow="For makers / Apply to partner"
      title={
        <>
          Let’s get to know
          <br />
          <em>your work.</em>
        </>
      }
      description="We’re inviting 15 founding makers to help shape Patina. Tell us what you make, what matters to your workshop, and where we can see the work."
      image="/images/studio/workbench.jpg"
      imageAlt="Illustrative hands considering the fit of a timber joint"
      imageCaption="Illustrative imagery — awaiting partner photography."
      heroAction={
        <a className="studio-button" href="#maker-application">
          Begin your application <span aria-hidden="true">↗</span>
        </a>
      }
    >
      <section className={`studio-section ${styles.applicationIntro}`}>
        <div className="studio-copy">
          <StrataMark size="compact" align="left" />
          <span className="studio-kicker">The beginning of a partnership</span>
          <h2>
            Care we can
            <br />
            <em>see in the work.</em>
          </h2>
          <p>
            Kody and Leah personally read every application. We look for considered
            construction, honest materials, and people who care about their
            craft. You’ll hear from us within two weeks.
          </p>
          <Link className="studio-link" href="/makers">
            Read the maker invitation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <dl className={styles.briefList}>
          {criteria.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section
        id="maker-application"
        className={`studio-section ${styles.makerFormSection}`}
      >
        <aside className={styles.applicationGuide}>
          <span className="studio-kicker">Your work, in your words</span>
          <h2>
            Let the details
            <br />
            <em>tell the story.</em>
          </h2>
          <p>
            A link to your work, a few workshop details, and a little about your
            process. We’re looking forward to getting to know it.
          </p>
          {!submitted && (
            <nav aria-label="Application sections">
              <a href="#workshop-details">
                <span>01</span> Your workshop
              </a>
              <a href="#contact-details">
                <span>02</span> How to reach you
              </a>
              <a href="#about-work">
                <span>03</span> Your craft
              </a>
            </nav>
          )}
          <p className={styles.small}>
            Applications are read personally.
            <br />
            Please allow up to two weeks.
          </p>
        </aside>
        <div
          className={`${styles.form} ${styles.lightForm} ${styles.makerForm}`}
        >
          <div className={styles.formMasthead}>
            <StrataMark size="compact" align="left" />
            <span>
              Patina / Maker application
              <br />A founding partnership
            </span>
          </div>
          {submitted ? (
            <div
              className="bg-[var(--patina-soft-cream)] p-8 lg:p-12 text-center"
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
                Application Received
              </h3>
              <p className="text-[var(--patina-mocha-brown)] mb-6">
                {props.successMessage ||
                  "Thank you for sharing your work. Kody will review your application with Leah and reach out within two weeks."}
              </p>
              <Link
                href={props.successLinkHref || "/makers"}
                className="text-sm text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] underline underline-offset-4"
              >
                {props.successLinkText || "Back to the maker invitation"}
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  {props.formHeader || "Apply to join"}
                </h2>
                <p className="text-[var(--patina-mocha-brown)]">
                  {props.formDescription ||
                    "Tell us about your workshop and craft. All fields marked with * are required."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot — hidden from real users, bots will fill it */}
                <div
                  className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor={LEAD_HONEYPOT_FIELD}>Company URL</label>
                  <input
                    type="text"
                    id={LEAD_HONEYPOT_FIELD}
                    name={LEAD_HONEYPOT_FIELD}
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Workshop Info */}
                <div className="space-y-6" id="workshop-details">
                  <h3 className="text-lg font-medium text-[var(--patina-charcoal)] pb-2 border-b border-[rgba(163,146,124,0.15)]">
                    Workshop Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="workshopName"
                        className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                      >
                        Workshop Name *
                      </label>
                      <input
                        type="text"
                        id="workshopName"
                        required
                        value={formData.workshopName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workshopName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                        placeholder="Workshop or studio"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                      >
                        Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        required
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                        placeholder="City, State/Country"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="specialty"
                        className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                      >
                        Primary Specialty *
                      </label>
                      <select
                        id="specialty"
                        required
                        value={formData.specialty}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specialty: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors cursor-pointer"
                      >
                        <option value="">Select your specialty</option>
                        {specialties.map((specialty) => (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="yearsExperience"
                        className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                      >
                        Years of Experience *
                      </label>
                      <input
                        type="text"
                        id="yearsExperience"
                        required
                        value={formData.yearsExperience}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            yearsExperience: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                        placeholder="e.g., 15 years"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6" id="contact-details">
                  <h3 className="text-lg font-medium text-[var(--patina-charcoal)] pb-2 border-b border-[rgba(163,146,124,0.15)]">
                    Contact Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contactName"
                        className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                      >
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        required
                        value={formData.contactName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contactName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                      >
                        Email *
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
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                      >
                        Website or Portfolio
                      </label>
                      <input
                        type="url"
                        id="website"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>

                {/* About Your Work */}
                <div className="space-y-6" id="about-work">
                  <h3 className="text-lg font-medium text-[var(--patina-charcoal)] pb-2 border-b border-[rgba(163,146,124,0.15)]">
                    About Your Work
                  </h3>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                    >
                      Tell us about your craft *
                    </label>
                    <textarea
                      id="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors resize-none"
                      placeholder="Share your story, techniques, inspirations, and what makes your work unique..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sustainabilityPractices"
                      className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                    >
                      Sustainability practices
                    </label>
                    <textarea
                      id="sustainabilityPractices"
                      rows={3}
                      value={formData.sustainabilityPractices}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sustainabilityPractices: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors resize-none"
                      placeholder="Describe how you source materials, reduce waste, or minimize environmental impact..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tradeProgram"
                      className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                    >
                      Existing trade program
                    </label>
                    <textarea
                      id="tradeProgram"
                      rows={2}
                      value={formData.tradeProgram}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tradeProgram: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors resize-none"
                      placeholder="Do you offer trade pricing today? Terms, thresholds, who qualifies..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="portfolio"
                      className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                    >
                      Portfolio links or images
                    </label>
                    <textarea
                      id="portfolio"
                      rows={2}
                      value={formData.portfolio}
                      onChange={(e) =>
                        setFormData({ ...formData, portfolio: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors resize-none"
                      placeholder="Links to Instagram, portfolio site, or image galleries..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="heardFrom"
                      className="block text-sm font-medium text-[var(--patina-charcoal)] mb-2"
                    >
                      How did you hear about us?
                    </label>
                    <input
                      type="text"
                      id="heardFrom"
                      value={formData.heardFrom}
                      onChange={(e) =>
                        setFormData({ ...formData, heardFrom: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                      placeholder="e.g., Another maker, Instagram, press article..."
                    />
                  </div>
                </div>

                <div className="pt-4">
                  {submitError && (
                    <p className="text-sm text-[#A14434] mb-4" role="alert">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-mocha-brown)] shadow-lg disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                  <p className="mt-4 text-xs text-[var(--patina-clay-beige)]">
                    We review applications weekly. Kody and Leah personally evaluate
                    every brand for fit.
                  </p>
                  <p className="mt-2 text-xs text-[var(--patina-clay-beige)]">
                    By submitting, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-[var(--patina-charcoal)]"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </StudioPage>
  );
}
