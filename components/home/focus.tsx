"use client";

import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";

import { Reveal, SectionHeading } from "@/components/motion/reveal";
import { DATA } from "@/data";

export const FocusSection = () => {
  const reduce = useReducedMotion();
  const { sectionTitle, sectionDescription, items } = DATA.home.focus;

  return (
    <section className="scroll-mt-24 px-4 py-20 md:py-28" id="focus">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          description={sectionDescription}
          eyebrow="Focus"
          title={sectionTitle}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <motion.article
                className="group relative h-full overflow-hidden rounded-3xl border border-divider bg-content1/80 p-7 shadow-sm transition-colors hover:border-primary/40"
                whileHover={reduce ? undefined : { y: -6 }}
              >
                <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <p className="text-xs font-semibold tracking-[0.18em] text-foreground-400">
                  0{index + 1}
                </p>
                <div className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" icon={item.icon} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-500 md:text-base">
                  {item.description}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
