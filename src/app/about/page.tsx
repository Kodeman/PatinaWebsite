import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StrataMark } from "@/components/ui/StrataMark";

export const metadata: Metadata = {
  title: "Our Story | Patina",
  description:
    "Patina connects you with furniture that has meaning—pieces crafted by artisans with decades of tradition, materials with provenance, and stories worth telling.",
};

const values = [
  {
    title: "Craft Over Mass",
    description:
      "Every piece in our collection is made by human hands. We believe the subtle imperfections of handcraft add character that machines can never replicate.",
  },
  {
    title: "Stories Worth Telling",
    description:
      "Furniture should come with a story—where it was made, who made it, and why it matters. We document the provenance of every piece.",
  },
  {
    title: "Time Adds Value",
    description:
      "Our tagline reflects our core belief: great furniture, like great wine, improves with age. We select pieces designed to become heirlooms.",
  },
  {
    title: "Transparency Always",
    description:
      "From materials sourcing to maker compensation, we believe in radical transparency. Ask us anything about how our pieces are made.",
  },
];

const timeline = [
  {
    year: "2021",
    title: "The Spark",
    description:
      "After years of working in tech, our founders became frustrated with disposable furniture. They set out to build something different.",
  },
  {
    year: "2022",
    title: "First Makers",
    description:
      "We partnered with our first five artisan workshops, spending months learning their craft and documenting their stories.",
  },
  {
    year: "2023",
    title: "AR Launch",
    description:
      "We launched our AR visualization tool, letting customers see furniture in their actual spaces before purchasing.",
  },
  {
    year: "2024",
    title: "Growing Network",
    description:
      "Now working with 50+ makers across three continents, we're building the largest curated marketplace for artisan furniture.",
  },
];

const team = [
  {
    name: "Elena Vasquez",
    role: "Co-Founder & CEO",
    bio: "Former product lead at Airbnb. Obsessed with connecting people to meaningful experiences.",
  },
  {
    name: "James Okonkwo",
    role: "Co-Founder & CTO",
    bio: "Built AR tools at Apple. Believes technology should enhance, not replace, human connection.",
  },
  {
    name: "Sarah Chen",
    role: "Head of Maker Relations",
    bio: "Furniture historian and curator. Spent a decade documenting craft traditions worldwide.",
  },
  {
    name: "Marcus Webb",
    role: "Head of Design",
    bio: "Former interior designer. Believes everyone deserves access to beautifully made furniture.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pb-28 bg-[var(--patina-soft-cream)] overflow-hidden">
          {/* Organic shapes */}
          <div
            className="absolute -bottom-20 -left-20 w-[400px] h-[300px] bg-[var(--patina-clay-beige)] opacity-[0.04] pointer-events-none"
            style={{
              borderRadius: "60% 40% 50% 50% / 50% 50% 40% 60%",
              transform: "rotate(-15deg)",
            }}
          />

          <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <StrataMark size="medium" className="mx-auto mb-8" />
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              Where time adds{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">value</em>
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed max-w-2xl mx-auto">
              Patina exists to connect people with furniture that has meaning—pieces
              crafted by artisans with decades of tradition, materials with
              provenance, and stories worth telling.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                  Our Mission
                </p>
                <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-6">
                  Fighting furniture{" "}
                  <em className="italic text-[var(--patina-mocha-brown)]">
                    fast fashion
                  </em>
                </h2>
                <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed mb-6">
                  The furniture industry has a problem. Billions of dollars worth
                  of cheaply made furniture ends up in landfills every year.
                  Meanwhile, skilled artisans struggle to find customers who
                  value their craft.
                </p>
                <p className="text-lg text-[var(--patina-mocha-brown)] leading-relaxed">
                  We&apos;re building a different model—one where quality is
                  celebrated, makers are fairly compensated, and furniture is
                  designed to last generations, not seasons.
                </p>
              </div>
              <div className="aspect-square rounded-[var(--radius-2xl)] bg-gradient-to-br from-[#D8D2C8] to-[#C4BDB0] flex items-center justify-center">
                <span className="text-xs tracking-widest uppercase text-[var(--patina-mocha-brown)] bg-white/80 px-4 py-2 rounded-md">
                  Workshop Photography
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                What We Believe
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
                Our values guide{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  every decision
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-[var(--patina-warm-white)] rounded-[var(--radius-xl)] p-8"
                >
                  <h3 className="text-xl font-display font-semibold text-[var(--patina-charcoal)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[var(--patina-mocha-brown)]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                Our Journey
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
                How we got{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">here</em>
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--patina-clay-beige)] opacity-30 md:-translate-x-1/2" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[var(--patina-clay-beige)] rounded-full md:-translate-x-1/2 mt-2" />

                    {/* Content */}
                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${
                        index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                      }`}
                    >
                      <span className="text-sm font-medium text-[var(--patina-clay-beige)]">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-display font-semibold text-[var(--patina-charcoal)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[var(--patina-mocha-brown)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                The Team
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
                The people behind{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  Patina
                </em>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="aspect-square rounded-full bg-gradient-to-br from-[#D8D2C8] to-[#C4BDB0] mb-4 flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase text-[var(--patina-mocha-brown)] bg-white/80 px-3 py-1 rounded-md">
                      Photo
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-[var(--patina-charcoal)]">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[var(--patina-clay-beige)] mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-[var(--patina-mocha-brown)]">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
          {/* Paper texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
              Join us in changing how the world{" "}
              <em className="italic text-[var(--patina-clay-beige)]">
                furnishes
              </em>
            </h2>
            <p className="text-lg text-[rgba(237,233,228,0.75)] mb-10">
              Whether you&apos;re a maker, designer, or someone who believes in
              furniture with meaning—we&apos;d love to connect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/furniture"
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg"
              >
                Explore Collection
              </Link>
              <Link
                href="/designers"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--patina-clay-beige)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[rgba(163,146,124,0.1)]"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
