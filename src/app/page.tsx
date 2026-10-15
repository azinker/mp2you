import type { Metadata } from "next";
import { HomePage } from "@/components/templates";
import { SchemaScript } from "@/components/schema-script";
import { getSiteContent } from "@/lib/content";
import { homeSchemas, metadataFor } from "@/lib/seo";

const locale = "en";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent(locale);
  return metadataFor(locale, "/", site.home.seo);
}

export default async function Page() {
  const site = await getSiteContent(locale);

  return (
    <>
      <SchemaScript data={homeSchemas(locale)} />
      <HomePage site={site} />
    </>
  );
}
