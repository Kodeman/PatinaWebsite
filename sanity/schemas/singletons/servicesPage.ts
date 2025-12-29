import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "packages", title: "Packages" },
    { name: "process", title: "Process" },
    { name: "cta", title: "CTA" },
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
      rows: 2,
      group: "hero",
    }),

    // PACKAGES
    defineField({
      name: "packagesHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "packages",
    }),
    defineField({
      name: "packages",
      title: "Packages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "servicePackage" }] }],
      group: "packages",
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
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Step Number", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
          ],
          preview: {
            select: { title: "title", subtitle: "number" },
            prepare({ title, subtitle }) {
              return { title, subtitle: `Step ${subtitle}` };
            },
          },
        },
      ],
      group: "process",
    }),

    // CTA
    defineField({
      name: "ctaHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "Description",
      type: "text",
      rows: 2,
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
