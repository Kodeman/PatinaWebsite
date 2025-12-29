import { defineField, defineType } from "sanity";

export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section Header",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      description: "Small text above the headline",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headlineEmphasis",
      title: "Emphasized Part",
      type: "string",
      description: "Text to display in italic/accent color",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "headline",
      subtitle: "eyebrow",
    },
  },
});
