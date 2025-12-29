import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
        ],
      },
      initialValue: "primary",
    }),
    defineField({
      name: "isExternal",
      title: "External Link",
      type: "boolean",
      description: "Opens in a new tab",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});
