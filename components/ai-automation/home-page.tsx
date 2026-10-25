import Link from "next/link";

import { DemoCta } from "@/components/ai-automation/demo-cta";
import { AudioPending, DemoAudio } from "@/components/ai-automation/demo-audio";
import { PageHero } from "@/components/ai-automation/hero";
import { BusinessIcon, ServiceIcon } from "@/components/ai-automation/icons";
import { LeadForm } from "@/components/ai-automation/lead-form";
import { Reveal } from "@/components/ai-automation/reveal";
import { StatChips } from "@/components/ai-automation/stat-chips";
import { BrandMark } from "@/components/ai-automation/brand-mark";
import { CRM_STEPS, HUB_HERO, INDUSTRIES, industryBySlug } from "@/data/ai-automation";
import { AUTOMATION_BRAND } from "@/lib/automation-brand";
import { presentIndustry } from "@/lib/automation-media";

const SERVICES = [
  {
    id: "calling",
    title: "AI Calling Agent",
    href: "/ai-automation",
    text: "Hindi mein call uthata hai, aapke setup se jawab deta hai, aur appointment note kar sakta hai.",
  },
  {
    id: "chatbot",
    title: "AI Chatbot",
    href: "/ai-automation/ai-chatbot",
    text: "Aapke likhe hue jawab site, Instagram, ya WhatsApp pe. Naam aur number tab leta hai jab aap woh step on karte ho.",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Automation",
    href: "/ai-automation/whatsapp-automation",
    text: "Reminder, follow-up, aur booking summary. Message wahi hota hai jo aap likhte ho.",
  },
  {
    id: "social",
    title: "Instagram/Facebook Lead Automation",
    href: "/#lead-form",
    text: "IG aur Facebook ads, comments, aur DMs ke leads CRM mein aa jate hain. AI unhe minutes mein call karta hai.",
  },
] as const;

const cardClass =
  "flex min-h-32 w-full flex-col items-start justify-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-5 text-left motion-safe:transition-colors hover:border-teal-300/40";

export function HomePage() {
  const clinic = industryBySlug("clinic");
  const demo = clinic ? presentIndustry(clinic) : null;

  return (
    <article className="pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
      <PageHero
        eyebrow={AUTOMATION_BRAND.handle}
        image={HUB_HERO}
        leading={<BrandMark className="h-14 w-14" />}
        subtitle="AI calling agent, chatbot, WhatsApp, aur Instagram/Facebook leads. Hindi mein, aapke business ke liye."
        title="AI Automation Hindi"
      />

      <div className="mx-auto max-w-5xl space-y-16 px-4 py-12 sm:space-y-20 sm:py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight">Services</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link className={`${cardClass} h-full`} href={service.href}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-300/20 to-violet-500/25 text-teal-200">
                    <ServiceIcon id={service.id} />
                  </span>
                  <span className="font-display text-xl font-semibold leading-tight">{service.title}</span>
                  <span className="text-base leading-relaxed text-foreground-500">{service.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight">Aapka business type kya hai?</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INDUSTRIES.map((business) => (
              <li key={business.slug}>
                <Link className={cardClass} href={business.path}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-300/20 to-violet-500/25 text-teal-200">
                    <BusinessIcon id={business.slug} />
                  </span>
                  <span className="font-display text-xl font-semibold leading-tight">{business.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mx-auto max-w-3xl scroll-mb-28">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Demo call</h2>
          <div className="mt-6">
            {demo?.demoSrc ? (
              <DemoAudio
                captionsSrc="/audio/captions-unavailable.vtt"
                headingId="home-demo-heading"
                label="Demo call"
                line={demo.demoCall.line}
                preload="none"
                src={demo.demoSrc}
              />
            ) : (
              <AudioPending label="Demo call" />
            )}
          </div>
          <p className="mt-4 text-sm text-foreground-500">
            <Link className="font-medium text-teal-200 underline-offset-4 hover:underline" href="/ai-automation/clinic">
              Clinic page
            </Link>
          </p>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight">CRM flow</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {CRM_STEPS.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-semibold text-teal-200">{index + 1}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-foreground-500">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <StatChips />
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-3xl scroll-mb-28 scroll-mt-24" id="lead-form">
            <LeadForm pagePath="/" selectedBusiness="Home" />
          </section>
        </Reveal>
      </div>

      <DemoCta defaultBusinessType="" pagePath="/" selectedBusiness="Home" />
    </article>
  );
}
