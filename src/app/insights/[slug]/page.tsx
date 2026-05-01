import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, InsightPostPage } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { findPostInSite, getSiteContent, publishedPosts } from "@/lib/content";
import { articleSchema, breadcrumbSchema, metadataFor } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedPosts("en").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteContent("en");
  const post = findPostInSite(site, slug);
  return post ? metadataFor("en", `/insights/${post.slug}`, post.seo) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const site = await getSiteContent("en");
  const post = findPostInSite(site, slug);
  if (!post) notFound();

  return (
    <>
      <SchemaScript
        data={[
          articleSchema("en", `/insights/${post.slug}`, post.title, post.excerpt, post.date),
          breadcrumbSchema("en", [
            { name: "Home", href: "/" },
            { name: "Insights", href: "/insights" },
            { name: post.title, href: `/insights/${post.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        locale="en"
        items={[
          { label: "Insights", href: "/insights" },
          { label: post.title, href: `/insights/${post.slug}` },
        ]}
      />
      <InsightPostPage locale="en" post={post} />
    </>
  );
}
