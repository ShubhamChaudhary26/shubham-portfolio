import type { Metadata } from "next";

import { FocusSection } from "@/components/home/focus";
import { HeroSection } from "@/components/home/hero";
import { SkillsOverviewSection } from "@/components/home/skills-overview";
import { TestimonialsSection } from "@/components/home/testimonials";
import { WorkSection } from "@/components/home/work";
import { DATA } from "@/data";
import { SITE_URL } from "@/lib/site";

const description = DATA.home.hero.subtitle;

export const metadata: Metadata = {
  title: {
    absolute: `${DATA.home.hero.name} | ${DATA.home.hero.title}`,
  },
  description,
  keywords: [
    "Shubham Chaudhary",
    "Full Stack Developer",
    "AI calling agents",
    "voice AI",
    "AI bots",
    "chatbots",
    "web apps",
    "mobile apps",
    "Pune",
    "NR Agrawal",
    "shubh.work",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${DATA.home.hero.name} | AI calling agents, bots, and apps`,
    description,
    url: SITE_URL,
    siteName: "shubh.work",
    images: [
      {
        url: "/shubham.jpg",
        width: 1200,
        height: 630,
        alt: "Shubham Chaudhary",
      },
    ],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.about.profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/shubham.jpg`,
  jobTitle: "Full Stack Developer",
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "NR Agrawal",
  },
  email: DATA.footer.contact.email,
  knowsAbout: [
    "AI calling agents",
    "Voice AI",
    "Chatbots",
    "Web applications",
    "Mobile applications",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
  ],
  sameAs: DATA.footer.socialLinks.map((link) => link.url),
};

export default function HomePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        type="application/ld+json"
      />
      <HeroSection />
      <FocusSection />
      <SkillsOverviewSection />
      <WorkSection />
      <TestimonialsSection />
    </>
  );
}
