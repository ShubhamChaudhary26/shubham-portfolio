// src/components/common/ChatBot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot } from 'lucide-react';
import { DATA } from '@/data';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Hey! I am Shubham AI Assistant. I can tell you everything about his skills, projects, experience, education, and more. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const botResponse = getBotResponse(userMessage.toLowerCase());

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMessage },
      { sender: 'bot', text: botResponse },
    ]);
    setInput('');
  };

  const getBotResponse = (query: string): string => {
    // Remove special characters for better matching
    const cleanQuery = query.replace(/[?!.,]/g, '').toLowerCase();
    const words = cleanQuery.split(' ');

    // ============ ENHANCED GREETINGS ============
    if (
      words.some((word) =>
        ['hi', 'hello', 'hey', 'hola', 'namaste', 'greetings', 'sup', 'yo', 'howdy'].includes(word)
      )
    ) {
      const greetings = [
        'Hello! 👋 I am here to help you learn about Shubham Chaudhary. What would you like to know?',
        'Hi there! Welcome to Shubham portfolio. I can tell you about his skills, projects, experience at MintSurvey, and more!',
        'Hey! Great to meet you. Feel free to ask me anything about Shubham work and expertise!',
        'Namaste! 🙏 I am Shubham AI assistant. How can I help you today?',
        'Hello! I can tell you about Shubham journey from intern to Full Stack Developer at companies like MintSurvey and Soltech!',
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // ============ HOW ARE YOU VARIANTS ============
    if (
      cleanQuery.includes('how are') ||
      cleanQuery.includes('how do you') ||
      cleanQuery.includes('whats up') ||
      cleanQuery.includes('wassup')
    ) {
      return 'I am doing great, thanks for asking! I am here to help you learn about Shubham Chaudhary professional profile. What would you like to know?';
    }

    // ============ ENHANCED IDENTITY ============
    if (
      words.some((word) => ['who', 'what'].includes(word)) &&
      words.some((word) => ['you', 'bot', 'assistant'].includes(word))
    ) {
      return 'I am an AI assistant designed specifically for Shubham Chaudhary portfolio. I have comprehensive information about his experience at MintSurvey, Soltech, his technical skills, projects, and achievements. Ask me anything!';
    }

    // ============ SHUBHAM INTRODUCTION ============
    if (
      cleanQuery.includes('tell me about shubham') ||
      cleanQuery.includes('who is shubham') ||
      cleanQuery.includes('introduce shubham') ||
      cleanQuery.includes('about shubham')
    ) {
      return `${DATA.about.profile.name} is a Results-driven Full Stack Developer with expertise in React.js, Node.js, and modern web technologies. He has worked at companies like MintSurvey and Soltech, building production-grade applications. ${DATA.about.profile.description[0]} ${DATA.about.profile.description[2]} He is passionate about creating fast, accessible, and visually engaging web experiences.`;
    }

    // ============ NAME QUERIES ============
    if (cleanQuery.includes('name') || cleanQuery.includes('called')) {
      if (cleanQuery.includes('your')) {
        return 'I am Shubham AI Assistant - I do not have a personal name, but I am here to tell you all about Shubham Chaudhary!';
      }
      return `His full name is ${DATA.about.profile.name}. He is a Full Stack Developer currently working at Soltech, with previous experience at MintSurvey.`;
    }

    // ============ ENHANCED EXPERIENCE WITH MINTSURVEY ============
    if (
      cleanQuery.includes('experience') ||
      cleanQuery.includes('work') ||
      cleanQuery.includes('career') ||
      cleanQuery.includes('job') ||
      cleanQuery.includes('employment')
    ) {
      return `💼 Shubham Professional Experience:

1. Full Stack Developer — Soltech
   📅 Nov 2025 – Present
   📝 Developing scalable web applications using React.js, Node.js, and MongoDB. Implementing secure APIs, dashboards, and real-time features for client projects.

2. Full Stack Developer — MintSurvey
   📅 May 2025 – Oct 2025
   📝 Built production-grade survey platform features. Led API integrations, implemented role-based authentication, created analytics dashboards, and improved performance by 40%.

3. React.js Intern — CODTECH IT SOLUTION
   📅 Sep 2024 – Mar 2025
   📝 Developed responsive components, optimized performance, integrated REST APIs, and collaborated in Agile sprints.

📈 Career Progression: From React.js Intern to Full Stack Developer at MintSurvey and now Soltech in just over a year!`;
    }

    // ============ MINTSURVEY SPECIFIC ============
    if (
      cleanQuery.includes('mintsurvey') ||
      cleanQuery.includes('mint survey') ||
      cleanQuery.includes('survey company')
    ) {
      return `📊 MintSurvey Experience (May 2025 - Oct 2025):

🏢 Company: MintSurvey Research Organization
📍 Role: Full Stack Developer
🔗 Website: https://mintsurvey.com

Key Achievements at MintSurvey:
✅ Built production-grade survey and insights platform
✅ Implemented analytics dashboards with real-time data
✅ Created secure authentication system
✅ Developed data export utilities
✅ Integrated multiple third-party services
✅ Improved performance by 40% using memoization
✅ Added API pagination for large datasets
✅ Streamlined survey operations through internal tooling

Tech Stack Used: React.js, Node.js, Express, MongoDB, TailwindCSS

This role significantly enhanced my full-stack capabilities and experience with production systems!`;
    }

    // ============ SOLTECH SPECIFIC ============
    if (
      cleanQuery.includes('soltech') ||
      cleanQuery.includes('current job') ||
      cleanQuery.includes('present role')
    ) {
      return `💼 Current Role at Soltech (Nov 2025 - Present):

🏢 Company: Soltech
📍 Position: Full Stack Developer
📅 Started: November 2025

Current Responsibilities:
✅ Developing scalable web applications
✅ Building secure RESTful APIs
✅ Creating interactive dashboards
✅ Implementing real-time features
✅ Working on client projects
✅ Code reviews and optimization
✅ Collaborating with cross-functional teams

Technologies: React.js, Node.js, MongoDB, Express, TypeScript

Excited to be contributing to innovative solutions at Soltech!`;
    }

    // ============ CODTECH INTERNSHIP ============
    if (
      cleanQuery.includes('intern') ||
      cleanQuery.includes('codtech') ||
      cleanQuery.includes('first job')
    ) {
      return `🎓 Internship at CODTECH IT SOLUTION:

📅 Duration: Sep 2024 – Mar 2025
🏢 Company: CODTECH IT SOLUTION
📍 Role: React.js Intern

Internship Achievements:
✅ Developed 15+ responsive React components
✅ Improved application performance by 30%
✅ Successfully integrated 5+ REST APIs
✅ Participated in daily Agile standups
✅ Collaborated with senior developers
✅ Learned best practices and coding standards
✅ Received excellent feedback from mentors

Key Learning: Component-based architecture, State management, API integration, Performance optimization

This internship laid the foundation for my full-stack career!`;
    }

    // ============ CURRENT STATUS ============
    if (
      cleanQuery.includes('current') ||
      cleanQuery.includes('now') ||
      cleanQuery.includes('present') ||
      cleanQuery.includes('doing')
    ) {
      return `📍 Current Status:

🏢 Working at: Soltech
💼 Position: Full Stack Developer
📅 Since: November 2025
📍 Location: Pune, Maharashtra, India

Currently building scalable web applications and working on exciting client projects. Previously worked at MintSurvey where I gained valuable experience in production systems.

Available for: Freelance projects, Consulting, Open source collaboration`;
    }

    // ============ ENHANCED SKILLS ============
    if (
      cleanQuery.includes('skill') ||
      cleanQuery.includes('technology') ||
      cleanQuery.includes('tech') ||
      cleanQuery.includes('expertise') ||
      cleanQuery.includes('know')
    ) {
      const skills = DATA.home.skills.overview
        .map((s) => `${s.name} (${s.level}%)`)
        .join(', ');
      return `🚀 Technical Skills & Expertise:

📊 Core Competencies:
${skills}

💻 Frontend Technologies:
• React.js (95%) - Hooks, Context, Redux
• Next.js - SSR, SSG, API Routes
• TypeScript - Type-safe development
• TailwindCSS - Modern styling
• JavaScript ES6+ - Modern JS features
• HTML5 & CSS3 - Semantic markup

🔧 Backend Technologies:
• Node.js (82%) - Server-side JavaScript
• Express.js - RESTful APIs
• MongoDB (86%) - NoSQL database
• JWT - Authentication
• RESTful API design

🛠️ Tools & Others:
• Git/GitHub - Version control
• VS Code - Primary IDE
• Postman - API testing
• npm/yarn - Package management
• Agile/Scrum - Development methodology

Constantly learning and adapting to new technologies!`;
    }

    // ============ REACT SPECIFIC ============
    if (cleanQuery.includes('react') && !cleanQuery.includes('native')) {
      return `⚛️ React.js Expertise (95% Proficiency):

Core Concepts Mastered:
✅ Functional Components & Hooks
✅ State Management (useState, useReducer, useContext)
✅ Custom Hooks Development
✅ Performance Optimization (memo, useMemo, useCallback)
✅ React Router for SPA Navigation
✅ Form Handling & Validation
✅ API Integration with Axios/Fetch
✅ Error Boundaries
✅ Code Splitting & Lazy Loading

Projects Built with React:
• Job Portal Platform
• MintSurvey Dashboard
• E-commerce Applications
• Real-time Chat Systems
• Admin Dashboards

Used React extensively at MintSurvey and Soltech!`;
    }

    // ============ NODE.JS SPECIFIC ============
    if (
      cleanQuery.includes('node') ||
      cleanQuery.includes('backend') ||
      cleanQuery.includes('server')
    ) {
      return `🟢 Node.js & Backend Development (82% Proficiency):

Backend Expertise:
✅ RESTful API Development
✅ Express.js Framework
✅ MongoDB Integration with Mongoose
✅ Authentication (JWT, bcrypt)
✅ Middleware Development
✅ File Upload & Processing
✅ Error Handling & Logging
✅ API Documentation (Swagger)
✅ WebSocket Implementation

Backend Projects:
• Job Portal APIs
• MintSurvey Backend Services
• Authentication Systems
• Real-time Features
• Payment Integration

Experience building production APIs at MintSurvey and Soltech!`;
    }

    // ============ EDUCATION ENHANCED ============
    if (
      cleanQuery.includes('education') ||
      cleanQuery.includes('study') ||
      cleanQuery.includes('degree') ||
      cleanQuery.includes('college') ||
      cleanQuery.includes('university')
    ) {
      return `🎓 Educational Background:

📚 Master of Computer Application (MCA)
📅 2023 - 2025 (Currently Pursuing)
🏫 Sri Balaji University, Pune
📖 Key Subjects: Advanced Web Technologies, Software Engineering, Cloud Computing, Database Management Systems

📚 Bachelor of Computer Application (BCA)
📅 2020 - 2023 (Completed)
🏫 Rofel Shri G.M. Bilakhia College, Vapi
📖 Foundation: Programming (C, C++, Java), Data Structures, Web Development, DBMS

Academic + Practical Experience = Strong Foundation for Full Stack Development!`;
    }

    // ============ PROJECTS ENHANCED ============
    if (
      cleanQuery.includes('project') ||
      cleanQuery.includes('portfolio') ||
      cleanQuery.includes('built') ||
      cleanQuery.includes('created')
    ) {
      return `🚀 Featured Projects (13+ Total):

1. 💼 Job Portal Web App
   Full-stack platform with role-based access for recruiters and candidates
   Tech: React, Node.js, MongoDB, JWT
   Live: https://job-portal-b7a0.onrender.com/

2. 📊 MintSurvey Platform
   Production survey platform I worked on as Full Stack Developer
   Tech: React, Node.js, MongoDB, Express
   Live: https://mintsurvey.com

3. 📄 Rent Agreement Service
   Digital platform for creating rent agreements (In Progress)
   Tech: Next.js, Node.js, MongoDB

4. 🏦 Digital Banking App
5. 🛍️ E-commerce Platform
6. ✈️ Travel Booking System
7. 🤖 AI Chat Assistant
8. 📱 Fitness Tracker App
9. 📅 Content Scheduler
10. 🏠 Real Estate Dashboard

Ask about any specific project for detailed information!`;
    }

    // ============ CONTACT ENHANCED ============
    if (
      cleanQuery.includes('contact') ||
      cleanQuery.includes('email') ||
      cleanQuery.includes('phone') ||
      cleanQuery.includes('reach') ||
      cleanQuery.includes('connect')
    ) {
      return `📞 Contact Information:

📧 Email: ${DATA.footer.contact.email}
📱 Phone: ${DATA.footer.contact.phone}
📍 Location: ${DATA.footer.contact.location}

🔗 Professional Links:
💼 LinkedIn: ${DATA.footer.socialLinks[1].url}
🐙 GitHub: ${DATA.footer.socialLinks[0].url}
🐦 X/Twitter: ${DATA.footer.socialLinks[2].url}

💡 Best way to reach: Email for professional inquiries!
⏰ Response Time: Usually within 24 hours

Feel free to reach out for opportunities, collaborations, or just to connect!`;
    }

    // ============ LOCATION & AVAILABILITY ============
    if (
      cleanQuery.includes('location') ||
      cleanQuery.includes('where') ||
      cleanQuery.includes('city') ||
      cleanQuery.includes('pune') ||
      cleanQuery.includes('based')
    ) {
      return `📍 Location & Availability:

Current Location: ${DATA.contact.location.address}

Work Preferences:
✅ On-site in Pune
✅ Remote opportunities
✅ Hybrid arrangements
✅ Willing to relocate for right opportunity

Previous Work:
• MintSurvey - Worked remotely/hybrid
• Soltech - Current arrangement

Available for global opportunities with visa sponsorship!`;
    }

    // ============ HIRE & OPPORTUNITIES ============
    if (
      cleanQuery.includes('hire') ||
      cleanQuery.includes('available') ||
      cleanQuery.includes('freelance') ||
      cleanQuery.includes('opportunity') ||
      cleanQuery.includes('open')
    ) {
      return `✅ Open for Opportunities!

Available For:
🎯 Full-time positions (Preferred)
📝 Contract work
💼 Freelance projects
🤝 Technical consulting
🚀 Startup collaborations
🌐 Remote work

Services Offered:
${DATA.footer.services.map((s) => `• ${s}`).join('\n')}

Experience Level:
• 1+ years professional experience
• Worked at MintSurvey & Soltech
• 13+ completed projects

💼 Immediate availability for the right opportunity!
📧 Let us discuss: ${DATA.footer.contact.email}`;
    }

    // ============ WHY HIRE ENHANCED ============
    if (
      cleanQuery.includes('why') &&
      (cleanQuery.includes('hire') ||
        cleanQuery.includes('choose') ||
        cleanQuery.includes('select'))
    ) {
      return `🌟 Why Hire Shubham?

✅ **Proven Experience**: MintSurvey, Soltech, CODTECH
✅ **Full-Stack Mastery**: Frontend to Backend to Database
✅ **Production Experience**: Built real-world applications
✅ **Fast Delivery**: Ships features ahead of schedule
✅ **Clean Code**: Maintainable, documented, tested
✅ **Problem Solver**: Strong analytical skills
✅ **Team Player**: Excellent collaboration
✅ **Quick Learner**: Adapts to new tech rapidly
✅ **Business Acumen**: Understands business goals
✅ **Communication**: Clear technical & non-technical

💡 Unique Value:
• Experience with production systems at MintSurvey
• Current role at Soltech - staying updated
• 13+ diverse projects portfolio
• Available immediately

Ready to contribute from Day 1!`;
    }

    // ============ TESTIMONIALS & FEEDBACK ============
    if (
      cleanQuery.includes('testimonial') ||
      cleanQuery.includes('feedback') ||
      cleanQuery.includes('review') ||
      cleanQuery.includes('recommendation') ||
      cleanQuery.includes('reference')
    ) {
      const testimonials = DATA.home.testimonials.items
        .map((t) => `"${t.content}"\n- ${t.name}, ${t.role}`)
        .join('\n\n');
      return `⭐ Client & Team Feedback:

${testimonials}

Consistent Feedback Themes:
✅ Delivers ahead of schedule
✅ Clean, maintainable code
✅ Quick problem-solving
✅ Great team collaboration
✅ Strong technical skills

References available upon request!`;
    }

    // ============ SOFT SKILLS ============
    if (
      cleanQuery.includes('soft') ||
      cleanQuery.includes('personality') ||
      cleanQuery.includes('trait') ||
      cleanQuery.includes('quality') ||
      cleanQuery.includes('character')
    ) {
      return `🌟 Soft Skills & Personal Qualities:

💡 **Problem Solver**
   Analytical approach, creative solutions

🤝 **Team Player**
   Excellent collaboration at MintSurvey & Soltech

📚 **Quick Learner**
   Went from Intern to Full Stack Developer in 1 year

⏰ **Time Management**
   Consistently delivers ahead of deadlines

💬 **Communication**
   Clear technical and business communication

🎯 **Detail-Oriented**
   Focus on code quality and user experience

🔄 **Adaptable**
   Worked in different company environments

🚀 **Self-Motivated**
   Continuous learning and improvement

These skills helped me succeed at MintSurvey and Soltech!`;
    }

    // ============ LANGUAGES ============
    if (
      cleanQuery.includes('language') ||
      cleanQuery.includes('speak') ||
      cleanQuery.includes('communication')
    ) {
      return `🗣️ Language Proficiency:

Spoken Languages:
• 🇬🇧 English - Fluent (Professional)
• 🇮🇳 Hindi - Native
• 🇮🇳 Gujarati - Native

Programming Languages:
• JavaScript/TypeScript - Expert
• HTML/CSS - Expert
• SQL - Intermediate
• Python - Basic
• Java - Basic (Academic)
• C/C++ - Basic (Academic)

Communication:
✅ Clear written documentation
✅ Effective verbal presentation
✅ Technical writing skills
✅ Client communication experience

Worked with international teams at MintSurvey!`;
    }

    // ============ ACHIEVEMENTS ============
    if (
      cleanQuery.includes('achievement') ||
      cleanQuery.includes('accomplish') ||
      cleanQuery.includes('success') ||
      cleanQuery.includes('proud')
    ) {
      return `🏆 Key Achievements:

At MintSurvey:
• Improved platform performance by 40%
• Built production-grade features
• Integrated multiple third-party services
• Implemented secure authentication

At Soltech:
• Developing scalable applications
• Building real-time features
• Working on high-impact client projects

Overall:
• Completed 13+ projects successfully
• Progressed from Intern to Full Stack Developer
• Maintained 95% client satisfaction
• Delivered all projects on/before deadline
• Built applications used by thousands

Most Proud Of: The production survey platform at MintSurvey that streamlined operations!`;
    }

    // ============ GOALS & FUTURE ============
    if (
      cleanQuery.includes('goal') ||
      cleanQuery.includes('future') ||
      cleanQuery.includes('plan') ||
      cleanQuery.includes('aspiration') ||
      cleanQuery.includes('dream')
    ) {
      return `🎯 Career Goals & Aspirations:

Short-term (6-12 months):
📌 Master TypeScript & Advanced React Patterns
📌 Learn AWS/Cloud Services
📌 Contribute to major open-source projects
📌 Build a successful SaaS product
📌 Get cloud certifications

Long-term (2-5 years):
🚀 Become a Senior Full Stack Developer
🚀 Lead technical teams
🚀 Architect enterprise-scale systems
🚀 Mentor junior developers
🚀 Speak at tech conferences
🚀 Start a tech consultancy

Dream Companies/Projects:
• FAANG companies
• Innovative startups
• Products impacting millions
• Open-source contributions

Learning from experiences at MintSurvey and Soltech to achieve these goals!`;
    }

    // ============ DAILY ROUTINE ============
    if (
      cleanQuery.includes('day') ||
      cleanQuery.includes('daily') ||
      cleanQuery.includes('routine') ||
      cleanQuery.includes('typical')
    ) {
      return `📅 A Typical Work Day:

🌅 Morning (9 AM - 12 PM):
• Check emails and messages
• Daily standup meeting
• Code review and PR checks
• Work on priority features

☀️ Afternoon (12 PM - 3 PM):
• Lunch break
• Continue development work
• API integration/testing
• Team collaboration

🌆 Evening (3 PM - 6 PM):
• Bug fixes and optimization
• Documentation updates
• Code deployment
• Planning next day tasks

🌙 After Work:
• Learning new technologies
• Working on side projects
• Reading tech blogs
• Contributing to open source

This routine helped me excel at MintSurvey and now at Soltech!`;
    }

    // ============ PROBLEM SOLVING ============
    if (
      cleanQuery.includes('problem') ||
      cleanQuery.includes('debug') ||
      cleanQuery.includes('troubleshoot') ||
      cleanQuery.includes('issue') ||
      cleanQuery.includes('bug')
    ) {
      return `🔍 Problem-Solving Approach:

My Method:
1. **Understand** - Define the problem clearly
2. **Research** - Check docs, Stack Overflow
3. **Analyze** - Break into smaller parts
4. **Plan** - Design solution strategy
5. **Implement** - Code with best practices
6. **Test** - Verify solution works
7. **Optimize** - Improve performance
8. **Document** - Record for future reference

Real Example from MintSurvey:
Problem: Slow dashboard loading (10+ seconds)
Solution: Implemented memoization, pagination, lazy loading
Result: Reduced load time to 2 seconds (80% improvement)

Tools I Use:
• Chrome DevTools
• console.log debugging
• Postman for API testing
• Git bisect for regression bugs

"Every bug is a learning opportunity!"`;
    }

    // ============ TEAM WORK ============
    if (
      cleanQuery.includes('team') ||
      cleanQuery.includes('collaborat') ||
      cleanQuery.includes('work with')
    ) {
      return `👥 Team Collaboration Experience:

At MintSurvey:
• Worked in team of 5-7 developers
• Daily standups and sprint planning
• Code reviews and pair programming
• Knowledge sharing sessions

At Soltech:
• Cross-functional team collaboration
• Client interaction and feedback
• Mentoring junior developers
• Agile/Scrum methodology

Collaboration Style:
✅ Open communication
✅ Constructive feedback
✅ Knowledge sharing
✅ Helping teammates
✅ Taking ownership
✅ Meeting deadlines

Tools Used:
• Slack/Teams for communication
• Jira for task management
• Git for version control
• Figma for design collaboration

Believe in: "Team success > Individual success"`;
    }

    // ============ SALARY ============
    if (
      cleanQuery.includes('salary') ||
      cleanQuery.includes('pay') ||
      cleanQuery.includes('compensation') ||
      cleanQuery.includes('ctc') ||
      cleanQuery.includes('package')
    ) {
      return `💰 Compensation Discussion:

I prefer to discuss compensation based on:
• Role and responsibilities
• Company size and funding
• Technology stack
• Growth opportunities
• Work location/remote options
• Additional benefits

Current Market Expectations:
• Aligned with industry standards for Full Stack Developers
• Based on experience at MintSurvey and Soltech
• Open to negotiation for right opportunity

For detailed discussion:
📧 Email: ${DATA.footer.contact.email}
📱 Phone: ${DATA.footer.contact.phone}

Compensation is important, but learning and growth opportunities matter equally!`;
    }

    // ============ QUESTIONS FOR INTERVIEWER ============
    if (
      cleanQuery.includes('question') &&
      (cleanQuery.includes('ask') || cleanQuery.includes('interview'))
    ) {
      return `❓ Questions Shubham Asks in Interviews:

About the Role:
• What does a typical day look like?
• What are the immediate priorities?
• Tech stack and architecture?

About the Team:
• Team size and structure?
• Development methodology?
• Code review process?

About Growth:
• Learning opportunities?
• Career progression path?
• Mentorship available?

About Company:
• Company culture and values?
• Product roadmap?
• Engineering challenges?

These help understand if it is the right fit, like my experiences at MintSurvey and Soltech were!`;
    }

    // ============ STRENGTHS & WEAKNESSES ============
    if (cleanQuery.includes('strength') || cleanQuery.includes('strong')) {
      return `💪 Core Strengths:

Technical Strengths:
🎯 React.js expertise (95%)
🎯 Full-stack development
🎯 API design and integration
🎯 Database optimization
🎯 Performance tuning

Professional Strengths:
✅ Fast learner (Intern to Full Stack in 1 year)
✅ Deadline-driven delivery
✅ Production experience (MintSurvey)
✅ Clean code practices
✅ Problem-solving skills

What Sets Me Apart:
• Real production experience at MintSurvey
• Diverse project portfolio (13+ projects)
• Continuous learning mindset
• Business understanding
• User-first approach

These strengths helped me succeed at every role!`;
    }

    if (cleanQuery.includes('weak') || cleanQuery.includes('improve')) {
      return `📈 Areas of Improvement:

Currently Working On:
• Advanced TypeScript patterns
• Cloud services (AWS/Azure)
• System design for scale
• DevOps practices
• Microservices architecture

Honest Self-Assessment:
• Sometimes over-engineer simple solutions
• Perfectionist - can spend extra time on details
• Still learning advanced backend patterns
• Want more experience with large-scale systems

How I am Improving:
• Taking online courses
• Building side projects
• Reading engineering blogs
• Contributing to open source
• Learning from senior developers

Growth mindset: Every day is a learning opportunity!`;
    }

    // ============ HOBBIES & INTERESTS ============
    if (
      cleanQuery.includes('hobby') ||
      cleanQuery.includes('interest') ||
      cleanQuery.includes('free time') ||
      cleanQuery.includes('fun')
    ) {
      return `🎯 Interests & Hobbies:

Tech-Related:
💻 Building side projects
📚 Reading tech blogs (Dev.to, Medium)
🎓 Online courses (Udemy, Coursera)
🤝 Tech meetups and webinars
⭐ Contributing to Stack Overflow
🔧 Exploring new frameworks

Personal Interests:
🏃 Fitness and morning runs
📖 Reading self-improvement books
🎮 Occasional gaming
🎬 Tech YouTube channels
☕ Coffee and coding sessions
🌍 Learning about different cultures

Weekend Projects:
• Experimenting with new tech
• Open source contributions
• Building tools for developers
• Optimizing personal projects

Balance work and personal growth!`;
    }

    // ============ WORK STYLE ============
    if (
      cleanQuery.includes('work style') ||
      cleanQuery.includes('how do you work') ||
      cleanQuery.includes('approach')
    ) {
      return `🎯 My Work Style:

Development Approach:
📋 Plan before coding
🧪 Test-driven when possible
📝 Document as I go
🔄 Iterative development
✅ Regular commits
👥 Collaborative mindset

Daily Practices:
• Start with prioritized tasks
• Break complex problems down
• Regular progress updates
• Ask when stuck (15-min rule)
• Code review before merge
• End day with documentation

Communication:
• Proactive updates
• Clear in technical discussions
• Responsive to messages
• Open to feedback
• Share knowledge freely

Remote Work:
• Self-disciplined
• Good time management
• Clear written communication
• Available during core hours

This style worked well at MintSurvey and Soltech!`;
    }

    // ============ TECH COMMUNITY ============
    if (
      cleanQuery.includes('community') ||
      cleanQuery.includes('contribute') ||
      cleanQuery.includes('open source')
    ) {
      return `🌐 Community Involvement:

Open Source:
• GitHub: ${DATA.footer.socialLinks[0].url}
• Contributing to React libraries
• Creating developer tools
• Sharing code snippets

Knowledge Sharing:
• Answer questions on Stack Overflow
• Write technical blog posts
• Share learnings with team
• Mentor junior developers

Professional Network:
• LinkedIn: ${DATA.footer.socialLinks[1].url}
• Tech meetups in Pune
• Online developer communities
• Discord/Slack tech groups

Future Plans:
• Speak at local meetups
• Create YouTube tutorials
• Build useful npm packages
• Contribute to major projects

Believe in giving back to the community that helped me grow!`;
    }

    // ============ MONGODB SPECIFIC ============
    if (cleanQuery.includes('mongo') || cleanQuery.includes('database')) {
      return `🍃 MongoDB & Database Expertise (86% Proficiency):

Database Skills:
✅ Schema Design & Modeling
✅ CRUD Operations
✅ Aggregation Pipelines
✅ Indexing & Performance Optimization
✅ Mongoose ODM
✅ Database Relationships
✅ Data Validation
✅ Backup & Recovery

Projects with MongoDB:
• Job Portal Database Architecture
• MintSurvey Data Management
• User Authentication Systems
• Real-time Analytics Storage
• File Management Systems

Best Practices:
• Proper indexing for performance
• Data validation at schema level
• Efficient query optimization
• Regular backup strategies

Extensive MongoDB experience at MintSurvey and Soltech!`;
    }

    // ============ TYPESCRIPT SPECIFIC ============
    if (cleanQuery.includes('typescript') || cleanQuery.includes('ts')) {
      return `📘 TypeScript Knowledge:

Current Learning Focus:
• Type annotations and interfaces
• Generics and utility types
• Type guards and assertions
• Advanced type patterns
• Integration with React & Node.js

Experience:
• Used in recent projects
• Type-safe component development
• API type definitions
• Improved code maintainability

Benefits I have Seen:
✅ Catch errors at compile time
✅ Better IDE support
✅ Improved code documentation
✅ Easier refactoring
✅ Enhanced team collaboration

Goal: Master advanced TypeScript patterns in next 6 months!`;
    }

    // ============ NEXTJS SPECIFIC ============
    if (cleanQuery.includes('next') || cleanQuery.includes('nextjs')) {
      return `⚡ Next.js Experience:

Features I have Used:
✅ App Router (Next.js 13+)
✅ Server-Side Rendering (SSR)
✅ Static Site Generation (SSG)
✅ API Routes
✅ Image Optimization
✅ File-based Routing
✅ Middleware
✅ Dynamic Imports

Projects Built:
• Rent Agreement Service (In Progress)
• Portfolio Websites
• E-commerce Platforms
• Admin Dashboards

Why I Love Next.js:
• Amazing performance out of the box
• SEO-friendly
• Great developer experience
• Built-in optimizations
• Vercel deployment ease

Currently expanding Next.js expertise with latest features!`;
    }

    // ============ GIT & VERSION CONTROL ============
    if (cleanQuery.includes('git') || cleanQuery.includes('github') || cleanQuery.includes('version control')) {
      return `🔀 Git & Version Control:

Git Expertise:
✅ Branch management (feature, develop, main)
✅ Pull requests and code reviews
✅ Merge conflict resolution
✅ Git workflows (Gitflow, GitHub Flow)
✅ Commit best practices
✅ Rebase and cherry-pick
✅ Git hooks for automation

GitHub Profile:
🐙 ${DATA.footer.socialLinks[0].url}
• 13+ public repositories
• Active contributions
• Clean commit history
• Well-documented projects

Daily Git Usage:
• Feature branch workflow
• Meaningful commit messages
• Regular pushes
• Code review participation
• Maintaining clean history

Essential for collaboration at MintSurvey and Soltech!`;
    }

    // ============ TESTING ============
    if (cleanQuery.includes('test') || cleanQuery.includes('testing') || cleanQuery.includes('quality')) {
      return `🧪 Testing & Quality Assurance:

Testing Experience:
• Manual testing of features
• API testing with Postman
• Browser DevTools debugging
• Cross-browser testing
• Responsive design testing
• Performance testing

Learning & Implementing:
• Jest for unit testing
• React Testing Library
• Integration testing
• E2E testing concepts

Quality Practices:
✅ Code reviews before merge
✅ Testing on multiple devices
✅ Error boundary implementation
✅ Input validation
✅ Security best practices

At MintSurvey:
• Tested production features thoroughly
• Ensured 99.9% uptime
• Fixed critical bugs quickly
• Maintained code quality standards

Quality is never an accident!`;
    }

    // ============ DEPLOYMENT ============
    if (cleanQuery.includes('deploy') || cleanQuery.includes('hosting') || cleanQuery.includes('cloud')) {
      return `☁️ Deployment & Hosting Experience:

Platforms Used:
• Vercel - Next.js projects
• Render - Full-stack applications
• Netlify - Static sites
• GitHub Pages - Documentation
• MongoDB Atlas - Database hosting

Deployment Skills:
✅ Environment variables management
✅ Build optimization
✅ CI/CD basics
✅ Domain configuration
✅ SSL certificates
✅ Performance monitoring

Live Deployed Projects:
• Job Portal: https://job-portal-b7a0.onrender.com/
• MintSurvey: https://mintsurvey.com
• Multiple portfolio sites

Learning:
• AWS services
• Docker containerization
• Kubernetes basics
• DevOps practices

Smooth deployments ensure great user experience!`;
    }

    // ============ API DEVELOPMENT ============
    if (cleanQuery.includes('api') || cleanQuery.includes('rest') || cleanQuery.includes('endpoint')) {
      return `🔌 API Development Expertise:

RESTful API Skills:
✅ CRUD operations design
✅ Authentication & Authorization
✅ JWT token implementation
✅ Request validation
✅ Error handling middleware
✅ API documentation
✅ Rate limiting
✅ Pagination implementation

APIs Built at MintSurvey:
• Survey management endpoints
• User authentication system
• Analytics data endpoints
• File upload/download APIs
• Third-party integrations

Best Practices:
• Consistent naming conventions
• Proper HTTP status codes
• Clear error messages
• API versioning
• Security measures (CORS, sanitization)

Tools Used:
• Postman for testing
• Swagger for documentation
• Express.js framework
• Mongoose for MongoDB

APIs are the backbone of modern applications!`;
    }

    // ============ PERFORMANCE OPTIMIZATION ============
    if (cleanQuery.includes('performance') || cleanQuery.includes('optimization') || cleanQuery.includes('speed')) {
      return `⚡ Performance Optimization:

Real Achievement at MintSurvey:
🎯 Improved dashboard load time by 40%

Optimization Techniques:
✅ React.memo for component memoization
✅ useMemo & useCallback hooks
✅ Code splitting & lazy loading
✅ Image optimization
✅ API response caching
✅ Database query optimization
✅ Pagination for large datasets
✅ Debouncing & throttling

Frontend Optimizations:
• Minimize bundle size
• Tree shaking unused code
• Optimize images (WebP format)
• Lazy load components
• Virtual scrolling for lists

Backend Optimizations:
• Database indexing
• Query optimization
• Caching strategies
• Efficient algorithms
• Async operations

Performance = Better User Experience!`;
    }

    // ============ SECURITY ============
    if (cleanQuery.includes('security') || cleanQuery.includes('secure') || cleanQuery.includes('authentication')) {
      return `🔐 Security & Authentication:

Security Implementations:
✅ JWT-based authentication
✅ Password hashing (bcrypt)
✅ Role-based access control (RBAC)
✅ Input validation & sanitization
✅ SQL/NoSQL injection prevention
✅ XSS protection
✅ CORS configuration
✅ Environment variables for secrets

Authentication Features Built:
• User registration & login
• Email verification
• Password reset functionality
• Session management
• OAuth integration basics
• Protected routes

At MintSurvey:
• Implemented secure auth system
• Protected sensitive data
• Managed user permissions
• Ensured GDPR compliance

Security Best Practices:
• Never commit secrets to Git
• Validate all user inputs
• Use HTTPS in production
• Regular security audits
• Keep dependencies updated

Security first, always!`;
    }

    // ============ RESPONSIVE DESIGN ============
    if (cleanQuery.includes('responsive') || cleanQuery.includes('mobile') || cleanQuery.includes('design')) {
      return `📱 Responsive Design Expertise:

Mobile-First Approach:
✅ Responsive layouts with CSS Grid & Flexbox
✅ TailwindCSS responsive utilities
✅ Media queries optimization
✅ Touch-friendly interfaces
✅ Progressive enhancement

Breakpoints Strategy:
• Mobile: < 640px
• Tablet: 640px - 1024px
• Desktop: > 1024px
• Large screens: > 1440px

Tools & Techniques:
• Chrome DevTools device emulation
• Real device testing
• Viewport meta tags
• Responsive images
• Fluid typography

All Projects are Mobile-Responsive:
• Job Portal - works on all devices
• MintSurvey Dashboard - optimized for mobile
• E-commerce sites - touch-friendly
• Admin panels - responsive tables

60%+ traffic comes from mobile - responsive is mandatory!`;
    }

    // ============ AGILE & SCRUM ============
    if (cleanQuery.includes('agile') || cleanQuery.includes('scrum') || cleanQuery.includes('methodology')) {
      return `🔄 Agile & Scrum Experience:

At MintSurvey & Soltech:
✅ Daily standup meetings
✅ Sprint planning sessions
✅ Sprint retrospectives
✅ Code review process
✅ Task estimation
✅ User story creation

Agile Practices:
• 2-week sprint cycles
• Clear acceptance criteria
• Continuous integration
• Regular feedback loops
• Iterative development

Tools Used:
• Jira for task management
• Slack for team communication
• GitHub for code collaboration
• Figma for design reviews

Benefits Experienced:
• Better team collaboration
• Faster feature delivery
• Regular client feedback
• Improved code quality
• Clear priorities

Agile mindset: Embrace change, deliver value!`;
    }

    // ============ LEARNING RESOURCES ============
    if (cleanQuery.includes('learn') || cleanQuery.includes('course') || cleanQuery.includes('resource')) {
      return `📚 Learning Resources & Continuous Growth:

Online Learning Platforms:
• Udemy - Full-stack courses
• Coursera - Advanced topics
• freeCodeCamp - Practice projects
• YouTube - Tech channels
• Dev.to - Articles & tutorials

Favorite Resources:
📺 Web Dev Simplified
📺 Traversy Media
📺 Fireship
📖 MDN Web Docs
📖 React Official Docs
📖 Node.js Documentation

Daily Habits:
• Read tech articles (30 min)
• Practice coding challenges
• Explore new libraries
• Build side projects
• Engage in tech communities

Recent Learnings:
• Advanced React patterns
• TypeScript best practices
• System design basics
• Cloud services (AWS/Azure)
• Microservices architecture

Never stop learning, tech evolves every day!`;
    }

    // ============ CODE QUALITY ============
    if (cleanQuery.includes('clean code') || cleanQuery.includes('best practice') || cleanQuery.includes('standard')) {
      return `✨ Clean Code & Best Practices:

Code Quality Standards:
✅ Meaningful variable names
✅ Single responsibility principle
✅ DRY (Do not Repeat Yourself)
✅ Proper commenting
✅ Consistent formatting
✅ Error handling
✅ Code reusability

Tools Used:
• ESLint for linting
• Prettier for formatting
• Husky for pre-commit hooks
• SonarQube basics

Code Review Practices:
• Review others code daily
• Provide constructive feedback
• Learn from senior developers
• Implement suggestions
• Maintain coding standards

File Structure:
• Organized folder structure
• Component-based architecture
• Separation of concerns
• Config files management
• Clear naming conventions

At MintSurvey:
• Maintained 90%+ code quality score
• Followed team coding standards
• Wrote self-documenting code
• Regular refactoring

Clean code is readable code!`;
    }

    // ============ SIMPLE QUESTIONS ============
    if (cleanQuery === 'yes' || cleanQuery === 'ok' || cleanQuery === 'okay' || cleanQuery === 'sure') {
      return 'Great! What would you like to know about Shubham? I can tell you about his experience at MintSurvey, current role at Soltech, technical skills, or any of his 13+ projects.';
    }

    if (cleanQuery === 'no' || cleanQuery === 'nope' || cleanQuery === 'nothing') {
      return 'No problem! If you change your mind, I am here to answer any questions about Shubham profile. Have a great day!';
    }

    // ============ MORE HELP ============
    if (cleanQuery.includes('help') || cleanQuery.includes('what can') || cleanQuery.includes('tell me') || cleanQuery.includes('options')) {
      return `🤖 I can provide detailed information about:

📌 **Experience**: MintSurvey, Soltech, CODTECH
📌 **Technical Skills**: React, Node.js, MongoDB
📌 **Projects**: 13+ completed projects
📌 **Education**: MCA & BCA details
📌 **Contact**: How to reach Shubham
📌 **Achievements**: Key accomplishments
📌 **Work Style**: How he works
📌 **Availability**: Open opportunities

Popular Questions:
• "Tell me about MintSurvey experience"
• "What are his React skills?"
• "Show me his projects"
• "How to contact him?"
• "Why should we hire him?"

Just type your question and I will help!`;
    }

    // ============ THANK YOU ============
    if (cleanQuery.includes('thank') || cleanQuery.includes('thanks') || cleanQuery.includes('appreciate')) {
      return `You are welcome! 😊 I am glad I could help you learn about Shubham profile. 

If you have any more questions or would like to connect with him:
📧 Email: ${DATA.footer.contact.email}
💼 LinkedIn: ${DATA.footer.socialLinks[1].url}

Have a wonderful day!`;
    }

    // ============ GOODBYE ============
    if (cleanQuery.includes('bye') || cleanQuery.includes('goodbye') || cleanQuery.includes('see you') || cleanQuery.includes('later')) {
      return `Goodbye! 👋 

Thanks for your interest in Shubham profile. Feel free to:
• Visit again anytime
• Reach out directly at ${DATA.footer.contact.email}
• Connect on LinkedIn: ${DATA.footer.socialLinks[1].url}

Have an amazing day! 🌟`;
    }

    // ============ DEFAULT RESPONSE - IMPROVED ============
    const randomResponses = [
      `I understand you are asking about "${query}". Let me help you better! I can tell you about:\n\n• Shubham experience at MintSurvey and Soltech\n• His technical skills (React, Node.js, MongoDB)\n• 13+ projects he has built\n• How to contact him\n\nCould you please rephrase your question?`,

      `I am not sure I understood "${query}" correctly. Here is what I can help with:\n\n• Work Experience (MintSurvey, Soltech, CODTECH)\n• Technical Skills & Expertise\n• Project Portfolio\n• Education & Achievements\n• Contact Information\n\nWhat specific information would you like?`,

      `Hmm, I could not find a specific answer for "${query}". Try asking about:\n\n• "Tell me about his experience"\n• "What projects has he built?"\n• "What are his skills?"\n• "How can I contact him?"\n• "Why should we hire him?"\n\nWhat interests you most?`,
    ];

    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  };

  return (
    <>
      {/* Floating Chat Button with Bot Icon */}
      <button
        aria-label="Open chat"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-[9999] group"
        onClick={toggleChat}
      >
        <Bot className="group-hover:rotate-12 transition-transform" size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] sm:w-[420px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col animate-fade-in overflow-hidden z-[9998] max-h-[600px]">
          {/* Header with Bot Icon */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Bot className="animate-pulse" size={20} />
              <span>Shubham AI Assistant</span>
            </span>
            <button
              aria-label="Close chat"
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded"
              onClick={toggleChat}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm max-h-[400px] bg-gray-800/50 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className="flex items-start gap-2">
                {msg.sender === 'bot' && (
                  <div className="mt-1">
                    <Bot className="text-blue-400" size={16} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl max-w-[85%] break-words whitespace-pre-line animate-fade-in ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-auto'
                      : 'bg-gray-700/80 text-gray-100 border border-gray-600'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 bg-gray-800/50 border-t border-gray-700 flex gap-2 overflow-x-auto">
            {['Experience', 'Skills', 'Projects', 'Contact'].map((action) => (
              <button
                key={action}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs rounded-full whitespace-nowrap transition-colors"
                onClick={() => {
                  setInput(action.toLowerCase());
                  handleSend();
                }}
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center gap-2">
            <input
              className="flex-1 bg-gray-700/50 text-white placeholder-gray-400 text-sm px-4 py-2.5 rounded-xl outline-none border border-gray-600 focus:border-blue-500 focus:bg-gray-700 transition-all"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about skills, MintSurvey, projects..."
              type="text"
              value={input}
            />
            <button
              aria-label="Send message"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              disabled={!input.trim()}
              onClick={handleSend}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}