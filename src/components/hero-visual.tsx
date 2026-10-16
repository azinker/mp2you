"use client";

import Image from "next/image";
import { Gift, Truck } from "lucide-react";
import { ExplainerVideo } from "@/components/explainer-video";
import { Enter, ParallaxGroup, ParallaxLayer, Petals } from "@/components/motion";

const heroPetals = [
  { x: "-2%", y: "4%", size: 44, color: "var(--coral)", rot: -30, dur: 9, delay: 0 },
  { x: "70%", y: "-3%", size: 30, color: "var(--gold)", rot: 20, dur: 11, delay: -4 },
  { x: "96%", y: "40%", size: 36, color: "var(--lavender)", rot: 70, dur: 10, delay: -2 },
  { x: "34%", y: "98%", size: 28, color: "var(--teal)", rot: 140, dur: 12, delay: -6 },
];

/**
 * Hero: the explainer video is the first thing a visitor sees. It sits on the
 * morphing blob with the two floating notes and petals so the hero keeps its
 * energy, and the video itself still waits for a click.
 */
export function HeroVisual({
  labels,
  video,
}: {
  labels: { boxes: string; fulfillment: string };
  video: { src: string; poster: string; title: string; playLabel: string; pauseLabel: string };
}) {
  return (
    <Enter delay={0.25} y={30}>
      <ParallaxGroup className="hero-visual hero-visual-video" strength={10}>
        <div className="hero-blob" aria-hidden="true" />
        <Petals opacity={0.95} items={heroPetals} />
        <ParallaxLayer depth={0.5} className="hero-video-card">
          <ExplainerVideo {...video} />
        </ParallaxLayer>
        <ParallaxLayer depth={2.6} className="hero-note hero-note-top">
          <span className="hero-note-icon" style={{ background: "linear-gradient(135deg, var(--coral), #ff9a86)" }}>
            <Gift size={15} aria-hidden="true" />
          </span>
          {labels.boxes}
        </ParallaxLayer>
        <ParallaxLayer depth={2.2} className="hero-note hero-note-bottom">
          <span className="hero-note-icon" style={{ background: "linear-gradient(135deg, var(--teal), #4fd0d8)" }}>
            <Truck size={15} aria-hidden="true" />
          </span>
          {labels.fulfillment}
        </ParallaxLayer>
      </ParallaxGroup>
    </Enter>
  );
}

/**
 * The three-photo collage that used to be the hero. Now lives in the band
 * below the industry ticker, keeping its pointer parallax and tilted cards.
 */
export function PhotoCollage() {
  return (
    <ParallaxGroup className="hero-visual photo-collage" strength={16}>
      <div className="hero-blob" aria-hidden="true" />
      <Petals opacity={0.95} items={heroPetals} />
      <ParallaxLayer depth={0.6} className="hero-card hero-card-main">
        <Image
          src="/gallery-projects/wooga/blanket/01.jpg"
          alt="Open royal blue holiday gift box with a blanket, ornament, and socks"
          fill
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
          src="/gallery-projects/slotomania/lcd/01.jpg"
          alt="Slotomania Happy Birthday gift box with gold lettering and confetti"
          fill
          sizes="(max-width: 1024px) 30vw, 170px"
        />
      </ParallaxLayer>
    </ParallaxGroup>
  );
}
