import { useState } from "react";
import { contactLinks } from "../data";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRight } from "./Icons";

const capabilities = [
  {
    index: "01",
    title: "Full-Stack MVPs from Scratch",
    subtitle: "Idea to working software in weeks, not months.",
    description:
      "Architecture, database modeling, secure authentication, and responsive modern frontends built with React 19, TypeScript, and robust backends (Spring Boot or Flask).",
    deliverables: ["Product specification", "Database schema & migrations", "JWT / session auth", "Production deployment"],
    tag: "Full-Stack",
  },
  {
    index: "02",
    title: "AI & Document Intelligence",
    subtitle: "Grounded answers with verifiable citations.",
    description:
      "Beyond basic wrappers: hybrid semantic retrieval with pgvector, citation boundaries, asynchronous PDF processing, and strict prompt validation that never hallucinates.",
    deliverables: ["Vector embedding pipeline", "Hybrid keyword + semantic search", "Source page linking", "Contradiction detection"],
    tag: "AI Systems",
  },
  {
    index: "03",
    title: "Web Automation & Data Pipelines",
    subtitle: "Turning volatile web data into clean business assets.",
    description:
      "Headless scraping with Playwright, structured HTML-to-JSON parsing with LLMs, and Pandas-driven normalization to extract competitor pricing, directories, or market feeds.",
    deliverables: ["Dynamic DOM scrapers", "Anti-flake retry mechanisms", "Clean Pandas ETL pipelines", "Scheduled cron jobs"],
    tag: "Data & Scraping",
  },
  {
    index: "04",
    title: "API Integrations & Performance",
    subtitle: "Connecting Stripe, LLM providers, and Core Web Vitals.",
    description:
      "Reliable REST endpoints, webhook handling, payment flows, and frontend optimization targeting Google PageSpeed benchmarks (sub-second LCP/FCP, zero layout shifts).",
    deliverables: ["Stripe billing integration", "Third-party model caching", "PageSpeed metric audits", "Dockerized deployment"],
    tag: "APIs & Web Vitals",
  },
];

const steps = [
  {
    num: "01",
    phase: "Architecture & Spec",
    time: "Day 1 – 2",
    detail: "We align on requirements, data models, API contracts, and delivery milestones before writing a single line of code.",
  },
  {
    num: "02",
    phase: "Iterative Working Sprints",
    time: "Weekly updates",
    detail: "You get access to a live staging preview to test features as they are built, with zero surprises at the end.",
  },
  {
    num: "03",
    phase: "Automated Testing & Polish",
    time: "Throughout build",
    detail: "Every critical path is backed by automated tests (unit, integration, and E2E) so your software doesn't break in production.",
  },
  {
    num: "04",
    phase: "Handover & Support",
    time: "Final delivery",
    detail: "Clean Git repository, comprehensive README/documentation, Docker Compose configuration, and post-launch support.",
  },
];

export function Services() {
  // Interactive Project Scope Wizard State
  const [projectType, setProjectType] = useState("Full-Stack MVP from Scratch");
  const [preferredStack, setPreferredStack] = useState("React + Spring Boot / Java");
  const [timeline, setTimeline] = useState("2–4 Weeks");
  const [copied, setCopied] = useState(false);

  const scopeBrief = `Project Type: ${projectType}
Preferred Stack: ${preferredStack}
Target Timeline: ${timeline}
Details: I'd like to discuss building this project with Abhishek Rana.`;

  const mailtoHref = `mailto:${contactLinks.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${projectType}`,
  )}&body=${encodeURIComponent(
    `Hi Abhishek,\n\nI saw your portfolio and would like to discuss a project with you:\n\n${scopeBrief}\n\nLooking forward to speaking with you!`,
  )}`;

  const copyScope = async () => {
    try {
      await navigator.clipboard.writeText(scopeBrief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = mailtoHref;
    }
  };

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <SectionHeading
          index="02"
          label="Services & Solutions"
          title={<>Engineering for ambitious clients &amp; teams.</>}
          aside={
            <p>
              Available for select freelance contracts, MVP builds, AI features, and product engineering roles.
            </p>
          }
        />

        {/* 4 Capability Cards */}
        <div className="services-grid">
          {capabilities.map((cap) => (
            <div className="service-card reveal" key={cap.index}>
              <div className="service-card__top">
                <span className="service-card__index">{cap.index}</span>
                <span className="service-card__tag">{cap.tag}</span>
              </div>
              <h3 className="service-card__title">{cap.title}</h3>
              <p className="service-card__subtitle">{cap.subtitle}</p>
              <p className="service-card__desc">{cap.description}</p>
              <div className="service-card__deliverables">
                <span className="overline">Deliverables</span>
                <ul>
                  {cap.deliverables.map((item) => (
                    <li key={item}>
                      <span className="check-bullet" aria-hidden="true">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* How I Work 4-Stage Process */}
        <div className="process-block reveal">
          <div className="process-header">
            <div>
              <span className="overline">Transparent Engineering Process</span>
              <h3 className="process-title">How we work together</h3>
            </div>
            <p className="process-lead">
              No black boxes or hidden delays. Every engagement follows a disciplined, predictable cycle from discovery to production.
            </p>
          </div>

          <div className="process-grid">
            {steps.map((step) => (
              <div className="process-step" key={step.num}>
                <div className="process-step__head">
                  <span className="step-num">{step.num}</span>
                  <span className="step-time">{step.time}</span>
                </div>
                <h4 className="step-title">{step.phase}</h4>
                <p className="step-detail">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Scope & Fast Inquiry Wizard */}
        <div className="scope-wizard reveal" id="project-estimator">
          <div className="scope-wizard__head">
            <span className="overline">Interactive Project Builder</span>
            <h3>Plan your build in 30 seconds</h3>
            <p>Select your scope to generate a structured project brief ready to send or copy.</p>
          </div>

          <div className="scope-wizard__controls">
            <div className="control-group">
              <label className="meta-label">1. Project Type</label>
              <div className="pill-group">
                {[
                  "Full-Stack MVP from Scratch",
                  "AI & RAG Document Pipeline",
                  "Playwright Scraping & Automation",
                  "API Integration / Performance",
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`scope-pill ${projectType === type ? "is-active" : ""}`}
                    onClick={() => setProjectType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label className="meta-label">2. Preferred Technology</label>
              <div className="pill-group">
                {[
                  "React + Spring Boot / Java",
                  "Python / Flask + PostgreSQL",
                  "React 19 + TypeScript / Vite",
                  "Open to Recommendation",
                ].map((stack) => (
                  <button
                    key={stack}
                    type="button"
                    className={`scope-pill ${preferredStack === stack ? "is-active" : ""}`}
                    onClick={() => setPreferredStack(stack)}
                  >
                    {stack}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <label className="meta-label">3. Target Timeline</label>
              <div className="pill-group">
                {["1–2 Weeks (Fast Track)", "2–4 Weeks (Standard MVP)", "Flexible / Ongoing"].map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`scope-pill ${timeline === time ? "is-active" : ""}`}
                    onClick={() => setTimeline(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="scope-output">
            <div className="scope-output__preview">
              <span className="meta-label">Generated Scope Summary</span>
              <pre>{scopeBrief}</pre>
            </div>
            <div className="scope-output__actions">
              <a className="button button--primary" href={mailtoHref}>
                Send Scope Inquiry <ArrowUpRight size={16} />
              </a>
              <button className="button button--ghost" type="button" onClick={copyScope}>
                {copied ? "✓ Copied to Clipboard" : "Copy Scope Brief"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
