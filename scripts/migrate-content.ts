/**
 * Sanity Content Migration Script
 *
 * Migrates hardcoded content from data files and page components to Sanity CMS.
 *
 * Usage:
 *   npx tsx scripts/migrate-content.ts
 *
 * Requirements:
 *   - SANITY_API_WRITE_TOKEN environment variable (needs write access)
 *   - Or use SANITY_API_READ_TOKEN if it has write permissions
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  console.error("Missing required environment variables:");
  console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID:", projectId ? "OK" : "MISSING");
  console.error("- SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN:", token ? "OK" : "MISSING");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ============================================
// MATERIALS DATA
// ============================================
const materials = [
  {
    _id: "material-black-walnut",
    _type: "material",
    name: "American Black Walnut",
    slug: { _type: "slug", current: "black-walnut" },
    category: "Hardwood",
    origin: "Eastern United States",
    colorHex: "#5D4037",
    description:
      "Prized for its rich, chocolate-brown heartwood and straight grain, American Black Walnut has been the choice of fine furniture makers for centuries. Each board tells a story through its unique grain patterns.",
    properties: [
      "Naturally rot-resistant",
      "Develops deeper patina with age",
      "FSC certified sources",
    ],
    sustainability: "FSC Certified",
  },
  {
    _id: "material-white-oak",
    _type: "material",
    name: "White Oak",
    slug: { _type: "slug", current: "white-oak" },
    category: "Hardwood",
    origin: "North America",
    colorHex: "#D7CCC8",
    description:
      "Known for its strength and distinctive ray fleck patterns, White Oak brings both durability and visual interest. Its tight grain makes it naturally water-resistant.",
    properties: [
      "Quarter-sawn for stability",
      "Natural tannins protect wood",
      "Ideal for outdoor use",
    ],
    sustainability: "FSC Certified",
  },
  {
    _id: "material-hinoki",
    _type: "material",
    name: "Japanese Hinoki",
    slug: { _type: "slug", current: "japanese-hinoki" },
    category: "Softwood",
    origin: "Japan",
    colorHex: "#FFF8E1",
    description:
      "Sacred to Japanese culture, Hinoki cypress is renowned for its subtle, citrus-like fragrance and pale golden color. Traditionally used in temple construction for its spiritual significance.",
    properties: [
      "Natural antibacterial properties",
      "Distinctive aromatic scent",
      "Sustainably harvested",
    ],
    sustainability: "Sustainably Harvested",
  },
  {
    _id: "material-leather",
    _type: "material",
    name: "Vegetable-Tanned Leather",
    slug: { _type: "slug", current: "vegetable-tanned-leather" },
    category: "Leather",
    origin: "Tuscany, Italy",
    colorHex: "#8D6E63",
    description:
      "Using methods passed down through generations, Tuscan tanneries create leather using only natural plant extracts. This slow process produces leather that ages beautifully over decades.",
    properties: [
      "Chrome-free tanning",
      "Develops unique patina",
      "Biodegradable material",
    ],
    sustainability: "Chrome-Free",
  },
  {
    _id: "material-paper-cord",
    _type: "material",
    name: "Danish Paper Cord",
    slug: { _type: "slug", current: "danish-paper-cord" },
    category: "Natural Fiber",
    origin: "Denmark",
    colorHex: "#EFEBE9",
    description:
      "A hallmark of Scandinavian design, paper cord weaving creates seats that are both incredibly durable and naturally comfortable. Each seat takes hours of hand-weaving to complete.",
    properties: [
      "3-ply twisted construction",
      "Molds to body over time",
      "Renewable material",
    ],
    sustainability: "Renewable",
  },
  {
    _id: "material-brass",
    _type: "material",
    name: "Solid Brass",
    slug: { _type: "slug", current: "solid-brass" },
    category: "Metal",
    origin: "Various",
    colorHex: "#FFD54F",
    description:
      "We use solid brass for hardware and accents, never plated alternatives. This living metal develops a warm patina over time, adding character to each piece.",
    properties: [
      "Solid, never plated",
      "Naturally antimicrobial",
      "Infinitely recyclable",
    ],
    sustainability: "Recyclable",
  },
  {
    _id: "material-hard-maple",
    _type: "material",
    name: "Hard Maple",
    slug: { _type: "slug", current: "hard-maple" },
    category: "Hardwood",
    origin: "Quebec",
    colorHex: "#E8D4B8",
    description:
      "One of the hardest domestic hardwoods. Its light color and subtle grain complement minimalist designs perfectly.",
    properties: [
      "Extremely durable",
      "Fine, uniform grain",
      "FSC certified sources",
    ],
    sustainability: "FSC Certified",
  },
  {
    _id: "material-white-ash",
    _type: "material",
    name: "White Ash",
    slug: { _type: "slug", current: "white-ash" },
    category: "Hardwood",
    origin: "Michigan",
    colorHex: "#D4C9B8",
    description:
      "Renowned for its flexibility and shock resistance. The prominent grain pattern adds visual warmth to any space.",
    properties: [
      "Excellent flexibility",
      "Shock resistant",
      "Distinctive grain",
    ],
    sustainability: "FSC Certified",
  },
  {
    _id: "material-cherry",
    _type: "material",
    name: "American Cherry",
    slug: { _type: "slug", current: "american-cherry" },
    category: "Hardwood",
    origin: "Virginia",
    colorHex: "#8B4513",
    description:
      "American Cherry deepens to a rich, warm tone with age and light exposure. A favorite of master craftspeople.",
    properties: [
      "Deepens with age",
      "Smooth workability",
      "Natural luster",
    ],
    sustainability: "FSC Certified",
  },
  {
    _id: "material-european-oak",
    _type: "material",
    name: "European Oak",
    slug: { _type: "slug", current: "european-oak" },
    category: "Hardwood",
    origin: "Denmark",
    colorHex: "#A0826D",
    description:
      "Slower-growing than American oak, resulting in tighter grain and greater density. Ideal for heirloom pieces.",
    properties: [
      "Tight grain structure",
      "Greater density",
      "Excellent for carving",
    ],
    sustainability: "FSC Certified",
  },
];

// ============================================
// MAKERS DATA
// ============================================
const makers = [
  {
    _id: "maker-nakashima",
    _type: "maker",
    name: "Nakashima Workshop",
    slug: { _type: "slug", current: "nakashima-workshop" },
    location: "New Hope, Pennsylvania",
    foundedYear: 1946,
    yearsOfCraft: 78,
    badges: ["3rd Generation", "Master Craftsman"],
    story:
      "Continuing the legacy of George Nakashima, the workshop creates pieces that celebrate the natural beauty of wood grain and organic forms. Each piece honors the tree it came from.",
    quote:
      "We don't impose our will on the wood. We listen to what it wants to become.",
    specialty: "Live edge wood furniture",
  },
  {
    _id: "maker-vermont-woodworks",
    _type: "maker",
    name: "Vermont Woodworks",
    slug: { _type: "slug", current: "vermont-woodworks" },
    location: "Burlington, Vermont",
    foundedYear: 1972,
    yearsOfCraft: 52,
    badges: ["50+ Years", "B Corp Certified"],
    story:
      "A B Corp certified workshop using locally sourced, sustainably harvested timber to create furniture designed to last generations.",
    quote:
      "Every piece we make is a vote for the kind of world we want to live in.",
    specialty: "Sustainable hardwood furniture",
  },
  {
    _id: "maker-sashimono",
    _type: "maker",
    name: "Sashimono Studio",
    slug: { _type: "slug", current: "sashimono-studio" },
    location: "Kyoto, Japan",
    foundedYear: 1923,
    yearsOfCraft: 101,
    badges: ["Master Craftsman", "4th Generation"],
    story:
      "Fourth-generation practitioners of sashimono, the art of creating furniture using intricate wooden joints without nails or screws.",
    quote:
      "A joint that fits perfectly needs no fastener. This is what a century of practice teaches.",
    specialty: "Traditional Japanese joinery",
  },
  {
    _id: "maker-studio-piet",
    _type: "maker",
    name: "Studio Piet",
    slug: { _type: "slug", current: "studio-piet" },
    location: "Copenhagen, Denmark",
    foundedYear: 2015,
    yearsOfCraft: 9,
    badges: ["Carbon Neutral", "Young Studio"],
    story:
      "A young workshop combining Danish design heritage with contemporary sustainability practices and minimal environmental impact.",
    quote:
      "Modern doesn't mean disposable. We design for the next generation.",
    specialty: "Modern Scandinavian design",
  },
  {
    _id: "maker-woodward",
    _type: "maker",
    name: "Woodward & Sons",
    slug: { _type: "slug", current: "woodward-and-sons" },
    location: "Richmond, Virginia",
    foundedYear: 1889,
    yearsOfCraft: 135,
    badges: ["4th Generation", "Heritage Workshop"],
    story:
      "One of America's oldest furniture workshops, known for their mastery of traditional techniques and use of native hardwoods.",
    quote:
      "My great-grandfather started with the same tools I use today. Some things shouldn't change.",
    specialty: "American traditional furniture",
  },
  {
    _id: "maker-nordic-atelier",
    _type: "maker",
    name: "Nordic Atelier",
    slug: { _type: "slug", current: "nordic-atelier" },
    location: "Aarhus, Denmark",
    foundedYear: 1968,
    yearsOfCraft: 56,
    badges: ["Slow Made", "Hand Carved"],
    story:
      "Specialists in hand-carved details and the art of slow making, creating furniture that takes months to complete by a single craftsperson.",
    quote:
      "Fast furniture is a contradiction. We take the time each piece deserves.",
    specialty: "Hand-carved Scandinavian pieces",
  },
];

// ============================================
// PRODUCTS DATA
// ============================================
const products = [
  {
    _id: "product-noma-chair",
    _type: "product",
    name: "Noma Dining Chair",
    slug: { _type: "slug", current: "noma-dining-chair" },
    price: 895,
    description:
      "Hand-shaped white oak with woven paper cord seat. A tribute to Danish craft traditions.",
    longDescription:
      "The Noma Dining Chair represents the pinnacle of Scandinavian craft. Each chair begins as a carefully selected plank of white oak, hand-shaped over several days to achieve its distinctive organic form. The woven paper cord seat, a hallmark of Danish design, is completed by a single craftsperson who spends hours ensuring every strand lies perfectly.",
    category: "dining",
    productType: "chair",
    featured: true,
    inStock: true,
    leadTime: "8-12 weeks",
    dimensions: { width: 52, height: 78, depth: 48 },
    maker: { _type: "reference", _ref: "maker-nakashima" },
    material: { _type: "reference", _ref: "material-white-oak" },
  },
  {
    _id: "product-atelier-table",
    _type: "product",
    name: "Atelier Coffee Table",
    slug: { _type: "slug", current: "atelier-coffee-table" },
    price: 2450,
    description:
      "Live edge walnut slab with hand-forged iron base. Each piece uniquely shaped by nature.",
    longDescription:
      "The Atelier Coffee Table celebrates the natural beauty of American Black Walnut in its most authentic form. Each slab is selected for its unique grain patterns and natural edge, then carefully dried and finished to preserve its character. The hand-forged iron base provides a striking contrast while ensuring stability for generations of use.",
    category: "living-room",
    productType: "table",
    featured: true,
    inStock: true,
    leadTime: "10-14 weeks",
    dimensions: { width: 120, height: 42, depth: 65 },
    maker: { _type: "reference", _ref: "maker-vermont-woodworks" },
    material: { _type: "reference", _ref: "material-black-walnut" },
  },
  {
    _id: "product-kyoto-bed",
    _type: "product",
    name: "Kyoto Platform Bed",
    slug: { _type: "slug", current: "kyoto-platform-bed" },
    price: 3850,
    description:
      "Minimalist solid maple frame with traditional Japanese joinery. No hardware required.",
    longDescription:
      "The Kyoto Platform Bed embodies the Japanese philosophy of sashimono—furniture crafted without metal fasteners. Each joint is cut with precision measured in fractions of millimeters, creating connections that become stronger over time. The solid maple frame brings a light, calming presence to any bedroom.",
    category: "bedroom",
    productType: "bed",
    featured: false,
    inStock: true,
    leadTime: "12-16 weeks",
    dimensions: { width: 180, height: 35, depth: 210 },
    maker: { _type: "reference", _ref: "maker-sashimono" },
    material: { _type: "reference", _ref: "material-hard-maple" },
  },
  {
    _id: "product-archipelago-shelf",
    _type: "product",
    name: "Archipelago Bookshelf",
    slug: { _type: "slug", current: "archipelago-bookshelf" },
    price: 1895,
    description:
      "Modular ash wood shelving with brass accents. Grows with your collection.",
    longDescription:
      "The Archipelago Bookshelf is designed for a lifetime of adaptation. Its modular construction allows it to expand, contract, and reconfigure as your collection grows. The white ash shelves contrast beautifully with solid brass hardware, creating a system that's as beautiful empty as it is full.",
    category: "office",
    productType: "storage",
    featured: true,
    inStock: true,
    leadTime: "6-8 weeks",
    dimensions: { width: 180, height: 200, depth: 35 },
    maker: { _type: "reference", _ref: "maker-studio-piet" },
    material: { _type: "reference", _ref: "material-white-ash" },
  },
  {
    _id: "product-haven-chair",
    _type: "product",
    name: "Haven Lounge Chair",
    slug: { _type: "slug", current: "haven-lounge-chair" },
    price: 2195,
    description:
      "Sculptural form with vegetable-tanned leather. Ages beautifully over decades of use.",
    longDescription:
      "The Haven Lounge Chair is an investment in comfort and beauty that appreciates over time. The vegetable-tanned leather, sourced from Tuscan tanneries using centuries-old methods, will develop a rich patina unique to your life. The cherry wood frame deepens in color with each passing year.",
    category: "living-room",
    productType: "chair",
    featured: true,
    inStock: true,
    leadTime: "10-12 weeks",
    dimensions: { width: 75, height: 85, depth: 80 },
    maker: { _type: "reference", _ref: "maker-woodward" },
    material: { _type: "reference", _ref: "material-cherry" },
    secondaryMaterials: [{ _type: "reference", _ref: "material-leather" }],
  },
  {
    _id: "product-fjord-sideboard",
    _type: "product",
    name: "Fjord Sideboard",
    slug: { _type: "slug", current: "fjord-sideboard" },
    price: 4250,
    description:
      "Hand-carved oak with soft-close drawers. Inspired by Scandinavian fjord landscapes.",
    longDescription:
      "The Fjord Sideboard draws inspiration from the dramatic landscapes of Scandinavia. The hand-carved facade, which takes over 40 hours to complete, evokes the undulating forms of fjord coastlines. Each drawer operates on whisper-quiet soft-close mechanisms, hidden within the solid oak construction.",
    category: "dining",
    productType: "storage",
    featured: false,
    inStock: false,
    leadTime: "16-20 weeks",
    dimensions: { width: 180, height: 85, depth: 50 },
    maker: { _type: "reference", _ref: "maker-nordic-atelier" },
    material: { _type: "reference", _ref: "material-european-oak" },
  },
];

// ============================================
// TESTIMONIALS DATA
// ============================================
const testimonials = [
  {
    _id: "testimonial-1",
    _type: "testimonial",
    quote:
      "The AR feature saved me from a huge mistake. I could see the sofa was too large before ordering. Game changer.",
    author: "Sarah M.",
    title: "Homeowner",
    location: "Chicago, IL",
    category: "consumer",
    featured: true,
  },
  {
    _id: "testimonial-2",
    _type: "testimonial",
    quote:
      "I was skeptical about an app understanding my style. But the recommendations were eerily accurate—it showed me pieces I didn't know I wanted but immediately loved.",
    author: "Alex R.",
    title: "Design Enthusiast",
    location: "Denver, CO",
    category: "consumer",
    featured: true,
  },
  {
    _id: "testimonial-3",
    _type: "testimonial",
    quote:
      "The little notes on each piece—'better with 9ft ceilings' or 'this fabric shows pet hair'—saved me from mistakes I would have made anywhere else.",
    author: "Rachel K.",
    title: "First-time Buyer",
    location: "Minneapolis, MN",
    category: "consumer",
    featured: true,
  },
];

// ============================================
// TRUST BADGES DATA
// ============================================
const trustBadges = [
  {
    _id: "trust-badge-1",
    _type: "trustBadge",
    value: "4.8★",
    label: "App Store Rating",
    icon: "star",
    sortOrder: 1,
  },
  {
    _id: "trust-badge-2",
    _type: "trustBadge",
    value: "10K+",
    label: "Happy Users",
    icon: "users",
    sortOrder: 2,
  },
  {
    _id: "trust-badge-3",
    _type: "trustBadge",
    value: "90%+",
    label: "Match Accuracy",
    icon: "target",
    sortOrder: 3,
  },
  {
    _id: "trust-badge-4",
    _type: "trustBadge",
    value: "50+",
    label: "Heritage Makers",
    icon: "workshop",
    sortOrder: 4,
  },
];

// ============================================
// TEAM MEMBERS DATA
// ============================================
const teamMembers = [
  {
    _id: "team-leah",
    _type: "teamMember",
    name: "Leah Kochaver",
    slug: { _type: "slug", current: "leah-kochaver" },
    role: "Co-Founder",
    title: "Design & Experience",
    bio: "Founder of Middlewest Studio. Believes the best interiors are cultivated, not decorated.",
    credentials: ["Founder of Middlewest Studio"],
    location: "Madison, Wisconsin",
    memberType: "founder",
    sortOrder: 1,
  },
  {
    _id: "team-kody",
    _type: "teamMember",
    name: "Kody Kochaver",
    slug: { _type: "slug", current: "kody-kochaver" },
    role: "Co-Founder",
    title: "Technology & Product",
    bio: "Former Starbucks Corporate. Previous startup CEO with Microsoft seed funding.",
    credentials: [
      "Former Starbucks Corporate",
      "Previous startup CEO",
      "Microsoft seed funding",
    ],
    location: "Madison, Wisconsin",
    memberType: "founder",
    sortOrder: 2,
  },
];

// ============================================
// HOMEPAGE SINGLETON
// ============================================
const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroTitle: "Where Time ",
  heroTitleEmphasis: "Adds Value",
  heroDescription:
    "Discover furniture that grows more beautiful with every year. See it in your space. Know the makers.",
  heroSecondaryLine:
    "Powered by The Aesthete Engine—designer-taught intelligence that learns what you love.",
  heroTrustLine: "Heritage makers since 1904",
  heroCta: { label: "Get the App", href: "/app", variant: "primary" },
  valueHeader: {
    eyebrow: "WHY PATINA",
    headline: "Furniture with meaning",
    subheadline:
      "Every piece tells a story of craftsmanship, materials, and the makers who bring them to life.",
  },
  valueFeatures: [
    {
      title: "Discover Your Style",
      description:
        "The Aesthete Engine learns what draws your eye—then shows you furniture that fits not just your room, but your life. No questionnaires. Just intuition.",
      icon: "sparkle",
    },
    {
      title: "Know the Makers",
      description:
        "Every piece comes with its story—the craftspeople, traditions, and materials that make it special. Plus designer insights you won't find anywhere else.",
      icon: "clock",
    },
    {
      title: "Quality That Lasts",
      description:
        "Furniture built to become heirlooms. Materials and craftsmanship that age beautifully. Curated by designers who know what lasts.",
      icon: "heart",
    },
  ],
  engineHeader: {
    eyebrow: "THE INTELLIGENCE",
    headline: "Other apps show you what's popular.",
    subheadline: "Patina shows you what's right.",
  },
  engineBody:
    "The Aesthete Engine is our proprietary intelligence system where professional interior designers actively teach the AI what no algorithm could discover on its own. The result? Recommendations that feel curated by someone who actually knows you.",
  engineCta: { label: "See how it works in the app", href: "/app", variant: "secondary" },
  enginePillars: [
    {
      title: "Designer-Taught Intelligence",
      description:
        "Real interior designers encode their expertise into every recommendation:",
      icon: "graduation",
      examples: [
        '"This leather only gets better with age"',
        '"Marble needs coasters—always"',
        '"Perfect for pet-free homes"',
      ],
    },
    {
      title: "Invisible Learning",
      description:
        "Your actions reveal authentic preferences. Quick taps show confidence. Slow swipes reveal thoughtfulness. Time spent viewing signals genuine interest.",
      icon: "eye",
      highlight: "We notice what you don't realize you're telling us.",
    },
    {
      title: "Always Improving",
      description:
        "Start at 75% match accuracy. Reach 90%+ over time. The Aesthete Engine doesn't just remember your preferences—it understands the patterns behind them.",
      icon: "trending-up",
      highlight: "75% → 90%+",
    },
  ],
  experienceHeader: {
    eyebrow: "THE EXPERIENCE",
    headline: "From scan to certainty",
    subheadline: "in under 10 minutes.",
  },
  experienceBody:
    "Walk your room. Discover your style. Find furniture that fits—not just the space, but the life you're building. The Aesthete Engine does the filtering. You do the deciding.",
  experienceSteps: [
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
  ],
  makersHeader: {
    eyebrow: "THE MAKERS",
    headline: "Meet the craftspeople",
  },
  makersBody:
    "Every piece in our collection comes from makers we trust—artisans with generations of expertise. Professional designers evaluate each partnership, so quality is assured before a piece ever reaches your screen.",
  featuredMakers: [
    { _type: "reference", _ref: "maker-vermont-woodworks" },
    { _type: "reference", _ref: "maker-nakashima" },
    { _type: "reference", _ref: "maker-sashimono" },
    { _type: "reference", _ref: "maker-studio-piet" },
  ],
  testimonialsHeader: {
    eyebrow: "COMMUNITY",
    headline: "Loved by design enthusiasts",
  },
  homeTestimonials: [
    { _type: "reference", _ref: "testimonial-1" },
    { _type: "reference", _ref: "testimonial-2" },
    { _type: "reference", _ref: "testimonial-3" },
  ],
  trustBadges: [
    { _type: "reference", _ref: "trust-badge-1" },
    { _type: "reference", _ref: "trust-badge-2" },
    { _type: "reference", _ref: "trust-badge-3" },
    { _type: "reference", _ref: "trust-badge-4" },
  ],
  servicesHeader: {
    eyebrow: "PROFESSIONAL HELP",
    headline: "When you're ready for more,",
    subheadline: "so is your profile.",
  },
  servicesBody:
    "Some projects need more than an app. When you're ready, your room scan, style profile, and saved pieces transfer seamlessly to professional designers.",
  servicesBenefit:
    "No starting over. No re-explaining. Your designer receives the depth most consultations take weeks to achieve—before the first conversation.",
  servicesHandoffItems: [
    "Complete room dimensions and 3D model",
    "Your full style profile with confidence scores",
    "Behavioral signals revealing hidden preferences",
    "Saved pieces showing your direction",
  ],
  servicesCta: {
    label: "Learn About Design Services",
    href: "/services",
    variant: "secondary",
  },
  ctaHeader: {
    eyebrow: "GET STARTED",
    headline: "Ready to discover",
    subheadline: "what belongs?",
  },
  ctaBody:
    "The best interiors aren't decorated—they're cultivated over time, with pieces that grow more beautiful with age. Let The Aesthete Engine show you where to start.",
  ctaSecondary: "Scan your first room in under 10 minutes.",
  ctaPrimary: { label: "Download on the App Store", href: "/app", variant: "primary" },
  ctaSecondaryLink: { label: "explore furniture on web", href: "/furniture", variant: "ghost" },
};

// ============================================
// ABOUT PAGE SINGLETON
// ============================================
const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  heroHeadline: "Where Time Adds Value",
  heroSubheadline:
    "A husband and wife. A design problem nobody could quite name. And a belief that the best interiors aren't decorated—they're cultivated.",
  problemHeading: "The Problem",
  problemDescription:
    "Billions of dollars of furniture ends up in landfills every year. Meanwhile, skilled artisans can't find customers who value their craft.",
  problemStatistic: {
    value: "60-70%",
    label: "of designer time consumed by manual tasks, not creative work",
  },
  narrativeBlocks: [
    {
      title: "The Designer's Dilemma",
      content: "",
      quote:
        '"They have incredible taste," Leah would say. "They know exactly what they don\'t want. But the moment I show them a piece, they can\'t see it. Not really. Not in their space."',
    },
    {
      title: "The Technologist's Itch",
      content:
        "Kody had spent years watching how technology could either enhance human experience or bulldoze it. When AR started becoming viable, he felt something shift. But every app he downloaded missed something essential. They felt like technology demos—cold grids and clinical interfaces.",
    },
    {
      title: "The Aha Moment",
      content: "",
      quote: '"What if the technology came after the design thinking?"',
    },
    {
      title: "Building Together",
      content:
        "They made rules: No sterile SKU grids. Stories over specifications. The technology should feel like a friend, not a robot.",
    },
  ],
  wordDefinition: "Patina",
  pronunciation: "/pəˈtēnə/",
  partOfSpeech: "noun",
  definition:
    "The surface appearance that develops through age and exposure, adding depth, character, and value.",
  definitionQuote:
    '"It was everything we wanted the platform to represent. The opposite of disposable. A celebration of things that grow more valuable with time."',
  brandValues: [
    {
      title: "Listen First, Design Second",
      description:
        "Mirror Middlewest Studio's consultative mantra. We understand you before we show you anything.",
      materialTexture: "wood",
    },
    {
      title: "Craft Over Mass",
      description:
        "Every piece in our collection is made by human hands. The subtle imperfections of handcraft add character.",
      materialTexture: "linen",
    },
    {
      title: "Time Adds Value",
      description:
        "Great furniture, like great wine, improves with age. We select pieces designed to become heirlooms.",
      materialTexture: "stone",
    },
    {
      title: "Stories Over Specs",
      description:
        "Lead with provenance and craftsmanship, not dimensions and SKUs.",
      materialTexture: "leather",
    },
    {
      title: "Heartland Roots",
      description:
        "Born in Madison, Wisconsin. Midwestern honesty and heritage craftsmanship.",
      materialTexture: "clay",
    },
  ],
  founders: [
    { _type: "reference", _ref: "team-leah" },
    { _type: "reference", _ref: "team-kody" },
  ],
  studioHeading: "Born From Real Design Work",
  studioDescription:
    "Patina didn't come from a business plan—it came from years of real interior design work at Middlewest Studio. Every feature solves a problem Leah encountered with actual clients in Madison-area homes.",
  studioLinkText: "Visit Middlewest Studio",
  studioLinkUrl: "https://middlewest.studio",
  timeline: [
    {
      year: "2023",
      title: "The Spark",
      description:
        "After years at the kitchen table, sketching on napkins and arguing about user flows, we decided to build it for real.",
      icon: "spark",
    },
    {
      year: "2024",
      title: "First Lines of Code",
      description:
        "Kody started building while Leah defined what 'good' actually meant. Every feature had to pass the question: Would this help my clients?",
      icon: "code",
    },
    {
      year: "2024",
      title: "AR Comes Alive",
      description:
        "The moment we placed virtual furniture in a real room scan and it actually looked right—we knew we had something.",
      icon: "ar",
    },
    {
      year: "2025",
      title: "Building the Marketplace",
      description:
        "Now connecting consumers, designers, and heritage manufacturers who share our belief that time adds value.",
      icon: "network",
    },
  ],
  ctaHeadline:
    "The best things are built together, one careful layer at a time.",
  ctaActions: [
    { label: "Explore Furniture Collection", href: "/furniture", variant: "primary" },
    { label: "For Designers", href: "/designers", variant: "secondary" },
    { label: "For Makers", href: "/makers", variant: "secondary" },
    { label: "Get the App", href: "/app", variant: "secondary" },
  ],
};

// ============================================
// APP PAGE SINGLETON
// ============================================
const appPage = {
  _id: "appPage",
  _type: "appPage",
  heroEyebrow: "POWERED BY THE AESTHETE ENGINE",
  heroHeadline: "Every room tells a story.",
  heroHeadlineEmphasis: "Let's discover yours.",
  heroSubheadline:
    "Scan your space. Uncover your style. Find furniture that fits—not just the room, but the life you're building.",
  heroSecondaryLine:
    "Designer-taught AI delivers focused recommendations, not endless scrolling.",
  heroPrimaryCta: { label: "Download for iOS", href: "#", variant: "primary" },
  heroSecondaryCta: { label: "See How It Works", href: "#how-it-works", variant: "secondary" },
  heroAndroidNote: "Android coming soon",
  problemHeader: {
    eyebrow: "WHY PATINA",
    headline: "Other apps show you what's popular.",
    subheadline: "Patina shows you what's right.",
  },
  problemParagraphs: [
    "You've scrolled through thousands of options. Measured twice. Second-guessed every decision. And still, something doesn't feel right.",
    "That's because algorithms show you what others bought—not what belongs in your home.",
    "Patina is different. Professional interior designers actively teach our AI what works. The Aesthete Engine learns your style through invisible signals—then surfaces only the furniture that truly fits.",
  ],
  comparisonLeft: {
    label: "The old way",
    description: "Cluttered grid of 50+ furniture items showing overwhelming choice",
    itemCount: 50,
  },
  comparisonRight: {
    label: "The Patina way",
    description: "Curated selection of 8 carefully chosen pieces with breathing room",
    itemCount: 8,
  },
  journeyHeader: {
    eyebrow: "HOW IT WORKS",
    headline: "From scan to certainty",
    subheadline: "in under 10 minutes.",
  },
  journeySteps: [
    {
      stepNumber: 1,
      title: "Walk Your Room Together",
      description:
        "Point your phone at any corner and begin. Soft guidance appears where you need it—conversational, never technical. While you walk, Patina captures dimensions, light, existing furniture, and architectural features.",
      tagline: "No tape measures. No graph paper.",
      icon: "scan",
    },
    {
      stepNumber: 2,
      title: "Style That Emerges Naturally",
      description:
        "Forget lengthy questionnaires. Style questions appear naturally during scanning—moments where material samples float in space and you tap what draws your eye. The Aesthete Engine also notices what you don't realize you're telling us. Quick taps reveal confidence. Slow swipes show thoughtfulness.",
      tagline: "Your actions speak louder than survey answers.",
      icon: "style",
    },
    {
      stepNumber: 3,
      title: "Designer-Taught Recommendations",
      description:
        "Recommendations appear like a design board being assembled—each piece carrying its story and a professional insight you won't find anywhere else.",
      tagline:
        '"Perfect for pet-free homes" • "Works best with 9\'+ ceilings" • "Marble needs coasters—always"',
      icon: "recommend",
    },
    {
      stepNumber: 4,
      title: "Live With It First",
      description:
        "Place furniture in your actual room. Walk around it. Watch morning light catch the grain. Slide through sunset to see leather warm in the afternoon glow.",
      tagline:
        "Know a piece works before it arrives—because you've already lived with it.",
      icon: "ar",
    },
  ],
  engineHeader: {
    eyebrow: "THE AESTHETE ENGINE",
    headline: "The intelligence behind the intuition.",
    subheadline:
      "Professional designers actively teach our AI—so recommendations feel curated by someone who actually knows you.",
  },
  enginePillars: [
    {
      title: "Designer-Taught Intelligence",
      description: "Real interior designers encode what no algorithm could discover:",
      icon: "graduation",
      examples: [
        '"This fabric pills with cats"',
        '"Perfect for entertainers who hate maintenance"',
      ],
    },
    {
      title: "Invisible Learning",
      description:
        "Your actions reveal authentic preferences—tap speed, zoom behavior, time spent viewing.",
      icon: "eye",
      examples: ["We notice what you don't realize you're telling us."],
    },
    {
      title: "A Profile That Evolves",
      description: "Start at 75% accuracy. Reach 90%+ over time.",
      icon: "trending-up",
      highlight: "75% → 90%+",
      examples: ["The longer you use it, the better it knows you."],
    },
  ],
  handoffHeader: {
    eyebrow: "DESIGNER HANDOFF",
    headline: "When you're ready for more,",
    subheadline: "so is your profile.",
  },
  handoffDescription:
    "Some projects need more than an app. When you're ready, your room scan, style profile, and saved pieces transfer seamlessly to professional interior designers.",
  handoffBenefit:
    "No starting over. No re-explaining. Your designer receives the depth most consultations take weeks to achieve—before the first conversation.",
  handoffItems: [
    "Complete room dimensions and 3D model",
    "Your full style profile with confidence scores",
    "Behavioral signals revealing hidden preferences",
    "Saved pieces showing your direction",
  ],
  handoffCta: { label: "Learn About Design Services", href: "/services", variant: "secondary" },
  trustEyebrow: "WHY TRUST PATINA",
  trustIndicators: [
    {
      title: "Designer-Taught",
      description: "Every piece carries professional expertise. Real designers teach our AI.",
      icon: "designer",
    },
    {
      title: "Quality Curated",
      description:
        "Every item meets standards for material integrity and longevity. Built to last decades.",
      icon: "quality",
    },
    {
      title: "Privacy First",
      description:
        "Your room stays yours. Scan data processed locally. No third-party sharing.",
      icon: "privacy",
    },
  ],
  ctaHeadline: "Ready to discover",
  ctaHeadlineEmphasis: "what belongs?",
  ctaSubheadline:
    "The best interiors aren't decorated—they're cultivated over time, with pieces that grow more beautiful with age.",
  ctaTertiaryLine: "Start your journey in under 10 minutes.",
  ctaPrimary: { label: "Download on the App Store", href: "#", variant: "primary" },
  ctaSecondaryText: "Or browse our collection on the web.",
  ctaSecondaryLink: { label: "browse our collection", href: "/furniture", variant: "ghost" },
};

// ============================================
// SITE SETTINGS SINGLETON
// ============================================
const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "Patina",
  tagline: "Where Time Adds Value",
  email: "hello@patina.com",
  phone: "",
  address: "Madison, Wisconsin",
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com/patina" },
    { platform: "pinterest", url: "https://pinterest.com/patina" },
  ],
  defaultMetaTitle: "Patina | Handcrafted Furniture Marketplace",
  defaultMetaDescription:
    "Discover furniture that grows more beautiful with every year. See it in your space with AR. Know the makers behind every piece.",
};

// ============================================
// MIGRATION FUNCTIONS
// ============================================

async function createOrReplace(doc: { _id: string; _type: string; [key: string]: unknown }) {
  try {
    await client.createOrReplace(doc);
    console.log(`✓ Created/updated: ${doc._type} - ${doc._id}`);
  } catch (error) {
    console.error(`✗ Failed: ${doc._type} - ${doc._id}`, error);
    throw error;
  }
}

async function migrateAll() {
  console.log("\n========================================");
  console.log("Starting Sanity Content Migration");
  console.log("========================================\n");

  console.log("Project ID:", projectId);
  console.log("Dataset:", dataset);
  console.log("");

  try {
    // 1. Migrate Materials
    console.log("\n--- Migrating Materials ---");
    for (const material of materials) {
      await createOrReplace(material);
    }

    // 2. Migrate Makers
    console.log("\n--- Migrating Makers ---");
    for (const maker of makers) {
      await createOrReplace(maker);
    }

    // 3. Migrate Products (references materials and makers)
    console.log("\n--- Migrating Products ---");
    for (const product of products) {
      await createOrReplace(product);
    }

    // 4. Migrate Testimonials
    console.log("\n--- Migrating Testimonials ---");
    for (const testimonial of testimonials) {
      await createOrReplace(testimonial);
    }

    // 5. Migrate Trust Badges
    console.log("\n--- Migrating Trust Badges ---");
    for (const badge of trustBadges) {
      await createOrReplace(badge);
    }

    // 6. Migrate Team Members
    console.log("\n--- Migrating Team Members ---");
    for (const member of teamMembers) {
      await createOrReplace(member);
    }

    // 7. Migrate Singleton Pages
    console.log("\n--- Migrating Singleton Pages ---");
    await createOrReplace(homePage);
    await createOrReplace(aboutPage);
    await createOrReplace(appPage);
    await createOrReplace(siteSettings);

    console.log("\n========================================");
    console.log("Migration Complete!");
    console.log("========================================\n");

    console.log("Summary:");
    console.log(`  Materials: ${materials.length}`);
    console.log(`  Makers: ${makers.length}`);
    console.log(`  Products: ${products.length}`);
    console.log(`  Testimonials: ${testimonials.length}`);
    console.log(`  Trust Badges: ${trustBadges.length}`);
    console.log(`  Team Members: ${teamMembers.length}`);
    console.log(`  Singleton Pages: 4 (home, about, app, settings)`);
    console.log("");
  } catch (error) {
    console.error("\nMigration failed:", error);
    process.exit(1);
  }
}

// Run migration
migrateAll();
