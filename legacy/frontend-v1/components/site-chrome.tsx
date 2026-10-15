"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ui } from "@/content/ui";
import { getLocaleContent, withLocale } from "@/lib/content";
import { localeFromPathname, localeMeta } from "@/lib/i18n";
import { cn } from "@/lib/utils";
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
      <div lang="en" dir="ltr" className="min-h-screen bg-white text-charcoal">
        {children}
      </div>
    );
  }

  return (
    <div lang={localeMeta[locale].htmlLang} dir={site.direction} className={cn("min-h-screen bg-porcelain text-charcoal", "theme-v1")}>
      <Header locale={locale} nav={site.nav} cta={cta} brandVariant="v1" />
      <main>{children}</main>
      <Footer locale={locale} footer={site.footer} serviceArea={site.settings.serviceArea} brandVariant="v1" />
    </div>
  );
}
