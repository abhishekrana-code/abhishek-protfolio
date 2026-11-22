import { caseStudies, type CaseStudy } from "../data";
import { caseStudyHref } from "../seo";
import { isPlainClick } from "../navigation";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRight } from "./Icons";

const scope = [
  {
    label: "Product surfaces",
    body: "Audit interfaces, pricing workflows, authentication screens, billing, and self-service account flows.",
  },
  {
    label: "Backend & APIs",
    body: "Flask routes, REST integrations, PostgreSQL-backed features, external API updates, and bug fixes.",
  },
  {
    label: "Data & AI",
    body: "LLM-assisted extraction, PageSpeed analysis, Playwright scraping, and Pandas-based normalization.",
  },
  {
    label: "Quality & delivery",
    body: "Testing scraping paths, debugging edge cases, and improving deployment configuration and reliability.",
  },
];

const products = caseStudies.filter((study) => study.group === "professional");

type ExperienceProps = {
  onOpenCaseStudy: (study: CaseStudy) => void;
};

export function Experience({ onOpenCaseStudy }: ExperienceProps) {
  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <SectionHeading
          index="03"
          label="Experience"
          title={<>Shipping in production.</>}
          aside={
            <p>
              One internship, three products, and a lot of learning through real
              requirements, changing APIs, and edge cases.
            </p>
          }
        />

        <div className="experience-grid">
          <aside className="experience-aside reveal">
            <span className="experience-aside__index">ST / 2026</span>
            <p className="overline">The role</p>
            <h3>
              Software
              <br />
              Engineering
              <br />
              Intern
            </h3>
            <p className="experience-company">Storentic</p>
            <div className="experience-period">
              <span>2026</span>
            </div>

            <div className="experience-products">
              <span className="meta-label">Products</span>
              {products.map((product) => (
                <a
                  key={product.id}
                  href={caseStudyHref(product)}
                  onClick={(event) => {
                    if (!isPlainClick(event)) return;
                    event.preventDefault();
                    onOpenCaseStudy(product);
                  }}
                  aria-label={`Read the ${product.title} case study`}
                >
                  {product.title} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>

            <p className="experience-location">Durgapur, West Bengal · India</p>
          </aside>

          <div className="experience-main">
            <p className="experience-intro reveal">
              I worked across the product surface and the systems underneath it — building
              interfaces, connecting APIs, improving data workflows, and fixing the things
              that only show up when software meets real usage.
            </p>

            <ol className="experience-list reveal">
              <li>
                <span className="experience-list__num">01</span>
                <div>
                  <h4>Contributed across the full stack</h4>
                  <p>
                    Built features in Python/Flask and React/TypeScript, with Jinja2,
                    PostgreSQL, and REST APIs connecting the pieces.
                  </p>
                </div>
              </li>
              <li>
                <span className="experience-list__num">02</span>
                <div>
                  <h4>Integrated external intelligence</h4>
                  <p>
                    Worked with LLM providers, Google PageSpeed Insights, Stripe, and
                    reCAPTCHA — including the model and API changes that came with them.
                  </p>
                </div>
              </li>
              <li>
                <span className="experience-list__num">03</span>
                <div>
                  <h4>Made unreliable inputs useful</h4>
                  <p>
                    Built and debugged Playwright scraping workflows and AI-assisted
                    extraction pipelines for inconsistent competitor websites.
                  </p>
                </div>
              </li>
              <li>
                <span className="experience-list__num">04</span>
                <div>
                  <h4>Improved what already existed</h4>
                  <p>
                    Debugged existing flows, tested scraping functionality, and supported
                    deployment configuration improvements across products.
                  </p>
                </div>
              </li>
            </ol>

            <div className="scope-grid reveal">
              {scope.map((item) => (
                <div className="scope-card" key={item.label}>
                  <span className="scope-card__mark">+</span>
                  <h4>{item.label}</h4>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
