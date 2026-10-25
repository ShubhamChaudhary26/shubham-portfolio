"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/ai-automation/brand-mark";
import { BusinessIcon } from "@/components/ai-automation/icons";
import { LeadForm } from "@/components/ai-automation/lead-form";
import { Reveal } from "@/components/ai-automation/reveal";
import { StatChips } from "@/components/ai-automation/stat-chips";
import { INDUSTRIES } from "@/data/ai-automation";

const cardClass =
  "flex min-h-32 w-full flex-col items-start justify-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-5 text-left motion-safe:transition-colors hover:border-teal-300/40";

export function HubPage() {
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
    <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:space-y-16 sm:py-16">
      <div className="flex flex-col items-center text-center">
        <BrandMark className="h-14 w-14 text-base" />
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Aapka business type kya hai?
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {INDUSTRIES.map((business) => (
          <Link key={business.slug} className={cardClass} href={business.path} prefetch={false}>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-300/20 to-violet-500/25 text-teal-200">
              <BusinessIcon id={business.slug} />
            </span>
            <span className="font-display text-xl font-semibold leading-tight">{business.name}</span>
          </Link>
        ))}
        <button className={cardClass} type="button" onClick={() => setFormOpen(true)}>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-300/20 to-violet-500/25 text-teal-200">
            <BusinessIcon id="other" />
          </span>
          <span className="font-display text-xl font-semibold">Other</span>
        </button>
      </div>
      <Reveal>
        <StatChips />
      </Reveal>
      {formOpen ? (
        <Reveal>
          <section className="scroll-mt-24" id="lead-form">
            <LeadForm defaultBusinessType="Other" pagePath="/ai-automation" selectedBusiness="Other" />
          </section>
        </Reveal>
      ) : null}
    </div>
  );
}
