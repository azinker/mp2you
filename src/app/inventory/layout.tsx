import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Portal | MorePower2You",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
