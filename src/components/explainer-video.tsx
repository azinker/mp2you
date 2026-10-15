"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Portrait explainer video. No autoplay, no chrome until it is playing:
 * a shaded play button appears on hover/focus (always on touch devices),
 * and native controls are enabled only while playing so viewers can
 * scrub or mute.
 */
export function ExplainerVideo({ src, poster, playLabel, pauseLabel, className }: { src: string; poster: string; playLabel: string; pauseLabel: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  return (
    <div className={cn("explainer-video", playing && "is-playing", started && "has-started", className)}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        controls={started}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onClick={(event) => {
          // Before first play the whole surface toggles; afterwards the
          // native controls own clicks.
          if (!started) {
            event.preventDefault();
            toggle();
          }
        }}
      />
      <button type="button" className="explainer-play" onClick={toggle} aria-label={playing ? pauseLabel : playLabel} aria-pressed={playing}>
        {playing ? <Pause size={28} aria-hidden="true" /> : <Play size={30} aria-hidden="true" />}
      </button>
    </div>
  );
}
