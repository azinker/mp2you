"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/content/site";
import { BrandMark, type BrandVariant } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { VersionedLink as Link } from "@/components/versioned-link";

export function MobileNav({
  locale,
  nav,
  cta,
  brandVariant,
}: {
  locale: Locale;
  nav: { label: string; href: string }[];
  cta: { label: string; href: string };
  brandVariant: BrandVariant;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-[1400px]:hidden">
      <button className="icon-button" type="button" aria-label="Open navigation" onClick={() => setOpen(true)}>
        <Menu aria-hidden="true" size={20} />
      </button>
      {open ? (
        <div className="mobile-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="flex items-center justify-between">
            <BrandMark locale={locale} variant={brandVariant} />
            <button className="icon-button" type="button" aria-label="Close navigation" onClick={() => setOpen(false)}>
              <X aria-hidden="true" size={20} />
            </button>
          </div>
          <nav className="mt-8 grid gap-2" aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex items-center justify-between gap-4">
            <LanguageSwitcher />
            <Link href={cta.href} className="button button-primary" onClick={() => setOpen(false)} data-track="mobile-main-cta">
              {cta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
