import type { Metadata } from "next";
import { Fraunces, Instrument_Serif, Outfit, Space_Grotesk, Sora } from "next/font/google";
import "./design-lab.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Design Lab | MorePower2You",
    template: "%s | MP2Y Design Lab",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`dlab ${fraunces.variable} ${grotesk.variable} ${sora.variable} ${instrument.variable} ${outfit.variable}`}>
      {children}
    </div>
  );
}
