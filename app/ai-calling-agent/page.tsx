import type { Metadata } from "next";

import { existsSync } from "fs";
import { join } from "path";

import { AiCallingLanding } from "@/components/ai-calling/landing";
import { DATA } from "@/data";
import { SITE_URL } from "@/lib/site";

const title = "AI Calling Agent";
const description =
  "AI calling agent jo Hindi mein calls uthata hai, sawal jawab karta hai, leads qualify karta hai, aur appointments book karta hai. Free demo.";
const url = `${SITE_URL}/ai-calling-agent`;
const ogImage = {
  url: "/og-ai-calling.png",
  width: 1200,
  height: 630,
  alt: "AI Calling Agent. Aapki har call uthayega, 24x7, Hindi me.",
};

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "AI Calling Agent | Shubham Chaudhary",
    description,
    url,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Calling Agent | Shubham Chaudhary",
    description,
    images: [ogImage.url],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Calling Agent",
  serviceType: "AI calling agent",
  description,
  url,
  image: `${SITE_URL}${ogImage.url}`,
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  provider: {
    "@type": "Person",
    name: DATA.about.profile.name,
    url: SITE_URL,
  },
};

export default function AiCallingAgentPage() {
  const hasDemoAudio = existsSync(
    join(process.cwd(), "public/audio/ai-calling-demo-real-estate.mp3"),
  );

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        type="application/ld+json"
      />
      <AiCallingLanding hasDemoAudio={hasDemoAudio} />
    </>
  );
}
