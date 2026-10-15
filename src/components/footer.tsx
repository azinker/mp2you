import type { Locale } from "@/content/site";
import { BrandMark } from "@/components/brand-mark";
import { VersionedLink as Link } from "@/components/versioned-link";

export function Footer({
  locale,
  footer,
  serviceArea,
}: {
  locale: Locale;
  footer: {
    description: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
  };
  serviceArea: string;
}) {
  return (
    <footer className="footer-band">
      <div className="container-shell footer-grid">
        <div>
          <div className="footer-brand-chip">
            <BrandMark locale={locale} priority={false} />
          </div>
          <p className="footer-copy">{footer.description}</p>
          <p className="footer-copy" style={{ marginTop: 12 }}>
            {serviceArea}
          </p>
        </div>
        <div className="footer-columns">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              <ul>
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
      <div className="footer-bottom">
        <div className="container-shell footer-bottom-inner">
          <span>© {new Date().getFullYear()} MorePower2You. All rights reserved.</span>
          <span className="footer-dots" aria-hidden="true">
            <i style={{ background: "var(--coral)" }} />
            <i style={{ background: "var(--gold)" }} />
            <i style={{ background: "var(--lavender)" }} />
            <i style={{ background: "var(--teal)" }} />
          </span>
        </div>
      </div>
    </footer>
  );
}
