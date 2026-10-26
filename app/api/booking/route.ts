import { after, NextResponse } from "next/server";

import { sendFormSubmitBooking, sendFormSubmitLead } from "@/lib/booking-fallback";
import {
  indianMobileDigits,
  isCallProblem,
  isEmail,
  isSubmittedLeadBusiness,
  isTeamSize,
  leadSubject,
  normalizeLeadServices,
} from "@/lib/automation-lead";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

type BookingBody = {
  intent?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  business?: unknown;
  businessName?: unknown;
  businessType?: unknown;
  services?: unknown;
  city?: unknown;
  message?: unknown;
  bestTime?: unknown;
  teamSize?: unknown;
  callsManually?: unknown;
  callProblem?: unknown;
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

function deliverInBackground(send: () => Promise<{ ok: boolean; status?: number; detail: string }>) {
  after(async () => {
    try {
      const upstream = await send();

      if (!upstream.ok) {
        // eslint-disable-next-line no-console
        console.error("FormSubmit background send failed", upstream.status, upstream.detail);

        return;
      }

      // eslint-disable-next-line no-console
      console.log("FormSubmit background send ok", upstream.status);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("FormSubmit background send failed", error);
    }
  });

  return NextResponse.json({ ok: true });
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
    const email = cleanLine(text(body.email, 120));
    const businessName = cleanLine(text(body.businessName, 120));
    const businessType = cleanLine(text(body.businessType, 80));
    const city = cleanLine(text(body.city, 80));
    const message = text(body.message, 500).replace(/\r/g, "");
    const bestTime = cleanLine(text(body.bestTime, 20));
    const teamSize = cleanLine(text(body.teamSize, 20));
    const callsManually = cleanLine(text(body.callsManually, 10));
    const callProblem = cleanLine(text(body.callProblem, 80));
    const selectedBusiness = cleanLine(text(body.selectedBusiness, 80));
    const page = cleanLine(text(body.page, 200));
    const query = cleanLine(text(body.query, 500));
    const services = normalizeLeadServices(
      Array.isArray(body.services)
        ? body.services.filter((item): item is string => typeof item === "string")
        : [],
    );
    const pageOk = page === "/" || page.startsWith("/ai-automation");
    const otherOk = callProblem !== "Other" || message.trim().length >= 2;

    if (
      name.length < 2 ||
      !digits ||
      !isEmail(email) ||
      !isSubmittedLeadBusiness(businessType) ||
      !isTeamSize(teamSize) ||
      callsManually !== "Yes" ||
      !isCallProblem(callProblem) ||
      !otherOk ||
      selectedBusiness.length < 2 ||
      !pageOk
    ) {
      return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
    }

    const lead = {
      name,
      phone: `+91 ${digits}`,
      email,
      businessName,
      businessType,
      services,
      city,
      message: message.trim(),
      bestTime,
      teamSize,
      callsManually,
      callProblem,
      selectedBusiness,
      page,
      query,
      subject: leadSubject(businessType, page),
    };

    return deliverInBackground(() => sendFormSubmitLead(lead));
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

  return deliverInBackground(() =>
    sendFormSubmitBooking({
      name,
      phone,
      business,
      date,
      time,
      source,
      page,
    }),
  );
}
