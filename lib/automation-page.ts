import type { Metadata } from "next";
import type { IndustryConfig } from "@/data/ai-automation";

import { AUTOMATION_BRAND, BRAND_LOGO_PATH, BRAND_OG_IMAGE } from "@/lib/automation-brand";
import { SITE_URL } from "@/lib/site";

function absoluteImage(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function automationMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${input.path}`;
  const imageUrl = absoluteImage(BRAND_OG_IMAGE.src);
  const brandedTitle = `${input.title} | ${AUTOMATION_BRAND.name}`;
  const image = {
    url: imageUrl,
    width: BRAND_OG_IMAGE.width,
    height: BRAND_OG_IMAGE.height,
    alt: BRAND_OG_IMAGE.alt,
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
  });
}

export function brandHomeJsonLd(description: string) {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: AUTOMATION_BRAND.name,
    url: SITE_URL,
    logo: absoluteImage(BRAND_LOGO_PATH),
    sameAs: [AUTOMATION_BRAND.instagram],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: AUTOMATION_BRAND.name,
        description,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
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
