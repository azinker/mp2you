import { InsightsIndex } from "@/components/templates";
import { getSiteContent } from "@/lib/content";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor("he", "/insights", {
  title: "מאמרים על מתנות ארגוניות | MorePower2You",
  description: "מאמרים על אסטרטגיית מתנות, מתנות VIP לגיימינג, חגים, קופסאות ממותגות ולוגיסטיקה.",
  keywords: ["מאמרים מתנות ארגוניות", "מתנות VIP", "לוגיסטיקת מתנות"],
});

export default async function Page() {
  const site = await getSiteContent("he");

  return <InsightsIndex site={site} />;
}
