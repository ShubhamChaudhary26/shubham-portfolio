import type { Metadata } from "next";

import { EducationTimeline } from "@/components/about/timelines/education-timeline";
import { ExperienceTimeline } from "@/components/about/timelines/experience-timeline";
import { ProfileCard } from "@/components/about/profile-card";
import { Skills } from "@/components/about/skills";
import { PageHeader } from "@/components/page-header";
import { DATA } from "@/data";
import { aboutJsonLd, OG_IMAGE } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const description =
  "Shubham Chaudhary is a full stack developer in Vapi, Gujarat, currently at NR Agrawal. He builds AI calling agents, AI chatbots, CRM apps, and web and mobile apps, and is working on Stampzo.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Shubham Chaudhary",
    description,
    url: `${SITE_URL}/about`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Shubham Chaudhary",
    description,
    images: [OG_IMAGE.url],
  },
};

export default function AboutPage() {
  const { education, experience, profile } = DATA.about;
  const tech = DATA.about.technologies;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 text-foreground md:py-24">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
        type="application/ld+json"
      />
      <PageHeader texts={DATA.morphingTexts.about} />
      <ProfileCard
        description={profile.description}
        image={profile.image}
        name={profile.name}
        title="Full Stack Developer at NR Agrawal"
      />
      <EducationTimeline education={education} />
      <ExperienceTimeline experience={experience} />
      <Skills tech={tech} />
    </section>
  );
}
