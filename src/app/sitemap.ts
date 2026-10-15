import type { MetadataRoute } from "next";
import { locales } from "@/content/site";
import { ui } from "@/content/ui";
import { getSiteContent, withLocale } from "@/lib/content";
import { languageAlternates } from "@/lib/i18n";
import { absoluteUrl, explainerVideo, siteContentUpdated } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

const updated = new Date(siteContentUpdated);

/** Every locale version of `path` lists all of its siblings, so hreflang
 * is discoverable from the sitemap as well as from the <head>. */
function alternatesFor(path: string) {
  return {
    languages: {
      ...Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absoluteUrl(href)])),
      "x-default": absoluteUrl(path),
    },
  };
}

function entry(locale: (typeof locales)[number], path: string, extra: Partial<Entry> = {}): Entry {
  return {
    url: absoluteUrl(withLocale(locale, path)),
    lastModified: updated,
    alternates: alternatesFor(path),
    ...extra,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const site = await getSiteContent(locale);
    const t = ui[locale];

    urls.push(
      entry(locale, "/", {
        changeFrequency: "weekly",
        priority: 1,
        videos: [
          {
            title: t.videoTitle,
            description: t.videoText,
            thumbnail_loc: absoluteUrl(explainerVideo.posterPath),
            content_loc: absoluteUrl(explainerVideo.contentPath),
            duration: explainerVideo.durationSeconds,
            publication_date: explainerVideo.uploadDate,
            family_friendly: "yes",
            live: "no",
          },
        ],
      }),
    );

    for (const service of site.services) {
      urls.push(entry(locale, `/${service.slug}`, { changeFrequency: "monthly", priority: 0.9 }));
    }
    for (const page of site.pages) {
      const priority = ["services", "contact", "gaming-vip-player-gifting", "who-we-serve"].includes(page.slug) ? 0.9 : 0.8;
      urls.push(entry(locale, `/${page.slug}`, { changeFrequency: "monthly", priority }));
    }
    for (const page of site.legal) {
      urls.push(entry(locale, `/${page.slug}`, { changeFrequency: "yearly", priority: 0.3 }));
    }

    urls.push(entry(locale, "/insights", { changeFrequency: "weekly", priority: 0.7 }));
    for (const post of site.posts.filter((item) => item.status === "published")) {
      const postDate = new Date(post.date);
      urls.push(
        entry(locale, `/insights/${post.slug}`, {
          changeFrequency: "monthly",
          priority: 0.65,
          lastModified: postDate > updated ? postDate : updated,
        }),
      );
    }
    for (const resource of site.resources) {
      urls.push(entry(locale, `/resources/${resource.slug}`, { changeFrequency: "monthly", priority: 0.6 }));
    }
    for (const item of site.caseStudies) {
      urls.push(entry(locale, `/case-studies/${item.slug}`, { changeFrequency: "monthly", priority: 0.6 }));
    }
  }

  return urls;
}
