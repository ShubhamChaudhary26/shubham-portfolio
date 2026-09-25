"use client";

import { Reveal, SectionHeading } from "@/components/motion/reveal";
import { DATA } from "@/data";

export const SkillsOverviewSection = () => {
  const { groups, sectionDescription, sectionTitle } = DATA.home.skills;

  return (
    <section className="scroll-mt-24 px-4 py-20 md:py-28" id="skills">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          description={sectionDescription}
          eyebrow="Capabilities"
          title={sectionTitle}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map((group, index) => (
            <Reveal key={group.name} delay={index * 0.06}>
              <article className="h-full rounded-3xl border border-divider bg-content1/70 p-6 transition-colors hover:border-primary/30">
                <h3 className="font-display text-xl font-semibold">{group.name}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-divider bg-background/70 px-3 py-1 text-sm text-foreground-600"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
