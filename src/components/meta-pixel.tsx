"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

const privatePrefixes = ["/inventory", "/studio", "/design-lab"];

function pixelAllowed(pathname: string) {
  return !privatePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/**
 * The base pixel is injected from the root layout. This sends a PageView when
 * a visitor moves between public pages without a full reload.
 */
export function MetaPixel() {
  const pathname = usePathname() || "/";
  const allowed = pixelAllowed(pathname);
  const seenPath = useRef<string | null>(null);

  useEffect(() => {
    if (!allowed) return;
    if (seenPath.current === null) {
      seenPath.current = pathname;
      return;
    }
    if (seenPath.current === pathname) return;
    seenPath.current = pathname;
    window.fbq?.("track", "PageView");
  }, [allowed, pathname]);

  if (!allowed) return null;

  return (
    <noscript>
      <img alt="" height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} />
    </noscript>
  );
}
