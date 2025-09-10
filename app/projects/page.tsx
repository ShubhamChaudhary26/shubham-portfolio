"use client";

import Head from "next/head";
import { useState, useMemo } from "react";

import { PageHeader } from "@/components/page-header";
import { ProjectsTabs } from "@/components/projects/projects-tabs";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { DATA } from "@/data";

const ProjectsPage = () => {
  const allProjects = DATA.projects.work;

  const categories = useMemo(
    () => ["All", ...new Set(allProjects.map((project) => project.category))],
    [allProjects]
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? allProjects
        : allProjects.filter((project) => project.category === selectedCategory),
    [selectedCategory, allProjects]
  );

  // ✅ SEO Data
  const description =
    "Explore the portfolio projects of Shubham Chaudhary (Shubh26) – Full Stack Developer. From React and Next.js apps to APIs, dashboards, and scalable web solutions.";
  const pageUrl = "https://shubh26.com/projects";
  const pageImage = "https://shubh26.com/shubham.jpg";

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Projects | Shubham Chaudhary (Shubh26) | Full Stack Developer</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Shubham Chaudhary projects, Shubh26 portfolio, Shubham Chaudhary Full Stack Developer, React projects, Next.js apps, Node.js APIs, Shubham portfolio"
        />
        <meta name="author" content="Shubham Chaudhary" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Projects | Shubham Chaudhary (Shubh26) | Full Stack Developer"
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Projects | Shubham Chaudhary (Shubh26) | Full Stack Developer"
        />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={pageImage} />

        {/* Canonical */}
        <link rel="canonical" href={pageUrl} />

        {/* ✅ Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://shubh26.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Projects",
                item: pageUrl,
              },
            ],
          })}
        </script>

        {/* ✅ Projects Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Projects - Shubham Chaudhary (Shubh26)",
            description: description,
            url: pageUrl,
            mainEntity: allProjects.map((p, i) => ({
              "@type": "CreativeWork",
              name: p.title,
              description: p.description,
              position: i + 1,
              url: `${pageUrl}#${p.title.replace(/\s+/g, "-").toLowerCase()}`,
            })),
          })}
        </script>
      </Head>

      {/* ✅ Hidden h1 for SEO */}
      <h1 className="sr-only">
        Projects by Shubham Chaudhary (Shubh26) | Full Stack Developer Portfolio
      </h1>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <PageHeader texts={DATA.morphingTexts.projects} />

        <ProjectsTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <ProjectsGrid projects={filteredProjects} />
      </div>
    </>
  );
};

export default ProjectsPage;
