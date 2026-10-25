"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        isIconOnly
        aria-label="Toggle theme"
        className="text-foreground"
        variant="light"
        onPress={() => setTheme(isDark ? "light" : "dark")}
      >
        <Icon className="h-5 w-5" icon={isDark ? "lucide:sun" : "lucide:moon"} />
      </Button>
    </motion.div>
  );
};
