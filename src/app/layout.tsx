import type { Metadata, Viewport } from "next";
import { Fraunces, Heebo, Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { HtmlLang } from "@/components/html-lang";
import { MetaPixel } from "@/components/meta-pixel";
import { META_PIXEL_ID } from "@/lib/meta-pixel";
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
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`!function(){var p=location.pathname;if(p==="/inventory"||p.indexOf("/inventory/")===0||p==="/studio"||p.indexOf("/studio/")===0||p==="/design-lab"||p.indexOf("/design-lab/")===0)return;!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${META_PIXEL_ID}");fbq("track","PageView")}();`}
        </Script>
        <HtmlLang />
        <MetaPixel />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
