import { useEffect, useRef } from "react";
import { ArrowUpRight, CloseIcon, DownloadIcon, EyeIcon } from "./Icons";
import { contactLinks } from "../data";

type ResumeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="resume-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF Viewer"
    >
      <div
        className="resume-modal"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resume-modal__header">
          <div className="resume-modal__title-wrap">
            <span className="resume-modal__icon">
              <EyeIcon size={18} />
            </span>
            <div>
              <h3 className="resume-modal__title">Abhishek Rana — Resume</h3>
              <p className="resume-modal__sub">Full-Stack Software Engineer · PDF Document</p>
            </div>
          </div>

          <div className="resume-modal__actions">
            <a
              className="button button--ghost resume-modal__btn"
              href={contactLinks.resumeHref}
              target="_blank"
              rel="noreferrer"
              title="Open PDF in new tab"
            >
              <span>Open in tab</span>
              <ArrowUpRight size={15} />
            </a>
            <a
              className="button button--primary resume-modal__btn"
              href={contactLinks.resumeHref}
              download="Abhishek_Rana_Resume.pdf"
              title="Download PDF"
            >
              <DownloadIcon size={15} />
              <span>Download</span>
            </a>
            <button
              type="button"
              className="resume-modal__close"
              onClick={onClose}
              aria-label="Close resume viewer"
            >
              <CloseIcon size={18} />
            </button>
          </div>
        </div>

        <div className="resume-modal__body">
          <iframe
            src={`${contactLinks.resumeHref}#toolbar=1&navpanes=0`}
            title="Abhishek Rana Resume PDF"
            className="resume-modal__iframe"
          />
        </div>
      </div>
    </div>
  );
}
