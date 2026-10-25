import {
  AUTOMATION_SERVICES,
  BUSINESS_TYPES,
  CALL_PROBLEMS,
  CALL_TIMES,
  TEAM_SIZES,
} from "@/data/ai-automation";
import { SITE_URL } from "@/lib/site";

export type LeadInput = {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  businessType: string;
  services: string[];
  city: string;
  message: string;
  bestTime: string;
  teamSize: string;
  callsManually: string;
  callProblem: string;
  selectedBusiness: string;
  page: string;
  query: string;
};

export function leadSubject(businessType: string, page: string) {
  const label = businessType || "General";

  return `AI Automation lead (${label} / ${page})`;
}

export function formatLeadMessage(input: LeadInput) {
  const pageUrl = input.page.startsWith("http") ? input.page : `${SITE_URL}${input.page}`;
  const problem =
    input.callProblem === "Other" && input.message
      ? `${input.callProblem}: ${input.message}`
      : input.callProblem || "-";

  return [
    leadSubject(input.businessType, input.page),
    "",
    `Name: ${input.name}`,
    `Phone/WhatsApp: ${input.phone}`,
    `Email: ${input.email || "-"}`,
    `Business type: ${input.businessType || "-"}`,
    `Team size: ${input.teamSize || "-"}`,
    `Manual customer calls: ${input.callsManually || "-"}`,
    `Biggest call problem: ${problem}`,
    `Selected business: ${input.selectedBusiness || "-"}`,
    `Source page: ${pageUrl}`,
    `UTM / igsh: ${input.query || "-"}`,
  ].join("\n");
}

export function isEmail(value: string) {
  return value.length <= 120 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** A listed type, or the name typed when the form choice is Other. */
export function isSubmittedLeadBusiness(value: string) {
  return value.length >= 2 && value.length <= 80;
}

export function isTeamSize(value: string) {
  return (TEAM_SIZES as readonly string[]).includes(value);
}

export function isCallProblem(value: string) {
  return (CALL_PROBLEMS as readonly string[]).includes(value);
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
