"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/content/site";
import { BrandMark } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { VersionedLink as Link } from "@/components/versioned-link";

export function MobileNav({
  locale,
  nav,
  cta,
}: {
  locale: Locale;
  nav: { label: string; href: string }[];
  cta: { label: string; href: string };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="mobile-nav-root">
      <button
        className="icon-button"
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" size={20} />
      </button>
      {/* Portal to <body>: the sticky header's backdrop-filter would otherwise
          become the containing block for this fixed-position panel. */}
      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              className="mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              lang={locale}
              dir={locale === "he" || locale === "ar" ? "rtl" : "ltr"}
            >
              <div className="mobile-panel-head">
                <BrandMark locale={locale} priority={false} />
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Close navigation"
                  onClick={() => setOpen(false)}
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </div>
              <nav className="mobile-nav-list" aria-label="Mobile navigation">
                {nav.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="mobile-nav-link"
                    style={{ "--i": index } as CSSProperties}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <ArrowRight size={22} aria-hidden="true" />
                  </Link>
                ))}
              </nav>
              <div className="mobile-panel-foot">
                <LanguageSwitcher />
                <Link
                  href={cta.href}
                  className="button button-primary"
                  onClick={() => setOpen(false)}
                  data-track="mobile-main-cta"
                >
                  {cta.label}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
