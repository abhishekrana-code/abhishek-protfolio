import { useEffect } from "react";
import { caseStudies, type CaseStudy } from "../data";
import { caseStudyHref } from "../seo";
import { isPlainClick } from "../navigation";
import { ProjectFigure } from "./ProjectFigure";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "./Icons";

type CaseStudyPageProps = {
  study: CaseStudy;
  onBack: () => void;
  onOpenCaseStudy: (study: CaseStudy) => void;
};

export function CaseStudyPage({ study, onBack, onOpenCaseStudy }: CaseStudyPageProps) {
  const currentIndex = caseStudies.findIndex((item) => item.id === study.id);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  useEffect(() => {
    document.getElementById("case-title")?.focus({ preventScroll: true });
  }, [study.id]);

  return (
    <article className="case-page" aria-labelledby="case-title">
      <div className="container">
        <nav className="case-page__crumbs" aria-label="Breadcrumb">
          <a
            href="/#work"
            onClick={(event) => {
              if (!isPlainClick(event)) return;
              event.preventDefault();
              onBack();
            }}
          >
            Selected work
          </a>
          <span aria-hidden="true">/</span>
          <span>{study.title}</span>
        </nav>

        <header className="case-page__hero">
          <div className="case-page__intro">
            <p className="overline">{study.timeline}</p>
            <h1 id="case-title" tabIndex={-1}>
              {study.title}
            </h1>
            <p className="case-page__category">{study.category}</p>
            <p className="case-page__summary">{study.summary}</p>
            <p className="case-page__impact">{study.impact}</p>
          </div>

          <aside className="case-page__facts" aria-label="Project facts">
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{study.role}</dd>
              </div>
              <div>
                <dt>Timeline</dt>
                <dd>{study.timeline}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{study.status}</dd>
              </div>
            </dl>

            <div className="case-page__stack">
              <span className="meta-label">Stack</span>
              <ul className="tag-list">
                {study.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="case-page__links">
              {study.links.length ? (
                study.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.kind === "github" ? (
                      <GitHubIcon size={16} />
                    ) : (
                      <ArrowUpRight size={16} />
                    )}
                    {link.label}
                  </a>
                ))
              ) : (
                <span className="case-page__private">
                  Private client work · code and data not public
                </span>
              )}
            </div>
          </aside>
        </header>

        <ProjectFigure study={study} className="case-page__visual" eager />

        <div className="case-page__body">
          <div className="case-page__main">
            <section className="case-section">
              <h2>
                <span>01</span> Problem
              </h2>
              <p className="case-section__lead">{study.challenge}</p>
            </section>

            <section className="case-section">
              <h2>
                <span>02</span> What I built
              </h2>
              <ol className="case-list">
                {study.contributions.map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ol>

              {study.features?.length ? (
                <div className="case-section__subset">
                  <h3>Shipped capabilities</h3>
                  <ul className="case-list case-list--compact">
                    {study.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>

            <section className="case-section">
              <h2>
                <span>03</span> Key decisions
              </h2>

              {study.decisions?.length ? (
                <div className="case-section__subset">
                  <h3>Decisions</h3>
                  <ul className="case-list">
                    {study.decisions.map((decision) => (
                      <li key={decision}>{decision}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {study.challenges?.length ? (
                <div className="case-section__subset">
                  <h3>Hard parts</h3>
                  <ul className="case-list">
                    {study.challenges.map((challenge) => (
                      <li key={challenge}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {study.implementation?.length ? (
                <div className="case-section__subset">
                  <h3>How it works</h3>
                  <ul className="case-list">
                    {study.implementation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>

            <section className="case-section">
              <h2>
                <span>04</span> Evidence
              </h2>
              <p className="case-section__lead">{study.outcome}</p>
              {study.results?.length ? (
                <ul className="case-list case-list--evidence">
                  {study.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              ) : null}
            </section>

            <section className="case-section">
              <h2>
                <span>05</span> What I learned
              </h2>
              <p className="case-section__lead">{study.learning}</p>
            </section>
          </div>

          <aside className="case-page__rail">
            <div className="case-page__rail-block">
              <h2>System shape</h2>
              <ol className="case-flow">
                {study.architectureFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            {study.architecture ? (
              <div className="case-page__rail-block">
                <h2>Architecture</h2>
                <p>{study.architecture}</p>
              </div>
            ) : null}

            <div className="case-page__rail-block">
              <h2>Project</h2>
              <p>
                {study.group === "professional"
                  ? "Delivered as part of my internship at Storentic. Interfaces shown here are conceptual studies, not client screenshots."
                  : "Independent build. Visuals are conceptual interface studies unless a real screenshot is shown."}
              </p>
            </div>
          </aside>
        </div>

        <footer className="case-page__footer">
          <a
            className="button button--ghost"
            href="/#work"
            onClick={(event) => {
              if (!isPlainClick(event)) return;
              event.preventDefault();
              onBack();
            }}
          >
            Back to selected work
          </a>

          {nextStudy && nextStudy.id !== study.id ? (
            <a
              className="case-page__next"
              href={caseStudyHref(nextStudy)}
              onClick={(event) => {
                if (!isPlainClick(event)) return;
                event.preventDefault();
                onOpenCaseStudy(nextStudy);
              }}
            >
              <span>Next case study</span>
              <strong>{nextStudy.title}</strong>
              <ArrowRight size={18} />
            </a>
          ) : null}
        </footer>
      </div>
    </article>
  );
}
