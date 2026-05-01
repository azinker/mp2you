import Image from "next/image";
import type { Locale } from "@/content/site";
import { VersionedLink as Link } from "@/components/versioned-link";
import { withLocale } from "@/lib/content";
import { cn } from "@/lib/utils";

export type BrandVariant = "v1" | "v2" | "v3";

const taglines: Record<Locale, Record<BrandVariant, string>> = {
  en: {
    v1: "Corporate gifting concierge",
    v2: "Corporate gifting concierge",
    v3: "Corporate gifting concierge",
  },
  he: {
    v1: "קונסיירז' למתנות ארגוניות",
    v2: "מתנות / קונסיירז' / שילוח",
    v3: "מתנות ארגוניות בקנה מידה",
  },
};

const logos: Record<BrandVariant, { src: string; width: number; height: number }> = {
  v1: { src: "/generated-assets/logo-lockup-v1.png", width: 892, height: 212 },
  v2: { src: "/generated-assets/logo-lockup-v2.png", width: 912, height: 214 },
  v3: { src: "/generated-assets/logo-lockup-v3.png", width: 906, height: 220 },
};

export function BrandMark({ locale, variant = "v1" }: { locale: Locale; variant?: BrandVariant }) {
  const logo = logos[variant];

  return (
    <Link
      href={withLocale(locale, "/")}
      className={cn("brand-lockup brand-lockup-image group", `brand-lockup-image-${variant}`)}
      aria-label="MorePower2You home"
    >
      <Image
        className="brand-logo-image"
        src={logo.src}
        alt=""
        aria-hidden="true"
        width={logo.width}
        height={logo.height}
        priority
        unoptimized
        sizes="(max-width: 639px) 72vw, (max-width: 1535px) 500px, 420px"
      />
      <span className="sr-only">MorePower2You - {taglines[locale][variant]}</span>
    </Link>
  );
}
