"use client";

import { usePathname } from "next/navigation";
import { VersionedLink as Link } from "@/components/versioned-link";
import { alternatePath } from "@/lib/content";

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  return (
    <div className="language-switcher" aria-label="Language switcher">
      <Link href={alternatePath("en", pathname)} lang="en" data-track="language-en">
        EN
      </Link>
      <span aria-hidden="true" />
      <Link href={alternatePath("he", pathname)} lang="he" dir="rtl" data-track="language-he">
        HE
      </Link>
    </div>
  );
}
