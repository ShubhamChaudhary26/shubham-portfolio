import { memo } from "react";
import { Card, CardBody, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

interface testimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export const TestimonialCard = memo(function TestimonialCard({
  name,
  role,
  content,
  avatar,
}: testimonialCardProps) {
  return (
    <Card className="min-h-64 border border-divider bg-content1/80">
      <CardBody className="p-6 flex flex-col">
        <div>
          <Icon className="w-8 h-8 text-primary-500 mb-4" icon="lucide:quote" />
          <p className="text-foreground-600 mb-6 italic">
            &ldquo;{content}&rdquo;
          </p>
        </div>
        <div className="flex items-center gap-4 mt-auto">
          <Avatar
            className="ring-2 ring-primary/30"
            name={name}
            size="lg"
            src={avatar}
          />
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-foreground-500">{role}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
});
