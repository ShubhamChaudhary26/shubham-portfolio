import { HomePage } from "@/components/ai-automation/home-page";
import { BRAND_DESCRIPTION, BRAND_OG_IMAGE } from "@/lib/automation-brand";
import { brandHomeJsonLd } from "@/lib/automation-page";
import { SITE_URL } from "@/lib/site";

const title = "AI Automation Hindi";

export const metadata = {
  title: { absolute: title },
  description: BRAND_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title,
    description: BRAND_DESCRIPTION,
    url: SITE_URL,
    siteName: title,
    type: "website" as const,
    images: [
      {
        url: BRAND_OG_IMAGE.src,
        width: BRAND_OG_IMAGE.width,
        height: BRAND_OG_IMAGE.height,
        alt: BRAND_OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title,
    description: BRAND_DESCRIPTION,
    images: [`${SITE_URL}${BRAND_OG_IMAGE.src}`],
  },
};

export default function Page() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandHomeJsonLd(BRAND_DESCRIPTION)) }}
        type="application/ld+json"
      />
      <HomePage />
    </>
  );
}
