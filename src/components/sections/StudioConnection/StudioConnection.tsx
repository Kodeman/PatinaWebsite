import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/motion';
import { studioConnectionContent } from '@/data/aboutContent';

export function StudioConnection() {
  return (
    <section className="py-16 lg:py-20 bg-[var(--patina-charcoal)] relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <FadeIn>
          <div className="max-w-[700px] mx-auto text-center">
            {/* Logo */}
            <div className="w-16 h-24 mx-auto mb-6 relative">
              <Image
                src="/images/partners/middlewest-logo-white.png"
                alt="Middlewest Studio"
                fill
                className="object-contain"
              />
            </div>

            {/* Wordmark */}
            <div className="w-48 h-6 mx-auto mb-8 relative">
              <Image
                src="/images/partners/middlewest-wordmark-white.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>

            {/* Heading */}
            <h2 className="text-heading-2 text-[var(--patina-off-white)] mb-4">
              {studioConnectionContent.heading}
            </h2>

            {/* Description */}
            <p className="text-body text-[var(--patina-off-white)]/70 leading-relaxed mb-6">
              {studioConnectionContent.description}
            </p>

            {/* External link */}
            <a
              href={studioConnectionContent.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--patina-clay-beige)] hover:text-[var(--patina-off-white)] transition-colors font-medium"
            >
              {studioConnectionContent.linkText}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
