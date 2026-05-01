import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, HomePage } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { allPublicSlugs, findPageInSite, findServiceInSite, getSiteContent } from "@/lib/content";
import { breadcrumbSchema, faqSchema, metadataFor, organizationSchema, serviceSchema } from "@/lib/seo";
import { RenderSlugPage, seoForSlugInSite } from "@/lib/page-router";
import type { Locale } from "@/content/site";

export type VersionedParams = {
  params: Promise<{ slug?: string[] }>;
};

export function versionedStaticParams(locale: Locale) {
  return [{}, ...allPublicSlugs(locale).map((slug) => ({ slug: [slug] }))];
}

export async function versionedMetadata(locale: Locale, { params }: VersionedParams): Promise<Metadata> {
  const slug = await getSingleSlug(params);
  const site = await getSiteContent(locale);

  if (!slug) return metadataFor(locale, "/", site.home.seo);

  const seo = seoForSlugInSite(site, slug);
  return seo ? metadataFor(locale, `/${slug}`, seo) : {};
}

export async function VersionedPage({ locale, params }: VersionedParams & { locale: Locale }) {
  const slug = await getSingleSlug(params);
  const site = await getSiteContent(locale);

  if (!slug) {
    return (
      <>
        <SchemaScript data={organizationSchema(locale)} />
        <HomePage site={site} />
      </>
    );
  }

  const service = findServiceInSite(site, slug);
  const page = findPageInSite(site, slug);
  const title = service?.title || page?.title || slug;
  const homeLabel = locale === "he" ? "בית" : "Home";
  const schemas: Record<string, unknown>[] = [
    organizationSchema(locale),
    breadcrumbSchema(locale, [
      { name: homeLabel, href: "/" },
      { name: title, href: `/${slug}` },
    ]),
  ];

  if (service) schemas.push(serviceSchema(locale, `/${slug}`, service.title, service.summary));
  if (slug === "faqs") schemas.push(faqSchema(site.faqs));

  return (
    <>
      <SchemaScript data={schemas} />
      <Breadcrumbs locale={locale} items={[{ label: title, href: locale === "he" ? `/he/${slug}` : `/${slug}` }]} />
      <RenderSlugPage locale={locale} slug={slug} site={site} />
    </>
  );
}

async function getSingleSlug(params: VersionedParams["params"]) {
  const { slug } = await params;
  if (!slug?.length) return "";
  if (slug.length > 1) notFound();
  return slug[0];
}
