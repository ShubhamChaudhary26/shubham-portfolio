export type BlogList = {
  kind: "list";
  items: readonly string[];
};

export type BlogTemplates = {
  kind: "templates";
  items: readonly { label: string; text: string }[];
};

export type BlogParagraphs = {
  kind: "paragraphs";
  paragraphs: readonly string[];
};

export type BlogBlock = BlogParagraphs | BlogList | BlogTemplates;

export type BlogSection = {
  heading: string;
  blocks: readonly BlogBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description: string;
  sections: readonly BlogSection[];
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "udhaar-whatsapp-automatic-reminder-guide",
    title:
      "Udhaar ka paisa time pe kaise wapas laayein: WhatsApp pe automatic reminder (step-by-step guide)",
    date: "2026-10-25",
    excerpt:
      "Kirana aur dairy dukaan ke liye simple steps: udhaar list banao, WhatsApp Business set karo, aur polite automatic reminder bhejo.",
    description:
      "Small Indian shop owners ke liye Hinglish guide: udhaar list, WhatsApp Business, aur due date pe polite automatic reminder. Sample messages included.",
    sections: [
      {
        heading: "Udhaar ki problem",
        blocks: [
          {
            kind: "paragraphs",
            paragraphs: [
              "Udhaar dena dukaan ka hissa hai. Grahak aata hai, samaan le jata hai, aur kehta hai baad mein de denge. Problem tab hoti hai jab paisa wapas maangna awkward lagta hai. Kabhi yaad nahi rehta, kabhi message late nikalta hai, aur kabhi tone sakht ho jati hai.",
              "Automatic reminder isliye kaam aata hai. Message time pe jata hai, shabd pehle se polite likhe hote hain, aur aapko har grahak ko alag se type nahi karna padta. Aap dukaan sambhalte ho. Reminder system yaad dilata hai.",
            ],
          },
        ],
      },
      {
        heading: "Step 1: Customer udhaar list banao",
        blocks: [
          {
            kind: "paragraphs",
            paragraphs: [
              "Pehle ek saaf list banao. Google Sheet theek hai. Khata app bhi chalega, agar usme yahi details likh sakte ho. Har row ek udhaar hai, ek grahak ki ek entry.",
              "Ye columns rakho:",
            ],
          },
          {
            kind: "list",
            items: [
              "Naam",
              "WhatsApp number (country code ke saath, jaise 91 se start)",
              "Amount",
              "Date diya (jis din udhaar diya)",
              "Due date (jis din paisa wapas chahiye)",
              "Status: paid ya pending",
            ],
          },
          {
            kind: "paragraphs",
            paragraphs: [
              "Amount aur due date galat likhoge to reminder bhi galat jayega. Paisa milte hi status ko paid kar do. Pending wali rows hi reminder ke liye bachi rehni chahiye.",
            ],
          },
        ],
      },
      {
        heading: "Step 2: WhatsApp Business setup",
        blocks: [
          {
            kind: "paragraphs",
            paragraphs: [
              "Normal WhatsApp ki jagah WhatsApp Business use karo. Profile mein dukaan ka naam, category, address, aur timing likh do, taaki grahak ko pata chale message dukaan se aa raha hai.",
              "Catalogue optional hai. Agar aap roj ke samaan ki list dikhana chahte ho to laga sakte ho. Udhaar reminder ke liye zaroori nahi.",
              "Labels se kaam aasan hota hai. Ek label rakho: Udhaar pending. Jinka paisa baaki hai, unhe is label mein rakho. Paid ho jaye to label hata do, taaki aap khud bhi dekh sako kaun baaki hai.",
            ],
          },
        ],
      },
      {
        heading: "Step 3: Automation set karo",
        blocks: [
          {
            kind: "paragraphs",
            paragraphs: [
              "Ab list aur WhatsApp ko jodna hai. Idea simple hai: sheet (ya khata) mein jo rows pending hain, unke due date ke hisaab se message apne aap jaye. Google Sheet ke saath WhatsApp Business API, ya koi automation tool jo sheet padh kar WhatsApp bhej sake. Tool ka naam aur price yahan fix nahi kar rahe. Jo aapke number aur sheet ke saath kaam kare, wahi lo.",
              "Reminder ka schedule ye rakho:",
            ],
          },
          {
            kind: "list",
            items: [
              "Due date pe pehla reminder",
              "3 din baad ek follow-up, agar status abhi bhi pending hai",
              "7 din baad ek last polite reminder",
              "Har message mein UPI payment link ya QR ka link",
              "Jaise hi status paid mark ho, us row ke saare reminders band",
            ],
          },
          {
            kind: "paragraphs",
            paragraphs: [
              "Paid mark karna sabse zaroori step hai. Warna grahak paisa de chuka hoga aur message phir bhi jayega. Roz shaam ko sheet check karo, ya payment aate hi turant paid likh do.",
            ],
          },
        ],
      },
      {
        heading: "Sample message templates",
        blocks: [
          {
            kind: "paragraphs",
            paragraphs: [
              "Neeche wale messages copy karke apne naam aur link laga sakte ho. {naam}, {amount}, {due date}, aur {UPI link} ko asli detail se badal dena.",
            ],
          },
          {
            kind: "templates",
            items: [
              {
                label: "Pehla reminder, due date pe",
                text: "Namaste {naam} ji,\nAapka udhaar Rs {amount} aaj due hai ({due date}).\nJab aapke liye theek ho, is link se pay kar dijiye: {UPI link}\nPayment ho jaye to reply kar dena, taaki main list update kar doon.\nDhanyavaad.",
              },
              {
                label: "3 din baad follow-up",
                text: "Namaste {naam} ji,\nEk chhota reminder. Rs {amount} ka udhaar abhi pending hai.\nPayment yahan se ho sakta hai: {UPI link}\nAgar aapne pehle hi pay kar diya hai to bata dena, reminder band kar dunga.",
              },
              {
                label: "7 din baad last reminder",
                text: "Namaste {naam} ji,\nYe last reminder hai. Rs {amount} abhi bhi pending dikh raha hai.\nKripya is link se settle kar dijiye: {UPI link}\nKoi dikkat ho to seedha reply kar dena, hum baat kar lenge.",
              },
              {
                label: "Payment ke baad thank-you",
                text: "Namaste {naam} ji,\nPayment mil gaya. Dhanyavaad.\nAapka udhaar ab paid mark ho gaya hai. Aage is entry ke liye koi reminder nahi jayega.",
              },
            ],
          },
        ],
      },
      {
        heading: "Galtiyan jo avoid karni hain",
        blocks: [
          {
            kind: "list",
            items: [
              "Rude tone. Paisa maangte waqt bhi izzat se likho. Dhamki ya sharminda karne wale shabd mat use karo.",
              "Raat ko message. Subah dukaan khulte time ya shaam band hone se pehle bhejo, jab grahak dekh sake.",
              "Bahut zyada messages. Teen reminders kaafi hain: due date, 3 din, 7 din. Roz roz mat bhejo.",
              "Bina permission ke bulk spam. Sirf unko likho jinka number aapke paas dukaan ke kaam ke liye hai aur jinka udhaar sach mein pending hai.",
              "Paid ke baad bhi reminder. Status paid hote hi automation band honi chahiye.",
              "Galat amount. Bhejne se pehle sheet mein naam, amount, aur due date milakar dekho.",
            ],
          },
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatBlogDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
