import { defineField, defineType } from "sanity";

export const material = defineType({
  name: "material",
  title: "Material",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
      description: "Where this material is sourced from (e.g., Vermont, Japan)",
    }),
    defineField({
      name: "colorHex",
      title: "Color (Hex)",
      type: "string",
      description: "Hex color code for the material swatch (e.g., #8B7355)",
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: "hex color",
          invert: false,
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "origin",
    },
  },
});
