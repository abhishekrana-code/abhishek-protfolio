import type { MouseEvent as ReactMouseEvent } from "react";
import { contactLinks } from "../data";
import { isPlainClick } from "../navigation";
import { ArrowUp, ArrowUpRight, GitHubIcon, MailIcon } from "./Icons";

type FooterProps = {
  onNavigateHome?: (hash?: string) => void;
};

export function Footer({ onNavigateHome }: FooterProps) {
  const scrollToTop = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (event: ReactMouseEvent<HTMLAnchorElement>, id?: string) => {
    if (!isPlainClick(event)) return;
    if (onNavigateHome) {
      event.preventDefault();
      onNavigateHome(id);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <a
            className="footer-brand"
            href="/"
            onClick={(event) => handleNavClick(event)}
          >
            <span className="brand-mark">
              <span>AR</span>
            </span>
            <span>
              Abhishek Rana
              <small>Full-stack developer · AI product builder</small>
            </span>
          </a>

          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="/#work" onClick={(event) => handleNavClick(event, "work")}>
              Work
            </a>
            <a
              href="/#services"
              onClick={(event) => handleNavClick(event, "services")}
            >
              Services
            </a>
            <a
              href="/#experience"
              onClick={(event) => handleNavClick(event, "experience")}
            >
              Experience
            </a>
            <a href="/#about" onClick={(event) => handleNavClick(event, "about")}>
              About
            </a>
            <a
              href="/#contact"
              onClick={(event) => handleNavClick(event, "contact")}
            >
              Contact
            </a>
          </nav>

          <div className="footer-links">
            <a href={contactLinks.emailHref}>
              <MailIcon size={16} /> Email
            </a>
            <a
              href={contactLinks.resumeHref}
              target="_blank"
              rel="noreferrer"
              download="Abhishek_Rana_Resume.pdf"
            >
              <ArrowUpRight size={16} /> Resume (PDF)
            </a>
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <GitHubIcon size={16} /> GitHub
            </a>
            <a href="#top" onClick={scrollToTop}>
              Back to top <ArrowUp size={14} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Abhishek Rana.</p>
          <p>Designed &amp; built with care.</p>
        </div>
      </div>
    </footer>
  );
}
