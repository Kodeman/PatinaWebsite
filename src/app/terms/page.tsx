import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Patina",
  description:
    "Terms and conditions for using Patina's website and services. Understand your rights and responsibilities.",
};

export default function TermsPage() {
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
              Terms of Service
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
                  Welcome to Patina. These Terms of Service govern your use of our
                  website and services. By accessing or using Patina, you agree to
                  be bound by these terms.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    By using our website or purchasing products from Patina, you agree
                    to these Terms of Service and our Privacy Policy. If you do not
                    agree to these terms, please do not use our services.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  2. Products and Services
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    Patina offers handcrafted furniture and design services. Product
                    descriptions, images, and specifications are provided for
                    informational purposes. Due to the handmade nature of our products:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Each piece may have slight variations in grain, color, and dimensions</li>
                    <li>Lead times are estimates and may vary based on maker availability</li>
                    <li>Colors may appear differently on screens than in person</li>
                    <li>Custom orders may have specific limitations and requirements</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  3. Ordering and Payment
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    When you place an order through Patina:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All prices are in USD unless otherwise stated</li>
                    <li>Payment is required at the time of order for stock items</li>
                    <li>Custom and made-to-order pieces may require a deposit</li>
                    <li>We reserve the right to refuse or cancel orders at our discretion</li>
                    <li>Sales tax is applied where required by law</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  4. Shipping and Delivery
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    We offer white-glove delivery for most furniture pieces:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Delivery dates are estimates and not guaranteed</li>
                    <li>Signature is required upon delivery</li>
                    <li>Please inspect items upon delivery and note any damage</li>
                    <li>Delivery to certain locations may incur additional fees</li>
                    <li>International shipping is available for select items</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  5. Returns and Refunds
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    Due to the custom nature of our products:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Made-to-order items are non-refundable</li>
                    <li>Stock items may be returned within 14 days of delivery in original condition</li>
                    <li>Return shipping costs are the responsibility of the customer</li>
                    <li>Items showing signs of use or damage are not eligible for return</li>
                    <li>Refunds are processed within 10 business days of receiving the return</li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  6. Warranty
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    All Patina furniture comes with our craftsmanship guarantee:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Structural integrity is warranted for 10 years under normal use</li>
                    <li>Warranty does not cover damage from misuse, accidents, or improper care</li>
                    <li>Natural wood movement and patina development are not defects</li>
                    <li>Warranty claims must be submitted with photos and purchase information</li>
                  </ul>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  7. Intellectual Property
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    All content on this website, including text, images, logos, and designs,
                    is the property of Patina or our makers and is protected by intellectual
                    property laws. You may not reproduce, distribute, or create derivative
                    works without our written permission.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  8. User Accounts
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    If you create an account with us:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You are responsible for maintaining the security of your account</li>
                    <li>You must provide accurate and complete information</li>
                    <li>We may suspend or terminate accounts that violate these terms</li>
                    <li>You are responsible for all activity under your account</li>
                  </ul>
                </div>
              </div>

              {/* Section 9 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  9. Limitation of Liability
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    To the maximum extent permitted by law, Patina shall not be liable
                    for any indirect, incidental, special, consequential, or punitive
                    damages arising from your use of our services or products.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  10. Governing Law
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    These Terms of Service shall be governed by and construed in
                    accordance with the laws of the State of New York, without
                    regard to its conflict of law provisions.
                  </p>
                </div>
              </div>

              {/* Section 11 */}
              <div className="mb-10">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  11. Changes to Terms
                </h2>
                <div className="space-y-4 text-[var(--patina-mocha-brown)]">
                  <p>
                    We reserve the right to modify these terms at any time. Changes
                    will be effective immediately upon posting to the website.
                    Continued use of our services after changes constitutes
                    acceptance of the new terms.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="pt-8 border-t border-[rgba(163,146,124,0.15)]">
                <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
                  Questions?
                </h2>
                <p className="text-[var(--patina-mocha-brown)] mb-6">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="bg-[var(--patina-soft-cream)] p-6 rounded-[var(--radius-lg)]">
                  <p className="text-[var(--patina-charcoal)] font-medium mb-2">
                    Patina Legal Team
                  </p>
                  <p className="text-[var(--patina-mocha-brown)]">
                    Email:{" "}
                    <a
                      href="mailto:legal@patina.com"
                      className="text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)]"
                    >
                      legal@patina.com
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
                  href="/privacy"
                  className="text-[var(--patina-mocha-brown)] hover:text-[var(--patina-charcoal)] underline underline-offset-4"
                >
                  Privacy Policy
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
