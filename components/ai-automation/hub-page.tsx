"use client";

import type { VoiceoverAssets } from "@/lib/automation-media";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AudioPending, DemoAudio } from "@/components/ai-automation/demo-audio";
import { BusinessIcon } from "@/components/ai-automation/icons";
import { LeadForm } from "@/components/ai-automation/lead-form";
import { EXPLAINER_LABEL, INDUSTRIES } from "@/data/ai-automation";

const cardClass =
  "flex min-h-28 w-full flex-col items-start justify-center gap-3 rounded-3xl border border-divider bg-content1/80 px-4 py-5 text-left shadow-[0_18px_50px_-40px_rgba(165,176,255,0.9)] motion-safe:transition-colors hover:border-primary/50";

export function HubPage({ audio }: { audio: VoiceoverAssets }) {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (!formOpen) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.getElementById("lead-form")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [formOpen]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        @aiautomation.hindi
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        Aapke business ke liye AI Calling Agent — kaunsa business hai?
      </h1>
      <div className="mt-6 max-w-3xl">
        {audio ? (
          <DemoAudio
            captionsSrc={audio.captionsSrc}
            headingId="hub-explainer-heading"
            label={EXPLAINER_LABEL}
            line="Sample voice. Poora text neeche khol sakte ho."
            preload="metadata"
            src={audio.src}
            transcript={audio.transcript}
          />
        ) : (
          <AudioPending label={EXPLAINER_LABEL} />
        )}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {INDUSTRIES.map((business) => (
          <Link key={business.slug} className={cardClass} href={business.path} prefetch={false}>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
              <BusinessIcon id={business.slug} />
            </span>
            <span className="font-display text-xl font-semibold leading-tight">{business.name}</span>
          </Link>
        ))}
        <button className={cardClass} type="button" onClick={() => setFormOpen(true)}>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
            <BusinessIcon id="other" />
          </span>
          <span className="font-display text-xl font-semibold">Other</span>
        </button>
      </div>
      {formOpen ? (
        <section className="mx-auto mt-8 max-w-3xl scroll-mt-24" id="lead-form">
          <LeadForm
            defaultBusinessType="Other"
            pagePath="/ai-automation"
            selectedBusiness="Other"
          />
        </section>
      ) : null}
    </div>
  );
}
