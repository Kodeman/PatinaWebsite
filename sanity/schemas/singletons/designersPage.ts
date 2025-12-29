import { defineField, defineType } from "sanity";

export const designersPage = defineType({
  name: "designersPage",
  title: "Designers Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "benefits", title: "Benefits" },
    { name: "testimonials", title: "Testimonials" },
    { name: "apply", title: "Application" },
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

    // BENEFITS
    defineField({
      name: "benefitsHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "benefits",
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "benefits",
      validation: (Rule) => Rule.max(6),
    }),

    // TESTIMONIALS
    defineField({
      name: "testimonialsHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "testimonials",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      group: "testimonials",
    }),

    // APPLICATION
    defineField({
      name: "applyHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "apply",
    }),
    defineField({
      name: "applyDescription",
      title: "Description",
      type: "text",
      rows: 2,
      group: "apply",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Designers Page" };
    },
  },
});
