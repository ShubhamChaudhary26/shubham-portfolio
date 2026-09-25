import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site";

const description =
  "Contact Shubham Chaudhary, full stack developer in Pune, or schedule a meeting.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Shubham Chaudhary",
    description,
    url: `${SITE_URL}/contact`,
    images: ["/shubham.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
