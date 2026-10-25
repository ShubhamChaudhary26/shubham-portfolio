export const CALLING_BUSINESS_TYPES = [
  { value: "real estate", label: "Real estate" },
  { value: "clinic", label: "Clinic" },
  { value: "coaching", label: "Coaching" },
  { value: "salon", label: "Salon" },
  { value: "service centre", label: "Service centre" },
  { value: "other", label: "Other" },
] as const;

export type IndustryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type IndustryPage = {
  path: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage?: IndustryImage;
  booking: {
    heading: string;
    source: string;
    slug: string;
  };
  audio?: {
    heading: string;
    headingId: string;
    line: string;
    src: string;
    file: string;
  };
  figures?: IndustryImage[];
  benefitsTitle: string;
  benefits: { title: string; text: string; icon: string }[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  seo: {
    title: string;
    description: string;
    serviceName: string;
    serviceType: string;
    ogImage: {
      url: string;
      width: number;
      height: number;
      alt: string;
    };
  };
};

export const realEstateIndustry: IndustryPage = {
  path: "/ai-calling-agent/real-estate",
  eyebrow: "AI Calling Agent · Real Estate",
  title: "Property enquiry aaye, AI agent call uthaye",
  subtitle:
    "Site pe busy ho ya raat ho, property ke sawal miss nahi hone chahiye. Agent Hindi mein baat karta hai.",
  booking: {
    heading: "Free demo book karo",
    source: "ai-calling-agent-real-estate",
    slug: "ai-calling-agent-real-estate",
  },
  audio: {
    heading: "Real Estate Demo Call: AI agent ne property enquiry handle ki",
    headingId: "real-estate-demo-heading",
    line: "Ye hamare real estate CRM ki ek asli call hai.",
    src: "/audio/ai-calling-demo-real-estate.mp3",
    file: "audio/ai-calling-demo-real-estate.mp3",
  },
  benefitsTitle: "Real estate mein kya karta hai",
  benefits: [
    {
      title: "Property enquiries, 24x7",
      text: "Enquiry call aaye, chahe office band ho, agent uthata hai aur property ke sawal ka jawab deta hai.",
      icon: "lucide:phone-call",
    },
    {
      title: "Site visit book",
      text: "Jo log property dekhna chahte hain, unka site visit aapke diye gaye slots mein book ho jata hai.",
      icon: "lucide:calendar-check",
    },
    {
      title: "Lead follow-up",
      text: "Jo lead baad mein baat karna chahe, unhe aapke rule ke hisaab se follow-up call ja sakti hai.",
      icon: "lucide:phone-forwarded",
    },
    {
      title: "Lead qualify",
      text: "Budget, BHK, aur live ya invest. Ye short sawal se pata chal jata hai ki lead kitni serious hai.",
      icon: "lucide:user-check",
    },
    {
      title: "WhatsApp summary",
      text: "Call ke baad owner ya sales team ko WhatsApp pe short summary milti hai: naam, number, aur agla step.",
      icon: "lucide:send",
    },
  ],
  faqTitle: "Real estate sawal",
  faqs: [
    {
      question: "Demo call asli hai?",
      answer:
        "Haan. Is page ka audio hamare real estate CRM ki ek asli call hai. Agent property enquiry handle karta hai.",
    },
    {
      question: "Site visit kaise book hota hai?",
      answer:
        "Aap jo din aur time slots setup mein dete ho, agent unme se visit ka time note kar leta hai. Jo slot aapne nahi diya, woh khud se nahi banata.",
    },
    {
      question: "Lead qualify kaise hota hai?",
      answer:
        "Agent budget, BHK, aur ye poochhta hai ki log khud rehne ke liye dekh rahe hain ya invest ke liye. Sawal aap set karte ho.",
    },
    {
      question: "Summary kisko milti hai?",
      answer:
        "Owner ya sales team, jiska WhatsApp number aap dete ho. Summary mein naam, number, aur agla step hota hai.",
    },
  ],
  seo: {
    title: "AI Calling Agent for Real Estate",
    description:
      "AI calling agent for real estate that answers property enquiries 24x7 in Hindi, books site visits, qualifies leads, and sends a WhatsApp summary. Free demo.",
    serviceName: "AI Calling Agent for Real Estate",
    serviceType: "AI calling agent for real estate",
    ogImage: {
      url: "/og-ai-calling.png",
      width: 1200,
      height: 630,
      alt: "AI calling agent for real estate property enquiries, site visits, and lead follow-up.",
    },
  },
};

export const clinicIndustry: IndustryPage = {
  path: "/ai-calling-agent/clinic",
  eyebrow: "AI Calling Agent · Clinic",
  title: "Clinic ki call 24x7, Hindi mein AI receptionist uthati hai",
  subtitle:
    "Fee, timing, aur appointment. Raat ko bhi call miss nahi honi chahiye.",
  heroImage: {
    src: "/images/clinic/01_hero_clinic_night_ai_call_16x9.webp",
    alt: "Night clinic reception with a phone on the counter showing an incoming AI call.",
    width: 1600,
    height: 900,
  },
  booking: {
    heading: "Free demo meeting book karo",
    source: "ai-calling-agent-clinic",
    slug: "ai-calling-agent-clinic",
  },
  audio: {
    heading: "Clinic Sample Demo Call",
    headingId: "clinic-demo-heading",
    line: "Ye ek sample demo hai: AI receptionist raat ko patient ka appointment book kar rahi hai",
    src: "/audio/ai-calling-demo-clinic.mp3",
    file: "audio/ai-calling-demo-clinic.mp3",
  },
  figures: [
    {
      src: "/images/clinic/02_how_it_works_flow_16x9.webp",
      alt: "Illustration of a clinic call becoming an appointment and a WhatsApp summary.",
      width: 1600,
      height: 900,
      caption: "Call aati hai, appointment book hota hai, aur summary WhatsApp pe jaati hai.",
    },
    {
      src: "/images/clinic/03_whatsapp_booking_summary_4x5.webp",
      alt: "Phone showing a WhatsApp message that confirms a clinic appointment.",
      width: 1080,
      height: 1350,
      caption: "Clinic aur patient, dono ko booking ki summary.",
    },
    {
      src: "/images/clinic/04_ai_receptionist_24x7_hindi_4x5.webp",
      alt: "Clinic desk at night with a phone that says the AI receptionist answers in Hindi, 24x7.",
      width: 1080,
      height: 1350,
      caption: "Hindi mein, 24x7, call uthane ke liye.",
    },
  ],
  benefitsTitle: "Clinic mein kya karti hai",
  benefits: [
    {
      title: "Calls 24x7, Hindi mein",
      text: "Clinic band ho ya raat ho, AI receptionist call uthati hai aur Hindi mein baat karti hai.",
      icon: "lucide:phone-call",
    },
    {
      title: "Fee aur timing",
      text: "Fee aur timing ka jawab sirf wahi hota hai jo aap setup mein likhte ho. Khud se rate nahi banati.",
      icon: "lucide:clock",
    },
    {
      title: "Appointment slot",
      text: "Patient ka slot aapke diye gaye time mein book ho jata hai.",
      icon: "lucide:calendar-check",
    },
    {
      title: "WhatsApp summary",
      text: "Booking ke baad clinic aur patient, dono ko WhatsApp pe short summary mil sakti hai.",
      icon: "lucide:send",
    },
    {
      title: "Missed call follow-up",
      text: "Jo call nahi uthi, uspe aapke rule ke hisaab se follow-up call ja sakti hai.",
      icon: "lucide:phone-forwarded",
    },
  ],
  faqTitle: "Clinic sawal",
  faqs: [
    {
      question: "Kya ye kisi patient ki recorded call hai?",
      answer:
        "Nahi. Ye ek sample demo hai. Isme AI receptionist raat ko appointment book karti hai.",
    },
    {
      question: "Appointment slot kaise milta hai?",
      answer:
        "Aap jo din aur time slots dete ho, receptionist unme se book karti hai. Jo slot aapne nahi diya, woh khud se nahi banati.",
    },
    {
      question: "Fee aur timing galat to nahi bolegi?",
      answer:
        "Sirf wohi fee aur timing jo aap setup mein likhte ho. Jo detail aapne nahi di, uska andaza nahi lagati.",
    },
    {
      question: "WhatsApp summary kisko jati hai?",
      answer:
        "Clinic aur patient, dono ko, jin numbers aap set karte ho. Summary mein booking ki short detail hoti hai.",
    },
  ],
  seo: {
    title: "AI Calling Agent for Clinics",
    description:
      "AI calling agent for clinics that answers calls 24x7 in Hindi, shares fee and timing, books appointment slots, and sends a WhatsApp summary. Free demo.",
    serviceName: "AI Calling Agent for Clinics",
    serviceType: "AI calling agent for clinics",
    ogImage: {
      url: "/images/clinic/01_hero_clinic_night_ai_call_16x9.webp",
      width: 1600,
      height: 900,
      alt: "Night clinic reception with a phone on the counter showing an incoming AI call.",
    },
  },
};
