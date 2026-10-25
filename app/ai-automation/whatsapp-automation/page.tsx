import { ServicePage } from "@/components/ai-automation/service-page";
import { automationJsonLd, automationMetadata } from "@/lib/automation-page";

const title = "WhatsApp Automation";
const description =
  "WhatsApp reminders, follow-ups, and booking summaries that you write. Includes a guide for udhaar reminders.";
const path = "/ai-automation/whatsapp-automation";
const image = {
  src: "/og-ai-calling.png",
  width: 1200,
  height: 630,
  alt: "WhatsApp reminders and follow-ups you set up yourself.",
};

export const dynamic = "force-static";

export const metadata = automationMetadata({ title, description, path });

export default function WhatsAppAutomationPage() {
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
        blogHref="/blog/udhaar-whatsapp-automatic-reminder-guide"
        blogLabel="Udhaar reminder ka step-by-step guide"
        defaultServices={["WhatsApp Automation"]}
        eyebrow="WhatsApp Automation"
        pagePath={path}
        paragraphs={[
          "WhatsApp pe reminder, follow-up, aur booking summary ja sakti hai. Message wahi hota hai jo aap likhte ho.",
          "Udhaar ke reminder ka ek guide neeche hai. Usme koi rate ya client ka naam nahi hai, sirf steps.",
        ]}
        selectedBusiness="WhatsApp Automation"
        title="WhatsApp pe reminder aur follow-up"
      />
    </>
  );
}
