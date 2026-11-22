# ABHISHEK.RANA — Portfolio

A cinematic, recruiter-focused portfolio for Abhishek Rana — full-stack developer and AI product builder based in Durgapur, West Bengal, India.

The site is built as a single-page React experience with an editorial dark visual system, custom product-interface illustrations, scroll reveals, and accessible case-study overlays.

## Stack

- React 19 + TypeScript
- Vite
- Hand-authored CSS (no UI framework)
- Google Fonts: Manrope, Instrument Serif, DM Mono
- Inline SVG icons and product-interface studies
- IntersectionObserver-driven reveals and section navigation

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Sections

- **Hero** — identity, positioning, availability, location, and education.
- **Selected work** — VerityAI, QuestLearn, Storentic SEO, PricePilot, and Tenant Portal, each with an in-depth case-study route.
- **Experience** — software engineering internship scope and production contributions.
- **About** — background, education, toolkit, and working principles.
- **Contact** — email, GitHub, availability, and real-time IST clock.

## Content notes

- Everything presented is grounded in the information supplied for the portfolio. There are no invented metrics, testimonials, or seniority claims.
- Product visuals are original, abstracted interface studies rather than client screenshots. The site labels them accordingly.
- Primary contact is `iamabhishekrana07@gmail.com`; GitHub is offered as a secondary route.
- To add LinkedIn or change the contact details, update `src/components/Contact.tsx`, `src/components/Footer.tsx`, and the JSON-LD block in `index.html`.
- Shared case-study content lives in `src/data.ts`.
- The design uses a dark theme by default and respects `prefers-reduced-motion`.

## Structure

```text
public/
  fonts/
  favicon.svg
  og-image.png
  robots.txt
scripts/
  prerender.mjs
src/
  components/
    About.tsx
    CaseStudyPage.tsx
    Contact.tsx
    Experience.tsx
    Footer.tsx
    Header.tsx
    Hero.tsx
    Icons.tsx
    ProjectFigure.tsx
    ProjectVisual.tsx
    SectionHeading.tsx
    Work.tsx
  App.tsx
  data.ts
  entry-server.tsx
  hooks.ts
  main.tsx
  navigation.ts
  seo.ts
  styles.css
```

## Deployment

The site produces a static build and can be deployed to Vercel, Netlify, Cloudflare Pages, or any static host. When deploying to a domain, add a canonical URL and `sitemap.xml` for additional SEO coverage.
