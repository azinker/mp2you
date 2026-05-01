import { VersionedPage, type VersionedParams, versionedMetadata, versionedStaticParams } from "@/lib/versioned-page";

const locale = "he";

export function generateStaticParams() {
  return versionedStaticParams(locale);
}

export function generateMetadata(props: VersionedParams) {
  return versionedMetadata(locale, props);
}

export default function Page(props: VersionedParams) {
  return <VersionedPage locale={locale} {...props} />;
}
