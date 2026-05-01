import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, InsightPostPage } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { findPostInSite, getSiteContent, publishedPosts } from "@/lib/content";
import { articleSchema, breadcrumbSchema, metadataFor } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedPosts("he").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteContent("he");
  const post = findPostInSite(site, slug);
  return post ? metadataFor("he", `/insights/${post.slug}`, post.seo) : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const site = await getSiteContent("he");
  const post = findPostInSite(site, slug);
  if (!post) notFound();

  return (
    <>
      <SchemaScript
        data={[
          articleSchema("he", `/insights/${post.slug}`, post.title, post.excerpt, post.date),
          breadcrumbSchema("he", [
            { name: "בית", href: "/" },
            { name: "מאמרים", href: "/insights" },
            { name: post.title, href: `/insights/${post.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        locale="he"
        items={[
          { label: "מאמרים", href: "/he/insights" },
          { label: post.title, href: `/he/insights/${post.slug}` },
        ]}
      />
      <InsightPostPage locale="he" post={post} />
    </>
  );
}
