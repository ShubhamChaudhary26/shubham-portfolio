"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) => (
  <Reveal
    className={cn(
      "mb-12 max-w-2xl md:mb-16",
      align === "center" ? "mx-auto text-center" : "text-left",
    )}
  >
    {eyebrow ? (
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
      {title}
    </h2>
    {description ? (
      <p className="mt-4 text-base leading-relaxed text-foreground-500 md:text-lg">
        {description}
      </p>
    ) : null}
  </Reveal>
);
