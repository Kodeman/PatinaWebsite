import { defineField, defineType } from "sanity";

export const maker = defineType({
  name: "maker",
  title: "Maker",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Workshop location (e.g., Brooklyn, NY)",
    }),
    defineField({
      name: "foundedYear",
      title: "Founded Year",
      type: "number",
      validation: (Rule) => Rule.min(1800).max(new Date().getFullYear()),
    }),
    defineField({
      name: "story",
      title: "Story",
      type: "array",
      of: [{ type: "block" }],
      description: "The maker's story and craft tradition",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      description: "A memorable quote from the maker",
    }),
    defineField({
      name: "image",
      title: "Portrait Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "workshopImages",
      title: "Workshop Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "badges",
      title: "Badges",
      type: "array",
      of: [{ type: "string" }],
      description: "Certifications or recognition (e.g., 3rd Generation, Certified B Corp)",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "yearsOfCraft",
      title: "Years of Craft",
      type: "number",
      description: "Total years of craft tradition",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "location",
      media: "image",
    },
  },
});
