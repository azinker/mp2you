"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * Design Lab motion system.
 * One easing language everywhere: a long premium ease-out for reveals,
 * springs for interactive elements, and scroll-linked transforms for depth.
 */

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  fast: 0.22,
  medium: 0.55,
  slow: 0.95,
};

/** Fade + rise reveal when the element enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = DUR.medium,
  className,
  once = true,
  amount = 0.35,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line reveal — the child slides up from behind an overflow-hidden mask.
 * The viewport trigger lives on the unclipped wrapper (a clipped child never
 * intersects the viewport, so it can never trigger itself).
 */
export function LineReveal({
  children,
  delay = 0,
  duration = DUR.slow,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ overflow: "hidden" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        variants={{
          hidden: { y: "112%" },
          show: { y: 0, transition: { duration, delay, ease: EASE_PREMIUM } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Word-by-word masked reveal for display headlines. */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  if (reduced) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              variants={{
                hidden: { y: "115%" },
                show: { y: 0, transition: { duration: DUR.slow, ease: EASE_PREMIUM } },
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Scroll-linked vertical parallax. speed is the max offset in px. */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ y, height: "100%", width: "100%" }}>{children}</motion.div>
    </div>
  );
}

/** Image that scales down to rest as it enters the viewport (editorial mask feel). */
export function ImageZoomReveal({
  children,
  className,
  scale = 1.18,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ scale, opacity: 0.75 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.35, ease: EASE_PREMIUM }}
        style={{ height: "100%", width: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Animated counter for statistics. Accepts strings like "5,000+". */
export function Counter({
  value,
  className,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const reduced = useReducedMotion();

  const numericMatch = value.match(/[\d,]+/);
  const target = numericMatch ? parseInt(numericMatch[0].replace(/,/g, ""), 10) : null;
  const animatable = !reduced && target !== null;
  const [display, setDisplay] = useState(animatable ? "" : value);

  useEffect(() => {
    if (!animatable || !inView || target === null || !numericMatch) return;
    const prefix = value.slice(0, value.indexOf(numericMatch[0]));
    const suffix = value.slice(value.indexOf(numericMatch[0]) + numericMatch[0].length);
    const controls = animate(0, target, {
      duration,
      ease: EASE_PREMIUM,
      onUpdate: (v) => {
        setDisplay(`${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, animatable, target, value, duration, numericMatch]);

  return (
    <span ref={ref} className={className}>
      {display || "\u00A0"}
    </span>
  );
}

/** Staggered container + child variants for grouped reveals. */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.medium, ease: EASE_PREMIUM },
  },
};

/** Hook: scroll progress of a ref'd section, pre-sprung for smooth scrubbing. */
export function useSectionProgress(ref: React.RefObject<HTMLElement | null>, offset?: [string, string]) {
  const { scrollYProgress } = useScroll({
    target: ref,
    // Framer's offset typing is stricter than the string pairs we pass.
    offset: (offset ?? ["start end", "end start"]) as ["start end", "end start"],
  });
  return useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.6 });
}

export function useTransformValue(
  value: MotionValue<number>,
  input: number[],
  output: (string | number)[],
) {
  return useTransform(value, input, output);
}

export { motion, useScroll, useTransform, useSpring, useReducedMotion, useInView };
