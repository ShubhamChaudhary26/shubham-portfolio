import { formatLeadMessage, type LeadInput } from "@/lib/automation-lead";

const DEFAULT_FORMSUBMIT_ID = "15d820f7455ac5ff511b6f18cdd24024";
const FORMSUBMIT_TIMEOUT_MS = 60_000;

export function formSubmitId() {
  const fromEnv = process.env.NEXT_PUBLIC_FORMSUBMIT_ID?.trim();

  return fromEnv || DEFAULT_FORMSUBMIT_ID;
}

export function formSubmitEndpoint() {
  return `https://formsubmit.co/ajax/${formSubmitId()}`;
}

export type BookingFallbackInput = {
  name: string;
  phone: string;
  business: string;
  date: string;
  time: string;
  source: string;
  page: string;
};

export type BookingFallbackResult = {
  ok: boolean;
  status?: number;
  detail: string;
  reason?: "activation" | "upstream";
};

export async function sendFormSubmitLead(
  input: LeadInput & { subject: string },
): Promise<BookingFallbackResult> {
  const services = input.services.length ? input.services.join(", ") : "-";
  const message = formatLeadMessage(input);

  try {
    const response = await fetch(formSubmitEndpoint(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        phone: input.phone,
        email: input.email,
        business_name: input.businessName,
        business_type: input.businessType,
        team_size: input.teamSize,
        manual_calls: input.callsManually,
        call_problem: input.callProblem,
        services,
        city: input.city,
        message,
        best_time: input.bestTime,
        selected_business: input.selectedBusiness,
        page: input.page,
        query: input.query,
        _subject: input.subject,
        _template: "table",
        _captcha: false,
      }),
      signal: AbortSignal.timeout(FORMSUBMIT_TIMEOUT_MS),
    });
    const detail = (await response.text()).slice(0, 500);
    let success = false;
    let activation = false;

    try {
      const parsed = JSON.parse(detail) as { success?: string | boolean; message?: string };

      success = parsed.success === true || parsed.success === "true";
      activation = /activat/i.test(parsed.message ?? "");
    } catch {
      success = false;
    }

    if (response.ok && success) {
      return { ok: true, status: response.status, detail };
    }

    return {
      ok: false,
      status: response.status,
      detail,
      reason: activation ? "activation" : "upstream",
    };
  } catch (error) {
    return {
      ok: false,
      detail: error instanceof Error ? error.message : "failed",
      reason: "upstream",
    };
  }
}

export async function sendFormSubmitBooking(
  input: BookingFallbackInput,
): Promise<BookingFallbackResult> {
  const message = [
    `Demo booking (${input.source})`,
    "",
    `Name: ${input.name}`,
    `Phone/WhatsApp: ${input.phone}`,
    `Business type: ${input.business}`,
    `Preferred date: ${input.date}`,
    `Time slot (IST): ${input.time}`,
    `Source: ${input.source}`,
    `Page: ${input.page}`,
  ].join("\n");

  try {
    const response = await fetch(formSubmitEndpoint(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        phone: input.phone,
        business: input.business,
        date: input.date,
        time: input.time,
        source: input.source,
        page: input.page,
        message,
        _subject: `Demo booking (${input.source} / ${input.page})`,
        _template: "table",
        _captcha: false,
      }),
      signal: AbortSignal.timeout(FORMSUBMIT_TIMEOUT_MS),
    });
    const detail = (await response.text()).slice(0, 500);
    let success = false;
    let activation = false;

    try {
      const parsed = JSON.parse(detail) as { success?: string | boolean; message?: string };

      success = parsed.success === true || parsed.success === "true";
      activation = /activat/i.test(parsed.message ?? "");
    } catch {
      success = false;
    }

    if (response.ok && success) {
      return { ok: true, status: response.status, detail };
    }

    return {
      ok: false,
      status: response.status,
      detail,
      reason: activation ? "activation" : "upstream",
    };
  } catch (error) {
    return {
      ok: false,
      detail: error instanceof Error ? error.message : "failed",
      reason: "upstream",
    };
  }
}
