import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const templatePath = path.join(dist, "index.html");
const bundlePath = path.join(dist, ".prerender-entry.mjs");

const siteUrl = (process.env.SITE_URL ?? process.argv[2] ?? "").trim().replace(/\/+$/, "");
const today = new Date().toISOString().slice(0, 10);

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setMeta(html, attr, key, value) {
  const pattern = new RegExp(
    `<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s+content="[^"]*"\\s*\\/>`,
  );

  if (!pattern.test(html)) {
    throw new Error(`Meta tag not found: ${attr}=${key}`);
  }

  return html.replace(pattern, `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`);
}

function absolutizeImage(html) {
  if (!siteUrl) return html;

  return html.replaceAll('content="/og-image.png"', `content="${siteUrl}/og-image.png"`);
}

function injectCanonical(html, url) {
  if (!siteUrl) return html;

  const tag = `  <link rel="canonical" href="${url}" />\n  `;
  return html.replace("</head>", `${tag}</head>`);
}

function injectMeta(template, meta) {
  let html = template;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`);
  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", meta.description);
  html = setMeta(html, "property", "og:type", meta.type);
  html = setMeta(html, "name", "twitter:title", meta.title);
  html = setMeta(html, "name", "twitter:description", meta.description);
  html = absolutizeImage(html);

  const fullUrl = siteUrl ? `${siteUrl}${meta.path}` : meta.path;
  html = setMeta(html, "property", "og:url", fullUrl);
  html = setMeta(html, "name", "twitter:url", fullUrl);

  if (siteUrl) {
    html = injectCanonical(html, `${siteUrl}${meta.path}`);
  }

  return html;
}

async function main() {
  const template = await readFile(templatePath, "utf8");

  await mkdir(path.dirname(bundlePath), { recursive: true });
  await build({
    entryPoints: [path.join(root, "src", "entry-server.tsx")],
    outfile: bundlePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    jsx: "automatic",
    external: ["react", "react-dom", "react-dom/server"],
    logLevel: "silent",
  });

  const { listRoutes, render } = await import(pathToFileURL(bundlePath).href);
  const routes = listRoutes();
  const urls = [];
  let homePage = null;

  for (const route of routes) {
    const { html, meta } = render(route);
    const page = injectMeta(template, meta).replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`,
    );

    if (route === "/") {
      homePage = page;
    }

    const target =
      route === "/"
        ? path.join(dist, "index.html")
        : path.join(dist, route.replace(/^\//, ""), "index.html");

    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, page, "utf8");
    urls.push(meta.path === "/" ? `${siteUrl}/` : `${siteUrl}${meta.path}`);
  }

  if (homePage) {
    await writeFile(path.join(dist, "404.html"), homePage, "utf8");
  }

  if (siteUrl) {
    const sitemap = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(
        (url) =>
          `  <url><loc>${url}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq></url>`,
      ),
      "</urlset>",
      "",
    ].join("\n");

    await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");
    console.log(`prerender: wrote ${routes.length} pages and sitemap.xml for ${siteUrl}`);
  } else {
    console.warn(
      "prerender: SITE_URL is not set. Pages were written without canonical, og:url, absolute og:image, or sitemap.",
    );
    console.log(`prerender: wrote ${routes.length} pages`);
  }

  await rm(bundlePath, { force: true });
}

main().catch(async (error) => {
  await rm(bundlePath, { force: true });
  console.error(error);
  process.exitCode = 1;
});
