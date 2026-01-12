import { defineField, defineType } from "sanity";

export const makersApplyPage = defineType({
  name: "makersApplyPage",
  title: "Makers Apply Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "criteria", title: "What We Look For" },
    { name: "form", title: "Form Settings" },
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

    // WHAT WE LOOK FOR
    defineField({
      name: "criteriaHeader",
      title: "Section Header",
      type: "string",
      group: "criteria",
    }),
    defineField({
      name: "criteria",
      title: "Criteria",
      type: "array",
      of: [{ type: "featureItem" }],
      group: "criteria",
      validation: (Rule) => Rule.max(4),
    }),

    // FORM SETTINGS
    defineField({
      name: "formHeader",
      title: "Form Header",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "formDescription",
      title: "Form Description",
      type: "text",
      rows: 2,
      group: "form",
    }),
    defineField({
      name: "specialties",
      title: "Specialty Options",
      type: "array",
      of: [{ type: "string" }],
      group: "form",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "text",
      rows: 2,
      group: "form",
    }),
    defineField({
      name: "successLinkText",
      title: "Success Link Text",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "successLinkHref",
      title: "Success Link URL",
      type: "string",
      group: "form",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Makers Apply Page" };
    },
  },
});
