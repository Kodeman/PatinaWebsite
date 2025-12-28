import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Careers | Patina",
  description:
    "Join the Patina team. We're building the future of furniture retail with a focus on craftsmanship, sustainability, and design.",
};

const openPositions = [
  {
    title: "Senior Product Designer",
    department: "Design",
    location: "Brooklyn, NY (Hybrid)",
    type: "Full-time",
    description:
      "Lead the design of our digital experiences, from our web platform to our AR features. You'll work closely with makers and customers to create intuitive, beautiful interfaces.",
  },
  {
    title: "Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Build the technology that connects makers with customers. You'll work on our Next.js platform, Sanity CMS integration, and AR visualization tools.",
  },
  {
    title: "Design Services Lead",
    department: "Customer Experience",
    location: "Brooklyn, NY",
    type: "Full-time",
    description:
      "Guide our customers through their furniture journey, managing our team of design consultants and developing our concierge service offerings.",
  },
  {
    title: "Maker Relations Manager",
    department: "Partnerships",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Be the bridge between Patina and our network of artisan workshops. You'll discover new makers, maintain relationships, and ensure quality standards.",
  },
  {
    title: "Content Producer",
    department: "Marketing",
    location: "Brooklyn, NY (Hybrid)",
    type: "Full-time",
    description:
      "Tell the stories of our makers and their craft. You'll create compelling content across photography, video, and written formats.",
  },
];

const values = [
  {
    title: "Craft Over Speed",
    description:
      "We believe in doing things right, not just fast. Quality work takes time, and we give our team the space to produce their best.",
  },
  {
    title: "Transparency First",
    description:
      "Open communication, honest feedback, and clear expectations. No hidden agendas, no politics—just good work.",
  },
  {
    title: "Sustainable Thinking",
    description:
      "From our products to our practices, we consider the long-term impact. This applies to how we treat our people too.",
  },
  {
    title: "Maker Mindset",
    description:
      "Everyone at Patina is a maker in some way. We value craftsmanship in all its forms—code, design, writing, and beyond.",
  },
];

const benefits = [
  "Competitive salary + equity",
  "Comprehensive health, dental, vision",
  "Unlimited PTO (we mean it)",
  "Remote-first flexibility",
  "Furniture discount (40% off)",
  "Professional development budget",
  "12 weeks parental leave",
  "401(k) with 4% match",
];

export default function CareersPage() {
  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pb-28 bg-[var(--patina-soft-cream)] overflow-hidden">
          <div
            className="absolute -bottom-20 -right-20 w-[400px] h-[300px] bg-[var(--patina-clay-beige)] opacity-[0.04] pointer-events-none"
            style={{
              borderRadius: "60% 40% 50% 50% / 50% 50% 40% 60%",
              transform: "rotate(15deg)",
            }}
          />

          <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-label text-[var(--patina-clay-beige)] mb-3">
              Join Our Team
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              Build something{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">lasting</em>
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed max-w-2xl mx-auto">
              We&apos;re a small team with a big mission: making it easy for people
              to discover and own furniture with stories worth telling. Join us.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
                Our values
              </h2>
              <p className="text-lg text-[var(--patina-mocha-brown)] max-w-xl mx-auto">
                These aren&apos;t just words on a wall—they guide every decision we make.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-[var(--patina-soft-cream)] p-6 rounded-[var(--radius-lg)]"
                >
                  <h3 className="font-medium text-[var(--patina-charcoal)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[var(--patina-mocha-brown)]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
                  Benefits & Perks
                </h2>
                <p className="text-lg text-[rgba(237,233,228,0.75)]">
                  We take care of our team so they can focus on doing their best work.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-[var(--patina-off-white)]"
                  >
                    <svg
                      className="w-5 h-5 text-[var(--patina-clay-beige)] flex-shrink-0"
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
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
                Open positions
              </h2>
              <p className="text-lg text-[var(--patina-mocha-brown)]">
                Find your place on our team.
              </p>
            </div>

            <div className="space-y-4">
              {openPositions.map((position) => (
                <article
                  key={position.title}
                  className="group bg-[var(--patina-soft-cream)] p-6 rounded-[var(--radius-lg)] hover:shadow-[var(--shadow-md)] transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-display font-semibold text-[var(--patina-charcoal)]">
                          {position.title}
                        </h3>
                        <span className="px-2 py-0.5 bg-[var(--patina-clay-beige)]/10 text-xs text-[var(--patina-clay-beige)] rounded-full">
                          {position.department}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--patina-mocha-brown)] mb-3">
                        {position.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-[var(--patina-clay-beige)]">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] rounded-[var(--radius-md)] text-sm font-medium transition-all hover:bg-[var(--patina-mocha-brown)] whitespace-nowrap"
                    >
                      Apply Now
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* No Match CTA */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-heading-2 text-[var(--patina-charcoal)] mb-4">
              Don&apos;t see a fit?
            </h2>
            <p className="text-[var(--patina-mocha-brown)] mb-8">
              We&apos;re always looking for talented people who share our values.
              Send us your portfolio or resume—we&apos;d love to hear from you.
            </p>
            <Link
              href="mailto:careers@patina.com"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--patina-charcoal)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-charcoal)] hover:text-[var(--patina-off-white)]"
            >
              Send General Application
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
