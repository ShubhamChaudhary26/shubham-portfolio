import type { Metadata } from "next";

import { OG_IMAGE } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const description =
  "Projects by Shubham Chaudhary, including Stampzo and full stack work across AI calling agents, AI chatbots, CRM apps, and web and mobile apps.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: "Projects | Shubham Chaudhary",
    description,
    url: `${SITE_URL}/projects`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Shubham Chaudhary",
    description,
    images: [OG_IMAGE.url],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
