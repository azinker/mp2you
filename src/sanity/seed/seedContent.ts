import {
  content,
  type BasicItem,
  type BlogPost,
  type CaseStudy,
  type Faq,
  type GalleryItem,
  type MarketingPage,
  type PageBlock,
  type Resource,
  type Seo,
  type Service,
  type Testimonial,
} from "../../content/site";

type LocalizedString = {
  _key?: string;
  en: string;
  he: string;
};

type SanitySeedDocument = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

const seedDate = "2026-04-29T12:00:00.000Z";

export const seedNotes = {
  source: "src/content/site.ts",
  usage:
    "Run `npm run cms:seed:dry` to preview the generated Sanity documents, then `npm run cms:seed` after Sanity project credentials are in `.env.local`.",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function docId(prefix: string, slug: string) {
  return `${prefix}.${slugify(slug)}`;
}

function key(value: string, index = 0) {
  return `${slugify(value || "item")}-${index}`;
}

function localized(en = "", he = en, index?: number): LocalizedString {
  return {
    ...(typeof index === "number" ? { _key: key(en || he, index) } : {}),
    en,
    he: he || en,
  };
}

function seo(enSeo: Seo, heSeo?: Seo) {
  return {
    title: localized(enSeo.title, heSeo?.title || enSeo.title),
    description: localized(enSeo.description, heSeo?.description || enSeo.description),
    keywords: enSeo.keywords,
  };
}

function block(enBlock: PageBlock, heBlock?: PageBlock, index = 0) {
  return {
    _key: key(enBlock.title, index),
    eyebrow: localized(enBlock.eyebrow || "", heBlock?.eyebrow || enBlock.eyebrow || ""),
    title: localized(enBlock.title, heBlock?.title || enBlock.title),
    text: localized(enBlock.text, heBlock?.text || enBlock.text),
    items: items(enBlock.items || [], heBlock?.items || []),
  };
}

function blocks(enBlocks: PageBlock[], heBlocks: PageBlock[] = []) {
  return enBlocks.map((item, index) => block(item, heBlocks[index], index));
}

function items(enItems: BasicItem[], heItems: BasicItem[] = []) {
  return enItems.map((item, index) => ({
    _key: key(item.title, index),
    title: localized(item.title, heItems[index]?.title || item.title),
    text: localized(item.text, heItems[index]?.text || item.text),
  }));
}

function pageDoc(enPage: MarketingPage, hePage: MarketingPage | undefined, idPrefix = "page"): SanitySeedDocument {
  return {
    _id: docId(idPrefix, enPage.slug),
    _type: idPrefix,
    title: localized(enPage.title, hePage?.title || enPage.title),
    slug: { current: enPage.slug },
    status: "published",
    heroEyebrow: localized(enPage.eyebrow, hePage?.eyebrow || enPage.eyebrow),
    heroCopy: localized(enPage.intro, hePage?.intro || enPage.intro),
    primaryCtaLabel: localized(enPage.primaryCta?.label || "", hePage?.primaryCta?.label || enPage.primaryCta?.label || ""),
    primaryCtaHref: enPage.primaryCta?.href || "",
    secondaryCtaLabel: localized(enPage.secondaryCta?.label || "", hePage?.secondaryCta?.label || enPage.secondaryCta?.label || ""),
    secondaryCtaHref: enPage.secondaryCta?.href || "",
    blocks: blocks(enPage.blocks, hePage?.blocks),
    seo: seo(enPage.seo, hePage?.seo),
    imageAlt: localized(`${enPage.title} hero image`, `${hePage?.title || enPage.title} hero image`),
  };
}

function serviceDoc(enService: Service, heService: Service | undefined): SanitySeedDocument {
  return {
    ...pageDoc(enService, heService, "servicePage"),
    order: enService.order,
    summary: localized(enService.summary, heService?.summary || enService.summary),
    occasions: enService.occasions.map((item, index) => localized(item, heService?.occasions[index] || item, index)),
  };
}

function caseStudyDoc(item: CaseStudy, heItem: CaseStudy | undefined): SanitySeedDocument {
  return {
    _id: docId("caseStudy", item.slug),
    _type: "caseStudy",
    title: localized(item.title, heItem?.title || item.title),
    slug: { current: item.slug },
    status: "published",
    label: localized(item.label, heItem?.label || item.label),
    summary: localized(item.summary, heItem?.summary || item.summary),
    challenge: localized(item.challenge, heItem?.challenge || item.challenge),
    approach: localized(item.approach, heItem?.approach || item.approach),
    outcome: localized(item.outcome, heItem?.outcome || item.outcome),
    seo: seo(item.seo, heItem?.seo),
  };
}

function blogPostDoc(post: BlogPost, hePost: BlogPost | undefined): SanitySeedDocument {
  return {
    _id: docId("blogPost", post.slug),
    _type: "blogPost",
    title: localized(post.title, hePost?.title || post.title),
    slug: { current: post.slug },
    status: post.status,
    publishedAt: `${post.date}T12:00:00.000Z`,
    excerpt: localized(post.excerpt, hePost?.excerpt || post.excerpt),
    body: blocks(
      post.sections.map((section) => ({ ...section })),
      hePost?.sections.map((section) => ({ ...section })) || [],
    ),
    seo: seo(post.seo, hePost?.seo),
    imageAlt: localized(`${post.title} article image`, `${hePost?.title || post.title} article image`),
  };
}

function resourceDoc(resource: Resource, heResource: Resource | undefined): SanitySeedDocument {
  return {
    _id: docId("resource", resource.slug),
    _type: "resource",
    title: localized(resource.title, heResource?.title || resource.title),
    slug: { current: resource.slug },
    summary: localized(resource.summary, heResource?.summary || resource.summary),
    gated: false,
    sections: blocks(
      resource.sections.map((section) => ({ ...section })),
      heResource?.sections.map((section) => ({ ...section })) || [],
    ),
    seo: seo(resource.seo, heResource?.seo),
  };
}

function galleryDoc(item: GalleryItem, heItem: GalleryItem | undefined, index: number): SanitySeedDocument {
  return {
    _id: docId("galleryItem", `${index + 1}-${item.title}`),
    _type: "galleryItem",
    title: localized(item.title, heItem?.title || item.title),
    caption: localized(item.text, heItem?.text || item.text),
    alt: localized(item.alt, heItem?.alt || item.alt),
    category: index === 6 ? "Generated image direction" : "Legacy source reference",
    status: "published",
    legacyAssetPath: item.image,
  };
}

function testimonialDoc(item: Testimonial, heItem: Testimonial | undefined, index: number): SanitySeedDocument {
  return {
    _id: docId("testimonial", `${index + 1}-${item.name}`),
    _type: "testimonial",
    name: item.name,
    context: localized(item.context, heItem?.context || item.context),
    quote: localized(item.quote, heItem?.quote || item.quote),
    status: "published",
  };
}

function faqDoc(item: Faq, heItem: Faq | undefined, index: number): SanitySeedDocument {
  return {
    _id: docId("faq", `${index + 1}-${item.question}`),
    _type: "faq",
    question: localized(item.question, heItem?.question || item.question),
    answer: localized(item.answer, heItem?.answer || item.answer),
    category: index < 2 ? "Scope" : index < 4 ? "Project planning" : "Logistics",
    status: "published",
  };
}

function industryDraftDoc(title: string, heTitle: string | undefined, index: number): SanitySeedDocument {
  const slug = slugify(title);

  return {
    _id: `drafts.${docId("industryPage", slug)}`,
    _type: "industryPage",
    publishNow: false,
    industry: localized(title, heTitle || title),
    title: localized(title, heTitle || title),
    slug: { current: slug },
    status: "draft",
    heroEyebrow: localized("Future industry page", "עמוד תחום עתידי"),
    heroCopy: localized(
      "CMS-ready draft page prepared for deeper, industry-specific copy before publishing.",
      "עמוד טיוטה מוכן במערכת התוכן לכתיבה ממוקדת יותר לפני פרסום.",
    ),
    blocks: [
      block(
        {
          title: "Draft content note",
          text: "Add specific audience needs, example project types, gifting occasions, and SEO copy before publishing this industry page.",
        },
        {
          title: "הערת תוכן לטיוטה",
          text: "לפני פרסום יש להוסיף צרכי קהל, סוגי פרויקטים, אירועי מתנה וטקסט SEO ייעודי.",
        },
        index,
      ),
    ],
    seo: {
      title: localized(`${title} | MorePower2You`, `${heTitle || title} | MorePower2You`),
      description: localized(
        `Future CMS draft for ${title.toLowerCase()} programs by MorePower2You.`,
        `טיוטת תוכן עתידית עבור ${heTitle || title}.`,
      ),
      keywords: [title.toLowerCase(), "corporate gifting", "custom gifting"],
    },
  };
}

function homeDoc(): SanitySeedDocument {
  const enHome = content.en.home;
  const heHome = content.he.home;

  return {
    _id: "page.home",
    _type: "page",
    title: localized(enHome.hero.title, heHome.hero.title),
    slug: { current: "home" },
    status: "published",
    heroEyebrow: localized(enHome.hero.eyebrow, heHome.hero.eyebrow),
    heroCopy: localized(enHome.hero.text, heHome.hero.text),
    primaryCtaLabel: localized(enHome.hero.primaryCta.label, heHome.hero.primaryCta.label),
    primaryCtaHref: enHome.hero.primaryCta.href,
    secondaryCtaLabel: localized(enHome.hero.secondaryCta.label, heHome.hero.secondaryCta.label),
    secondaryCtaHref: enHome.hero.secondaryCta.href,
    blocks: [
      block(enHome.whatWeDo, heHome.whatWeDo, 0),
      {
        _key: "turnkey-process",
        eyebrow: localized("Process", "תהליך"),
        title: localized("Turnkey Process", "תהליך עבודה מלא"),
        text: localized(
          "A practical workflow from discovery and curation through customization, warehousing, fulfillment, delivery, and support.",
          "תהליך עבודה מעשי משלב האפיון ובחירת המוצרים ועד מיתוג, אחסון, הרכבה, שילוח ותמיכה.",
        ),
        items: items(enHome.process, heHome.process),
      },
      ...blocks(enHome.featured, heHome.featured),
      {
        _key: "seasonal-occasions",
        eyebrow: localized("Occasions", "אירועים"),
        title: localized("Occasions and Seasonal Programs", "אירועים ותוכניות עונתיות"),
        text: localized(
          "Flexible starting points for holiday gifting, VIP appreciation, employee appreciation, launch kits, loyalty programs, and custom concierge projects.",
          "רעיונות טובים להתחלה: מתנות חגים, הוקרת VIP, הוקרת עובדים, ערכות השקה, תוכניות נאמנות ופרויקטי קונסיירז' מותאמים.",
        ),
        items: items(
          enHome.occasions.map((title) => ({ title, text: "Custom quoted based on scope, product mix, timing, destination count, and fulfillment needs." })),
          heHome.occasions.map((title) => ({ title, text: "הצעת מחיר מותאמת לפי היקף, שילוב מוצרים, לוח זמנים, יעדים וצרכי הרכבה ושילוח." })),
        ),
      },
      block(enHome.finalCta, heHome.finalCta, 99),
    ],
    seo: seo(enHome.seo, heHome.seo),
    imageAlt: localized("Premium MorePower2You corporate gifting hero image", "תמונת פתיחה פרימיום למתנות ארגוניות של MorePower2You"),
  };
}

function siteSettingsDoc(): SanitySeedDocument {
  return {
    _id: "siteSettings.main",
    _type: "siteSettings",
    siteName: content.en.settings.siteName,
    tagline: localized(content.en.settings.tagline, content.he.settings.tagline),
    serviceArea: localized(content.en.settings.serviceArea, content.he.settings.serviceArea),
    footerDescription: localized(content.en.footer.description, content.he.footer.description),
    privateContactEmail: "",
    privateLegacyAddressNote: content.en.settings.legacyPrivateAddressNote,
  };
}

function navigationDoc(): SanitySeedDocument {
  return {
    _id: "navigation.primary",
    _type: "navigation",
    title: "Primary navigation",
    items: content.en.nav.map((item, index) => ({
      _key: key(item.label, index),
      label: localized(item.label, content.he.nav[index]?.label || item.label),
      href: item.href,
    })),
  };
}

function gamingIndustryDoc(): SanitySeedDocument {
  const enGaming = content.en.services.find((item) => item.slug === "gaming-vip-player-gifting");
  const heGaming = content.he.services.find((item) => item.slug === "gaming-vip-player-gifting");

  if (!enGaming) {
    return industryDraftDoc("Gaming & VIP Player Gifting", "גיימינג ומתנות VIP", 0);
  }

  return {
    ...pageDoc(enGaming, heGaming, "industryPage"),
    _id: "industryPage.gaming-vip-player-gifting",
    publishNow: true,
    industry: localized("Gaming & VIP Player Gifting", "גיימינג ומתנות VIP"),
  };
}

export const seedDocuments: SanitySeedDocument[] = [
  siteSettingsDoc(),
  navigationDoc(),
  homeDoc(),
  ...content.en.pages.map((page, index) => pageDoc(page, content.he.pages[index], "page")),
  ...content.en.legal.map((page, index) => pageDoc(page, content.he.legal[index], "page")),
  ...content.en.services.map((service, index) => serviceDoc(service, content.he.services[index])),
  gamingIndustryDoc(),
  ...content.en.futureIndustries.map((title, index) => industryDraftDoc(title, content.he.futureIndustries[index], index)),
  ...content.en.gallery.map((item, index) => galleryDoc(item, content.he.gallery[index], index)),
  ...content.en.testimonials.map((item, index) => testimonialDoc(item, content.he.testimonials[index], index)),
  ...content.en.faqs.map((item, index) => faqDoc(item, content.he.faqs[index], index)),
  ...content.en.caseStudies.map((item, index) => caseStudyDoc(item, content.he.caseStudies[index])),
  ...content.en.posts.map((post, index) => blogPostDoc(post, content.he.posts[index])),
  ...content.en.resources.map((resource, index) => resourceDoc(resource, content.he.resources[index])),
].map((doc) => JSON.parse(JSON.stringify(doc)) as SanitySeedDocument);

export const seedContent = {
  siteSettings: seedDocuments.find((doc) => doc._type === "siteSettings"),
  navigation: seedDocuments.find((doc) => doc._type === "navigation"),
  pages: seedDocuments.filter((doc) => doc._type === "page"),
  services: seedDocuments.filter((doc) => doc._type === "servicePage"),
  industryPages: seedDocuments.filter((doc) => doc._type === "industryPage"),
  testimonials: seedDocuments.filter((doc) => doc._type === "testimonial"),
  faqs: seedDocuments.filter((doc) => doc._type === "faq"),
  gallery: seedDocuments.filter((doc) => doc._type === "galleryItem"),
  caseStudies: seedDocuments.filter((doc) => doc._type === "caseStudy"),
  posts: seedDocuments.filter((doc) => doc._type === "blogPost"),
  resources: seedDocuments.filter((doc) => doc._type === "resource"),
  generatedAt: seedDate,
};
