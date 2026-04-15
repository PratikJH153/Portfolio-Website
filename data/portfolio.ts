// ============================================
// PORTFOLIO DATA — Edit this file to personalize
// ============================================

/** Image or video attached to a role — shown in a horizontal scroll strip */
export interface ExperienceMediaItem {
  /** Image URL or video source URL */
  src: string;
  alt: string;
  kind?: "image" | "video";
  /** Shown under the media */
  caption?: string;
}

export interface ExperienceItem {
  /** Job title */
  role: string;
  company: string;
  logo?: string;
  logoAlt?: string;
  /** Displayed date range, e.g. "2022 — Present" */
  timeline: string;
  /**
   * Shown as the top-right pill (e.g. Self-employed, Part-time).
   * Prefer `employment` + `workMode`; use `type` only as a fallback when those are omitted.
   */
  type?: string;
  employment?: string;
  workMode?: string;
  /** Geographic context — shown on its own line with a location marker */
  location?: string;
  /** Short highlights (bullets) */
  details?: string[];
  /** One-line context under the company name */
  description?: string;
  /** Company or product URL */
  website?: string;
  /** Optional label for the link (defaults to "Company site") */
  websiteLabel?: string;
  /** LinkedIn company page URL */
  linkedin?: string;
  /** Screenshots, demos, or team photos — scroll to browse */
  media?: ExperienceMediaItem[];
}

export interface ActivityItem {
  title: string;
  /** e.g. club, conference, or program */
  organization?: string;
  /** e.g. "2023 — Present" or "Fall 2024" */
  period?: string;
  description: string;
  link?: string;
  linkLabel?: string;
  emoji?: string;
  /** Optional images or videos — auto carousel at top of card */
  media?: ExperienceMediaItem[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  oneliner: string;
  tech: string[];
  problem: string;
  approach: string;
  outcome: string;
  emoji?: string;
  logo?: string;
  /** Optional gallery — shown as auto-carousel at top of card */
  media?: ExperienceMediaItem[];
  /** Optional long-form content (README style) */
  readme?: string;
  /** Links for GitHub, Demo, App Stores, etc. */
  links?: ProjectLink[];
}

export interface EducationItem {
  school: string;
  degree: string;
  /** e.g. "Aug 2023 – May 2025" */
  timeline: string;
  grade?: string;
  /** Path under /public, e.g. /illinois_institute_of_technology_logo.jpeg */
  logo: string;
  logoAlt: string;
  /** Activities and societies — each entry is a paragraph (shown in expandable section) */
  activities?: string[];
  /** Coursework / program highlights (main description) */
  description?: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'email';
}

// ── Hero ──
export const hero = {
  name: "Pratik Jadhav",
  role: "Software Engineer",
  company: "Building Intelligent Systems",
  resumeUrl:
    "https://storage.googleapis.com/personal-website-pratikjh/PratikJadhav.pdf",
  location: "San Francisco, CA",
};

// ── Experience ──
export const experience: ExperienceItem[] = [
  {
    role: "Co-Founder & CTO",
    company: "Vibeo",
    description: "AI-powered qualitative research platform for businesses",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGlJWxWOr-mQw/company-logo_100_100/B4DZx2038vHAAQ-/0/1771520098496/vibeoai_logo?e=1777507200&v=beta&t=sns1ufdUeO_YQQDo0THKxvlkrkbjzJF92DdwUNEW_Bc",
    logoAlt: "Vibeo logo",
    timeline: "Nov 2025 — Present",
    employment: "Self-employed",
    workMode: "On-site",
    location: "Chicago, IL",
    details: [
      "Pivoted Vibeo from a nightlife app to a qualitative research platform, transforming hours of unstructured video and conversation data into structured, shareable insights.",
      "Built a multi-agent workflow orchestrator using LangGraph and Python (FastAPI) to automatically convert raw recordings into evidence-backed reports, Excel files, PPT decks, and short clips.",
      "Developed an AI-powered analysis pipeline with OpenAI GPT-4/4o, Hugging Face models, AssemblyAI, and Recall.ai to extract key insights and link them to precise timestamps.",
      "Engineered scalable backend infrastructure with NestJS, PostgreSQL + pgvector, Neo4j, Redis, and GCP Cloud Functions for secure data ingestion, processing, and retrieval.",
      "Designed frontend interfaces in React, Next.js, and TypeScript for interactive dashboards, highlighting insights and visualizing research data.",
      "Implemented CI/CD, Dockerized deployments, Pub/Sub-based task queues, and monitoring with Prometheus, Grafana, PostHog, and GCP logging for reliability and observability.",
      "Managed auth and user workflows using Clerk and ensured system scalability with CDN integration (Cloudflare / GCP CDN) and GCP load balancing.",
      "Led pilots with Dyson, Visa, Fitness First, and Kraft Heinz; monitored adoption, insight accuracy, and time savings, demonstrating clear ROI and $5K in revenue.",
      "Accelerated real-time AI inference, multilingual transcription, semantic embeddings, summarization, cross-session comparison, and trend detection with chat functionality."
    ],
    website: "https://www.vibeo.io/",
    websiteLabel: "vibeo.io",
    linkedin: "https://www.linkedin.com/company/vibeoai/about/",
    media: [
     
      {
        kind: "image",
        src: "https://storage.googleapis.com/personal-website-pratikjh/Screenshot%202026-04-10%20at%2010.48.38%E2%80%AFPM.png",
        alt: "Image3",
      },
      {
        kind: "image",
        src: "https://storage.googleapis.com/personal-website-pratikjh/Screenshot%202026-04-10%20at%2010.49.26%E2%80%AFPM.png",
        alt: "Image4",
      }, {
        kind: "image",
        src: "https://storage.googleapis.com/personal-website-pratikjh/1871-holiday-02328.jpg",
        alt: "Image1",
      },
      {
        kind: "image",
        src: "https://storage.googleapis.com/personal-website-pratikjh/1773260628011.jpeg",
        alt: "Image2",
      },
    ],
  },
  {
    role: "Co-Founder & CTO",
    company: "Vibeo Nightlife App",
    description: "AI-powered nightlife discovery app",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGZNPbcvSJQLQ/company-logo_100_100/company-logo_100_100/0/1738527543940/letsvibeo_logo?e=1777507200&v=beta&t=IHdQiuapRpTTIa5buVMhpSNMy4bXDt20zEyZKuOCAFQ",
    logoAlt: "Vibeo Nightlife App logo",
    timeline: "Feb 2024 — Aug 2025",
    employment: "Self-employed",
    workMode: "On-site",
    location: "Chicago, IL",
    details: [
      "Co-founded and led product & engineering for an AI-powered nightlife discovery app built in Flutter, providing hyper-personalized venue recommendations based on user preferences, location, and social intent.",
      "Engineered real-time video ingestion & analysis pipeline handling 50+ daily uploads, extracting 50+ demographic, vibe, and ambience signals using Python, OpenAI Vision, GCP Cloud Functions, Pinecone, and LangGraph.",
      "Scaled backend infrastructure to support 25+ concurrent users with sub-100ms response time via containerized microservices, CDN caching, and CI/CD pipelines, achieving 100% MoM user growth.",
      "Integrated an NFC/RFID-based redemption system for seamless in-venue perks and promotions, linking digital interactions with physical experiences.",
      "Secured a $25k Google Cloud grant and re-architected multi-environment cloud infrastructure, reducing compute and storage costs by ~30% while improving monitoring, reliability, and environment isolation.",
      "Oversaw technical decisions across backend (Node.js, NestJS, Python FastAPI), infrastructure (GCP, Docker, Pub/Sub, Redis, PostgreSQL + pgvector, Neo4j), and AI/ML (OpenAI SDK, Hugging Face models, LangGraph).",
      "Onboarded venue partners and content creators, manually capturing videos and training AI models, building a 10k+ user community without marketing spend.",
    ],
    website: "https://www.youtube.com/watch?v=PHHsYNpwQ58",
    websiteLabel: "About Vibeo",
    linkedin: "https://www.linkedin.com/company/vibeoinc/about/",
    media: [
      {
        kind: "video",
        src: "https://storage.googleapis.com/personal-website-pratikjh/IMG_3329.MOV",
        alt: "Video1",
      },   {
        kind: "video",
        src: "https://storage.googleapis.com/personal-website-pratikjh/SnapInsta.to_AQMmFJlxUVqSOMGmDkBagHhcIvIELHFmPab6AFfepTPsFllGTR_18293DDsD1rNz9CdI6BCpYfGQBi4W6RMZ2-2c0_Lmt8A0XQoyaG8.mp4",
        alt: "Video4",
      }, 
     
      {
        kind: "image",
        src: "https://storage.googleapis.com/personal-website-pratikjh/IMG_3537.jpg",
        alt: "Image3",
      },
    {
        kind: "video",
        src: "https://storage.googleapis.com/personal-website-pratikjh/SnapInsta.to_AQNk8ABLcTsca6wmBUHILngzJtknurqOW-FPQ0kHB4Y4ZUTAjLIu9NKNi_S6LfPT5-XYk2EVvZeDdQlRYIF36IyQmfcNPgCuMKcNIcs.mp4",
        alt: "Video5",
      },
     {
        kind: "image",
        src: "https://storage.googleapis.com/personal-website-pratikjh/6A3411BF-07DA-46E4-9128-5BAD642595C4.JPG",
        alt: "Image2",
      },
    ],
  },
  {
    role: "Graduate Teaching Assistant",
    company: "Illinois Institute of Technology",
    description: "Graduate Teaching Assistant for CS 422: Mobile Application Development",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQEd6wnmQCCIHw/company-logo_100_100/company-logo_100_100/0/1630559679535/illinois_institute_of_technology_logo?e=1777507200&v=beta&t=Bw1x3wNEzRmrS_r463VRLM78fRnhLyRkD9KiE4t8hV8",
    logoAlt: "Illinois Institute of Technology logo",
    timeline: "Oct 2023 — Jan 2025",
    employment: "Part-time",
    workMode: "On-site",
    location: "Chicago, IL",
    details: [
      "Assisted 200+ students by addressing questions and leading assignment sessions.",
      "Supported professors in grading 500+ assignments and managing course logistics.",
      "Conducted review and problem-solving sessions, helping students improve their grades and raising average course grades by ~10%.",
      "Provided one-on-one guidance to struggling students, resulting in measurable grade improvement.",
    ],
  },
  {
    role: "Backend Developer — Remote Intern",
    company: "WAJOOBA AI LLC",
    description: "Backend Developer for Wajobba AI LLC",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQG4SMjH4qwf8Q/company-logo_100_100/company-logo_100_100/0/1630668425389?e=1777507200&v=beta&t=RTYzQCr-GybnTImWHrc-gsfc3vYvdyUevJbrT9cyajA",
    logoAlt: "Wajobba AI LLC logo",
    timeline: "Feb 2023 — Jun 2023",
    employment: "Internship",
    workMode: "Remote",
    location: "Atlanta, GA",
    details: [
      "Improved backend modules using Node.js and optimized complex MongoDB aggregation pipelines to facilitate the automated generation of 200+ monthly customized reports, improving data processing throughput by ~20%.",
      "Streamlined data pipelines by integrating Airbyte, managing the ingestion of 50k+ records, developing custom Airbyte source connectors, and automating high-volume user communications via SendGrid.",
    ],
  },
];

// ── Skills ──
export const skills: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Python", "TypeScript", "C++", "Dart"],
  },
  {
    name: "LLM & AI/ML",
    skills: ["LangGraph", "RAG", "Fine-tuning (QLoRA)", "vLLM", "FAISS", "Pandas", "NumPy"],
  },
  {
    name: "Full-Stack Dev",
    skills: ["React", "Next.js", "Flutter", "BLoC", "Redux", "Node.js", "NestJS", "FastAPI", "Express.js", "REST", "GraphQL", "WebSockets"],
  },
  {
    name: "Data Architecture",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Neo4j", "Kafka", "RabbitMQ", "System Design", "Microservices"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS (Lambda, Bedrock)", "GCP (Cloud Run, Cloud Functions, VPC, Apigee)", "Docker", "Terraform", "Kubernetes", "GitHub Actions (CI/CD)"],
  },
  {
    name: "Observability Tools & Testing",
    skills: ["Prometheus", "Grafana", "OpenTelemetry", "Langfuse", "PyTest", "Jest"],
  }
];

// ── Projects ──
export const projects: ProjectItem[] = [
  {
    id: "enthem",
    title: "Enthem",
    oneliner: "AI-powered social platform connecting people through personalized recommendations",
    tech: ["Flutter", "Node.js", "Neo4j", "MongoDB", "WebSocket", "Firebase"],
    problem: "Users struggle to find and connect with people who share deep-seated interests and are in close proximity.",
    approach: "Built a cross-platform mobile app with a dual-database architecture (Neo4j for relationships, MongoDB for storage) and implemented Haversine formula for location-based matching.",
    outcome: "Created a real-time platform with graph-based recommendations, secure JWT auth, and interactive data visualization.",
    emoji: "🤝",
    logo: "https://storage.googleapis.com/personal-website-pratikjh/enthem/enthem_logo.png",
    media: [
      { src: "https://storage.googleapis.com/personal-website-pratikjh/enthem/1.png", alt: "Enthem UI 1" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/enthem/2.png", alt: "Enthem UI 2" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/enthem/3.png", alt: "Enthem UI 3" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/enthem/4.png", alt: "Enthem UI 4" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/enthem/FeatureGraphic.png", alt: "Enthem Feature Graphic" },
    ],
    links: [
      { label: "Demo", url: "https://www.youtube.com/watch?v=hLMcNDcewuE&t=1s" },
      { label: "GitHub", url: "https://github.com/PratikJH153/Enthem-Frontend" }
    ],
    readme: `## Enthem - Connecting People through Recommendations

Enthem is a platform that uses advanced algorithms to provide personalized recommendations to users, helping them connect with people who share similar interests and locations.

### Key Features:
- **Graph-Based Recommendations**: Utilizes Neo4j and Cypher to establish and query complex relationships between users and interests.
- **Location Awareness**: Recommends nearby people using the Haversine formula for precise distance calculations.
- **Real-time Interaction**: Implements multi-client WebSocket connections for instant messaging and interaction.
- **Hybrid Data Handling**: Connects Neo4j and MongoDB for efficient handling of both relational and document-based data.
- **Secure Authentication**: Integrated Google Sign-In and JWT-based authorization for end-to-end security.`,
  },
  {
    id: "gitas",
    title: "Gitas AI",
    oneliner: "AI-powered GitHub insights platform for automated code understanding and RAG-based Q&A",
    tech: ["Next.js", "Gemini API", "Prisma", "pgvector", "LangChain", "tRPC"],
    problem: "Understanding large codebases and complex commit diffs is time-consuming for developers.",
    approach: "Designed an automated pipeline to parse GitHub diffs with Octokit and implemented a RAG system for codebase-wide semantic search.",
    outcome: "Enabled automated commit-level code summaries and real-time streaming AI answers for codebase queries.",
    emoji: "🤖",
    logo: "https://storage.googleapis.com/personal-website-pratikjh/gitas-ai/gitas_logo.png",
    media: [
      { src: "https://storage.googleapis.com/personal-website-pratikjh/gitas-ai/Screenshot%202026-04-12%20at%201.28.58%E2%80%AFAM.png", alt: "Gitas AI 1" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/gitas-ai/Screenshot%202026-04-12%20at%2012.54.55%E2%80%AFAM.png", alt: "Gitas AI 2" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/gitas-ai/Screenshot%202026-04-12%20at%2012.55.30%E2%80%AFAM.png", alt: "Gitas AI 3" },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/PratikJH153/Gitas-AI.git" }
    ],
    readme: `## Gitas - AI-Powered GitHub Code Insights Platform

Gitas connects your GitHub repositories to Google Gemini to automate code understanding and streamline developer workflows.

### Key Technical Achievements:
- **Automated Commit Insights**: Built an analysis pipeline using Octokit and diff parsing to generate structured summaries of features, refactors, and security risks.
- **"Ask the Codebase" RAG**: Implemented a semantic search system using LangChain and pgvector, embedding repository files with Gemini for context-aware Q&A.
- **Scalable Workflows**: Engineered backend indexing and embedding generation with streaming responses, supporting both public and private repository access.`,
  },
  {
    id: "taskee",
    title: "Taskee",
    oneliner: "Streak-based productivity partner focused on one-at-a-time task completion",
    tech: ["Flutter", "Dart", "Firebase", "Local Storage", "State Management"],
    problem: "Traditional to-do apps overwhelm users with endless lists and complex features.",
    approach: "Designed a minimal, distraction-free interface centered around building consistency through daily task streaks.",
    outcome: "Successfully launched on Play Store; helps users maintain momentum through gamified productivity.",
    emoji: "🔥",
    logo: "https://storage.googleapis.com/personal-website-pratikjh/taskee/logo.png",
    media: [
      { src: "https://storage.googleapis.com/personal-website-pratikjh/taskee/1.png", alt: "Taskee UI 1" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/taskee/2.png", alt: "Taskee UI 2" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/taskee/3.png", alt: "Taskee UI 3" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/taskee/4.png", alt: "Taskee UI 4" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/taskee/featuregraphic.png", alt: "Taskee Feature Graphic" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/taskee/taskee.png", alt: "Taskee Logo/App Store" },
    ],
    links: [
      { label: "Demo", url: "https://www.youtube.com/shorts/bKUg64j2Qs4" },
      { label: "GitHub", url: "https://github.com/PratikJH153/Unstack2.0" },
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.haum.taskee" }
    ],
    readme: `## Taskee - Daily Streaks & Tasks

Taskee is a simple yet powerful task manager that helps you stay focused, get things done, and build streaks that motivate you every day.

### Why Taskee?
- **Priority Focus**: Organize tasks by priority and tackle the most important one first without distractions.
- **One-at-a-Time View**: Avoid overwhelm by focusing on a single task until completion.
- **Gamified Consistency**: Uses "Task Streaks" to turn productivity into a game, encouraging users not to break their chain of progress.
- **Minimalist Design**: A clean interface that replaces planner overload with clear, actionable progress.`,
  },
  {
    id: "orbit-ai",
    title: "Orbit AI",
    oneliner: "Context-aware AI assistant for collaborative spaces like libraries or classrooms",
    tech: ["FastAPI", "Next.js", "Ollama", "Whisper", "LangChain", "FAISS"],
    problem: "Collaborative physical spaces lack intelligent systems that can passively understand environmental context and offer proactive support.",
    approach: "Built a multi-modal agent system that processes passive audio and environmental cues to offer personalized support, summaries, and idea generation.",
    outcome: "Collaborated with Steelcase Inc. to optimize student-university interaction through AI-integrated study rooms and gamified UX.",
    emoji: "🛰️",
    logo: "https://storage.googleapis.com/personal-website-pratikjh/orbitai/logo",
    media: [
      { src: "https://storage.googleapis.com/personal-website-pratikjh/orbitai/2025_Spring_IDX-562-01%20Multidisciplinary%20Innovation-023.JPG", alt: "Orbit AI 1" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/orbitai/2025_Spring_IDX-562-01%20Multidisciplinary%20Innovation-054.JPG", alt: "Orbit AI 2" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/orbitai/2025_Spring_IDX-562-01%20Multidisciplinary%20Innovation-041.JPG", alt: "Orbit AI 3" },
      { src: "https://storage.googleapis.com/personal-website-pratikjh/orbitai/Screenshot%202025-05-05%20at%209.21.30%E2%80%AFAM.png", alt: "Orbit AI 4" },
    ],
    links: [
      { label: "Demo", url: "https://youtu.be/PwHY02IA51A" },
      { label: "GitHub", url: "https://github.com/PratikJH153/OrbitAI" },
    ],
    readme: `## Orbit AI - Context-Aware Assistant for Collaborative Spaces

Orbit AI is a context-aware assistant built for collaborative spaces like libraries or classrooms. It listens passively, stores key conversation chunks, understands environmental cues (like whiteboards or projectors), and offers personalized support.

### Features & Capabilities:
- **Passive Context Awareness**: Listens to discussions to store key conversation chunks for later retrieval and analysis.
- **Multi-Modal Integration**: Understands environmental cues (whiteboards, projectors) to provide context-specific assistance.
- **Proactive Support**: Summarizes discussions, sparks new ideas, and guides occupants through learning tasks.
- **Collaborative Optimization**: Developed in collaboration with Steelcase Inc. to prototype AI-integrated physical spaces, optimizing student-university interaction.
- **Agent-Based Architecture**: Features a Python (FastAPI) backend wrapped in an AI agent, connected to a responsive Next.js frontend.

### Key Achievements:
- **Collaborated with Steelcase Inc.** to prototype AI-integrated physical spaces, optimizing student-university interaction.
- **Architected a multi-modal AI study room** featuring agent-based interaction and a gamified UX to enhance learning.`,
  },
];

// ── Process / How I Work ──
export const process: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding the problem space, constraints, and desired outcomes through deep conversation and research.",
  },
  {
    number: "02",
    title: "Architecture",
    description: "Designing the system — data flows, interfaces, and infrastructure with scalability in mind.",
  },
  {
    number: "03",
    title: "Build & Iterate",
    description: "Rapid prototyping with tight feedback loops. Ship early, learn fast, improve continuously.",
  },
  {
    number: "04",
    title: "Polish & Ship",
    description: "Production hardening, performance optimization, monitoring, and documentation.",
  },
];

// ── Education ──
export const education: EducationItem[] = [
  {
    school: "Illinois Institute of Technology",
    degree: "Masters, Computer Science",
    timeline: "Aug 2023 – May 2025",
    grade: "3.8",
    logo: "/illinois_institute_of_technology_logo.jpeg",
    logoAlt: "Illinois Institute of Technology logo",
    activities: [
      "Multidisciplinary Innovation Workshop: Led a cross-functional team with Steelcase to reimagine education. Designed an AI-powered, gamified study environment featuring multi-modal interaction 3D spaces to boost student engagement and cognitive performance.",
      'ShapeShift Conference: Presented a breakthrough project to leaders from top global tech firms. Created a "Live Professor" 3D avatar using AI to digitize an emeritus professor\'s archive into a real-time, interactive learning experience.',
    ],
    description: [
      "Machine Learning & AI: Mastered neural architectures, transformers, and generative models (CS 577: Deep Learning) and explored regression, kernel methods, and unsupervised learning (CS 584: Machine Learning).",
      "Systems & Scalability: Studied the architecture of large-scale distributed systems (CS 553: Cloud Computing), system-level parallel processing (CS 546: Parallel and Distributed Processing), and high-performance network protocols (CS 542: Computer Networks I).",
      "Data & Algorithms: Gained expertise in DBMS implementation, transaction management, and distributed data (CS 525: Advanced Database Organization) alongside rigorous mathematical analysis of efficient algorithms and NP-Completeness (CS 535: Design and Analysis of Algorithms).",
      "Computational Theory: Explored operational and denotational semantics to characterize program execution and invariants (CS 536: Science of Programming).",
    ],
  },
  {
    school: "D Y Patil International University, Akurdi, Pune",
    degree: "Bachelor of Technology - BTech, Computer Science",
    timeline: "Aug 2019 – Jul 2023",
    grade: "3.85",
    logo: "/d_y_patil_international_university_akurdi_pune_logo.jpeg",
    logoAlt: "D Y Patil International University, Akurdi, Pune logo",
    activities: [
      "1. Actively contributed to the Entrepreneurship Cell, engaging in startup-oriented activities, collaboration, and early-stage product thinking.",
      "2. Participated in ideation sessions, hackathons, and innovation-driven events, working on solving real-world problems.",
    ],
    description: [
      "Pursued a specialization in Artificial Intelligence & Machine Learning, building a strong foundation in both core computer science and applied AI systems.",
      "Studied key subjects including Data Structures, Algorithms, Computer Networks, Database Systems, Software Engineering, and System Design.",
      "Gained hands-on exposure to advanced domains such as Deep Neural Networks, High Performance Computing, Quantum Computing, and AI Architecture.",
      "Developed an understanding of AI/ML concepts, data science principles, and real-world applications of intelligent systems.",
      "Worked on multiple design projects and practical implementations, strengthening problem-solving and system-building skills.",
      "Explored interdisciplinary areas like Blockchain, UI/UX design, and AI ethics, broadening technical and product perspective.",
      "Built strong foundations in programming, object-oriented design, and analytical thinking, with a focus on applying concepts to real-world problems.",
    ],
  },
];

// ── Activities (community, volunteering, speaking, etc.) ──
export const activities: ActivityItem[] = [
  {
    title: "Open Source Contributor",
    organization: "Various projects",
    period: "Ongoing",
    emoji: "🌿",
    description:
      "Bug fixes and small features across ML tooling; focused on docs and onboarding so newcomers ship faster.",
    link: "https://github.com/PratikJH153",
    linkLabel: "GitHub",
    media: [
      {
        kind: "image",
        src: "https://picsum.photos/seed/activity-oss-a/960/540",
        alt: "Open source contribution highlights",
      },
      {
        kind: "image",
        src: "https://picsum.photos/seed/activity-oss-b/960/540",
        alt: "Documentation and community work",
      },
    ],
  },
  {
    title: "ML Reading Group",
    organization: "Local meetup",
    period: "2023 — Present",
    emoji: "📚",
    description: "Monthly paper discussions — from classic architectures to latest LLM research.",
    media: [
      {
        kind: "image",
        src: "https://picsum.photos/seed/activity-mlrg/960/540",
        alt: "Reading group session",
      },
    ],
  },
  {
    title: "Mentor — CS undergrads",
    organization: "University partnership",
    period: "2022 — 2024",
    emoji: "🎓",
    description: "1:1 sessions on internships, system design basics, and navigating early-career tradeoffs.",
  },
];

// ── Social Links ──
export const socials: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/PratikJH153", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/pratikjh/", icon: "linkedin" },
  { name: "Twitter", url: "https://x.com/JhPratik", icon: "twitter" },
  { name: "Email", url: "mailto:pratik.jh2017@gmail.com", icon: "email" },
];
