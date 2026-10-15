import type { Locale } from "@/content/site";
import { BrandMark, type BrandVariant } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { VersionedLink as Link } from "@/components/versioned-link";

export function Header({
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
  return (
    <header className="site-header">
      <div className="container-shell flex h-24 items-center justify-between gap-6 sm:h-32">
        <BrandMark locale={locale} variant={brandVariant} />
        <nav className="hidden items-center gap-6 min-[1400px]:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 min-[1400px]:flex">
          <LanguageSwitcher />
          <Link href={cta.href} className="button button-primary" data-track="header-main-cta">
            {cta.label}
          </Link>
        </div>
        <MobileNav locale={locale} nav={nav} cta={cta} brandVariant={brandVariant} />
      </div>
    </header>
  );
}
