import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { DesignerApplicationForm } from "./DesignerApplicationForm";

export const metadata: Metadata = {
  title: "The Founding 50 | Patina",
  description:
    "We're looking for 50 designers to co-create the future of design technology. Not as beta testers — as co-creators who shape the taxonomy, test the tools, and own the narrative.",
  openGraph: {
    title: "The Founding 50 — Patina",
    description: "50 designers. Co-creators, not beta testers.",
    url: "https://patina.cloud/designers",
  },
  alternates: {
    canonical: "https://patina.cloud/designers",
  },
};

const founding50Benefits = [
  {
    title: "Shape the Taxonomy",
    description:
      "The Aesthete Engine learns from your vocabulary — not generic categories. You define how products are classified, matched, and recommended.",
  },
  {
    title: "Test the Portal",
    description:
      "Get early access to the Designer Portal — the classification and project management tools — and tell us what's missing before anyone else sees it.",
  },
  {
    title: "Private Community",
    description:
      "A private Slack channel with the founding cohort. Monthly town halls with Kody & Leah. Direct input on product decisions.",
  },
  {
    title: "Qualified Leads",
    description:
      "When the consumer app launches, the Founding 50 are the first designers consumers can connect with. Your expertise built the system — you get the first clients from it.",
  },
  {
    title: "Named Recognition",
    description:
      "Founding 50 designers are credited by name at launch. This platform was built by working designers, and the world should know who they are.",
  },
  {
    title: "Zero Cost",
    description:
      "There's no fee. Your expertise is the contribution. In exchange, you get tools that make your practice more efficient and a lead pipeline you didn't have before.",
  },
];

export default function DesignersPage() {
  return (
    <>
      <Navigation variant="dark" />

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center bg-[var(--patina-charcoal)] overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <div
            className="absolute top-0 right-0 w-[60%] h-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(163, 146, 124, 0.15) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-32">
            <div className="max-w-2xl">
              <p className="text-label text-[var(--patina-clay-beige)] mb-4">
                For Designers
              </p>
              <h1 className="text-display-1 text-[var(--patina-off-white)] mb-6">
                We&apos;re looking for 50 designers to build the{" "}
                <em className="italic text-[var(--patina-clay-beige)]">
                  future of design technology.
                </em>
              </h1>
              <p className="text-xl text-[rgba(237,233,228,0.75)] leading-relaxed mb-10">
                Not as beta testers. As co-creators. The Founding 50 will shape
                the taxonomy, test the tools, and own the narrative that they
                helped build the platform the industry actually needs.
              </p>
              <a
                href="#apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg"
              >
                Apply to Join the Founding 50
              </a>
            </div>
          </div>
        </section>

        {/* What This Is */}
        <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                What this is
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
                More than early access.{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  Real co-creation.
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {founding50Benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] p-8 transition-all duration-300 hover:shadow-[var(--shadow-md)]"
                >
                  <h3 className="text-heading-3 text-[var(--patina-charcoal)] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--patina-mocha-brown)]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We're Looking For */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              Who belongs
            </p>
            <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-8">
              Who belongs in the{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">
                Founding 50
              </em>
            </h2>
            <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed max-w-[700px] mx-auto">
              We&apos;re looking for working interior designers — solo
              practitioners and small firms — who are actively sourcing products
              for real clients. You don&apos;t need to be famous. You need to
              have taste, opinions, and a willingness to teach a system what
              &ldquo;good&rdquo; looks like. A mix of experience levels, style
              perspectives, and regional markets makes the cohort stronger.
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-20 lg:py-28 bg-[var(--patina-charcoal)]">
          <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                Apply
              </p>
              <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
                Join the Founding 50
              </h2>
              <p className="text-lg text-[rgba(237,233,228,0.75)]">
                Applications reviewed weekly. We&apos;ll be in touch within 7
                days.
              </p>
            </div>

            <DesignerApplicationForm />
          </div>
        </section>

        {/* Who's Behind This */}
        <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              The team
            </p>
            <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-6">
              Built by a designer and{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">
                a technologist
              </em>
            </h2>
            <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-4 max-w-[650px] mx-auto">
              Leah runs Middlewest Studio, an interior design practice in
              Madison, Wisconsin. Her clients trust her taste — and her taste is
              what teaches the Aesthete Engine.
            </p>
            <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-8 max-w-[650px] mx-auto">
              Kody builds the technology. Together, they&apos;re creating what
              they wish existed: tools that actually help designers do better
              work.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)] transition-colors font-medium"
            >
              Read our full story
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
