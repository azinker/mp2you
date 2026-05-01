import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { allPublicSlugs, findPageInSite, findServiceInSite, getSiteContent } from "@/lib/content";
import { breadcrumbSchema, faqSchema, metadataFor, organizationSchema, serviceSchema } from "@/lib/seo";
import { RenderSlugPage, seoForSlugInSite } from "@/lib/page-router";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPublicSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteContent("en");
  const seo = seoForSlugInSite(site, slug);
  return seo ? metadataFor("en", `/${slug}`, seo) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const site = await getSiteContent("en");
  const service = findServiceInSite(site, slug);
  const page = findPageInSite(site, slug);
  const title = service?.title || page?.title || slug;
  const schemas: Record<string, unknown>[] = [
    organizationSchema("en"),
    breadcrumbSchema("en", [
      { name: "Home", href: "/" },
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
