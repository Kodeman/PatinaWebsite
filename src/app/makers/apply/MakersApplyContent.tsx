"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

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
    description: "Mastery of your medium, attention to detail, and pride in every piece.",
    icon: "sparkle",
  },
  {
    title: "Sustainable Practices",
    description: "Commitment to responsible sourcing and environmental stewardship.",
    icon: "globe",
  },
  {
    title: "Authentic Story",
    description: "A compelling narrative about your craft, heritage, or approach.",
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
    heardFrom: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const specialties = props.specialties?.length ? props.specialties : defaultSpecialties;
  const criteria = props.criteria?.length ? props.criteria : defaultCriteria;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              {props.heroEyebrow || "Join Our Network"}
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              {props.heroHeadline || "Become a Patina"}{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">{props.heroHeadlineEmphasis || "maker"}</em>
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed">
              {props.heroDescription || "We partner with exceptional craftspeople who share our commitment to quality, sustainability, and transparency."}
            </p>
          </div>
        </section>

        {/* What We Look For */}
        <section className="py-16 lg:py-20 border-b border-[rgba(163,146,124,0.15)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-heading-2 text-[var(--patina-charcoal)] text-center mb-10">
              {props.criteriaHeader || "What we look for"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {criteria.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-[var(--patina-clay-beige)]/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[var(--patina-clay-beige)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-[var(--patina-charcoal)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--patina-mocha-brown)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <div className="bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] p-8 lg:p-12 text-center">
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
                  {props.successMessage || "Thank you for your interest in joining Patina. Our maker relations team will review your application and reach out within 2 weeks."}
                </p>
                <Link
                  href={props.successLinkHref || "/makers"}
                  className="text-sm text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] underline underline-offset-4"
                >
                  {props.successLinkText || "Meet our current makers"}
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                    {props.formHeader || "Apply to join"}
                  </h2>
                  <p className="text-[var(--patina-mocha-brown)]">
                    {props.formDescription || "Tell us about your workshop and craft. All fields marked with * are required."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Workshop Info */}
                  <div className="space-y-6">
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
                            setFormData({ ...formData, workshopName: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                          placeholder="Your workshop or studio name"
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
                            setFormData({ ...formData, specialty: e.target.value })
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
                            setFormData({ ...formData, yearsExperience: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-[var(--patina-soft-cream)] border border-[rgba(163,146,124,0.2)] rounded-[var(--radius-lg)] text-[var(--patina-charcoal)] placeholder-[var(--patina-clay-beige)] focus:outline-none focus:border-[var(--patina-clay-beige)] focus:ring-1 focus:ring-[var(--patina-clay-beige)] transition-colors"
                          placeholder="e.g., 15 years"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-6">
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
                            setFormData({ ...formData, contactName: e.target.value })
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
                  <div className="space-y-6">
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
                          setFormData({ ...formData, description: e.target.value })
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
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-mocha-brown)] shadow-lg"
                    >
                      Submit Application
                    </button>
                    <p className="mt-4 text-xs text-[var(--patina-clay-beige)]">
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
      </main>

      <Footer />
    </>
  );
}
