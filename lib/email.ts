"use client";

import emailjs from "@emailjs/browser";

/**
 * Public EmailJS values last used by the contact form
 * (commit e2a7c2a, ".env.local", message "contact us is working now").
 * NEXT_PUBLIC_EMAILJS_* env vars override these when set.
 */
const DEFAULT_EMAILJS_SERVICE_ID = "service_vabfjoq";
const DEFAULT_EMAILJS_TEMPLATE_ID = "template_e77f419";
const DEFAULT_EMAILJS_PUBLIC_KEY = "_yeVXUswSMTPrJgDF";

export type PortfolioEmail = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function credential(envValue: string | undefined, fallback: string) {
  const value = envValue?.trim();

  return value || fallback;
}

export function emailjsConfig() {
  return {
    serviceId: credential(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      DEFAULT_EMAILJS_SERVICE_ID,
    ),
    templateId: credential(
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      DEFAULT_EMAILJS_TEMPLATE_ID,
    ),
    publicKey: credential(
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      DEFAULT_EMAILJS_PUBLIC_KEY,
    ),
  };
}

export async function sendPortfolioEmail(payload: PortfolioEmail) {
  const { serviceId, templateId, publicKey } = emailjsConfig();

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
  } catch {
    return { ok: false as const, reason: "failed" as const };
  }
}
