import type { Metadata, Viewport } from "next";
import { Fraunces, Heebo, Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { HtmlLang } from "@/components/html-lang";
import { SiteChrome } from "@/components/site-chrome";
import { defaultRobots } from "@/lib/seo";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Fraunces: a warm, soft "wonky" display serif. Variable weight plus the
// SOFT and optical-size axes so large headlines render rounder and friendlier.
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const hebrew = Heebo({
  subsets: ["hebrew"],
  variable: "--font-hebrew",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["Noto Sans Hebrew", "Arial", "sans-serif"],
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["Noto Sans Arabic", "Arial", "sans-serif"],
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

// Site-wide defaults. Every public page overrides title/description/canonical/
// hreflang/OpenGraph via metadataFor(); robots, icons, manifest, and the
// verification tags are inherited from here.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.morepower2you.com"),
  title: {
    default: "Corporate Gifting Company & Concierge | MorePower2You",
    template: "%s",
  },
  description:
    "Turnkey corporate gifting company: custom branded gift boxes, client and VIP gifts, concierge sourcing, warehousing, and fulfillment handled end to end.",
  applicationName: "MorePower2You",
  creator: "MorePower2You",
  publisher: "MorePower2You",
  category: "business",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  robots: defaultRobots,
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "MorePower2You",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "MorePower2You corporate gifting concierge" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification:
    googleVerification || bingVerification
      ? {
          google: googleVerification || undefined,
          other: bingVerification ? { "msvalidate.01": bingVerification } : undefined,
        }
      : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0b3da7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${serif.variable} ${sans.variable} ${hebrew.variable} ${arabic.variable}`}>
      <body>
        <HtmlLang />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
