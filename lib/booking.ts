import { DATA } from "@/data";
import { SITE_URL } from "@/lib/site";

/**
 * Point this at a Cal.com or Calendly URL to replace the custom scheduler
 * with an embed. Leave it empty to use the built-in booking form.
 *
 * Set NEXT_PUBLIC_BOOKING_EMBED_URL in the environment (Vercel or .env.local).
 */
export const BOOKING_EMBED_URL = (
  process.env.NEXT_PUBLIC_BOOKING_EMBED_URL || ""
).trim();

export const BOOKING_TIMEZONE = DATA.booking.timezone;

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

export type Slot = {
  start: Date;
  end: Date;
};

export type Ymd = {
  year: number;
  month: number;
  day: number;
};

export function istDateTime(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
) {
  return new Date(
    Date.UTC(year, month - 1, day, hour, minute) - IST_OFFSET_MS,
  );
}

export function getIstYmd(date = new Date()): Ymd {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
  };
}

export function ymdValue(date: Ymd) {
  return date.year * 10000 + date.month * 100 + date.day;
}

export function ymdKey(date: Ymd) {
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

export function parseYmdKey(key: string): Ymd {
  const [year, month, day] = key.split("-").map(Number);

  return { year, month, day };
}

export function istWeekdayIndex(date: Ymd) {
  const noon = istDateTime(date.year, date.month, date.day, 12, 0);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TIMEZONE,
    weekday: "short",
  }).format(noon);

  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
}

export function daysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function shiftMonth(date: Ymd, delta: number): Ymd {
  const index = date.year * 12 + (date.month - 1) + delta;

  return {
    year: Math.floor(index / 12),
    month: (index % 12) + 1,
    day: 1,
  };
}

export function isWeekday(date: Ymd) {
  const index = istWeekdayIndex(date);

  return index >= 1 && index <= 5;
}

export function buildSlots(date: Ymd): Slot[] {
  const { workStartHour, workEndHour, slotMinutes } = DATA.booking;
  const slots: Slot[] = [];
  const startMinutes = workStartHour * 60;
  const endMinutes = workEndHour * 60;

  for (let cursor = startMinutes; cursor + slotMinutes <= endMinutes; cursor += slotMinutes) {
    const hour = Math.floor(cursor / 60);
    const minute = cursor % 60;
    const start = istDateTime(date.year, date.month, date.day, hour, minute);
    const end = new Date(start.getTime() + slotMinutes * 60 * 1000);

    slots.push({ start, end });
  }

  return slots;
}

export function isSlotBookable(slot: Slot, now = new Date()) {
  return slot.start.getTime() > now.getTime() + 30 * 60 * 1000;
}

export function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);
}

export function formatLongDate(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(date);
}

export function monthLabel(date: Ymd) {
  const anchor = istDateTime(date.year, date.month, 1, 12, 0);

  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: BOOKING_TIMEZONE,
  }).format(anchor);
}

function toCalendarUtc(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function icsEscape(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildCalendarInvite(input: {
  name: string;
  email: string;
  purpose: string;
  start: Date;
  end: Date;
}) {
  const title = `Meeting with ${DATA.booking.hostName}`;
  const details = [
    `Purpose: ${input.purpose}`,
    `Booked by: ${input.name} (${input.email})`,
    `Offered hours are weekdays 10:00–19:00 India Standard Time (${BOOKING_TIMEZONE}).`,
    `Portfolio: ${SITE_URL}/schedule`,
  ].join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toCalendarUtc(input.start)}/${toCalendarUtc(input.end)}`,
    details,
    location: "Online call",
    add: DATA.booking.guestEmail,
    ctz: BOOKING_TIMEZONE,
  });

  const googleUrl = `https://calendar.google.com/calendar/render?${params.toString()}`;
  const uid = `${input.start.getTime()}-${input.email.replace(/[^a-z0-9]/gi, "")}@shubh.work`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//shubh.work//Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toCalendarUtc(new Date())}`,
    `DTSTART:${toCalendarUtc(input.start)}`,
    `DTEND:${toCalendarUtc(input.end)}`,
    `SUMMARY:${icsEscape(title)}`,
    `DESCRIPTION:${icsEscape(details)}`,
    "LOCATION:Online call",
    `ORGANIZER;CN=${icsEscape(DATA.booking.hostName)}:mailto:${DATA.booking.guestEmail}`,
    `ATTENDEE;CN=${icsEscape(DATA.booking.hostName)};RSVP=TRUE:mailto:${DATA.booking.guestEmail}`,
    `ATTENDEE;CN=${icsEscape(input.name)};RSVP=TRUE:mailto:${input.email}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  const mailto = `mailto:${DATA.booking.guestEmail}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(details)}`;

  return { googleUrl, ics, title, details, mailto };
}
