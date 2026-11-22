import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";
import { caseStudies } from "./data";
import { getPageMeta, parseRoute } from "./seo";

export function listRoutes() {
  return ["/", ...caseStudies.map((study) => `/work/${study.id}`)];
}

export function render(pathname: string) {
  const route = parseRoute(pathname);
  const html = renderToStaticMarkup(<App route={route} />);

  return { html, meta: getPageMeta(route) };
}
