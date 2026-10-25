import type { Metadata } from "next";

import { BrandFrame } from "@/components/ai-automation/shell";
import { AUTOMATION_BRAND, BRAND_LOGO_PATH } from "@/lib/automation-brand";

export const dynamic = "force-static";

export const metadata: Metadata = {
  applicationName: AUTOMATION_BRAND.name,
  authors: [{ name: AUTOMATION_BRAND.name, url: AUTOMATION_BRAND.instagram }],
  creator: AUTOMATION_BRAND.name,
  publisher: AUTOMATION_BRAND.name,
  icons: {
    icon: [{ url: BRAND_LOGO_PATH, type: "image/webp", sizes: "512x512" }],
    apple: [{ url: BRAND_LOGO_PATH, type: "image/webp", sizes: "512x512" }],
    shortcut: BRAND_LOGO_PATH,
  },
};

export default function AutomationLayout({ children }: { children: React.ReactNode }) {
  return <BrandFrame>{children}</BrandFrame>;
}
