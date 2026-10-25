import { ServicePage } from "@/components/ai-automation/service-page";
import { automationJsonLd, automationMetadata } from "@/lib/automation-page";

const title = "AI Chatbot";
const description =
  "An AI chatbot that answers from the replies you write, on a site or in Instagram and WhatsApp, and can ask for a name and number.";
const path = "/ai-automation/ai-chatbot";
const image = {
  src: "/og-ai-calling.png",
  width: 1200,
  height: 630,
  alt: "AI chatbot that answers from the replies you set.",
};

export const dynamic = "force-static";

export const metadata = automationMetadata({ title, description, path, image });

export default function AiChatbotPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            automationJsonLd({ name: title, description, path, image: image.src }),
          ),
        }}
        type="application/ld+json"
      />
      <ServicePage
        defaultServices={["AI Chatbot"]}
        eyebrow="AI Chatbot"
        pagePath={path}
        paragraphs={[
          "Chatbot un sawalon ka jawab deta hai jo aap khud likhte ho. Site pe, Instagram pe, ya WhatsApp pe lag sakta hai.",
          "Ye naam aur number le sakta hai, agar aap woh step on karte ho. Jo line aapne nahi di, uska andaza nahi lagta.",
        ]}
        selectedBusiness="AI Chatbot"
        title="AI chatbot, aapke diye gaye jawabon se"
      />
    </>
  );
}
