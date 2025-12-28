import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { StrataMark } from "@/components/ui/StrataMark";

export default function NotFound() {
  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-[70vh] flex items-center justify-center bg-[var(--patina-warm-white)]">
        <div className="text-center px-4 py-20">
          <StrataMark size="large" className="mx-auto mb-8 opacity-30" />

          <h1 className="text-display-1 text-[var(--patina-charcoal)] mb-4">
            Page not found
          </h1>
          <p className="text-xl text-[var(--patina-mocha-brown)] mb-10 max-w-md mx-auto">
            This piece seems to have moved. Let&apos;s help you find what
            you&apos;re looking for.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-mocha-brown)]"
            >
              Go Home
            </Link>
            <Link
              href="/furniture"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-soft-cream)]"
            >
              Browse Furniture
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
