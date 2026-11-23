import type { MouseEvent as ReactMouseEvent } from "react";
import type { CaseStudy } from "../data";
import { additionalProjects, caseStudies } from "../data";
import { caseStudyHref } from "../seo";
import { isPlainClick } from "../navigation";
import { ProjectFigure } from "./ProjectFigure";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRight } from "./Icons";

type WorkProps = {
  onOpenCaseStudy: (study: CaseStudy) => void;
};

type CaseCardProps = {
  study: CaseStudy;
  variant: "lead" | "split" | "card";
  onOpenCaseStudy: (study: CaseStudy) => void;
};

function CaseCard({ study, variant, onOpenCaseStudy }: CaseCardProps) {
  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    onOpenCaseStudy(study);
  };

  return (
    <article className={`work-item work-item--${variant} reveal`} id={study.id}>
      <ProjectFigure study={study} className="work-item__media" />

      <div className="work-item__body">
        <div className="work-item__lead">
          <div className="work-item__meta">
            <span>{study.year}</span>
            <span>{study.role}</span>
            <span>{study.status}</span>
          </div>

          <h4>{study.title}</h4>
          <p className="work-item__category">{study.category}</p>
        </div>

        <div className="work-item__detail">
          <p className="work-item__summary">{study.summary}</p>
          <p className="work-item__impact">{study.impact}</p>

          <ul className="tag-list" aria-label={`${study.title} technologies`}>
            {study.stack.slice(0, 5).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
            {study.stack.length > 5 ? <li>+{study.stack.length - 5}</li> : null}
          </ul>

          <a
            className="case-link"
            href={caseStudyHref(study)}
            onClick={handleClick}
            aria-label={`Read the ${study.title} case study`}
          >
            <span>Read case study</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Work({ onOpenCaseStudy }: WorkProps) {
  const independent = caseStudies.filter((study) => study.group === "independent");
  const professional = caseStudies.filter((study) => study.group === "professional");

  return (
    <section className="work-section section" id="work">
      <div className="container">
        <SectionHeading
          index="01"
          label="Selected work"
          title={<>Work built to hold up.</>}
          aside={
            <p>
              Two independent builds and three professional products — chosen for the
              engineering decisions behind them, not just the surface.
            </p>
          }
        />

        <div className="work-group">
          <div className="work-group__head reveal">
            <h3>Independent &amp; academic</h3>
            <p>Self-directed products, built end to end and documented in public.</p>
          </div>

          {independent.map((study, index) => (
            <CaseCard
              key={study.id}
              study={study}
              variant={index === 0 ? "lead" : "split"}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </div>

        <div className="work-group">
          <div className="work-group__head reveal">
            <h3>Professional contributions</h3>
            <p>
              Product work delivered as an intern at Storentic. Code and client data
              remain private.
            </p>
          </div>

          <div className="work-grid">
            {professional.map((study) => (
              <CaseCard
                key={study.id}
                study={study}
                variant="card"
                onOpenCaseStudy={onOpenCaseStudy}
              />
            ))}
          </div>
        </div>

        <div className="also-built reveal">
          <div className="also-built__head">
            <div>
              <h3>Also built</h3>
            </div>
            <p>Smaller full-stack work, included for range rather than depth.</p>
          </div>

          <div className="also-built__grid">
            {additionalProjects.map((project) => (
              <div className="also-built__item" key={project.title}>
                {project.media && (
                  <div className="also-built__thumb">
                    <img
                      src={project.media.src}
                      alt={project.media.alt}
                      width={project.media.width}
                      height={project.media.height}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="also-built__body">
                  <div className="also-built__header">
                    <span className="also-built__status">{project.status}</span>
                    <div className="also-built__links">
                      {project.liveHref && (
                        <a
                          className="also-built__link"
                          href={project.liveHref}
                          target="_blank"
                          rel="noreferrer"
                          title="Open live deployment"
                        >
                          Demo <ArrowUpRight size={13} />
                        </a>
                      )}
                      <a
                        className="also-built__link"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        title="View source repository"
                      >
                        Code <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                  <h4>{project.title}</h4>
                  <p>{project.summary}</p>
                  <ul className="tag-list" aria-label={`${project.title} technologies`}>
                    {project.stack.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="work-foot reveal">
          <span className="work-foot__mark">✦</span>
          <p>
            Visuals are conceptual interface studies unless a real screenshot is shown.
            Client code and data remain private.
          </p>
        </div>
      </div>
    </section>
  );
}
