import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Get the App | Patina",
  description:
    "Download the Patina app to visualize furniture in your space with AR, discover artisan makers, and connect with designers.",
};

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: "AR Visualization",
    description: "See how furniture looks in your actual space before you buy.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Maker Stories",
    description: "Explore the craftspeople behind each piece through immersive stories.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "Save Favorites",
    description: "Create collections of pieces you love and share with designers.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Designer Connect",
    description: "Work with expert designers directly through the app.",
  },
];

export default function AppPage() {
  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen bg-[var(--patina-warm-white)]">
        {/* Hero */}
        <section className="relative pt-32 pb-20 lg:pb-28 bg-gradient-to-b from-[var(--patina-soft-cream)] to-[var(--patina-warm-white)] overflow-hidden">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                  Patina App
                </p>
                <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-6">
                  Furniture shopping,{" "}
                  <em className="italic text-[var(--patina-mocha-brown)]">
                    reimagined
                  </em>
                </h1>
                <p className="text-xl text-[var(--patina-mocha-brown)] leading-relaxed mb-10">
                  See how pieces look in your space with AR. Discover the makers
                  behind the craft. Find furniture that tells a story.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--patina-charcoal)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-black shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Download for iOS
                  </a>
                  <div className="inline-flex items-center justify-center px-6 py-3 text-[var(--patina-mocha-brown)] text-sm">
                    <span className="mr-2">Android coming soon</span>
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
                        d="M12 6v6h4.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* App mockup placeholder */}
              <div className="relative mx-auto max-w-[300px]">
                <div className="aspect-[9/19] bg-[var(--patina-charcoal)] rounded-[40px] p-3 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-[#D8D2C8] to-[#C4BDB0] rounded-[32px] flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase text-[var(--patina-mocha-brown)] bg-white/80 px-4 py-2 rounded-md">
                      App Screenshot
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 lg:py-28">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-label text-[var(--patina-clay-beige)] mb-3">
                Features
              </p>
              <h2 className="text-heading-1 text-[var(--patina-charcoal)]">
                Everything you need to{" "}
                <em className="italic text-[var(--patina-mocha-brown)]">
                  discover
                </em>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-5 p-6 bg-[var(--patina-soft-cream)] rounded-[var(--radius-xl)]"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-[var(--patina-warm-white)] rounded-full flex items-center justify-center text-[var(--patina-clay-beige)]">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-[var(--patina-charcoal)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--patina-mocha-brown)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-4">
              Ready to discover furniture with{" "}
              <em className="italic text-[var(--patina-clay-beige)]">meaning</em>?
            </h2>
            <p className="text-lg text-[rgba(237,233,228,0.75)] mb-10">
              Join thousands discovering artisan-crafted furniture through AR.
            </p>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-off-white)] shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on the App Store
            </a>

            <p className="mt-6 text-sm text-[rgba(237,233,228,0.5)]">
              Or{" "}
              <Link
                href="/furniture"
                className="underline hover:text-[var(--patina-clay-beige)]"
              >
                browse our collection
              </Link>{" "}
              on the web.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
