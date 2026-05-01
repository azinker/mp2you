import type { Metadata } from "next";
import {
  Assistant,
  Cormorant_Garamond,
  DM_Serif_Display,
  Frank_Ruhl_Libre,
  Inter,
  Noto_Sans_Hebrew,
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

const hebrew = Noto_Sans_Hebrew({
  subsets: ["hebrew"],
  variable: "--font-hebrew",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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

const v2Hebrew = Assistant({
  subsets: ["hebrew"],
  variable: "--font-v2-hebrew",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const v2HebrewSerif = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  variable: "--font-v2-hebrew-serif",
  display: "swap",
  weight: ["500", "600", "700", "800"],
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
      className={`${serif.variable} ${sans.variable} ${hebrew.variable} ${v2Sans.variable} ${v2Serif.variable} ${v2Hebrew.variable} ${v2HebrewSerif.variable}`}
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
