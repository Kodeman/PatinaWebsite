import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "valueProps", title: "Value Proposition" },
    { name: "aestheteEngine", title: "Aesthete Engine" },
    { name: "experience", title: "AR Experience" },
    { name: "makers", title: "Makers Section" },
    { name: "testimonials", title: "Testimonials" },
    { name: "designerServices", title: "Designer Services" },
    { name: "finalCta", title: "Final CTA" },
  ],
  fields: [
    // HERO SECTION
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitleEmphasis",
      title: "Hero Title Emphasis",
      type: "string",
      description: "Text to show in italic/accent",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
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
      name: "heroTrustLine",
      title: "Trust Line",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroCta",
      title: "Hero CTA",
      type: "cta",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "imageWithMeta",
      group: "hero",
    }),

    // VALUE PROPOSITION SECTION
    defineField({
      name: "valueHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "valueProps",
    }),
    defineField({
      name: "valueFeatures",
      title: "Features",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "valueProps",
      validation: (Rule) => Rule.max(4),
    }),

    // AESTHETE ENGINE SECTION
    defineField({
      name: "engineHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "aestheteEngine",
    }),
    defineField({
      name: "engineBody",
      title: "Body Text",
      type: "text",
      rows: 4,
      group: "aestheteEngine",
    }),
    defineField({
      name: "engineCta",
      title: "CTA",
      type: "cta",
      group: "aestheteEngine",
    }),
    defineField({
      name: "enginePillars",
      title: "Pillars",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "aestheteEngine",
      validation: (Rule) => Rule.max(3),
    }),

    // EXPERIENCE SECTION
    defineField({
      name: "experienceHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "experience",
    }),
    defineField({
      name: "experienceBody",
      title: "Body Text",
      type: "text",
      rows: 3,
      group: "experience",
    }),
    defineField({
      name: "experienceSteps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Step Number", type: "number" },
            { name: "title", title: "Title", type: "string" },
            { name: "text", title: "Description", type: "text", rows: 2 },
          ],
          preview: {
            select: { title: "title", subtitle: "number" },
            prepare({ title, subtitle }) {
              return { title, subtitle: `Step ${subtitle}` };
            },
          },
        },
      ],
      group: "experience",
      validation: (Rule) => Rule.max(4),
    }),

    // MAKERS SECTION
    defineField({
      name: "makersHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "makers",
    }),
    defineField({
      name: "makersBody",
      title: "Body Text",
      type: "text",
      rows: 3,
      group: "makers",
    }),
    defineField({
      name: "featuredMakers",
      title: "Featured Makers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "maker" }] }],
      group: "makers",
      validation: (Rule) => Rule.max(6),
    }),

    // TESTIMONIALS SECTION
    defineField({
      name: "testimonialsHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "testimonials",
    }),
    defineField({
      name: "homeTestimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      group: "testimonials",
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "trustBadges",
      title: "Trust Badges",
      type: "array",
      of: [{ type: "reference", to: [{ type: "trustBadge" }] }],
      group: "testimonials",
    }),

    // DESIGNER SERVICES SECTION
    defineField({
      name: "servicesHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "designerServices",
    }),
    defineField({
      name: "servicesBody",
      title: "Body Text",
      type: "text",
      rows: 3,
      group: "designerServices",
    }),
    defineField({
      name: "servicesBenefit",
      title: "Key Benefit",
      type: "text",
      rows: 2,
      group: "designerServices",
    }),
    defineField({
      name: "servicesHandoffItems",
      title: "Handoff Items",
      type: "array",
      of: [{ type: "string" }],
      group: "designerServices",
    }),
    defineField({
      name: "servicesCta",
      title: "CTA",
      type: "cta",
      group: "designerServices",
    }),
    defineField({
      name: "servicesImage",
      title: "Section Image",
      type: "imageWithMeta",
      group: "designerServices",
    }),

    // FINAL CTA SECTION
    defineField({
      name: "ctaHeader",
      title: "Section Header",
      type: "sectionHeader",
      group: "finalCta",
    }),
    defineField({
      name: "ctaBody",
      title: "Body Text",
      type: "text",
      rows: 2,
      group: "finalCta",
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary Text",
      type: "string",
      group: "finalCta",
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA",
      type: "cta",
      group: "finalCta",
    }),
    defineField({
      name: "ctaSecondaryLink",
      title: "Secondary Link",
      type: "cta",
      group: "finalCta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
