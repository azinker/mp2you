import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, CaseStudyPage } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { findCaseStudyInSite, getLocaleContent, getSiteContent } from "@/lib/content";
import { breadcrumbSchema, metadataFor } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLocaleContent("he").caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteContent("he");
  const item = findCaseStudyInSite(site, slug);
  return item ? metadataFor("he", `/case-studies/${item.slug}`, item.seo) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const site = await getSiteContent("he");
  const item = findCaseStudyInSite(site, slug);
  if (!item) notFound();

  return (
    <>
      <SchemaScript
        data={breadcrumbSchema("he", [
          { name: "בית", href: "/" },
          { name: "פרופילי פרויקטים", href: "/case-studies" },
          { name: item.title, href: `/case-studies/${item.slug}` },
        ])}
      />
      <Breadcrumbs
        locale="he"
        items={[
          { label: "פרופילי פרויקטים", href: "/he/case-studies" },
          { label: item.title, href: `/he/case-studies/${item.slug}` },
        ]}
      />
      <CaseStudyPage locale="he" item={item} />
    </>
  );
}
