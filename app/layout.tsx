import "@/app/globals.css";

import { clsx } from "clsx";
import { type Metadata, type Viewport } from "next";
import { Manrope, Syne } from "next/font/google";

import { AUTOMATION_BRAND, BRAND_DESCRIPTION, BRAND_LOGO_PATH, BRAND_OG_IMAGE } from "@/lib/automation-brand";
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

const brandImage = {
  url: BRAND_OG_IMAGE.src,
  width: BRAND_OG_IMAGE.width,
  height: BRAND_OG_IMAGE.height,
  alt: BRAND_OG_IMAGE.alt,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: AUTOMATION_BRAND.name,
    template: `%s | ${AUTOMATION_BRAND.name}`,
  },
  description: BRAND_DESCRIPTION,
  applicationName: AUTOMATION_BRAND.name,
  authors: [{ name: AUTOMATION_BRAND.name, url: AUTOMATION_BRAND.instagram }],
  creator: AUTOMATION_BRAND.name,
  publisher: AUTOMATION_BRAND.name,
  icons: {
    icon: [{ url: BRAND_LOGO_PATH, type: "image/webp", sizes: "512x512" }],
    apple: [{ url: BRAND_LOGO_PATH, type: "image/webp", sizes: "512x512" }],
    shortcut: BRAND_LOGO_PATH,
  },
  openGraph: {
    title: AUTOMATION_BRAND.name,
    description: BRAND_DESCRIPTION,
    url: SITE_URL,
    siteName: AUTOMATION_BRAND.name,
    locale: "en_IN",
    type: "website",
    images: [brandImage],
  },
  twitter: {
    card: "summary_large_image",
    title: AUTOMATION_BRAND.name,
    description: BRAND_DESCRIPTION,
    images: [BRAND_OG_IMAGE.src],
  },
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
