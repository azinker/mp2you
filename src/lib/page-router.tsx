import { notFound } from "next/navigation";
import {
  CaseStudiesIndex,
  ContactPage,
  FaqPage,
  GalleryPage,
  ProcessPage,
  ServicePage,
  ServicesIndex,
  StandardPage,
  TestimonialsPage,
  WhoWeServePage,
} from "@/components/templates";
import type { Locale, Seo, SiteContent } from "@/content/site";
import { findPage, findPageInSite, findService, findServiceInSite, getLocaleContent } from "@/lib/content";

export function seoForSlug(locale: Locale, slug: string): Seo | undefined {
  return findService(locale, slug)?.seo || findPage(locale, slug)?.seo;
}

export function seoForSlugInSite(site: SiteContent, slug: string): Seo | undefined {
  return findServiceInSite(site, slug)?.seo || findPageInSite(site, slug)?.seo;
}

export function RenderSlugPage({ locale, slug, site = getLocaleContent(locale) }: { locale: Locale; slug: string; site?: SiteContent }) {
  const service = findServiceInSite(site, slug);

  if (service) {
    const related = site.services.filter((item) => item.slug !== service.slug).slice(0, 3);
    return <ServicePage locale={locale} service={service} related={related} />;
  }

  switch (slug) {
    case "services":
      return <ServicesIndex site={site} />;
    case "who-we-serve":
      return <WhoWeServePage site={site} />;
    case "process":
      return <ProcessPage site={site} />;
    case "gallery":
      return <GalleryPage site={site} />;
    case "case-studies":
      return <CaseStudiesIndex site={site} />;
    case "testimonials":
      return <TestimonialsPage site={site} />;
    case "faqs":
      return <FaqPage site={site} />;
    case "contact":
      return <ContactPage site={site} />;
    default: {
      const page = findPageInSite(site, slug);
      if (!page) notFound();
      return <StandardPage page={page} />;
    }
  }
}
