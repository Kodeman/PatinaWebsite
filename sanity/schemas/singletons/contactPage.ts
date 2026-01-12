import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "contactInfo", title: "Contact Information" },
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
      rows: 2,
      group: "hero",
    }),

    // CONTACT INFO
    defineField({
      name: "contactInfoHeader",
      title: "Section Header",
      type: "string",
      group: "contactInfo",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contactInfo",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contactInfo",
    }),
    defineField({
      name: "phoneHours",
      title: "Phone Hours",
      type: "string",
      group: "contactInfo",
    }),
    defineField({
      name: "showroomAddress",
      title: "Showroom Address",
      type: "text",
      rows: 2,
      group: "contactInfo",
    }),
    defineField({
      name: "showroomNote",
      title: "Showroom Note",
      type: "string",
      group: "contactInfo",
      description: "e.g., 'By appointment only'",
    }),
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      of: [{ type: "cta" }],
      group: "contactInfo",
      validation: (Rule) => Rule.max(4),
    }),

    // FORM SETTINGS
    defineField({
      name: "contactReasons",
      title: "Contact Reasons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
      group: "form",
    }),
    defineField({
      name: "successMessage",
      title: "Form Success Message",
      type: "text",
      rows: 2,
      group: "form",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
