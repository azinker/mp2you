import imageUrlBuilder from "@sanity/image-url";
import { content, locales, type BasicItem, type BlogPost, type CaseStudy, type Locale, type MarketingPage, type Resource, type Seo, type Service, type SiteContent } from "@/content/site";
import { sanityClient } from "@/sanity/lib/client";

type LocalizedValue = {
  en?: string;
  he?: string;
};

type SanitySlug = {
  current?: string;
};

type SanityBlock = {
  eyebrow?: LocalizedValue;
  title?: LocalizedValue;
  text?: LocalizedValue;
  items?: SanityBlockItem[];
};

type SanityBlockItem = {
  title?: LocalizedValue;
  text?: LocalizedValue;
};

type SanitySeo = {
  title?: LocalizedValue;
  description?: LocalizedValue;
  keywords?: string[];
};

type SanityPageDoc = {
  title?: LocalizedValue;
  slug?: SanitySlug;
  status?: "draft" | "published";
  heroEyebrow?: LocalizedValue;
  heroCopy?: LocalizedValue;
  primaryCtaLabel?: LocalizedValue;
  primaryCtaHref?: string;
  secondaryCtaLabel?: LocalizedValue;
  secondaryCtaHref?: string;
  blocks?: SanityBlock[];
  seo?: SanitySeo;
};

type SanityServiceDoc = SanityPageDoc & {
  order?: number;
  summary?: LocalizedValue;
  occasions?: LocalizedValue[];
};

type SanityPostDoc = {
  title?: LocalizedValue;
  slug?: SanitySlug;
  status?: "draft" | "published";
  publishedAt?: string;
  excerpt?: LocalizedValue;
  body?: SanityBlock[];
  seo?: SanitySeo;
};

type SanityCaseStudyDoc = {
  title?: LocalizedValue;
  slug?: SanitySlug;
  status?: "draft" | "published";
  label?: LocalizedValue;
  summary?: LocalizedValue;
  challenge?: LocalizedValue;
  approach?: LocalizedValue;
  outcome?: LocalizedValue;
  seo?: SanitySeo;
};

type SanityGalleryDoc = {
  title?: LocalizedValue;
  caption?: LocalizedValue;
  alt?: LocalizedValue;
  legacyAssetPath?: string;
  image?: unknown;
  status?: "draft" | "published";
};

type SanityTestimonialDoc = {
  name?: string;
  context?: LocalizedValue;
  quote?: LocalizedValue;
  status?: "draft" | "published";
};

type SanityFaqDoc = {
  question?: LocalizedValue;
  answer?: LocalizedValue;
  status?: "draft" | "published";
};

type SanityResourceDoc = {
  title?: LocalizedValue;
  slug?: SanitySlug;
  summary?: LocalizedValue;
  sections?: SanityBlock[];
  seo?: SanitySeo;
};

type SanityIndustryDoc = SanityPageDoc & {
  publishNow?: boolean;
  industry?: LocalizedValue;
};

type SanitySettingsDoc = {
  siteName?: string;
  tagline?: LocalizedValue;
  serviceArea?: LocalizedValue;
  footerDescription?: LocalizedValue;
  privateLegacyAddressNote?: string;
};

type SanityNavigationDoc = {
  items?: {
    label?: LocalizedValue;
    href?: string;
  }[];
};

type SanitySitePayload = {
  settings?: SanitySettingsDoc;
  navigation?: SanityNavigationDoc;
  home?: SanityPageDoc;
  pages?: SanityPageDoc[];
  services?: SanityServiceDoc[];
  industryPages?: SanityIndustryDoc[];
  gallery?: SanityGalleryDoc[];
  testimonials?: SanityTestimonialDoc[];
  faqs?: SanityFaqDoc[];
  caseStudies?: SanityCaseStudyDoc[];
  posts?: SanityPostDoc[];
  resources?: SanityResourceDoc[];
};

const siteContentQuery = `{
  "settings": *[_type == "siteSettings"][0],
  "navigation": *[_type == "navigation"][0],
  "home": *[_type == "page" && slug.current == "home"][0],
  "pages": *[_type == "page" && status == "published" && slug.current != "home"] | order(_createdAt asc),
  "services": *[_type == "servicePage" && status == "published"] | order(order asc),
  "industryPages": *[_type == "industryPage"] | order(_createdAt asc),
  "gallery": *[_type == "galleryItem" && status == "published"] | order(_createdAt asc),
  "testimonials": *[_type == "testimonial" && status == "published"] | order(_createdAt asc),
  "faqs": *[_type == "faq" && status == "published"] | order(_createdAt asc),
  "caseStudies": *[_type == "caseStudy" && status == "published"] | order(_createdAt asc),
  "posts": *[_type == "blogPost"] | order(publishedAt desc),
  "resources": *[_type == "resource"] | order(_createdAt asc)
}`;

const imageBuilder = imageUrlBuilder(sanityClient);

function shouldUseSanityContent() {
  return process.env.NEXT_PUBLIC_USE_SANITY === "true" && Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

function pick(value: LocalizedValue | undefined, locale: Locale, fallback = "") {
  return value?.[locale] || value?.en || fallback;
}

function localizedSeo(docSeo: SanitySeo | undefined, locale: Locale, fallback: Seo): Seo {
  return {
    title: pick(docSeo?.title, locale, fallback.title),
    description: pick(docSeo?.description, locale, fallback.description),
    keywords: docSeo?.keywords?.length ? docSeo.keywords : fallback.keywords,
  };
}

function cta(label: string, href?: string) {
  return label && href ? { label, href } : undefined;
}

function mapBlocks(blocks: SanityBlock[] | undefined, locale: Locale): BasicItem[] {
  return (blocks || [])
    .map((item) => ({
      title: pick(item.title, locale),
      text: pick(item.text, locale),
    }))
    .filter((item) => item.title && item.text);
}

function mapPageBlocks(blocks: SanityBlock[] | undefined, locale: Locale) {
  return (blocks || [])
    .map((item) => ({
      eyebrow: pick(item.eyebrow, locale),
      title: pick(item.title, locale),
      text: pick(item.text, locale),
      items: mapBlocks(item.items, locale),
    }))
    .filter((item) => item.title && item.text);
}

function mapPage(doc: SanityPageDoc, locale: Locale, fallback: MarketingPage): MarketingPage {
  const title = pick(doc.title, locale, fallback.title);

  return {
    slug: doc.slug?.current || fallback.slug,
    title,
    eyebrow: pick(doc.heroEyebrow, locale, fallback.eyebrow),
    intro: pick(doc.heroCopy, locale, fallback.intro),
    primaryCta: cta(pick(doc.primaryCtaLabel, locale), doc.primaryCtaHref) || fallback.primaryCta,
    secondaryCta: cta(pick(doc.secondaryCtaLabel, locale), doc.secondaryCtaHref) || fallback.secondaryCta,
    seo: localizedSeo(doc.seo, locale, fallback.seo),
    blocks: mapPageBlocks(doc.blocks, locale).length ? mapPageBlocks(doc.blocks, locale) : fallback.blocks,
  };
}

function mapService(doc: SanityServiceDoc, locale: Locale, fallback: Service): Service {
  const page = mapPage(doc, locale, fallback);

  return {
    ...page,
    order: doc.order ?? fallback.order,
    summary: pick(doc.summary, locale, fallback.summary),
    occasions: doc.occasions?.map((item) => pick(item, locale)).filter(Boolean) || fallback.occasions,
  };
}

function mapPost(doc: SanityPostDoc, locale: Locale, fallback: BlogPost): BlogPost {
  return {
    slug: doc.slug?.current || fallback.slug,
    title: pick(doc.title, locale, fallback.title),
    status: doc.status || fallback.status,
    date: doc.publishedAt?.slice(0, 10) || fallback.date,
    excerpt: pick(doc.excerpt, locale, fallback.excerpt),
    seo: localizedSeo(doc.seo, locale, fallback.seo),
    sections: mapBlocks(doc.body, locale).length ? mapBlocks(doc.body, locale) : fallback.sections,
  };
}

function mapCaseStudy(doc: SanityCaseStudyDoc, locale: Locale, fallback: CaseStudy): CaseStudy {
  return {
    slug: doc.slug?.current || fallback.slug,
    label: pick(doc.label, locale, fallback.label),
    title: pick(doc.title, locale, fallback.title),
    summary: pick(doc.summary, locale, fallback.summary),
    challenge: pick(doc.challenge, locale, fallback.challenge),
    approach: pick(doc.approach, locale, fallback.approach),
    outcome: pick(doc.outcome, locale, fallback.outcome),
    seo: localizedSeo(doc.seo, locale, fallback.seo),
  };
}

function mapResource(doc: SanityResourceDoc, locale: Locale, fallback: Resource): Resource {
  return {
    slug: doc.slug?.current || fallback.slug,
    title: pick(doc.title, locale, fallback.title),
    summary: pick(doc.summary, locale, fallback.summary),
    seo: localizedSeo(doc.seo, locale, fallback.seo),
    sections: mapBlocks(doc.sections, locale).length ? mapBlocks(doc.sections, locale) : fallback.sections,
  };
}

function imageUrl(image: unknown) {
  if (!image) return "";

  try {
    return imageBuilder.image(image).width(1200).height(900).fit("crop").url();
  } catch {
    return "";
  }
}

function mapSanityPayload(payload: SanitySitePayload, locale: Locale): SiteContent {
  const fallback = content[locale];
  const enFallback = content.en;
  const pagesBySlug = new Map(fallback.pages.map((page) => [page.slug, page]));
  const legalBySlug = new Map(fallback.legal.map((page) => [page.slug, page]));
  const servicesBySlug = new Map(fallback.services.map((service) => [service.slug, service]));
  const postsBySlug = new Map(fallback.posts.map((post) => [post.slug, post]));
  const caseStudiesBySlug = new Map(fallback.caseStudies.map((item) => [item.slug, item]));
  const resourcesBySlug = new Map(fallback.resources.map((resource) => [resource.slug, resource]));
  const pageDocs = payload.pages || [];
  const serviceDocs = payload.services || [];
  const postDocs = payload.posts || [];
  const caseStudyDocs = payload.caseStudies || [];
  const resourceDocs = payload.resources || [];
  const galleryDocs = payload.gallery || [];
  const testimonialDocs = payload.testimonials || [];
  const faqDocs = payload.faqs || [];

  const standardPages = pageDocs
    .filter((doc) => doc.slug?.current && pagesBySlug.has(doc.slug.current))
    .map((doc) => mapPage(doc, locale, pagesBySlug.get(doc.slug?.current || "") || fallback.pages[0]));

  const legalPages = pageDocs
    .filter((doc) => doc.slug?.current && legalBySlug.has(doc.slug.current))
    .map((doc) => mapPage(doc, locale, legalBySlug.get(doc.slug?.current || "") || fallback.legal[0]));

  const services = serviceDocs
    .filter((doc) => doc.slug?.current)
    .map((doc) => mapService(doc, locale, servicesBySlug.get(doc.slug?.current || "") || enFallback.services[0]));

  const posts = postDocs
    .filter((doc) => doc.slug?.current)
    .map((doc) => mapPost(doc, locale, postsBySlug.get(doc.slug?.current || "") || enFallback.posts[0]));

  const caseStudies = caseStudyDocs
    .filter((doc) => doc.slug?.current)
    .map((doc) => mapCaseStudy(doc, locale, caseStudiesBySlug.get(doc.slug?.current || "") || enFallback.caseStudies[0]));

  const resources = resourceDocs
    .filter((doc) => doc.slug?.current)
    .map((doc) => mapResource(doc, locale, resourcesBySlug.get(doc.slug?.current || "") || enFallback.resources[0]));

  const homeBlocks = payload.home?.blocks || [];
  const homeProcess = homeBlocks.find((block) => pick(block.title, "en") === "Turnkey Process");
  const homeOccasions = homeBlocks.find((block) => pick(block.title, "en") === "Occasions and Seasonal Programs");
  const homeFeatured = homeBlocks.filter((block) => {
    const title = pick(block.title, "en");
    return !["Turnkey Process", "Occasions and Seasonal Programs"].includes(title) && title !== fallback.home.whatWeDo.title && title !== fallback.home.finalCta.title;
  });

  return {
    ...fallback,
    settings: {
      ...fallback.settings,
      siteName: payload.settings?.siteName || fallback.settings.siteName,
      tagline: pick(payload.settings?.tagline, locale, fallback.settings.tagline),
      serviceArea: pick(payload.settings?.serviceArea, locale, fallback.settings.serviceArea),
      legacyPrivateAddressNote: payload.settings?.privateLegacyAddressNote || fallback.settings.legacyPrivateAddressNote,
    },
    nav:
      payload.navigation?.items?.map((item) => ({ label: pick(item.label, locale), href: item.href || "/" })).filter((item) => item.label && item.href) ||
      fallback.nav,
    footer: {
      ...fallback.footer,
      description: pick(payload.settings?.footerDescription, locale, fallback.footer.description),
    },
    home: {
      ...fallback.home,
      seo: localizedSeo(payload.home?.seo, locale, fallback.home.seo),
      hero: {
        ...fallback.home.hero,
        eyebrow: pick(payload.home?.heroEyebrow, locale, fallback.home.hero.eyebrow),
        title: pick(payload.home?.title, locale, fallback.home.hero.title),
        text: pick(payload.home?.heroCopy, locale, fallback.home.hero.text),
        primaryCta: cta(pick(payload.home?.primaryCtaLabel, locale), payload.home?.primaryCtaHref) || fallback.home.hero.primaryCta,
        secondaryCta: cta(pick(payload.home?.secondaryCtaLabel, locale), payload.home?.secondaryCtaHref) || fallback.home.hero.secondaryCta,
      },
      whatWeDo: mapPageBlocks([homeBlocks[0]].filter(Boolean) as SanityBlock[], locale)[0] || fallback.home.whatWeDo,
      process: mapBlocks(homeProcess?.items, locale).length ? mapBlocks(homeProcess?.items, locale) : fallback.home.process,
      featured: homeFeatured.length ? mapPageBlocks(homeFeatured, locale) : fallback.home.featured,
      occasions: mapBlocks(homeOccasions?.items, locale).map((item) => item.title) || fallback.home.occasions,
      finalCta: mapPageBlocks([homeBlocks[homeBlocks.length - 1]].filter(Boolean) as SanityBlock[], locale)[0] || fallback.home.finalCta,
    },
    pages: standardPages.length ? standardPages : fallback.pages,
    services: services.length ? services : fallback.services,
    futureIndustries:
      payload.industryPages
        ?.filter((doc) => !doc.publishNow)
        .map((doc) => pick(doc.industry || doc.title, locale))
        .filter(Boolean) || fallback.futureIndustries,
    testimonials: testimonialDocs.length
      ? testimonialDocs.map((item, index) => ({
          name: item.name || fallback.testimonials[index]?.name || "Client",
          context: pick(item.context, locale, fallback.testimonials[index]?.context || ""),
          quote: pick(item.quote, locale, fallback.testimonials[index]?.quote || ""),
        }))
      : fallback.testimonials,
    faqs: faqDocs.length
      ? faqDocs.map((item, index) => ({
          question: pick(item.question, locale, fallback.faqs[index]?.question || ""),
          answer: pick(item.answer, locale, fallback.faqs[index]?.answer || ""),
        }))
      : fallback.faqs,
    gallery: galleryDocs.length
      ? galleryDocs.map((item, index) => ({
          title: pick(item.title, locale, fallback.gallery[index]?.title || ""),
          text: pick(item.caption, locale, fallback.gallery[index]?.text || ""),
          image: imageUrl(item.image) || item.legacyAssetPath || fallback.gallery[index]?.image || fallback.gallery[0].image,
          alt: pick(item.alt, locale, fallback.gallery[index]?.alt || ""),
        }))
      : fallback.gallery,
    caseStudies: caseStudies.length ? caseStudies : fallback.caseStudies,
    posts: posts.length ? posts : fallback.posts,
    resources: resources.length ? resources : fallback.resources,
    legal: legalPages.length ? legalPages : fallback.legal,
  };
}

export function getLocaleContent(locale: Locale = "en") {
  return content[locale];
}

export async function getSiteContent(locale: Locale = "en") {
  if (!shouldUseSanityContent()) {
    return getLocaleContent(locale);
  }

  try {
    const payload = await sanityClient.fetch<SanitySitePayload>(siteContentQuery, {}, { next: { revalidate: 60 } });
    return mapSanityPayload(payload, locale);
  } catch (error) {
    console.warn("Sanity content fetch failed. Falling back to static content.", error);
    return getLocaleContent(locale);
  }
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function withLocale(locale: Locale, href: string) {
  if (href.startsWith("http")) return href;
  if (locale === "en") return href;
  return href === "/" ? "/he" : `/he${href.startsWith("/he") ? href.slice(3) : href}`;
}

export function stripLocale(pathname: string) {
  return pathname.replace(/^\/he(?=\/|$)/, "") || "/";
}

export function alternatePath(locale: Locale, pathname: string) {
  const clean = stripLocale(pathname);
  return locale === "en" ? clean : withLocale("he", clean);
}

export function findPage(locale: Locale, slug: string): MarketingPage | undefined {
  const site = getLocaleContent(locale);
  return findPageInSite(site, slug);
}

export function findService(locale: Locale, slug: string): Service | undefined {
  return findServiceInSite(getLocaleContent(locale), slug);
}

export function findCaseStudy(locale: Locale, slug: string): CaseStudy | undefined {
  return findCaseStudyInSite(getLocaleContent(locale), slug);
}

export function publishedPosts(locale: Locale): BlogPost[] {
  return getLocaleContent(locale).posts.filter((post) => post.status === "published");
}

export function draftPosts(locale: Locale): BlogPost[] {
  return getLocaleContent(locale).posts.filter((post) => post.status === "draft");
}

export function findPost(locale: Locale, slug: string): BlogPost | undefined {
  return findPostInSite(getLocaleContent(locale), slug);
}

export function findResource(locale: Locale, slug: string): Resource | undefined {
  return findResourceInSite(getLocaleContent(locale), slug);
}

export function allPublicSlugs(locale: Locale) {
  const site = getLocaleContent(locale);
  return allPublicSlugsInSite(site);
}

export function findPageInSite(site: SiteContent, slug: string): MarketingPage | undefined {
  return [...site.pages, ...site.legal].find((page) => page.slug === slug);
}

export function findServiceInSite(site: SiteContent, slug: string): Service | undefined {
  return site.services.find((service) => service.slug === slug);
}

export function findCaseStudyInSite(site: SiteContent, slug: string): CaseStudy | undefined {
  return site.caseStudies.find((item) => item.slug === slug);
}

export function findPostInSite(site: SiteContent, slug: string): BlogPost | undefined {
  return site.posts.find((post) => post.slug === slug && post.status === "published");
}

export function findResourceInSite(site: SiteContent, slug: string): Resource | undefined {
  return site.resources.find((resource) => resource.slug === slug);
}

export function publishedPostsInSite(site: SiteContent): BlogPost[] {
  return site.posts.filter((post) => post.status === "published");
}

export function allPublicSlugsInSite(site: SiteContent) {
  return [
    ...site.pages.map((page) => page.slug),
    ...site.legal.map((page) => page.slug),
    ...site.services.map((service) => service.slug),
  ];
}
