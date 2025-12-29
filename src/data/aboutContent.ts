import type {
  BrandValue,
  CTAAction,
  Founder,
  NarrativeBlock,
  PlaceholderImageMeta,
  TimelineMilestone,
} from '@/types/about';

// Hero Section Content
export const heroContent = {
  headline: 'Where Time Adds Value',
  subheadline:
    "A husband and wife. A design problem nobody could quite name. And a belief that the best interiors aren't decorated—they're cultivated.",
  backgroundPlaceholder: {
    id: 'about-hero-bg',
    label: 'Hero Background',
    description: 'Aged furniture in morning light showing beautiful patina',
    priority: 'critical' as const,
    aspectRatio: '16:9',
    suggestedSources: ['Professional shoot', 'Stock'],
    imageUrl: 'https://images.unsplash.com/photo-1585803114088-cd027272106a?w=1920&h=1080&fit=crop&q=80',
  } satisfies PlaceholderImageMeta,
};

// Problem Section Content
export const problemContent = {
  heading: 'The Problem',
  description:
    'Billions of dollars of furniture ends up in landfills every year. Meanwhile, skilled artisans can\'t find customers who value their craft.',
  statistic: {
    value: '60-70%',
    description: 'of designer time consumed by manual tasks, not creative work',
  },
  leftImage: {
    id: 'landfill-furniture',
    label: 'Landfill Furniture',
    description: 'Furniture waste/landfill scene - impactful but not gratuitous',
    priority: 'high' as const,
    aspectRatio: '4:3',
    suggestedSources: ['Stock'],
  } satisfies PlaceholderImageMeta,
  rightImage: {
    id: 'artisan-at-work',
    label: 'Artisan at Work',
    description: 'Craftsman at workbench, hands at work, workshop environment',
    priority: 'high' as const,
    aspectRatio: '4:3',
    suggestedSources: ['Partner maker shoot', 'Stock'],
    imageUrl: 'https://images.unsplash.com/photo-1631396328075-9c65a7406f09?w=800&h=600&fit=crop&q=80',
  } satisfies PlaceholderImageMeta,
};

// Origin Story Narrative Blocks
export const narrativeBlocks: NarrativeBlock[] = [
  {
    id: 'designers-dilemma',
    title: "The Designer's Dilemma",
    content: '',
    quote:
      '"They have incredible taste," Leah would say. "They know exactly what they don\'t want. But the moment I show them a piece, they can\'t see it. Not really. Not in their space."',
    imagePlaceholder: {
      id: 'design-materials',
      label: 'Design Materials',
      description: "Leah's material library or design presentation",
      priority: 'medium' as const,
      aspectRatio: '4:3',
      suggestedSources: ['Stage or photograph'],
      imageUrl: 'https://images.unsplash.com/photo-1649930536248-df58fd1f54f8?w=800&h=600&fit=crop&q=80',
    },
  },
  {
    id: 'technologists-itch',
    title: "The Technologist's Itch",
    content:
      "Kody had spent years watching how technology could either enhance human experience or bulldoze it. When AR started becoming viable, he felt something shift. But every app he downloaded missed something essential. They felt like technology demos—cold grids and clinical interfaces.",
    imagePlaceholder: {
      id: 'ar-prototype',
      label: 'AR Prototype',
      description: 'Early AR visualization screenshot or photo',
      priority: 'medium' as const,
      aspectRatio: '4:3',
      suggestedSources: ['Screenshot', 'Photograph'],
    },
  },
  {
    id: 'aha-moment',
    title: 'The Aha Moment',
    content: '',
    quote: '"What if the technology came after the design thinking?"',
    imagePlaceholder: {
      id: 'whiteboard-sketch',
      label: 'Whiteboard Sketch',
      description: 'Whiteboard, napkin sketches, or diagrams showing early ideation',
      priority: 'medium' as const,
      aspectRatio: '4:3',
      suggestedSources: ['Stage or photograph'],
      imageUrl: 'https://images.unsplash.com/photo-1676277757211-ebd7fdeb3d5b?w=800&h=600&fit=crop&q=80',
    },
  },
  {
    id: 'building-together',
    title: 'Building Together',
    content:
      'They made rules: No sterile SKU grids. Stories over specifications. The technology should feel like a friend, not a robot.',
  },
];

// Kitchen Table Hero Image
export const originStoryHero: PlaceholderImageMeta = {
  id: 'kitchen-table',
  label: 'Kitchen Table Scene',
  description:
    'Design materials spread on table - laptop, fabric swatches, coffee cups, sketches',
  priority: 'medium' as const,
  aspectRatio: '16:9',
  suggestedSources: ['Stage or photograph'],
  imageUrl: 'https://images.unsplash.com/photo-1662117940162-b666fea153cb?w=1280&h=720&fit=crop&q=80',
};

// Name Definition Section
export const nameDefinitionContent = {
  word: 'Patina',
  pronunciation: '/pəˈtēnə/',
  partOfSpeech: 'noun',
  definition:
    'The surface appearance that develops through age and exposure, adding depth, character, and value.',
  quote:
    '"It was everything we wanted the platform to represent. The opposite of disposable. A celebration of things that grow more valuable with time."',
  backgroundPlaceholder: {
    id: 'patina-macro',
    label: 'Patina Close-up',
    description: 'Macro of aged leather, wood grain, brass, or stone showing patina',
    priority: 'high' as const,
    aspectRatio: '16:9',
    suggestedSources: ['Stock', 'Professional shoot'],
    imageUrl: 'https://images.unsplash.com/photo-1571829604981-ea159f94e5ad?w=1920&h=1080&fit=crop&q=80',
  } satisfies PlaceholderImageMeta,
};

// Brand Values
export const brandValues: BrandValue[] = [
  {
    id: 'listen-first',
    title: 'Listen First, Design Second',
    description:
      "Mirror Middlewest Studio's consultative mantra. We understand you before we show you anything.",
    materialTexture: 'wood',
  },
  {
    id: 'craft-over-mass',
    title: 'Craft Over Mass',
    description:
      'Every piece in our collection is made by human hands. The subtle imperfections of handcraft add character.',
    materialTexture: 'linen',
  },
  {
    id: 'time-adds-value',
    title: 'Time Adds Value',
    description:
      'Great furniture, like great wine, improves with age. We select pieces designed to become heirlooms.',
    materialTexture: 'stone',
  },
  {
    id: 'stories-over-specs',
    title: 'Stories Over Specs',
    description: 'Lead with provenance and craftsmanship, not dimensions and SKUs.',
    materialTexture: 'leather',
  },
  {
    id: 'heartland-roots',
    title: 'Heartland Roots',
    description: 'Born in Madison, Wisconsin. Midwestern honesty and heritage craftsmanship.',
    materialTexture: 'clay',
  },
];

// Founders
export const founders: Founder[] = [
  {
    id: 'leah',
    name: 'Leah Kochaver',
    role: 'Co-Founder',
    title: 'Design & Experience',
    focus: 'Design & Experience',
    bio: 'Founder of Middlewest Studio. Believes the best interiors are cultivated, not decorated.',
    credentials: ['Founder of Middlewest Studio'],
    location: 'Madison, Wisconsin',
    imagePlaceholder: {
      id: 'leah-headshot',
      label: 'Leah Headshot',
      description: 'Professional portrait with warm, natural lighting',
      priority: 'critical' as const,
      aspectRatio: '3:4',
      suggestedSources: ['Professional shoot'],
    },
  },
  {
    id: 'kody',
    name: 'Kody Kochaver',
    role: 'Co-Founder',
    title: 'Technology & Product',
    focus: 'Technology & Product',
    bio: 'Former Starbucks Corporate. Previous startup CEO with Microsoft seed funding.',
    credentials: ['Former Starbucks Corporate', 'Previous startup CEO', 'Microsoft seed funding'],
    location: 'Madison, Wisconsin',
    imagePlaceholder: {
      id: 'kody-headshot',
      label: 'Kody Headshot',
      description: 'Professional portrait with warm, natural lighting',
      priority: 'critical' as const,
      aspectRatio: '3:4',
      suggestedSources: ['Professional shoot'],
    },
  },
];

// Founders Together Image
export const foundersTogetherImage: PlaceholderImageMeta = {
  id: 'founders-together',
  label: 'Founders Together',
  description: 'Kody & Leah together, candid, warm lighting',
  priority: 'critical' as const,
  aspectRatio: '16:9',
  suggestedSources: ['Professional shoot'],
};

// Studio Connection
export const studioConnectionContent = {
  heading: 'Born From Real Design Work',
  description:
    "Patina didn't come from a business plan—it came from years of real interior design work at Middlewest Studio. Every feature solves a problem Leah encountered with actual clients in Madison-area homes.",
  linkText: 'Visit Middlewest Studio',
  linkUrl: 'https://middlewest.studio',
  logoPlaceholder: {
    id: 'middlewest-logo',
    label: 'Middlewest Studio Logo',
    description: 'Middlewest Studio logo/mark',
    priority: 'low' as const,
    aspectRatio: '1:1',
    suggestedSources: ['Brand assets'],
  } satisfies PlaceholderImageMeta,
};

// Timeline Milestones
export const timeline: TimelineMilestone[] = [
  {
    year: '2023',
    title: 'The Spark',
    description:
      'After years at the kitchen table, sketching on napkins and arguing about user flows, we decided to build it for real.',
    icon: 'spark',
  },
  {
    year: '2024',
    title: 'First Lines of Code',
    description:
      "Kody started building while Leah defined what 'good' actually meant. Every feature had to pass the question: Would this help my clients?",
    icon: 'code',
  },
  {
    year: '2024',
    title: 'AR Comes Alive',
    description:
      'The moment we placed virtual furniture in a real room scan and it actually looked right—we knew we had something.',
    icon: 'ar',
  },
  {
    year: '2025',
    title: 'Building the Marketplace',
    description:
      'Now connecting consumers, designers, and heritage manufacturers who share our belief that time adds value.',
    icon: 'network',
  },
];

// CTA Section
export const ctaContent = {
  headline: 'The best things are built together, one careful layer at a time.',
  actions: [
    {
      label: 'Explore Furniture Collection',
      href: '/furniture',
      variant: 'primary',
    },
    {
      label: 'For Designers',
      href: '/designers',
      variant: 'secondary',
    },
    {
      label: 'For Makers',
      href: '/makers',
      variant: 'secondary',
    },
    {
      label: 'Get the App',
      href: '/app',
      variant: 'secondary',
    },
  ] satisfies CTAAction[],
};

// All placeholder assets for asset guide generation
export const allPlaceholderAssets: PlaceholderImageMeta[] = [
  heroContent.backgroundPlaceholder,
  problemContent.leftImage,
  problemContent.rightImage,
  ...narrativeBlocks.filter((b) => b.imagePlaceholder).map((b) => b.imagePlaceholder!),
  originStoryHero,
  nameDefinitionContent.backgroundPlaceholder,
  ...founders.map((f) => f.imagePlaceholder),
  foundersTogetherImage,
  studioConnectionContent.logoPlaceholder,
];
