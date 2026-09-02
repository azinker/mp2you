import type { MetadataRoute } from "next";
import { locales } from "@/content/site";
import { getSiteContent, withLocale } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const site = await getSiteContent(locale);
    urls.push({ url: absoluteUrl(withLocale(locale, "/")), changeFrequency: "weekly", priority: 1 });
    for (const page of [...site.pages, ...site.legal, ...site.services]) {
      urls.push({ url: absoluteUrl(withLocale(locale, `/${page.slug}`)), changeFrequency: "monthly", priority: 0.8 });
    }
    urls.push({ url: absoluteUrl(withLocale(locale, "/insights")), changeFrequency: "weekly", priority: 0.7 });
    for (const post of site.posts.filter((item) => item.status === "published")) {
      urls.push({ url: absoluteUrl(withLocale(locale, `/insights/${post.slug}`)), changeFrequency: "monthly", priority: 0.65 });
    }
    for (const resource of site.resources) {
      urls.push({ url: absoluteUrl(withLocale(locale, `/resources/${resource.slug}`)), changeFrequency: "monthly", priority: 0.55 });
    }
    for (const item of site.caseStudies) {
      urls.push({ url: absoluteUrl(withLocale(locale, `/case-studies/${item.slug}`)), changeFrequency: "monthly", priority: 0.55 });
    }
  }

  return urls;
}
