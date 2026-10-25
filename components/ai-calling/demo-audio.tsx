"use client";

import { useState } from "react";

const CAPTIONS_SRC = "/audio/captions-unavailable.vtt";

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return null;

  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;

  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

type DemoAudioPlayerProps = {
  heading: string;
  headingId: string;
  line: string;
  src: string;
};

export function DemoAudioPlayer({
  heading,
  headingId,
  line,
  src,
}: DemoAudioPlayerProps) {
  const [duration, setDuration] = useState<string | null>(null);

  return (
    <figure className="max-w-xl rounded-3xl border border-divider bg-content1/80 p-6">
      <figcaption>
        <h2
          className="font-display text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl"
          id={headingId}
        >
          {heading}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground-500">{line}</p>
        <p className="mt-3 text-sm font-medium text-foreground">
          Duration {duration ?? "—"}
        </p>
      </figcaption>
      <audio
        controls
        aria-labelledby={headingId}
        className="mt-5 w-full"
        preload="metadata"
        src={src}
        onLoadedMetadata={(event) => {
          setDuration(formatDuration(event.currentTarget.duration));
        }}
      >
        <track kind="captions" label="Hindi" src={CAPTIONS_SRC} srcLang="hi" />
        <a href={src}>Demo audio download</a>
      </audio>
    </figure>
  );
}
