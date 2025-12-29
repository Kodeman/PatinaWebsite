import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title/Role",
      type: "string",
      description: 'e.g., "Principal, Chen Interiors"',
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Author Photo",
      type: "imageWithMeta",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Customer", value: "customer" },
          { title: "Designer", value: "designer" },
          { title: "Maker", value: "maker" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on homepage",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "category",
      media: "image",
    },
  },
});
