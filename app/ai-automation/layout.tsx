import type { Metadata } from "next";

import { AutomationFooter, AutomationHeader } from "@/components/ai-automation/shell";
import { AUTOMATION_BRAND } from "@/lib/automation-brand";

export const dynamic = "force-static";

export const metadata: Metadata = {
  applicationName: AUTOMATION_BRAND.name,
  authors: [{ name: AUTOMATION_BRAND.name, url: AUTOMATION_BRAND.instagram }],
  creator: AUTOMATION_BRAND.name,
  publisher: AUTOMATION_BRAND.name,
};

export default function AutomationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(165,176,255,0.16),transparent_52%)]"
      />
      <AutomationHeader />
      <main id="content">{children}</main>
      <AutomationFooter />
    </div>
  );
}
