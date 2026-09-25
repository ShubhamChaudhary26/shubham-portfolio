"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/page-header";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectsTabs } from "@/components/projects/projects-tabs";
import { DATA } from "@/data";

const ProjectsPage = () => {
  const allProjects = DATA.projects.work;

  const categories = useMemo(
    () => ["All", ...new Set(allProjects.map((project) => project.category))],
    [allProjects],
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? allProjects
        : allProjects.filter((project) => project.category === selectedCategory),
    [selectedCategory, allProjects],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <PageHeader texts={DATA.morphingTexts.projects} />
      <ProjectsTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ProjectsGrid projects={filteredProjects} />
    </div>
  );
};

export default ProjectsPage;
