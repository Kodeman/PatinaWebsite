import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "../../../sanity/lib/client";
import { makersQuery } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Our Makers | Patina",
  description:
    "Meet the artisan workshops, heritage manufacturers, and emerging brands behind Patina furniture. Every partner shares the same belief: furniture should outlast the room it's in.",
};

interface Maker {
  _id: string;
  name: string;
  slug: string;
  location: string;
  foundedYear: number;
  yearsOfCraft: number;
  badges: string[];
  quote?: string;
  imageUrl?: string;
}

const VALUES = [
  {
    title: "Built to Last",
    body:
      "We partner with makers and manufacturers who measure quality in decades, not seasons. Solid joinery. Honest materials. The kind of construction you can feel when you sit down.",
  },
  {
    title: "Transparency in Every Grain",
    body:
      "Our partners open the door to their process — where materials come from, how pieces are built, who builds them. No black-box supply chains.",
  },
  {
    title: "Craft Over Volume",
    body:
      "Whether you produce ten pieces a year or ten thousand, what matters is intention. Every Patina partner chooses quality of process over speed of output.",
  },
];

const PARTNER_TYPES = [
  {
    number: "01",
    title: "Artisan Workshops",
    body:
      "Solo makers and small studios where every piece carries a signature. You know the grain of every board that leaves your shop.",
  },
  {
    number: "02",
    title: "Heritage Manufacturers",
    body:
      "Brands with decades — or centuries — of craft knowledge built into their operations. Your factory floor has a story, and your furniture carries it forward.",
  },
  {
    number: "03",
    title: "Emerging Brands",
    body:
      "Design-forward companies building modern furniture with traditional values. You're scaling intentionally — growth without compromise.",
  },
];

export default async function MakersPage() {
  const { isEnabled: isDraft } = await draftMode();

  const makers = (await sanityFetch<Maker[]>({
    query: makersQuery,
    isDraftMode: isDraft,
  })) || [];

  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* ── Section 01 — Hero ── */}
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
              The People Behind the Pieces
            </p>
            <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
              Meet our{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">makers</em>
            </h1>
            <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed max-w-2xl mx-auto">
              Whether it&apos;s a single craftsperson shaping wood by hand or a
              heritage manufacturer refining techniques across generations —
              every partner on Patina shares the same belief: furniture should
              outlast the room it&apos;s in.
            </p>
          </div>
        </section>

        {/* ── Section 02 — Values Strip ── */}
        <section className="py-20 lg:py-24 bg-[var(--patina-pearl,var(--patina-soft-cream))]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-10 md:gap-12">
              {VALUES.map((v) => (
                <div key={v.title}>
                  <h3 className="font-display text-xl font-medium text-[var(--patina-charcoal)] mb-3">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[var(--patina-mocha-brown)] leading-[1.75]">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strata Rule divider */}
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col gap-[3px]" aria-hidden="true">
            <span className="h-[1.5px] bg-[var(--patina-clay-beige)] opacity-35 w-full" />
            <span className="h-[1.5px] bg-[var(--patina-clay-beige)] opacity-35 w-4/5" />
            <span className="h-[1.5px] bg-[var(--patina-clay-beige)] opacity-35 w-3/5" />
          </div>
        </div>

        {/* ── Section 03 — Partner Types ── */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-normal text-[var(--patina-charcoal)] leading-[1.2] mb-5">
              Who we{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">work with</em>
            </h2>
            <p className="text-[var(--patina-mocha-brown)] leading-[1.7] max-w-[560px] mb-10">
              Great furniture comes from many kinds of workshops. What they share
              matters more than how they differ.
            </p>

            <div className="flex flex-col gap-9">
              {PARTNER_TYPES.map((type) => (
                <div key={type.number} className="flex gap-7 items-start">
                  <div className="font-mono text-[11px] tracking-[0.1em] text-[var(--patina-clay-beige)] min-w-8 pt-1">
                    {type.number}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.4rem] font-medium text-[var(--patina-charcoal)] mb-2">
                      {type.title}
                    </h3>
                    <p className="text-[var(--patina-mocha-brown)] leading-[1.7] text-[0.95rem]">
                      {type.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Makers Grid (preserved from Sanity) ── */}
        {makers.length > 0 && (
          <section className="py-16 lg:py-20 bg-[var(--patina-soft-cream)]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3 text-center">
                Founding Partners
              </p>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-normal text-[var(--patina-charcoal)] text-center mb-12">
                A few of the{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">workshops</em>{" "}
                shaping our catalog
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {makers.map((maker) => (
                  <article
                    key={maker._id}
                    className="group bg-[var(--patina-warm-white)] rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-lg)]"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-[var(--patina-clay-beige)]/10">
                      {maker.imageUrl ? (
                        <Image
                          src={maker.imageUrl}
                          alt={`${maker.name} workshop`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-[var(--patina-clay-beige)] text-sm">
                            No image
                          </span>
                        </div>
                      )}
                      {maker.badges?.[0] && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <span className="text-xs font-medium text-[var(--patina-charcoal)]">
                            {maker.badges[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-semibold text-[var(--patina-charcoal)] mb-1">
                        {maker.name}
                      </h3>
                      <p className="text-sm text-[var(--patina-clay-beige)] mb-3">
                        {maker.location} · Est. {maker.foundedYear}
                      </p>
                      {maker.quote && (
                        <p className="text-sm text-[var(--patina-mocha-brown)] mb-4 italic">
                          &ldquo;{maker.quote}&rdquo;
                        </p>
                      )}
                      {maker.yearsOfCraft && (
                        <p className="text-xs uppercase tracking-wider text-[var(--patina-clay-beige)]">
                          {maker.yearsOfCraft} years of craft
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Section 04 — Partner CTA ── */}
        <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-[clamp(2rem,4.5vw,2.5rem)] font-normal text-[var(--patina-off-white)] leading-[1.2] mb-5">
              Build with{" "}
              <em className="italic text-[var(--patina-clay-beige)]">us</em>
            </h2>
            <p className="text-lg text-[rgba(237,233,228,0.75)] leading-[1.7] mb-10">
              We&apos;re growing our partner network with makers and
              manufacturers who believe furniture should age with character —
              not into a landfill. Whether you&apos;re a one-person shop or a
              heritage brand, if you value craft, transparency, and
              sustainability, we want to hear your story.
            </p>

            <div className="flex justify-center">
              <Link
                href="/makers/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg"
              >
                Apply to Partner
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section 05 — Referral ── */}
        <section className="py-16 lg:py-20 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[700px] mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-normal text-[var(--patina-charcoal)] leading-[1.2] mb-4">
              Know someone who{" "}
              <em className="italic text-[var(--patina-mocha-brown)]">
                belongs here?
              </em>
            </h2>
            <p className="text-[var(--patina-mocha-brown)] leading-relaxed mb-8 max-w-[560px] mx-auto">
              Great furniture comes from relationships — with materials, with
              process, and with people who care. If you know a maker or
              manufacturer who shares these values, introduce us.
            </p>
            <Link
              href="/makers/apply?ref=introduction"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--patina-charcoal)] hover:gap-3.5 transition-all duration-300"
            >
              Make an Introduction
              <span className="text-lg">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
