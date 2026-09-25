"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import NextLink from "next/link";

import { SpinningBadge } from "@/components/home/spinning-badge";
import { DATA } from "@/data";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * index, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const HeroSection = () => {
  const reduce = useReducedMotion();
  const { headline, location, role, subtitle } = DATA.home.hero;

  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/25 blur-3xl motion-safe-only animate-float" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl motion-safe-only animate-float-delayed" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(165,176,255,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,hsl(var(--heroui-background)))] " />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-20">
        <div>
          <motion.p
            animate={reduce ? undefined : "show"}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-divider bg-content1/80 px-3 py-1 text-sm text-foreground-600 backdrop-blur"
            custom={0}
            initial={reduce ? undefined : "hidden"}
            variants={fade}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-70 motion-safe-only animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {role}
          </motion.p>

          <motion.h1
            animate={reduce ? undefined : "show"}
            className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            custom={1}
            initial={reduce ? undefined : "hidden"}
            variants={fade}
          >
            Shubham
            <span className="block">Chaudhary</span>
          </motion.h1>

          <motion.p
            animate={reduce ? undefined : "show"}
            className="mt-6 max-w-xl font-display text-2xl leading-snug tracking-tight text-foreground md:text-4xl"
            custom={2}
            initial={reduce ? undefined : "hidden"}
            variants={fade}
          >
            I build{" "}
            <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
              AI calling agents
            </span>
            , bots, and apps.
          </motion.p>

          <motion.p
            animate={reduce ? undefined : "show"}
            className="mt-5 max-w-xl text-base leading-relaxed text-foreground-500 md:text-lg"
            custom={3}
            initial={reduce ? undefined : "hidden"}
            variants={fade}
          >
            {subtitle}
          </motion.p>
          <p className="sr-only">{headline}</p>

          <motion.div
            animate={reduce ? undefined : "show"}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            custom={4}
            initial={reduce ? undefined : "hidden"}
            variants={fade}
          >
            <Button
              as={NextLink}
              className="font-medium"
              color="primary"
              endContent={<Icon icon="lucide:calendar" />}
              href="/schedule"
              size="lg"
            >
              Schedule a meeting
            </Button>
            <Button
              className="font-medium"
              color="primary"
              endContent={<Icon icon="lucide:arrow-down" />}
              size="lg"
              variant="bordered"
              onPress={() => {
                document.getElementById("work-section")?.scrollIntoView({
                  behavior: reduce ? "auto" : "smooth",
                });
              }}
            >
              View work
            </Button>
            <a download className="sm:w-auto" href="/ShubhamChaudhary_CV.pdf">
              <Button
                className="w-full font-medium"
                size="lg"
                startContent={<Icon icon="lucide:download" />}
                variant="light"
              >
                Download CV
              </Button>
            </a>
          </motion.div>

          <motion.p
            animate={reduce ? undefined : "show"}
            className="mt-6 flex items-center gap-2 text-sm text-foreground-500"
            custom={5}
            initial={reduce ? undefined : "hidden"}
            variants={fade}
          >
            <Icon icon="lucide:map-pin" />
            {location}
          </motion.p>
        </div>

        <motion.div
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          className="relative mx-auto w-full max-w-md"
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-[12%] -z-10 rounded-full bg-gradient-to-br from-primary/30 via-transparent to-teal-400/20 blur-2xl" />
          <SpinningBadge
            priority
            alt="Portrait of Shubham Chaudhary"
            id="hero-ring"
            src="/shubham.jpg"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {DATA.home.focus.items.map((item) => (
              <span
                key={item.title}
                className="rounded-full border border-divider bg-content1/90 px-3 py-1.5 text-xs font-medium text-foreground-600 backdrop-blur"
              >
                {item.title}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
