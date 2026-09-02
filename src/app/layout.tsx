import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Serif_Display,
  Heebo,
  Inter,
  Noto_Sans_Arabic,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
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

const v2Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-v2-sans",
  display: "swap",
});

const v2Serif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-v2-serif",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.morepower2you.com"),
  title: {
    default: "MorePower2You",
    template: "%s",
  },
  applicationName: "MorePower2You",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} ${hebrew.variable} ${arabic.variable} ${v2Sans.variable} ${v2Serif.variable}`}
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
