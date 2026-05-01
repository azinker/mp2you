import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, CaseStudyPage } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { findCaseStudyInSite, getLocaleContent, getSiteContent } from "@/lib/content";
import { breadcrumbSchema, metadataFor } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLocaleContent("en").caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteContent("en");
  const item = findCaseStudyInSite(site, slug);
  return item ? metadataFor("en", `/case-studies/${item.slug}`, item.seo) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const site = await getSiteContent("en");
  const item = findCaseStudyInSite(site, slug);
  if (!item) notFound();

  return (
    <>
      <SchemaScript
        data={breadcrumbSchema("en", [
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
          { name: item.title, href: `/case-studies/${item.slug}` },
        ])}
      />
      <Breadcrumbs
        locale="en"
        items={[
          { label: "Case Studies", href: "/case-studies" },
          { label: item.title, href: `/case-studies/${item.slug}` },
        ]}
      />
      <CaseStudyPage locale="en" item={item} />
    </>
  );
}
