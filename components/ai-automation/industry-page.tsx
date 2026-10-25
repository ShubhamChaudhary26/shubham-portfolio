import type { PresentedIndustry } from "@/lib/automation-media";

import Image from "next/image";

import { AudioPending, DemoAudio } from "@/components/ai-automation/demo-audio";
import { LeadForm } from "@/components/ai-automation/lead-form";
import { CRM_FEATURES, CRM_STEPS, EXPLAINER_LABEL } from "@/data/ai-automation";

const cardClass =
  "rounded-3xl border border-divider bg-content1/80 p-5 shadow-[0_18px_50px_-40px_rgba(165,176,255,0.8)]";

export function IndustryTemplate({ page }: { page: PresentedIndustry }) {
  return (
    <article className="pb-8">
      <header className="mx-auto max-w-5xl px-4 pb-2 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{page.name}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground-500">{page.subtitle}</p>
        <div className="mt-6 max-w-3xl">
          {page.explainer ? (
            <DemoAudio
              autoplay
              captionsSrc={page.explainer.captionsSrc}
              headingId={page.audio.headingId}
              label={EXPLAINER_LABEL}
              line="Sample voice. Poora text neeche khol sakte ho."
              preload="metadata"
              src={page.explainer.src}
              transcript={page.explainer.transcript}
            />
          ) : (
            <AudioPending label={EXPLAINER_LABEL} />
          )}
        </div>
        {page.demoCall && page.demoSrc ? (
          <div className="mt-4 max-w-3xl">
            <DemoAudio
              captionsSrc="/audio/captions-unavailable.vtt"
              headingId={page.demoCall.headingId}
              label="Demo call"
              line={page.demoCall.line}
              preload="none"
              src={page.demoSrc}
            />
          </div>
        ) : null}
      </header>

      <div>
        <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">CRM kaise kaam karta hai</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-6 md:gap-3">
              {CRM_STEPS.map((step, index) => (
                <li key={step.title} className="relative md:pt-8">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 hidden h-px w-full bg-primary/30 md:block"
                  />
                  <div className="flex gap-3 md:block">
                    <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground md:-mt-4">
                      {index + 1}
                    </span>
                    <div className="border-l border-primary/25 pl-3 md:mt-3 md:border-l-0 md:pl-0">
                      <h3 className="text-sm font-semibold leading-snug">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-500">{step.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside>
            <h2 className="font-display text-2xl font-semibold tracking-tight">CRM walkthrough</h2>
            {page.video ? (
              <video
                controls
                muted
                playsInline
                className="mt-4 aspect-video w-full rounded-3xl border border-divider bg-black"
                poster={page.video.poster}
                preload="none"
                src={page.video.src}
              >
                <track
                  kind="captions"
                  label="Captions"
                  src="/audio/captions-unavailable.vtt"
                  srcLang="hi"
                />
              </video>
            ) : (
              <div className={`mt-4 ${cardClass}`}>
                <p className="text-lg font-semibold">Walkthrough video jald aa raha hai</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-500">
                  CRM screens ka video is slot mein aayega.
                </p>
              </div>
            )}
          </aside>
        </section>

        {page.screenshots.length ? (
          <section className="mx-auto max-w-5xl px-4 py-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Screenshots</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {page.screenshots.map((image) => (
                <figure key={image.src} className="overflow-hidden rounded-3xl border border-divider bg-content1">
                  <Image
                    unoptimized
                    alt={image.alt}
                    className="h-auto w-full"
                    height={image.height}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 480px"
                    src={image.src}
                    width={image.width}
                  />
                  {image.caption ? (
                    <figcaption className="px-4 py-3 text-sm leading-relaxed text-foreground-500">
                      {image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-5xl px-4 py-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">CRM mein kya hai</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CRM_FEATURES.map((feature) => (
              <li key={feature.title} className={cardClass}>
                <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-foreground-500">{feature.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="sticky bottom-3 z-30 px-4 pb-3">
          <a
            className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-full bg-primary px-5 text-center text-sm font-semibold text-primary-foreground shadow-lg"
            href="#lead-form"
          >
            Pasand aaya? Apni details bhejo
          </a>
        </div>
      </div>

      <section className="mx-auto max-w-3xl scroll-mt-24 px-4 py-8" id="lead-form">
        <LeadForm
          defaultBusinessType={page.name}
          defaultServices={["AI Calling Agent"]}
          pagePath={page.path}
          selectedBusiness={page.name}
        />
      </section>
    </article>
  );
}
