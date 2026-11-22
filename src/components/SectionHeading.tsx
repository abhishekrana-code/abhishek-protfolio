import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function SectionHeading({ index, label, title, aside, className = "" }: SectionHeadingProps) {
  return (
    <div className={`section-heading reveal ${className}`}>
      <div className="section-heading__meta">
        <span className="section-index">{index}</span>
        <span className="section-label">{label}</span>
        <span className="section-rule" />
      </div>
      <div className="section-heading__content">
        <h2>{title}</h2>
        {aside ? <div className="section-heading__aside">{aside}</div> : null}
      </div>
    </div>
  );
}
