import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
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
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'e.g., "Co-Founder"',
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g., "Design & Experience"',
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: 'e.g., "ASID", "LEED AP", "15 years experience"',
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "imageWithMeta",
    }),
    defineField({
      name: "memberType",
      title: "Member Type",
      type: "string",
      options: {
        list: [
          { title: "Founder", value: "founder" },
          { title: "Team", value: "team" },
          { title: "Advisor", value: "advisor" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
