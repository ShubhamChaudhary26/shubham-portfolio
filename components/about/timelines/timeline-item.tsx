"use client";
import { motion } from "framer-motion";

import { SplittingText } from "@/components/textAnimations/splitting-text";
import { TimelineItemProps } from "@/components/about/types";

export const TimelineItem = ({
  title,
  date,
  description,
  variants,
  delay = 0,
}: TimelineItemProps) => {
  return (
    <motion.li className="relative mb-6 pl-8" variants={variants}>
      <span className="absolute left-0 top-6 z-10 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary" />
      <div className="rounded-2xl border border-divider bg-content1/70 p-5">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <time className="mb-2 mt-1 block text-sm text-primary">{date}</time>
        <SplittingText
          className="text-sm leading-relaxed text-foreground-500"
          delay={delay}
          inView={true}
          inViewOnce={true}
          text={description}
          type="words"
        />
      </div>
    </motion.li>
  );
};
