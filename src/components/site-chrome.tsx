"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ui } from "@/content/ui";
import { getLocaleContent, withLocale } from "@/lib/content";
import { localeFromPathname, localeMeta } from "@/lib/i18n";
import type { Locale } from "@/content/site";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");
  const isInventory = pathname === "/inventory" || pathname.startsWith("/inventory/");
  const isDesignLab = pathname === "/design-lab" || pathname.startsWith("/design-lab/");
  const locale: Locale = localeFromPathname(pathname);
  const site = getLocaleContent(locale);
  const cta = {
    label: ui[locale].startProject,
    href: withLocale(locale, "/contact"),
  };

  if (isDesignLab) {
    return <>{children}</>;
  }

  if (isStudio || isInventory) {
    return (
      <div lang="en" dir="ltr" className="min-h-screen bg-white text-ink">
        {children}
      </div>
    );
  }

  return (
    <div lang={localeMeta[locale].htmlLang} dir={site.direction} className="site-shell theme-brand">
      <Header locale={locale} nav={site.nav} cta={cta} />
      <main>{children}</main>
      <Footer locale={locale} footer={site.footer} serviceArea={site.settings.serviceArea} />
    </div>
  );
}
