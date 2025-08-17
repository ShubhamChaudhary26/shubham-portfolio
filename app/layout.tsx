import "@/app/globals.css";

import { clsx } from "clsx";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { DATA } from "@/data";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navbar";
import { PageWrapper } from "@/components/page-wrapper";
import { Providers } from "@/app/providers";
import { StarsBackground } from "@/components/backgrounds/stars";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shubh26.com"),
  title: {
    default: DATA.home.hero.name,
    template: `%s | ${DATA.home.hero.name}`,
  },
  description: DATA.home.hero.subtitle,
  openGraph: {
    title: DATA.home.hero.name,
    description: DATA.home.hero.subtitle,
    url: "https://shubh26.com",
    siteName: DATA.home.hero.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://shubh26.com/shubham.jpg",
        width: 1200,
        height: 630,
        alt: `${DATA.home.hero.name} Preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DATA.home.hero.name,
    description: DATA.home.hero.subtitle,
    images: ["https://shubh26.com/shubham.jpg"],
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

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const content = (
    <main className="bg-background min-h-screen bg-gradient-to-b from-background to-content2">
      <Navigation />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </main>
  );

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>Shubham Chaudhary</title>
        <meta name="title" content="Shubham Chaudhary" />
        <meta
          name="description"
          content="I build fast, accessible and visually engaging web experiences that solve real problems."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shubh26.com/" />
        <meta property="og:title" content="Shubham Chaudhary" />
        <meta
          property="og:description"
          content="I build fast, accessible and visually engaging web experiences that solve real problems."
        />
        <meta property="og:image" content="https://shubh26.com/shubham.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://shubh26.com/" />
        <meta property="twitter:title" content="Shubham Chaudhary" />
        <meta
          property="twitter:description"
          content="I build fast, accessible and visually engaging web experiences that solve real problems."
        />
        <meta
          property="twitter:image"
          content="https://shubh26.com/shubham.jpg"
        />

        {/* <link rel="icon" href="/favicon.png" /> */}
        <link rel="icon" href="/shubham.jpg" />
        <meta name="theme-color" content="#0f172a" />
      </head>

      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
          }}
        >
          <StarsBackground>{content}</StarsBackground>
        </Providers>
      </body>
    </html>
  );
}
