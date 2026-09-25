export const DATA = {
  home: {
    hero: {
      name: "Shubham Chaudhary",
      title: "Full Stack Developer",
      headline: "I build AI calling agents, bots, and apps.",
      subtitle:
        "Full stack developer in Pune, at NR Agrawal — shipping voice AI for phone calls, chatbots, and mobile and web apps.",
      role: "Full Stack Developer at NR Agrawal",
      location: "Pune, Maharashtra",
    },
    focus: {
      sectionTitle: "What I build",
      sectionDescription:
        "Voice agents, conversational bots, and the products around them.",
      items: [
        {
          title: "AI Calling Agents",
          description:
            "Voice AI agents that place and answer phone calls, hold a real conversation, and hand off when a person should take over.",
          icon: "lucide:phone-call",
        },
        {
          title: "AI Bots",
          description:
            "Chatbots and assistants that answer questions, guide people through a task, and stay useful inside a product.",
          icon: "lucide:bot",
        },
        {
          title: "Apps",
          description:
            "Mobile and web apps with clear interfaces, reliable backends, and the kind of polish people notice.",
          icon: "lucide:layout-grid",
        },
      ],
    },
    skills: {
      sectionTitle: "Skills",
      sectionDescription:
        "A full stack toolkit, used for voice agents, chatbots, and the apps around them.",
      groups: [
        {
          name: "AI & Voice",
          items: ["AI calling agents", "Voice AI", "Chatbots", "Conversation design"],
        },
        {
          name: "Apps",
          items: ["Web apps", "Mobile apps", "Product UI", "Responsive design"],
        },
        {
          name: "Frontend",
          items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        },
        {
          name: "Backend",
          items: ["Node.js", "Express", "MongoDB", "REST APIs"],
        },
      ],
    },
    testimonials: {
      sectionTitle: "Client & Team Feedback",
      sectionDescription:
        "What clients and colleagues say about working with me",
      items: [
        // {
        //   id: 1,
        //   name: "DevStack",
        //   role: "Software Developer",
        //   content:
        //     "Shubham consistently ships features ahead of schedule. His React and API integration work has streamlined our internal tools and improved survey operations.",
        //   avatar: "/adu.jpeg",
        // },
        {
          id: 2,
          name: "Creative",
          role: "ERP Developer",
          content:
            "I was impressed with how quickly we could set up and deploy our rent agreements. It feels very professional.",
          avatar: "/abhi.png",
        },
        {
          id: 3,
          name: "TechnoSoft",
          role: "Python Developer",
          content:
            "The user experience is smooth and modern. My team enjoyed how easy it was to integrate new workflows.",
          avatar: "/krish.jpeg",
        },
        {
          id: 4,
          name: "Faluraa",
          role: "Full Stack Developer",
          content:
            "He quickly became a key contributor—clean components, smart state management, and solid problem-solving under deadlines.",
          avatar: "/amit.jpeg",
        },
      ],
    },
  },
  about: {
    profile: {
      name: "Shubham Chaudhary",
      image: "/shubham.jpg",
      description: [
        "I am a full stack developer based in Pune, Maharashtra, currently working at NR Agrawal.",
        "My focus is AI calling agents — voice AI that makes and takes phone calls — along with AI bots and mobile and web apps.",
        "I work with React, Next.js, Node.js, and TypeScript, and I care about software that feels clear, fast, and dependable.",
      ],
    },
    education: [
      {
        title: "Master of Computer Application (MCA)",
        date: "2023 - 2025",
        icon: "mdi:school",
        description:
          "Sri Balaji University, Pune — Coursework in software engineering, web technologies, and databases.",
      },
      {
        title: "Bachelor of Computer Application (BCA)",
        date: "2020 - 2023",
        icon: "mdi:school",
        description:
          "Rofel Shri G.M. Bilakhia College, Vapi — Built foundations in programming, data structures, and CS fundamentals.",
      },
    ],
    experience: [
      {
        title: "Full Stack Developer — NR Agrawal",
        date: "Feb 2026 – Present",
        icon: "mdi:laptop",
        current: true,
        description: "Full stack development at NR Agrawal.",
      },
      {
        title: "Full Stack Developer — Soltech",
        date: "Nov 2025",
        icon: "mdi:briefcase",
        current: false,
        description:
          "Previous role. Developing scalable web applications using React.js, Node.js, and MongoDB. Implementing secure APIs, dashboards, and real-time features for client projects.",
      },
      {
        title: "Full Stack Developer - MintSurvey",
        date: "May 2025 – Oct 2025",
        icon: "mdi:briefcase",
        current: false,
        description:
          "Built internal tools and customer-facing features with React.js, Node.js, and MongoDB. Led API integrations, role-based authentication, and dashboard analytics.",
      },
      {
        title: "React.js Intern — Divine Infotech",
        date: "Sep 2024 – Mar 2025",
        icon: "mdi:monitor-dashboard",
        current: false,
        description:
          "Developed responsive components, optimized performance, integrated REST APIs, and collaborated in Agile sprints.",
      },
    ],

    technologies: {
      focus: {
        description:
          "Voice agents that make and take phone calls, chatbots, and the apps around them.",
        tools: [
          { name: "Calling agents", icon: "lucide:phone-call" },
          { name: "Chatbots", icon: "lucide:bot" },
          { name: "Web apps", icon: "lucide:app-window" },
          { name: "Mobile apps", icon: "lucide:smartphone" },
        ],
      },
      frontend: {
        description:
          "Dynamic, responsive UIs using React.js, Next.js, Tailwind CSS, and modern JS.",
        tools: [
          { name: "React", icon: "logos:react" },
          { name: "Next.js", icon: "skill-icons:nextjs-dark" },
          { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
          { name: "TypeScript", icon: "logos:typescript-icon" },
          { name: "JavaScript", icon: "logos:javascript" },
          { name: "HTML5", icon: "logos:html-5" },
          { name: "CSS3", icon: "logos:css-3" },
        ],
      },
      backend: {
        description:
          "Fast APIs and scalable services using Node.js and Express.",
        tools: [
          { name: "Node.js", icon: "logos:nodejs-icon" },
          { name: "Express.js", icon: "simple-icons:express" },
          { name: "MongoDB", icon: "logos:mongodb-icon" },
          // { name: "PostgreSQL", icon: "logos:postgresql" },
          // { name: "MySQL", icon: "logos:mysql-icon" },
          { name: "GitHub", icon: "mdi:github" },
        ],
      },
      // uiUx: {
      //   description: "Clean, user-friendly interfaces and prototypes.",
      //   tools: [
      //     { name: "Figma", icon: "logos:figma" },
      //     { name: "Framer", icon: "simple-icons:framer", color: "#0055FF" },
      //   ],
      // },
      // motionDesign: {
      //   description: "Lightweight motion and micro-interactions for better UX.",
      //   tools: [
      //     { name: "Framer Motion", icon: "simple-icons:framermotion" },
      //   ],
      // },
    },
  },
projects: {
  sectionTitle: "Featured Projects",
  sectionDescription:
    "Selected web apps and product sites, from booking platforms to full stack tools.",
  work: [
    {
      id: 0,
      title: "Veltrix Gym – Membership & Fitness Website",
      description:
        "Complete gym website with user authentication, membership plans, trainer profiles, and responsive design for fitness businesses.",
      image: "/veltrix1.png",
      gallery: ["/veltrix1.png", "/veltrix2.png", "/veltrix3.png", "/veltrix4.png", "/veltrix5.png"],
      category: "Full Stack Application",
      details:
        "Developed a full-featured gym website with login/signup functionality, membership plans, trainer profiles, and gym information. Modern, fully responsive design optimized for mobile, tablet, and desktop. Features smooth UX, clean layout, and scalable front-end structure.",
      github: "https://github.com/ShubhamChaudhary26",
      live: "https://gymwebsite-gamma.vercel.app",
      tech: [
        { name: "React", icon: "logos:react" },
        { name: "Next.js", icon: "skill-icons:nextjs-dark" },
        { name: "Node.js", icon: "logos:nodejs-icon" },
        { name: "MongoDB", icon: "logos:mongodb-icon" },
        { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
      ],
    },
    {
      id: 1,
      title: "Beyond Studio – Interior Design Business Website",
      description:
        "Modern, responsive website for an interior design firm showcasing services, portfolio, and client inquiry optimization.",
      image: "/beyond1.png",
      gallery: ["/beyond1.png", "/beyond2.png", "/beyond3.png", "/beyond4.png"],
      category: "Web Development",
      details:
        "Designed and developed a professional website for an interior design firm. Features clean UI aligned with brand identity, mobile-first responsive design, optimized layout for client inquiries, fast performance, and cross-browser compatibility.",
      github: "https://github.com/ShubhamChaudhary26",
      live: "https://beyondistudio.com",
      tech: [
        { name: "Next.js", icon: "skill-icons:nextjs-dark" },
        { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
        { name: "React", icon: "logos:react" },
        { name: "JavaScript", icon: "logos:javascript" },
      ],
    },
    {
      id: 2,
      title: "7SevenStarTravel – Tours & Travels Booking Platform",
      description:
        "Complete cab booking and tours platform with fleet management, outstation routes, local packages, and 24/7 service booking.",
      image: "/7star1.png",
      gallery: ["/7star1.png", "/7star2.png", "/7star3.png", "/7star4.png"],
      category: "Web Development",
      details:
        "Developed a comprehensive tours and travels website for Vapi's leading cab service provider. Features vehicle fleet showcase with pricing, outstation route booking to 100+ destinations, local 8hr/80km packages, airport transfers, and pilgrimage tour packages. Includes WhatsApp integration, call-to-action booking, GPS tracking info, and fully responsive design optimized for conversions.",
      github: "https://github.com/ShubhamChaudhary26",
      live: "https://7sevenstartravels.com",
      tech: [
        { name: "Next.js", icon: "skill-icons:nextjs-dark" },
        { name: "React", icon: "logos:react" },
        { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
        { name: "JavaScript", icon: "logos:javascript" },
      ],
    },
    {
      id: 3,
      title: "RentAgreementWithUs – Legal Service Website",
      description:
        "Service-based platform for online rent agreement services with lead-focused design and user-friendly interface.",
      image: "/rentagreement1.png",
      gallery: ["/rentagreement1.png", "/rentagreement2.png", "/rentagreement3.png", ],
      category: "Full Stack Application",
      details:
        "Built a comprehensive legal service website for online rent agreements. Features informational pages for legal services, lead-focused design for customer inquiries, mobile-first responsive design, fast performance, and clean UI with registration functionality.",
      github: "https://github.com/ShubhamChaudhary26",
      live: "https://rentagreementwithus.com",
      tech: [
        { name: "Next.js", icon: "skill-icons:nextjs-dark" },
        { name: "React", icon: "logos:react" },
        { name: "Node.js", icon: "logos:nodejs-icon" },
        { name: "MongoDB", icon: "logos:mongodb-icon" },
        { name: "JavaScript", icon: "logos:javascript" },
      ],
    },
    {
      id: 4,
      title: "Apple Vision Pro Clone – Interactive Web Experience",
      description:
        "Fully responsive Apple Vision Pro clone featuring smooth transitions, interactive UI, and modern sleek design.",
      image: "/visionpro1.png",
      gallery: ["/visionpro1.png", "/visionpro2.png", "/visionpro3.png", "/visionpro4.png"],
      category: "Web Development",
      details:
        "Designed and developed a fully responsive Apple Vision Pro clone website from scratch. Features smooth transitions, interactive UI, and modern sleek design inspired by Apple. Focused on clean code, optimized performance, and cross-device compatibility.",
      github: "https://github.com/ShubhamChaudhary26",
      live: "https://visionprobyshubham.netlify.app",
      tech: [
        { name: "HTML", icon: "logos:html-5" },
        { name: "CSS", icon: "logos:css-3" },
        { name: "JavaScript", icon: "logos:javascript" },
        { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
      ],
    },
    {
      id: 5,
      title: "Job Portal Web App",
      description:
        "Full-stack platform where candidates search/apply for jobs and recruiters post/manage openings with role-based access.",
      image: "/jobportal1.png",
      gallery: ["/jobportal1.png", "/jobportal2.png", "/jobportal3.png"],
      category: "Full Stack Application",
      details:
        "React.js + Tailwind on the front-end, Node.js/Express + MongoDB on the back-end. Features JWT auth, recruiter/candidate roles, search & filters, and responsive design.",
      github: "https://github.com/ShubhamChaudhary26",
      live: "https://job-portal-b7a0.onrender.com/",
      tech: [
        { name: "React", icon: "logos:react" },
        { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
        { name: "Node.js", icon: "logos:nodejs-icon" },
        { name: "Express", icon: "simple-icons:express" },
        { name: "MongoDB", icon: "logos:mongodb-icon" },
        { name: "JWT", icon: "simple-icons:jsonwebtokens" },
      ],
    },
  ],
},

  contact: {
    heading:
      "Send a note, or schedule a meeting if you would rather talk it through.",
    location: {
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122070.9566600788!2d73.7805662!3d18.5245649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06d9772b6ab%3A0x5b8b3b3e6f2a0a4!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715701234567!5m2!1sen!2sin",
      address: "Pune, Maharashtra, India",
    },
  },
  morphingTexts: {
    about: ["About", "Shubham"] as const,
    projects: ["Selected", "Work"] as const,
    contact: ["Get", "in touch"] as const,
  },
  navigation: [
    { name: "Home", href: "/", icon: "lucide:home" },
    { name: "About", href: "/about", icon: "lucide:user" },
    { name: "Projects", href: "/projects", icon: "lucide:folder-code" },
    { name: "Schedule", href: "/schedule", icon: "lucide:calendar" },
    { name: "Contact", href: "/contact", icon: "lucide:send" },
  ],
  footer: {
    name: "Shubham Chaudhary",
    description:
      "Full stack developer in Pune, building AI calling agents, bots, and apps.",
    contact: {
      email: "shubhamchaudhary9974@gmail.com",
      phone: "+91 7777909218",
      location: "Pune, Maharashtra, India",
    },
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/ShubhamChaudhary26",
        icon: "mdi:github",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/shubham-chaudhary-0a8a1a166",
        icon: "mdi:linkedin",
      },
      {
        platform: "X",
        url: "https://x.com/Shubh26___",
        icon: "simple-icons:x",
      },
    ],
    services: [
      "AI Calling Agents",
      "AI Bots",
      "Web & Mobile Apps",
    ],
  },
  booking: {
    hostName: "Shubham Chaudhary",
    guestEmail: "sc3617378@gmail.com",
    durationMinutes: 30,
    timezone: "Asia/Kolkata",
    workStartHour: 10,
    workEndHour: 19,
    slotMinutes: 30,
    heading: "Schedule a meeting",
    description:
      "Pick a weekday and a 30-minute slot. Hours are 10:00 to 19:00 India Standard Time, and each time is also shown in your local timezone.",
  },
} as const;
