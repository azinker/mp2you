import type { Metadata } from "next";
import { getLocaleContent, withLocale } from "@/lib/content";
import type { Locale, Seo } from "@/content/site";
import { ui } from "@/content/ui";
import { languageAlternates, localeMeta } from "@/lib/i18n";

const fallbackUrl = "https://www.morepower2you.com";

/** Date the public site content was last materially revised. Bump when copy or pages change. */
export const siteContentUpdated = "2026-10-15";

/** Explainer video shown on every home page. One source of truth for schema + sitemap. */
export const explainerVideo = {
  contentPath: "/video/mp2y-explainer.mp4",
  posterPath: "/video/mp2y-explainer-poster.jpg",
  uploadDate: "2026-10-15",
  durationSeconds: 25,
};

const brandAlternateNames = ["More Power 2 You", "MP2Y", "MorePower2You Corporate Gifting Concierge"];

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl).replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

function organizationId() {
  return `${siteUrl()}/#organization`;
}

function websiteId() {
  return `${siteUrl()}/#website`;
}

function logoObject() {
  return {
    "@type": "ImageObject",
    url: absoluteUrl("/brand/logo-lockup-1200.png"),
    width: 1200,
    height: 235,
  };
}

export const defaultRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function metadataFor(locale: Locale, path: string, seo: Seo): Metadata {
  const site = getLocaleContent(locale);
  const localizedPath = withLocale(locale, path);
  const title = seo.title;
  const description = seo.description;

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: {
      canonical: absoluteUrl(localizedPath),
      languages: {
        ...Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absoluteUrl(href)]),
        ),
        "x-default": absoluteUrl(path),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: site.settings.siteName,
      url: absoluteUrl(localizedPath),
      locale: localeMeta[locale].ogLocale,
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export function organizationSchema(locale: Locale) {
  const site = getLocaleContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(),
    name: site.settings.siteName,
    alternateName: brandAlternateNames,
    url: siteUrl(),
    logo: logoObject(),
    image: absoluteUrl("/opengraph-image"),
    description: site.footer.description,
    slogan: site.settings.tagline,
    areaServed: [{ "@type": "Country", name: "United States" }, "Worldwide"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        url: absoluteUrl(withLocale(locale, "/contact")),
        availableLanguage: ["English", "Spanish", "French", "German", "Portuguese", "Chinese", "Arabic", "Hebrew"],
      },
    ],
    knowsAbout: [
      "Corporate gifting",
      "Corporate gift boxes",
      "Custom branded gift boxes",
      "Client appreciation gifts",
      "Employee appreciation gifts",
      "Holiday corporate gifts",
      "VIP gifting",
      "Gaming and casino VIP player gifting",
      "Gift fulfillment",
      "Kitting and warehousing",
      "Mass mailings",
      "Concierge gifting services",
    ],
  };
}

export function websiteSchema(locale: Locale) {
  const site = getLocaleContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    url: siteUrl(),
    name: site.settings.siteName,
    alternateName: brandAlternateNames,
    description: site.home.seo.description,
    inLanguage: localeMeta[locale].bcp47,
    publisher: { "@id": organizationId() },
  };
}

export function explainerVideoSchema(locale: Locale) {
  const t = ui[locale];
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${absoluteUrl(withLocale(locale, "/"))}#explainer-video`,
    name: t.videoTitle,
    description: t.videoText,
    thumbnailUrl: [absoluteUrl(explainerVideo.posterPath)],
    contentUrl: absoluteUrl(explainerVideo.contentPath),
    uploadDate: explainerVideo.uploadDate,
    duration: `PT${explainerVideo.durationSeconds}S`,
    inLanguage: "en",
    isFamilyFriendly: true,
    publisher: { "@id": organizationId() },
  };
}

/** Everything the home page should emit: org + website + the explainer video. */
export function homeSchemas(locale: Locale) {
  return [organizationSchema(locale), websiteSchema(locale), explainerVideoSchema(locale)];
}

export function serviceSchema(locale: Locale, path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    provider: {
      "@id": organizationId(),
      "@type": "Organization",
      name: "MorePower2You",
      url: siteUrl(),
    },
    areaServed: ["United States", "Worldwide"],
    url: absoluteUrl(withLocale(locale, path)),
  };
}

export function breadcrumbSchema(locale: Locale, crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(withLocale(locale, crumb.href)),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(locale: Locale, path: string, title: string, description: string, datePublished: string) {
  const url = absoluteUrl(withLocale(locale, path));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: [absoluteUrl("/opengraph-image")],
    inLanguage: localeMeta[locale].bcp47,
    datePublished,
    dateModified: datePublished,
    author: { "@id": organizationId(), "@type": "Organization", name: "MorePower2You", url: siteUrl() },
    publisher: { "@id": organizationId(), "@type": "Organization", name: "MorePower2You", logo: logoObject() },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
