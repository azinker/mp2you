import type { Metadata } from "next";
import { getLocaleContent, withLocale } from "@/lib/content";
import type { Locale, Seo } from "@/content/site";

const fallbackUrl = "https://www.morepower2you.com";

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl).replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

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
        en: absoluteUrl(path),
        he: absoluteUrl(withLocale("he", path)),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: site.settings.siteName,
      url: absoluteUrl(localizedPath),
      locale: locale === "he" ? "he_IL" : "en_US",
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
    name: site.settings.siteName,
    url: siteUrl(),
    description: site.footer.description,
    areaServed: ["United States", "International"],
    knowsAbout: [
      "Corporate gifting",
      "Custom gift boxes",
      "VIP gifting",
      "Gift fulfillment",
      "Warehousing",
      "Mass mailings",
      "Concierge services",
    ],
  };
}

export function serviceSchema(locale: Locale, path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "MorePower2You",
      url: siteUrl(),
    },
    areaServed: ["United States", "International"],
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: { "@type": "Organization", name: "MorePower2You" },
    publisher: { "@type": "Organization", name: "MorePower2You" },
    mainEntityOfPage: absoluteUrl(withLocale(locale, path)),
  };
}
