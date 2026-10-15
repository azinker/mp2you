"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Reveal,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "../_shared/motion";
import {
  finalCta,
  gaming,
  img,
  processFour,
  testimonials,
} from "../_shared/content";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="pointer-events-auto mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 text-[#efe6d6]">
          <a href="#top" className="display text-[17px] tracking-[0.04em]">
            MorePower2You
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 items-center gap-3 text-[11px] uppercase tracking-[0.28em]"
            aria-label="Open menu"
          >
            Menu
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className="block h-px w-7 bg-current" />
              <span className="block h-px w-5 bg-[var(--c4-blood)]" />
            </span>
          </button>
        </div>
      </header>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] bg-[var(--c4-ink)] px-8 pt-7 text-[var(--c4-paper)]"
        >
          <div className="flex items-center justify-between">
            <span className="display text-[17px]">MorePower2You</span>
            <button type="button" onClick={() => setOpen(false)} className="text-3xl leading-none" aria-label="Close menu">
              ×
            </button>
          </div>
          <nav className="mt-20 flex flex-col gap-7" aria-label="Concept navigation">
            {[
              { label: "The work", href: "#river" },
              { label: "How it unfolds", href: "#letter" },
              { label: "Begin", href: "#begin" },
            ].map((a) => (
              <a
                key={a.href}
                href={a.href}
                onClick={() => setOpen(false)}
                className="display-italic text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95]"
              >
                {a.label}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
}

function UnfurlHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.55 });

  const frameW = useTransform(progress, [0, 0.62], ["min(38vw, 280px)", "100vw"]);
  const frameH = useTransform(progress, [0, 0.62], ["56vh", "100vh"]);
  const radius = useTransform(progress, [0, 0.62], [120, 0]);
  const imgScale = useTransform(progress, [0, 0.62], [1.45, 1]);
  const typeY = useTransform(progress, [0, 0.55], [0, -70]);
  const typeColor = useTransform(progress, [0.18, 0.48], ["#1a130f", "#efe6d6"]);
  const typeOpacity = useTransform(progress, [0, 0.5, 0.78], [1, 1, 0]);
  const veil = useTransform(progress, [0.35, 0.7], [0, 0.38]);
  const afterOpacity = useTransform(progress, [0.58, 0.78], [0, 1]);
  const afterY = useTransform(progress, [0.58, 0.78], [28, 0]);

  return (
    <section id="top" ref={ref} className="relative" style={{ height: reduced ? "100vh" : "280vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--c4-paper)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={
              reduced
                ? { width: "100vw", height: "100vh", borderRadius: 0 }
                : { width: frameW, height: frameH, borderRadius: radius }
            }
            className="relative overflow-hidden"
          >
            <motion.div style={reduced ? undefined : { scale: imgScale }} className="absolute inset-0">
              <Image
                src={img.navyBox.src}
                alt={img.navyBox.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            {!reduced && <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-[var(--c4-night)]" />}
          </motion.div>
        </div>

        <motion.div
          style={reduced ? undefined : { y: typeY, color: typeColor, opacity: typeOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.36em] text-[var(--c4-blood)]">
            MorePower2You
          </p>
          <h1 className="display-italic max-w-5xl text-[clamp(3.4rem,11vw,9.2rem)] leading-[0.9]">
            The gift
            <br />
            is the feeling.
          </h1>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { opacity: afterOpacity, y: afterY }}
          className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pb-14 text-center text-[var(--c4-paper)]"
        >
          <p className="max-w-xl text-[15px] leading-relaxed text-[var(--c4-paper)]/80">
            Premium gifting experiences, handled from idea to doorstep — sourcing, packaging,
            warehousing, fulfillment, and support under one roof.
          </p>
          <a href="#begin" className="btn a-paper mt-7 px-8 py-3.5 text-[12px] uppercase tracking-[0.2em]">
            Begin a project
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Weave() {
  return (
    <section className="relative overflow-hidden px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="max-w-3xl text-[clamp(1.8rem,4.2vw,3.4rem)] leading-[1.15]">
            We design the moment someone opens a box.{" "}
            <span className="display-italic text-[var(--c4-blood)]">Then we deliver that moment</span> to
            five thousand doorsteps — or fifty — without losing the feeling.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-20 h-[110vh] max-w-[1400px] lg:h-[130vh]">
        <Reveal className="absolute left-0 top-0 w-[68%] max-w-[720px] sm:w-[52%]">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image src={img.wineBox.src} alt={img.wineBox.alt} fill sizes="60vw" className="object-cover" />
          </div>
          <p className="display-italic mt-4 text-[15px] text-[var(--c4-muted)]">Presentation kits, engraved glassware</p>
        </Reveal>

        <Reveal delay={0.15} className="absolute right-0 top-[18%] w-[74%] max-w-[640px] sm:top-[8%] sm:w-[46%]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={img.planning.src} alt={img.planning.alt} fill sizes="50vw" className="object-cover" />
          </div>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[var(--c4-muted)]">
            Concept, sourcing, branded packaging, storage, assembly, and mailing — national and
            international.
          </p>
        </Reveal>

        <Reveal delay={0.25} className="absolute bottom-[4%] left-[8%] w-[80%] max-w-[540px] sm:left-[28%] sm:w-[38%]">
          <div className="relative aspect-[5/4] overflow-hidden">
            <Image src={img.wineCrates.src} alt={img.wineCrates.alt} fill sizes="45vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const river = [
  { image: img.navyBox, note: "Executive appreciation" },
  { image: img.explosion, note: "Surprise, then delight" },
  { image: img.gaming, note: "VIP player milestones" },
  { image: img.wooden, note: "Artisanal crate programs" },
  { image: img.fulfillment, note: "The quiet floor behind it" },
  { image: img.birthday, note: "Occasion, considered" },
];

function River() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-72%"]);

  if (reduced) {
    return (
      <section id="river" className="px-6 py-24">
        <div className="flex gap-8 overflow-x-auto pb-4">
          {river.map((g) => (
            <figure key={g.note} className="w-[78vw] shrink-0 sm:w-[360px]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={g.image.src} alt={g.image.alt} fill sizes="360px" className="object-cover" />
              </div>
              <figcaption className="display-italic mt-3 text-[15px]">{g.note}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="river" ref={ref} className="relative bg-[var(--c4-night)]" style={{ height: "340vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <p className="mb-10 px-6 text-[11px] uppercase tracking-[0.34em] text-[var(--c4-blush)]">
          Keep scrolling — the work moves with you
        </p>
        <motion.div style={{ x }} className="flex w-max items-end gap-10 pl-6">
          {river.map((g, i) => (
            <figure key={g.note} className={i % 2 === 0 ? "mb-16" : "mb-0"}>
              <div
                className={`relative overflow-hidden ${
                  i % 3 === 0 ? "h-[58vh] w-[42vw] min-w-[240px]" : "h-[46vh] w-[32vw] min-w-[210px]"
                }`}
              >
                <Image src={g.image.src} alt={g.image.alt} fill sizes="42vw" className="object-cover" />
              </div>
              <figcaption className="display-italic mt-4 text-[16px] text-[var(--c4-paper)]">{g.note}</figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Letter() {
  return (
    <section id="letter" className="bg-[var(--c4-paper)] px-6 py-32 lg:py-44">
      <div className="mx-auto grid max-w-[1100px] gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--c4-blood)]">How a project unfolds</p>
            <p className="display-italic mt-6 text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02]">
              Not a funnel.
              <br />
              A sequence of care.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden">
              <Image src={img.fulfillment.src} alt={img.fulfillment.alt} fill sizes="440px" className="object-cover" />
            </div>
          </Reveal>
        </div>
        <div className="space-y-16 pt-4">
          {processFour.map((step, i) => (
            <Reveal key={step.stage} delay={i * 0.06}>
              <p className="display-italic text-[var(--c4-blood)] text-[1.7rem]">{step.stage}</p>
              <h2 className="display mt-2 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1]">{step.title}</h2>
              <p className="mt-4 max-w-md text-[16px] leading-[1.7] text-[var(--c4-muted)]">{step.text}</p>
            </Reveal>
          ))}
          <Reveal>
            <p className="max-w-md text-[16px] leading-[1.7] text-[var(--c4-muted)]">
              {gaming.text}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Voice() {
  const t = testimonials[0];
  return (
    <section className="bg-[var(--c4-ink)] px-6 py-32 text-[var(--c4-paper)] lg:py-44">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <p className="display-italic text-[clamp(1.8rem,4.4vw,3.5rem)] leading-[1.25]">
            {t.quote}
          </p>
          <p className="mt-10 text-[11px] uppercase tracking-[0.28em] text-[var(--c4-blush)]">
            {t.name} — {t.context}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="display-italic mt-24 text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.3] text-[var(--c4-paper)]/70">
            {testimonials[1].quote}
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[var(--c4-blush)]">
            {testimonials[1].name} — {testimonials[1].context}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Begin() {
  return (
    <section id="begin" className="relative min-h-[92vh] overflow-hidden">
      <Image src={img.planning.src} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[var(--c4-night)]/55" />
      <div className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-28 text-center text-[var(--c4-paper)]">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--c4-blush)]">Next</p>
          <h2 className="display-italic mx-auto mt-6 max-w-4xl text-[clamp(2.8rem,8vw,6.4rem)] leading-[0.92]">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-[15px] leading-relaxed text-[var(--c4-paper)]/75">
            {finalCta.text}
          </p>
          <span className="btn a-paper mt-10 cursor-pointer px-10 py-4 text-[12px] uppercase tracking-[0.2em]">
            {finalCta.primaryCta.label}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </span>
        </Reveal>
      </div>
    </section>
  );
}

export function ConceptFour() {
  return (
    <div className="c4 min-h-screen">
      <Header />
      <main>
        <UnfurlHero />
        <Weave />
        <River />
        <Letter />
        <Voice />
        <Begin />
      </main>
    </div>
  );
}
