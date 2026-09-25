'use client';
import { motion } from "framer-motion";

import { SplittingText } from "@/components/textAnimations/splitting-text";
import { TimelineItemProps } from "@/components/about/types";

export const TimelineItem = ({
  title,
  date,
  description,
  variants,
  delay = 0,
  current = false,
}: TimelineItemProps & { current?: boolean }) => {
  return (
    <motion.li
      className={`relative mb-10 pl-8 ${current ? "rounded-3xl border border-primary/30 bg-primary/5 p-5 pl-8" : ""}`}
      variants={variants}
    >
      <span className="absolute left-0 top-1 z-10 h-4 w-4 rounded-full border-2 border-background bg-primary" />
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {current ? (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
            Current
          </span>
        ) : null}
      </div>
      <time className="mb-1 block text-sm text-primary">{date}</time>
      <SplittingText
        className="text-sm text-muted-foreground"
        delay={delay}
        inView={true}
        inViewOnce={true}
        text={description}
        type="words"
      />
    </motion.li>
  );
};
