"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { VersionedLink as Link } from "@/components/versioned-link";
import { locales, type Locale } from "@/content/site";
import { alternatePath, localeFromPathname, localeMeta } from "@/lib/i18n";

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const current = localeFromPathname(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="language-switcher" ref={rootRef}>
      <button
        type="button"
        className="language-switcher-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Language"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{localeMeta[current].nativeLabel}</span>
        <span aria-hidden="true" className="language-switcher-caret">
          ▾
        </span>
      </button>
      {open ? (
        <div className="language-switcher-menu" id={menuId} role="listbox" aria-label="Languages">
          {locales.map((locale: Locale) => (
            <Link
              key={locale}
              href={alternatePath(locale, pathname)}
              lang={localeMeta[locale].htmlLang}
              dir={localeMeta[locale].dir}
              role="option"
              aria-selected={locale === current}
              data-track={`language-${locale}`}
              className={locale === current ? "is-active" : undefined}
              onClick={() => setOpen(false)}
            >
              {localeMeta[locale].nativeLabel}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
