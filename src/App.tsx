import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseStudy } from "./data";
import { caseStudies } from "./data";
import { caseStudyHref, getPageMeta, parseRoute, type Route } from "./seo";
import { focusElement } from "./navigation";
import { useScrollReveal } from "./hooks";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { Services } from "./components/Services";
import { Experience } from "./components/Experience";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { CommandPalette } from "./components/CommandPalette";
import { ResumeModal } from "./components/ResumeModal";

type AppProps = {
  route?: Route;
};

function updateMeta(route: Route) {
  const meta = getPageMeta(route);
  const absoluteUrl = `${window.location.origin}${meta.path}`;

  document.title = meta.title;

  const setContent = (selector: string, value: string) => {
    document.querySelector(selector)?.setAttribute("content", value);
  };

  setContent('meta[name="description"]', meta.description);
  setContent('meta[property="og:title"]', meta.title);
  setContent('meta[property="og:description"]', meta.description);
  setContent('meta[property="og:type"]', meta.type);
  setContent('meta[property="og:url"]', absoluteUrl);
  setContent('meta[name="twitter:title"]', meta.title);
  setContent('meta[name="twitter:description"]', meta.description);
  setContent('meta[name="twitter:url"]', absoluteUrl);

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = absoluteUrl;
}

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem("portfolio-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export default function App({ route: initialRoute }: AppProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [route, setRoute] = useState<Route>(() =>
    initialRoute ?? parseRoute(window.location.pathname),
  );
  const enteredFromHome = useRef(false);
  const lastStudyId = useRef<string | null>(null);
  const revealKey = route.name === "case-study" ? route.study.id : "home";

  useScrollReveal(revealKey);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {}
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", theme === "light" ? "#FAF6F0" : "#141312");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    updateMeta(route);
  }, [route]);

  useEffect(() => {
    const syncFromLocation = () => {
      const next = parseRoute(window.location.pathname);
      setRoute(next);

      window.requestAnimationFrame(() => {
        if (next.name === "case-study") {
          window.scrollTo(0, 0);
          return;
        }

        const hash = window.location.hash.replace(/^#/, "");
        if (hash) {
          const target = document.getElementById(hash);
          target?.scrollIntoView();
          focusElement(target);
        } else {
          window.scrollTo(0, 0);
        }

        if (lastStudyId.current) {
          focusElement(
            document.querySelector<HTMLElement>(
              `#${lastStudyId.current} .case-link`,
            ),
          );
        }
      });
    };

    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  const openCaseStudy = useCallback((study: CaseStudy) => {
    lastStudyId.current = study.id;
    enteredFromHome.current = true;

    window.history.pushState(
      { caseStudy: study.id },
      "",
      caseStudyHref(study),
    );
    setRoute({ name: "case-study", study });
    window.scrollTo(0, 0);
  }, []);

  const closeCaseStudy = useCallback(() => {
    if (enteredFromHome.current) {
      enteredFromHome.current = false;
      window.history.back();
      return;
    }

    window.history.replaceState(null, "", "/#work");
    setRoute({ name: "home" });

    window.requestAnimationFrame(() => {
      document.getElementById("work")?.scrollIntoView();
      focusElement(
        document.querySelector<HTMLElement>(
          `#${lastStudyId.current ?? ""} .case-link`,
        ),
      );
    });
  }, []);

  const navigateHome = useCallback((hash?: string) => {
    enteredFromHome.current = false;
    const targetUrl = hash ? `/#${hash}` : "/";
    window.history.pushState(null, "", targetUrl);
    setRoute({ name: "home" });

    window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash);
        target?.scrollIntoView({ behavior: "smooth" });
        window.setTimeout(() => {
          focusElement(target);
        }, 450);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigateHome={navigateHome}
        onOpenCommandPalette={() => setCmdOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />
      <main id="main">
        {route.name === "case-study" ? (
          <CaseStudyPage
            study={route.study}
            onBack={closeCaseStudy}
            onOpenCaseStudy={openCaseStudy}
          />
        ) : (
          <>
            <Hero
              onOpenCaseStudy={openCaseStudy}
              onOpenResume={() => setResumeOpen(true)}
            />
            <Work onOpenCaseStudy={openCaseStudy} />
            <Services />
            <Experience onOpenCaseStudy={openCaseStudy} />
            <About onOpenResume={() => setResumeOpen(true)} />
            <Contact onOpenResume={() => setResumeOpen(true)} />
          </>
        )}
      </main>
      <Footer
        onNavigateHome={navigateHome}
        onOpenResume={() => setResumeOpen(true)}
      />
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={(hash) => navigateHome(hash)}
        onOpenCaseStudy={(studyId) => {
          const found = caseStudies.find((s) => s.id === studyId);
          if (found) openCaseStudy(found);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
      />
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </>
  );
}
