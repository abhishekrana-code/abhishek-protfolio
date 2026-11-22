import { caseStudies, type CaseStudy } from "./data";

export type Route =
  | { name: "home" }
  | { name: "case-study"; study: CaseStudy };

export function caseStudyHref(study: CaseStudy) {
  return `/work/${study.id}`;
}

export function parseRoute(pathname: string): Route {
  const match = /^\/work\/([^/]+)\/?$/.exec(pathname);

  if (match) {
    const id = decodeURIComponent(match[1]);
    const study = caseStudies.find((item) => item.id === id);
    if (study) return { name: "case-study", study };
  }

  return { name: "home" };
}

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  type: "website" | "article";
};

const homeMeta: PageMeta = {
  title: "Abhishek Rana — Full-Stack Developer & AI Product Builder",
  description:
    "Full-stack developer and AI product builder in Durgapur, India. Computer Science undergraduate building reliable web and AI products.",
  path: "/",
  type: "website",
};

export function getPageMeta(route: Route): PageMeta {
  if (route.name === "home") return homeMeta;

  const { study } = route;

  return {
    title: `${study.title} — ${study.category} · Abhishek Rana`,
    description: study.summary,
    path: `/work/${study.id}`,
    type: "article",
  };
}
