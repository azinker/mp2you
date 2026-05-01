import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { allPublicSlugs, findPageInSite, findServiceInSite, getSiteContent } from "@/lib/content";
import { breadcrumbSchema, faqSchema, metadataFor, organizationSchema, serviceSchema } from "@/lib/seo";
import { RenderSlugPage, seoForSlugInSite } from "@/lib/page-router";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPublicSlugs("he").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteContent("he");
  const seo = seoForSlugInSite(site, slug);
  return seo ? metadataFor("he", `/${slug}`, seo) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const site = await getSiteContent("he");
  const service = findServiceInSite(site, slug);
  const page = findPageInSite(site, slug);
  const title = service?.title || page?.title || slug;
  const schemas: Record<string, unknown>[] = [
    organizationSchema("he"),
    breadcrumbSchema("he", [
      { name: "בית", href: "/" },
      { name: title, href: `/${slug}` },
    ]),
  ];

  if (service) schemas.push(serviceSchema("he", `/${slug}`, service.title, service.summary));
  if (slug === "faqs") schemas.push(faqSchema(site.faqs));

  return (
    <>
      <SchemaScript data={schemas} />
      <Breadcrumbs locale="he" items={[{ label: title, href: `/he/${slug}` }]} />
      <RenderSlugPage locale="he" slug={slug} site={site} />
    </>
  );
}
