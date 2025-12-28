import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Design Services | Patina",
  description:
    "Work with our expert designers to curate the perfect furniture collection for your space. From consultation to installation, we're with you every step.",
};

const packages = [
  {
    name: "Consultation",
    price: "Free",
    description: "Get started with a conversation about your vision.",
    features: [
      "30-minute video call",
      "Style assessment",
      "Initial recommendations",
      "AR preview demo",
    ],
    cta: "Book Free Call",
    href: "#book",
    featured: false,
  },
  {
    name: "Room Design",
    price: "$450",
    description: "Complete design for a single room with curated selections.",
    features: [
      "2-hour in-depth consultation",
      "Personalized mood board",
      "5-7 furniture recommendations",
      "AR visualization for each piece",
      "Trade pricing on purchases",
      "3 revision rounds",
    ],
    cta: "Get Started",
    href: "#book",
    featured: true,
  },
  {
    name: "Full Home",
    price: "Custom",
    description: "Comprehensive design for multiple rooms or entire homes.",
    features: [
      "On-site consultation available",
      "Complete furniture plan",
      "Unlimited revisions",
      "Priority maker access",
      "White glove delivery",
      "Installation coordination",
      "Dedicated design manager",
    ],
    cta: "Contact Us",
    href: "#book",
    featured: false,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with a conversation about your space, style preferences, and how you live. Share inspiration, measurements, and photos.",
  },
  {
    number: "02",
    title: "Curation",
    description:
      "Our designers hand-select pieces from our collection of artisan makers. Each recommendation is chosen specifically for your space.",
  },
  {
    number: "03",
    title: "Visualization",
    description:
      "See every piece in your actual space using our AR tools. Adjust, swap, and refine until it feels perfect.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "We coordinate directly with makers for production and handle white-glove delivery and placement in your home.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              Design Services
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              Let us help you find{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">
                the perfect pieces
              </em>
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] max-w-2xl mx-auto">
              From a single statement piece to a complete home, our design team
              is here to guide you through our collection of artisan-crafted
              furniture.
            </p>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                Our Services
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
                Choose your level of{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  guidance
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-[var(--radius-2xl)] p-8 ${
                    pkg.featured
                      ? "bg-[var(--patina-charcoal)] text-[var(--patina-off-white)]"
                      : "bg-[var(--patina-soft-cream)]"
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] text-xs font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <h3
                    className={`text-xl font-display font-semibold mb-2 ${
                      pkg.featured
                        ? "text-[var(--patina-off-white)]"
                        : "text-[var(--patina-charcoal)]"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-3xl font-display font-bold mb-4 ${
                      pkg.featured
                        ? "text-[var(--patina-clay-beige)]"
                        : "text-[var(--patina-charcoal)]"
                    }`}
                  >
                    {pkg.price}
                  </p>
                  <p
                    className={`mb-6 ${
                      pkg.featured
                        ? "text-[rgba(237,233,228,0.75)]"
                        : "text-[var(--patina-mocha-brown)]"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            pkg.featured
                              ? "text-[var(--patina-clay-beige)]"
                              : "text-[var(--patina-clay-beige)]"
                          }`}
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
                        <span
                          className={`text-sm ${
                            pkg.featured
                              ? "text-[rgba(237,233,228,0.9)]"
                              : "text-[var(--patina-mocha-brown)]"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={pkg.href}
                    className={`block w-full py-3 text-center font-medium rounded-[var(--radius-lg)] transition-all duration-300 ${
                      pkg.featured
                        ? "bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] hover:bg-[var(--patina-off-white)]"
                        : "border-2 border-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] hover:bg-[var(--patina-clay-beige)] hover:text-[var(--patina-off-white)]"
                    }`}
                  >
                    {pkg.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                How It Works
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
                A thoughtful{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  process
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-[var(--patina-clay-beige)] opacity-30" />
                  )}

                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--patina-warm-white)] text-[var(--patina-clay-beige)] text-xl font-display font-bold mb-4 shadow-sm">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-display font-semibold text-[var(--patina-charcoal)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--patina-mocha-brown)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section id="book" className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
          {/* Paper texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              Get Started
            </p>
            <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
              Ready to begin?
            </h2>
            <p className="text-lg text-[rgba(237,233,228,0.75)] mb-10">
              Schedule a free consultation call. We&apos;ll discuss your space,
              style preferences, and how we can help you find furniture with
              meaning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:design@patina.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                Email Us
              </a>
              <Link
                href="/furniture"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--patina-clay-beige)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[rgba(163,146,124,0.1)]"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
