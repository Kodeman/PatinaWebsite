'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { AgedPaperCard } from '@/components/ui/AgedPaperCard';
import { useReducedMotion } from '@/hooks';
import { nameDefinitionContent } from '@/data/aboutContent';

interface NameDefinitionProps {
  word?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  definition?: string;
  quote?: string;
}

export function NameDefinition({ word, pronunciation, partOfSpeech, definition, quote }: NameDefinitionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background with subtle parallax */}
      <div className="absolute inset-0">
        <PlaceholderImage
          meta={nameDefinitionContent.backgroundPlaceholder}
          className="w-full h-full"
          showMetadata={false}
        />
        <div className="absolute inset-0 bg-[var(--patina-charcoal)]/60" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-[600px] mx-auto">
          {/* Dictionary card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: [0.4, 0, 0.2, 1] as const,
            }}
          >
            <AgedPaperCard className="p-8 lg:p-12 text-center">
              <h2 className="text-display-2 text-[var(--patina-charcoal)] mb-2 font-serif">
                {word || nameDefinitionContent.word}
              </h2>
              <p className="text-body text-[var(--patina-mocha-brown)] mb-4 font-mono">
                {pronunciation || nameDefinitionContent.pronunciation}
              </p>
              <p className="text-label text-[var(--patina-clay-beige)] mb-6">
                {partOfSpeech || nameDefinitionContent.partOfSpeech}
              </p>
              <p className="text-lg text-[var(--patina-charcoal)] leading-relaxed">
                {definition || nameDefinitionContent.definition}
              </p>
            </AgedPaperCard>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: [0.4, 0, 0.2, 1] as const,
            }}
          >
            <p className="text-xl text-[var(--patina-off-white)] italic leading-relaxed">
              {quote || nameDefinitionContent.quote}
            </p>
          </motion.blockquote>
        </div>
      </Container>
    </section>
  );
}
