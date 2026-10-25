/**
 * AI Automation pages. Config for audio, video, and screenshots lives here.
 *
 * Explainer voiceover: `audio.src` (default `public/audio/voiceovers/<file>.mp3`).
 * The player shows only when that file exists. Matching transcript is the
 * sibling `.txt`. Hub and Other use `GENERAL_VOICEOVER` (`general.mp3`).
 *
 * Demo call: `demoCallSrc` on every industry, played above the explainer.
 * Clinic and real estate point at the files already in `public/audio/`.
 * The others point at `public/audio/demo-calls/<voiceoverFile>_demo_call.mp3`.
 * A missing file shows "Demo call jald aa raha hai". Dropping that mp3
 * is enough to turn the player on. Do not reuse another industry's call.
 *
 * Video: `walkthroughVideo.src` and optional `poster`. The shared CRM
 * walkthrough is `CRM_WALKTHROUGH` (`public/videos/crm-walkthrough.mp4`,
 * 720p). Poster is `public/images/crm-walkthrough-poster.webp`.
 * Empty or missing files keep the "Walkthrough video jald aa raha hai" slot.
 *
 * Screenshots: `screenshots`. The gallery stays hidden while empty.
 */

export const AUTOMATION_SERVICES = [
  "AI Calling Agent",
  "AI Chatbot",
  "WhatsApp Automation",
  "Instagram DM Automation",
  "Instagram/Facebook Lead Automation",
  "Other",
] as const;

export const CALL_TIMES = ["Morning", "Afternoon", "Evening"] as const;

export const GENERAL_VOICEOVER = "/audio/voiceovers/general.mp3";

export type AutomationImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export const EXPLAINER_LABEL = "AI Agent explainer (sample voice)";

export type IndustryAudio = {
  src: string;
  headingId: string;
};

export type DemoCall = {
  line: string;
  headingId: string;
};

export type WalkthroughVideo = {
  src?: string;
  poster?: string;
};

export const CRM_WALKTHROUGH: WalkthroughVideo = {
  src: "/videos/crm-walkthrough.mp4",
  poster: "/images/crm-walkthrough-poster.webp",
};

export type IndustryConfig = {
  slug: string;
  voiceoverFile: string;
  name: string;
  path: string;
  title: string;
  subtitle: string;
  audio: IndustryAudio;
  /** Public URL of the sample call. The player mounts when this file exists. */
  demoCallSrc: string;
  demoCall: DemoCall;
  walkthroughVideo: WalkthroughVideo;
  heroImage: AutomationImage;
  screenshots: AutomationImage[];
  seo: {
    title: string;
    description: string;
    serviceName: string;
    ogImage: AutomationImage;
  };
};

function industry(input: IndustryConfig): IndustryConfig {
  return input;
}

export const INDUSTRIES: IndustryConfig[] = [
  industry({
    slug: "clinic",
    voiceoverFile: "clinic",
    name: "Clinic",
    path: "/ai-automation/clinic",
    title: "Clinic ke liye AI Calling Agent",
    subtitle:
      "Fee, timing, aur appointment. Jawab sirf wohi hota hai jo aap setup mein likhte ho.",
    audio: {
      src: "/audio/voiceovers/clinic.mp3",
      headingId: "clinic-explainer-heading",
    },
    demoCallSrc: "/audio/ai-calling-demo-clinic.mp3",
    demoCall: {
      line: "Ye ek sample demo hai: AI receptionist raat ko patient ka appointment book kar rahi hai",
      headingId: "clinic-demo-heading",
    },
    walkthroughVideo: CRM_WALKTHROUGH,
    heroImage: {
      src: "/images/clinic/01_hero_clinic_night_ai_call_16x9.webp",
      alt: "Raat ko clinic reception, counter pe phone pe AI call aa rahi hai.",
      width: 1600,
      height: 900,
    },
    screenshots: [
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
    seo: {
      title: "AI Calling Agent for Clinics",
      description:
        "AI calling agent for clinics that answers in Hindi, shares the fee and timing you set, and books appointment slots. Sample demo audio on this page.",
      serviceName: "AI Calling Agent for Clinics",
      ogImage: {
        src: "/images/clinic/01_hero_clinic_night_ai_call_16x9.webp",
        alt: "Night clinic reception with a phone on the counter showing an incoming AI call.",
        width: 1600,
        height: 900,
      },
    },
  }),
  industry({
    slug: "real-estate",
    voiceoverFile: "real_estate",
    name: "Real Estate",
    path: "/ai-automation/real-estate",
    title: "Real estate ke liye AI Calling Agent",
    subtitle:
      "Property enquiry, budget, aur site visit. Is page ki call hamare real estate CRM ki ek asli call hai.",
    audio: {
      src: "/audio/voiceovers/real_estate.mp3",
      headingId: "real-estate-explainer-heading",
    },
    demoCallSrc: "/audio/ai-calling-demo-real-estate.mp3",
    demoCall: {
      line: "Ye hamare real estate CRM ki ek asli call hai.",
      headingId: "real-estate-demo-heading",
    },
    walkthroughVideo: CRM_WALKTHROUGH,
    heroImage: {
      src: "/images/ai-automation/real_estate/01_hero_real_estate_night_ai_call_16x9.webp",
      alt: "Raat ko real estate desk, screen pe AI calling agent property enquiry le raha hai.",
      width: 1280,
      height: 720,
    },
    screenshots: [
      {
        src: "/images/ai-automation/real_estate/02_how_it_works_flow_16x9.webp",
        alt: "Property enquiry se site visit aur WhatsApp summary tak ka flow.",
        width: 1280,
        height: 720,
        caption: "Enquiry aati hai, site visit book hota hai, aur summary WhatsApp pe jaati hai.",
      },
      {
        src: "/images/ai-automation/real_estate/03_whatsapp_site_visit_confirmation_4x5.webp",
        alt: "WhatsApp pe site visit confirm hone ka message.",
        width: 864,
        height: 1080,
        caption: "Owner ko site visit ki short confirmation.",
      },
    ],
    seo: {
      title: "AI Calling Agent for Real Estate",
      description:
        "AI calling agent for real estate that handles property enquiries in Hindi, notes budget and site visits, and saves a summary in the CRM. Real demo call on this page.",
      serviceName: "AI Calling Agent for Real Estate",
      ogImage: {
        src: "/images/ai-automation/real_estate/01_hero_real_estate_night_ai_call_16x9.webp",
        alt: "Raat ko real estate desk, screen pe AI calling agent property enquiry le raha hai.",
        width: 1280,
        height: 720,
      },
    },
  }),
  industry({
    slug: "restaurant",
    voiceoverFile: "restaurant",
    name: "Restaurant",
    path: "/ai-automation/restaurant",
    title: "Restaurant ke liye AI Calling Agent",
    subtitle: "Table, timing, aur order ke sawal. Agent wahi bolta hai jo aap setup mein likhte ho.",
    audio: {
      src: "/audio/voiceovers/restaurant.mp3",
      headingId: "restaurant-explainer-heading",
    },
    demoCallSrc: "/audio/demo-calls/restaurant_demo_call.mp3",
    demoCall: {
      line: "Ye ek sample demo hai: AI receptionist raat ko table booking kar rahi hai",
      headingId: "restaurant-demo-heading",
    },
    walkthroughVideo: CRM_WALKTHROUGH,
    heroImage: {
      src: "/images/ai-automation/restaurant/01_hero_restaurant_night_ai_call_16x9.webp",
      alt: "Raat ko restaurant, jahan phone pe AI call aa rahi hai.",
      width: 1280,
      height: 720,
    },
    screenshots: [
      {
        src: "/images/ai-automation/restaurant/02_how_it_works_flow_16x9.webp",
        alt: "Restaurant call se table booking aur WhatsApp note tak ka flow.",
        width: 1280,
        height: 720,
        caption: "Call aati hai, table book hota hai, aur note WhatsApp pe jaata hai.",
      },
      {
        src: "/images/ai-automation/restaurant/03_whatsapp_table_booking_confirmation_4x5.webp",
        alt: "WhatsApp pe table booking confirm hone ka message.",
        width: 864,
        height: 1080,
        caption: "Table booking ki short confirmation.",
      },
    ],
    seo: {
      title: "AI Calling Agent for Restaurants",
      description:
        "AI calling agent for restaurants that answers table, timing, and order questions in Hindi and saves the lead in the CRM.",
      serviceName: "AI Calling Agent for Restaurants",
      ogImage: {
        src: "/images/ai-automation/restaurant/01_hero_restaurant_night_ai_call_16x9.webp",
        alt: "Raat ko restaurant, jahan phone pe AI call aa rahi hai.",
        width: 1280,
        height: 720,
      },
    },
  }),
  industry({
    slug: "salon",
    voiceoverFile: "salon",
    name: "Salon",
    path: "/ai-automation/salon",
    title: "Salon ke liye AI Calling Agent",
    subtitle: "Service aur appointment ke sawal. Slot sirf aapke diye gaye time mein note hota hai.",
    audio: {
      src: "/audio/voiceovers/salon.mp3",
      headingId: "salon-explainer-heading",
    },
    demoCallSrc: "/audio/demo-calls/salon_demo_call.mp3",
    demoCall: {
      line: "Ye ek sample demo hai: AI receptionist appointment book kar rahi hai",
      headingId: "salon-demo-heading",
    },
    walkthroughVideo: CRM_WALKTHROUGH,
    heroImage: {
      src: "/images/ai-automation/salon/01_hero_salon_night_ai_call_16x9.webp",
      alt: "Raat ko salon, jahan phone pe AI call aa rahi hai.",
      width: 1280,
      height: 720,
    },
    screenshots: [
      {
        src: "/images/ai-automation/salon/02_how_it_works_flow_16x9.webp",
        alt: "Salon call se appointment aur WhatsApp note tak ka flow.",
        width: 1280,
        height: 720,
        caption: "Call aati hai, appointment note hota hai, aur summary WhatsApp pe jaati hai.",
      },
      {
        src: "/images/ai-automation/salon/03_whatsapp_appointment_confirmation_4x5.webp",
        alt: "WhatsApp pe salon appointment confirm hone ka message.",
        width: 864,
        height: 1080,
        caption: "Appointment ki short confirmation.",
      },
    ],
    seo: {
      title: "AI Calling Agent for Salons",
      description:
        "AI calling agent for salons that answers service questions in Hindi and notes appointment slots you have opened.",
      serviceName: "AI Calling Agent for Salons",
      ogImage: {
        src: "/images/ai-automation/salon/01_hero_salon_night_ai_call_16x9.webp",
        alt: "Raat ko salon, jahan phone pe AI call aa rahi hai.",
        width: 1280,
        height: 720,
      },
    },
  }),
  industry({
    slug: "coaching",
    voiceoverFile: "coaching",
    name: "Coaching/Education",
    path: "/ai-automation/coaching",
    title: "Coaching aur education ke liye AI Calling Agent",
    subtitle: "Course, batch, aur demo class ke sawal. Jo detail aapne nahi di, uska andaza nahi lagta.",
    audio: {
      src: "/audio/voiceovers/coaching.mp3",
      headingId: "coaching-explainer-heading",
    },
    demoCallSrc: "/audio/demo-calls/coaching_demo_call.mp3",
    demoCall: {
      line: "Ye ek sample demo hai: AI agent free demo class book kar raha hai",
      headingId: "coaching-demo-heading",
    },
    walkthroughVideo: CRM_WALKTHROUGH,
    heroImage: {
      src: "/images/ai-automation/coaching/01_hero_coaching_night_ai_call_16x9.webp",
      alt: "Raat ko coaching centre, jahan phone pe AI call aa rahi hai.",
      width: 1280,
      height: 720,
    },
    screenshots: [
      {
        src: "/images/ai-automation/coaching/02_how_it_works_flow_16x9.webp",
        alt: "Coaching enquiry se demo class aur WhatsApp note tak ka flow.",
        width: 1280,
        height: 720,
        caption: "Enquiry aati hai, demo class book hoti hai, aur note WhatsApp pe jaata hai.",
      },
      {
        src: "/images/ai-automation/coaching/03_whatsapp_demo_class_confirmation_4x5.webp",
        alt: "WhatsApp pe demo class confirm hone ka message.",
        width: 864,
        height: 1080,
        caption: "Demo class ki short confirmation.",
      },
    ],
    seo: {
      title: "AI Calling Agent for Coaching",
      description:
        "AI calling agent for coaching and education that answers course and batch questions in Hindi and books a slot you have opened.",
      serviceName: "AI Calling Agent for Coaching and Education",
      ogImage: {
        src: "/images/ai-automation/coaching/01_hero_coaching_night_ai_call_16x9.webp",
        alt: "Raat ko coaching centre, jahan phone pe AI call aa rahi hai.",
        width: 1280,
        height: 720,
      },
    },
  }),
  industry({
    slug: "gym",
    voiceoverFile: "gym",
    name: "Gym",
    path: "/ai-automation/gym",
    title: "Gym ke liye AI Calling Agent",
    subtitle: "Membership aur trial ke sawal. Follow-up call aapke rule se ja sakti hai.",
    audio: {
      src: "/audio/voiceovers/gym.mp3",
      headingId: "gym-explainer-heading",
    },
    demoCallSrc: "/audio/demo-calls/gym_demo_call.mp3",
    demoCall: {
      line: "Ye ek sample demo hai: AI agent free trial book kar raha hai",
      headingId: "gym-demo-heading",
    },
    walkthroughVideo: CRM_WALKTHROUGH,
    heroImage: {
      src: "/images/ai-automation/gym/01_hero_gym_night_ai_call_16x9.webp",
      alt: "Raat ko gym, jahan phone pe AI call aa rahi hai.",
      width: 1280,
      height: 720,
    },
    screenshots: [
      {
        src: "/images/ai-automation/gym/02_how_it_works_flow_16x9.webp",
        alt: "Gym call se free trial aur WhatsApp note tak ka flow.",
        width: 1280,
        height: 720,
        caption: "Call aati hai, trial note hota hai, aur summary WhatsApp pe jaati hai.",
      },
      {
        src: "/images/ai-automation/gym/03_whatsapp_free_trial_confirmation_4x5.webp",
        alt: "WhatsApp pe gym free trial confirm hone ka message.",
        width: 864,
        height: 1080,
        caption: "Free trial ki short confirmation.",
      },
    ],
    seo: {
      title: "AI Calling Agent for Gyms",
      description:
        "AI calling agent for gyms that answers membership and trial questions in Hindi and logs the lead for follow-up.",
      serviceName: "AI Calling Agent for Gyms",
      ogImage: {
        src: "/images/ai-automation/gym/01_hero_gym_night_ai_call_16x9.webp",
        alt: "Raat ko gym, jahan phone pe AI call aa rahi hai.",
        width: 1280,
        height: 720,
      },
    },
  }),
  industry({
    slug: "hotel",
    voiceoverFile: "hotel",
    name: "Hotel",
    path: "/ai-automation/hotel",
    title: "Hotel ke liye AI Calling Agent",
    subtitle: "Room, timing, aur booking ke sawal. Availability wahi hoti hai jo aap dete ho.",
    audio: {
      src: "/audio/voiceovers/hotel.mp3",
      headingId: "hotel-explainer-heading",
    },
    demoCallSrc: "/audio/demo-calls/hotel_demo_call.mp3",
    demoCall: {
      line: "Ye ek sample demo hai: AI receptionist room booking kar rahi hai",
      headingId: "hotel-demo-heading",
    },
    walkthroughVideo: CRM_WALKTHROUGH,
    heroImage: {
      src: "/images/ai-automation/hotel/01_hero_hotel_night_ai_call_16x9.webp",
      alt: "Raat ko hotel front desk, jahan phone pe AI call aa rahi hai.",
      width: 1280,
      height: 720,
    },
    screenshots: [
      {
        src: "/images/ai-automation/hotel/02_how_it_works_flow_16x9.webp",
        alt: "Hotel call se room booking aur WhatsApp note tak ka flow.",
        width: 1280,
        height: 720,
        caption: "Call aati hai, room note hota hai, aur summary WhatsApp pe jaati hai.",
      },
      {
        src: "/images/ai-automation/hotel/03_whatsapp_room_booking_confirmation_4x5.webp",
        alt: "WhatsApp pe room booking confirm hone ka message.",
        width: 864,
        height: 1080,
        caption: "Room booking ki short confirmation.",
      },
    ],
    seo: {
      title: "AI Calling Agent for Hotels",
      description:
        "AI calling agent for hotels that answers room and timing questions in Hindi and notes a booking from the availability you set.",
      serviceName: "AI Calling Agent for Hotels",
      ogImage: {
        src: "/images/ai-automation/hotel/01_hero_hotel_night_ai_call_16x9.webp",
        alt: "Raat ko hotel front desk, jahan phone pe AI call aa rahi hai.",
        width: 1280,
        height: 720,
      },
    },
  }),
];

export const BUSINESS_TYPES = [
  ...INDUSTRIES.map((item) => item.name),
  "Other",
] as const;

export const CRM_STEPS = [
  {
    title: "Lead aata hai",
    text: "Call, Instagram, ya Facebook se.",
  },
  {
    title: "AI agent Hindi mein baat karta hai",
    text: "Call karta hai, ya aayi hui call uthata hai.",
  },
  {
    title: "Jawab aur booking",
    text: "Sawal ka jawab milta hai, aur booking ho jati hai.",
  },
  {
    title: "CRM mein save",
    text: "Recording aur summary CRM mein save hoti hai.",
  },
  {
    title: "Follow-up call",
    text: "Aapke rule ke hisaab se dobara call ja sakti hai.",
  },
  {
    title: "Owner dashboard",
    text: "Owner sab calls, notes, aur agla step ek jagah dekhta hai.",
  },
] as const;

export const CRM_FEATURES = [
  {
    title: "Inbound calls",
    text: "Aayi hui call AI agent Hindi mein utha sakta hai. Jawab sirf aapke setup se aata hai.",
  },
  {
    title: "Outbound calls",
    text: "Aapki list pe follow-up call ja sakti hai, jis rule ko aap on karte ho.",
  },
  {
    title: "Instagram add-on",
    text: "Instagram pe aaya sawal CRM mein aa sakta hai, aur agent us lead pe call kar sakta hai.",
  },
  {
    title: "Instagram & Facebook Leads",
    text: "IG aur Facebook ads, comments, aur DMs ke leads CRM mein aa jate hain. AI unhe minutes mein call karta hai.",
  },
  {
    title: "Own number",
    text: "Agent aapke diye gaye number pe chal sakta hai, taaki customer aapka number dekhe.",
  },
  {
    title: "Voice",
    text: "Baat Hindi mein hoti hai. Industry voiceover alag se lagti hai, jab file ready ho.",
  },
  {
    title: "Scheduler",
    text: "Appointment ya visit aapke diye gaye slots mein note ho sakta hai. Khali slot khud se nahi banta.",
  },
] as const;

export const HUB_HERO: AutomationImage = {
  src: "/images/ai-automation/general/01_hub_crm_dashboard_all_businesses_16x9.webp",
  alt: "CRM dashboard jisme kai businesses ke calls aur leads ek jagah dikh rahe hain.",
  width: 1280,
  height: 720,
};

export function industryBySlug(slug: string) {
  return INDUSTRIES.find((item) => item.slug === slug);
}
