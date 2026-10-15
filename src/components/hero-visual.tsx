"use client";

import Image from "next/image";
import { Gift, Truck } from "lucide-react";
import { Enter, ParallaxGroup, ParallaxLayer, Petals } from "@/components/motion";

export function HeroVisual({ labels }: { labels: { boxes: string; fulfillment: string } }) {
  return (
    <Enter delay={0.25} y={30}>
      <ParallaxGroup className="hero-visual" strength={16}>
        <div className="hero-blob" aria-hidden="true" />
        <Petals
          opacity={0.95}
          items={[
            { x: "-2%", y: "4%", size: 44, color: "var(--coral)", rot: -30, dur: 9, delay: 0 },
            { x: "70%", y: "-3%", size: 30, color: "var(--gold)", rot: 20, dur: 11, delay: -4 },
            { x: "96%", y: "40%", size: 36, color: "var(--lavender)", rot: 70, dur: 10, delay: -2 },
            { x: "34%", y: "98%", size: 28, color: "var(--teal)", rot: 140, dur: 12, delay: -6 },
          ]}
        />
        <ParallaxLayer depth={0.6} className="hero-card hero-card-main">
          <Image
            src="/gallery-projects/wooga/blanket/01.jpg"
            alt="Open royal blue holiday gift box with a blanket, ornament, and socks"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 420px"
          />
        </ParallaxLayer>
        <ParallaxLayer depth={1.4} className="hero-card hero-card-second">
          <Image
            src="/gallery-projects/slotomania/headphones/01.jpg"
            alt="Foam-fitted gift kit with a mug, charger, and headphones"
            fill
            sizes="(max-width: 1024px) 46vw, 260px"
          />
        </ParallaxLayer>
        <ParallaxLayer depth={2.2} className="hero-card hero-card-third">
          <Image
            src="/gallery-projects/vip-premium/phonograph/01.jpg"
            alt="Colorful VIP Premium holiday gift box"
            fill
            sizes="(max-width: 1024px) 30vw, 170px"
          />
        </ParallaxLayer>
        <ParallaxLayer depth={2.8} className="hero-note hero-note-top">
          <span className="hero-note-icon" style={{ background: "linear-gradient(135deg, var(--coral), #ff9a86)" }}>
            <Gift size={15} aria-hidden="true" />
          </span>
          {labels.boxes}
        </ParallaxLayer>
        <ParallaxLayer depth={2.4} className="hero-note hero-note-bottom">
          <span className="hero-note-icon" style={{ background: "linear-gradient(135deg, var(--teal), #4fd0d8)" }}>
            <Truck size={15} aria-hidden="true" />
          </span>
          {labels.fulfillment}
        </ParallaxLayer>
      </ParallaxGroup>
    </Enter>
  );
}
