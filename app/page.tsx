import { HeroSection } from "@/components/home/hero";
import { SkillsOverviewSection } from "@/components/home/skills-overview";
import { WorkSection } from "@/components/home/work";
import { TestimonialsSection } from "@/components/home/testimonials";
import type { Metadata } from "next";

const pageUrl = "https://shubh26.com";
const pageImage = "https://shubh26.com/shubham.jpg";
const description =
  "Official portfolio website of Shubham Chaudhary (Shubh26) – Full Stack Developer skilled in React, Next.js, Node.js, and MongoDB. Explore my projects, skills, work experience, and testimonials.";

export const metadata: Metadata = {
  title:
    "Shubham Chaudhary | Full Stack Developer Portfolio Website",
  description,
  keywords:
    "Shubham Chaudhary, Shubh26, Shubham, Full Stack Developer, Shubham Portfolio, Shubham Chaudhary Portfolio, React Developer, Next.js Developer, Node.js Developer, MongoDB Developer, Web Developer Portfolio",
  authors: [{ name: "Shubham Chaudhary" }],
  robots: "index, follow",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title:
      "Shubham Chaudhary (Shubh26) | Full Stack Developer & Portfolio Website",
    description,
    url: pageUrl,
    type: "website",
    images: [
      {
        url: pageImage,
        width: 1200,
        height: 630,
        alt: "Shubham Chaudhary Portfolio",
      },
    ],
    siteName: "Shubh26",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Chaudhary | Full Stack Developer Portfolio",
    description,
    images: [pageImage],
  },
  other: {
    // ✅ Schema.org Person (Rich Snippet)
    "ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Shubham Chaudhary",
      alternateName: "Shubh26",
      url: pageUrl,
      image: pageImage,
      jobTitle: "Full Stack Developer",
      description: description,
      worksFor: {
        "@type": "Organization",
        name: "Freelance / Open Source",
      },
      knowsAbout: [
        "Full Stack Development",
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "JavaScript",
        "TypeScript",
        "Web Development",
      ],
      sameAs: [
        "https://github.com/ShubhamChaudhary26",
        "https://linkedin.com/in/shubham-chaudhary-react",
        "https://x.com/Shubh26___?t=VBO8ygtdm3xjCi3KvfOhIQ&s=09",
        "https://shubh26.com",
      ],
    }),
  },
};

export default function HomePage() {
  return (
    <>
      {/* ✅ h1 tag SEO ke liye zaroori hai */}
      <h1 className="sr-only">
        Shubham Chaudhary (Shubh26) | Full Stack Developer Portfolio
      </h1>

      <HeroSection />
      <SkillsOverviewSection />
      <WorkSection />
      <TestimonialsSection />
    </>
  );
}
