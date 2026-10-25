import type { Metadata } from "next";

import { existsSync } from "fs";
import { join } from "path";

import { IndustryLanding } from "@/components/ai-calling/industry-landing";
import { realEstateIndustry } from "@/data/ai-calling-industries";
import { industryJsonLd, industryMetadata } from "@/lib/ai-calling-page";

export const metadata: Metadata = industryMetadata(realEstateIndustry);

export default function RealEstateCallingPage() {
  const audioFile = realEstateIndustry.audio?.file;
  const hasAudio = audioFile
    ? existsSync(join(process.cwd(), "public", audioFile))
    : false;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(industryJsonLd(realEstateIndustry)),
        }}
        type="application/ld+json"
      />
      <IndustryLanding content={realEstateIndustry} hasAudio={hasAudio} />
    </>
  );
}
