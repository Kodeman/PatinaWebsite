import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Patina",
  description:
    "Learn how Patina collects, uses, and protects your personal information. Our commitment to your privacy.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              Legal
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[var(--patina-mocha-brown)]">
              Last updated: December 27, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-20">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed">
                  At Patina, we believe in transparency—not just in our materials and
                  makers, but in how we handle your personal information. This Privacy
                  Policy explains how we collect, use, and protect your data when you
                  visit our website or use our services.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>We collect information you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, and phone number when you contact us or create an account</li>
                    <li>Shipping and billing addresses for order fulfillment</li>
                    <li>Payment information (processed securely through our payment providers)</li>
                    <li>Communication preferences and feedback you provide</li>
                    <li>Information about your home and design preferences when using our design services</li>
                  </ul>
                  <p>
                    We also automatically collect certain information when you visit our site,
                    including your IP address, browser type, device information, and browsing
                    behavior through cookies and similar technologies.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about products, services, and promotions</li>
                    <li>Provide personalized design recommendations</li>
                    <li>Improve our website and services</li>
                    <li>Detect and prevent fraud</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  3. Information Sharing
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    We do not sell your personal information. We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Service providers who assist in order fulfillment, payment processing, and delivery</li>
                    <li>Our maker partners when necessary to complete custom orders</li>
                    <li>Analytics providers to help us understand site usage</li>
                    <li>Law enforcement when required by law</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  4. Cookies and Tracking
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    We use cookies and similar technologies to enhance your experience,
                    analyze site traffic, and personalize content. You can control cookie
                    preferences through your browser settings, though some features may
                    not function properly without cookies.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  5. Data Security
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    We implement appropriate technical and organizational measures to protect
                    your personal information against unauthorized access, alteration, disclosure,
                    or destruction. However, no method of transmission over the Internet is
                    completely secure.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  6. Your Rights
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>Depending on your location, you may have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict certain processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent where processing is based on consent</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at{" "}
                    <a
                      href="mailto:privacy@patina.com"
                      className="text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] underline"
                    >
                      privacy@patina.com
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  7. Children&apos;s Privacy
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    Our services are not directed to children under 16, and we do not
                    knowingly collect personal information from children.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  8. Changes to This Policy
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify
                    you of any material changes by posting the new policy on this page
                    and updating the &quot;Last updated&quot; date.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="pt-8 border-t border-[rgba(163,146,124,0.15)]">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  Contact Us
                </h2>
                <p className="text-[var(--patina-mocha-brown)] mb-6">
                  If you have questions about this Privacy Policy or our privacy practices,
                  please contact us:
                </p>
                <div className="bg-[var(--patina-soft-cream)] p-6 rounded-[var(--radius-lg)]">
                  <p className="text-[var(--patina-charcoal)] font-medium mb-2">
                    Patina Privacy Team
                  </p>
                  <p className="text-[var(--patina-mocha-brown)]">
                    Email:{" "}
                    <a
                      href="mailto:privacy@patina.com"
                      className="text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)]"
                    >
                      privacy@patina.com
                    </a>
                  </p>
                  <p className="text-[var(--patina-mocha-brown)]">
                    Address: 123 Craft District, Brooklyn, NY 11201
                  </p>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-12 pt-8 border-t border-[rgba(163,146,124,0.15)]">
              <p className="text-sm text-[var(--patina-clay-beige)] mb-4">Related</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/terms"
                  className="text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] underline underline-offset-4"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/contact"
                  className="text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] underline underline-offset-4"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
