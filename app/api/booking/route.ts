import { NextResponse } from "next/server";

import { DATA } from "@/data";

export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

type BookingBody = {
  name?: unknown;
  phone?: unknown;
  business?: unknown;
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

  const inbox = DATA.footer.contact.email;
  const message = [
    `Demo booking (${source})`,
    "",
    `Name: ${name}`,
    `Phone/WhatsApp: ${phone}`,
    `Business type: ${business}`,
    `Preferred date: ${date}`,
    `Time slot (IST): ${time}`,
    `Source: ${source}`,
    `Page: ${page}`,
  ].join("\n");

  try {
    const upstream = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email: inbox,
        phone,
        business,
        date,
        time,
        source,
        page,
        message,
        _subject: `Demo booking (${source})`,
        _template: "box",
        _captcha: "false",
      }),
      signal: AbortSignal.timeout(12000),
    });
    const detail = (await upstream.text()).slice(0, 500);
    let success = false;
    let activation = false;

    try {
      const parsed = JSON.parse(detail) as { success?: string | boolean; message?: string };

      success = parsed.success === true || parsed.success === "true";
      activation = /activat/i.test(parsed.message ?? "") || /activat/i.test(detail);
    } catch {
      success = false;
    }

    if (upstream.ok && success) {
      return NextResponse.json({ ok: true });
    }

    // eslint-disable-next-line no-console
    console.error("Booking fallback failed", upstream.status, detail);

    return NextResponse.json(
      {
        ok: false,
        reason: activation ? "activation" : "upstream",
        status: upstream.status,
        detail,
      },
      { status: 502 },
    );
  } catch (error) {
    const detail = error instanceof Error ? error.message : "failed";

    // eslint-disable-next-line no-console
    console.error("Booking fallback failed", detail);

    return NextResponse.json({ ok: false, reason: "upstream", detail }, { status: 502 });
  }
}
