import type { Locale } from "@/content/site";
import { BrandMark, type BrandVariant } from "@/components/brand-mark";
import { VersionedLink as Link } from "@/components/versioned-link";

export function Footer({
  locale,
  footer,
  serviceArea,
  brandVariant,
}: {
  locale: Locale;
  footer: {
    description: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
  };
  serviceArea: string;
  brandVariant: BrandVariant;
}) {
  return (
    <footer className="footer-band">
      <div className="container-shell grid gap-12 py-16 lg:grid-cols-[1.1fr_1.7fr]">
        <div>
          <BrandMark locale={locale} variant={brandVariant} />
          <p className="mt-6 max-w-md text-sm leading-7 text-stone">{footer.description}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone">{serviceArea}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold uppercase text-charcoal tracking-normal">{column.title}</h2>
              <ul className="mt-4 grid gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link className="footer-link" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-champagne/50">
        <div className="container-shell flex flex-col gap-3 py-5 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} MorePower2You. All rights reserved.</span>
          <span>No public phone CTA. No public physical address.</span>
        </div>
      </div>
    </footer>
  );
}
