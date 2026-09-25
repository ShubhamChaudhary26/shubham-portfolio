import { DATA } from "@/data";

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
