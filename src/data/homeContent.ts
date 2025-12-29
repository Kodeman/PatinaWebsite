// Homepage Content
// Content extracted from Design/Patina_Homepage_Update_Plan.md
// Integrates The Aesthete Engine positioning

// Hero Section
export const heroContent = {
  title: "Where Time ",
  titleEmphasis: "Adds Value",
  description:
    "Discover furniture that grows more beautiful with every year. See it in your space. Know the makers.",
  secondaryLine:
    "Powered by The Aesthete Engine—designer-taught intelligence that learns what you love.",
  trustLine: "Heritage makers since 1904",
  primaryCta: { label: "Get the App", href: "/app" },
};

// Value Proposition Section
export const valuePropositionContent = {
  eyebrow: "WHY PATINA",
  headline: "Furniture with meaning",
  subheadline:
    "Every piece tells a story of craftsmanship, materials, and the makers who bring them to life.",
};

export type ValueFeature = {
  id: string;
  icon: "sparkle" | "clock" | "heart";
  title: string;
  description: string;
};

export const valueFeatures: ValueFeature[] = [
  {
    id: "discover-style",
    icon: "sparkle",
    title: "Discover Your Style",
    description:
      "The Aesthete Engine learns what draws your eye—then shows you furniture that fits not just your room, but your life. No questionnaires. Just intuition.",
  },
  {
    id: "know-makers",
    icon: "clock",
    title: "Know the Makers",
    description:
      "Every piece comes with its story—the craftspeople, traditions, and materials that make it special. Plus designer insights you won't find anywhere else.",
  },
  {
    id: "quality-lasts",
    icon: "heart",
    title: "Quality That Lasts",
    description:
      "Furniture built to become heirlooms. Materials and craftsmanship that age beautifully. Curated by designers who know what lasts.",
  },
];

// Aesthete Engine Section (NEW)
export const aestheteEngineHomeContent = {
  eyebrow: "THE INTELLIGENCE",
  headline: "Other apps show you what's popular.",
  headlineEmphasis: "Patina shows you what's right.",
  body: "The Aesthete Engine is our proprietary intelligence system where professional interior designers actively teach the AI what no algorithm could discover on its own. The result? Recommendations that feel curated by someone who actually knows you.",
  cta: { label: "See how it works in the app", href: "/app" },
};

export type EnginePillarHome = {
  id: string;
  icon: "graduation" | "eye" | "trending-up";
  title: string;
  description: string;
  examples?: string[];
  highlight?: string;
};

export const homeEnginePillars: EnginePillarHome[] = [
  {
    id: "designer-taught",
    icon: "graduation",
    title: "Designer-Taught Intelligence",
    description:
      "Real interior designers encode their expertise into every recommendation:",
    examples: [
      '"This leather only gets better with age"',
      '"Marble needs coasters—always"',
      '"Perfect for pet-free homes"',
    ],
  },
  {
    id: "invisible-learning",
    icon: "eye",
    title: "Invisible Learning",
    description:
      "Your actions reveal authentic preferences. Quick taps show confidence. Slow swipes reveal thoughtfulness. Time spent viewing signals genuine interest.",
    highlight: "We notice what you don't realize you're telling us.",
  },
  {
    id: "always-improving",
    icon: "trending-up",
    title: "Always Improving",
    description:
      "Start at 75% match accuracy. Reach 90%+ over time. The Aesthete Engine doesn't just remember your preferences—it understands the patterns behind them.",
    highlight: "75% → 90%+",
  },
];

// Experience Section (AR Showcase)
export const experienceContent = {
  eyebrow: "THE EXPERIENCE",
  headline: "From scan to certainty",
  headlineEmphasis: "in under 10 minutes.",
  body: "Walk your room. Discover your style. Find furniture that fits—not just the space, but the life you're building. The Aesthete Engine does the filtering. You do the deciding.",
};

export type ExperienceStep = {
  number: number;
  title: string;
  text: string;
};

export const experienceSteps: ExperienceStep[] = [
  {
    number: 1,
    title: "Walk your room together",
    text: "Point and scan while style questions emerge naturally. No forms. No interrogation.",
  },
  {
    number: 2,
    title: "See what fits",
    text: "Not 10,000 options to sort. 10 pieces that belong—each carrying a designer's insight.",
  },
  {
    number: 3,
    title: "Live with it first",
    text: "Watch morning light catch the grain. See it at sunset. Know it works before it arrives.",
  },
  {
    number: 4,
    title: "Purchase with clarity",
    text: "Every piece vetted by designers. Every fit confirmed by you.",
  },
];

// Makers Section
export const makersContent = {
  eyebrow: "THE MAKERS",
  headline: "Meet the craftspeople",
  body: "Every piece in our collection comes from makers we trust—artisans with generations of expertise. Professional designers evaluate each partnership, so quality is assured before a piece ever reaches your screen.",
};

export const featuredMakers = [
  {
    name: "Vermont Woodworks",
    location: "Burlington, Vermont",
    heritage: "Since 1972 · 50+ Years",
    specialty: "Sustainable hardwood",
    imageUrl:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Nakashima Workshop",
    location: "New Hope, Pennsylvania",
    heritage: "Est. 1946 · 3rd Generation",
    specialty: "Live edge wood",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Sashimono Studio",
    location: "Kyoto, Japan",
    heritage: "Since 1923 · Master Craftsman",
    specialty: "Traditional joinery",
    imageUrl:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=500&fit=crop&q=80",
  },
  {
    name: "Studio Piet",
    location: "Copenhagen, Denmark",
    heritage: "Est. 2015 · Carbon Neutral",
    specialty: "Scandinavian design",
    imageUrl:
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=500&fit=crop&q=80",
  },
];

// Testimonials Section
export const testimonialsContent = {
  eyebrow: "COMMUNITY",
  headline: "Loved by design enthusiasts",
};

export type Testimonial = {
  quote: string;
  author: string;
  location: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The AR feature saved me from a huge mistake. I could see the sofa was too large before ordering. Game changer.",
    author: "Sarah M.",
    location: "Chicago, IL",
  },
  {
    quote:
      "I was skeptical about an app understanding my style. But the recommendations were eerily accurate—it showed me pieces I didn't know I wanted but immediately loved.",
    author: "Alex R.",
    location: "Denver, CO",
  },
  {
    quote:
      "The little notes on each piece—'better with 9ft ceilings' or 'this fabric shows pet hair'—saved me from mistakes I would have made anywhere else.",
    author: "Rachel K.",
    location: "Minneapolis, MN",
  },
];

export type TrustBadge = {
  value: string;
  label: string;
};

export const trustBadges: TrustBadge[] = [
  { value: "4.8★", label: "App Store Rating" },
  { value: "10K+", label: "Happy Users" },
  { value: "90%+", label: "Match Accuracy" },
  { value: "50+", label: "Heritage Makers" },
];

// Designer Services Section
export const designerServicesContent = {
  eyebrow: "PROFESSIONAL HELP",
  headline: "When you're ready for more,",
  headlineEmphasis: "so is your profile.",
  body: "Some projects need more than an app. When you're ready, your room scan, style profile, and saved pieces transfer seamlessly to professional designers.",
  benefit:
    "No starting over. No re-explaining. Your designer receives the depth most consultations take weeks to achieve—before the first conversation.",
  handoffItems: [
    "Complete room dimensions and 3D model",
    "Your full style profile with confidence scores",
    "Behavioral signals revealing hidden preferences",
    "Saved pieces showing your direction",
  ],
  cta: { label: "Learn About Design Services", href: "/services" },
  // New stock image for designer handoff
  imageUrl:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=80",
};

// Final CTA Section
export const finalCtaContent = {
  eyebrow: "GET STARTED",
  headline: "Ready to discover",
  headlineEmphasis: "what belongs?",
  body: "The best interiors aren't decorated—they're cultivated over time, with pieces that grow more beautiful with age. Let The Aesthete Engine show you where to start.",
  secondary: "Scan your first room in under 10 minutes.",
  primaryCta: { label: "Download on the App Store", href: "/app" },
  secondaryLink: { label: "explore furniture on web", href: "/furniture" },
};
