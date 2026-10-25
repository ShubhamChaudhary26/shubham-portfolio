"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { DemoAudioPlayer } from "@/components/ai-calling/demo-audio";
import { BlogBookingCTA } from "@/components/blog/blog-booking-cta";
import { Reveal } from "@/components/motion/reveal";
import {
  CALLING_BUSINESS_TYPES,
  type IndustryPage,
} from "@/data/ai-calling-industries";

type IndustryLandingProps = {
  content: IndustryPage;
  hasAudio: boolean;
};

function HeroCopy({
  content,
  onImage,
  onBook,
}: {
  content: IndustryPage;
  onImage: boolean;
  onBook: () => void;
}) {
  return (
    <>
      <p
        className={`mb-4 text-xs font-semibold uppercase tracking-[0.22em] ${
          onImage ? "text-white/80" : "text-primary"
        }`}
      >
        {content.eyebrow}
      </p>
      <h1
        className={`max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl ${
          onImage ? "text-white" : "text-foreground md:text-6xl"
        }`}
      >
        {content.title}
      </h1>
      <p
        className={`mt-5 max-w-xl text-lg leading-relaxed md:text-xl ${
          onImage ? "text-white/90" : "text-foreground-500"
        }`}
      >
        {content.subtitle}
      </p>
      <div className="mt-8">
        <Button color="primary" size="lg" onPress={onBook}>
          {content.booking.heading}
        </Button>
      </div>
    </>
  );
}

export function IndustryLanding({ content, hasAudio }: IndustryLandingProps) {
  const reduce = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const wideFigures = (content.figures ?? []).filter(
    (figure) => figure.width / figure.height > 1,
  );
  const tallFigures = (content.figures ?? []).filter(
    (figure) => figure.width / figure.height <= 1,
  );

  const scrollToBooking = () => {
    document.getElementById("demo-booking")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="overflow-x-clip">
      {content.heroImage ? (
        <section className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-divider sm:min-h-[36rem]">
            <Image
              fill
              priority
              alt={content.heroImage.alt}
              className="object-cover object-[78%_center]"
              sizes="(max-width: 1152px) 100vw, 1152px"
              src={content.heroImage.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 md:bg-gradient-to-r md:from-black md:via-black/80 md:to-black/15" />
            <div className="relative z-10 flex min-h-[32rem] items-end p-4 text-white sm:min-h-[36rem] sm:p-8 md:w-[58%] md:items-center md:p-12">
              <div className="w-full rounded-3xl bg-black/60 p-5 backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-none">
                <HeroCopy content={content} onImage onBook={scrollToBooking} />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-primary/25 blur-3xl motion-safe-only animate-float" />
            <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl motion-safe-only animate-float-delayed" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(165,176,255,0.16),transparent_55%)]" />
          </div>
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <HeroCopy content={content} onBook={scrollToBooking} onImage={false} />
          </div>
        </section>
      )}

      <section
        className="mx-auto max-w-3xl scroll-mt-24 px-4 py-8 md:py-12"
        id="demo-booking"
      >
        <BlogBookingCTA
          businessTypes={CALLING_BUSINESS_TYPES}
          heading={content.booking.heading}
          pagePath={content.path}
          slug={content.booking.slug}
          source={content.booking.source}
        />
      </section>

      {content.audio ? (
        <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          {hasAudio ? (
            <DemoAudioPlayer
              heading={content.audio.heading}
              headingId={content.audio.headingId}
              line={content.audio.line}
              src={content.audio.src}
            />
          ) : (
            <p className="max-w-xl rounded-3xl border border-divider bg-content1/70 px-6 py-5 text-base text-foreground-500">
              Demo audio jald aa raha hai
            </p>
          )}
        </section>
      ) : null}

      {content.figures?.length ? (
        <section className="mx-auto max-w-6xl px-4 py-8 md:py-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Kaise dikhta hai
          </h2>
          <div className="mt-8 space-y-6">
            {wideFigures.map((figure) => (
              <figure
                key={figure.src}
                className="overflow-hidden rounded-3xl border border-divider bg-content1/80"
              >
                <Image
                  alt={figure.alt}
                  className="h-auto w-full"
                  height={figure.height}
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  src={figure.src}
                  width={figure.width}
                />
                {figure.caption ? (
                  <figcaption className="px-5 py-4 text-sm leading-relaxed text-foreground-500 md:text-base">
                    {figure.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
            {tallFigures.length ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {tallFigures.map((figure) => (
                  <figure
                    key={figure.src}
                    className="overflow-hidden rounded-3xl border border-divider bg-content1/80"
                  >
                    <Image
                      alt={figure.alt}
                      className="h-auto w-full"
                      height={figure.height}
                      sizes="(max-width: 640px) 100vw, 560px"
                      src={figure.src}
                      width={figure.width}
                    />
                    {figure.caption ? (
                      <figcaption className="px-5 py-4 text-sm leading-relaxed text-foreground-500 md:text-base">
                        {figure.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-8 md:py-16">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {content.benefitsTitle}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.05}>
              <article className="h-full rounded-3xl border border-divider bg-content1/80 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" icon={benefit.icon} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-500 md:text-base">
                  {benefit.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 md:py-16">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {content.faqTitle}
        </h2>
        <div className="mt-8 divide-y divide-divider rounded-3xl border border-divider bg-content1/80">
          {content.faqs.map((item, index) => {
            const open = openFaq === index;
            const panelId = `${content.booking.slug}-faq-${index}`;

            return (
              <div key={item.question} className="px-5 py-2">
                <h3>
                  <button
                    aria-controls={panelId}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-foreground"
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                  >
                    {item.question}
                    <Icon
                      className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-45" : ""}`}
                      icon="lucide:plus"
                    />
                  </button>
                </h3>
                <div className={open ? "pb-4" : "hidden"} id={panelId}>
                  <p className="text-sm leading-relaxed text-foreground-500 md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
