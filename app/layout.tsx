import "@/app/globals.css";

import { clsx } from "clsx";
import { type Metadata, type Viewport } from "next";
import { Manrope, Syne } from "next/font/google";

import { SITE_URL } from "@/lib/site";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#07080c" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className="dark" lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          sans.variable,
          display.variable,
        )}
      >
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          href="#content"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
