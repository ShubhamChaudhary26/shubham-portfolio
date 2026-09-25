"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useState } from "react";

import { GradientText } from "@/components/textAnimations/gradient-text";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { Reveal } from "@/components/motion/reveal";
import { Project } from "@/components/projects/types";
import { DATA } from "@/data";

export const WorkSection = () => {
  const { work } = DATA.projects;
  const { sectionTitle, sectionDescription } = DATA.projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="scroll-mt-24 px-4 py-20 md:py-28" id="work-section">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Work
          </p>
          <GradientText
            className="font-display text-3xl font-semibold md:text-5xl"
            text={sectionTitle}
          />
          <p className="mt-4 text-base leading-relaxed text-foreground-500 md:text-lg">
            {sectionDescription}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {work.slice(0, 3).map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <ProjectCard
                project={project}
                onViewDetails={() => setSelectedProject(project)}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            as={NextLink}
            color="primary"
            endContent={<Icon icon="lucide:arrow-right" />}
            href="/projects"
            variant="bordered"
          >
            All projects
          </Button>
        </div>

        <ProjectModal
          isOpen={!!selectedProject}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
