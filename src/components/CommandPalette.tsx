import { useEffect, useRef, useState } from "react";
import { caseStudies, contactLinks } from "../data";

type CommandItem = {
  id: string;
  category: "Projects" | "Navigation" | "Tech Stack" | "Actions";
  title: string;
  subtitle?: string;
  badge?: string;
  action: () => void;
};

type CommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (hash: string) => void;
  onOpenCaseStudy: (studyId: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenResume?: () => void;
};

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onOpenCaseStudy,
  theme,
  onToggleTheme,
  onOpenResume,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build commands
  const allCommands: CommandItem[] = [
    // Navigation
    {
      id: "nav-work",
      category: "Navigation",
      title: "Work & Projects",
      subtitle: "Selected engineering & product builds",
      action: () => {
        onNavigate("work");
        onClose();
      },
    },
    {
      id: "nav-services",
      category: "Navigation",
      title: "Services & Client Solutions",
      subtitle: "MVPs, AI integrations, data pipelines & consulting",
      action: () => {
        onNavigate("services");
        onClose();
      },
    },
    {
      id: "nav-experience",
      category: "Navigation",
      title: "Experience",
      subtitle: "Storentic product engineering internship",
      action: () => {
        onNavigate("experience");
        onClose();
      },
    },
    {
      id: "nav-about",
      category: "Navigation",
      title: "About Abhishek",
      subtitle: "Background, CS education & systems philosophy",
      action: () => {
        onNavigate("about");
        onClose();
      },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Contact & Hire Me",
      subtitle: "Email, project inquiry, and direct message",
      action: () => {
        onNavigate("contact");
        onClose();
      },
    },
    // Case studies
    ...caseStudies.map((study) => ({
      id: `study-${study.id}`,
      category: "Projects" as const,
      title: study.title,
      subtitle: `${study.category} · ${study.stack.slice(0, 3).join(", ")}`,
      badge: study.group === "professional" ? "Production" : "Live / Open",
      action: () => {
        onOpenCaseStudy(study.id);
        onClose();
      },
    })),
    // Tech Stack shortcuts
    {
      id: "tech-spring",
      category: "Tech Stack",
      title: "Spring Boot + Java",
      subtitle: "VerityAI & QuestLearn enterprise backends",
      badge: "Backend",
      action: () => {
        onOpenCaseStudy("verity-ai");
        onClose();
      },
    },
    {
      id: "tech-pgvector",
      category: "Tech Stack",
      title: "PostgreSQL + pgvector",
      subtitle: "Semantic similarity & hybrid RAG pipelines",
      badge: "AI / Database",
      action: () => {
        onOpenCaseStudy("verity-ai");
        onClose();
      },
    },
    {
      id: "tech-playwright",
      category: "Tech Stack",
      title: "Playwright + Web Scraping",
      subtitle: "PricePilot competitor extraction pipeline",
      badge: "Automation",
      action: () => {
        onOpenCaseStudy("storentic-pricepilot");
        onClose();
      },
    },
    {
      id: "tech-flask",
      category: "Tech Stack",
      title: "Python / Flask",
      subtitle: "Storentic SEO audit workspace & APIs",
      badge: "Backend",
      action: () => {
        onOpenCaseStudy("storentic-seo");
        onClose();
      },
    },
    // Actions
    {
      id: "act-theme",
      category: "Actions",
      title: `Switch to ${theme === "light" ? "Dark" : "Light"} mode`,
      subtitle: "Toggle visual color theme",
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: "act-view-resume",
      category: "Actions",
      title: "View Resume (PDF)",
      subtitle: "Open official software engineering CV in viewer",
      badge: "View",
      action: () => {
        if (onOpenResume) {
          onOpenResume();
        } else {
          window.open(contactLinks.resumeHref, "_blank");
        }
        onClose();
      },
    },
    {
      id: "act-download-resume",
      category: "Actions",
      title: "Download Resume (PDF)",
      subtitle: "Save official CV to disk",
      badge: "Download",
      action: () => {
        const link = document.createElement("a");
        link.href = contactLinks.resumeHref;
        link.download = "Abhishek_Rana_Resume.pdf";
        link.click();
        onClose();
      },
    },
    {
      id: "act-github",
      category: "Actions",
      title: "Open GitHub Profile",
      subtitle: "@abhishekrana-code repositories & code",
      action: () => {
        window.open(contactLinks.github, "_blank");
        onClose();
      },
    },
    {
      id: "act-email",
      category: "Actions",
      title: "Copy Email Address",
      subtitle: contactLinks.email,
      action: () => {
        navigator.clipboard?.writeText(contactLinks.email);
        onClose();
      },
    },
  ];

  const filtered = query.trim()
    ? allCommands.filter(
        (cmd) =>
          cmd.title.toLowerCase().includes(query.toLowerCase()) ||
          cmd.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
          cmd.category.toLowerCase().includes(query.toLowerCase()),
      )
    : allCommands;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="cmd-header">
          <span className="cmd-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            ref={inputRef}
            className="cmd-input"
            type="text"
            placeholder="Search projects, skills, services, actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="cmd-close" onClick={onClose} aria-label="Close command palette">
            <kbd>ESC</kbd>
          </button>
        </div>

        <ul className="cmd-list" ref={listRef}>
          {filtered.length === 0 ? (
            <li className="cmd-empty">No results found for &ldquo;{query}&rdquo;</li>
          ) : (
            filtered.map((item, idx) => (
              <li
                key={item.id}
                className={`cmd-item ${idx === selectedIndex ? "is-selected" : ""}`}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => item.action()}
              >
                <div className="cmd-item__content">
                  <div className="cmd-item__top">
                    <span className="cmd-item__title">{item.title}</span>
                    {item.badge ? <span className="cmd-item__badge">{item.badge}</span> : null}
                  </div>
                  {item.subtitle ? <span className="cmd-item__subtitle">{item.subtitle}</span> : null}
                </div>
                <span className="cmd-item__category">{item.category}</span>
              </li>
            ))
          )}
        </ul>

        <div className="cmd-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
