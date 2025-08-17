import Head from "next/head";
import { ProfileCard } from "@/components/about/profile-card";
import { EducationTimeline } from "@/components/about/timelines/education-timeline";
import { ExperienceTimeline } from "@/components/about/timelines/experience-timeline";
import { Skills } from "@/components/about/skills";
import { PageHeader } from "@/components/page-header";
import { DATA } from "@/data";

export default function AboutPage() {
  const { education, experience, profile } = DATA.about;
  const tech = DATA.about.technologies;

  // ✅ Ensure meta description (max ~160 chars for SEO)
  const description = Array.isArray(profile.description)
    ? profile.description.join(" ").slice(0, 160)
    : String(profile.description).slice(0, 160);

  const pageUrl = "https://shubh26.com/about";
  const pageImage = "https://shubh26.com/shubham.jpg";

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>
          About {profile.name} | Shubham Chaudhary (Shubh26) | Full Stack
          Developer
        </title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="About Shubham Chaudhary, Shubham Chaudhary Full Stack Developer, Shubh26 portfolio, React Developer, Next.js, Node.js, MongoDB, Shubham Chaudhary biography"
        />
        <meta name="author" content={profile.name} />
        <meta name="robots" content="index, follow" />

        {/* ✅ Open Graph */}
        <meta
          property="og:title"
          content={`About ${profile.name} | Full Stack Developer`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={pageUrl} />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`About ${profile.name} | Full Stack Developer`}
        />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={pageImage} />

        {/* ✅ Canonical */}
        <link rel="canonical" href={pageUrl} />

        {/* ✅ Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://shubh26.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: pageUrl,
              },
            ],
          })}
        </script>

        {/* ✅ Person Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            url: pageUrl,
            image: pageImage,
            jobTitle: "Full Stack Developer",
            worksFor: {
              "@type": "Organization",
              name: "Shubh26",
              url: "https://shubh26.com",
            },
            knowsAbout: tech,
            sameAs: [
              "https://github.com/ShubhamChaudhary26",
              "https://linkedin.com/in/shubham-chaudhary-react",
              "https://x.com/Shubh26___?t=VBO8ygtdm3xjCi3KvfOhIQ&s=09",
            ],
          })}
        </script>
      </Head>

      {/* ✅ Hidden h1 for SEO */}
      <h1 className="sr-only">
        About Shubham Chaudhary (Shubh26) | Full Stack Developer Portfolio
      </h1>

      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-foreground">
        <PageHeader texts={DATA.morphingTexts.about} />
        <ProfileCard
          description={profile.description}
          image={profile.image}
          name={profile.name}
          title="Full Stack Developer"
        />

        <EducationTimeline education={education} />
        <ExperienceTimeline experience={experience} />
        <Skills tech={tech} />
      </section>
    </>
  );
}
