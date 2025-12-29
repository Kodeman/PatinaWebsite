import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social Media" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    // BRAND
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "brand",
      initialValue: "Patina",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "brand",
      initialValue: "Where Time Adds Value",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      group: "brand",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "brand",
    }),

    // CONTACT
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      group: "contact",
    }),

    // SOCIAL
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
            },
            { name: "url", title: "URL", type: "url" },
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
      group: "social",
    }),

    // SEO
    defineField({
      name: "defaultMetaTitle",
      title: "Default Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "defaultMetaDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG Image",
      type: "image",
      description: "Default image for social sharing",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
