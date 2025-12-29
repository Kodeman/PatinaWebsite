// App Page Content
// Content extracted from Design/Patina_App_Page_Update_Plan.md

import type {
  CTALink,
  ComparisonSide,
  EnginePillar,
  HandoffItem,
  JourneyStep,
  PlaceholderImageMeta,
  TrustIndicator,
} from '@/types/app';

// Hero Section Content
export const appHeroContent = {
  eyebrow: 'POWERED BY THE AESTHETE ENGINE',
  headline: 'Every room tells a story.',
  headlineEmphasis: "Let's discover yours.",
  subheadline:
    "Scan your space. Uncover your style. Find furniture that fits—not just the room, but the life you're building.",
  secondaryLine:
    'Designer-taught AI delivers focused recommendations, not endless scrolling.',
  primaryCTA: {
    label: 'Download for iOS',
    href: '#',
  } satisfies CTALink,
  secondaryCTA: {
    label: 'See How It Works',
    href: '#how-it-works',
  } satisfies CTALink,
  androidNote: 'Android coming soon',
  mockupPlaceholder: {
    id: 'app-hero-mockup',
    label: 'App Mockup',
    description: 'Phone showing AR placement with Aesthete Engine UI and room scan',
    priority: 'critical',
    aspectRatio: '9:19',
    suggestedSources: ['App screenshot', 'Design mockup'],
  } satisfies PlaceholderImageMeta,
};

// Problem/Solution Bridge Content
export const problemBridgeContent = {
  eyebrow: 'WHY PATINA',
  headline: "Other apps show you what's popular.",
  headlineEmphasis: "Patina shows you what's right.",
  paragraphs: [
    "You've scrolled through thousands of options. Measured twice. Second-guessed every decision. And still, something doesn't feel right.",
    "That's because algorithms show you what others bought—not what belongs in your home.",
    "Patina is different. Professional interior designers actively teach our AI what works. The Aesthete Engine learns your style through invisible signals—then surfaces only the furniture that truly fits.",
  ],
  comparison: {
    left: {
      label: 'The old way',
      description: 'Cluttered grid of 50+ furniture items showing overwhelming choice',
      itemCount: 50,
      imagePlaceholder: {
        id: 'comparison-cluttered',
        label: 'Cluttered Grid',
        description: 'Dense grid of 50+ furniture items representing typical furniture apps',
        priority: 'high',
        aspectRatio: '4:3',
        suggestedSources: ['Design mockup', 'Composite screenshot'],
      },
    } satisfies ComparisonSide,
    right: {
      label: 'The Patina way',
      description: 'Curated selection of 8 carefully chosen pieces with breathing room',
      itemCount: 8,
      imagePlaceholder: {
        id: 'comparison-curated',
        label: 'Curated Selection',
        description: 'Clean grid of 6-8 curated pieces with generous white space',
        priority: 'high',
        aspectRatio: '4:3',
        suggestedSources: ['Design mockup'],
      },
    } satisfies ComparisonSide,
  },
};

// Journey Steps (How It Works)
export const journeyContent = {
  eyebrow: 'HOW IT WORKS',
  headline: 'From scan to certainty',
  headlineEmphasis: 'in under 10 minutes.',
};

export const journeySteps: JourneyStep[] = [
  {
    id: 'room-scan',
    stepNumber: 1,
    title: 'Walk Your Room Together',
    description:
      'Point your phone at any corner and begin. Soft guidance appears where you need it—conversational, never technical. While you walk, Patina captures dimensions, light, existing furniture, and architectural features.',
    tagline: 'No tape measures. No graph paper.',
    icon: 'scan',
    imagePlaceholder: {
      id: 'step-room-scan',
      label: 'Room Scan',
      description: 'Phone scanning room with coaching overlay and capture indicators',
      priority: 'high',
      aspectRatio: '4:3',
      suggestedSources: ['App screenshot', 'Design mockup'],
    },
  },
  {
    id: 'style-discovery',
    stepNumber: 2,
    title: 'Style That Emerges Naturally',
    description:
      "Forget lengthy questionnaires. Style questions appear naturally during scanning—moments where material samples float in space and you tap what draws your eye. The Aesthete Engine also notices what you don't realize you're telling us. Quick taps reveal confidence. Slow swipes show thoughtfulness.",
    tagline: 'Your actions speak louder than survey answers.',
    icon: 'style',
    imagePlaceholder: {
      id: 'step-style-discovery',
      label: 'Style Discovery',
      description: 'Floating material samples in AR space during style questions',
      priority: 'high',
      aspectRatio: '4:3',
      suggestedSources: ['App screenshot', 'Design mockup'],
    },
  },
  {
    id: 'recommendations',
    stepNumber: 3,
    title: 'Designer-Taught Recommendations',
    description:
      "Recommendations appear like a design board being assembled—each piece carrying its story and a professional insight you won't find anywhere else.",
    tagline: '"Perfect for pet-free homes" • "Works best with 9\'+ ceilings" • "Marble needs coasters—always"',
    icon: 'recommend',
    imagePlaceholder: {
      id: 'step-recommendations',
      label: 'Recommendations',
      description: 'Design board with furniture cards and designer insight callouts',
      priority: 'high',
      aspectRatio: '4:3',
      suggestedSources: ['App screenshot', 'Design mockup'],
    },
  },
  {
    id: 'ar-preview',
    stepNumber: 4,
    title: 'Live With It First',
    description:
      'Place furniture in your actual room. Walk around it. Watch morning light catch the grain. Slide through sunset to see leather warm in the afternoon glow.',
    tagline: "Know a piece works before it arrives—because you've already lived with it.",
    icon: 'ar',
    imagePlaceholder: {
      id: 'step-ar-preview',
      label: 'AR Preview',
      description: 'AR furniture placement with time-of-day lighting slider',
      priority: 'high',
      aspectRatio: '4:3',
      suggestedSources: ['App screenshot', 'Design mockup'],
    },
  },
];

// Aesthete Engine Explainer Content
export const aestheteEngineContent = {
  eyebrow: 'THE AESTHETE ENGINE',
  headline: 'The intelligence behind the intuition.',
  subheadline:
    'Professional designers actively teach our AI—so recommendations feel curated by someone who actually knows you.',
  diagramPlaceholder: {
    id: 'engine-diagram',
    label: 'Learning Loop Diagram',
    description: 'Animated diagram showing Designer → Engine → User learning loop',
    priority: 'medium',
    aspectRatio: '16:9',
    suggestedSources: ['Design illustration', 'Animated SVG'],
  } satisfies PlaceholderImageMeta,
};

export const enginePillars: EnginePillar[] = [
  {
    id: 'designer-taught',
    title: 'Designer-Taught Intelligence',
    description: 'Real interior designers encode what no algorithm could discover:',
    examples: [
      '"This fabric pills with cats"',
      '"Perfect for entertainers who hate maintenance"',
    ],
  },
  {
    id: 'invisible-learning',
    title: 'Invisible Learning',
    description:
      'Your actions reveal authentic preferences—tap speed, zoom behavior, time spent viewing.',
    examples: ["We notice what you don't realize you're telling us."],
  },
  {
    id: 'profile-evolves',
    title: 'A Profile That Evolves',
    description: 'Start at 75% accuracy. Reach 90%+ over time.',
    highlight: '75% → 90%+',
    examples: ['The longer you use it, the better it knows you.'],
  },
];

// Designer Handoff Content
export const handoffContent = {
  eyebrow: 'DESIGNER HANDOFF',
  headline: "When you're ready for more,",
  headlineEmphasis: 'so is your profile.',
  description:
    "Some projects need more than an app. When you're ready, your room scan, style profile, and saved pieces transfer seamlessly to professional interior designers.",
  benefit:
    'No starting over. No re-explaining. Your designer receives the depth most consultations take weeks to achieve—before the first conversation.',
  cta: {
    label: 'Learn About Design Services',
    href: '/services',
  } satisfies CTALink,
};

export const handoffItems: HandoffItem[] = [
  { id: 'dimensions', text: 'Complete room dimensions and 3D model' },
  { id: 'style-profile', text: 'Your full style profile with confidence scores' },
  { id: 'behavioral', text: 'Behavioral signals revealing hidden preferences' },
  { id: 'saved-pieces', text: 'Saved pieces showing your direction' },
];

// Trust Section Content
export const trustContent = {
  eyebrow: 'WHY TRUST PATINA',
};

export const trustIndicators: TrustIndicator[] = [
  {
    id: 'designer-taught',
    icon: 'designer',
    title: 'Designer-Taught',
    description: 'Every piece carries professional expertise. Real designers teach our AI.',
  },
  {
    id: 'quality-curated',
    icon: 'quality',
    title: 'Quality Curated',
    description:
      'Every item meets standards for material integrity and longevity. Built to last decades.',
  },
  {
    id: 'privacy-first',
    icon: 'privacy',
    title: 'Privacy First',
    description: 'Your room stays yours. Scan data processed locally. No third-party sharing.',
  },
];

// Final CTA Content
export const appCTAContent = {
  headline: 'Ready to discover',
  headlineEmphasis: 'what belongs?',
  subheadline:
    "The best interiors aren't decorated—they're cultivated over time, with pieces that grow more beautiful with age.",
  tertiaryLine: 'Start your journey in under 10 minutes.',
  primaryCTA: {
    label: 'Download on the App Store',
    href: '#',
  } satisfies CTALink,
  secondaryText: 'Or browse our collection on the web.',
  secondaryLink: {
    label: 'browse our collection',
    href: '/furniture',
  } satisfies CTALink,
};

// All placeholder assets for asset guide generation
export const allAppPlaceholderAssets: PlaceholderImageMeta[] = [
  appHeroContent.mockupPlaceholder,
  problemBridgeContent.comparison.left.imagePlaceholder!,
  problemBridgeContent.comparison.right.imagePlaceholder!,
  ...journeySteps.filter((s) => s.imagePlaceholder).map((s) => s.imagePlaceholder!),
  aestheteEngineContent.diagramPlaceholder,
];
