export const DATA = {
  home: {
    hero: {
      name: "Shubham Chaudhary | Full Stack Developer Portfolio",
      title: "Full Stack Developer",
      subtitle:
        "I build fast, accessible and visually engaging web experiences that solve real problems.",
    },
    
    skills: {
      sectionTitle: "Skills & Expertise",
      sectionDescription:
        "Specialized in building modern, scalable web apps and APIs with a strong focus on performance and UX.",
      overview: [
        {
          name: "React.js / Next.js",
          level: 95,
          icon: "logos:react",
          color: "primary",
        },
        {
          name: "Frontend Development",
          level: 92,
          icon: "lucide:code",
          color: "secondary",
        },
        {
          name: "Backend (Node.js / Express)",
          level: 82,
          icon: "logos:nodejs-icon",
          color: "success",
        },
        {
          name: "Databases (MongoDB / SQL)",
          level: 86,
          icon: "logos:mongodb-icon",
          color: "warning",
        },
      ],
    },
    testimonials: {
      sectionTitle: "Client & Team Feedback",
      sectionDescription:
        "What clients and colleagues say about working with me",
      items: [
        {
          id: 1,
          name: "DevStack",
          role: "Software Developer",
          content:
            "Shubham consistently ships features ahead of schedule. His React and API integration work has streamlined our internal tools and improved survey operations.",
          avatar: "/adu.jpeg",
        },
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
        "Results-driven Full Stack Developer experienced in React.js, Node.js, and modern tooling.",
        "Currently working in IT Solutions—shipping production features, building APIs, and crafting dashboards that support business operations.",
        "Strong focus on clean code, DX, and performance with a user-first mindset.",
        "Proficient in designing scalable architectures, integrating third-party APIs, and optimizing database performance.",
        "Passionate about creating seamless user experiences through modern UI/UX principles and accessibility standards.",
        "Continuously exploring emerging technologies like Next.js, TypeScript, and cloud-native development to stay ahead in the industry.",
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
    title: "Full Stack Developer — Soltech",
    date: "Nov 2025 – Present",
    icon: "mdi:laptop",
    description:
      "Developing scalable web applications using React.js, Node.js, and MongoDB. Implementing secure APIs, dashboards, and real-time features for client projects.",
  },
  {
    title: "Full Stack Developer",
    date: "May 2025 – Oct 2025",
    icon: "mdi:briefcase",
    description:
      "Built internal tools and customer-facing features with React.js, Node.js, and MongoDB. Led API integrations, role-based authentication, and dashboard analytics.",
  },
  {
    title: "React.js Intern — CODTECH IT SOLUTION",
    date: "Sep 2024 – Mar 2025",
    icon: "mdi:monitor-dashboard",
    description:
      "Developed responsive components, optimized performance, integrated REST APIs, and collaborated in Agile sprints.",
  },
],

    technologies: {
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
      "A selection of my recent projects showcasing full stack development and API work",
    work: [
      {
        id: 0,
        title: "Job Portal Web App",
        description:
          "Full-stack platform where candidates search/apply for jobs and recruiters post/manage openings with role-based access.",
        image: "/jobportal1.png", // local image
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
      
      {
        id: 2,
        title: "Shreerang Associates – Rent Agreement Service",
        description:
          "In-progress web platform to digitize rent agreement creation with guided forms, e‑signature workflow, and PDF generation.",
        image:
          "/shree1.png",
        gallery: [
          "/shree1.png","/shree2.png","/shree3.png",
        ],
        category: "Full Stack Application",
        details:
          "Next.js app with server actions for form handling, secure file upload, and role-based dashboard. Generates stamped PDFs, supports Aadhaar KYC integration (planned).",
        github: "",
        live: "",
        tech: [
          { name: "Next.js", icon: "skill-icons:nextjs-dark" },
          { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
          { name: "Node.js", icon: "logos:nodejs-icon" },
          { name: "MongoDB", icon: "logos:mongodb-icon" },
        ],
      },

     
      {
        id: 4,
        title: "E-commerce Platform",
        description:
          "Scalable and responsive online store with dynamic product filtering and intuitive cart management.",
        image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=2",
        gallery: [
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=2-1",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=2-2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=2-3",
        ],
        category: "Web Development",
        details:
          "A fully functional e-commerce platform built with React and TailwindCSS. Features product listings, advanced filters, cart and checkout system, and a modern UI with responsive design for all devices.",
        github: "https://github.com",
        live: "https://example.com",
        tech: [
          { name: "React", icon: "logos:react" },
          { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
          { name: "TypeScript", icon: "logos:typescript-icon" },
          { name: "PostgreSQL", icon: "logos:postgresql" },
        ],
      },
      {
        id: 5,
        title: "Travel Booking System",
        description:
          "Comprehensive booking platform for flights, hotels, and rentals with live availability.",
        image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=3",
        gallery: [
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=3",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=3-1",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=3-2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=3-3",
        ],
        category: "Web Development",
        details:
          "A modern travel booking system built with Next.js and TailwindCSS. Users can search and book flights, hotels, and car rentals with real-time availability and intuitive UI components powered by HeroUI.",
        github: "https://github.com",
        live: "https://example.com",
        tech: [
          { name: "Next.js", icon: "skill-icons:nextjs-dark" },
          { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
          { name: "TypeScript", icon: "logos:typescript-icon" },
        ],
      },
      {
        id: 6,
        title: "AI Chat Assistant",
        description:
          "Smart customer support assistant with contextual awareness and real-time replies.",
        image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=4",
        gallery: [
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=4",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=4-1",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=4-2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=4-3",
        ],
        category: "Applications",
        details:
          "AI-powered chat assistant developed with React and TailwindCSS. Integrated with OpenAI’s GPT API for contextual conversations, deployed via Vercel with real-time response and adaptive UI.",
        github: "https://github.com",
        live: "https://example.com",
        tech: [
          { name: "React", icon: "logos:react" },
          { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
          { name: "OpenAI API", icon: "simple-icons:openai" },
          { name: "Vercel", icon: "simple-icons:vercel" },
        ],
      },
      {
        id: 7,
        title: "Portfolio API & CMS",
        description:
          "Headless API backend with admin-friendly CMS capabilities.",
        image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=5",
        gallery: [
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=5",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=5-1",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=5-2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=5-3",
        ],
        category: "Backend Services",
        details:
          "A modular REST API built with Node.js and Express, powering dynamic portfolio websites. Includes JWT auth, MySQL integration, and a Swagger-documented CMS interface for easy content management.",
        github: "https://github.com",
        tech: [
          { name: "Node.js", icon: "logos:nodejs-icon" },
          { name: "MySQL", icon: "logos:mysql-icon" },
          { name: "JWT", icon: "simple-icons:jsonwebtokens" },
          { name: "Swagger", icon: "simple-icons:swagger" },
        ],
      },
      {
        id: 8,
        title: "Fitness Tracker App",
        description:
          "Monitor workouts, calorie intake, and goals in one place.",
        image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=6",
        gallery: [
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=6",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=6-1",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=6-2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=6-3",
        ],
        category: "Applications",
        details:
          "A cross-platform fitness application developed with React Native and styled using TailwindCSS via Expo. It offers calorie tracking, workout logging, analytics via charts, and custom goal-setting.",
        github: "https://github.com",
        live: "https://example.com",
        tech: [
          { name: "React Native", icon: "logos:react" },
          { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
          { name: "Expo", icon: "simple-icons:expo" },
        ],
      },
      {
        id: 9,
        title: "Content Scheduler",
        description:
          "Plan, schedule, and automate your social media posts effortlessly.",
        image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=7",
        gallery: [
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=7",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=7-1",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=7-2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=7-3",
        ],
        category: "Applications",
        details:
          "A productivity app designed for content creators featuring calendar syncing, automated post publishing, rich media previews, and cloud synchronization for seamless cross-device access.",
        github: "https://github.com",
        live: "https://example.com",
        tech: [
          { name: "Next.js", icon: "skill-icons:nextjs-dark" },
          { name: "MySQL", icon: "logos:mysql-icon" },
          { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
        ],
      },
      {
        id: 10,
        title: "Real Estate Dashboard",
        description:
          "Comprehensive dashboard to manage properties, leads, and sales pipelines effectively.",
        image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=8",
        gallery: [
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=8",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=8-1",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=8-2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=8-3",
        ],
        category: "Web Development",
        details:
          "An admin panel tailored for real estate professionals featuring interactive data visualizations, lead tracking, and CRM integrations to streamline client and property management.",
        github: "https://github.com",
        live: "https://example.com",
        tech: [
          { name: "React", icon: "logos:react" },
          { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
          { name: "Chart.js", icon: "simple-icons:chartdotjs" },
        ],
      },
      {
        id: 11,
        title: "Crypto Wallet API",
        description:
          "Robust backend API for secure cryptocurrency operations and blockchain interactions.",
        image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=9",
        gallery: [
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=9",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=9-1",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=9-2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=9-3",
        ],
        category: "Backend Services",
        details:
          "Secure Node.js API supporting Ethereum and Bitcoin transactions. Features transaction signing, wallet address creation, and real-time blockchain event monitoring using Web3.js. HSM integration for secure key management.",
        github: "https://github.com",
        tech: [
          { name: "Node.js", icon: "logos:nodejs-icon" },
          { name: "Ethereum", icon: "logos:ethereum" },
          { name: "Web3.js", icon: "simple-icons:web3dotjs" },
          { name: "PostgreSQL", icon: "logos:postgresql" },
          { name: "JWT", icon: "simple-icons:jsonwebtokens" },
        ],
      },
      {
        id: 12,
        title: "SaaS Subscription API",
        description:
          "Backend API managing SaaS subscriptions, billing, and user accounts.",
        image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=10",
        gallery: [
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=10",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=10-1",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=10-2",
          "https://img.heroui.chat/image/dashboard?w=600&h=400&u=10-3",
        ],
        category: "Backend Services",
        details:
          "RESTful API with Stripe integration, usage metering, tiered pricing, webhook handling, trial periods, and analytics. Optimized with Redis caching.",
        github: "https://github.com",
        tech: [
          { name: "Node.js", icon: "logos:nodejs-icon" },
          { name: "Stripe", icon: "logos:stripe" },
          { name: "PostgreSQL", icon: "logos:postgresql" },
          { name: "Redis", icon: "logos:redis" },
          { name: "JWT", icon: "simple-icons:jsonwebtokens" },
        ],
      },
    ],
  },

  contact: {
    heading:
      "Have a project in mind? Get in touch and let's create something amazing.",
    location: {
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122070.9566600788!2d73.7805662!3d18.5245649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06d9772b6ab%3A0x5b8b3b3e6f2a0a4!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715701234567!5m2!1sen!2sin",
      address: "Pune, Maharashtra, India",
    },
  },
  morphingTexts: {
    about: ["Creative", "Passionate", "Developer"] as const,
    projects: ["My Work", "Creations", "Experiments", "Innovations"] as const,
    contact: ["Let's", "Build", "Together"] as const,
  },
  navigation: [
    { name: "Home", href: "/", icon: "lucide:home" },
    { name: "About", href: "/about", icon: "lucide:user" },
    { name: "Projects", href: "/projects", icon: "lucide:folder-code" },
    { name: "Contact", href: "/contact", icon: "lucide:send" },
  ],
  footer: {
    name: "Shubham Chaudhary",
    description: "Always interested in new projects and collaborations.",
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
      { platform: "X", url: "https://x.com", icon: "simple-icons:x" },
    ],
    services: [
      "Website Development",
      "Full Stack Development",
      "API Development ",
    ],
  },
} as const;
