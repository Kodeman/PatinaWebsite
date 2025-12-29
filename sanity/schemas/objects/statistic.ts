import { defineField, defineType } from "sanity";

export const statistic = defineType({
  name: "statistic",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g., '4.8', '10K+', '90%'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g., 'App Store Rating', 'Happy Users'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "value",
      subtitle: "label",
    },
  },
});
