import Link from "next/link";

import { BrandMark } from "@/components/ai-automation/brand-mark";
import { AUTOMATION_BRAND } from "@/lib/automation-brand";

const NAV = [
  { href: "/ai-automation", label: "AI Calling" },
  { href: "/ai-automation/ai-chatbot", label: "AI Chatbot" },
  { href: "/ai-automation/whatsapp-automation", label: "WhatsApp" },
];

export function AutomationHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-divider/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <Link className="flex min-w-0 items-center gap-3" href="/ai-automation">
          <BrandMark />
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-semibold">
              {AUTOMATION_BRAND.name}
            </span>
            <span className="block truncate text-sm text-foreground-500">{AUTOMATION_BRAND.handle}</span>
          </span>
        </Link>
        <nav aria-label="AI Automation" className="ml-auto flex flex-wrap gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-foreground-600 motion-safe:transition-colors hover:bg-content2 hover:text-foreground"
              href={item.href}
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
          <a
            className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-primary"
            href={AUTOMATION_BRAND.instagram}
            rel="noopener noreferrer"
            target="_blank"
          >
            {AUTOMATION_BRAND.handle}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function AutomationFooter() {
  return (
    <footer className="border-t border-divider px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <Link className="flex items-center gap-3" href="/ai-automation">
          <BrandMark />
          <span>
            <span className="block font-display text-lg font-semibold">{AUTOMATION_BRAND.name}</span>
            <span className="block text-sm text-foreground-500">{AUTOMATION_BRAND.handle}</span>
          </span>
        </Link>
        <nav aria-label="More services" className="flex flex-wrap gap-3 text-sm font-medium">
          {NAV.map((item) => (
            <Link key={item.href} className="text-foreground-600 hover:text-foreground" href={item.href}>
              {item.label}
            </Link>
          ))}
          <a
            className="text-primary"
            href={AUTOMATION_BRAND.instagram}
            rel="noopener noreferrer"
            target="_blank"
          >
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  );
}
