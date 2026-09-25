import { DATA } from "@/data";
import { SITE_URL } from "@/lib/site";

export const SITE_DESCRIPTION = DATA.home.hero.subtitle;

export const SEO_KEYWORDS = [
  "Shubham Chaudhary",
  "Full Stack Developer",
  "full stack developer",
  "AI calling agents",
  "AI chatbots",
  "CRM",
  "CRM apps",
  "web apps",
  "mobile apps",
  "Vapi",
  "Gujarat",
  "India",
  "Executive",
  "NR Agrawal",
  "Stampzo",
  "shubh.work",
];

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Shubham Chaudhary, full stack developer in Vapi, Gujarat",
} as const;

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: DATA.about.profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/shubham.jpg`,
  jobTitle: "Executive",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vapi",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "NR Agrawal",
  },
  email: DATA.footer.contact.email,
  telephone: DATA.footer.contact.phone,
  knowsAbout: [
    "Full stack development",
    "AI calling agents",
    "AI chatbots",
    "CRM apps",
    "Web applications",
    "Mobile applications",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
  ],
  sameAs: DATA.footer.socialLinks.map((link) => link.url),
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: DATA.home.hero.name,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export const aboutJsonLd = {
  "@context": "https://schema.org",
  ...person,
};
