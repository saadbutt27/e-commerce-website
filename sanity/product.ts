import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Product Description",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Product Type",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Product Price",
      type: "number",
    }),
    defineField({
      name: "sizes",
      title: "Product Size",
      type: "array",
      of: [
        {
          name: "size",
          title: "Size",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
    }),
    defineField({
      name: "alt",
      title: "Product Image Text",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [
        {
          type: "category",
        },
      ],
    }),
    defineField({
      name: "is_main",
      title: "Is Main",
      type: "boolean",
    }),
  ],
});
