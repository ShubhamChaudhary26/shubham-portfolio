import type { Metadata } from "next";

import { FocusSection } from "@/components/home/focus";
import { HeroSection } from "@/components/home/hero";
import { SkillsOverviewSection } from "@/components/home/skills-overview";
import { TestimonialsSection } from "@/components/home/testimonials";
import { WorkSection } from "@/components/home/work";
import { DATA } from "@/data";
import { homeJsonLd, OG_IMAGE, SEO_KEYWORDS, SITE_DESCRIPTION } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const title = `${DATA.home.hero.name} | Full Stack Developer in Vapi, Gujarat`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "shubh.work",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
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
