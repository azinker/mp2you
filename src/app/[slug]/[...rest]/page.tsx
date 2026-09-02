import type { Metadata } from "next";
import {
  LocaleRestPage,
  localeRestMetadata,
  localizedStaticParams,
  requirePrefixedLocale,
} from "@/lib/localized-page";

type Params = { params: Promise<{ slug: string; rest: string[] }> };

export function generateStaticParams() {
  return localizedStaticParams();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, rest } = await params;
  const locale = requirePrefixedLocale(slug);
  return localeRestMetadata(locale, rest);
}

export default async function Page({ params }: Params) {
  const { slug, rest } = await params;
  const locale = requirePrefixedLocale(slug);
  return <LocaleRestPage locale={locale} rest={rest} />;
}
