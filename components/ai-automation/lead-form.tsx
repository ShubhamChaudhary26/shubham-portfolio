"use client";

import { FormEvent, useEffect, useId, useState } from "react";

import { BrandMark } from "@/components/ai-automation/brand-mark";
import {
  CALL_PROBLEMS,
  DEMO_BOOKING_URL,
  LEAD_BUSINESSES,
  TEAM_SIZES,
} from "@/data/ai-automation";
import { AUTOMATION_BRAND } from "@/lib/automation-brand";
import { formatLeadMessage, indianMobileDigits, isEmail, leadSubject } from "@/lib/automation-lead";

const fieldClass =
  "w-full rounded-2xl border border-divider bg-background px-4 py-3 text-base outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";

const TOTAL_STEPS = 5;

const BUSINESS_ALIAS: Record<string, (typeof LEAD_BUSINESSES)[number]> = {
  "Real Estate": "Real estate",
  "Real estate": "Real estate",
  Clinic: "Clinic",
  Restaurant: "Restaurant",
  Salon: "Salon",
  Coaching: "Coaching",
  "Coaching/Education": "Coaching",
  Gym: "Gym",
  Hotel: "Hotel",
  Other: "Other",
};

type LeadFormProps = {
  pagePath: string;
  selectedBusiness: string;
  defaultBusinessType?: string;
};

function Choice({
  pressed,
  children,
  onClick,
}: {
  pressed: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={pressed}
      className={`flex min-h-12 w-full items-center rounded-2xl border px-4 text-left text-base font-medium motion-safe:transition-colors ${
        pressed
          ? "border-teal-300 bg-teal-300/15 text-foreground"
          : "border-white/15 bg-white/[0.03] hover:border-teal-300/40"
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function LeadForm({ pagePath, selectedBusiness, defaultBusinessType = "" }: LeadFormProps) {
  const titleId = useId();
  const [step, setStep] = useState(0);
  const [declined, setDeclined] = useState(false);
  const [callsManually, setCallsManually] = useState<"Yes" | "No" | "">("");
  const [businessType, setBusinessType] = useState(BUSINESS_ALIAS[defaultBusinessType] ?? "");
  const [teamSize, setTeamSize] = useState("");
  const [callProblem, setCallProblem] = useState("");
  const [problemNote, setProblemNote] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setQuery(window.location.search.replace(/^\?/, "").slice(0, 500));
  }, []);

  const submit = async () => {
    setError(null);

    const trimmedName = name.trim();
    const digits = indianMobileDigits(phone);
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setError("Naam likho.");

      return;
    }

    if (!digits) {
      setError("10 digit mobile number daalo.");

      return;
    }

    if (!isEmail(trimmedEmail)) {
      setError("Sahi email daalo.");

      return;
    }

    if (honeypot.trim()) {
      setSent(true);

      return;
    }

    const lead = {
      name: trimmedName,
      phone: `+91 ${digits}`,
      email: trimmedEmail,
      businessName: "",
      businessType,
      services: [] as string[],
      city: "",
      message: callProblem === "Other" ? problemNote.trim() : "",
      bestTime: "",
      teamSize,
      callsManually: "Yes",
      callProblem,
      selectedBusiness,
      page: pagePath,
      query,
    };
    const subject = leadSubject(businessType, pagePath);
    const body = formatLeadMessage(lead);

    setSubmitting(true);

    const [{ sendPortfolioEmail }, { sendFormSubmitLead }] = await Promise.all([
      import("@/lib/email"),
      import("@/lib/booking-fallback"),
    ]);
    const emailed = await sendPortfolioEmail({
      name: trimmedName,
      email: trimmedEmail,
      subject,
      message: body,
    });

    if (!emailed.ok) {
      // eslint-disable-next-line no-console
      console.error("EmailJS lead failed", emailed.status, emailed.detail);

      const payload = { intent: "lead", ...lead, company_website: honeypot };

      try {
        const fallback = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!fallback.ok) {
          const fallbackBody = (await fallback.json().catch(() => null)) as {
            detail?: string;
            reason?: string;
          } | null;

          // eslint-disable-next-line no-console
          console.error("Lead fallback failed", fallback.status, fallbackBody?.reason, fallbackBody?.detail);
          const direct = await sendFormSubmitLead({ ...lead, subject });

          if (!direct.ok) {
            // eslint-disable-next-line no-console
            console.error("Lead fallback failed", direct.status, direct.reason, direct.detail);
            setSubmitting(false);
            setError("Request nahi gayi. Dobara bhejo.");

            return;
          }
        }
      } catch (fallbackError) {
        // eslint-disable-next-line no-console
        console.error("Lead fallback failed", fallbackError);
        const direct = await sendFormSubmitLead({ ...lead, subject });

        if (!direct.ok) {
          // eslint-disable-next-line no-console
          console.error("Lead fallback failed", direct.status, direct.reason, direct.detail);
          setSubmitting(false);
          setError("Request nahi gayi. Dobara bhejo.");

          return;
        }
      }
    }

    setSubmitting(false);
    setSent(true);
  };

  const advance = () => {
    setError(null);

    if (step === 0) {
      if (!callsManually) {
        setError("Haan ya nahi chuno.");

        return;
      }

      if (callsManually === "No") {
        setDeclined(true);

        return;
      }

      setStep(1);

      return;
    }

    if (step === 1) {
      if (!businessType) {
        setError("Business type chuno.");

        return;
      }

      setStep(2);

      return;
    }

    if (step === 2) {
      if (!teamSize) {
        setError("Team size chuno.");

        return;
      }

      setStep(3);

      return;
    }

    if (!callProblem) {
      setError("Ek problem chuno.");

      return;
    }

    if (callProblem === "Other" && problemNote.trim().length < 2) {
      setError("Problem short mein likho.");

      return;
    }

    setStep(4);
  };

  const question =
    step === 0
      ? "Kya aap abhi customers ko calls manually karte ho?"
      : step === 1
        ? "Aapka business type kya hai?"
        : step === 2
          ? "Team mein kitne log hain?"
          : step === 3
            ? "Calls ka sabse bada problem kya hai?"
            : "Aapki details";

  return (
    <div className="rounded-[1.75rem] bg-gradient-to-br from-teal-300 via-cyan-200 to-violet-500 p-px shadow-[0_28px_80px_-42px_rgba(139,92,246,0.75)]">
      <div className="rounded-[1.7rem] bg-content1 p-5 md:p-8">
        <div className="flex flex-col items-center text-center">
          <BrandMark className="h-14 w-14 text-base" />
          <h2 className="mt-3 font-display text-2xl font-semibold">{AUTOMATION_BRAND.name}</h2>
          <p className="text-sm text-foreground-500">{AUTOMATION_BRAND.handle}</p>
        </div>
        {sent ? (
          <div className="mt-6 space-y-4 text-center">
            <p className="text-lg leading-relaxed" role="status">
              Shukriya! Hum jaldi aapko call karenge.
            </p>
            {DEMO_BOOKING_URL ? (
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-300 to-violet-500 px-5 text-base font-semibold text-slate-950"
                href={DEMO_BOOKING_URL}
              >
                Demo slot book karo
              </a>
            ) : null}
          </div>
        ) : declined ? (
          <div className="mt-6 space-y-4 text-center">
            <p className="text-lg leading-relaxed" role="status">
              Abhi ye aapke kaam ka nahi lagta, shukriya!
            </p>
            <button
              className="min-h-12 rounded-full border border-white/15 px-5 text-sm font-medium"
              type="button"
              onClick={() => {
                setDeclined(false);
                setError(null);
              }}
            >
              Peeche
            </button>
          </div>
        ) : (
          <form
            className="relative mt-6"
            onSubmit={(event: FormEvent) => {
              event.preventDefault();
              if (step < TOTAL_STEPS - 1) {
                advance();

                return;
              }

              void submit();
            }}
          >
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Company website
                <input
                  autoComplete="off"
                  name="company_website"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </label>
            </div>
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-foreground-500">
                <span>
                  Sawal {step + 1} / {TOTAL_STEPS}
                </span>
              </div>
              <div
                aria-hidden="true"
                className="h-1.5 overflow-hidden rounded-full bg-white/10"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-300 to-violet-500"
                  style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
            <h3 className="font-display text-xl font-semibold leading-snug" id={titleId}>
              {question}
            </h3>
            <div aria-labelledby={titleId} className="mt-4 space-y-2" role="group">
              {step === 0 ? (
                <>
                  <Choice pressed={callsManually === "Yes"} onClick={() => setCallsManually("Yes")}>
                    Haan
                  </Choice>
                  <Choice pressed={callsManually === "No"} onClick={() => setCallsManually("No")}>
                    Nahi
                  </Choice>
                </>
              ) : null}
              {step === 1
                ? LEAD_BUSINESSES.map((option) => (
                    <Choice
                      key={option}
                      pressed={businessType === option}
                      onClick={() => setBusinessType(option)}
                    >
                      {option}
                    </Choice>
                  ))
                : null}
              {step === 2
                ? TEAM_SIZES.map((option) => (
                    <Choice key={option} pressed={teamSize === option} onClick={() => setTeamSize(option)}>
                      {option}
                    </Choice>
                  ))
                : null}
              {step === 3 ? (
                <>
                  {CALL_PROBLEMS.map((option) => (
                    <Choice
                      key={option}
                      pressed={callProblem === option}
                      onClick={() => setCallProblem(option)}
                    >
                      {option}
                    </Choice>
                  ))}
                  {callProblem === "Other" ? (
                    <label className="block pt-2 text-sm">
                      <span className="mb-1 block font-medium">Apni problem likho</span>
                      <input
                        className={fieldClass}
                        value={problemNote}
                        onChange={(event) => setProblemNote(event.target.value)}
                      />
                    </label>
                  ) : null}
                </>
              ) : null}
              {step === 4 ? (
                <div className="space-y-4">
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium">Naam*</span>
                    <input
                      required
                      autoComplete="name"
                      className={fieldClass}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium">Phone / WhatsApp*</span>
                    <span className="flex overflow-hidden rounded-2xl border border-divider bg-background focus-within:outline focus-within:outline-2 focus-within:outline-primary">
                      <span className="grid place-items-center border-r border-divider px-3 text-base text-foreground-500">
                        +91
                      </span>
                      <input
                        required
                        autoComplete="tel-national"
                        className="w-full bg-transparent px-4 py-3 text-base outline-none"
                        inputMode="numeric"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </span>
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium">Email*</span>
                    <input
                      required
                      autoComplete="email"
                      className={fieldClass}
                      inputMode="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>
                </div>
              ) : null}
            </div>
            {error ? (
              <p className="mt-4 text-sm text-danger" role="alert">
                {error}
              </p>
            ) : null}
            <div className="mt-5 flex gap-3">
              {step > 0 ? (
                <button
                  className="min-h-12 rounded-2xl border border-white/15 px-4 text-sm font-medium"
                  type="button"
                  onClick={() => {
                    setError(null);
                    setStep((current) => Math.max(0, current - 1));
                  }}
                >
                  Peeche
                </button>
              ) : null}
              <button
                className="flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-primary px-5 text-base font-semibold text-primary-foreground disabled:opacity-60"
                disabled={submitting}
                type="submit"
              >
                {step < TOTAL_STEPS - 1 ? "Aage" : submitting ? "Sending..." : "Submit — hum call karenge"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
