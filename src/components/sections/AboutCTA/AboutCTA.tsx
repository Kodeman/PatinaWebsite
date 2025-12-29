import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';
import { StrataMark } from '@/components/ui/StrataMark';
import { Button } from '@/components/ui/Button';
import { ctaContent } from '@/data/aboutContent';

export function AboutCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--patina-charcoal)] relative overflow-hidden">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="max-w-[700px] mx-auto text-center">
          {/* Strata Mark */}
          <FadeIn className="flex justify-center mb-8">
            <StrataMark size="medium" variant="reversed" />
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.1}>
            <h2 className="text-heading-1 text-[var(--patina-off-white)] mb-12">
              {ctaContent.headline}
            </h2>
          </FadeIn>

          {/* Action buttons */}
          <StaggerChildren staggerDelay={0.1} initialDelay={0.2}>
            <div className="grid sm:grid-cols-2 gap-4">
              {ctaContent.actions.map((action) => (
                <StaggerItem key={action.href}>
                  <Button
                    asChild
                    variant={action.variant === 'primary' ? 'primary' : 'secondary'}
                    size="lg"
                    className={`w-full ${action.variant === 'secondary' ? 'text-[var(--patina-clay-beige)] hover:text-[var(--patina-charcoal)]' : ''}`}
                  >
                    <Link href={action.href}>{action.label}</Link>
                  </Button>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </Container>
    </section>
  );
}
