"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";

import { Reveal } from "@/components/motion/reveal";

export const ScheduleCta = () => (
  <Reveal className="mb-8">
    <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-divider bg-content1/80 p-6 sm:flex-row sm:items-center">
      <div>
        <h2 className="font-display text-2xl font-semibold">Schedule a meeting</h2>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-foreground-500">
          Weekday slots from 10:00 to 19:00 IST. You will see the time in your timezone too.
        </p>
      </div>
      <Button
        as={NextLink}
        color="primary"
        endContent={<Icon icon="lucide:calendar" />}
        href="/schedule"
      >
        Book a time
      </Button>
    </div>
  </Reveal>
);
