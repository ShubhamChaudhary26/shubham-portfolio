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
          name: "TechSeria",
          role: "Python Developer",
          content:
            "The user experience is smooth and modern. My team enjoyed how easy it was to integrate new workflows.",
          avatar: "/krish.jpeg",
        },
        {
          id: 4,
          name: "Flauraa",
          role: "Full Stack Developer",
          content:
            "He quickly became a key contributor—clean components, smart state management, and solid problem-solving under deadlines.",
          avatar: "/amit.jpeg",
        },
        {
          id: 4,
          name: "NRJ Solution",
          role: "Web Developer",
          content:
            "He emerged as a strong contributor, balancing clean architecture, efficient state management, and quick problem-solving.",
          avatar: "/aman.jpeg",
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
        title: "IT Solutions Engineer",
        date: "May 2025 – Present",
        icon: "mdi:briefcase",
        description:
          "Building internal tools and customer-facing features with React.js, Node.js, and MongoDB. Led API integrations, role-based auth, and dashboard analytics.",
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
          { name: "GitHub", icon: "mdi:github" },
          { name: "MongoDB", icon: "simple-icons:mongodb" },
        ],
      },
    },
  },
  projects: {
    sectionTitle: "Featured Projects",
    sectionDescription:
      "A selection of my recent projects showcasing full stack development and API work",
    work: [
      // {
      //   id: 1,
      //   title: "MintSurvey Research Organization",
      //   description:
      //     "Production-grade survey and insights platform. Implemented dashboards, authentication, and internal tooling to speed up survey operations.",
      //   image: "/mint1.png",
      //   gallery: ["/mint1.png", "/mint2.png", "/mint3.png", "/mint4.png"],
      //   category: "Full Stack Application",
      //   details:
      //     "Built and maintained features using React.js, Node.js/Express, and MongoDB. Added analytics widgets, export utilities, and integrated third‑party services. Improved performance with memoization and API pagination.",
      //   github: "",
      //   live: "https://mintsurvey.com",
      //   tech: [
      //     { name: "Next.js", icon: "skill-icons:nextjs-dark" },
      //     { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
      //     { name: "MongoDB", icon: "simple-icons:mongodb" },
      //   ],
      // },
      {
        id: 2,
        title: "Shreerang Associates – Rent Agreement Service",
        description:
          "In-progress web platform to digitize rent agreement creation with guided forms, e‑signature workflow, and PDF generation.",
        image: "/shree1.png",
        gallery: ["/shree1.png", "/shree3.png", "/shree2.png"],
        category: "Full Stack Application",
        details:
          "Next.js app with server actions for form handling, secure file upload, and role-based dashboard. Generates stamped PDFs, supports Aadhaar KYC integration (planned).",
        github: "https://github.com/ShubhamChaudhary26/Shreerang",
        live: "https://rentagreementwithus.com",
        tech: [
          { name: "Next.js", icon: "skill-icons:nextjs-dark" },
          { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
          { name: "MongoDB", icon: "simple-icons:mongodb" },
        ],
      },
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
          { name: "MongoDB", icon: "simple-icons:mongodb" },
          { name: "JWT", icon: "simple-icons:jsonwebtokens" },
        ],
      },

      // ----------------- ORIGINAL SHOWCASE PROJECTS -----------------

      // {
      //   id: 5,
      //   title: "Automotive Survey Software",
      //   description:
      //     "A specialized survey platform designed to gather insights from automotive companies, streamlining data collection and reporting.",
      //   image: "/survey1.png",
      //   gallery: ["/survey1.png", "/survey2.png", "/survey3.png"],
      //   category: "Applications",
      //   details:
      //     "A full-stack survey software built for automotive companies using Next.js and TailwindCSS for the frontend, and Node.js, Express, and MongoDB for the backend. Features dynamic surveys, real-time analytics, modular TypeScript components, and a scalable architecture.",
      //   github: "https://github.com/ShubhamChaudhary26/surveysoftware",
      //   tech: [
      //     { name: "Next.js", icon: "logos:nextjs-icon" },
      //     { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
      //     { name: "TypeScript", icon: "logos:typescript-icon" },
      //     { name: "Node.js", icon: "logos:nodejs-icon" },
      //     { name: "Express", icon: "simple-icons:express" },
      //     { name: "MongoDB", icon: "simple-icons:mongodb" },
      //   ],
      // },
      {
        id: 3,
        title: "Apple Vision Pro Clone",
        description:
          "A sleek and immersive digital interface replicating Apple Vision Pro’s design principles, emphasizing clarity, speed, and intuitive interaction.",
        image: "apple1.png",
        gallery: ["apple1.png", "apple2.png"],
        category: "Web Development",
        details:
          "An Apple Vision Pro-inspired app interface built with React and TailwindCSS, featuring smooth animations via Framer Motion. Fully mobile-first, modular, and type-safe using TypeScript and Vite for fast development.",
        github: "https://github.com/ShubhamChaudhary26/AppleVisionCloneWebsite",
        tech: [
          { name: "HTML", icon: "vscode-icons:file-type-html" },
          { name: "CSS", icon: "vscode-icons:file-type-css" },
          { name: "JavaScript", icon: "logos:javascript" },
        ],
      },
    ],
  },

  contact: {
    heading:
      "Have a project in mind? Get in touch and let's create something amazing.",
    location: {
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.842183879998!2d72.899064!3d20.389501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f126.5!3m3!1m2!1s0x3be04f5c7f2f0a41%3A0x123456789abcdef!2sVapi%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1715709999999!5m2!1sen!2sin",
      address: "Vapi, Gujarat, India",
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
      "API Development",
    ],
  },
} as const;
