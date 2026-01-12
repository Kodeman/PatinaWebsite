import { defineField, defineType } from "sanity";

export const careersPage = defineType({
  name: "careersPage",
  title: "Careers Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "values", title: "Values" },
    { name: "benefits", title: "Benefits" },
    { name: "positions", title: "Open Positions" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    // HERO
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineEmphasis",
      title: "Headline Emphasis",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    // VALUES
    defineField({
      name: "valuesHeader",
      title: "Section Header",
      type: "string",
      group: "values",
    }),
    defineField({
      name: "valuesDescription",
      title: "Description",
      type: "text",
      rows: 2,
      group: "values",
    }),
    defineField({
      name: "values",
      title: "Company Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "description", title: "Description", type: "text", rows: 2 },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      group: "values",
      validation: (Rule) => Rule.max(6),
    }),

    // BENEFITS
    defineField({
      name: "benefitsHeader",
      title: "Section Header",
      type: "string",
      group: "benefits",
    }),
    defineField({
      name: "benefitsDescription",
      title: "Description",
      type: "text",
      rows: 2,
      group: "benefits",
    }),
    defineField({
      name: "benefits",
      title: "Benefits List",
      type: "array",
      of: [{ type: "string" }],
      group: "benefits",
    }),

    // OPEN POSITIONS
    defineField({
      name: "positionsHeader",
      title: "Section Header",
      type: "string",
      group: "positions",
    }),
    defineField({
      name: "positionsDescription",
      title: "Description",
      type: "text",
      rows: 2,
      group: "positions",
    }),
    defineField({
      name: "openPositions",
      title: "Open Positions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Job Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "department", title: "Department", type: "string" },
            { name: "location", title: "Location", type: "string" },
            {
              name: "type",
              title: "Employment Type",
              type: "string",
              options: {
                list: [
                  { title: "Full-time", value: "Full-time" },
                  { title: "Part-time", value: "Part-time" },
                  { title: "Contract", value: "Contract" },
                  { title: "Internship", value: "Internship" },
                ],
              },
            },
            { name: "description", title: "Description", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "title", subtitle: "department" },
          },
        },
      ],
      group: "positions",
    }),

    // CTA
    defineField({
      name: "ctaHeader",
      title: "Header",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "Description",
      type: "text",
      rows: 2,
      group: "cta",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link",
      type: "cta",
      group: "cta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Careers Page" };
    },
  },
});
