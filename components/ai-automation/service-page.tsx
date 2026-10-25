import { LeadForm } from "@/components/ai-automation/lead-form";

type ServicePageProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  pagePath: string;
  selectedBusiness: string;
  defaultServices: string[];
};

export function ServicePage({
  eyebrow,
  title,
  paragraphs,
  pagePath,
  selectedBusiness,
  defaultServices,
}: ServicePageProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h1>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-foreground-500">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <section className="mt-10 scroll-mt-24" id="lead-form">
        <LeadForm
          defaultServices={defaultServices}
          pagePath={pagePath}
          selectedBusiness={selectedBusiness}
        />
      </section>
    </article>
  );
}
