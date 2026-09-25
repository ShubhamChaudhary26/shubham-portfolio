import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  AvatarGroup,
  Tooltip,
  ScrollShadow,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import ImageGallery from "@/components/image-gallery";
import { ProjectModalProps } from "@/components/projects/types";

export const ProjectModal = ({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Modal
      backdrop="blur"
      className="overflow-hidden rounded-xl border border-divider bg-content1 shadow-md"
      isOpen={isOpen}
      scrollBehavior="inside"
      size="xl"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="border-b border-divider text-xl font-bold text-foreground">
          {project.title}
        </ModalHeader>
        <ScrollShadow hideScrollBar size={60}>
          <ModalBody>
            {project.gallery && project.gallery.length > 0 && (
              <ImageGallery
                fit={project.imageFit}
                images={project.gallery}
                title={project.title}
              />
            )}

            <p className="text-sm text-primary-500 mb-3 font-medium uppercase tracking-wide">
              {project.category}
            </p>

            <div className="text-foreground-600 leading-relaxed mb-6 whitespace-pre-line">
              {project.details}
            </div>
            {project.tech.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-6 text-foreground">
                  Technologies Used:
                </h4>
               <AvatarGroup max={project.tech.length}>
  {project.tech.map(({ name, icon }) => (
    <Tooltip key={name} content={name} showArrow={true}>
      <Avatar
        showFallback
        classNames={{
          base: "bg-transparent",
          icon: "text-foreground dark:text-foreground-dark",
        }}
        icon={<Icon icon={icon} width={25} />}
      />
    </Tooltip>
  ))}
</AvatarGroup>

              </div>
            )}
          </ModalBody>
        </ScrollShadow>
        {(project.github || project.live) && (
          <div className="flex justify-end mb-4 px-6 gap-3">
            {project.github && (
              <a
                aria-label="View on GitHub"
                className="text-foreground-500 hover:text-foreground transition"
                href={project.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon height={22} icon="mdi:github" width={22} />
              </a>
            )}
            {project.live && (
              <a
                aria-label="View Live Project"
                className="text-foreground-500 hover:text-foreground transition"
                href={project.live}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon height={22} icon="mdi:web" width={22} />
              </a>
            )}
          </div>
        )}

        <ModalFooter className="flex flex-wrap justify-end gap-3 border-t border-divider">
          <Button
            className="text-foreground-500"
            color="danger"
            variant="light"
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
