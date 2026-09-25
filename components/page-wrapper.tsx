"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="min-h-screen pt-16" id="content">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      key={pathname}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-16"
      id="content"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
