import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "briefing", title: "Briefing Package" },
    { name: "process", title: "Process" },
    { name: "matching", title: "Matching" },
    { name: "expectations", title: "What to Expect" },
    { name: "cta", title: "Closing CTA" },
  ],
  fields: [
    // HERO
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineEmphasis",
      title: "Headline Emphasis",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroCta",
      title: "Hero CTA",
      type: "cta",
      group: "hero",
    }),

    // BRIEFING PACKAGE
    defineField({
      name: "briefingHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "briefing",
    }),
    defineField({
      name: "briefingIntro",
      title: "Intro Paragraph",
      type: "text",
      rows: 3,
      group: "briefing",
    }),
    defineField({
      name: "briefingItems",
      title: "Briefing Items",
      type: "array",
      group: "briefing",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon Glyph", type: "string", description: "Single character, e.g. ◎ ⊞ ♡ $" },
            { name: "label", title: "Label", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "label", subtitle: "icon" },
          },
        },
      ],
    }),
    defineField({
      name: "briefingQuote",
      title: "Designer Quote",
      type: "text",
      rows: 2,
      group: "briefing",
    }),
    defineField({
      name: "briefingQuoteAttribution",
      title: "Quote Attribution",
      type: "string",
      group: "briefing",
    }),

    // PROCESS
    defineField({
      name: "processHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Step Number", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title", subtitle: "number" },
            prepare({ title, subtitle }) {
              return { title, subtitle: `Step ${subtitle}` };
            },
          },
        },
      ],
    }),

    // MATCHING
    defineField({
      name: "matchingHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "matching",
    }),
    defineField({
      name: "matchingBody",
      title: "Body Copy",
      type: "text",
      rows: 4,
      group: "matching",
    }),
    defineField({
      name: "matchExampleInitials",
      title: "Match Example · Initials",
      type: "string",
      description: "Two-letter avatar initials (placeholder example)",
      group: "matching",
    }),
    defineField({
      name: "matchExampleName",
      title: "Match Example · Designer Name",
      type: "string",
      group: "matching",
    }),
    defineField({
      name: "matchExampleFirm",
      title: "Match Example · Firm & Location",
      type: "string",
      group: "matching",
    }),
    defineField({
      name: "matchExampleScore",
      title: "Match Example · Score",
      type: "string",
      description: "Displayed as-is (e.g. 94%)",
      group: "matching",
    }),
    defineField({
      name: "matchExampleCriteria",
      title: "Match Example · Criteria Caption",
      type: "text",
      rows: 2,
      group: "matching",
    }),

    // EXPECTATIONS
    defineField({
      name: "expectationsHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "expectations",
    }),
    defineField({
      name: "expectationsIntro",
      title: "Intro Paragraph",
      type: "text",
      rows: 3,
      group: "expectations",
    }),
    defineField({
      name: "scopingExamples",
      title: "Scoping Examples",
      type: "array",
      group: "expectations",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "expectationsClosing",
      title: "Closing Line",
      type: "text",
      rows: 2,
      group: "expectations",
    }),

    // CTA
    defineField({
      name: "ctaHeadline",
      title: "Headline",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaHeadlineEmphasis",
      title: "Headline Emphasis",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA",
      type: "cta",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary CTA",
      type: "cta",
      group: "cta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Services Page" };
    },
  },
});
