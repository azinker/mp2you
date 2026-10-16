"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/content/site";
import { BrandMark } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { VersionedLink as Link } from "@/components/versioned-link";
import { stripLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header({
  locale,
  nav,
  cta,
}: {
  locale: Locale;
  nav: { label: string; href: string }[];
  cta: { label: string; href: string };
}) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";
  const current = stripLocale(pathname);

  useEffect(() => {
    // Hysteresis: turn on past 40px, off below 8px, so hovering around a
    // single threshold can never toggle the state back and forth.
    function onScroll() {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 8 : y > 40));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("site-header", scrolled && "is-scrolled")}>
      <div className="container-shell site-header-inner">
        <BrandMark locale={locale} animate />
        <nav className="site-nav" aria-label="Main navigation">
          {nav.map((item) => {
            const target = stripLocale(item.href);
            const active = target === "/" ? current === "/" : current === target || current.startsWith(`${target}/`);
            return (
              <Link key={item.href} href={item.href} className={cn("nav-link", active && "is-active")} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="site-header-actions">
          <LanguageSwitcher />
          <Link href={cta.href} className="button button-primary button-small" data-track="header-main-cta">
            {cta.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <MobileNav locale={locale} nav={nav} cta={cta} />
      </div>
    </header>
  );
}
