// App Page Type Definitions

import type { PlaceholderImageMeta } from './about';

// Re-export for convenience
export type { PlaceholderImageMeta };

// Journey step icons
export type JourneyStepIcon = 'scan' | 'style' | 'recommend' | 'ar';

// Journey step for How It Works section
export interface JourneyStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  tagline: string;
  icon: JourneyStepIcon;
  imagePlaceholder?: PlaceholderImageMeta;
}

// Aesthete Engine pillar
export interface EnginePillar {
  id: string;
  title: string;
  description: string;
  examples?: string[];
  highlight?: string;
}

// Trust indicator
export interface TrustIndicator {
  id: string;
  icon: 'designer' | 'quality' | 'privacy';
  title: string;
  description: string;
}

// Handoff transfer item
export interface HandoffItem {
  id: string;
  text: string;
}

// CTA link
export interface CTALink {
  label: string;
  href: string;
}

// Comparison side for Problem Bridge section
export interface ComparisonSide {
  label: string;
  description: string;
  itemCount?: number;
  imagePlaceholder?: PlaceholderImageMeta;
}
