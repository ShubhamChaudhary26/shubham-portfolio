import type { PresentedIndustry } from "@/lib/automation-media";

import Image from "next/image";

import { DemoCta } from "@/components/ai-automation/demo-cta";
import { AudioPending, DemoAudio } from "@/components/ai-automation/demo-audio";
import { PageHero } from "@/components/ai-automation/hero";
import { FeatureIcon } from "@/components/ai-automation/icons";
import { LeadForm } from "@/components/ai-automation/lead-form";
import { Reveal } from "@/components/ai-automation/reveal";
import { StatChips } from "@/components/ai-automation/stat-chips";
import { CRM_FEATURES, DEMO_BOOKING_URL } from "@/data/ai-automation";

const FEATURES = [
  "Inbound calls",
  "Outbound calls",
  "Instagram & Facebook Leads",
  "Own number",
] as const;

const cardClass = "rounded-3xl border border-white/10 bg-white/[0.04] p-5";

export function IndustryTemplate({ page }: { page: PresentedIndustry }) {
  const features = FEATURES.map((title) => CRM_FEATURES.find((feature) => feature.title === title)).filter(
    (feature) => feature !== undefined,
  );
  const [flow, whatsapp, ...extra] = page.screenshots;

  return (
    <article className="pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
      <PageHero eyebrow={page.name} image={page.heroImage} subtitle={page.subtitle} title={page.title} />

      <div className="mx-auto max-w-5xl space-y-16 px-4 py-12 sm:space-y-20 sm:py-16">
        <Reveal className="mx-auto max-w-3xl scroll-mb-28">
          {page.demoSrc ? (
            <DemoAudio
              captionsSrc="/audio/captions-unavailable.vtt"
              headingId={page.demoCall.headingId}
              label="Demo call"
              line={page.demoCall.line}
              preload="none"
              src={page.demoSrc}
            />
          ) : (
            <div>
              <p className="mb-3 text-base leading-relaxed text-foreground-500">{page.demoCall.line}</p>
              <AudioPending label="Demo call" />
            </div>
          )}
          {DEMO_BOOKING_URL ? (
            <p className="mt-6 text-center">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-300 to-violet-500 px-5 text-base font-semibold text-slate-950"
                href={DEMO_BOOKING_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Demo slot book karo
              </a>
            </p>
          ) : null}
        </Reveal>

        {flow ? (
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Kaise kaam karta hai</h2>
            <figure className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <Image
                unoptimized
                alt={flow.alt}
                className="h-auto w-full"
                height={flow.height}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 960px"
                src={flow.src}
                width={flow.width}
              />
              {flow.caption ? (
                <figcaption className="px-5 py-4 text-sm leading-relaxed text-foreground-500">
                  {flow.caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ) : null}

        {whatsapp ? (
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight">WhatsApp summary</h2>
            <figure className="mx-auto mt-6 max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <Image
                unoptimized
                alt={whatsapp.alt}
                className="h-auto w-full"
                height={whatsapp.height}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 384px"
                src={whatsapp.src}
                width={whatsapp.width}
              />
              {whatsapp.caption ? (
                <figcaption className="px-5 py-4 text-sm leading-relaxed text-foreground-500">
                  {whatsapp.caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ) : null}

        {extra.map((image) => (
          <Reveal key={image.src}>
            <figure className="mx-auto max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <Image
                unoptimized
                alt={image.alt}
                className="h-auto w-full"
                height={image.height}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 384px"
                src={image.src}
                width={image.width}
              />
              {image.caption ? (
                <figcaption className="px-5 py-4 text-sm leading-relaxed text-foreground-500">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ))}

        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight">CRM walkthrough</h2>
          {page.video ? (
            <video
              controls
              muted
              playsInline
              className="mt-6 aspect-video w-full rounded-3xl border border-white/10 bg-black"
              poster={page.video.poster}
              preload="none"
              src={page.video.src}
            >
              <track kind="captions" label="Captions" src="/audio/captions-unavailable.vtt" srcLang="hi" />
            </video>
          ) : (
            <div className={`mt-6 ${cardClass}`}>
              <p className="text-lg font-semibold">Walkthrough video jald aa raha hai</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-500">
                CRM screens ka video is slot mein aayega.
              </p>
            </div>
          )}
        </Reveal>

        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight">CRM mein kya hai</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature.title} className={cardClass}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-300/20 to-violet-500/25 text-teal-200">
                  <FeatureIcon name={feature.title} />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-foreground-500">{feature.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <StatChips />
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-3xl scroll-mb-28 scroll-mt-24" id="lead-form">
            {DEMO_BOOKING_URL ? (
              <p className="mb-6 text-center">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-300 to-violet-500 px-5 text-base font-semibold text-slate-950"
                  href={DEMO_BOOKING_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Demo slot book karo
                </a>
              </p>
            ) : null}
            <LeadForm
              defaultBusinessType={page.name}
              pagePath={page.path}
              selectedBusiness={page.name}
            />
          </section>
        </Reveal>
      </div>
      <DemoCta
        defaultBusinessType={page.name}
        pagePath={page.path}
        selectedBusiness={page.name}
      />
    </article>
  );
}
