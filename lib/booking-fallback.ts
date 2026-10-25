import { DATA } from "@/data";

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

export async function sendFormSubmitBooking(
  input: BookingFallbackInput,
): Promise<BookingFallbackResult> {
  const inbox = DATA.footer.contact.email;
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
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          email: inbox,
          phone: input.phone,
          business: input.business,
          date: input.date,
          time: input.time,
          source: input.source,
          page: input.page,
          message,
          _subject: `Demo booking (${input.source})`,
          _template: "box",
          _captcha: "false",
        }),
        signal: AbortSignal.timeout(12000),
      },
    );
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
