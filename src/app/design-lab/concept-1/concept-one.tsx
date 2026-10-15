"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Counter,
  ImageZoomReveal,
  LineReveal,
  Parallax,
  Reveal,
  SplitWords,
  motion,
  staggerContainer,
  staggerItem,
  useScroll,
  useTransform,
} from "../_shared/motion";
import {
  finalCta,
  gaming,
  hero,
  img,
  industries,
  logistics,
  offerings,
  processSeven,
  proof,
  testimonials,
} from "../_shared/content";

const anchors = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(247,244,238,0)", "rgba(247,244,238,0.92)"]);
  const border = useTransform(scrollY, [0, 120], ["rgba(23,20,14,0)", "rgba(23,20,14,0.12)"]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg, borderColor: border, backdropFilter: "blur(10px)" }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-[var(--c1-brass)] text-[13px] font-semibold text-[var(--c1-brass)]">
              M
            </span>
            <span className="display text-lg tracking-tight">MorePower2You</span>
          </a>
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Concept navigation">
            {anchors.map((a) => (
              <a key={a.href} href={a.href} className="link-sweep a-nav text-[13px] tracking-[0.08em]">
                {a.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <div className="hidden lg:block">
              <a href="#contact" className="btn a-primary px-6 py-3 text-[13px] tracking-[0.06em]">
                Start a Project
              </a>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-label="Open menu"
            >
              <span className="block h-px w-6 bg-[var(--c1-ink)]" />
              <span className="block h-px w-6 bg-[var(--c1-ink)]" />
            </button>
          </div>
        </div>
      </motion.header>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--c1-bg)] px-8 pt-6"
        >
          <div className="flex items-center justify-between">
            <span className="display text-lg">MorePower2You</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-2xl leading-none">
              ×
            </button>
          </div>
          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mt-14 flex flex-col gap-7"
            aria-label="Mobile navigation"
          >
            {[...anchors, { label: "Start a Project", href: "#contact" }].map((a) => (
              <motion.a
                key={a.href + a.label}
                variants={staggerItem}
                href={a.href}
                onClick={() => setOpen(false)}
                className="display text-4xl"
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

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="mx-auto grid max-w-[1240px] items-end gap-14 px-6 pb-20 lg:grid-cols-12 lg:pb-28">
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <p className="eyebrow">{hero.eyebrow}</p>
          </Reveal>
          <div className="display mt-7 text-[clamp(2.6rem,5.6vw,4.9rem)] leading-[1.03]">
            <h1>
              <SplitWords text="Gifting handled" delay={0.1} />
              <br />
              <SplitWords text="from idea" delay={0.28} />
              <span className="text-[var(--c1-brass)]">
                <SplitWords text=" to doorstep." delay={0.42} />
              </span>
            </h1>
          </div>
          <Reveal delay={0.55} y={20}>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-[var(--c1-muted)]">{hero.text}</p>
          </Reveal>
          <Reveal delay={0.7} y={16}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="btn a-primary px-8 py-4 text-[13px] tracking-[0.06em]">
                {hero.primaryCta.label}
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#process" className="btn a-ghost px-8 py-4 text-[13px] tracking-[0.06em]">
                See How It Works
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.85} y={12}>
            <ul className="mt-14 flex flex-col gap-3 border-t border-[var(--c1-ink)]/12 pt-6 text-[12px] uppercase tracking-[0.2em] text-[var(--c1-muted)] sm:flex-row sm:gap-10">
              {["Select projects exceeding 5,000 gifts", "National + international reach", "Edibles to electronics"].map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-[var(--c1-brass)]" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <div className="absolute -left-8 top-10 hidden h-[85%] w-2/3 bg-[var(--c1-champagne)]/45 lg:block" aria-hidden="true" />
          <ImageZoomReveal className="relative aspect-[3/4] w-full">
            <Image
              src={img.wineBox.src}
              alt={img.wineBox.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </ImageZoomReveal>
          <Reveal delay={0.9} y={14}>
            <figcaption className="mt-4 flex items-baseline justify-between text-[12px] uppercase tracking-[0.18em] text-[var(--c1-muted)]">
              <span>Presentation kit, engraved glassware</span>
              <span className="text-[var(--c1-brass)]">MP2Y</span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="border-y border-[var(--c1-ink)]/12">
      <div className="mx-auto grid max-w-[1240px] gap-px px-6 sm:grid-cols-3">
        {proof.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.12} className="py-12 sm:px-8 sm:first:pl-0">
            <p className="display text-[clamp(1.7rem,2.6vw,2.5rem)] leading-tight">
              <Counter value={p.stat} />
            </p>
            <p className="mt-2 text-[12px] uppercase tracking-[0.22em] text-[var(--c1-brass)]">{p.label}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--c1-muted)]">{p.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Offerings() {
  return (
    <section id="services" className="mx-auto grid max-w-[1240px] gap-16 px-6 py-28 lg:grid-cols-12 lg:py-36">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-36">
          <Reveal>
            <p className="eyebrow">What MorePower2You does</p>
          </Reveal>
          <LineReveal delay={0.1}>
            <h2 className="display mt-6 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08]">
              Specialty gifting and concierge services under one roof.
            </h2>
          </LineReveal>
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-[var(--c1-muted)]">
              The work starts with a gifting goal and ends with a finished program people are happy to
              receive — concept, sourcing, branded packaging, storage, assembly, and mailing support for
              national and international destinations.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="lg:col-span-7">
        {offerings.map((o, i) => (
          <Reveal key={o.title} delay={i * 0.08} className="group border-t border-[var(--c1-ink)]/12 py-9 last:border-b">
            <div className="flex items-baseline gap-6 sm:gap-10">
              <span className="text-[13px] tracking-[0.2em] text-[var(--c1-brass)]">0{i + 1}</span>
              <div className="transition-transform duration-500 [transition-timing-function:var(--ease-premium)] group-hover:translate-x-3">
                <h3 className="display text-2xl sm:text-[1.9rem]">{o.title}</h3>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[var(--c1-muted)]">{o.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeatureCase() {
  return (
    <section className="relative">
      <Parallax speed={80} className="h-[70vh] min-h-[440px] w-full lg:h-[86vh]">
        <div className="relative h-[calc(100%+160px)] w-full -translate-y-20">
          <Image
            src={img.planning.src}
            alt={img.planning.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Parallax>
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal y={40} className="relative z-10 -mt-32 max-w-xl bg-[var(--c1-bg)] p-10 sm:p-12">
          <p className="eyebrow">Custom gift boxes</p>
          <h2 className="display mt-5 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1]">
            A branded unboxing experience without the operational lift.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[var(--c1-muted)]">
            From premium snacks and wellness items to electronics, printed pieces, apparel, and fully
            custom concepts — each box is built around the audience, occasion, and budgeted scope.
          </p>
          <a href="#contact" className="link-sweep a-accent mt-8 inline-block text-[13px] uppercase tracking-[0.2em]">
            Start a custom box
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="mx-auto max-w-[1240px] px-6 py-28 lg:py-36">
      <div className="max-w-2xl">
        <Reveal>
          <p className="eyebrow">Turnkey process</p>
        </Reveal>
        <LineReveal delay={0.1}>
          <h2 className="display mt-6 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08]">From idea to doorstep, in seven movements.</h2>
        </LineReveal>
      </div>
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2"
      >
        {processSeven.map((step, i) => (
          <motion.li key={step.title} variants={staggerItem} className="flex gap-7 border-t border-[var(--c1-ink)]/12 pt-6">
            <span className="display text-xl text-[var(--c1-brass)]">0{i + 1}</span>
            <div>
              <h3 className="display text-xl">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--c1-muted)]">{step.text}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

const galleryItems = [
  { image: img.navyBox, caption: "Executive appreciation kit" },
  { image: img.wineCrates, caption: "Event gifting, staged in volume" },
  { image: img.gaming, caption: "VIP player milestone drop" },
  { image: img.fulfillment, caption: "Fulfillment studio, mid-campaign" },
  { image: img.explosion, caption: "Surprise-and-delight reveal" },
  { image: img.wooden, caption: "Artisanal crate program" },
];

function Gallery() {
  return (
    <section id="gallery" className="overflow-hidden bg-[var(--c1-surface)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">Gallery</p>
            </Reveal>
            <LineReveal delay={0.08}>
              <h2 className="display mt-5 text-[clamp(1.9rem,3.2vw,2.9rem)]">The work, worth lingering over.</h2>
            </LineReveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--c1-muted)]">Scroll sideways →</p>
          </Reveal>
        </div>
      </div>
      <Reveal delay={0.15} y={40}>
        <div className="dl-noscrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:px-[max(1.5rem,calc((100vw-1240px)/2))]">
          {galleryItems.map((g) => (
            <figure key={g.caption} className="w-[78vw] shrink-0 snap-start sm:w-[420px]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={g.image.src}
                  alt={g.image.alt}
                  fill
                  sizes="(max-width: 640px) 78vw, 420px"
                  className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-premium)] hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 text-[12px] uppercase tracking-[0.18em] text-[var(--c1-muted)]">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Logistics() {
  return (
    <section className="bg-[var(--c1-dark)] py-28 text-[#efe9dc] lg:py-36">
      <div className="mx-auto grid max-w-[1240px] gap-16 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{logistics.eyebrow}</p>
          </Reveal>
          <LineReveal delay={0.1}>
            <h2 className="display mt-6 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08]">{logistics.title}</h2>
          </LineReveal>
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-[#b9b09c]">{logistics.text}</p>
          </Reveal>
        </div>
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid content-center gap-x-10 gap-y-5 sm:grid-cols-2 lg:col-span-6"
        >
          {logistics.capabilities.map((c) => (
            <motion.li key={c} variants={staggerItem} className="flex items-center gap-4 border-b border-[#efe9dc]/12 pb-4 text-[13px] uppercase tracking-[0.16em]">
              <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--c1-champagne)]" />
              {c}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div className="mx-auto mt-20 max-w-[1240px] px-6">
        <Parallax speed={50} className="h-[46vh] min-h-[320px] w-full">
          <div className="relative h-[calc(100%+120px)] w-full -translate-y-14">
            <Image src={img.fulfillment.src} alt={img.fulfillment.alt} fill sizes="100vw" className="object-cover" />
          </div>
        </Parallax>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-28 lg:py-36">
      <Reveal>
        <p className="eyebrow text-center">Who we serve</p>
      </Reveal>
      <div className="mt-10 text-center">
        {industries.map((name, i) => (
          <Reveal key={name} delay={i * 0.05} className="inline">
            <span className="display inline text-[clamp(1.5rem,3.4vw,2.8rem)] leading-[1.5] text-[var(--c1-ink)]/85 transition-colors duration-300 hover:text-[var(--c1-brass)]">
              {name}
            </span>
            {i < industries.length - 1 && (
              <span aria-hidden="true" className="display mx-4 inline text-[clamp(1.5rem,3.4vw,2.8rem)] text-[var(--c1-brass)]">
                ·
              </span>
            )}
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}>
        <p className="mx-auto mt-10 max-w-xl text-center text-[15px] leading-relaxed text-[var(--c1-muted)]">
          {gaming.text}
        </p>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-[var(--c1-ink)]/12 py-28 lg:py-36">
      <div className="mx-auto max-w-[1240px] space-y-24 px-6">
        {testimonials.map((t, i) => (
          <figure key={t.name} className={`max-w-3xl ${i % 2 === 1 ? "ml-auto text-right" : ""}`}>
            <Reveal>
              <span className="display block text-6xl leading-none text-[var(--c1-champagne)]" aria-hidden="true">
                &quot;
              </span>
            </Reveal>
            <LineReveal delay={0.1}>
              <blockquote className="display mt-2 text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.35]">{t.quote}</blockquote>
            </LineReveal>
            <Reveal delay={0.25}>
              <figcaption className="mt-6 text-[12px] uppercase tracking-[0.22em] text-[var(--c1-muted)]">
                {t.name} — <span className="text-[var(--c1-brass)]">{t.context}</span>
              </figcaption>
            </Reveal>
          </figure>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contact" className="bg-[var(--c1-surface)] py-32 lg:py-44">
      <div className="mx-auto max-w-[1240px] px-6 text-center">
        <Reveal>
          <p className="eyebrow">Next step</p>
        </Reveal>
        <h2 className="display mx-auto mt-7 max-w-3xl text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.05]">
          <SplitWords text={finalCta.title} />
        </h2>
        <Reveal delay={0.35}>
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-[var(--c1-muted)]">{finalCta.text}</p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <span className="btn cursor-pointer bg-[var(--c1-ink)] px-9 py-4 text-[13px] tracking-[0.06em] text-[var(--c1-bg)] hover:bg-[var(--c1-brass)]">
              {finalCta.primaryCta.label}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </span>
            <a href="#services" className="btn a-ghost px-9 py-4 text-[13px] tracking-[0.06em]">
              {finalCta.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--c1-ink)]/12 py-10">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-6 text-[12px] uppercase tracking-[0.18em] text-[var(--c1-muted)] sm:flex-row">
        <span className="display text-base normal-case tracking-tight text-[var(--c1-ink)]">MorePower2You</span>
        <span>National + international gifting, concierge, and fulfillment</span>
      </div>
    </footer>
  );
}

export function ConceptOne() {
  return (
    <div className="c1 min-h-screen">
      <Header />
      <main>
        <Hero />
        <StatsBand />
        <Offerings />
        <FeatureCase />
        <Process />
        <Gallery />
        <Logistics />
        <Industries />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
