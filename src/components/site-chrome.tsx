"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getLocaleContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Locale } from "@/content/site";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");
  const locale: Locale = pathname.startsWith("/he") ? "he" : "en";
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
    <div lang={locale} dir={site.direction} className={cn("min-h-screen bg-porcelain text-charcoal", "theme-v1")}>
      <Header locale={locale} nav={site.nav} cta={cta} brandVariant="v1" />
      <main>{children}</main>
      <Footer locale={locale} footer={site.footer} serviceArea={site.settings.serviceArea} brandVariant="v1" />
    </div>
  );
}
