import type { Metadata } from "next";
import type { IndustryConfig } from "@/data/ai-automation";

import { AUTOMATION_BRAND } from "@/lib/automation-brand";
import { SITE_URL } from "@/lib/site";

function absoluteImage(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function automationMetadata(input: {
  title: string;
  description: string;
  path: string;
  image: { src: string; width: number; height: number; alt: string };
}): Metadata {
  const url = `${SITE_URL}${input.path}`;
  const imageUrl = absoluteImage(input.image.src);
  const brandedTitle = `${input.title} | ${AUTOMATION_BRAND.name}`;
  const image = {
    url: imageUrl,
    width: input.image.width,
    height: input.image.height,
    alt: input.image.alt,
  };

  return {
    title: { absolute: brandedTitle },
    description: input.description,
    authors: [{ name: AUTOMATION_BRAND.name, url: AUTOMATION_BRAND.instagram }],
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description: input.description,
      url,
      siteName: AUTOMATION_BRAND.name,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description: input.description,
      images: [imageUrl],
    },
  };
}

export function industryMetadata(page: IndustryConfig): Metadata {
  return automationMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: page.path,
    image: page.seo.ogImage,
  });
}

export function automationJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image: string;
}) {
  const url = `${SITE_URL}${input.path}`;
  const organization = {
    "@type": "Organization",
    name: AUTOMATION_BRAND.name,
    url: AUTOMATION_BRAND.instagram,
    sameAs: [AUTOMATION_BRAND.instagram],
  };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url,
    image: absoluteImage(input.image),
    areaServed: { "@type": "Country", name: "India" },
    provider: organization,
    publisher: organization,
  };
}
