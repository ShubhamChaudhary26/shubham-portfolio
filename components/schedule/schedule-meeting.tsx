"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

import { DATA } from "@/data";
import { sendPortfolioEmail } from "@/lib/email";
import { validateEmail } from "@/lib/utils";
import {
  BOOKING_EMBED_URL,
  BOOKING_TIMEZONE,
  Slot,
  Ymd,
  buildCalendarInvite,
  buildSlots,
  daysInMonth,
  formatLongDate,
  formatTime,
  getIstYmd,
  isSlotBookable,
  isWeekday,
  istWeekdayIndex,
  monthLabel,
  parseYmdKey,
  shiftMonth,
  ymdKey,
  ymdValue,
} from "@/lib/booking";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Step = "date" | "time" | "details" | "done";

type Confirmation = {
  googleUrl: string;
  ics: string;
  mailto: string;
  emailSent: boolean;
  emailNote: string;
  start: Date;
};

const stepIndex: Record<Step, number> = {
  date: 0,
  time: 1,
  details: 2,
  done: 3,
};

export const ScheduleMeeting = () => {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [today, setToday] = useState<Ymd>({ year: 2026, month: 1, day: 1 });
  const [visibleMonth, setVisibleMonth] = useState<Ymd>({
    year: 2026,
    month: 1,
    day: 1,
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("date");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [localTimeZone, setLocalTimeZone] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const maxMonth = shiftMonth(today, 5);

  useEffect(() => {
    const now = getIstYmd();

    setToday(now);
    setVisibleMonth({ year: now.year, month: now.month, day: 1 });
    setLocalTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setReady(true);
  }, []);
  const slots = useMemo(() => {
    if (!selectedDate) return [];

    return buildSlots(parseYmdKey(selectedDate));
  }, [selectedDate]);

  const activeSlot = slots.find((slot) => slot.start.toISOString() === selectedSlot) ?? null;

  const cells = useMemo(() => {
    const leading = istWeekdayIndex({ ...visibleMonth, day: 1 });
    const count = daysInMonth(visibleMonth.year, visibleMonth.month);
    const days = Array.from({ length: count }, (_, index) => index + 1);

    return [...Array.from({ length: leading }, () => null), ...days];
  }, [visibleMonth]);

  const revealLocalZone = () => {
    if (!localTimeZone) {
      setLocalTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
  };

  const selectDate = (key: string) => {
    setSelectedDate(key);
    setSelectedSlot(null);
    setError(null);
    setStep("time");
    revealLocalZone();
  };

  const submitDetails = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!activeSlot) {
      setError("Choose a time slot first.");
      setStep("time");

      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPurpose = purpose.trim();

    if (trimmedName.length < 2) {
      setError("Please enter your name.");

      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");

      return;
    }

    if (trimmedPurpose.length < 10) {
      setError("Add a short note about the meeting (at least 10 characters).");

      return;
    }

    setSubmitting(true);

    const invite = buildCalendarInvite({
      name: trimmedName,
      email: trimmedEmail,
      purpose: trimmedPurpose,
      start: activeSlot.start,
      end: activeSlot.end,
    });

    const when = `${formatLongDate(activeSlot.start, BOOKING_TIMEZONE)} · ${formatTime(activeSlot.start, BOOKING_TIMEZONE)}–${formatTime(activeSlot.end, BOOKING_TIMEZONE)} IST`;
    const emailResult = await sendPortfolioEmail({
      name: trimmedName,
      email: trimmedEmail,
      subject: `Meeting request: ${trimmedName}`,
      message: `${invite.details}\n\nWhen: ${when}\nGoogle Calendar: ${invite.googleUrl}`,
    });

    let emailSent = false;
    let emailNote =
      "Email delivery is not configured on this site yet. Add the event to Google Calendar so Shubham receives the invite, or email the details directly.";

    if (emailResult.ok) {
      emailSent = true;
      emailNote =
        "A copy of this request was also sent through the site contact email.";
    } else if (emailResult.reason === "failed") {
      emailNote =
        "The contact email could not be sent. Add the event to Google Calendar so Shubham still receives the invite.";
    }

    setConfirmation({
      googleUrl: invite.googleUrl,
      ics: invite.ics,
      mailto: invite.mailto,
      emailSent,
      emailNote,
      start: activeSlot.start,
    });
    setStep("done");
    setSubmitting(false);
  };

  const downloadIcs = () => {
    if (!confirmation) return;

    const blob = new Blob([confirmation.ics], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "meeting-with-shubham.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setName("");
    setEmail("");
    setPurpose("");
    setError(null);
    setConfirmation(null);
    setStep("date");
  };

  if (BOOKING_EMBED_URL) {
    return (
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Booking
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {DATA.booking.heading}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground-500 md:text-lg">
            Choose a time below. This calendar uses the same type and colours as the rest of the site.
          </p>
        </header>
        <div className="overflow-hidden rounded-3xl border border-divider bg-content1 shadow-sm">
          <iframe
            className="h-[760px] w-full bg-content1"
            src={BOOKING_EMBED_URL}
            title="Schedule a meeting"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Booking
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
          {DATA.booking.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-500 md:text-lg">
          {DATA.booking.description}
        </p>
      </header>

      <ol className="mb-6 grid grid-cols-4 gap-2 text-center text-xs font-medium text-foreground-500">
        {["Date", "Time", "Details", "Done"].map((label, index) => {
          const active = stepIndex[step] === index;
          const complete = stepIndex[step] > index;

          return (
            <li
              key={label}
              className={`rounded-full border px-2 py-2 ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : complete
                    ? "border-primary/30 text-foreground"
                    : "border-divider"
              }`}
            >
              {label}
            </li>
          );
        })}
      </ol>

      <div className="rounded-3xl border border-divider bg-content1/80 p-4 shadow-sm sm:p-8">
        <AnimatePresence mode="wait">
          {step === "date" && !ready && (
            <div className="h-80 animate-pulse rounded-3xl bg-content2/70" />
          )}

          {step === "date" && ready && (
            <motion.div
              key="date"
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold">
                  {monthLabel(visibleMonth)}
                </h2>
                <div className="flex gap-2">
                  <IconButton
                    disabled={ymdValue(visibleMonth) <= ymdValue({ ...today, day: 1 })}
                    label="Previous month"
                    onClick={() => setVisibleMonth((current) => shiftMonth(current, -1))}
                  >
                    <Icon icon="lucide:chevron-left" />
                  </IconButton>
                  <IconButton
                    disabled={ymdValue(visibleMonth) >= ymdValue(maxMonth)}
                    label="Next month"
                    onClick={() => setVisibleMonth((current) => shiftMonth(current, 1))}
                  >
                    <Icon icon="lucide:chevron-right" />
                  </IconButton>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-foreground-400">
                {WEEKDAYS.map((day) => (
                  <div key={day} className="py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} />;
                  }

                  const date = {
                    year: visibleMonth.year,
                    month: visibleMonth.month,
                    day,
                  };
                  const key = ymdKey(date);
                  const past = ymdValue(date) < ymdValue(today);
                  const weekend = !isWeekday(date);
                  const disabled = past || weekend;
                  const selected = selectedDate === key;

                  return (
                    <button
                      key={key}
                      aria-label={`${day} ${monthLabel(visibleMonth)}`}
                      aria-pressed={selected}
                      className={`aspect-square rounded-2xl text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:text-foreground-300 ${
                        selected
                          ? "bg-primary font-semibold text-primary-foreground"
                          : "hover:bg-content2"
                      }`}
                      disabled={disabled}
                      type="button"
                      onClick={() => selectDate(key)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-foreground-500">
                Weekdays only. Times are India Standard Time, 10:00 to 19:00.
              </p>
            </motion.div>
          )}

          {step === "time" && selectedDate && (
            <motion.div
              key="time"
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-semibold">Pick a time</h2>
                <button
                  className="text-sm text-primary"
                  type="button"
                  onClick={() => setStep("date")}
                >
                  Change date
                </button>
              </div>
              <p className="mb-4 text-sm text-foreground-500">
                {formatLongDate(
                  buildSlots(parseYmdKey(selectedDate))[0]?.start ??
                    new Date(),
                  BOOKING_TIMEZONE,
                )}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.map((slot) => (
                  <SlotButton
                    key={slot.start.toISOString()}
                    bookable={isSlotBookable(slot)}
                    localTimeZone={localTimeZone}
                    selected={selectedSlot === slot.start.toISOString()}
                    slot={slot}
                    onSelect={() => {
                      setSelectedSlot(slot.start.toISOString());
                      setError(null);
                      revealLocalZone();
                    }}
                  />
                ))}
              </div>
              {slots.every((slot) => !isSlotBookable(slot)) ? (
                <p className="mt-4 text-sm text-foreground-500">
                  No times left on this day. Choose another date.
                </p>
              ) : null}
              {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
              <div className="mt-6 flex justify-end">
                <Button
                  color="primary"
                  isDisabled={!activeSlot}
                  onPress={() => {
                    if (!activeSlot || !isSlotBookable(activeSlot)) {
                      setError("Choose an open time slot.");

                      return;
                    }
                    setStep("details");
                  }}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === "details" && activeSlot && (
            <motion.form
              key="details"
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              onSubmit={submitDetails}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-semibold">Your details</h2>
                  <p className="mt-1 text-sm text-foreground-500">
                    {formatLongDate(activeSlot.start, BOOKING_TIMEZONE)} ·{" "}
                    {formatTime(activeSlot.start, BOOKING_TIMEZONE)} IST
                    {localTimeZone && localTimeZone !== BOOKING_TIMEZONE
                      ? ` · ${formatTime(activeSlot.start, localTimeZone)} your time`
                      : ""}
                  </p>
                </div>
                <button
                  className="text-sm text-primary"
                  type="button"
                  onClick={() => setStep("time")}
                >
                  Change time
                </button>
              </div>
              <label className="block text-sm">
                <span className="mb-1 block text-foreground-600">Name</span>
                <input
                  required
                  autoComplete="name"
                  className="w-full rounded-2xl border border-divider bg-background px-4 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-foreground-600">Email</span>
                <input
                  required
                  autoComplete="email"
                  className="w-full rounded-2xl border border-divider bg-background px-4 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-foreground-600">
                  What is this meeting about?
                </span>
                <textarea
                  required
                  className="min-h-28 w-full rounded-2xl border border-divider bg-background px-4 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  value={purpose}
                  onChange={(event) => setPurpose(event.target.value)}
                />
              </label>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button
                className="w-full sm:w-auto"
                color="primary"
                isLoading={submitting}
                type="submit"
              >
                Confirm meeting
              </Button>
            </motion.form>
          )}

          {step === "done" && confirmation && activeSlot && (
            <motion.div
              key="done"
              animate={{ opacity: 1, y: 0 }}
              aria-live="polite"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" icon="lucide:check" />
              </div>
              <h2 className="font-display text-3xl font-semibold">You are booked</h2>
              <p className="mt-3 text-foreground-500">
                {formatLongDate(confirmation.start, BOOKING_TIMEZONE)} ·{" "}
                {formatTime(activeSlot.start, BOOKING_TIMEZONE)}–
                {formatTime(activeSlot.end, BOOKING_TIMEZONE)} IST
                {localTimeZone && localTimeZone !== BOOKING_TIMEZONE
                  ? ` (${formatTime(activeSlot.start, localTimeZone)}–${formatTime(activeSlot.end, localTimeZone)} ${localTimeZone})`
                  : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-600">
                {confirmation.emailNote} Shubham is included as{" "}
                <span className="font-medium">{DATA.booking.guestEmail}</span>.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  as="a"
                  color="primary"
                  href={confirmation.googleUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Add to Google Calendar
                </Button>
                <Button variant="bordered" onPress={downloadIcs}>
                  Download .ics
                </Button>
                <Button
                  as="a"
                  href={confirmation.mailto}
                  variant="light"
                >
                  Email the details
                </Button>
              </div>
              <button
                className="mt-6 text-sm text-primary"
                type="button"
                onClick={reset}
              >
                Schedule another time
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function IconButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-divider disabled:opacity-40"
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SlotButton({
  slot,
  selected,
  bookable,
  localTimeZone,
  onSelect,
}: {
  slot: Slot;
  selected: boolean;
  bookable: boolean;
  localTimeZone: string | null;
  onSelect: () => void;
}) {
  const showLocal = Boolean(localTimeZone && localTimeZone !== BOOKING_TIMEZONE);

  return (
    <button
      aria-pressed={selected}
      className={`rounded-2xl border px-3 py-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 ${
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-divider hover:border-primary/40"
      }`}
      disabled={!bookable}
      type="button"
      onClick={onSelect}
    >
      <span className="block font-medium">
        {formatTime(slot.start, BOOKING_TIMEZONE)} IST
      </span>
      {showLocal ? (
        <span className={`mt-0.5 block text-[11px] ${selected ? "opacity-80" : "text-foreground-400"}`}>
          {formatTime(slot.start, localTimeZone as string)} your time
        </span>
      ) : null}
    </button>
  );
}
