"use client";

import { Button } from "@heroui/react";
import { FormEvent, useEffect, useState } from "react";

import { DATA } from "@/data";
import {
  BOOKING_TIMEZONE,
  Slot,
  buildSlots,
  formatLongDate,
  formatTime,
  getIstYmd,
  isSlotBookable,
  isWeekday,
  parseYmdKey,
  ymdKey,
  ymdValue,
} from "@/lib/booking";
import { sendPortfolioEmail } from "@/lib/email";
import { SITE_URL } from "@/lib/site";

const DEFAULT_BUSINESS_TYPES = [
  { value: "kirana", label: "Kirana" },
  { value: "dairy", label: "Dairy" },
  { value: "other", label: "Other" },
] as const;

const fieldClass =
  "w-full rounded-2xl border border-divider bg-background px-4 py-3 text-base outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";

const secondaryClass =
  "inline-flex min-h-11 items-center justify-center rounded-2xl border border-divider px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40";

type BlogBookingCTAProps = {
  slug: string;
  heading?: string;
  source?: string;
  pagePath?: string;
  businessTypes?: readonly { value: string; label: string }[];
};

function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function BlogBookingCTA({
  slug,
  heading = "Free demo meeting book karo",
  source,
  pagePath,
  businessTypes = DEFAULT_BUSINESS_TYPES,
}: BlogBookingCTAProps) {
  const emailAddress = DATA.footer.contact.email;
  const bookingSource = source ?? `blog: ${slug}`;
  const bookingPath = pagePath ?? `/blog/${slug}`;
  const whatsAppNumber = phoneDigits(DATA.footer.contact.phone);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [otherBusiness, setOtherBusiness] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deliveryFailed, setDeliveryFailed] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(ymdKey(getIstYmd()));
  }, []);
  const selectedSlot = slots.find((slot) => slot.start.toISOString() === time) ?? null;
  const businessLabel =
    businessType === "other" ? otherBusiness.trim() : businessType;

  const loadSlots = (value: string) => {
    setDate(value);
    setTime("");
    setError(null);

    if (!value) {
      setSlots([]);

      return;
    }

    const ymd = parseYmdKey(value);

    if (!isWeekday(ymd)) {
      setSlots([]);
      setError("Weekdays only, Monday to Friday.");

      return;
    }

    if (ymdValue(ymd) < ymdValue(getIstYmd())) {
      setSlots([]);
      setError("Pick today or a later date.");

      return;
    }

    const nextSlots = buildSlots(ymd).filter((slot) => isSlotBookable(slot));

    setSlots(nextSlots);

    if (nextSlots.length === 0) {
      setError("No slots left on that day. Pick another weekday.");
    }
  };

  const submit = async () => {
    setError(null);
    setDeliveryFailed(false);

    const trimmedName = name.trim();
    const digits = phoneDigits(phone);

    if (trimmedName.length < 2) {
      setDeliveryFailed(false);
      setError("Please enter your name.");

      return;
    }

    if (digits.length < 10) {
      setDeliveryFailed(false);
      setError("Please enter a phone or WhatsApp number.");

      return;
    }

    if (!businessLabel || businessLabel.length < 2) {
      setDeliveryFailed(false);
      setError("Please choose a business type.");

      return;
    }

    if (!selectedSlot) {
      setDeliveryFailed(false);
      setError("Please choose a weekday and an IST time slot.");

      return;
    }

    const dateLabel = formatLongDate(selectedSlot.start, BOOKING_TIMEZONE);
    const startLabel = formatTime(selectedSlot.start, BOOKING_TIMEZONE);
    const endLabel = formatTime(selectedSlot.end, BOOKING_TIMEZONE);

    setSubmitting(true);

    const result = await sendPortfolioEmail({
      name: trimmedName,
      email: digits,
      subject: `Demo booking (${bookingSource})`,
      message: [
        `Demo booking (${bookingSource})`,
        "",
        `Name: ${trimmedName}`,
        `Phone/WhatsApp: ${phone.trim()}`,
        `Business type: ${businessLabel}`,
        `Preferred date: ${dateLabel}`,
        `Time slot (IST, ${BOOKING_TIMEZONE}): ${startLabel} – ${endLabel}`,
        `Source: ${bookingSource}`,
        `Page: ${SITE_URL}${bookingPath}`,
      ].join("\n"),
    });

    if (!result.ok) {
      // eslint-disable-next-line no-console
      console.error("EmailJS booking failed", result.status, result.detail);

      try {
        const fallback = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: trimmedName,
            phone: phone.trim(),
            business: businessLabel,
            date: dateLabel,
            time: `${startLabel} – ${endLabel}`,
            source: bookingSource,
            page: `${SITE_URL}${bookingPath}`,
            company_website: honeypot,
          }),
        });
        const fallbackBody = (await fallback.json().catch(() => null)) as {
          detail?: string;
          reason?: string;
        } | null;

        if (!fallback.ok) {
          // eslint-disable-next-line no-console
          console.error(
            "Booking fallback failed",
            fallback.status,
            fallbackBody?.reason,
            fallbackBody?.detail,
          );
          setSubmitting(false);
          setDeliveryFailed(true);
          setError(
            "The booking did not go through. Email Shubham or send an Instagram DM with your name, phone, and time slot.",
          );

          return;
        }
      } catch (fallbackError) {
        // eslint-disable-next-line no-console
        console.error("Booking fallback failed", fallbackError);
        setSubmitting(false);
        setDeliveryFailed(true);
        setError(
          "The booking did not go through. Email Shubham or send an Instagram DM with your name, phone, and time slot.",
        );

        return;
      }
    }

    setSubmitting(false);
    setDeliveryFailed(false);
    setSent(true);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void submit();
  };

  return (
    <section className="rounded-3xl border border-divider bg-content1/90 p-5 shadow-sm md:p-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {heading}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-foreground-500">
        Weekday slots, 10:00 to 19:00 IST. Shubham gets the request by email and
        will reply on your phone or WhatsApp.
      </p>

      {sent && selectedSlot ? (
        <p className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-base leading-relaxed text-foreground">
          Request mil gaya. Shubham aapko {phone.trim()} pe contact karega.{" "}
          {formatLongDate(selectedSlot.start, BOOKING_TIMEZONE)},{" "}
          {formatTime(selectedSlot.start, BOOKING_TIMEZONE)} IST.
        </p>
      ) : (
        <form className="relative mt-6 space-y-4" onSubmit={onSubmit}>
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
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-foreground-600">Name</span>
              <input
                required
                autoComplete="name"
                className={fieldClass}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-foreground-600">Phone / WhatsApp</span>
              <input
                required
                autoComplete="tel"
                className={fieldClass}
                inputMode="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="mb-1 block text-foreground-600">Business type</span>
            <select
              required
              className={fieldClass}
              value={businessType}
              onChange={(event) => setBusinessType(event.target.value)}
            >
              <option value="">Select</option>
              {businessTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          {businessType === "other" ? (
            <label className="block text-sm">
              <span className="mb-1 block text-foreground-600">Which business?</span>
              <input
                required
                className={fieldClass}
                value={otherBusiness}
                onChange={(event) => setOtherBusiness(event.target.value)}
              />
            </label>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-foreground-600">Preferred date</span>
              <input
                required
                className={fieldClass}
                min={minDate}
                type="date"
                value={date}
                onChange={(event) => loadSlots(event.target.value)}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-foreground-600">Time slot (IST)</span>
              <select
                required
                className={fieldClass}
                disabled={slots.length === 0}
                value={time}
                onChange={(event) => setTime(event.target.value)}
              >
                <option value="">Select a slot</option>
                {slots.map((slot) => (
                  <option key={slot.start.toISOString()} value={slot.start.toISOString()}>
                    {formatTime(slot.start, BOOKING_TIMEZONE)} –{" "}
                    {formatTime(slot.end, BOOKING_TIMEZONE)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error ? (
            <div className="text-sm text-danger" role="alert">
              <p>{error}</p>
              {deliveryFailed ? (
                <p className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <a className={secondaryClass} href={`mailto:${emailAddress}`}>
                    Email {emailAddress}
                  </a>
                  <a
                    className={secondaryClass}
                    href="https://ig.me/m/aiautomation.hindi"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Instagram DM
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="w-full sm:w-auto"
              color="primary"
              isDisabled={submitting}
              isLoading={submitting}
              type="submit"
            >
              Book demo meeting
            </Button>
            {error ? (
              <Button
                className="w-full sm:w-auto"
                isDisabled={submitting}
                type="button"
                variant="bordered"
                onPress={() => {
                  void submit();
                }}
              >
                Try again
              </Button>
            ) : null}
          </div>
        </form>
      )}

      <div className="mt-6 flex flex-col gap-3 border-t border-divider pt-6 sm:flex-row sm:flex-wrap">
        <a
          className={secondaryClass}
          href="https://ig.me/m/aiautomation.hindi"
          rel="noopener noreferrer"
          target="_blank"
        >
          Instagram DM
        </a>
        <a className={secondaryClass} href={`mailto:${emailAddress}`}>
          {emailAddress}
        </a>
        {whatsAppNumber ? (
          <a
            className={secondaryClass}
            href={`https://wa.me/${whatsAppNumber}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        ) : null}
      </div>
    </section>
  );
}
