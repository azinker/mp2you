"use client";

import NextLink, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type VersionedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

export function VersionedLink({ href, children, ...props }: VersionedLinkProps) {
  const pathname = usePathname() || "/";
  return (
    <NextLink href={versionHref(href, pathname)} {...props}>
      {children}
    </NextLink>
  );
}

function versionHref(href: LinkProps["href"], pathname: string): LinkProps["href"] {
  if (typeof href !== "string") return href;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return href;
  }

  const inEnglishV2 = pathname === "/v2" || pathname.startsWith("/v2/");
  const inHebrewV2 = pathname === "/he/v2" || pathname.startsWith("/he/v2/");
  const inEnglishV3 = pathname === "/v3" || pathname.startsWith("/v3/");
  const inHebrewV3 = pathname === "/he/v3" || pathname.startsWith("/he/v3/");

  if (!inEnglishV2 && !inHebrewV2 && !inEnglishV3 && !inHebrewV3) return href;
  if (
    href === "/v2" ||
    href.startsWith("/v2/") ||
    href === "/v3" ||
    href.startsWith("/v3/") ||
    href === "/he/v2" ||
    href.startsWith("/he/v2/") ||
    href === "/he/v3" ||
    href.startsWith("/he/v3/")
  ) {
    return href;
  }

  if (inHebrewV3) {
    if (href === "/" || href === "/he") return "/he/v3";
    if (href.startsWith("/he/")) return `/he/v3${href.slice(3)}`;
    if (href.startsWith("/")) return `/he/v3${href}`;
  }

  if (inEnglishV3) {
    if (href === "/") return "/v3";
    if (href === "/he") return "/he/v3";
    if (href.startsWith("/he/")) return `/he/v3${href.slice(3)}`;
    if (href.startsWith("/")) return `/v3${href}`;
  }

  if (inHebrewV2) {
    if (href === "/" || href === "/he") return "/he/v2";
    if (href.startsWith("/he/")) return `/he/v2${href.slice(3)}`;
    if (href.startsWith("/")) return `/he/v2${href}`;
  }

  if (href === "/") return "/v2";
  if (href === "/he") return "/he/v2";
  if (href.startsWith("/he/")) return `/he/v2${href.slice(3)}`;
  if (href.startsWith("/")) return `/v2${href}`;

  return href;
}
