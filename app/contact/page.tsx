"use client";

import { addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useCallback, useState } from "react";

import { ContactCard } from "@/components/contact/contact-card";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/contact-map";
import { ContactFormData, ContactPageState } from "@/components/contact/types";
import { PageHeader } from "@/components/page-header";
import { ScheduleCta } from "@/components/schedule/schedule-cta";
import { DATA } from "@/data";
import { sendPortfolioEmail } from "@/lib/email";

const ContactPage: React.FC = () => {
  const [state, setState] = useState<ContactPageState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const handleSubmit = useCallback(async (formData: ContactFormData): Promise<void> => {
    setState((prev) => ({ ...prev, isSubmitting: true, error: null }));

    const result = await sendPortfolioEmail({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    if (result.ok) {
      setState((prev) => ({ ...prev, isSuccess: true, isSubmitting: false }));
      addToast({
        title: "Message Sent Successfully",
        description: "Thank you for your message. I'll get back to you soon.",
        color: "success",
      });

      return;
    }

    const description = "Something went wrong sending your message. Please try again.";

    setState((prev) => ({ ...prev, isSubmitting: false, error: description }));
    addToast({
      title: "Failed to Send Message",
      description,
      color: "danger",
    });
  }, []);

  const handleReset = useCallback(() => {
    setState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });
  }, []);

  return (
    <section className="px-4 py-16 md:py-24">
      <PageHeader texts={DATA.morphingTexts.contact} />
      <div className="mx-auto max-w-3xl">
        <ScheduleCta />
        <ContactCard heading={DATA.contact.heading}>
          <p className="mb-4 flex items-center justify-center gap-2 text-sm text-foreground-500">
            <Icon icon="lucide:map-pin" />
            {DATA.contact.location.address}
          </p>
          <ContactMap
            src={DATA.contact.location.mapSrc}
            title={`Map of ${DATA.contact.location.address}`}
          />
          <ContactForm
            isSubmitting={state.isSubmitting}
            isSuccess={state.isSuccess}
            onReset={handleReset}
            onSubmit={handleSubmit}
          />
        </ContactCard>
        {state.error ? (
          <div className="mt-6 rounded-2xl border border-danger/30 bg-danger/10 p-4">
            <p className="text-sm text-danger">{state.error}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ContactPage;
