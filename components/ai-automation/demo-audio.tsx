"use client";

import { useEffect, useRef, useState } from "react";

type DemoAudioProps = {
  headingId: string;
  label: string;
  line?: string;
  src: string;
  preload: "metadata" | "none";
  autoplay?: boolean;
  transcript?: string | null;
  captionsSrc: string;
};

function clock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;

  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

const BARS = [0.35, 0.72, 1, 0.48, 0.86, 0.4, 0.94, 0.58, 0.8, 0.42, 0.7, 0.5];

const cardClass =
  "rounded-[1.75rem] border border-white/15 bg-white/5 p-5 shadow-[0_30px_80px_-48px_rgba(139,92,246,0.9)] backdrop-blur-md sm:p-8";

export function DemoAudio({
  headingId,
  label,
  line,
  src,
  preload,
  autoplay = false,
  transcript,
  captionsSrc,
}: DemoAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !autoplay) return;

    let removed = false;
    const remove = () => {
      if (removed) return;
      removed = true;
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("touchstart", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
      window.removeEventListener("scroll", onScroll, true);
    };
    const insidePlayer = (event: Event) => {
      const target = event.target;

      if (!(target instanceof Node)) return false;

      return Boolean(
        [...document.querySelectorAll("[data-demo-audio]")].some((node) => node.contains(target)),
      );
    };
    const onGesture = (event: Event) => {
      if (insidePlayer(event)) {
        remove();

        return;
      }

      remove();
      if (userPaused.current) return;
      void audio.play().catch(() => undefined);
    };
    const onScroll = () => {
      if (userPaused.current) return;
      void audio
        .play()
        .then(() => remove())
        .catch(() => undefined);
    };

    void audio
      .play()
      .then(() => remove())
      .catch(() => undefined);
    window.addEventListener("pointerdown", onGesture, true);
    window.addEventListener("touchstart", onGesture, { capture: true, passive: true });
    window.addEventListener("keydown", onGesture, true);
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });

    return () => {
      remove();
      audio.pause();
    };
  }, [autoplay, src]);

  const toggle = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      userPaused.current = true;
      audio.pause();

      return;
    }

    userPaused.current = false;
    void audio.play().catch(() => undefined);
  };

  return (
    <div ref={rootRef} className={cardClass} data-demo-audio="">
      <p className="text-xs font-medium tracking-wide text-foreground-500" id={headingId}>
        {label}
      </p>
      {line ? <p className="mt-2 text-sm leading-relaxed text-foreground-500">{line}</p> : null}
      <button
        aria-pressed={playing}
        className="glow-btn mt-5 flex min-h-16 w-full items-center justify-center rounded-full bg-gradient-to-r from-teal-300 to-violet-500 px-6 text-lg font-semibold text-slate-950 shadow-[0_12px_40px_-12px_rgba(139,92,246,0.85)] motion-safe:active:scale-[0.99] sm:min-h-20 sm:text-2xl"
        type="button"
        onClick={toggle}
      >
        {playing ? "Pause" : "▶ Demo call suno"}
      </button>
      <div aria-hidden="true" className="mt-6 flex h-12 items-end justify-center gap-1.5">
        {BARS.map((height, index) => (
          <span
            key={`${height}-${index}`}
            className={`w-1.5 rounded-full bg-gradient-to-t from-teal-300 to-violet-400 ${playing ? "wave-bar" : ""}`}
            style={{
              height: `${Math.round(height * 100)}%`,
              animationDelay: `${index * 0.07}s`,
            }}
          />
        ))}
      </div>
      <label className="mt-5 block text-sm text-foreground-500">
        <span className="mb-1 block">
          {clock(current)} / {duration ? clock(duration) : "—"}
        </span>
        <input
          aria-label="Demo call progress"
          className="w-full accent-teal-300"
          max={duration || 0}
          min={0}
          step={0.1}
          type="range"
          value={duration ? Math.min(current, duration) : 0}
          onChange={(event) => {
            const next = Number(event.target.value);
            const audio = audioRef.current;

            if (audio) audio.currentTime = next;
            setCurrent(next);
          }}
        />
      </label>
      <audio
        ref={audioRef}
        preload={preload}
        src={src}
        onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
      >
        <track kind="captions" label="Hindi" src={captionsSrc} srcLang="hi" />
      </audio>
      {transcript ? (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-foreground-500 underline-offset-4 hover:underline">
            Transcript
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-foreground-500">{transcript}</p>
        </details>
      ) : null}
    </div>
  );
}

export function AudioPending({ label }: { label: string }) {
  return (
    <div className={`${cardClass} text-center`}>
      <p className="text-xs font-medium tracking-wide text-foreground-500">{label}</p>
      <p className="mt-3 text-lg font-semibold">Demo call jald aa raha hai</p>
    </div>
  );
}
