"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname, localeMeta } from "@/lib/i18n";

/**
 * The root layout is shared by every locale and renders statically, so it
 * cannot know the locale on the server. This keeps <html lang> and <html dir>
 * in sync with the URL for assistive tech, translation tools, and crawlers
 * that read the rendered DOM. Search engines use the hreflang links as the
 * authoritative language signal; this is the belt to that suspenders.
 */
export function HtmlLang() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = localeMeta[locale].htmlLang;
    root.dir = localeMeta[locale].dir;
  }, [locale]);

  return null;
}
