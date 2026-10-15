"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Counter,
  ImageZoomReveal,
  LineReveal,
  Parallax,
  Reveal,
  motion,
  staggerContainer,
  staggerItem,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "../_shared/motion";
import type { MotionValue } from "motion/react";
import {
  finalCta,
  gaming,
  hero,
  img,
  industries,
  logistics,
  offerings,
  processFour,
  proof,
  testimonials,
} from "../_shared/content";

const anchors = [
  { label: "Journey", href: "#journey" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 160], ["rgba(10,13,19,0)", "rgba(10,13,19,0.88)"]);
  const border = useTransform(scrollY, [0, 160], ["rgba(216,184,122,0)", "rgba(216,184,122,0.18)"]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg, borderColor: border, backdropFilter: "blur(12px)" }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--c3-gold)]/60 text-[13px] font-semibold text-[var(--c3-gold)]">
              M
            </span>
            <span className="display text-[15px] tracking-[0.04em]">MOREPOWER2YOU</span>
          </a>
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Concept navigation">
            {anchors.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="a-nav text-[13px] tracking-[0.12em] transition-colors duration-200"
              >
                {a.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn a-goldline whitespace-nowrap px-6 py-2.5 text-[13px] tracking-[0.1em]"
            >
              Start a Project
            </a>
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            aria-label="Open menu"
          >
            <span className="block h-px w-6 bg-[var(--c3-porcelain)]" />
            <span className="block h-px w-6 bg-[var(--c3-gold)]" />
          </button>
        </div>
      </motion.header>

      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[60] bg-[var(--c3-night)] px-8 pt-6">
          <div className="flex items-center justify-between">
            <span className="display text-[15px]">MOREPOWER2YOU</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-3xl leading-none text-[var(--c3-porcelain)]">
              ×
            </button>
          </div>
          <motion.nav variants={staggerContainer} initial="hidden" animate="show" className="mt-16 flex flex-col gap-7" aria-label="Mobile navigation">
            {[...anchors, { label: "Start a Project", href: "#contact" }].map((a) => (
              <motion.a
                key={a.href + a.label}
                variants={staggerItem}
                href={a.href}
                onClick={() => setOpen(false)}
                className="display text-4xl text-[var(--c3-porcelain)]"
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
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, -110]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="dl-kenburns absolute inset-0">
          <Image src={img.navyBox.src} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--c3-night)]/70 via-[var(--c3-night)]/55 to-[var(--c3-night)]" />
      </div>

      <motion.div style={reduced ? undefined : { opacity: fade, y: rise }} className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          {hero.eyebrow}
        </motion.p>
        <div className="display mt-7 text-[clamp(2.6rem,6.2vw,5.4rem)] leading-[1.04]">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 34, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Gifting that feels personal.
            <br />
            <span className="text-[var(--c3-gold)]">Operations that scale.</span>
          </motion.h1>
        </div>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 max-w-2xl text-[16px] leading-relaxed text-[var(--c3-mist)]"
        >
          {hero.text}
        </motion.p>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#contact" className="btn a-gold px-8 py-4 text-[13px] font-semibold tracking-[0.08em]">
            {hero.primaryCta.label}
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
          <a href="#journey" className="btn a-ghost px-8 py-4 text-[13px] tracking-[0.08em]">
            Begin the Journey
          </a>
        </motion.div>
        <motion.ul
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-14 flex flex-col items-center justify-center gap-3 text-[11px] uppercase tracking-[0.26em] text-[var(--c3-mist)] sm:flex-row sm:gap-10"
        >
          {["Select projects exceeding 5,000 gifts", "National + international", "Edibles to electronics"].map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-[var(--c3-gold)]" />
              {p}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="h-14 w-px overflow-hidden bg-[var(--c3-porcelain)]/15">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1/2 w-full bg-[var(--c3-gold)]"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}

function JourneyStage({
  progress,
  index,
  total,
  stage,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  stage: (typeof processFour)[number];
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const opacity = useTransform(
    progress,
    index === 0
      ? [start, end - 0.06, end]
      : index === total - 1
        ? [start, start + 0.06, end]
        : [start, start + 0.06, end - 0.06, end],
    index === 0 ? [1, 1, 0] : index === total - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [start, end], [1.06, 1]);
  const y = useTransform(progress, [start, end], [26, -14]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 px-6 lg:grid-cols-2">
        <div>
          <p className="eyebrow">
            Stage 0{index + 1} — {stage.stage}
          </p>
          <h3 className="display mt-5 text-[clamp(1.9rem,3.8vw,3.3rem)] leading-[1.06]">{stage.title}</h3>
          <motion.p style={{ y }} className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--c3-mist)]">
            {stage.text}
          </motion.p>
        </div>
        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-md lg:block">
          <motion.div style={{ scale }} className="absolute inset-0">
            <Image src={stage.image.src} alt={stage.image.alt} fill sizes="600px" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--c3-night)]/45 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const lineScale = scrollYProgress;

  if (reduced) {
    return (
      <section id="journey" className="mx-auto max-w-[1280px] space-y-20 px-6 py-28">
        <p className="eyebrow">From idea to doorstep</p>
        {processFour.map((stage, i) => (
          <div key={stage.stage} className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Stage 0{i + 1} — {stage.stage}</p>
              <h3 className="display mt-5 text-3xl">{stage.title}</h3>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--c3-mist)]">{stage.text}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image src={stage.image.src} alt={stage.image.alt} fill sizes="600px" className="object-cover" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id="journey" ref={ref} className="relative" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-[1280px] px-6 pt-28">
          <Reveal>
            <p className="eyebrow">From idea to doorstep</p>
          </Reveal>
          <div className="mt-6 h-px w-full bg-[var(--c3-porcelain)]/12">
            <motion.div style={{ scaleX: lineScale }} className="h-full w-full origin-left bg-[var(--c3-gold)]" />
          </div>
        </div>
        <div className="relative flex-1">
          {processFour.map((stage, i) => (
            <JourneyStage key={stage.stage} progress={progress} index={i} total={processFour.length} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LightOfferings() {
  return (
    <section id="services" className="bg-[var(--c3-porcelain)] py-28 text-[#181510] lg:py-36">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#9a7a33]">What MorePower2You does</p>
        </Reveal>
        <LineReveal delay={0.1}>
          <h2 className="display mt-6 max-w-3xl text-[clamp(2.1rem,4.2vw,3.7rem)] leading-[1.06]">
            What&#39;s inside matters. So does everything around it.
          </h2>
        </LineReveal>

        <div className="mt-20 space-y-24">
          {offerings.slice(0, 3).map((o, i) => (
            <div key={o.title} className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <Reveal>
                  <span className="display text-5xl text-[#d9c194]">0{i + 1}</span>
                </Reveal>
                <LineReveal delay={0.08}>
                  <h3 className="display mt-4 text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.1]">{o.title}</h3>
                </LineReveal>
                <Reveal delay={0.2}>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#5f584b]">{o.text}</p>
                </Reveal>
                <Reveal delay={0.3}>
                  <a href="#contact" className="a-accent mt-7 inline-block text-[13px] uppercase tracking-[0.2em] transition-colors">
                    Start a conversation
                  </a>
                </Reveal>
              </div>
              <ImageZoomReveal className="relative aspect-[4/3] rounded-md">
                <Image
                  src={[img.wineCrates, img.navyBox, img.gaming][i].src}
                  alt={[img.wineCrates, img.navyBox, img.gaming][i].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="rounded-md object-cover"
                />
              </ImageZoomReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Infrastructure() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-44">
      <Parallax speed={90} className="absolute inset-0">
        <div className="relative h-[calc(100%+200px)] w-full -translate-y-24">
          <Image src={img.fulfillment.src} alt="" fill sizes="100vw" className="object-cover opacity-25" aria-hidden="true" />
        </div>
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--c3-night)] via-transparent to-[var(--c3-night)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-6">
        <Reveal>
          <p className="eyebrow">{logistics.eyebrow}</p>
        </Reveal>
        <LineReveal delay={0.1}>
          <h2 className="display mt-6 max-w-3xl text-[clamp(2.1rem,4.2vw,3.7rem)] leading-[1.06]">{logistics.title}</h2>
        </LineReveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--c3-mist)]">{logistics.text}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-[var(--c3-porcelain)]/12 pt-12 sm:grid-cols-3">
          {proof.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.12}>
              <p className="display text-[clamp(1.8rem,3vw,2.8rem)] leading-none text-[var(--c3-gold)]">
                <Counter value={p.stat} />
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-[var(--c3-mist)]">{p.label}</p>
            </Reveal>
          ))}
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {logistics.capabilities.map((c) => (
            <motion.li key={c} variants={staggerItem} className="flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[var(--c3-porcelain)]/80">
              <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--c3-gold)]" />
              {c}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

const galleryScenes = [
  { image: img.navyBox, label: "Executive appreciation" },
  { image: img.wineBox, label: "Presentation kits" },
  { image: img.wineCrates, label: "Event programs" },
  { image: img.gaming, label: "VIP player drops" },
  { image: img.planning, label: "Concierge planning" },
  { image: img.explosion, label: "Surprise reveals" },
];

function ScrubGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-64%"]);

  if (reduced) {
    return (
      <section id="gallery" className="py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className="eyebrow">Gallery</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {galleryScenes.map((g) => (
              <figure key={g.label}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image src={g.image.src} alt={g.image.alt} fill sizes="400px" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--c3-mist)]">{g.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" ref={ref} className="relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-10">
          <p className="eyebrow">Gallery</p>
          <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,3.1rem)]">Scroll. The work moves with you.</h2>
        </div>
        <motion.div style={{ x }} className="flex w-max gap-8 pl-6">
          {galleryScenes.map((g, i) => (
            <figure key={g.label} className={`shrink-0 ${i % 2 === 1 ? "mt-14" : ""}`}>
              <div className="relative h-[38vh] w-[62vw] overflow-hidden rounded-md sm:w-[34vw] lg:h-[46vh] lg:w-[30vw]">
                <Image src={g.image.src} alt={g.image.alt} fill sizes="40vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--c3-night)]/50 to-transparent" />
              </div>
              <figcaption className="mt-4 text-[11px] uppercase tracking-[0.26em] text-[var(--c3-mist)]">
                <span className="mr-3 text-[var(--c3-gold)]">0{i + 1}</span>
                {g.label}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GamingBand() {
  return (
    <section className="bg-[var(--c3-navy)] py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 lg:grid-cols-2">
        <ImageZoomReveal className="relative aspect-[4/3] rounded-md">
          <Image src={img.gaming.src} alt={img.gaming.alt} fill sizes="(max-width: 1024px) 100vw, 600px" className="rounded-md object-cover" />
        </ImageZoomReveal>
        <div>
          <Reveal>
            <p className="eyebrow">{gaming.eyebrow}</p>
          </Reveal>
          <LineReveal delay={0.1}>
            <h2 className="display mt-6 text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.08]">{gaming.title}</h2>
          </LineReveal>
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--c3-mist)]">{gaming.text}</p>
          </Reveal>
          <div className="mt-9 space-y-6">
            {gaming.points.map((pt, i) => (
              <Reveal key={pt.title} delay={0.3 + i * 0.12}>
                <div className="border-l border-[var(--c3-gold)]/50 pl-6">
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--c3-gold)]">{pt.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--c3-mist)]">{pt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1280px] space-y-24 px-6">
        <Reveal>
          <p className="eyebrow text-center">Testimonials</p>
        </Reveal>
        {testimonials.map((t) => (
          <figure key={t.name} className="mx-auto max-w-3xl text-center">
            <LineReveal>
              <blockquote className="display text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.4]">&quot;{t.quote}&quot;</blockquote>
            </LineReveal>
            <Reveal delay={0.2}>
              <figcaption className="mt-7 text-[11px] uppercase tracking-[0.28em] text-[var(--c3-mist)]">
                {t.name} · <span className="text-[var(--c3-gold)]">{t.context}</span>
              </figcaption>
            </Reveal>
          </figure>
        ))}
        <Reveal delay={0.1}>
          <p className="mx-auto max-w-3xl text-center text-[12px] uppercase leading-[2.4] tracking-[0.2em] text-[var(--c3-mist)]/70">
            {industries.join("  ·  ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contact" className="relative flex min-h-[88vh] items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Parallax speed={70} className="h-full">
          <div className="relative h-[calc(100%+160px)] w-full -translate-y-20">
            <Image src={img.planning.src} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--c3-night)] via-[var(--c3-night)]/60 to-[var(--c3-night)]" />
      </div>
      <div className="relative mx-auto max-w-[1280px] px-6 py-32 text-center">
        <Reveal>
          <p className="eyebrow">Next step</p>
        </Reveal>
        <LineReveal delay={0.1}>
          <h2 className="display mx-auto max-w-4xl text-[clamp(2.4rem,5.8vw,5rem)] leading-[1.04]">{finalCta.title}</h2>
        </LineReveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-[var(--c3-mist)]">{finalCta.text}</p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <span className="btn cursor-pointer bg-[var(--c3-gold)] px-10 py-4 text-[13px] font-semibold tracking-[0.08em] text-[var(--c3-night)] hover:shadow-[0_0_44px_rgba(216,184,122,0.45)]">
              {finalCta.primaryCta.label}
              <span className="btn-arrow" aria-hidden="true">→</span>
            </span>
            <a href="#services" className="btn a-ghost px-10 py-4 text-[13px] tracking-[0.08em]">
              {finalCta.secondaryCta.label}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.6}>
          <p className="mt-16 text-[11px] uppercase tracking-[0.26em] text-[var(--c3-mist)]/70">
            MorePower2You — national + international gifting, concierge, and fulfillment
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function ConceptThree() {
  return (
    <div className="c3 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Journey />
        <LightOfferings />
        <Infrastructure />
        <ScrubGallery />
        <GamingBand />
        <Testimonials />
        <FinalCta />
      </main>
    </div>
  );
}
