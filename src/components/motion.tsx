"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const ParallaxContext = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null);

/**
 * Hydration-safe reduced-motion check. The server (and the first client
 * render) always produce the animated markup; the OS preference is only
 * honoured after mount so server and client HTML never diverge.
 */
function useReducedMotionSafe() {
  const reduced = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  return mounted ? Boolean(reduced) : false;
}

function subscribeNoop() {
  return () => {};
}

/**
 * MorePower2You motion system.
 * One easing language: a long, premium ease-out for reveals, soft springs for
 * interactive pieces, and gentle idle motion for decorative elements.
 * Every primitive degrades to static markup under prefers-reduced-motion.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  amount?: number;
  as?: "div" | "section" | "article" | "li" | "span";
};

/** Fade + rise when the element scrolls into view. */
export function Reveal({ children, delay = 0, y = 26, duration = 0.7, className, amount = 0.25, as = "div" }: RevealProps) {
  const reduced = useReducedMotionSafe();
  const Tag = motion[as];
  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers its StaggerItem children as a group. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0.05,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  const reduced = useReducedMotionSafe();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const reduced = useReducedMotionSafe();
  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word masked reveal for display headlines.
 * `accentLast` wraps the final N words in a marker highlight.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  as: Tag = "span",
  accentLast = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  accentLast?: number;
}) {
  const reduced = useReducedMotionSafe();
  const allWords = text.trim().split(/\s+/);
  const accentCount = Math.min(Math.max(accentLast, 0), allWords.length);
  const plainWords = allWords.slice(0, allWords.length - accentCount);
  const accentText = allWords.slice(allWords.length - accentCount).join("\u00A0");
  // Chunks: each plain word on its own, then the accent words as ONE unit so
  // they can never be split across lines (which made the old marker look
  // half-highlighted).
  const chunks: { text: string; accent: boolean }[] = plainWords.map((w) => ({ text: w, accent: false }));
  if (accentCount > 0) chunks.push({ text: accentText, accent: true });
  const lineDelay = delay + stagger * chunks.length + 0.55;

  const renderChunk = (chunk: { text: string; accent: boolean }, animated: boolean) => {
    if (!chunk.accent) return chunk.text;
    return (
      <span className="accent-word">
        <span className="accent-word-text">{chunk.text}</span>
        <svg className="accent-word-line" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true">
          {animated ? (
            <>
              <motion.path
                d="M4 15 C 36 4, 66 22, 100 12 S 164 3, 196 13"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ pathLength: { duration: 0.9, ease: EASE, delay: lineDelay }, opacity: { duration: 0.2, delay: lineDelay } }}
              />
              <motion.path
                d="M8 20 C 44 10, 70 24, 104 17 S 160 9, 192 19"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ pathLength: { duration: 0.8, ease: EASE, delay: lineDelay + 0.25 }, opacity: { duration: 0.2, delay: lineDelay + 0.25 } }}
              />
            </>
          ) : (
            <>
              <path d="M4 15 C 36 4, 66 22, 100 12 S 164 3, 196 13" />
              <path d="M8 20 C 44 10, 70 24, 104 17 S 160 9, 192 19" />
            </>
          )}
        </svg>
      </span>
    );
  };

  if (reduced) {
    return (
      <Tag className={className}>
        {chunks.map((chunk, i) => (
          <span key={`${chunk.text}-${i}`}>
            {renderChunk(chunk, false)}
            {i < chunks.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {chunks.map((chunk, i) => (
          <span
            key={`${chunk.text}-${i}`}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              paddingBottom: chunk.accent ? "0.32em" : "0.12em",
              marginBottom: chunk.accent ? "-0.32em" : "-0.12em",
            }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: { y: 0, opacity: 1, transition: { duration: 0.85, ease: EASE } },
              }}
            >
              {renderChunk(chunk, true)}
              {i < chunks.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Animated number for statistics. Accepts strings such as "5,000+". */
export function Counter({ value, className, duration = 1.6 }: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotionSafe();
  // Server and first client render always show the real value; the count-up
  // only starts once the element scrolls into view on the client.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced || !inView) return;
    const match = value.match(/[\d,]+/);
    if (!match || match.index === undefined) return;
    const target = parseInt(match[0].replace(/,/g, ""), 10);
    if (!Number.isFinite(target) || target === 0) return;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[0].length);
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/** Pointer-driven 3D tilt for cards. Subtle by default. */
export function Tilt({ children, className, max = 6, style }: { children: ReactNode; className?: string; max?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.6 });

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Horizontal line that draws itself as the parent section scrolls into view. */
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 80, damping: 24 });
  if (reduced) return <div ref={ref} className={className} />;
  return <motion.div ref={ref} className={className} style={{ scaleX }} />;
}

/** Scroll-linked parallax wrapper. */
export function Parallax({ children, className, distance = 40 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/** Soft, continuous marquee. Content is duplicated for a seamless loop. */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className ? `marquee-band ${className}` : "marquee-band"} aria-hidden="false">
      <div className="marquee-track">
        <div className="flex">{children}</div>
        <div className="flex" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

type PetalSpec = { x: string; y: string; size: number; color: string; rot: number; dur: number; delay: number };

const defaultPetals: PetalSpec[] = [
  { x: "2%", y: "30%", size: 40, color: "var(--coral)", rot: -20, dur: 9, delay: 0 },
  { x: "90%", y: "6%", size: 34, color: "var(--lavender)", rot: 30, dur: 11, delay: -3 },
  { x: "95%", y: "64%", size: 40, color: "var(--gold)", rot: 10, dur: 10, delay: -5 },
  { x: "1%", y: "84%", size: 30, color: "var(--teal)", rot: 60, dur: 12, delay: -2 },
  { x: "46%", y: "94%", size: 24, color: "var(--coral)", rot: 100, dur: 13, delay: -7 },
];

/** Decorative ribbon petals lifted from the logo's bow. Purely visual. */
export function Petals({ items = defaultPetals, opacity = 0.9 }: { items?: PetalSpec[]; opacity?: number }) {
  return (
    <>
      {items.map((p, i) => (
        <span
          key={i}
          className="petal"
          aria-hidden="true"
          style={
            {
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              opacity,
              "--rot": `${p.rot}deg`,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
            } as CSSProperties
          }
        >
          <PetalSvg color={p.color} />
        </span>
      ))}
    </>
  );
}

export function PetalSvg({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" className={className} aria-hidden="true">
      <path
        d="M32 60C32 60 8 42 8 24C8 14 15 6 24 6C28.5 6 32 9 32 9C32 9 35.5 6 40 6C49 6 56 14 56 24C56 42 32 60 32 60Z"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A small cluster of petals arranged like the logo bow, for page heroes. */
export function BowArt({ className }: { className?: string }) {
  const reduced = useReducedMotionSafe();
  const petals = [
    { color: "var(--coral)", rot: -42, x: 150, y: 150, s: 1.1 },
    { color: "var(--gold)", rot: -8, x: 215, y: 120, s: 0.7 },
    { color: "var(--lavender)", rot: 34, x: 268, y: 150, s: 1 },
    { color: "var(--teal)", rot: 110, x: 300, y: 230, s: 0.8 },
    { color: "var(--blue)", rot: -120, x: 120, y: 240, s: 0.75 },
  ];
  return (
    <svg viewBox="0 0 420 420" className={className} aria-hidden="true">
      {petals.map((p, i) => (
        <motion.g
          key={i}
          style={{ transformOrigin: "210px 210px" }}
          animate={reduced ? undefined : { rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 10 + i * 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform={`translate(${p.x} ${p.y}) rotate(${p.rot}) scale(${p.s})`}>
            <path
              d="M0 70C0 70 -40 40 -40 10C-40 -8 -28 -22 -14 -22C-6 -22 0 -16 0 -16C0 -16 6 -22 14 -22C28 -22 40 -8 40 10C40 40 0 70 0 70Z"
              fill="none"
              stroke={p.color}
              strokeWidth="14"
              strokeLinejoin="round"
            />
          </g>
        </motion.g>
      ))}
      <circle cx="210" cy="212" r="12" fill="var(--gold)" />
    </svg>
  );
}

/** Mouse-parallax container for the hero collage. Children receive depth via data-depth. */
export function ParallaxGroup({ children, className, strength = 14 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    function onMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const py = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      mx.set(px * strength);
      my.set(py * strength);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced, strength]);

  return (
    <div ref={ref} className={className}>
      <ParallaxContext.Provider value={{ x: sx, y: sy }}>{children}</ParallaxContext.Provider>
    </div>
  );
}

export function ParallaxLayer({ children, depth = 1, className, style }: { children: ReactNode; depth?: number; className?: string; style?: CSSProperties }) {
  const ctx = useContext(ParallaxContext);
  const reduced = useReducedMotionSafe();
  const fallback = useMotionValue(0);
  const x = useTransform(ctx?.x ?? fallback, (v) => v * depth);
  const y = useTransform(ctx?.y ?? fallback, (v) => v * depth);
  if (reduced || !ctx) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  );
}

/** Entrance animation for hero content on first paint (not scroll-triggered). */
export function Enter({ children, delay = 0, className, y = 22 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduced = useReducedMotionSafe();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export { motion };
