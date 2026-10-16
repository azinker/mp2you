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
export function BrandMark({
  locale,
  variant = "lockup",
  className,
  priority = true,
  animate = false,
}: {
  locale: Locale;
  variant?: BrandVariant;
  className?: string;
  priority?: boolean;
  /** Header only: the MP flies in and pops once on load. */
  animate?: boolean;
}) {
  return (
    <Link href={withLocale(locale, "/")} className={cn("brand-lockup", className)} aria-label="MorePower2You home">
      {variant === "mark" ? (
        <Image className="brand-mark-image" src="/brand/mp-mark.png" alt="" aria-hidden="true" width={512} height={512} priority={priority} />
      ) : (
        <span className={cn("brand-logo", animate && "is-animated")}>
          <span className="brand-logo-mark">
            <span className="brand-logo-mark-fly">
              <Image
                className="brand-logo-mark-image"
                src="/brand/logo-mark-slice.png"
                alt=""
                aria-hidden="true"
                width={292}
                height={235}
                priority={priority}
                style={{ width: "100%", height: "auto" }}
              />
              <span className="brand-pop" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
          </span>
          <span className="brand-logo-word">
            <Image
              src="/brand/logo-word-slice.png"
              alt=""
              aria-hidden="true"
              width={908}
              height={235}
              priority={priority}
              style={{ width: "100%", height: "auto" }}
            />
          </span>
        </span>
      )}
      <span className="sr-only">MorePower2You - {ui[locale].brandTagline}</span>
    </Link>
  );
}
