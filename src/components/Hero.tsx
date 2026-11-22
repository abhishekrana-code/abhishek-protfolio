import type { CaseStudy } from "../data";
import { caseStudies, contactLinks } from "../data";
import { caseStudyHref } from "../seo";
import { isPlainClick } from "../navigation";
import { ArrowDown, ArrowUpRight, FileIcon, MailIcon } from "./Icons";

type HeroProps = {
  onOpenCaseStudy: (study: CaseStudy) => void;
};

export function Hero({ onOpenCaseStudy }: HeroProps) {
  const featured = caseStudies.find((study) => study.featured) ?? caseStudies[0];

  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-kicker reveal">
          <p>
            <span className="kicker-line" />
            Full-stack developer &amp; AI product builder
          </p>
        </div>

        <div className="hero-stage">
          <h1 className="hero-title" aria-label="Abhishek Rana">
            <span className="hero-line">
              <span className="hero-line__inner">ABHISHEK</span>
            </span>
            <span className="hero-line hero-line--second">
              <span className="hero-line__inner">
                RANA<span className="hero-dot">.</span>
              </span>
            </span>
          </h1>
        </div>

        <div className="hero-bottom reveal">
          <p className="hero-intro">
            I build full-stack products where considered interfaces meet dependable
            backends — and where AI does <em>real work</em>, not decoration.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href={contactLinks.emailHref}>
              <MailIcon size={16} />
              Email me
            </a>
            <a className="button button--ghost" href={contactLinks.resumeHref}>
              <FileIcon size={16} />
              Resume
            </a>
            <a
              className="hero-inline-link"
              href={contactLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="hero-metrics reveal">
          <div className="metric-pill">
            <span className="metric-pill__val">300+</span>
            <span className="metric-pill__lbl">Automated Tests Written</span>
          </div>
          <div className="metric-pill">
            <span className="metric-pill__val">3</span>
            <span className="metric-pill__lbl">Production Systems Shipped</span>
          </div>
          <div className="metric-pill">
            <span className="metric-pill__val">RAG + pgvector</span>
            <span className="metric-pill__lbl">Hybrid Retrieval &amp; Citations</span>
          </div>
          <div className="metric-pill">
            <span className="metric-pill__val">Playwright</span>
            <span className="metric-pill__lbl">Headless Scraping &amp; ETL</span>
          </div>
        </div>

        <a
          className="hero-feature reveal"
          href={caseStudyHref(featured)}
          onClick={(event) => {
            if (!isPlainClick(event)) return;
            event.preventDefault();
            onOpenCaseStudy(featured);
          }}
        >
          <span className="hero-feature__eyebrow">Featured build</span>
          <span className="hero-feature__name">{featured.title}</span>
          <span className="hero-feature__line">
            Cited answers from your own documents.
          </span>
          <span className="hero-feature__stack">React · Spring Boot · pgvector</span>
          <ArrowUpRight size={20} />
        </a>

        <div className="hero-meta reveal">
          <div className="hero-meta__item">
            <span className="meta-label">Education</span>
            <span className="meta-value">B.Tech CSE, &apos;27</span>
            <span className="meta-sub">Bengal College of Engineering &amp; Technology</span>
          </div>
          <div className="hero-meta__item">
            <span className="meta-label">Experience</span>
            <span className="meta-value">Product engineering internship</span>
            <span className="meta-sub">Full-stack work at Storentic · 2026</span>
          </div>
          <div className="hero-meta__item">
            <span className="meta-label">Focus</span>
            <span className="meta-value">Web + AI systems</span>
            <span className="meta-sub">Backends, integrations, and usable product surfaces</span>
          </div>
          <a className="scroll-cue" href="#work" aria-label="Scroll to selected work">
            <span>SELECTED WORK</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
