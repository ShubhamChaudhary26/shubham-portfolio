import { HubPage } from "@/components/ai-automation/hub-page";
import { automationJsonLd, automationMetadata } from "@/lib/automation-page";

const title = "AI Calling Agent";
const description =
  "AI calling agent in Hindi for a clinic, real estate, restaurant, salon, coaching, gym, or hotel. Hear a sample voice, then send your details for a callback.";
const path = "/ai-automation";
const image = {
  src: "/images/ai-automation/general/01_hub_crm_dashboard_all_businesses_16x9.webp",
  width: 1280,
  height: 720,
  alt: "CRM dashboard jisme kai businesses ke calls aur leads ek jagah dikh rahe hain.",
};

export const dynamic = "force-static";

export const metadata = automationMetadata({
  title,
  description,
  path,
});

export default function AiAutomationPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            automationJsonLd({
              name: title,
              description,
              path,
              image: image.src,
            }),
          ),
        }}
        type="application/ld+json"
      />
      <HubPage />
    </>
  );
}
