import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of ["en", "he"] as const) {
    const site = await getSiteContent(locale);
    const prefix = locale === "he" ? "/he" : "";
    urls.push({ url: absoluteUrl(prefix || "/"), changeFrequency: "weekly", priority: 1 });
    for (const page of [...site.pages, ...site.legal, ...site.services]) {
      urls.push({ url: absoluteUrl(`${prefix}/${page.slug}`), changeFrequency: "monthly", priority: 0.8 });
    }
    urls.push({ url: absoluteUrl(`${prefix}/insights`), changeFrequency: "weekly", priority: 0.7 });
    for (const post of site.posts.filter((item) => item.status === "published")) {
      urls.push({ url: absoluteUrl(`${prefix}/insights/${post.slug}`), changeFrequency: "monthly", priority: 0.65 });
    }
    for (const resource of site.resources) {
      urls.push({ url: absoluteUrl(`${prefix}/resources/${resource.slug}`), changeFrequency: "monthly", priority: 0.55 });
    }
    for (const item of site.caseStudies) {
      urls.push({ url: absoluteUrl(`${prefix}/case-studies/${item.slug}`), changeFrequency: "monthly", priority: 0.55 });
    }
  }

  return urls;
}
