import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
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
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "maker",
      title: "Maker",
      type: "reference",
      to: [{ type: "maker" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Living Room", value: "living-room" },
          { title: "Bedroom", value: "bedroom" },
          { title: "Dining", value: "dining" },
          { title: "Office", value: "office" },
          { title: "Outdoor", value: "outdoor" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Chair", value: "chair" },
          { title: "Table", value: "table" },
          { title: "Sofa", value: "sofa" },
          { title: "Bed", value: "bed" },
          { title: "Storage", value: "storage" },
          { title: "Lighting", value: "lighting" },
          { title: "Accessory", value: "accessory" },
        ],
      },
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        { name: "width", title: "Width", type: "string" },
        { name: "depth", title: "Depth", type: "string" },
        { name: "height", title: "Height", type: "string" },
        { name: "seatHeight", title: "Seat Height", type: "string" },
      ],
    }),
    defineField({
      name: "material",
      title: "Primary Material",
      type: "reference",
      to: [{ type: "material" }],
    }),
    defineField({
      name: "secondaryMaterials",
      title: "Secondary Materials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "material" }] }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this product on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "leadTime",
      title: "Lead Time",
      type: "string",
      description: "Estimated delivery time (e.g., 6-8 weeks)",
    }),
    defineField({
      name: "arModelUrl",
      title: "AR Model URL",
      type: "url",
      description: "URL to USDZ/GLB model for AR preview (optional)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "mainImage",
    },
  },
});
