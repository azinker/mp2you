import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { ui } from "@/content/ui";
import { allPublicSlugs, findPageInSite, findServiceInSite, getSiteContent } from "@/lib/content";
import { isPrefixedLocale } from "@/lib/i18n";
import { LocaleHome, dynamicMarketingLocales, localeHomeMetadata } from "@/lib/localized-page";
import { RenderSlugPage, seoForSlugInSite } from "@/lib/page-router";
import { breadcrumbSchema, faqSchema, metadataFor, organizationSchema, serviceSchema } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...allPublicSlugs("en").map((slug) => ({ slug })),
    ...dynamicMarketingLocales().map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (isPrefixedLocale(slug)) {
    return localeHomeMetadata(slug);
  }
  const site = await getSiteContent("en");
  const seo = seoForSlugInSite(site, slug);
  return seo ? metadataFor("en", `/${slug}`, seo) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  if (isPrefixedLocale(slug)) {
    return <LocaleHome locale={slug} />;
  }

  const site = await getSiteContent("en");
  const service = findServiceInSite(site, slug);
  const page = findPageInSite(site, slug);
  const title = service?.title || page?.title || slug;
  const schemas: Record<string, unknown>[] = [
    organizationSchema("en"),
    breadcrumbSchema("en", [
      { name: ui.en.home, href: "/" },
      { name: title, href: `/${slug}` },
    ]),
  ];

  if (service) schemas.push(serviceSchema("en", `/${slug}`, service.title, service.summary));
  if (slug === "faqs") schemas.push(faqSchema(site.faqs));

  return (
    <>
      <SchemaScript data={schemas} />
      <Breadcrumbs locale="en" items={[{ label: title, href: `/${slug}` }]} />
      <RenderSlugPage locale="en" slug={slug} site={site} />
    </>
  );
}
