"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const specialties = [
  "Wood furniture",
  "Upholstery",
  "Metal work",
  "Leather goods",
  "Ceramics",
  "Textiles",
  "Mixed media",
  "Other",
];

export default function MakerApplyPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
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
              Join Our Network
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              Become a Patina{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">maker</em>
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed">
              We partner with exceptional craftspeople who share our commitment to
              quality, sustainability, and transparency.
            </p>
          </div>
        </section>

        {/* What We Look For */}
        <section className="py-16 lg:py-20 border-b border-[rgba(163,146,124,0.15)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-heading-2 text-[var(--patina-charcoal)] text-center mb-10">
              What we look for
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
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
                  Exceptional Craft
                </h3>
                <p className="text-sm text-[var(--patina-mocha-brown)]">
                  Mastery of your medium, attention to detail, and pride in every piece.
                </p>
              </div>
              <div className="text-center">
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
                      d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-[var(--patina-charcoal)] mb-2">
                  Sustainable Practices
                </h3>
                <p className="text-sm text-[var(--patina-mocha-brown)]">
                  Commitment to responsible sourcing and environmental stewardship.
                </p>
              </div>
              <div className="text-center">
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
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-[var(--patina-charcoal)] mb-2">
                  Authentic Story
                </h3>
                <p className="text-sm text-[var(--patina-mocha-brown)]">
                  A compelling narrative about your craft, heritage, or approach.
                </p>
              </div>
              <div className="text-center">
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
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-[var(--patina-charcoal)] mb-2">
                  Partnership Mindset
                </h3>
                <p className="text-sm text-[var(--patina-mocha-brown)]">
                  Willingness to collaborate, communicate, and grow together.
                </p>
              </div>
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
                  Thank you for your interest in joining Patina. Our maker relations
                  team will review your application and reach out within 2 weeks.
                </p>
                <Link
                  href="/makers"
                  className="text-sm text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] underline underline-offset-4"
                >
                  Meet our current makers
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                    Apply to join
                  </h2>
                  <p className="text-[var(--patina-mocha-brown)]">
                    Tell us about your workshop and craft. All fields marked with * are required.
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
