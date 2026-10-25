import type { Metadata } from "next";

import { OG_IMAGE } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const description =
  "Contact Shubham Chaudhary, full stack developer in Vapi, Gujarat, India, or schedule a meeting.";

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
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Shubham Chaudhary",
    description,
    images: [OG_IMAGE.url],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
