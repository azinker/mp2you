import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ResourcePage } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { findResourceInSite, getLocaleContent, getSiteContent } from "@/lib/content";
import { breadcrumbSchema, metadataFor } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLocaleContent("en").resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteContent("en");
  const resource = findResourceInSite(site, slug);
  return resource ? metadataFor("en", `/resources/${resource.slug}`, resource.seo) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const site = await getSiteContent("en");
  const resource = findResourceInSite(site, slug);
  if (!resource) notFound();

  return (
    <>
      <SchemaScript
        data={breadcrumbSchema("en", [
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources/corporate-gifting-planning-checklist" },
          { name: resource.title, href: `/resources/${resource.slug}` },
        ])}
      />
      <Breadcrumbs
        locale="en"
        items={[
          { label: "Resources", href: "/resources/corporate-gifting-planning-checklist" },
          { label: resource.title, href: `/resources/${resource.slug}` },
        ]}
      />
      <ResourcePage locale="en" resource={resource} />
    </>
  );
}
