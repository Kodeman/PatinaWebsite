'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { MaterialTexture } from '@/types/about';

interface ValueCardProps {
  title: string;
  description: string;
  materialTexture: MaterialTexture;
  className?: string;
}

const textureStyles: Record<MaterialTexture, { gradient: string; label: string }> = {
  wood: {
    gradient: 'from-[#8B7355] via-[#A08060] to-[#6B5344]',
    label: 'Wood Grain',
  },
  linen: {
    gradient: 'from-[#D4CFC6] via-[#E8E4DC] to-[#C8C2B8]',
    label: 'Linen Weave',
  },
  stone: {
    gradient: 'from-[#9A9590] via-[#B5B0AA] to-[#807A74]',
    label: 'Natural Stone',
  },
  leather: {
    gradient: 'from-[#8B6914] via-[#A67C00] to-[#6B4F0E]',
    label: 'Aged Leather',
  },
  clay: {
    gradient: 'from-[#C4A484] via-[#D4B494] to-[#A48A6A]',
    label: 'Terracotta Clay',
  },
};

export function ValueCard({ title, description, materialTexture, className }: ValueCardProps) {
  const texture = textureStyles[materialTexture];

  return (
    <motion.div
      className={cn(
        'group bg-[var(--patina-warm-white)] rounded-[var(--radius-xl)] overflow-hidden',
        'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
        'transition-shadow duration-300',
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Material Texture Header */}
      <div
        className={cn(
          'h-16 bg-gradient-to-br relative overflow-hidden',
          texture.gradient
        )}
        aria-hidden="true"
      >
        {/* Noise overlay for texture effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Texture label (visible in dev mode) */}
        {process.env.NODE_ENV === 'development' && (
          <span className="absolute bottom-2 right-2 text-[9px] text-white/60 font-medium uppercase tracking-wider">
            {texture.label}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h3 className="text-heading-3 text-[var(--patina-charcoal)] mb-3">{title}</h3>
        <p className="text-body-sm text-[var(--patina-mocha-brown)] leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
