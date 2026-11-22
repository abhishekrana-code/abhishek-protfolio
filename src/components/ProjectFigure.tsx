import type { CaseStudy } from "../data";
import { ProjectVisual } from "./ProjectVisual";

type ProjectFigureProps = {
  study: CaseStudy;
  className?: string;
  eager?: boolean;
};

export function ProjectFigure({ study, className = "", eager = false }: ProjectFigureProps) {
  return (
    <figure className={`project-figure ${className}`.trim()}>
      {study.media ? (
        <img
          className="project-figure__image"
          src={study.media.src}
          alt={study.media.alt}
          width={study.media.width}
          height={study.media.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <div
          className="project-figure__study"
          role="img"
          aria-label={study.visualAlt}
        >
          <ProjectVisual variant={study.visual} />
        </div>
      )}
      <figcaption className="project-figure__caption">
        <span className="project-figure__badge">
          {study.media ? "Screenshot" : "Conceptual"}
        </span>{" "}
        <span>{study.media ? study.media.caption : study.visualCaption}</span>
      </figcaption>
    </figure>
  );
}
