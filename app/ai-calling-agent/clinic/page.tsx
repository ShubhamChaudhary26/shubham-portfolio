import type { Metadata } from "next";

import { existsSync } from "fs";
import { join } from "path";

import { IndustryLanding } from "@/components/ai-calling/industry-landing";
import { clinicIndustry } from "@/data/ai-calling-industries";
import { industryJsonLd, industryMetadata } from "@/lib/ai-calling-page";

export const metadata: Metadata = industryMetadata(clinicIndustry);

export default function ClinicCallingPage() {
  const audioFile = clinicIndustry.audio?.file;
  const hasAudio = audioFile
    ? existsSync(join(process.cwd(), "public", audioFile))
    : false;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(industryJsonLd(clinicIndustry)),
        }}
        type="application/ld+json"
      />
      <IndustryLanding content={clinicIndustry} hasAudio={hasAudio} />
    </>
  );
}
