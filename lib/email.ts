"use client";

import emailjs from "@emailjs/browser";

export type PortfolioEmail = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function isEmailConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  );
}

export async function sendPortfolioEmail(payload: PortfolioEmail) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return { ok: false as const, reason: "unconfigured" as const };
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
      },
      publicKey,
    );

    return { ok: true as const };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email.";

    return { ok: false as const, reason: "failed" as const, message };
  }
}
