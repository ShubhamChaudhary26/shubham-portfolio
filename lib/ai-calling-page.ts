import type { Metadata } from "next";
import type { IndustryPage } from "@/data/ai-calling-industries";

import { DATA } from "@/data";
import { SITE_URL } from "@/lib/site";

export function industryMetadata(page: IndustryPage): Metadata {
  const url = `${SITE_URL}${page.path}`;
  const { title, description, ogImage } = page.seo;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Shubham Chaudhary`,
      description,
      url,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Shubham Chaudhary`,
      description,
      images: [ogImage.url],
    },
  };
}

export function industryJsonLd(page: IndustryPage) {
  const url = `${SITE_URL}${page.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.seo.serviceName,
    serviceType: page.seo.serviceType,
    description: page.seo.description,
    url,
    image: `${SITE_URL}${page.seo.ogImage.url}`,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    provider: {
      "@type": "Person",
      name: DATA.about.profile.name,
      url: SITE_URL,
    },
  };
}
