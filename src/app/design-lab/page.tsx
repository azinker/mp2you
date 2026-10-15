import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "./_shared/content";
import { Reveal, SplitWords } from "./_shared/motion";

export const metadata: Metadata = {
  title: "Design Lab | MorePower2You",
  description: "Internal design exploration for the MorePower2You 2026 redesign.",
};

const concepts = [
  {
    n: "04",
    href: "/design-lab/concept-4",
    name: "Unfurl",
    image: img.navyBox,
    philosophy:
      "One continuous ribbon of scroll. A photograph starts as a slit inside the type and opens to fill the screen. Overlapping stills, a sideways river of work, a letter instead of process cards. Built to feel like a film, not a template.",
    traits: ["Instrument Serif italic", "Parchment + oxblood", "Scroll-unfurling hero", "No cards, no 3-column grids"],
  },
  {
    n: "01",
    href: "/design-lab/concept-1",
    name: "Editorial Luxury",
    image: img.navyBox,
    philosophy:
      "Premium editorial design: dramatic serif typography, generous whitespace, full-bleed photography, and restrained motion. Feels like a luxury publication produced the site.",
    traits: ["Fraunces serif display", "Warm porcelain + brass", "Masked line reveals, slow parallax", "Asymmetric editorial grid"],
  },
  {
    n: "02",
    href: "/design-lab/concept-2",
    name: "Kinetic Creative",
    image: img.planning,
    philosophy:
      "Elite creative-studio energy: bold kinetic type, scrolling marquees, interactive service rows, and confident color. Feels like an experiential agency that happens to run flawless logistics.",
    traits: ["Space Grotesk display", "Paper + vermilion + deep green", "Marquees, hover-driven rows, springs", "Sticky process storytelling"],
  },
  {
    n: "03",
    href: "/design-lab/concept-3",
    name: "Immersive Gifting",
    image: img.gaming,
    philosophy:
      "A cinematic scroll journey through the gifting experience: dark-to-light contrast, pinned sequences, layered depth, and a scroll-scrubbed gallery. The strongest first-impression wow.",
    traits: ["Sora display on midnight + gold", "Pinned four-stage journey", "Scroll-scrubbed horizontal gallery", "Layered cinematic imagery"],
  },
];

export default function DesignLabIndex() {
  return (
    <main className="lab-root">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c9a35c]">MorePower2You</p>
        </Reveal>
        <div className="display mt-5 max-w-3xl text-5xl leading-[1.04] sm:text-6xl">
          <SplitWords as="h1" text="2026 Digital Experience Concepts" />
        </div>
        <Reveal delay={0.35}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#b8b2a6]">
            Four homepage directions. Concept 04 is the new response to the first three feeling too
            templated — more fluid, more cinematic, less boxed. All use real MorePower2You content.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {concepts.map((c, i) => (
            <Reveal key={c.n} delay={0.1 + i * 0.12} className="h-full">
              <Link
                href={c.href}
                className="lab-card group flex h-full flex-col overflow-hidden rounded-lg border border-[#2a2822] bg-[#14120e]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="lab-card-img object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#0c0b09]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f4f0e8] backdrop-blur">
                    Concept {c.n}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="display text-2xl text-[#f4f0e8]">{c.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#b8b2a6]">{c.philosophy}</p>
                  <ul className="mt-5 space-y-1.5 text-xs text-[#8d877b]">
                    {c.traits.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span className="mt-[5px] block h-1 w-1 shrink-0 rounded-full bg-[#c9a35c]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-[#c9a35c]">
                    View Concept
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 overflow-hidden rounded-lg border border-[#2a2822]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#2a2822] bg-[#14120e] text-[11px] uppercase tracking-[0.18em] text-[#8d877b]">
                  <th className="px-5 py-4 font-semibold">Compare</th>
                  <th className="px-5 py-4 font-semibold">01 Editorial Luxury</th>
                  <th className="px-5 py-4 font-semibold">02 Kinetic Creative</th>
                  <th className="px-5 py-4 font-semibold">03 Immersive Gifting</th>
                </tr>
              </thead>
              <tbody className="text-[#b8b2a6]">
                {[
                  ["Personality", "Quiet luxury, editorial", "Creative studio energy", "Cinematic wow"],
                  ["Base", "Warm porcelain, light", "Paper white, high contrast", "Midnight navy, dark"],
                  ["Display type", "Fraunces serif", "Space Grotesk", "Sora"],
                  ["Accent", "Brass + champagne", "Vermilion + deep green", "Champagne gold"],
                  ["Motion", "Masked reveals, parallax", "Marquees, springs, hover rows", "Pinned scenes, scroll scrub"],
                  ["Best for", "Executive / luxury buyers", "Marketing + brand teams", "Maximum first impression"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-[#221f1a] last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-5 py-3.5 ${ci === 0 ? "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8d877b]" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-10 text-xs text-[#6d675c]">
          Internal design exploration. Not linked from the public site, and excluded from search indexing.
        </p>
      </div>
    </main>
  );
}
