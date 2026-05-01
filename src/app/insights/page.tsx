import { InsightsIndex } from "@/components/templates";
import { getSiteContent } from "@/lib/content";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor("en", "/insights", {
  title: "Corporate Gifting Insights | MorePower2You",
  description: "Insights on corporate gifting strategy, VIP player gifting, holiday gifting, branded gift boxes, fulfillment, and concierge gifting.",
  keywords: ["corporate gifting blog", "VIP gifting insights", "gift fulfillment"],
});

export default async function Page() {
  const site = await getSiteContent("en");

  return <InsightsIndex site={site} />;
}
