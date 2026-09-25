import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site";

const description =
  "Projects by Shubham Chaudhary, a full stack developer building AI calling agents, bots, and web apps.";

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
    images: ["/shubham.jpg"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
