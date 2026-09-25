import type { Metadata } from "next";

import { EducationTimeline } from "@/components/about/timelines/education-timeline";
import { ExperienceTimeline } from "@/components/about/timelines/experience-timeline";
import { ProfileCard } from "@/components/about/profile-card";
import { Skills } from "@/components/about/skills";
import { PageHeader } from "@/components/page-header";
import { DATA } from "@/data";
import { SITE_URL } from "@/lib/site";

const description =
  "Shubham Chaudhary is a full stack developer in Pune, currently at NR Agrawal, building AI calling agents, AI bots, and apps.";

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
    images: ["/shubham.jpg"],
  },
};

export default function AboutPage() {
  const { education, experience, profile } = DATA.about;
  const tech = DATA.about.technologies;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    image: `${SITE_URL}/shubham.jpg`,
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "NR Agrawal",
    },
    sameAs: DATA.footer.socialLinks.map((link) => link.url),
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 text-foreground md:py-24">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
