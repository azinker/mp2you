import Image from "next/image";
import type { Locale } from "@/content/site";
import { ui } from "@/content/ui";
import { VersionedLink as Link } from "@/components/versioned-link";
import { withLocale } from "@/lib/content";
import { cn } from "@/lib/utils";

export type BrandVariant = "lockup" | "mark";

/**
 * The official MorePower2You lockup (MP ribbon monogram + wordmark + tagline).
 * Rendered from the supplied brand PNG so it always matches print collateral.
 */
export function BrandMark({ locale, variant = "lockup", className, priority = true }: { locale: Locale; variant?: BrandVariant; className?: string; priority?: boolean }) {
  return (
    <Link href={withLocale(locale, "/")} className={cn("brand-lockup", className)} aria-label="MorePower2You home">
      {variant === "mark" ? (
        <Image className="brand-mark-image" src="/brand/mp-mark.png" alt="" aria-hidden="true" width={512} height={512} priority={priority} />
      ) : (
        <Image
          className="brand-logo-image"
          src="/brand/logo-lockup-1200.png"
          alt=""
          aria-hidden="true"
          width={1200}
          height={235}
          priority={priority}
          sizes="(max-width: 640px) 240px, 340px"
        />
      )}
      <span className="sr-only">MorePower2You - {ui[locale].brandTagline}</span>
    </Link>
  );
}
