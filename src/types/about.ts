// About Page Type Definitions

// Placeholder image metadata for asset tracking
export interface PlaceholderImageMeta {
  id: string;
  label: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  aspectRatio: string;
  suggestedSources: string[];
  /** Actual image URL - when provided, PlaceholderImage renders the real image */
  imageUrl?: string;
}

// Material textures for value cards
export type MaterialTexture = 'wood' | 'linen' | 'stone' | 'leather' | 'clay';

// Brand value with material texture
export interface BrandValue {
  id: string;
  title: string;
  description: string;
  materialTexture: MaterialTexture;
}

// Founder data
export interface Founder {
  id: string;
  name: string;
  role: string;
  title: string;
  focus: string;
  bio: string;
  credentials: string[];
  location: string;
  imageUrl?: string;
  imagePlaceholder: PlaceholderImageMeta;
}

// Timeline milestone icons
export type TimelineIcon = 'spark' | 'code' | 'ar' | 'network';

// Timeline milestone
export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  quote?: string;
  icon: TimelineIcon;
}

// Origin story narrative block
export interface NarrativeBlock {
  id: string;
  title: string;
  content: string;
  quote?: string;
  imagePlaceholder?: PlaceholderImageMeta;
}

// Problem section statistic
export interface ProblemStatistic {
  value: string;
  description: string;
}

// CTA action button
export interface CTAAction {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}
