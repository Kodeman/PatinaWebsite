import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const posts = [
  {
    _type: "journalPost",
    title: "Why We're Building Patina",
    slug: { _type: "slug", current: "why-were-building-patina" },
    excerpt:
      "The furniture industry is broken. Designers spend hours sourcing, consumers get generic recommendations, and makers struggle to reach the right audience. We're fixing that.",
    category: "building-patina",
    publishedAt: "2026-04-07T09:00:00Z",
    author: "Leah",
    featured: true,
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s1",
            marks: [],
            text: "I started Patina because I lived the problem. As the founder of Middlewest Studio, I've sourced over 100 products per project for years — and the process has always been painfully manual. Spreadsheets, bookmarks, vendor catalogs, word-of-mouth. The tools that exist were built for mass-market retail, not for designers who care about provenance and craft.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b2",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s2",
            marks: [],
            text: "Patina is what happens when you build a furniture platform from the designer's perspective first. Not another marketplace with infinite scroll and sponsored placements. A curated space where every piece has a story, every maker is vetted, and the intelligence layer learns from how professional designers actually think about space, material, and form.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b3",
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s3",
            marks: [],
            text: "The Three Problems",
          },
        ],
      },
      {
        _type: "block",
        _key: "b4",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s4",
            marks: ["strong"],
            text: "For designers:",
          },
          {
            _type: "span",
            _key: "s5",
            marks: [],
            text: " Sourcing takes 40% of project time. There's no single place to discover artisan furniture that meets the quality bar our clients expect. We end up recommending the same 20 brands because discovery is so broken.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b5",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s6",
            marks: ["strong"],
            text: "For consumers:",
          },
          {
            _type: "span",
            _key: "s7",
            marks: [],
            text: ' "Style quizzes" and algorithmic recommendations give you what\'s popular, not what\'s right. The best furniture decisions come from understanding materials, craftsmanship, and how a piece ages in a space. That knowledge lives in designers\' heads — we\'re making it accessible.',
          },
        ],
      },
      {
        _type: "block",
        _key: "b6",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s8",
            marks: ["strong"],
            text: "For makers:",
          },
          {
            _type: "span",
            _key: "s9",
            marks: [],
            text: " Small-batch artisans can't compete with the marketing budgets of mass manufacturers. Their work is exceptional, but their reach is limited to local markets and trade shows. Patina gives them a direct channel to designers and discerning consumers who value what they make.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b7",
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s10",
            marks: [],
            text: "What We're Building First",
          },
        ],
      },
      {
        _type: "block",
        _key: "b8",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s11",
            marks: [],
            text: "We're starting with 200 founding members and 15 founding maker partners. This isn't a launch — it's a build. Founding members get to shape the platform alongside us: what features matter, which makers join, how the AI learns to recommend. We're building Patina with our community, not for them.",
          },
        ],
      },
      {
        _type: "block",
        _key: "b9",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s12",
            marks: [],
            text: "If you believe furniture should be chosen with intention — that the story behind a piece matters as much as its form — we'd love to have you in the founding circle.",
          },
        ],
      },
    ],
  },
  {
    _type: "journalPost",
    title: "The Designer as Intelligence Layer",
    slug: { _type: "slug", current: "designer-as-intelligence-layer" },
    excerpt:
      "Most platforms replace expert judgment with algorithms. We're doing the opposite — encoding designer intelligence into a system that makes everyone's choices better.",
    category: "design-thinking",
    publishedAt: "2026-04-05T09:00:00Z",
    author: "Leah",
    featured: false,
    body: [
      {
        _type: "block",
        _key: "c1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t1",
            marks: [],
            text: "When Modsy and Havenly tried to democratize interior design, they made a fundamental mistake: they tried to replace the designer with an algorithm. Feed in room dimensions, select a style quiz result, get a 3D render with shoppable links. It was convenient. It was also generic.",
          },
        ],
      },
      {
        _type: "block",
        _key: "c2",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t2",
            marks: [],
            text: "The problem isn't that AI can't help with furniture selection — it's that the AI was trained on the wrong signal. Popularity metrics, purchase history, and visual similarity are useful, but they miss what makes a great furniture choice: context. A designer doesn't just see a chair. They see how walnut ages in southern light, why that particular joint method matters for longevity, how the proportions relate to the other pieces in the room.",
          },
        ],
      },
      {
        _type: "block",
        _key: "c3",
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t3",
            marks: [],
            text: "Learning From Professionals",
          },
        ],
      },
      {
        _type: "block",
        _key: "c4",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t4",
            marks: [],
            text: "Patina's AI doesn't learn from what's popular. It learns from what professional designers actually select, and why. Every time a designer in our Founding 50 cohort classifies a piece — tagging its material honesty, construction quality, design lineage, spatial personality — that knowledge enters the system.",
          },
        ],
      },
      {
        _type: "block",
        _key: "c5",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t5",
            marks: [],
            text: "Over time, the platform develops what we call 'designer-grade taste' — the ability to recommend pieces not just by style, but by the deeper qualities that professionals evaluate instinctively. Material integrity. Proportion harmony. Aging character. Maker reputation.",
          },
        ],
      },
      {
        _type: "block",
        _key: "c6",
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t6",
            marks: [],
            text: "No Moat Without Taste",
          },
        ],
      },
      {
        _type: "block",
        _key: "c7",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "t7",
            marks: [],
            text: "Anyone can build a furniture marketplace. The technology is commodity. What isn't commodity is a classification system built by 50 working designers who stake their professional reputation on the quality of their selections. That's Patina's moat — and it's why we're starting with designers, not consumers.",
          },
        ],
      },
    ],
  },
  {
    _type: "journalPost",
    title: "What We Look For in a Founding Maker",
    slug: { _type: "slug", current: "what-we-look-for-founding-maker" },
    excerpt:
      "We're selecting 15 maker partners for launch. Here's what matters to us — and why brand size isn't on the list.",
    category: "maker-stories",
    publishedAt: "2026-04-03T09:00:00Z",
    author: "Leah",
    featured: false,
    body: [
      {
        _type: "block",
        _key: "d1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u1",
            marks: [],
            text: "We've opened applications for founding maker partners, and the response has been humbling. Workshops from three countries. Studios we've admired for years. Emerging makers whose work stopped us mid-scroll. Choosing 15 from this group won't be easy, but we have clear criteria.",
          },
        ],
      },
      {
        _type: "block",
        _key: "d2",
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u2",
            marks: [],
            text: "Material Honesty",
          },
        ],
      },
      {
        _type: "block",
        _key: "d3",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u3",
            marks: [],
            text: "We want makers who let materials speak. Solid wood that shows its grain. Metal that's finished to reveal its character, not hide it. Upholstery where the fabric choice reflects the form, not just the trend. If a piece is made of oak, it should look and feel like oak — not a veneer pretending to be something it isn't.",
          },
        ],
      },
      {
        _type: "block",
        _key: "d4",
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u4",
            marks: [],
            text: "Construction Integrity",
          },
        ],
      },
      {
        _type: "block",
        _key: "d5",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u5",
            marks: [],
            text: "Patina's tagline is 'Where Time Adds Value.' That only works if the furniture lasts. We look for joinery that serves the piece, not just the price point. Dovetails where they matter. Hardware that ages well. Assembly methods that a skilled person could repair in 20 years. We're not furniture snobs about technique — CNC-cut joints can be just as honest as hand-cut ones — but we care about intent.",
          },
        ],
      },
      {
        _type: "block",
        _key: "d6",
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u6",
            marks: [],
            text: "Story and Provenance",
          },
        ],
      },
      {
        _type: "block",
        _key: "d7",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u7",
            marks: [],
            text: "Every piece on Patina will have a story page. Where the wood was sourced. Who built the frame. What inspired the design. Our founding makers need to be willing to share this openly — not as marketing copy, but as provenance. The consumers and designers on our platform choose pieces because the story matters to them. If your workshop has a story worth telling, we want to help you tell it.",
          },
        ],
      },
      {
        _type: "block",
        _key: "d8",
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u8",
            marks: [],
            text: "What Doesn't Matter",
          },
        ],
      },
      {
        _type: "block",
        _key: "d9",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u9",
            marks: [],
            text: "Brand size. Instagram following. Years in business. Production volume. We've seen one-person workshops produce pieces that rival brands with 50 employees. Patina is a quality filter, not a popularity contest. If the work is excellent and the story is real, you belong here.",
          },
        ],
      },
      {
        _type: "block",
        _key: "d10",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "u10",
            marks: ["em"],
            text: "Applications are open at patina.com/makers/apply. Leah personally reviews every submission.",
          },
        ],
      },
    ],
  },
];

async function seed() {
  console.log(`Seeding ${posts.length} journal posts to Sanity...`);
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}`);

  const transaction = client.transaction();

  for (const post of posts) {
    const id = `journalPost-${post.slug.current}`;
    transaction.createOrReplace({ _id: id, ...post });
    console.log(`  → ${post.title}`);
  }

  const result = await transaction.commit();
  console.log(`\nDone! ${result.documentIds.length} documents created.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
