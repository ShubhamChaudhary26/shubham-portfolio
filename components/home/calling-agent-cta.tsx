"use client";

import { Button } from "@heroui/react";
import NextLink from "next/link";

export const CallingAgentCta = () => (
  <section className="px-4 pb-8 md:pb-12">
    <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-divider bg-content1/90 p-6 shadow-sm md:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        AI Calling Agent
      </p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
        Aapki har call uthayega, 24x7, Hindi me
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground-500 md:text-lg">
        Missed call = customer competitor ke paas
      </p>
      <Button as={NextLink} className="mt-6" color="primary" href="/ai-calling-agent" size="lg">
        Product dekho
      </Button>
    </div>
  </section>
);
