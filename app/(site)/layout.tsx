import type { Metadata } from "next";

import { DATA } from "@/data";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navbar";
import { PageWrapper } from "@/components/page-wrapper";
import { Providers } from "@/app/providers";
import ChatBot from "@/components/ChatBot";
import { OG_IMAGE, SEO_KEYWORDS, SITE_DESCRIPTION } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const title = `${DATA.home.hero.name} | ${DATA.home.hero.title} in Vapi`;
const description = SITE_DESCRIPTION;

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
  },
  title: {
    default: title,
    template: `%s | ${DATA.home.hero.name}`,
  },
  description,
  keywords: SEO_KEYWORDS,
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
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE.url],
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers
      themeProps={{
        attribute: "class",
        defaultTheme: "dark",
        enableSystem: false,
      }}
    >
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageWrapper>{children}</PageWrapper>
        <Footer />
      </div>
      <ChatBot />
    </Providers>
  );
}
