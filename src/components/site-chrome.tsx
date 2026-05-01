"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getLocaleContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Locale } from "@/content/site";
import type { BrandVariant } from "@/components/brand-mark";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");
  const locale: Locale = pathname.startsWith("/he") ? "he" : "en";
  const isV2 = pathname === "/v2" || pathname.startsWith("/v2/") || pathname === "/he/v2" || pathname.startsWith("/he/v2/");
  const isV3 = pathname === "/v3" || pathname.startsWith("/v3/") || pathname === "/he/v3" || pathname.startsWith("/he/v3/");
  const isV1 = !isV2 && !isV3;
  const brandVariant: BrandVariant = isV3 ? "v3" : isV2 ? "v2" : "v1";
  const site = getLocaleContent(locale);
  const cta = {
    label: locale === "he" ? "דברו איתנו" : "Start a Project",
    href: locale === "he" ? "/he/contact" : "/contact",
  };

  if (isStudio) {
    return (
      <div lang="en" dir="ltr" className="min-h-screen bg-white text-charcoal">
        {children}
      </div>
    );
  }

  return (
    <div lang={locale} dir={site.direction} className={cn("min-h-screen bg-porcelain text-charcoal", isV1 && "theme-v1", isV2 && "theme-v2", isV3 && "theme-v3")}>
      <Header locale={locale} nav={site.nav} cta={cta} brandVariant={brandVariant} />
      <main>{children}</main>
      <Footer locale={locale} footer={site.footer} serviceArea={site.settings.serviceArea} brandVariant={brandVariant} />
    </div>
  );
}
