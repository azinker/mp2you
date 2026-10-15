"use client";

import Link from "next/link";

/** Dev-only floating pill to hop back to the Design Lab index. Never ships to production. */
export function BackToLab({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 18,
        left: 18,
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-grotesk), Arial, sans-serif",
        fontSize: 12,
      }}
    >
      <Link
        href="/design-lab"
        style={{
          background: "rgba(12, 11, 9, 0.86)",
          color: "#f4f0e8",
          border: "1px solid rgba(244, 240, 232, 0.25)",
          borderRadius: 999,
          padding: "8px 14px",
          backdropFilter: "blur(8px)",
          letterSpacing: "0.08em",
        }}
      >
        ← Design Lab
      </Link>
      {[1, 2, 3, 4].map((n) => (
        <Link
          key={n}
          href={`/design-lab/concept-${n}`}
          aria-label={`Concept ${n}`}
          style={{
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            background: n === current ? "#f4f0e8" : "rgba(12, 11, 9, 0.86)",
            color: n === current ? "#0c0b09" : "#f4f0e8",
            border: "1px solid rgba(244, 240, 232, 0.25)",
            fontWeight: 700,
          }}
        >
          {n}
        </Link>
      ))}
    </div>
  );
}
