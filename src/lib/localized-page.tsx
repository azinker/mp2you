import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SchemaScript } from "@/components/schema-script";
import {
  Breadcrumbs,
  CaseStudyPage,
  HomePage,
  InsightPostPage,
  ResourcePage,
} from "@/components/templates";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/site";
import {
  allPublicSlugs,
  findCaseStudyInSite,
  findPageInSite,
  findPostInSite,
  findResourceInSite,
  findServiceInSite,
  getLocaleContent,
  getSiteContent,
  publishedPosts,
} from "@/lib/content";
import { isPrefixedLocale, prefixedLocales, withLocale } from "@/lib/i18n";
import { RenderSlugPage, seoForSlugInSite } from "@/lib/page-router";
import { articleSchema, breadcrumbSchema, faqSchema, metadataFor, organizationSchema, serviceSchema } from "@/lib/seo";

export function dynamicMarketingLocales() {
  return prefixedLocales.filter((locale) => locale !== "he");
}

export function requirePrefixedLocale(value: string): Exclude<Locale, "en"> {
  if (!isPrefixedLocale(value)) notFound();
  return value;
}

export function localizedStaticParams() {
  return dynamicMarketingLocales().flatMap((locale) => {
    const site = getLocaleContent(locale);
    const firstSegment = [
      ...allPublicSlugs(locale).map((page) => [page]),
      ["insights"],
      ...publishedPosts(locale).map((post) => ["insights", post.slug]),
      ...site.caseStudies.map((item) => ["case-studies", item.slug]),
      ...site.resources.map((resource) => ["resources", resource.slug]),
    ];
    return firstSegment.map((rest) => ({ slug: locale, rest }));
  });
}

export async function localeHomeMetadata(locale: Locale): Promise<Metadata> {
  const site = await getSiteContent(locale);
  return metadataFor(locale, "/", site.home.seo);
}

export async function LocaleHome({ locale }: { locale: Locale }) {
  const site = await getSiteContent(locale);
  return (
    <>
      <SchemaScript data={organizationSchema(locale)} />
      <HomePage site={site} />
    </>
  );
}

export async function localeRestMetadata(locale: Locale, rest: string[]): Promise<Metadata> {
  const site = await getSiteContent(locale);
  const [section, id] = rest;

  if (rest.length === 1) {
    if (section === "insights") {
      return metadataFor(locale, "/insights", {
        title: `${ui[locale].insights} | MorePower2You`,
        description: ui[locale].insightsText,
        keywords: [],
      });
    }
    const seo = seoForSlugInSite(site, section);
    return seo ? metadataFor(locale, `/${section}`, seo) : {};
  }

  if (rest.length === 2 && section === "insights") {
    const post = findPostInSite(site, id);
    return post ? metadataFor(locale, `/insights/${post.slug}`, post.seo) : {};
  }

  if (rest.length === 2 && section === "case-studies") {
    const item = findCaseStudyInSite(site, id);
    return item ? metadataFor(locale, `/case-studies/${item.slug}`, item.seo) : {};
  }

  if (rest.length === 2 && section === "resources") {
    const resource = findResourceInSite(site, id);
    return resource ? metadataFor(locale, `/resources/${resource.slug}`, resource.seo) : {};
  }

  return {};
}

export async function LocaleRestPage({ locale, rest }: { locale: Locale; rest: string[] }) {
  const site = await getSiteContent(locale);
  const t = ui[locale];
  const [section, id] = rest;

  if (rest.length === 1) {
    const service = findServiceInSite(site, section);
    const page = findPageInSite(site, section);
    const title = service?.title || page?.title || (section === "insights" ? t.insights : section);
    const schemas: Record<string, unknown>[] = [
      organizationSchema(locale),
      breadcrumbSchema(locale, [
        { name: t.home, href: "/" },
        { name: title, href: `/${section}` },
      ]),
    ];
    if (service) schemas.push(serviceSchema(locale, `/${section}`, service.title, service.summary));
    if (section === "faqs") schemas.push(faqSchema(site.faqs));

    return (
      <>
        <SchemaScript data={schemas} />
        <Breadcrumbs locale={locale} items={[{ label: title, href: withLocale(locale, `/${section}`) }]} />
        <RenderSlugPage locale={locale} slug={section} site={site} />
      </>
    );
  }

  if (rest.length === 2 && section === "insights") {
    const post = findPostInSite(site, id);
    if (!post) notFound();
    return (
      <>
        <SchemaScript
          data={[
            articleSchema(locale, `/insights/${post.slug}`, post.title, post.excerpt, post.date),
            breadcrumbSchema(locale, [
              { name: t.home, href: "/" },
              { name: t.insights, href: "/insights" },
              { name: post.title, href: `/insights/${post.slug}` },
            ]),
          ]}
        />
        <Breadcrumbs
          locale={locale}
          items={[
            { label: t.insights, href: withLocale(locale, "/insights") },
            { label: post.title, href: withLocale(locale, `/insights/${post.slug}`) },
          ]}
        />
        <InsightPostPage locale={locale} post={post} />
      </>
    );
  }

  if (rest.length === 2 && section === "case-studies") {
    const item = findCaseStudyInSite(site, id);
    if (!item) notFound();
    return (
      <>
        <SchemaScript
          data={breadcrumbSchema(locale, [
            { name: t.home, href: "/" },
            { name: t.caseStudies, href: "/case-studies" },
            { name: item.title, href: `/case-studies/${item.slug}` },
          ])}
        />
        <Breadcrumbs
          locale={locale}
          items={[
            { label: t.caseStudies, href: withLocale(locale, "/case-studies") },
            { label: item.title, href: withLocale(locale, `/case-studies/${item.slug}`) },
          ]}
        />
        <CaseStudyPage locale={locale} item={item} />
      </>
    );
  }

  if (rest.length === 2 && section === "resources") {
    const resource = findResourceInSite(site, id);
    if (!resource) notFound();
    return (
      <>
        <SchemaScript
          data={breadcrumbSchema(locale, [
            { name: t.home, href: "/" },
            { name: t.resources, href: "/resources/corporate-gifting-planning-checklist" },
            { name: resource.title, href: `/resources/${resource.slug}` },
          ])}
        />
        <Breadcrumbs
          locale={locale}
          items={[
            { label: t.resources, href: withLocale(locale, "/resources/corporate-gifting-planning-checklist") },
            { label: resource.title, href: withLocale(locale, `/resources/${resource.slug}`) },
          ]}
        />
        <ResourcePage locale={locale} resource={resource} />
      </>
    );
  }

  notFound();
}
