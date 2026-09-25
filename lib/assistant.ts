import { DATA } from "@/data";
import { SITE_URL } from "@/lib/site";

function includesAny(query: string, terms: string[]) {
  return terms.some((term) => query.includes(term));
}

function hasWord(query: string, word: string) {
  return new RegExp(`\\b${word}\\b`).test(query);
}

function scheduleAnswer() {
  return [
    `You can book a meeting with Shubham here: ${SITE_URL}/schedule`,
    "",
    "Weekday slots run from 10:00 to 19:00 India Standard Time (Asia/Kolkata), in 30-minute steps. The page also shows that time in your local timezone.",
    "Add your name, email, and what you want to talk about. The confirmation screen gives you a Google Calendar invite — Shubham is added as a guest — and a downloadable calendar file.",
  ].join("\n");
}

function currentRoleAnswer() {
  const current = DATA.about.experience.find((item) => item.current);

  return [
    `${DATA.about.profile.name} currently works at NR Agrawal.`,
    current
      ? `${current.title} (${current.date}).`
      : "The current title on the site is Full Stack Developer.",
    current?.description ?? "",
    "",
    "His current focus is AI calling agents (voice AI that makes and takes phone calls), AI bots and chatbots, and mobile and web apps.",
    "Soltech is a previous role, not his current one.",
  ]
    .filter(Boolean)
    .join("\n");
}

function experienceAnswer() {
  const lines = DATA.about.experience.map((item, index) => {
    const status = item.current ? "Current" : "Past";

    return `${index + 1}. ${item.title} — ${status}\n   ${item.date}\n   ${item.description}`;
  });

  return [
    "Experience, latest first:",
    "",
    lines.join("\n\n"),
    "",
    "NR Agrawal is the current role. Soltech, MintSurvey, and Divine Infotech are previous roles.",
  ].join("\n");
}

function skillsAnswer() {
  const groups = DATA.home.skills.groups
    .map((group) => `• ${group.name}: ${group.items.join(", ")}`)
    .join("\n");
  const focus = DATA.home.focus.items
    .map((item) => `• ${item.title}: ${item.description}`)
    .join("\n");

  return `Current focus:\n${focus}\n\nSkills:\n${groups}`;
}

function projectsAnswer() {
  const list = DATA.projects.work
    .map((project) => `• ${project.title}${project.live ? ` — ${project.live}` : ""}`)
    .join("\n");

  return `Selected projects:\n${list}\n\nThe full list is at ${SITE_URL}/projects.`;
}

function contactAnswer() {
  const { email, phone, location } = DATA.footer.contact;

  return [
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Location: ${location}`,
    `Website: ${SITE_URL}`,
    "",
    `To book a call, use ${SITE_URL}/schedule.`,
  ].join("\n");
}

function educationAnswer() {
  return DATA.about.education
    .map((item) => `• ${item.title} (${item.date})\n  ${item.description}`)
    .join("\n");
}

export function getBotResponse(raw: string): string {
  const query = raw.replace(/[?!.,]/g, "").toLowerCase().trim();
  const words = query.split(/\s+/).filter(Boolean);

  if (!query) {
    return "Ask about Shubham's current role, focus, projects, or how to schedule a meeting.";
  }

  const wantsMeeting =
    includesAny(query, [
      "schedule",
      "meeting",
      "appointment",
      "calendly",
      "cal.com",
      "cal com",
      "book a",
      "book time",
      "hop on",
      "catch up",
      "zoom",
      "google meet",
      "lets talk",
      "can we talk",
      "want to talk",
      "speak with",
      "talk to",
    ]) ||
    hasWord(query, "meet") ||
    hasWord(query, "booking") ||
    (hasWord(query, "call") && !includesAny(query, ["calling", "caller"]));

  if (wantsMeeting) {
    return scheduleAnswer();
  }

  if (
    words.some((word) =>
      ["hi", "hello", "hey", "hola", "namaste", "greetings", "howdy"].includes(word),
    ) &&
    words.length < 5
  ) {
    return "Hello. Shubham Chaudhary is a full stack developer in Pune, currently at NR Agrawal. He builds AI calling agents, AI bots, and apps. Ask about his work, projects, or scheduling a meeting.";
  }

  const asksAboutAssistant =
    !query.includes("shubham") &&
    (query.includes("who are you") ||
      query.includes("what are you") ||
      query.includes("what can you") ||
      (words.some((word) => ["bot", "assistant", "chatbot"].includes(word)) &&
        words.some((word) => ["who", "what", "you"].includes(word))));

  if (asksAboutAssistant) {
    return `I am the assistant on Shubham Chaudhary's portfolio at ${SITE_URL}. I can cover his role at NR Agrawal, his focus on AI calling agents, AI bots, and apps, plus projects, experience, contact details, and how to schedule a meeting.`;
  }

  if (
    includesAny(query, [
      "nr agrawal",
      "agrawal",
      "current job",
      "current role",
      "present role",
      "where does he work",
      "where do you work",
      "employer",
      "company",
      "feb 2026",
      "february",
    ]) ||
    (includesAny(query, ["when", "since", "joined", "started"]) &&
      includesAny(query, ["work", "job", "role", "company", "agrawal", "nr"]))
  ) {
    return currentRoleAnswer();
  }

  if (query.includes("soltech")) {
    const role = DATA.about.experience.find((item) =>
      item.title.toLowerCase().includes("soltech"),
    );

    return [
      "Soltech is a previous role, not Shubham's current job.",
      role ? `${role.title}\n${role.date}\n${role.description}` : "",
      "",
      "He currently works at NR Agrawal.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  if (includesAny(query, ["mintsurvey", "mint survey"])) {
    const role = DATA.about.experience.find((item) =>
      item.title.toLowerCase().includes("mintsurvey"),
    );

    return role
      ? `MintSurvey is a previous role.\n${role.title}\n${role.date}\n${role.description}`
      : "MintSurvey is a previous role, before NR Agrawal.";
  }

  if (includesAny(query, ["divine", "intern"])) {
    const role = DATA.about.experience.find((item) =>
      item.title.toLowerCase().includes("divine"),
    );

    return role
      ? `${role.title}\n${role.date}\n${role.description}`
      : "Shubham interned as a React.js developer at Divine Infotech.";
  }

  if (
    includesAny(query, [
      "experience",
      "career",
      "employment",
      "work history",
      "previous role",
      "past role",
    ]) ||
    (words.includes("work") && !includesAny(query, ["framework", "network"]))
  ) {
    return experienceAnswer();
  }

  if (
    includesAny(query, [
      "skill",
      "stack",
      "technolog",
      "expertise",
      "react",
      "next",
      "node",
      "mongo",
    ])
  ) {
    return skillsAnswer();
  }

  if (
    includesAny(query, [
      "calling",
      "voice",
      "chatbot",
      "bots",
      "focus",
      "what do you build",
      "what does he build",
      "what does he do",
      "what do you do",
      "ai agent",
      "apps",
    ])
  ) {
    return skillsAnswer();
  }

  if (includesAny(query, ["project", "portfolio piece", "case stud", "built", "github"])) {
    return projectsAnswer();
  }

  if (
    includesAny(query, [
      "contact",
      "email",
      "phone",
      "linkedin",
      "reach",
      "hire",
      "availability",
    ])
  ) {
    if (includesAny(query, ["hire", "availability", "available", "freelance", "opportunity"])) {
      return `${currentRoleAnswer()}\n\nHe is employed at NR Agrawal. For a conversation, schedule a meeting or use the contact form.\n\n${contactAnswer()}`;
    }

    return contactAnswer();
  }

  if (includesAny(query, ["education", "college", "university", "degree", "mca", "bca"])) {
    return educationAnswer();
  }

  if (includesAny(query, ["pune", "location", "based", "maharashtra", "where"])) {
    return `${DATA.about.profile.name} is based in ${DATA.footer.contact.location}.`;
  }

  if (
    includesAny(query, ["shubh.work", "domain", "website", "shubh26"]) ||
    query === "site" ||
    query.includes("portfolio url")
  ) {
    return `Shubham's portfolio lives at ${SITE_URL}.`;
  }

  if (
    includesAny(query, [
      "who is shubham",
      "about shubham",
      "tell me about",
      "introduce",
      "who are you",
    ]) ||
    query === "about" ||
    query.includes("name")
  ) {
    return [
      DATA.about.profile.description.join(" "),
      "",
      `Portfolio: ${SITE_URL}`,
      `Schedule a meeting: ${SITE_URL}/schedule`,
    ].join("\n");
  }

  return [
    "I can help with:",
    "• Current role at NR Agrawal",
    "• AI calling agents, AI bots, and apps",
    "• Experience (Soltech is a past role)",
    "• Projects",
    "• Contact details",
    `• Scheduling a meeting (${SITE_URL}/schedule)`,
    "",
    "Try asking about one of those.",
  ].join("\n");
}
