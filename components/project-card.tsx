import { memo } from "react";
import { Card, CardBody, Button, Image } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextImage from "next/image";

import { ProjectCardProps } from "@/components/projects/types";

export const ProjectCard = memo(function ProjectCard({
  project,
  onViewDetails,
}: ProjectCardProps) {
  if (project.featured) {
    return (
      <Card
        isHoverable
        className="h-full w-full overflow-hidden rounded-3xl border border-divider bg-content1/90 shadow-sm"
        radius="lg"
      >
        <CardBody className="grid h-full gap-0 p-0 md:grid-cols-[minmax(0,280px)_1fr]">
          <div className="flex flex-col items-center justify-center gap-5 bg-content2/50 px-6 py-10">
            <NextImage
              alt={`${project.title} logo`}
              className="h-auto w-36 object-contain sm:w-40"
              height={1024}
              src={project.image}
              width={1024}
            />
            {project.wordmark ? (
              <NextImage
                alt={`${project.title} wordmark`}
                className="h-auto w-44 object-contain"
                height={292}
                src={project.wordmark}
                width={1483}
              />
            ) : null}
          </div>
          <div className="flex flex-col p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Currently working on
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-4 flex-grow text-sm leading-relaxed text-foreground-500 md:text-base">
              {project.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {project.live ? (
                <Button
                  as="a"
                  color="primary"
                  endContent={<Icon icon="lucide:arrow-up-right" />}
                  href={project.live}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Visit Stampzo
                </Button>
              ) : null}
              <Button
                aria-label="View Details"
                endContent={<Icon icon="lucide:arrow-right" />}
                variant="bordered"
                onClick={onViewDetails}
              >
                View details
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      isHoverable
      className="h-full w-full overflow-hidden rounded-3xl border border-divider bg-content1/90 shadow-sm transition-transform duration-300 hover:-translate-y-1"
      radius="lg"
    >
      <CardBody className="flex h-full flex-col p-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-content2/50">
          <Image
            removeWrapper
            alt={project.title}
            className="absolute inset-0 h-full w-full object-contain"
            classNames={{
              img: "h-full w-full object-contain",
              wrapper: "h-full w-full",
            }}
            loading="lazy"
            src={project.image}
          />
        </div>

        <div className="flex flex-grow flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {project.category}
          </p>
          <h3 className="mb-2 mt-2 text-xl font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="mb-4 flex-grow text-sm leading-relaxed text-foreground-500">
            {project.description}
          </p>
          <Button
            aria-label="View Details"
            className="w-full transition-colors md:w-auto"
            color="primary"
            endContent={<Icon icon="lucide:arrow-right" />}
            variant="bordered"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>
      </CardBody>
    </Card>
  );
});
