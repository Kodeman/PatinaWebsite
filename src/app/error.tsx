"use client";

import { useEffect } from "react";
import Link from "next/link";
import { StrataMark } from "@/components/ui/StrataMark";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--patina-warm-white)]">
      <div className="text-center px-4 py-20">
        <StrataMark size="large" className="mx-auto mb-8 opacity-30" />

        <h1 className="text-display-2 text-[var(--patina-charcoal)] mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-[var(--patina-mocha-brown)] mb-10 max-w-md mx-auto">
          We encountered an unexpected error. Our team has been notified and
          we&apos;re working to fix it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--patina-clay-beige)] text-[var(--patina-off-white)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-mocha-brown)]"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--patina-clay-beige)] text-[var(--patina-charcoal)] rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:bg-[var(--patina-soft-cream)]"
          >
            Go Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-sm text-[var(--patina-clay-beige)]">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
