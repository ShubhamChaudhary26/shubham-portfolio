"use client";

import { FormEvent, useEffect, useState } from "react";

import { BrandMark } from "@/components/ai-automation/shell";
import { AUTOMATION_SERVICES, BUSINESS_TYPES, CALL_TIMES } from "@/data/ai-automation";
import { AUTOMATION_BRAND } from "@/lib/automation-brand";
import {
  formatLeadMessage,
  indianMobileDigits,
  leadSubject,
  normalizeLeadServices,
} from "@/lib/automation-lead";

const fieldClass =
  "w-full rounded-2xl border border-divider bg-background px-4 py-3 text-base outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";

type LeadFormProps = {
  pagePath: string;
  selectedBusiness: string;
  defaultBusinessType?: string;
  defaultServices?: string[];
};

export function LeadForm({
  pagePath,
  selectedBusiness,
  defaultBusinessType = "",
  defaultServices = [],
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState(defaultBusinessType);
  const [services, setServices] = useState<string[]>(defaultServices);
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [query, setQuery] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setQuery(window.location.search.replace(/^\?/, "").slice(0, 500));
  }, []);

  const toggleService = (service: string) => {
    setServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
    );
  };

  const submit = async () => {
    setError(null);

    const trimmedName = name.trim();
    const digits = indianMobileDigits(phone);

    if (trimmedName.length < 2) {
      setError("Naam likho.");

      return;
    }

    if (!digits) {
      setError("10 digit mobile number daalo.");

      return;
    }

    if (honeypot.trim()) {
      setSent(true);

      return;
    }

    const picked = normalizeLeadServices(services);
    const lead = {
      name: trimmedName,
      phone: `+91 ${digits}`,
      businessName: businessName.trim(),
      businessType,
      services: picked,
      city: city.trim(),
      message: message.trim(),
      bestTime,
      selectedBusiness,
      page: pagePath,
      query,
    };
    const subject = leadSubject(picked, pagePath);
    const body = formatLeadMessage(lead);

    setSubmitting(true);

    const [{ sendPortfolioEmail }, { sendFormSubmitLead }] = await Promise.all([
      import("@/lib/email"),
      import("@/lib/booking-fallback"),
    ]);
    const emailed = await sendPortfolioEmail({
      name: trimmedName,
      email: digits,
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

  return (
    <div className="rounded-3xl border border-divider bg-content1/90 p-5 shadow-[0_24px_70px_-46px_rgba(165,176,255,0.9)] md:p-8">
      <div className="flex flex-col items-center text-center">
        <BrandMark className="h-14 w-14 text-base" />
        <h2 className="mt-3 font-display text-2xl font-semibold">{AUTOMATION_BRAND.name}</h2>
        <p className="text-sm text-foreground-500">{AUTOMATION_BRAND.handle}</p>
      </div>
      {sent ? (
        <p className="mt-6 text-center text-lg leading-relaxed" role="status">
          Shukriya! Hum jaldi aapko call karenge.
        </p>
      ) : (
        <form
          className="relative mt-6 space-y-4"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
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
          <input name="source_page" type="hidden" value={pagePath} />
          <input name="selected_business" type="hidden" value={selectedBusiness} />
          <input name="utm" type="hidden" value={query} />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Name*</span>
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
          </div>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Business name</span>
            <input
              className={fieldClass}
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Business type</span>
            <select
              className={fieldClass}
              value={businessType}
              onChange={(event) => setBusinessType(event.target.value)}
            >
              <option value="">Select</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Services wanted</legend>
            <div className="flex flex-wrap gap-2">
              {AUTOMATION_SERVICES.map((service) => {
                const on = services.includes(service);

                return (
                  <button
                    key={service}
                    aria-pressed={on}
                    className={`min-h-11 rounded-full border px-3 text-sm font-medium motion-safe:transition-colors ${
                      on
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-divider bg-background"
                    }`}
                    type="button"
                    onClick={() => toggleService(service)}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">City</span>
            <input className={fieldClass} value={city} onChange={(event) => setCity(event.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Message (optional)</span>
            <textarea
              className={fieldClass}
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Best time to call</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {CALL_TIMES.map((time) => (
                <label
                  key={time}
                  className="flex min-h-12 items-center gap-2 rounded-2xl border border-divider bg-background px-3 text-sm"
                >
                  <input
                    checked={bestTime === time}
                    name="best_time"
                    type="radio"
                    value={time}
                    onChange={() => setBestTime(time)}
                  />
                  {time}
                </label>
              ))}
            </div>
          </fieldset>
          {error ? (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}
          <button
            className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-semibold text-primary-foreground disabled:opacity-60"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Sending..." : "Submit — hum call karenge"}
          </button>
        </form>
      )}
    </div>
  );
}
