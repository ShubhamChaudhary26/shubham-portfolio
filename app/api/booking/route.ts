import { NextResponse } from "next/server";

import { sendFormSubmitBooking, sendFormSubmitLead } from "@/lib/booking-fallback";
import {
  indianMobileDigits,
  isBusinessType,
  isCallTime,
  leadSubject,
  normalizeLeadServices,
} from "@/lib/automation-lead";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

type BookingBody = {
  intent?: unknown;
  name?: unknown;
  phone?: unknown;
  business?: unknown;
  businessName?: unknown;
  businessType?: unknown;
  services?: unknown;
  city?: unknown;
  message?: unknown;
  bestTime?: unknown;
  selectedBusiness?: unknown;
  query?: unknown;
  date?: unknown;
  time?: unknown;
  source?: unknown;
  page?: unknown;
  company_website?: unknown;
};

function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";

  return value.trim().slice(0, max);
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function cleanLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);

    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  return false;
}

export async function POST(request: Request) {
  let body: BookingBody;

  try {
    body = (await request.json()) as BookingBody;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  if (text(body.company_website, 200)) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, reason: "rate_limit" }, { status: 429 });
  }

  if (text(body.intent, 20) === "lead") {
    const name = cleanLine(text(body.name, 80));
    const digits = indianMobileDigits(text(body.phone, 40));
    const businessName = cleanLine(text(body.businessName, 120));
    const businessType = cleanLine(text(body.businessType, 80));
    const city = cleanLine(text(body.city, 80));
    const message = text(body.message, 2000).replace(/\r/g, "");
    const bestTime = cleanLine(text(body.bestTime, 20));
    const selectedBusiness = cleanLine(text(body.selectedBusiness, 80));
    const page = cleanLine(text(body.page, 200));
    const query = cleanLine(text(body.query, 500));
    const services = normalizeLeadServices(
      Array.isArray(body.services)
        ? body.services.filter((item): item is string => typeof item === "string")
        : [],
    );

    if (
      name.length < 2 ||
      !digits ||
      !isBusinessType(businessType) ||
      !isCallTime(bestTime) ||
      selectedBusiness.length < 2 ||
      !page.startsWith("/ai-automation")
    ) {
      return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
    }

    const lead = {
      name,
      phone: `+91 ${digits}`,
      businessName,
      businessType,
      services,
      city,
      message,
      bestTime,
      selectedBusiness,
      page,
      query,
      subject: leadSubject(services, page),
    };
    const upstream = await sendFormSubmitLead(lead);

    if (upstream.ok) {
      return NextResponse.json({
        ok: true,
        status: upstream.status,
        detail: upstream.detail,
      });
    }

    // eslint-disable-next-line no-console
    console.error("Lead fallback failed", upstream.status, upstream.detail);

    return NextResponse.json(
      {
        ok: false,
        reason: upstream.reason ?? "upstream",
        status: upstream.status,
        detail: upstream.detail,
      },
      { status: 502 },
    );
  }

  const name = text(body.name, 80);
  const phone = text(body.phone, 40);
  const digits = phone.replace(/\D/g, "");
  const business = text(body.business, 80);
  const date = text(body.date, 80);
  const time = text(body.time, 80);
  const source = text(body.source, 80);
  const page = text(body.page, 200);

  if (
    name.length < 2 ||
    digits.length < 10 ||
    digits.length > 15 ||
    business.length < 2 ||
    date.length < 4 ||
    time.length < 3 ||
    source.length < 2 ||
    page.length < 4
  ) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const upstream = await sendFormSubmitBooking({
    name,
    phone,
    business,
    date,
    time,
    source,
    page,
  });

  if (upstream.ok) {
    return NextResponse.json({
      ok: true,
      status: upstream.status,
      detail: upstream.detail,
    });
  }

  // eslint-disable-next-line no-console
  console.error("Booking fallback failed", upstream.status, upstream.detail);

  return NextResponse.json(
    {
      ok: false,
      reason: upstream.reason ?? "upstream",
      status: upstream.status,
      detail: upstream.detail,
    },
    { status: 502 },
  );
}
