import { defineField, defineType } from "sanity";

export const imageWithMeta = defineType({
  name: "imageWithMeta",
  title: "Image with Metadata",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Important for accessibility and SEO",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect Ratio",
      type: "string",
      options: {
        list: [
          { title: "16:9 (Landscape)", value: "16:9" },
          { title: "4:3 (Standard)", value: "4:3" },
          { title: "3:4 (Portrait)", value: "3:4" },
          { title: "1:1 (Square)", value: "1:1" },
          { title: "9:16 (Mobile)", value: "9:16" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      media: "asset",
      title: "alt",
    },
  },
});
