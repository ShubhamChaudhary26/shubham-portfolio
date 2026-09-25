import type { Metadata } from "next";

import { ScheduleMeeting } from "@/components/schedule/schedule-meeting";
import { DATA } from "@/data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule a meeting",
  description: DATA.booking.description,
  alternates: {
    canonical: `${SITE_URL}/schedule`,
  },
  openGraph: {
    title: "Schedule a meeting with Shubham Chaudhary",
    description: DATA.booking.description,
    url: `${SITE_URL}/schedule`,
    images: ["/shubham.jpg"],
  },
};

export default function SchedulePage() {
  return (
    <section className="px-4 py-16 md:py-24">
      <ScheduleMeeting />
    </section>
  );
}
