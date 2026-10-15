"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Counter,
  LineReveal,
  Reveal,
  motion,
  staggerContainer,
  staggerItem,
  useReducedMotion,
} from "../_shared/motion";
import {
  finalCta,
  gaming,
  hero,
  img,
  industries,
  logistics,
  occasions,
  processFour,
  proof,
  testimonials,
} from "../_shared/content";

const anchors = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { title: "Corporate Gifting Campaigns", text: "Client appreciation, employee recognition, launch kits, event gifts, and seasonal programs.", image: img.wineCrates },
  { title: "Custom Branded Boxes", text: "Packaging, inserts, product mix, personalization, and branded presentation.", image: img.navyBox },
  { title: "Concierge Sourcing", text: "White-glove problem solving for specialty gifting and projects that do not fit a standard catalog.", image: img.planning },
  { title: "Fulfillment & Distribution", text: "Warehousing, kit assembly, mass mailings, and national or international shipment support.", image: img.fulfillment },
  { title: "Gaming & VIP Programs", text: "Milestone gifts, loyalty drops, and high-value player appreciation for gaming brands.", image: img.gaming },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--c2-ink)]/15 bg-[var(--c2-paper)]/94 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-[var(--c2-fire)] font-[family-name:var(--font-grotesk)] text-sm font-bold text-[var(--c2-cream)]">
              M2Y
            </span>
            <span className="font-[family-name:var(--font-grotesk)] text-[15px] font-bold tracking-tight">
              MorePower2You
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Concept navigation">
            {anchors.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="group relative overflow-hidden font-[family-name:var(--font-grotesk)] text-[13px] font-semibold uppercase tracking-[0.1em]"
              >
                <span className="block transition-transform duration-300 [transition-timing-function:var(--ease-premium)] group-hover:-translate-y-full">
                  {a.label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-full block text-[var(--c2-fire)] transition-transform duration-300 [transition-timing-function:var(--ease-premium)] group-hover:-translate-y-full"
                >
                  {a.label}
                </span>
              </a>
            ))}
            <a
              href="#contact"
              className="btn a-dark whitespace-nowrap rounded-full px-6 py-2.5 font-[family-name:var(--font-grotesk)] text-[13px] font-semibold uppercase tracking-[0.08em]"
            >
              Start a Project
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Open menu"
          >
            <span className="block h-[2px] w-6 bg-[var(--c2-ink)]" />
            <span className="block h-[2px] w-6 bg-[var(--c2-fire)]" />
          </button>
        </div>
      </header>

      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[60] bg-[var(--c2-ink)] px-8 pt-5 text-[var(--c2-cream)]">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-grotesk)] font-bold">MorePower2You</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-3xl leading-none">
              ×
            </button>
          </div>
          <motion.nav variants={staggerContainer} initial="hidden" animate="show" className="mt-16 flex flex-col gap-6" aria-label="Mobile navigation">
            {[...anchors, { label: "Start a Project", href: "#contact" }].map((a) => (
              <motion.a
                key={a.href + a.label}
                variants={staggerItem}
                href={a.href}
                onClick={() => setOpen(false)}
                className="display text-[2.6rem] uppercase leading-none"
              >
                {a.label}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </>
  );
}

function RotatingBadge() {
  return (
    <div className="dl-rotate relative h-28 w-28" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="c2-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-[var(--c2-ink)] font-[family-name:var(--font-grotesk)] text-[9.5px] font-semibold uppercase" letterSpacing="2.5">
          <textPath href="#c2-circle">From idea → to doorstep • MorePower2You •</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-2xl">🎁</span>
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  const lines = [
    { text: "GIFTING", chip: null },
    { text: "THAT MOVES", chip: img.navyBox },
    { text: "PEOPLE.", chip: null },
  ];
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="flex items-start justify-between gap-8">
          <h1 className="contents">
            <span className="display block text-[clamp(3rem,10.5vw,9.2rem)] uppercase leading-[0.94]">
            {lines.map((line, i) => (
              <span key={line.text} className="block overflow-hidden">
                <motion.span
                  className="flex flex-wrap items-center gap-x-5"
                  initial={reduced ? false : { y: "108%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.12 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line.text}
                  {line.chip && (
                    <span className="relative hidden h-[0.72em] w-[1.7em] overflow-hidden rounded-full sm:inline-block">
                      <Image src={line.chip.src} alt="" fill sizes="200px" className="object-cover" />
                    </span>
                  )}
                </motion.span>
              </span>
            ))}
            </span>
          </h1>
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 hidden shrink-0 lg:block"
          >
            <RotatingBadge />
          </motion.div>
        </div>

        <div className="mt-12 grid gap-10 pb-20 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.65} className="lg:col-span-6">
            <p className="max-w-xl text-[17px] leading-relaxed text-[var(--c2-muted)]">{hero.text}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="btn a-primary rounded-full px-8 py-4 font-[family-name:var(--font-grotesk)] text-[14px] font-bold uppercase tracking-[0.06em]">
                {hero.primaryCta.label}
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#work" className="btn a-ghost rounded-full px-8 py-4 font-[family-name:var(--font-grotesk)] text-[14px] font-bold uppercase tracking-[0.06em]">
                Explore Our Work
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.8} y={40} className="lg:col-span-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl lg:ml-auto lg:max-w-xl">
              <Image src={img.planning.src} alt={img.planning.alt} fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
              <span className="absolute bottom-4 left-4 rounded-full bg-[var(--c2-paper)]/90 px-4 py-1.5 font-[family-name:var(--font-grotesk)] text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur">
                Concept to campaign
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="dl-marquee -ml-[2%] w-[104%] -rotate-[1.6deg] bg-[var(--c2-fire)] py-3.5 text-[var(--c2-cream)]" style={{ "--dl-marquee-speed": "26s" } as React.CSSProperties}>
        <div className="dl-marquee-track">
          {[0, 1].map((n) => (
            <span key={n} className="flex items-center font-[family-name:var(--font-grotesk)] text-[15px] font-bold uppercase tracking-[0.12em]">
              {["Corporate gifting", "Custom branded boxes", "Concierge sourcing", "Warehousing + fulfillment", "VIP player programs", "Mass mailings", "National + international"].map((s) => (
                <span key={s} className="flex items-center">
                  <span className="px-6">{s}</span>
                  <span aria-hidden="true">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRows() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="services" className="mx-auto max-w-[1320px] px-6 py-24 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="eyebrow text-[var(--c2-fire)]">Services</p>
          </Reveal>
          <LineReveal delay={0.08}>
            <h2 className="display mt-4 max-w-2xl text-[clamp(2.2rem,4.6vw,4rem)] uppercase leading-[1.02]">
              One team. The whole gifting machine.
            </h2>
          </LineReveal>
        </div>
        <Reveal delay={0.2}>
          <p className="max-w-sm text-[15px] leading-relaxed text-[var(--c2-muted)]">
            Services combine into a fully managed project — creative execution and operational capability under one roof.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`group grid cursor-pointer items-center gap-4 border-t border-[var(--c2-ink)]/15 py-7 transition-colors duration-300 last:border-b sm:grid-cols-12 ${
                active === i ? "bg-[var(--c2-ink)] text-[var(--c2-cream)]" : ""
              }`}
            >
              <span className={`px-2 font-[family-name:var(--font-grotesk)] text-sm font-bold sm:col-span-1 ${active === i ? "text-[var(--c2-fire)]" : "text-[var(--c2-muted)]"}`}>
                0{i + 1}
              </span>
              <h3 className="display px-2 text-[clamp(1.4rem,3vw,2.4rem)] uppercase leading-tight sm:col-span-6">
                {s.title}
              </h3>
              <p className={`px-2 text-[14px] leading-relaxed sm:col-span-3 ${active === i ? "text-[var(--c2-cream)]/75" : "text-[var(--c2-muted)]"}`}>
                {s.text}
              </p>
              <div className="relative mx-2 hidden aspect-[4/3] overflow-hidden rounded-xl sm:col-span-2 sm:block">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="220px"
                  className={`object-cover transition-all duration-500 [transition-timing-function:var(--ease-premium)] ${
                    active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StickyProcess() {
  return (
    <section id="process" className="bg-[var(--c2-green)] py-24 text-[var(--c2-cream)] lg:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow text-[#8fc0a9]">How it works</p>
            </Reveal>
            <LineReveal delay={0.08}>
              <h2 className="display mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)] uppercase leading-[1.02]">
                Four moves. Zero chaos.
              </h2>
            </LineReveal>
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--c2-cream)]/70">
                Structured enough for 5,000-gift programs. Flexible enough for concierge-style problem
                solving. Every engagement is quoted and planned around scope.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <a href="#contact" className="btn a-cream mt-9 inline-flex rounded-full px-7 py-3.5 font-[family-name:var(--font-grotesk)] text-[13px] font-bold uppercase tracking-[0.08em]">
                Start the first move
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
        </div>
        <div className="space-y-10 lg:col-span-7">
          {processFour.map((p, i) => (
            <Reveal key={p.stage} delay={i * 0.05} y={44}>
              <div className="grid gap-0 overflow-hidden rounded-2xl bg-[#0f2c23] sm:grid-cols-2">
                <div className="relative aspect-[4/3] sm:aspect-auto">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
                </div>
                <div className="p-8">
                  <span className="font-[family-name:var(--font-grotesk)] text-sm font-bold text-[var(--c2-fire)]">0{i + 1}</span>
                  <h3 className="display mt-2 text-2xl uppercase">{p.stage}</h3>
                  <p className="mt-1 font-[family-name:var(--font-grotesk)] text-[13px] font-semibold uppercase tracking-[0.1em] text-[#8fc0a9]">
                    {p.title}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-[var(--c2-cream)]/70">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-[var(--c2-ink)]/15">
      <div className="mx-auto grid max-w-[1320px] px-6 sm:grid-cols-3">
        {proof.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.1} className={`py-14 sm:px-10 ${i > 0 ? "border-t sm:border-l sm:border-t-0" : ""} border-[var(--c2-ink)]/15 sm:first:pl-0`}>
            <p className="display text-[clamp(1.9rem,3.2vw,3rem)] uppercase leading-none">
              <Counter value={p.stat} />
            </p>
            <p className="mt-3 font-[family-name:var(--font-grotesk)] text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--c2-fire)]">
              {p.label}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--c2-muted)]">{p.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const galleryCards = [
  { image: img.navyBox, caption: "Executive kit", rotate: -2 },
  { image: img.explosion, caption: "Surprise drop", rotate: 1.5 },
  { image: img.wineCrates, caption: "Event program", rotate: -1 },
  { image: img.gaming, caption: "VIP player kit", rotate: 2 },
  { image: img.wooden, caption: "Artisanal crates", rotate: -1.5 },
  { image: img.fulfillment, caption: "Fulfillment floor", rotate: 1 },
];

function DragGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return (
    <section id="work" className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-6 px-6">
        <div>
          <Reveal>
            <p className="eyebrow text-[var(--c2-fire)]">The work</p>
          </Reveal>
          <LineReveal delay={0.08}>
            <h2 className="display mt-4 text-[clamp(2.2rem,4.6vw,4rem)] uppercase leading-[1.02]">Drag through the good stuff.</h2>
          </LineReveal>
        </div>
        <Reveal delay={0.2}>
          <p className="font-[family-name:var(--font-grotesk)] text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--c2-muted)]">
            ← Drag →
          </p>
        </Reveal>
      </div>
      <div ref={trackRef} className="mt-12 cursor-grab overflow-hidden px-6 active:cursor-grabbing">
        <motion.div
          drag={reduced ? false : "x"}
          dragConstraints={trackRef}
          className="flex w-max gap-7"
        >
          {galleryCards.map((g) => (
            <figure
              key={g.caption}
              className="w-[74vw] shrink-0 sm:w-[360px]"
              style={{ transform: `rotate(${g.rotate}deg)` }}
            >
              <div className="pointer-events-none relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={g.image.src} alt={g.image.alt} fill sizes="(max-width: 640px) 74vw, 360px" className="object-cover" />
              </div>
              <figcaption className="mt-3 font-[family-name:var(--font-grotesk)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--c2-muted)]">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GamingVip() {
  return (
    <section className="bg-[var(--c2-ink)] py-24 text-[var(--c2-cream)] lg:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow text-[var(--c2-fire)]">{gaming.eyebrow}</p>
          </Reveal>
          <LineReveal delay={0.08}>
            <h2 className="display mt-4 text-[clamp(2rem,4vw,3.4rem)] uppercase leading-[1.04]">{gaming.title}</h2>
          </LineReveal>
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--c2-cream)]/70">{gaming.text}</p>
          </Reveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {["Milestone gifts", "Status recognition", "Retention campaigns", "Surprise-and-delight drops", "Seasonal drops", "Loyalty recognition"].map((chip) => (
              <motion.span
                key={chip}
                variants={staggerItem}
                className="rounded-full border border-[var(--c2-cream)]/25 px-4 py-2 font-[family-name:var(--font-grotesk)] text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 hover:border-[var(--c2-fire)] hover:bg-[var(--c2-fire)]"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </div>
        <Reveal delay={0.2} y={40}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src={img.gaming.src} alt={img.gaming.alt} fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 py-24 lg:py-32">
      <Reveal>
        <p className="eyebrow text-[var(--c2-fire)]">Word on the street</p>
      </Reveal>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.15} y={40} className={i === 1 ? "lg:mt-16" : ""}>
            <figure className="rounded-2xl border-2 border-[var(--c2-ink)] p-9 transition-transform duration-300 [transition-timing-function:var(--ease-premium)] hover:-translate-y-2">
              <blockquote className="font-[family-name:var(--font-grotesk)] text-[clamp(1.1rem,1.7vw,1.35rem)] font-medium leading-[1.5]">
                &quot;{t.quote}&quot;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.12em]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--c2-fire)] text-[var(--c2-cream)]">
                  {t.name[0]}
                </span>
                {t.name}
                <span className="font-medium normal-case tracking-normal text-[var(--c2-muted)]">— {t.context}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-20 flex flex-wrap gap-3"
      >
        {industries.map((ind) => (
          <motion.span
            key={ind}
            variants={staggerItem}
            className="rounded-full bg-[var(--c2-ink)]/6 px-5 py-2.5 font-[family-name:var(--font-grotesk)] text-[13px] font-semibold text-[var(--c2-ink)]/80 transition-colors duration-200 hover:bg-[var(--c2-fire)] hover:text-[var(--c2-cream)]"
          >
            {ind}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contact" className="overflow-hidden border-t border-[var(--c2-ink)]/15 pb-10 pt-28 lg:pt-36">
      <div className="mx-auto max-w-[1320px] px-6 text-center">
        <LineReveal>
          <h2 className="display text-[clamp(2.6rem,7vw,6.4rem)] uppercase leading-[0.98]">
            Let&#39;s make something
          </h2>
        </LineReveal>
        <LineReveal delay={0.12}>
          <h2 className="display text-[clamp(2.6rem,7vw,6.4rem)] uppercase leading-[0.98]">
            <span className="text-[var(--c2-fire)]">worth opening.</span>
          </h2>
        </LineReveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-[var(--c2-muted)]">{finalCta.text}</p>
        </Reveal>
        <Reveal delay={0.45}>
          <span className="btn mt-10 inline-flex cursor-pointer rounded-full bg-[var(--c2-ink)] px-10 py-5 font-[family-name:var(--font-grotesk)] text-[15px] font-bold uppercase tracking-[0.08em] text-[var(--c2-cream)] hover:bg-[var(--c2-fire)]">
            {finalCta.primaryCta.label}
            <span className="btn-arrow" aria-hidden="true">→</span>
          </span>
        </Reveal>
      </div>

      <div className="dl-marquee mt-24 border-t border-[var(--c2-ink)]/15 py-5" style={{ "--dl-marquee-speed": "38s" } as React.CSSProperties}>
        <div className="dl-marquee-track dl-reverse">
          {[0, 1].map((n) => (
            <span key={n} className="flex items-center font-[family-name:var(--font-grotesk)] text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--c2-muted)]">
              {occasions.map((o) => (
                <span key={o} className="flex items-center">
                  <span className="px-5">{o}</span>
                  <span aria-hidden="true" className="text-[var(--c2-fire)]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center font-[family-name:var(--font-grotesk)] text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--c2-muted)]">
        MorePower2You — {logistics.eyebrow}
      </p>
    </section>
  );
}

export function ConceptTwo() {
  return (
    <div className="c2 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <ServiceRows />
        <StickyProcess />
        <DragGallery />
        <GamingVip />
        <Testimonials />
        <FinalCta />
      </main>
    </div>
  );
}
