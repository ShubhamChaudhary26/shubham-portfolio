import { HubPage } from "@/components/ai-automation/hub-page";
import { automationJsonLd, automationMetadata } from "@/lib/automation-page";
import { presentGeneralVoiceover } from "@/lib/automation-media";

const title = "AI Calling Agent";
const description =
  "AI calling agent in Hindi for a clinic, real estate, restaurant, salon, coaching, gym, or hotel. Hear a sample voice, then send your details for a callback.";
const path = "/ai-automation";
const image = {
  src: "/og-ai-calling.png",
  width: 1200,
  height: 630,
  alt: "AI Calling Agent. Hindi calls and CRM follow-up.",
};

export const dynamic = "force-static";

export const metadata = automationMetadata({
  title,
  description,
  path,
  image,
});

export default function AiAutomationPage() {
  const audio = presentGeneralVoiceover();

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
      <HubPage audio={audio} />
    </>
  );
}
