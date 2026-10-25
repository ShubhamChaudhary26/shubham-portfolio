import type { Metadata } from "next";

import { ScheduleMeeting } from "@/components/schedule/schedule-meeting";
import { OG_IMAGE } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const description =
  "Schedule a meeting with Shubham Chaudhary, a full stack developer in Vapi, Gujarat. Weekday slots from 10:00 to 19:00 IST.";

export const metadata: Metadata = {
  title: "Schedule a meeting",
  description,
  alternates: {
    canonical: `${SITE_URL}/schedule`,
  },
  openGraph: {
    title: "Schedule a meeting with Shubham Chaudhary",
    description,
    url: `${SITE_URL}/schedule`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule a meeting with Shubham Chaudhary",
    description,
    images: [OG_IMAGE.url],
  },
};

export default function SchedulePage() {
  return (
    <section className="px-4 py-16 md:py-24">
      <ScheduleMeeting />
    </section>
  );
}
