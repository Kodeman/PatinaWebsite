import { defineField, defineType } from "sanity";

export const trustBadge = defineType({
  name: "trustBadge",
  title: "Trust Badge",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'e.g., "4.8", "10K+", "90%+"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g., "App Store Rating", "Happy Users"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Star", value: "star" },
          { title: "Users", value: "users" },
          { title: "Check", value: "check" },
          { title: "Shield", value: "shield" },
          { title: "Heart", value: "heart" },
          { title: "Trending Up", value: "trending-up" },
        ],
      },
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
      title: "value",
      subtitle: "label",
    },
  },
});
