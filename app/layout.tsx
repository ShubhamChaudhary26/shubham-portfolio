import "@/app/globals.css";

import { clsx } from "clsx";
import { type Metadata, type Viewport } from "next";
import { Manrope, Syne } from "next/font/google";

import { DATA } from "@/data";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navbar";
import { PageWrapper } from "@/components/page-wrapper";
import { Providers } from "@/app/providers";
import ChatBot from "@/components/ChatBot";
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

const title = `${DATA.home.hero.name} | ${DATA.home.hero.title}`;
const description = DATA.home.hero.subtitle;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${DATA.home.hero.name}`,
  },
  description,
  applicationName: DATA.home.hero.name,
  authors: [{ name: DATA.home.hero.name, url: SITE_URL }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "shubh.work",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/shubham.jpg",
        width: 1200,
        height: 630,
        alt: `${DATA.home.hero.name}, full stack developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/shubham.jpg"],
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
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#07080c" },
  ],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          sans.variable,
          display.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
            enableSystem: false,
          }}
        >
          <a
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            href="#content"
          >
            Skip to content
          </a>
          <div className="min-h-screen bg-background">
            <Navigation />
            <PageWrapper>{children}</PageWrapper>
            <Footer />
          </div>
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
