import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useActiveSection, useScrollState } from "../hooks";
import { contactLinks } from "../data";
import { focusElement, isPlainClick } from "../navigation";
import {
  ArrowUpRight,
  CloseIcon,
  GitHubIcon,
  MailIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "./Icons";

const links = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const sectionIds = links.map((link) => link.id);

type HeaderProps = {
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
  onNavigateHome?: (hash?: string) => void;
  onOpenCommandPalette?: () => void;
};

export function Header({ theme = "light", onToggleTheme, onNavigateHome, onOpenCommandPalette }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrolled } = useScrollState();
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    const regions = Array.from(
      document.querySelectorAll<HTMLElement>("main, .site-footer"),
    );

    regions.forEach((region) => {
      if (menuOpen) region.setAttribute("inert", "");
      else region.removeAttribute("inert");
    });

    if (menuOpen) {
      const timer = window.setTimeout(() => {
        menuRef.current
          ?.querySelector<HTMLElement>(".mobile-menu__nav a")
          ?.focus();
      }, 80);
      return () => window.clearTimeout(timer);
    }

    return () => {
      regions.forEach((region) => region.removeAttribute("inert"));
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuOpen || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((element) => element.tabIndex !== -1);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const goToSection = (event: ReactMouseEvent<HTMLAnchorElement>, id?: string) => {
    if (!isPlainClick(event)) return;

    setMenuOpen(false);

    if (onNavigateHome) {
      event.preventDefault();
      onNavigateHome(id);
      return;
    }

    if (window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();
    if (id) {
      window.history.pushState(null, "", `/#${id}`);
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "smooth" });

      window.setTimeout(() => {
        focusElement(target);
      }, 450);
    } else {
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <a className="brand" href="/" onClick={(event) => goToSection(event)}>
            <span className="sr-only">Abhishek Rana — home</span>
            <span className="brand-mark" aria-hidden="true">
              <span>AR</span>
            </span>
            <span className="brand-name">
              ABHISHEK
              <br />
              RANA
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.slice(0, 4).map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                className={`nav-link ${active === link.id ? "is-active" : ""}`}
                aria-current={active === link.id ? "location" : undefined}
                onClick={(event) => goToSection(event, link.id)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-right">
            {onOpenCommandPalette && (
              <button
                className="cmd-trigger-btn"
                type="button"
                onClick={onOpenCommandPalette}
                aria-label="Search and quick actions (Cmd+K)"
                title="Search and quick actions (Cmd+K)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search</span>
                <kbd>⌘K</kbd>
              </button>
            )}
            <span className="availability">
              <span className="status-dot" />
              Open to 2027 roles
            </span>
            {onToggleTheme && (
              <button
                className="theme-toggle"
                type="button"
                onClick={onToggleTheme}
                aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
                title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              >
                {theme === "light" ? <MoonIcon size={17} /> : <SunIcon size={17} />}
              </button>
            )}
            <a
              className="header-cta"
              href="/#contact"
              onClick={(event) => goToSection(event, "contact")}
            >
              Let&apos;s talk
              <ArrowUpRight size={14} />
            </a>
            <button
              className="menu-toggle"
              type="button"
              ref={toggleRef}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        ref={menuRef}
      >
        <div className="mobile-menu__inner" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="mobile-menu__top">
            <p className="overline">Navigation</p>
            <div className="mobile-menu__actions">
              {onOpenCommandPalette && (
                <button
                  className="cmd-trigger-btn cmd-trigger-btn--mobile"
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  aria-label="Search and quick actions"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>Search</span>
                  <kbd>⌘K</kbd>
                </button>
              )}
              {onToggleTheme && (
                <button
                  className="theme-toggle theme-toggle--mobile"
                  type="button"
                  onClick={onToggleTheme}
                  aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
                >
                  {theme === "light" ? <MoonIcon size={15} /> : <SunIcon size={15} />}
                  <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
                </button>
              )}
            </div>
          </div>
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {links.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={(event) => goToSection(event, link.id)}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={26} />
              </a>
            ))}
          </nav>
          <div className="mobile-menu__foot">
            <p>Full-stack developer &amp; AI product builder</p>
            <a href={contactLinks.emailHref} tabIndex={menuOpen ? 0 : -1}>
              <MailIcon size={18} /> {contactLinks.email}
            </a>
            <a href={contactLinks.resumeHref} tabIndex={menuOpen ? 0 : -1}>
              <ArrowUpRight size={16} /> Resume · PDF on request
            </a>
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              <GitHubIcon size={18} /> github.com/abhishekrana-code
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
