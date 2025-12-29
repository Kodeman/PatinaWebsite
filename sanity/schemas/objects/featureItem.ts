import { defineField, defineType } from "sanity";

export const featureItem = defineType({
  name: "featureItem",
  title: "Feature Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Sparkle", value: "sparkle" },
          { title: "Clock", value: "clock" },
          { title: "Heart", value: "heart" },
          { title: "Eye", value: "eye" },
          { title: "Graduation", value: "graduation" },
          { title: "Trending Up", value: "trending-up" },
          { title: "Scan", value: "scan" },
          { title: "Style", value: "style" },
          { title: "Recommend", value: "recommend" },
          { title: "AR", value: "ar" },
          { title: "Designer", value: "designer" },
          { title: "Quality", value: "quality" },
          { title: "Privacy", value: "privacy" },
          { title: "Spark", value: "spark" },
          { title: "Code", value: "code" },
          { title: "Network", value: "network" },
          { title: "Check", value: "check" },
          { title: "Shield", value: "shield" },
          { title: "Star", value: "star" },
        ],
      },
    }),
    defineField({
      name: "examples",
      title: "Examples",
      type: "array",
      of: [{ type: "string" }],
      description: "Optional example quotes or bullet points",
    }),
    defineField({
      name: "highlight",
      title: "Highlight",
      type: "string",
      description: "Optional highlight stat or text",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "icon",
    },
  },
});
