import { useEffect, useRef, useState } from "react";
import { contactLinks } from "../data";
import { useLocalTime } from "../hooks";
import { isPlainClick } from "../navigation";
import { ArrowUpRight, Asterisk, EyeIcon, GitHubIcon, MailIcon } from "./Icons";

type ContactProps = {
  onOpenResume?: () => void;
};

export function Contact({ onOpenResume }: ContactProps = {}) {
  const time = useLocalTime();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactLinks.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = contactLinks.emailHref;
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <div className="contact-topline reveal">
          <div>
            <span className="section-index">05</span>
            <span className="section-label">Contact</span>
          </div>
        </div>

        <div className="contact-title-wrap reveal">
          <h2 className="contact-title">
            <span>LET&apos;S</span>
            <span className="contact-title__second">
              BUILD<span className="hero-dot">.</span>
            </span>
          </h2>
          <Asterisk className="contact-asterisk" size={68} />
        </div>

        <div className="contact-grid reveal">
          <p className="contact-copy">
            I&apos;m looking for a team where I can take ownership, learn from strong
            engineers, and ship software that people actually depend on. If that sounds
            like your team, I&apos;d like to talk.
          </p>

          <div className="contact-actions">
            <div className="contact-primary">
              <a className="contact-primary__link" href={contactLinks.emailHref}>
                <span className="contact-primary__icon">
                  <MailIcon size={22} />
                </span>
                <span className="contact-primary__label">
                  <small>Email</small>
                  <span className="contact-primary__email">{contactLinks.email}</span>
                </span>
                <ArrowUpRight size={24} />
              </a>
              <button
                className="contact-copy-btn"
                type="button"
                onClick={copyEmail}
                aria-live="polite"
              >
                {copied ? "Copied" : "Copy address"}
              </button>
            </div>

            <div className="contact-secondary">
              <a
                className="contact-link"
                href={contactLinks.resumeHref}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (onOpenResume && isPlainClick(e)) {
                    e.preventDefault();
                    onOpenResume();
                  }
                }}
              >
                <EyeIcon size={18} />
                Resume
                <strong>View official PDF</strong>
                <ArrowUpRight size={13} />
              </a>

              <a
                className="contact-link"
                href={contactLinks.github}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon size={17} />
                GitHub
                <strong>{contactLinks.githubHandle}</strong>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-meta reveal">
          <div>
            <span className="meta-label">Location</span>
            <span>Durgapur, West Bengal, India</span>
          </div>
          <div>
            <span className="meta-label">Local time</span>
            <span>{time} IST</span>
          </div>
          <div>
            <span className="meta-label">Focus</span>
            <span>Full-stack engineering · AI products</span>
          </div>
          <div>
            <span className="meta-label">Availability</span>
            <span>Open to 2027 roles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
