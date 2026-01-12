import { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "../../../sanity/lib/client";
import { designersPageQuery } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "For Designers | Patina",
  description:
    "Join Patina's network of interior designers. Access exclusive pieces, earn commissions, and delight your clients with AR visualization tools.",
};

interface DesignersPageData {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHeadlineEmphasis?: string;
  heroDescription?: string;
  heroPrimaryCta?: { label: string; href: string };
  heroSecondaryCta?: { label: string; href: string };
  benefitsHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  benefits?: Array<{ title: string; description: string; icon?: string }>;
  testimonialsHeader?: { eyebrow?: string; headline?: string; subheadline?: string };
  testimonials?: Array<{
    _id: string;
    quote: string;
    author: string;
    title: string;
    location: string;
    image?: { asset?: { url: string }; alt?: string };
  }>;
  applyHeader?: { eyebrow?: string; headline?: string };
  applyDescription?: string;
}

const benefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Trade Pricing",
    description: "Access exclusive designer pricing on every piece. Earn competitive commissions on client purchases.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: "AR Client Presentations",
    description: "Show clients exactly how pieces will look in their space. Close deals faster with immersive visualization.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    title: "Curated Collections",
    description: "Every piece is vetted for quality and provenance. Recommend with confidence, backed by maker stories.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Dedicated Support",
    description: "Your own account manager for custom orders, rush deliveries, and special client requests.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "White Glove Delivery",
    description: "Professional installation included. We handle the logistics so you can focus on design.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Maker Introductions",
    description: "Connect directly with craftspeople for custom commissions and bespoke pieces.",
  },
];

const testimonials = [
  {
    quote: "Patina has transformed how I present furniture to clients. The AR feature alone has helped me close three major projects this quarter.",
    author: "Sarah Chen",
    title: "Principal, Chen Interiors",
    location: "San Francisco, CA",
  },
  {
    quote: "The quality is consistent, the stories are genuine, and my clients love knowing who made their furniture. It's become my go-to source.",
    author: "Marcus Webb",
    title: "Founder, Webb Design Studio",
    location: "Brooklyn, NY",
  },
];

export default async function DesignersPage() {
  const { isEnabled: isDraft } = await draftMode();

  const pageData = await sanityFetch<DesignersPageData | null>({
    query: designersPageQuery,
    isDraftMode: isDraft,
  });

  const displayBenefits = pageData?.benefits?.length ? pageData.benefits : benefits;
  const displayTestimonials = pageData?.testimonials?.length ? pageData.testimonials : testimonials;

  return (
    <>
      <Navigation variant="dark" />

      <main id="main-content">
        {/* Hero Section - Dark Theme */}
        <section className="relative min-h-[90vh] flex items-center bg-[var(--patina-charcoal)] overflow-hidden">
          {/* Paper texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Gradient accent */}
          <div
            className="absolute top-0 right-0 w-[60%] h-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at top right, rgba(163, 146, 124, 0.15) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-32">
            <div className="max-w-2xl">
              <p className="text-label text-[var(--patina-clay-beige)] mb-4">
                {pageData?.heroEyebrow || "For Designers"}
              </p>
              <h1 className="text-display-1 text-[var(--patina-off-white)] mb-6">
                {pageData?.heroHeadline || "Elevate your practice with"}{" "}
                <em className="italic text-[var(--patina-clay-beige)]">
                  {pageData?.heroHeadlineEmphasis || "exceptional craft"}
                </em>
              </h1>
              <p className="text-xl text-[rgba(237,233,228,0.75)] leading-relaxed mb-10">
                {pageData?.heroDescription || "Join a network of designers who source the world's finest handcrafted furniture. Trade pricing, AR visualization, and white-glove service—all designed for your workflow."}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={pageData?.heroPrimaryCta?.href || "#apply"}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg"
                >
                  {pageData?.heroPrimaryCta?.label || "Apply for Trade Access"}
                </a>
                <Link
                  href={pageData?.heroSecondaryCta?.href || "/furniture"}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--patina-clay-beige)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[rgba(163,146,124,0.1)]"
                >
                  {pageData?.heroSecondaryCta?.label || "Browse Collection"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 lg:py-28 bg-[var(--patina-warm-white)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                {pageData?.benefitsHeader?.eyebrow || "Trade Benefits"}
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)] mb-4">
                {pageData?.benefitsHeader?.headline || "Everything you need to"}{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  {pageData?.benefitsHeader?.subheadline || "succeed"}
                </em>
              </h2>
              <p className="text-lg text-[var(--patina-mocha-brown)] max-w-xl mx-auto">
                Tools, pricing, and support designed specifically for interior
                design professionals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)] p-8 transition-all duration-300 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--patina-warm-white)] text-[var(--patina-clay-beige)] mb-5">
                    {benefit.icon}
                  </div>
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

        {/* Testimonials */}
        <section className="py-20 lg:py-28 bg-[var(--patina-soft-cream)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                {pageData?.testimonialsHeader?.eyebrow || "Designer Stories"}
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
                {pageData?.testimonialsHeader?.headline || "Trusted by leading"}{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  {pageData?.testimonialsHeader?.subheadline || "designers"}
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {displayTestimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="bg-[var(--patina-warm-white)] rounded-[var(--radius-2xl)] p-8 lg:p-10"
                >
                  <svg
                    className="w-10 h-10 text-[var(--patina-clay-beige)] opacity-50 mb-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-xl text-[var(--patina-charcoal)] leading-relaxed mb-6">
                    {testimonial.quote}
                  </p>
                  <footer>
                    <p className="font-semibold text-[var(--patina-charcoal)]">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-[var(--patina-mocha-brown)]">
                      {testimonial.title}
                    </p>
                    <p className="text-sm text-[var(--patina-clay-beige)]">
                      {testimonial.location}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply" className="py-20 lg:py-28 bg-[var(--patina-charcoal)]">
          <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                {pageData?.applyHeader?.eyebrow || "Join Us"}
              </p>
              <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
                {pageData?.applyHeader?.headline || "Apply for trade access"}
              </h2>
              <p className="text-lg text-[rgba(237,233,228,0.75)]">
                {pageData?.applyDescription || "Tell us about your practice and we'll be in touch within 48 hours."}
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(163,146,124,0.3)] rounded-[var(--radius-md)] text-[var(--patina-off-white)] placeholder-[rgba(237,233,228,0.4)] focus:outline-none focus:border-[var(--patina-clay-beige)] transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(163,146,124,0.3)] rounded-[var(--radius-md)] text-[var(--patina-off-white)] placeholder-[rgba(237,233,228,0.4)] focus:outline-none focus:border-[var(--patina-clay-beige)] transition-colors"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(163,146,124,0.3)] rounded-[var(--radius-md)] text-[var(--patina-off-white)] placeholder-[rgba(237,233,228,0.4)] focus:outline-none focus:border-[var(--patina-clay-beige)] transition-colors"
                  placeholder="jane@designstudio.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
                >
                  Company / Studio Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(163,146,124,0.3)] rounded-[var(--radius-md)] text-[var(--patina-off-white)] placeholder-[rgba(237,233,228,0.4)] focus:outline-none focus:border-[var(--patina-clay-beige)] transition-colors"
                  placeholder="Smith Design Studio"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
                >
                  Website / Portfolio
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(163,146,124,0.3)] rounded-[var(--radius-md)] text-[var(--patina-off-white)] placeholder-[rgba(237,233,228,0.4)] focus:outline-none focus:border-[var(--patina-clay-beige)] transition-colors"
                  placeholder="https://smithdesign.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--patina-off-white)] mb-2"
                >
                  Tell us about your practice
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(163,146,124,0.3)] rounded-[var(--radius-md)] text-[var(--patina-off-white)] placeholder-[rgba(237,233,228,0.4)] focus:outline-none focus:border-[var(--patina-clay-beige)] transition-colors resize-none"
                  placeholder="What types of projects do you work on? What draws you to Patina?"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg"
              >
                Submit Application
              </button>

              <p className="text-center text-sm text-[rgba(237,233,228,0.5)]">
                By submitting, you agree to our{" "}
                <a href="#" className="underline hover:text-[var(--patina-clay-beige)]">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-[var(--patina-clay-beige)]">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
