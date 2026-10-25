import { AUTOMATION_SERVICES, BUSINESS_TYPES, CALL_TIMES } from "@/data/ai-automation";
import { SITE_URL } from "@/lib/site";

export type LeadInput = {
  name: string;
  phone: string;
  businessName: string;
  businessType: string;
  services: string[];
  city: string;
  message: string;
  bestTime: string;
  selectedBusiness: string;
  page: string;
  query: string;
};

export function leadSubject(services: string[], page: string) {
  const service = services.length > 0 ? services.join(", ") : "General";

  return `AI Automation lead (${service} / ${page})`;
}

export function formatLeadMessage(input: LeadInput) {
  const pageUrl = input.page.startsWith("http") ? input.page : `${SITE_URL}${input.page}`;

  return [
    leadSubject(input.services, input.page),
    "",
    `Name: ${input.name}`,
    `Phone/WhatsApp: ${input.phone}`,
    `Business name: ${input.businessName || "-"}`,
    `Business type: ${input.businessType || "-"}`,
    `Services wanted: ${input.services.length ? input.services.join(", ") : "-"}`,
    `City: ${input.city || "-"}`,
    `Message: ${input.message || "-"}`,
    `Best time to call: ${input.bestTime || "-"}`,
    `Selected business: ${input.selectedBusiness || "-"}`,
    `Source page: ${pageUrl}`,
    `UTM / igsh: ${input.query || "-"}`,
  ].join("\n");
}

export function indianMobileDigits(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);

  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function normalizeLeadServices(value: readonly string[]) {
  const allowed = new Set<string>(AUTOMATION_SERVICES);

  return value.filter((item, index) => allowed.has(item) && value.indexOf(item) === index);
}

export function isBusinessType(value: string) {
  return value === "" || (BUSINESS_TYPES as readonly string[]).includes(value);
}

export function isCallTime(value: string) {
  return value === "" || (CALL_TIMES as readonly string[]).includes(value);
}
