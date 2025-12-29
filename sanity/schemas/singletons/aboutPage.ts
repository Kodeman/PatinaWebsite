import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "problem", title: "Problem Section" },
    { name: "origin", title: "Origin Story" },
    { name: "nameDefinition", title: "Name Definition" },
    { name: "values", title: "Values" },
    { name: "founders", title: "Founders" },
    { name: "studio", title: "Studio Connection" },
    { name: "timeline", title: "Timeline" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    // HERO
    defineField({
      name: "heroHeadline",
      title: "Headline",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroBackground",
      title: "Background Image",
      type: "imageWithMeta",
      group: "hero",
    }),

    // PROBLEM SECTION
    defineField({
      name: "problemHeading",
      title: "Heading",
      type: "string",
      group: "problem",
    }),
    defineField({
      name: "problemDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "problem",
    }),
    defineField({
      name: "problemStatistic",
      title: "Statistic",
      type: "statistic",
      group: "problem",
    }),
    defineField({
      name: "problemLeftImage",
      title: "Left Image",
      type: "imageWithMeta",
      group: "problem",
    }),
    defineField({
      name: "problemRightImage",
      title: "Right Image",
      type: "imageWithMeta",
      group: "problem",
    }),

    // ORIGIN STORY
    defineField({
      name: "originHeroImage",
      title: "Origin Hero Image",
      type: "imageWithMeta",
      group: "origin",
    }),
    defineField({
      name: "narrativeBlocks",
      title: "Narrative Blocks",
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
            { name: "content", title: "Content", type: "text", rows: 4 },
            {
              name: "quote",
              title: "Pull Quote",
              type: "text",
              rows: 3,
              description: "Optional pull quote",
            },
            { name: "image", title: "Image", type: "imageWithMeta" },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      group: "origin",
    }),

    // NAME DEFINITION
    defineField({
      name: "wordDefinition",
      title: "Word",
      type: "string",
      group: "nameDefinition",
      initialValue: "Patina",
    }),
    defineField({
      name: "pronunciation",
      title: "Pronunciation",
      type: "string",
      group: "nameDefinition",
    }),
    defineField({
      name: "partOfSpeech",
      title: "Part of Speech",
      type: "string",
      group: "nameDefinition",
    }),
    defineField({
      name: "definition",
      title: "Definition",
      type: "text",
      rows: 2,
      group: "nameDefinition",
    }),
    defineField({
      name: "definitionQuote",
      title: "Quote",
      type: "text",
      rows: 3,
      group: "nameDefinition",
    }),
    defineField({
      name: "definitionBackground",
      title: "Background Image",
      type: "imageWithMeta",
      group: "nameDefinition",
    }),

    // VALUES
    defineField({
      name: "brandValues",
      title: "Brand Values",
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
            {
              name: "materialTexture",
              title: "Material Texture",
              type: "string",
              options: {
                list: [
                  { title: "Wood", value: "wood" },
                  { title: "Linen", value: "linen" },
                  { title: "Stone", value: "stone" },
                  { title: "Leather", value: "leather" },
                  { title: "Clay", value: "clay" },
                ],
              },
            },
          ],
          preview: {
            select: { title: "title", subtitle: "materialTexture" },
          },
        },
      ],
      group: "values",
      validation: (Rule) => Rule.max(5),
    }),

    // FOUNDERS
    defineField({
      name: "founders",
      title: "Founders",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teamMember" }] }],
      group: "founders",
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "foundersTogetherImage",
      title: "Founders Together Image",
      type: "imageWithMeta",
      group: "founders",
    }),

    // STUDIO CONNECTION
    defineField({
      name: "studioHeading",
      title: "Heading",
      type: "string",
      group: "studio",
    }),
    defineField({
      name: "studioDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "studio",
    }),
    defineField({
      name: "studioLinkText",
      title: "Link Text",
      type: "string",
      group: "studio",
    }),
    defineField({
      name: "studioLinkUrl",
      title: "Link URL",
      type: "url",
      group: "studio",
    }),
    defineField({
      name: "studioLogo",
      title: "Studio Logo",
      type: "imageWithMeta",
      group: "studio",
    }),

    // TIMELINE
    defineField({
      name: "timeline",
      title: "Timeline Milestones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "year",
              title: "Year",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "quote", title: "Quote", type: "text", rows: 2 },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Spark", value: "spark" },
                  { title: "Code", value: "code" },
                  { title: "AR", value: "ar" },
                  { title: "Network", value: "network" },
                ],
              },
            },
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        },
      ],
      group: "timeline",
    }),

    // CTA
    defineField({
      name: "ctaHeadline",
      title: "Headline",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaActions",
      title: "CTA Actions",
      type: "array",
      of: [{ type: "cta" }],
      group: "cta",
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
