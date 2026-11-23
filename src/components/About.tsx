import { contactLinks, principles, toolkit } from "../data";
import { isPlainClick } from "../navigation";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRight, Asterisk, EyeIcon, GitHubIcon } from "./Icons";

type AboutProps = {
  onOpenResume?: () => void;
};

export function About({ onOpenResume }: AboutProps = {}) {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <SectionHeading
          index="04"
          label="About"
          title={
            <>
              Student of the work.
              <br />
              Builder by habit.
            </>
          }
          aside={
            <p>
              A Computer Science undergraduate with a bias toward understanding how things
              are actually built — and then building them.
            </p>
          }
        />

        <div className="about-grid">
          <div className="about-copy reveal">
            <p className="about-quote">
              Computer science gave me the vocabulary. Building gave me the{" "}
              <em>practice.</em>
            </p>
            <div className="about-paragraphs">
              <p>
                I&apos;m Abhishek Rana, a B.Tech Computer Science student at Bengal College
                of Engineering and Technology, expected to graduate in 2027. My interest
                sits at the intersection of full-stack development, backend engineering,
                and AI-powered products.
              </p>
              <p>
                Most of what I know has come from working on real requirements: an API that
                changed, a scraping target that broke, a payment flow that needed a clearer
                failure state. I&apos;m not trying to present myself as a finished engineer.
                I&apos;m trying to become a dependable one by doing work that has to hold up.
              </p>
            </div>
            <div className="about-links">
              <a
                className="inline-link"
                href={contactLinks.github}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon size={16} />
                Follow the work on GitHub
                <ArrowUpRight size={15} />
              </a>
              <a
                className="inline-link"
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
                <EyeIcon size={16} />
                View official resume
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <aside className="about-card reveal" aria-label="Profile details">
            <div className="about-card__top">
              <span>FIELD NOTES / 001</span>
              <Asterisk size={20} />
            </div>

            <div className="about-card__portrait">
              <img
                src="/images/abhishek-rana.jpg"
                alt="Abhishek Rana — Full-Stack Developer & AI Product Builder"
                width={1066}
                height={1600}
                className="about-card__photo"
                loading="lazy"
              />
              <div className="about-card__portrait-overlay" aria-hidden="true">
                <span className="about-card__portrait-badge">Abhishek Rana</span>
              </div>
            </div>

            <dl className="about-card__details">
              <div>
                <dt>Education</dt>
                <dd>B.Tech CSE · BCET</dd>
              </div>
              <div>
                <dt>Graduating</dt>
                <dd>2027</dd>
              </div>
              <div>
                <dt>Open to</dt>
                <dd>Full-stack · backend · AI product roles</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="toolkit reveal">
          <div className="toolkit__head">
            <div>
              <span className="section-index">03.1</span>
              <h3>Toolkit</h3>
            </div>
            <p>Tools I&apos;ve used to build and ship — across independent products, academic work, and client projects.</p>
          </div>
          <div className="toolkit__grid">
            {toolkit.map((group, index) => (
              <div className="toolkit-group" key={group.label}>
                <div className="toolkit-group__head">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h4>{group.label}</h4>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="principles">
          <div className="principles__head reveal">
            <span className="overline">How I work</span>
            <h3>
              Three things I bring
              <br />
              to a team.
            </h3>
          </div>
          <div className="principles__grid">
            {principles.map((principle) => (
              <article className="principle reveal" key={principle.index}>
                <span className="principle__index">{principle.index}</span>
                <h4>{principle.title}</h4>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
