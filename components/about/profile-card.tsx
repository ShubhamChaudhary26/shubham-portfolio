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
    <Card className="w-full max-w-6xl mx-auto p-0 md:p-0 mb-12 rounded-2xl dark:shadow-neutral-700 shadow-md overflow-hidden bg-white/90 dark:bg-black/60">
      <div className="flex flex-col mdplus:flex-row items-center md:items-start gap-8">
        {/* Left image card */}
        <div className="w-full shrink-0 px-4 py-6 md:w-[340px]">
          <SpinningBadge alt={name} id="profile-ring" src={image} />
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