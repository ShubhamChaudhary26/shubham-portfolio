import type { ReactNode } from "react";

import Link from "next/link";

import { BrandLogoProvider, BrandMark } from "@/components/ai-automation/brand-mark";
import { AUTOMATION_BRAND, BRAND_LOGO_PATH } from "@/lib/automation-brand";
import { publicFileExists } from "@/lib/automation-media";

const NAV = [
  { href: "/ai-automation", label: "AI Calling" },
  { href: "/ai-automation/ai-chatbot", label: "AI Chatbot" },
  { href: "/ai-automation/whatsapp-automation", label: "WhatsApp" },
];

function NavLinks({ className }: { className: string }) {
  return (
    <>
      {NAV.map((item) => (
        <Link
          key={item.href}
          className={className}
          href={item.href}
          prefetch={false}
        >
          {item.label}
        </Link>
      ))}
      <a
        className={className}
        href={AUTOMATION_BRAND.instagram}
        rel="noopener noreferrer"
        target="_blank"
      >
        {AUTOMATION_BRAND.handle}
      </a>
    </>
  );
}

export function AutomationHeader() {
  const itemClass =
    "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-foreground-600 motion-safe:transition-colors hover:bg-content2 hover:text-foreground";

  return (
    <header className="sticky top-0 z-40 border-b border-divider/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5">
        <Link className="flex min-w-0 flex-1 items-center gap-2.5" href="/">
          <BrandMark className="h-10 w-10 sm:h-11 sm:w-11" />
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-semibold leading-tight">
              {AUTOMATION_BRAND.name}
            </span>
            <span className="block truncate text-xs text-foreground-500 sm:text-sm">
              {AUTOMATION_BRAND.handle}
            </span>
          </span>
        </Link>
        <nav aria-label="AI Automation" className="ml-auto hidden items-center gap-1 md:flex">
          <NavLinks className={itemClass} />
        </nav>
        <details className="relative md:hidden">
          <summary
            aria-label="Menu"
            className="menu-summary flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/15"
          >
            <span aria-hidden="true" className="flex flex-col gap-1">
              <span className="h-0.5 w-4 rounded-full bg-foreground" />
              <span className="h-0.5 w-4 rounded-full bg-foreground" />
              <span className="h-0.5 w-4 rounded-full bg-foreground" />
            </span>
          </summary>
          <nav
            aria-label="AI Automation"
            className="absolute right-0 z-50 mt-2 flex w-56 flex-col rounded-2xl border border-white/10 bg-background p-2 shadow-xl"
          >
            <NavLinks className={`${itemClass} w-full justify-start`} />
          </nav>
        </details>
      </div>
    </header>
  );
}

export function AutomationFooter() {
  return (
    <footer className="border-t border-divider px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <Link className="flex items-center gap-3" href="/">
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
          <Link className="text-foreground-600 hover:text-foreground" href="/blog">
            Blog
          </Link>
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

export function BrandFrame({ children }: { children: ReactNode }) {
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
