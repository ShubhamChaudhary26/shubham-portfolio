import { HeroSection } from "@/components/home/hero";
import { SkillsOverviewSection } from "@/components/home/skills-overview";
import { WorkSection } from "@/components/home/work";
import { TestimonialsSection } from "@/components/home/testimonials";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Shubham Chaudhary | Full Stack Developer Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Shubham Chaudhary, a Full Stack Developer skilled in React, Next.js, Node.js, and MongoDB. Explore my work, skills, and testimonials."
        />
        <meta
          name="keywords"
          content="Shubham Chaudhary, Full Stack Developer, React Developer, Next.js Developer, Node.js, MongoDB, Portfolio"
        />
        <meta name="author" content="Shubham Chaudhary" />
        <meta property="og:title" content="Shubham Chaudhary | Full Stack Developer" />
        <meta
          property="og:description"
          content="Explore the portfolio of Shubham Chaudhary, Full Stack Developer specializing in React, Next.js, and Node.js."
        />
        <meta property="og:url" content="https://shubh26.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://shubh26.com/shubham.jpg" />
      </Head>

      {/* Page Sections */}
      <HeroSection />
      <SkillsOverviewSection />
      <WorkSection />
      <TestimonialsSection />
    </>
  );
}
