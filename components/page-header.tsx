"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface PageHeaderProps {
  texts: readonly string[];
  className?: string;
}

export const PageHeader = ({ texts, className = "" }: PageHeaderProps) => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || texts.length < 2) return undefined;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % texts.length);
    }, 2600);

    return () => window.clearInterval(id);
  }, [reduce, texts]);

  const label = reduce ? texts.join(" ") : texts[index];

  return (
    <div className={`mb-12 text-center ${className}`}>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
        {reduce ? (
          label
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={label}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
              exit={{ opacity: 0, y: -14 }}
              initial={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {label}
            </motion.span>
          </AnimatePresence>
        )}
      </h1>
    </div>
  );
};
