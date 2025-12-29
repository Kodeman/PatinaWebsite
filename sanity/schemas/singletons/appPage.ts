import { defineField, defineType } from "sanity";

export const appPage = defineType({
  name: "appPage",
  title: "App Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "problemBridge", title: "Problem Bridge" },
    { name: "journey", title: "Journey Steps" },
    { name: "engine", title: "Aesthete Engine" },
    { name: "handoff", title: "Designer Handoff" },
    { name: "trust", title: "Trust Section" },
    { name: "cta", title: "Final CTA" },
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
      name: "heroSubheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryLine",
      title: "Secondary Line",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Primary CTA",
      type: "cta",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Secondary CTA",
      type: "cta",
      group: "hero",
    }),
    defineField({
      name: "heroAndroidNote",
      title: "Android Note",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroMockup",
      title: "App Mockup Image",
      type: "imageWithMeta",
      group: "hero",
    }),

    // PROBLEM BRIDGE
    defineField({
      name: "problemHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "problemBridge",
    }),
    defineField({
      name: "problemParagraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      group: "problemBridge",
    }),
    defineField({
      name: "comparisonLeft",
      title: "Old Way",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "description", title: "Description", type: "string" },
        { name: "itemCount", title: "Item Count", type: "number" },
        { name: "image", title: "Image", type: "imageWithMeta" },
      ],
      group: "problemBridge",
    }),
    defineField({
      name: "comparisonRight",
      title: "Patina Way",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "description", title: "Description", type: "string" },
        { name: "itemCount", title: "Item Count", type: "number" },
        { name: "image", title: "Image", type: "imageWithMeta" },
      ],
      group: "problemBridge",
    }),

    // JOURNEY STEPS
    defineField({
      name: "journeyHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "journey",
    }),
    defineField({
      name: "journeySteps",
      title: "Journey Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "stepNumber", title: "Step Number", type: "number" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
            { name: "tagline", title: "Tagline", type: "string" },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Scan", value: "scan" },
                  { title: "Style", value: "style" },
                  { title: "Recommend", value: "recommend" },
                  { title: "AR", value: "ar" },
                ],
              },
            },
            { name: "image", title: "Image", type: "imageWithMeta" },
          ],
          preview: {
            select: { title: "title", subtitle: "stepNumber" },
            prepare({ title, subtitle }) {
              return { title, subtitle: `Step ${subtitle}` };
            },
          },
        },
      ],
      group: "journey",
      validation: (Rule) => Rule.max(4),
    }),

    // AESTHETE ENGINE
    defineField({
      name: "engineHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "engine",
    }),
    defineField({
      name: "engineDiagram",
      title: "Diagram Image",
      type: "imageWithMeta",
      group: "engine",
    }),
    defineField({
      name: "enginePillars",
      title: "Pillars",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "engine",
      validation: (Rule) => Rule.max(3),
    }),

    // DESIGNER HANDOFF
    defineField({
      name: "handoffHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "handoff",
    }),
    defineField({
      name: "handoffDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "handoff",
    }),
    defineField({
      name: "handoffBenefit",
      title: "Key Benefit",
      type: "text",
      rows: 2,
      group: "handoff",
    }),
    defineField({
      name: "handoffItems",
      title: "Handoff Items",
      type: "array",
      of: [{ type: "string" }],
      group: "handoff",
    }),
    defineField({
      name: "handoffCta",
      title: "CTA",
      type: "cta",
      group: "handoff",
    }),

    // TRUST SECTION
    defineField({
      name: "trustEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "trust",
    }),
    defineField({
      name: "trustIndicators",
      title: "Trust Indicators",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "trust",
      validation: (Rule) => Rule.max(3),
    }),

    // FINAL CTA
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
      name: "ctaSubheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
      group: "cta",
    }),
    defineField({
      name: "ctaTertiaryLine",
      title: "Tertiary Line",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA",
      type: "cta",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondaryText",
      title: "Secondary Text",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondaryLink",
      title: "Secondary Link",
      type: "cta",
      group: "cta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "App Page" };
    },
  },
});
