"use client";

import { memo } from "react";
import { Card } from "@heroui/react";

import { SpinningBadge } from "@/components/home/spinning-badge";
import { HighlightText } from "@/components/textAnimations/highlight-text";
import { SplittingText } from "@/components/textAnimations/splitting-text";
import { ProfileCardProps } from "@/components/about/types";

export const ProfileCard = memo(function ProfileCard({
  image,
  name,
  title,
  description,
}: ProfileCardProps) {
  return (
    <Card className="mx-auto mb-12 w-full max-w-6xl overflow-hidden rounded-2xl border border-divider bg-content1/80 p-0 shadow-sm md:p-0">
      <div className="flex flex-col items-center gap-8 mdplus:flex-row mdplus:items-start">
        {/* Left image card */}
        <div className="w-full shrink-0 px-4 py-6 md:w-[340px]">
          <SpinningBadge alt={`Portrait of ${name}`} id="profile-ring" src={image} />
          <div className="mt-4 text-center">
            <HighlightText className="text-lg font-semibold" text={name} />
            <p className="text-sm text-foreground-500">{title}</p>
          </div>
        </div>

        {/* Right Description */}
        <div className="max-w-2xl px-6 py-6 text-base leading-relaxed text-foreground-600">
          {description.map((paragraph, index) => (
            <p key={index} className="mb-4">
              <SplittingText
                delay={index * 500}
                inView={true}
                inViewOnce={true}
                motionVariants={{ stagger: 0.08 }}
                text={paragraph}
                type="words"
              />
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
});