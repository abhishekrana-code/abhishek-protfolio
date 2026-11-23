import { useState } from "react";
import type { CaseStudy } from "../data";
import { ProjectVisual } from "./ProjectVisual";

type ProjectFigureProps = {
  study: CaseStudy;
  className?: string;
  eager?: boolean;
};

export function ProjectFigure({ study, className = "", eager = false }: ProjectFigureProps) {
  const [viewMode, setViewMode] = useState<"screenshot" | "model">("screenshot");
  const hasBoth = Boolean(study.media);

  return (
    <figure className={`project-figure ${className}`.trim()}>
      {study.media && viewMode === "screenshot" ? (
        <div className="project-figure__image-wrap">
          <img
            className="project-figure__image"
            src={study.media.src}
            alt={study.media.alt}
            width={study.media.width}
            height={study.media.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
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
        {hasBoth ? (
          <div className="project-figure__toggle" role="group" aria-label="Visual view toggle">
            <button
              type="button"
              className={`figure-toggle-btn ${viewMode === "screenshot" ? "is-active" : ""}`}
              onClick={() => setViewMode("screenshot")}
            >
              ● Screenshot
            </button>
            <button
              type="button"
              className={`figure-toggle-btn ${viewMode === "model" ? "is-active" : ""}`}
              onClick={() => setViewMode("model")}
            >
              Interactive
            </button>
          </div>
        ) : (
          <span className="project-figure__badge">
            {study.media ? "Screenshot" : "Conceptual"}
          </span>
        )}
        <span className="project-figure__caption-text">
          {study.media && viewMode === "screenshot" ? study.media.caption : study.visualCaption}
        </span>
      </figcaption>
    </figure>
  );
}
