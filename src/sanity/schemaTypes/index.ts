import { defineArrayMember, defineField, defineType } from "sanity";

const localizedString = defineType({
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "he", title: "Hebrew", type: "string" }),
  ],
});

const localizedText = defineType({
  name: "localizedText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
    defineField({ name: "he", title: "Hebrew", type: "text", rows: 4 }),
  ],
});

const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO title", type: "localizedString" }),
    defineField({ name: "description", title: "Meta description", type: "localizedText" }),
    defineField({ name: "keywords", title: "Keywords", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "ogImage", title: "OG image", type: "image", options: { hotspot: true } }),
  ],
});

const richBlock = defineType({
  name: "richBlock",
  title: "Content block",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localizedString" }),
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "text", title: "Text", type: "localizedText" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "localizedString" }),
            defineField({ name: "text", title: "Text", type: "localizedText" }),
          ],
        }),
      ],
    }),
  ],
});

const pageFields = [
  defineField({ name: "title", title: "Title", type: "localizedString" }),
  defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en", maxLength: 96 }, validation: (rule) => rule.required() }),
  defineField({ name: "status", title: "Status", type: "string", initialValue: "published", options: { list: ["draft", "published"] } }),
  defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "localizedString" }),
  defineField({ name: "heroCopy", title: "Hero copy", type: "localizedText" }),
  defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "localizedString" }),
  defineField({ name: "primaryCtaHref", title: "Primary CTA href", type: "string" }),
  defineField({ name: "secondaryCtaLabel", title: "Secondary CTA label", type: "localizedString" }),
  defineField({ name: "secondaryCtaHref", title: "Secondary CTA href", type: "string" }),
  defineField({ name: "blocks", title: "Blocks", type: "array", of: [defineArrayMember({ type: "richBlock" })] }),
  defineField({ name: "seo", title: "SEO", type: "seo" }),
  defineField({ name: "image", title: "Hero / OG image", type: "image", options: { hotspot: true } }),
  defineField({ name: "imageAlt", title: "Image alt text", type: "localizedString" }),
];

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string", initialValue: "MorePower2You" }),
    defineField({ name: "tagline", title: "Tagline", type: "localizedText" }),
    defineField({ name: "serviceArea", title: "Service area", type: "localizedText" }),
    defineField({ name: "footerDescription", title: "Footer description", type: "localizedText" }),
    defineField({ name: "privateContactEmail", title: "Private contact email", type: "string" }),
    defineField({ name: "privateLegacyAddressNote", title: "Private legacy address note", type: "text", rows: 3 }),
  ],
});

const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string" }),
    defineField({
      name: "items",
      title: "Navigation items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "localizedString" }),
            defineField({ name: "href", title: "Href", type: "string" }),
          ],
        }),
      ],
    }),
  ],
});

const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: pageFields,
});

const servicePage = defineType({
  name: "servicePage",
  title: "Service pages",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Display order", type: "number" }),
    defineField({ name: "summary", title: "Card summary", type: "localizedText" }),
    defineField({ name: "occasions", title: "Occasions", type: "array", of: [defineArrayMember({ type: "localizedString" })] }),
    ...pageFields,
  ],
});

const industryPage = defineType({
  name: "industryPage",
  title: "Industry pages",
  type: "document",
  fields: [
    defineField({ name: "publishNow", title: "Publish now", type: "boolean", initialValue: false }),
    defineField({ name: "industry", title: "Industry", type: "localizedString" }),
    ...pageFields,
  ],
});

const blogPost = defineType({
  name: "blogPost",
  title: "Blog posts",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "draft", options: { list: ["draft", "published"] } }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localizedText" }),
    defineField({ name: "body", title: "Body", type: "array", of: [defineArrayMember({ type: "richBlock" })] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "localizedString" }),
  ],
});

const caseStudy = defineType({
  name: "caseStudy",
  title: "Case studies",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "published", options: { list: ["draft", "published"] } }),
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({ name: "summary", title: "Summary", type: "localizedText" }),
    defineField({ name: "challenge", title: "Challenge", type: "localizedText" }),
    defineField({ name: "approach", title: "Approach", type: "localizedText" }),
    defineField({ name: "outcome", title: "Outcome", type: "localizedText" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery items",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "caption", title: "Caption", type: "localizedText" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "alt", title: "Alt text", type: "localizedString" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "published", options: { list: ["draft", "published"] } }),
  ],
});

const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Display name", type: "string" }),
    defineField({ name: "context", title: "Context", type: "localizedString" }),
    defineField({ name: "quote", title: "Quote", type: "localizedText" }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "published", options: { list: ["draft", "published"] } }),
  ],
});

const faq = defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "localizedString" }),
    defineField({ name: "answer", title: "Answer", type: "localizedText" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "published", options: { list: ["draft", "published"] } }),
  ],
});

const resource = defineType({
  name: "resource",
  title: "Lead magnets / resources",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localizedString" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.en", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Summary", type: "localizedText" }),
    defineField({ name: "gated", title: "Gated", type: "boolean", initialValue: false }),
    defineField({ name: "sections", title: "Sections", type: "array", of: [defineArrayMember({ type: "richBlock" })] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

const inquirySubmission = defineType({
  name: "inquirySubmission",
  title: "Contact / project inquiry submissions",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Archived", value: "archived" },
        ],
      },
    }),
    defineField({ name: "submittedAt", title: "Submitted at", type: "datetime" }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "projectType", title: "Project type", type: "string" }),
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "occasion", title: "Occasion", type: "string" }),
    defineField({ name: "scale", title: "Estimated recipients / scale", type: "string" }),
    defineField({ name: "timeline", title: "Timeline / deadline", type: "string" }),
    defineField({ name: "customization", title: "Customization / branding", type: "text", rows: 3 }),
    defineField({ name: "destinations", title: "Shipping destinations", type: "text", rows: 3 }),
    defineField({ name: "message", title: "Message", type: "text", rows: 6 }),
    defineField({ name: "internalNotes", title: "Internal notes", type: "text", rows: 4 }),
  ],
});

export const schemaTypes = [
  localizedString,
  localizedText,
  seo,
  richBlock,
  siteSettings,
  navigation,
  page,
  servicePage,
  industryPage,
  blogPost,
  caseStudy,
  galleryItem,
  testimonial,
  faq,
  resource,
  inquirySubmission,
];
