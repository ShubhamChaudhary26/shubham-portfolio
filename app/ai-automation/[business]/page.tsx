import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { IndustryTemplate } from "@/components/ai-automation/industry-page";
import { INDUSTRIES, industryBySlug } from "@/data/ai-automation";
import { presentIndustry } from "@/lib/automation-media";
import { automationJsonLd, industryMetadata } from "@/lib/automation-page";

type BusinessPageProps = {
  params: Promise<{ business: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((item) => ({ business: item.slug }));
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { business } = await params;
  const industry = industryBySlug(business);

  if (!industry) return {};

  return industryMetadata(industry);
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { business } = await params;
  const industry = industryBySlug(business);

  if (!industry) notFound();

  const page = presentIndustry(industry);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            automationJsonLd({
              name: industry.seo.serviceName,
              description: industry.seo.description,
              path: industry.path,
              image: industry.seo.ogImage.src,
            }),
          ),
        }}
        type="application/ld+json"
      />
      <IndustryTemplate page={page} />
    </>
  );
}
