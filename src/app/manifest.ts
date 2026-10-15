import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MorePower2You | Corporate Gifting Concierge",
    short_name: "MorePower2You",
    description:
      "Turnkey corporate gifting: custom branded gift boxes, client and VIP gifts, concierge sourcing, warehousing, and fulfillment handled end to end.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b3da7",
    lang: "en",
    categories: ["business", "shopping"],
    icons: [
      { src: "/brand/mp-mark-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/mp-mark.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/mp-mark.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
