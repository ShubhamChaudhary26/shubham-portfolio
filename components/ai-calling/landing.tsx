"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";

import { BlogBookingCTA } from "@/components/blog/blog-booking-cta";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    title: "Har call uthata hai",
    text: "Koi busy ho ya dukaan band ho, agent call pick kar leta hai. 24x7.",
    icon: "lucide:phone-call",
  },
  {
    title: "Sawal ka jawab",
    text: "Timing, price range, service, aur address jaise sawal, jo aap pehle se set karte ho.",
    icon: "lucide:message-circle",
  },
  {
    title: "Lead qualify",
    text: "Kaun seriously interested hai, ye short sawal se alag karta hai.",
    icon: "lucide:user-check",
  },
  {
    title: "Visit aur appointment",
    text: "Agar aap chaaho to site visit, clinic slot, ya salon booking note kar leta hai.",
    icon: "lucide:calendar-check",
  },
  {
    title: "Follow-up call",
    text: "Jo log baad mein dekhna chahte hain, unhe aapke rule ke hisaab se dubara call ho sakti hai.",
    icon: "lucide:phone-forwarded",
  },
  {
    title: "WhatsApp summary",
    text: "Call ke baad owner ko short summary: naam, number, aur agla step.",
    icon: "lucide:send",
  },
];

const USE_CASES = [
  {
    title: "Real estate",
    text: "Property ke sawal, budget, aur site visit ka time note karta hai.",
  },
  {
    title: "Clinics",
    text: "Doctor available hai ya nahi, aur appointment ka slot poochhta hai.",
  },
  {
    title: "Coaching",
    text: "Course, batch, aur demo class ke baare mein baat karta hai.",
  },
  {
    title: "Salons",
    text: "Service aur time slot le kar booking note karta hai.",
  },
  {
    title: "Service centres",
    text: "Problem sunta hai aur pickup ya visit ka time confirm karta hai.",
  },
];

const FAQS = [
  {
    question: "Hindi aur doosri languages?",
    answer:
      "Agent Hindi mein baat kar sakta hai. Koi aur language tabhi, jab setup mein woh language add ki gayi ho. Demo se pehle confirm kar lena ki aapko kaun si language chahiye.",
  },
  {
    question: "Setup kaise hota hai?",
    answer:
      "Pehle aapke sawal, timings, aur booking rules likhte hain. Phir number connect hota hai aur test calls hoti hain. Jab aap theek maan lo, tab live hota hai. Kitna time lagega, ye aapke business pe depend karta hai. Demo pe ye clear karte hain.",
  },
  {
    question: "Purana number ya CRM chalega?",
    answer:
      "Existing number tab use ho sakta hai jab aapka operator call forwarding ya SIP allow kare. CRM tab judta hai jab usme API ho, ya data nikalne ka seedha tarika ho. Har CRM ek jaisa nahi hota. Demo mein aapka number aur tool dekh kar batate hain.",
  },
  {
    question: "Jab AI jawab na de to kya hota hai?",
    answer:
      "Aap rule set karte ho. Call ek insaan ko transfer ho sakti hai, ya agent number note karke aapko WhatsApp summary bhej deta hai. Woh andaza nahi lagata jiska jawab aapne nahi diya.",
  },
  {
    question: "Data privacy?",
    answer:
      "Call ki detail aapke business ke liye use hoti hai: lead, appointment, aur summary. Customer ko recording ya data ke baare mein wahi batana chahiye jo aapke rules maangte hain. Data kahan store hota hai, ye demo pe seedha bataya jata hai.",
  },
];

const CALLING_BUSINESS_TYPES = [
  { value: "real estate", label: "Real estate" },
  { value: "clinic", label: "Clinic" },
  { value: "coaching", label: "Coaching" },
  { value: "salon", label: "Salon" },
  { value: "service centre", label: "Service centre" },
  { value: "other", label: "Other" },
];

type AiCallingLandingProps = {
  hasDemoAudio: boolean;
};

export function AiCallingLanding({ hasDemoAudio }: AiCallingLandingProps) {
  const reduce = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollToBooking = () => {
    document.getElementById("demo-booking")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="overflow-x-clip">
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-primary/25 blur-3xl motion-safe-only animate-float" />
          <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl motion-safe-only animate-float-delayed" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(165,176,255,0.16),transparent_55%)]" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            AI Calling Agent
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Aapki har call uthayega, 24x7, Hindi me
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-500 md:text-xl">
            Missed call = customer competitor ke paas
          </p>
          <div className="mt-8">
            <Button color="primary" size="lg" onPress={scrollToBooking}>
              Free demo book karo
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Kaise kaam karta hai
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <article className="h-full rounded-3xl border border-divider bg-content1/80 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" icon={step.icon} />
                  </span>
                  <p className="text-xs font-semibold tracking-[0.16em] text-foreground-400">
                    0{index + 1}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-500 md:text-base">
                  {step.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Kis business ke liye
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {USE_CASES.map((item) => (
            <li
              key={item.title}
              className="rounded-3xl border border-divider bg-content1/70 p-6"
            >
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-500 md:text-base">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Demo call
        </h2>
        {hasDemoAudio ? (
          <figure className="mt-8 max-w-xl rounded-3xl border border-divider bg-content1/80 p-6">
            <figcaption className="font-medium text-foreground">
              Asli demo call: real estate
            </figcaption>
            <audio
              controls
              className="mt-4 w-full"
              preload="none"
              src="/audio/ai-calling-demo-real-estate.mp3"
            >
              <track
                kind="captions"
                label="Hindi"
                src="/audio/ai-calling-demo-real-estate.vtt"
                srcLang="hi"
              />
              <a href="/audio/ai-calling-demo-real-estate.mp3">Demo audio download</a>
            </audio>
          </figure>
        ) : (
          <p className="mt-6 max-w-xl rounded-3xl border border-divider bg-content1/70 px-6 py-5 text-base text-foreground-500">
            Demo audio jald aa raha hai
          </p>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Sawal
        </h2>
        <div className="mt-8 divide-y divide-divider rounded-3xl border border-divider bg-content1/80">
          {FAQS.map((item, index) => {
            const open = openFaq === index;
            const panelId = `calling-faq-${index}`;

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

      <section className="mx-auto max-w-3xl scroll-mt-24 px-4 py-16 md:py-24" id="demo-booking">
        <BlogBookingCTA
          businessTypes={CALLING_BUSINESS_TYPES}
          heading="Free demo book karo"
          pagePath="/ai-calling-agent"
          slug="ai-calling-agent"
          source="ai-calling-agent"
        />
      </section>
    </div>
  );
}
