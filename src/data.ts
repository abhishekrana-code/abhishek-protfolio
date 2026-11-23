export type ProjectGroup = "independent" | "professional";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "live" | "external";
};

export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  summary: string;
  impact: string;
  year: string;
  role: string;
  timeline: string;
  stack: string[];
  group: ProjectGroup;
  status: string;
  featured?: boolean;
  challenge: string;
  contributions: string[];
  outcome: string;
  learning: string;
  visual: "seo" | "pricing" | "portal" | "verity" | "questlearn" | "college";
  visualCaption: string;
  visualAlt: string;
  media?: ProjectMedia;
  architectureFlow: string[];
  links: ProjectLink[];
  features?: string[];
  architecture?: string;
  decisions?: string[];
  challenges?: string[];
  implementation?: string[];
  results?: string[];
};

export type AdditionalProject = {
  title: string;
  summary: string;
  stack: string[];
  status: string;
  href: string;
  liveHref?: string;
  media?: ProjectMedia;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "verity-ai",
    title: "VerityAI",
    category: "Evidence-first AI research workspace",
    summary:
      "A document research workspace that answers questions from uploaded PDFs and shows the evidence behind every claim.",
    impact: "166 backend tests, 17 frontend tests, and a Playwright end-to-end suite.",
    year: "2026",
    role: "Solo developer",
    timeline: "Independent project · 2026",
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "pgvector", "Groq"],
    group: "independent",
    status: "Live demo · source available",
    featured: true,
    challenge:
      "Research over long documents is slow and hard to trust. A convincing answer is not enough; the reader needs to know which document, page, and passage supports each claim.",
    contributions: [
      "Built the PDF library with upload, processing states, retry, search, and page-level document access.",
      "Implemented a cited research chat that answers across one or more documents and links claims back to their source pages.",
      "Added hybrid retrieval with local embeddings and PostgreSQL pgvector, falling back to keyword search when the model is unavailable.",
      "Built claim verification and contradiction views that classify support and surface conflicts with citations.",
      "Covered the backend with JUnit, Mockito, and Testcontainers tests, and added Vitest and Playwright coverage for the frontend.",
    ],
    outcome:
      "A working research workspace where answers can be traced back to a page in the uploaded source material instead of ending as an unverifiable chat response.",
    learning:
      "Grounding an AI feature is mostly systems work: retrieval quality, citation boundaries, failure modes, and honest labels matter more than the model wrapper.",
    visual: "verity",
    visualCaption:
      "Research workspace — layout study, not a product screenshot.",
    visualAlt:
      "VerityAI research workspace interface showing document research, verified claims, and citations.",
    media: {
      src: "/images/verity-ai.png",
      alt: "VerityAI live session interface showing document research, verified claims, and citations.",
      caption: "VerityAI live research workspace — cited claims, verification status, and linked PDF sources.",
      width: 1917,
      height: 976,
    },
    architectureFlow: ["React SPA", "Spring Boot API", "PostgreSQL + pgvector", "Groq"],
    links: [
      {
        label: "View source",
        href: "https://github.com/abhishekrana-code/VerityAI",
        kind: "github",
      },
      {
        label: "Open live demo",
        href: "https://verityai.taileb48b2.ts.net",
        kind: "live",
      },
    ],
    features: [
      "PDF library with upload, processing states, retry, and page-level viewing",
      "Cited chat across one or more documents",
      "Hybrid semantic and keyword search with a keyword-only fallback",
      "Claim verification with supported, partial, unsupported, and conflicting classes",
      "Knowledge graph and contradiction detection views",
      "Reports, processing history, session auth, CSRF, and rate limiting",
    ],
    architecture:
      "React SPA → Spring Boot REST API → PostgreSQL with pgvector. Groq handles generation, while retrieval combines semantic and full-text search. Docker Compose runs Postgres, and the deployment documentation uses nginx behind a Cloudflare Tunnel.",
    decisions: [
      "Keep citations at page level instead of document level so a claim can be checked quickly.",
      "Make semantic search optional and degrade to keyword search rather than silently returning weak results.",
      "Store verification results and expose them through reports and history instead of recalculating on every page load.",
    ],
    challenges: [
      "Long documents and inconsistent PDF structure made chunking and citation boundaries the hardest part of the pipeline.",
      "Retrieval quality had to stay visible: the interface labels the strategy and model rather than implying every answer used the same path.",
      "Contradiction detection needed bounded claim pairs to stay useful and affordable.",
    ],
    implementation: [
      "Retrieval fuses pgvector similarity with PostgreSQL full-text search using reciprocal rank fusion.",
      "Uploads are processed asynchronously with retry states and per-user quotas.",
      "Citation links open the source PDF at the relevant page.",
      "Verification, reports, and history are read from stored results rather than recomputed in the browser.",
    ],
    results: [
      "Repository documentation reports 166 backend tests, 17 frontend tests, and a Playwright end-to-end suite.",
      "A public demo is available through Tailscale Funnel.",
    ],
  },
  {
    id: "questlearn",
    title: "QuestLearn",
    category: "Gamified learning management system",
    summary:
      "An LMS that turns course modules into a skill tree, with XP, streaks, quizzes, and a spoken viva for each node.",
    impact: "132 backend tests, 37 frontend tests, and a live public demo.",
    year: "2026",
    role: "Solo developer",
    timeline: "Independent project · 2026",
    stack: ["React", "Spring Boot", "PostgreSQL", "JWT", "Framer Motion", "Groq"],
    group: "independent",
    status: "Live demo · source available",
    challenge:
      "Traditional course dashboards show a list of modules and a completion percentage. The product needed to make progress visible and give students more than one way to prove understanding.",
    contributions: [
      "Designed and built a node-based skill tree with locked, unlocked, and completed states driven by prerequisite rules.",
      "Implemented server-side XP, levels, streaks, and quiz scoring so progress cannot be faked in the client.",
      "Added multiple-choice, ordering, and drag-and-drop assessments stored as JSONB and scored on the server.",
      "Built a viva flow that accepts typed or spoken answers, transcribes audio with Groq Whisper, and grades against each node's topics.",
      "Added instructor quest authoring, student enrollment, role-based dashboards, and a public demo deployment.",
    ],
    outcome:
      "A working LMS where students can browse a course, clear nodes through quizzes or a viva, and see progress accumulate across a visible skill tree.",
    learning:
      "Gamification only works when the rules are enforced by the system. Moving XP and scoring to the server changed the design more than any animation did.",
    visual: "questlearn",
    visualCaption:
      "Skill tree — layout study, not a live learner account.",
    visualAlt:
      "QuestLearn live course explore dashboard showing available learning paths and progress stats.",
    media: {
      src: "/images/questlearn.png",
      alt: "QuestLearn live course explore dashboard showing available learning paths and progress stats.",
      caption: "QuestLearn live explore catalog — course tracks, prerequisites, XP levels, and learner progress counters.",
      width: 1916,
      height: 971,
    },
    architectureFlow: ["React SPA", "Spring Boot API", "PostgreSQL", "Groq"],
    links: [
      {
        label: "View source",
        href: "https://github.com/abhishekrana-code/QuestLearn",
        kind: "github",
      },
      {
        label: "Open live demo",
        href: "https://questlearn.taileb48b2.ts.net",
        kind: "live",
      },
    ],
    features: [
      "Skill-tree curriculum with prerequisite unlocking",
      "Server-side XP, levels, streaks, and quiz scoring",
      "Multiple-choice, ordering, and drag-and-drop assessments stored as JSONB",
      "Typed or spoken viva with Groq transcription and grading",
      "Instructor quest authoring and student enrollment",
      "JWT-secured student, instructor, and admin roles",
    ],
    architecture:
      "React SPA with Context-based auth and gamification state → Spring Boot API with JWT and controller-level role checks → PostgreSQL. Groq transcribes and grades viva answers, and generated quest drafts are validated before they are saved.",
    decisions: [
      "Score quizzes and award XP on the server so progress cannot be forged in the client.",
      "Store varied quiz payloads as JSONB instead of creating a separate table for every question type.",
      "Keep every viva attempt so improvement is visible, not just the best score.",
    ],
    challenges: [
      "Preventing client-side XP manipulation required moving scoring and progression rules into the API.",
      "Voice viva needed a typed fallback and a clear failure state when transcription or grading was unavailable.",
      "Animation-heavy screens had to stay usable, with assets bundled locally for offline demos.",
    ],
    implementation: [
      "Skill-tree state is derived from prerequisite edges and server-awarded node completion.",
      "Quiz payloads are validated and scored server-side before XP is written.",
      "Viva audio is streamed for transcription and is not stored.",
      "Role checks are enforced at the controller layer with method-level authorization.",
    ],
    results: [
      "Repository audit documentation reports 132 backend tests, 37 frontend tests, and a Playwright smoke suite.",
      "A public demo is available through Tailscale Funnel.",
    ],
  },
  {
    id: "storentic-seo",
    title: "Storentic SEO",
    category: "AI-assisted SEO workspace",
    summary:
      "An audit and research workspace that turns fragmented SEO signals into a clearer list of what to fix next.",
    impact: "Delivered audit, keyword research, and scheduled report-email flows.",
    year: "2026",
    role: "Software Engineering Intern",
    timeline: "Storentic · 2026",
    stack: ["Python", "Flask", "Jinja2", "PostgreSQL", "LLM APIs", "PageSpeed Insights"],
    group: "professional",
    status: "Private client work",
    challenge:
      "SEO decisions depend on several disconnected inputs: site audits, keyword opportunities, Core Web Vitals, competitor activity, and reporting. The product needed to bring those signals into one workflow without making the interface feel like a data dump.",
    contributions: [
      "Built AI-powered website audit and keyword research flows that turn raw signals into readable recommendations.",
      "Improved the SEO settings and audit interface, including recent-analysis tracking for repeat work.",
      "Integrated Google PageSpeed Insights metrics — LCP, FCP, CLS, TBT, and Speed Index — into the analysis experience.",
      "Added scheduled SEO report emails and refined the competitor analysis workflow.",
      "Handled model and API changes, fixed backend issues, and improved reliability across deployment configurations.",
    ],
    outcome:
      "A more complete path from analysis to action: run an audit, understand the performance picture, research opportunities, and deliver a useful report without stitching tools together.",
    learning:
      "External APIs and models move. I learned to design product flows around change — with clear fallbacks, bounded assumptions, and interfaces that explain what the system is doing.",
    visual: "seo",
    visualCaption:
      "Audit workspace — layout study, not a client screenshot.",
    visualAlt:
      "Storentic AI-Powered SEO Intelligence interface displaying analytics, competitor intelligence, and security capabilities.",
    media: {
      src: "/images/storentic-seo.png",
      alt: "Storentic AI-Powered SEO Intelligence interface displaying analytics, competitor intelligence, and security capabilities.",
      caption: "Storentic SEO workspace — AI-powered site audit, competitor intelligence, and performance tracking.",
      width: 1185,
      height: 657,
    },
    architectureFlow: ["Flask + Jinja2", "PostgreSQL", "LLM APIs", "PageSpeed Insights"],
    links: [],
    features: [
      "AI-driven on-page SEO audits and content gap analysis",
      "Automated keyword opportunity detection and search intent classification",
      "Google PageSpeed Insights integration (LCP, FCP, CLS, TBT, Speed Index)",
      "Scheduled audit reports and client-facing email delivery",
      "Competitor SEO tracking and historical audit comparison",
    ],
    architecture:
      "Flask backend serving Jinja2 templates and REST endpoints, backed by PostgreSQL for audit histories and scheduled tasks. External integrations connect to Google PageSpeed Insights and LLM APIs with structured prompts, validation, and caching.",
    decisions: [
      "Cache PageSpeed and LLM audit results in PostgreSQL to eliminate duplicate API calls and lower cost.",
      "Structure LLM prompts to output strict JSON schemas, validating responses before rendering to prevent UI crashes.",
      "Separate audit execution from report delivery so scheduled jobs run asynchronously without blocking user sessions.",
    ],
    challenges: [
      "PageSpeed Insights API latency and rate limits required background task execution and resilient retry states.",
      "LLM API updates introduced schema drifts, requiring schema enforcement layers and defensive field parsing.",
      "Presenting dense technical SEO metrics without overwhelming non-technical clients.",
    ],
    implementation: [
      "Implemented modular Flask blueprints for audits, keywords, competitor tracking, and settings.",
      "Constructed cron-driven background jobs for periodic scheduled audit report emails.",
      "Designed resilient error handling and UI fallback states when external PageSpeed or LLM endpoints degrade.",
    ],
    results: [
      "Shipped website audit, keyword research, PageSpeed metrics, and scheduled report delivery workflows to production.",
      "Client codebase delivered during software engineering internship at Storentic; code and data remain private.",
    ],
  },
  {
    id: "storentic-pricepilot",
    title: "PricePilot",
    category: "Competitive pricing intelligence",
    summary:
      "A market-intelligence tool that extracts messy competitor data and turns it into comparable storage-unit pricing.",
    impact: "Turned inconsistent competitor pages into normalized pricing data.",
    year: "2026",
    role: "Software Engineering Intern",
    timeline: "Storentic · 2026",
    stack: ["Python", "Flask", "Playwright", "Pandas", "Groq", "Jinja2"],
    group: "professional",
    status: "Private client work",
    challenge:
      "Competitor websites do not share a data model. Unit sizes, promotions, locations, and availability are presented differently on every page. The challenge was to extract structured, comparable information without flattening the context that makes a price meaningful.",
    contributions: [
      "Developed competitor tracking and market comparison workflows for pricing analysis.",
      "Built a universal website scraper and unit analyzer using Playwright and structured extraction.",
      "Used Groq-powered AI extraction to handle inconsistent page structures and reduce brittle selector logic.",
      "Processed and normalized extracted records with Pandas to support pricing recommendations.",
      "Implemented and tested scraping workflows for a national self-storage chain, then debugged failures across changing pages.",
    ],
    outcome:
      "A repeatable pipeline from raw competitor pages to normalized market data — giving the team a clearer basis for comparison and pricing decisions.",
    learning:
      "Reliable extraction is less about finding one clever selector and more about designing for variance: validate every result, surface uncertainty, and make failure observable.",
    visual: "pricing",
    visualCaption:
      "Market comparison — layout study, not live pricing data.",
    visualAlt:
      "Storentic PricePilot system navigation showing market comparison, unit analyzer, competitor tracking, and admin controls.",
    media: {
      src: "/images/storentic-pricepilot.png",
      alt: "Storentic PricePilot system navigation showing market comparison, unit analyzer, competitor tracking, and admin controls.",
      caption: "Storentic PricePilot dashboard — unit analysis, market comparison, and competitor pricing extraction.",
      width: 1917,
      height: 911,
    },
    architectureFlow: ["Flask", "Playwright", "Groq extraction", "Pandas"],
    links: [],
    features: [
      "Headless browser scraping pipeline powered by Playwright for dynamic competitor websites",
      "AI-assisted HTML extraction with Groq to parse volatile DOM structures into structured JSON",
      "Pandas data cleaning and normalization pipeline for storage unit dimensions, amenities, and promotional rates",
      "Market comparison matrix and unit pricing analytics visualization",
      "Automated error logging and selector degradation alerts",
    ],
    architecture:
      "Flask application orchestrating Playwright headless scrapers. Raw HTML/DOM snapshots are processed via Groq LLM extraction, normalized into tabular datasets with Pandas, and persisted in PostgreSQL for comparative analytics.",
    decisions: [
      "Use Groq LLM inference for ambiguous unit sizes and promo texts rather than writing hundreds of fragile CSS/XPath selectors.",
      "Clean and standardize unit dimensions (e.g., '10x10', '100 sq ft', '10 x 10 ft') in Pandas before comparison.",
      "Decouple scraping execution from analysis so scrapers can run on scheduled intervals and save raw snapshots for replay debugging.",
    ],
    challenges: [
      "Competitor websites frequently changed DOM layouts, class names, and anti-bot obstacles.",
      "Diverse pricing models (first month $1, web-only discounts, administrative fees) made fair like-for-like unit comparison difficult.",
      "Managing memory and headless browser lifecycle in containerized environments during multi-page scraping sessions.",
    ],
    implementation: [
      "Built reusable Playwright scraping workers with retry logic and page-wait strategies.",
      "Prompted Groq with bounded token windows on sanitized DOM extracts to ensure fast, predictable JSON schemas.",
      "Wrote normalization transforms in Pandas to calculate effective monthly cost across disparate promotional structures.",
    ],
    results: [
      "Successfully automated competitor price extraction for national self-storage operators, replacing manual weekly checks.",
      "Client proprietary tool delivered during internship at Storentic; code and data remain private.",
    ],
  },
  {
    id: "tenant-portal",
    title: "Tenant Portal",
    category: "Billing & self-service platform",
    summary:
      "A tenant-facing portal for account access, billing, and payments — designed around the edges where users need clarity most.",
    impact: "Shipped account, billing, autopay, and receipt flows.",
    year: "2026",
    role: "Software Engineering Intern",
    timeline: "Storentic · 2026",
    stack: ["React", "TypeScript", "Material UI", "REST APIs", "Stripe", "reCAPTCHA"],
    group: "professional",
    status: "Private client work",
    challenge:
      "Account and payment flows have little tolerance for ambiguity. Authentication, activation, billing summaries, autopay, and receipts all depend on state that must stay in sync with backend APIs while remaining understandable to the person using them.",
    contributions: [
      "Built login, account activation, password reset, and forgot-password interfaces.",
      "Implemented tenant and unit-related functionality across the portal.",
      "Integrated Stripe payment flows, autopay controls, billing summaries, and receipt PDFs.",
      "Connected payment-related REST APIs and added reCAPTCHA to relevant forms.",
      "Debugged existing flows and tightened error states around account and payment actions.",
    ],
    outcome:
      "A clearer self-service path for tenants to access their account, understand billing, and manage payments without needing a support handoff.",
    learning:
      "I became more deliberate about state design. Happy paths are only the beginning; the quality of a payment product lives in its loading, error, empty, and recovery states.",
    visual: "portal",
    visualCaption:
      "Billing portal — layout study, not a real tenant account.",
    visualAlt:
      "Tenant portal login and account creation portal with secure connection indicators and self-service access.",
    media: {
      src: "/images/tenant-portal.png",
      alt: "Tenant portal login and account creation portal with secure connection indicators and self-service access.",
      caption: "Powdersville Self Storage Tenant Portal — tenant authentication, account onboarding, and billing access.",
      width: 1917,
      height: 902,
    },
    architectureFlow: ["React + MUI", "REST APIs", "Stripe", "reCAPTCHA"],
    links: [],
    features: [
      "End-to-end authentication lifecycle: activation, login, password reset, and session recovery",
      "Stripe Elements checkout integration for one-time balance payments and saved card management",
      "Automated recurring billing (autopay) opt-in, schedule visibility, and cancellation flows",
      "Downloadable itemized PDF payment receipts and billing history logs",
      "Bot protection via Google reCAPTCHA on public-facing authentication and lead forms",
    ],
    architecture:
      "React + TypeScript single-page application built with Material UI design components, interfacing with authenticated REST microservices and Stripe payment gateway APIs.",
    decisions: [
      "Use Stripe Elements for PCI compliance so raw credit card numbers never touch the frontend or client application servers.",
      "Make every state transition explicit (idle, submitting, processing with bank, verified, failed with actionable message) to avoid double charges.",
      "Validate passwords and form constraints in real time on the client while retaining strict server-side validation.",
    ],
    challenges: [
      "Edge cases in payment lifecycles: cards requiring 3D Secure verification, card expiration warnings, and webhook race conditions.",
      "Ensuring responsive layout fidelity on mobile devices for tenants paying rent on smartphones.",
      "Handling expired tokens and session timeouts mid-checkout gracefully without losing user input.",
    ],
    implementation: [
      "Created reusable form wrappers with validation hooks, error boundaries, and reCAPTCHA token generation.",
      "Integrated Stripe Payment Intents with 3D Secure modal triggers and webhook reconciliation.",
      "Styled custom Material UI theme overrides matching the company's brand design guidelines.",
    ],
    results: [
      "Delivered self-service onboarding, payment processing, autopay, and receipt generation to production tenants.",
      "Client proprietary application delivered during software engineering internship at Storentic; code and data remain private.",
    ],
  },
];

export const additionalProjects: AdditionalProject[] = [
  {
    title: "BRO's College",
    summary:
      "A multi-role college workspace for student records, faculty, subjects, attendance, results, timetables, and notices. JWT-protected admin, faculty, and student views.",
    stack: ["React", "Node.js", "Express", "Sequelize", "MySQL", "JWT"],
    status: "Live demo · source available",
    href: "https://github.com/abhishekrana-code/BRO-s",
    liveHref: "https://bro-college.netlify.app",
    media: {
      src: "/images/bros-college.png",
      alt: "Bro's College of Science & Technology web platform",
      caption: "Bro's College live platform — role-based college management portal.",
      width: 1917,
      height: 925,
    },
  },
  {
    title: "My E-Commerce",
    summary:
      "A full-stack commerce build with JWT authentication, product search and filtering, a cart, and order placement. Payment collection is intentionally out of scope.",
    stack: ["React", "Vite", "Flask", "MySQL", "JWT"],
    status: "Learning build · source available",
    href: "https://github.com/abhishekrana-code/My-E-Commerce",
  },
];

export const contactLinks = {
  email: "iamabhishekrana07@gmail.com",
  emailHref: "mailto:iamabhishekrana07@gmail.com",
  resumeHref: "/Abhishek_Rana_Resume.pdf",
  github: "https://github.com/abhishekrana-code",
  githubHandle: "@abhishekrana-code",
};

export const toolkit = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML / CSS"],
  },
  {
    label: "Frontend",
    items: ["React", "Vite", "Material UI", "Framer Motion", "Jinja2"],
  },
  {
    label: "Backend & data",
    items: [
      "Spring Boot",
      "Node.js / Express",
      "Flask",
      "PostgreSQL",
      "MySQL",
      "Sequelize",
      "REST APIs",
      "JWT",
      "Stripe",
    ],
  },
  {
    label: "AI, testing & tooling",
    items: ["Groq", "LLM APIs", "Playwright", "JUnit", "Vitest", "Docker", "Pandas", "PageSpeed Insights"],
  },
];

export const principles = [
  {
    index: "01",
    title: "Understand the work, not just the ticket",
    body: "I start with the workflow behind the requirement — who uses it, what breaks today, and what a good outcome actually looks like.",
  },
  {
    index: "02",
    title: "Ship the whole path",
    body: "A feature is not finished at the happy path. I care about loading states, API failures, empty screens, and the handoff to the next engineer.",
  },
  {
    index: "03",
    title: "Stay accountable to the result",
    body: "Testing and debugging are part of the build, not a separate phase. I would rather surface uncertainty early than hide it behind a polished demo.",
  },
];
