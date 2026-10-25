import type { Metadata } from "next";

import { BrandLogoProvider } from "@/components/ai-automation/brand-mark";
import { AutomationFooter, AutomationHeader } from "@/components/ai-automation/shell";
import { AUTOMATION_BRAND, BRAND_LOGO_PATH } from "@/lib/automation-brand";
import { publicFileExists } from "@/lib/automation-media";

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
  const logo = publicFileExists(BRAND_LOGO_PATH) ? BRAND_LOGO_PATH : null;

  return (
    <BrandLogoProvider src={logo}>
      <div className="relative min-h-screen bg-background text-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.12),transparent_46%),radial-gradient(ellipse_at_85%_0%,rgba(139,92,246,0.16),transparent_42%)]"
        />
        <AutomationHeader />
        <main id="content">{children}</main>
        <AutomationFooter />
      </div>
    </BrandLogoProvider>
  );
}
