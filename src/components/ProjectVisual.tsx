import { useState } from "react";

type ProjectVisualProps = {
  variant: "seo" | "pricing" | "portal" | "verity" | "questlearn" | "college";
};

function Chrome({ app, status = "INTERACTIVE" }: { app: string; status?: string }) {
  return (
    <div className="mock-chrome">
      <div className="mock-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="mock-url">{app}</span>
      <span className="mock-state">
        <i />
        {status}
      </span>
    </div>
  );
}

function SeoVisual() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const desktopVitals = [
    { label: "LCP", value: "0.8s", score: "98/100", width: "94%" },
    { label: "FCP", value: "0.6s", score: "99/100", width: "96%" },
    { label: "CLS", value: "0.00", score: "100/100", width: "100%" },
  ];

  const mobileVitals = [
    { label: "LCP", value: "1.4s", score: "92/100", width: "88%" },
    { label: "FCP", value: "1.1s", score: "94/100", width: "90%" },
    { label: "CLS", value: "0.01", score: "98/100", width: "95%" },
  ];

  const vitals = device === "desktop" ? desktopVitals : mobileVitals;
  const overallScore = device === "desktop" ? 97 : 91;

  return (
    <div className="project-visual project-visual--seo">
      <Chrome app="storentic / seo-audit" />
      <div className="mock-body">
        <div className="seo-top">
          <div>
            <span className="mock-eyebrow">GOOGLE PAGESPEED BENCHMARKS</span>
            <p className="seo-domain">storentic-live-audit.internal</p>
            <div className="seo-pills">
              <button
                type="button"
                className={`interactive-pill ${device === "desktop" ? "is-active" : ""}`}
                onClick={() => setDevice("desktop")}
              >
                Desktop
              </button>
              <button
                type="button"
                className={`interactive-pill ${device === "mobile" ? "is-active" : ""}`}
                onClick={() => setDevice("mobile")}
              >
                Mobile 4G
              </button>
            </div>
          </div>
          <div className="seo-score">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" />
              <circle
                cx="40"
                cy="40"
                r="32"
                className="seo-score__value"
                style={{ strokeDashoffset: `${201 - (201 * overallScore) / 100}` }}
              />
            </svg>
            <div>
              <strong>{overallScore}</strong>
              <span>/100</span>
            </div>
          </div>
        </div>

        <div className="vitals-grid">
          {vitals.map((vital) => (
            <div className="vital" key={vital.label}>
              <div>
                <span>{vital.label}</span>
                <strong>{vital.value}</strong>
              </div>
              <div className="vital-bar">
                <i style={{ width: vital.width }} />
              </div>
            </div>
          ))}
        </div>

        <div className="seo-keywords">
          <span className="mock-eyebrow">AUTOMATED KEYWORD GAP ANALYSIS</span>
          <div className="keyword-pills">
            <span>self storage pricing (Intent: Commercial)</span>
            <span>storage unit near me (Vol: 18.2k)</span>
            <span>climate controlled space (+14% opp)</span>
          </div>
        </div>

        <div className="seo-recent">
          <span>Scheduled Cron Delivery</span>
          <div>
            <i className="recent-icon">✓</i>
            <p>
              Weekly Executive PDF Report
              <small>Delivered via automated SendGrid webhook</small>
            </p>
            <span className="recent-status">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingVisual() {
  const [view, setView] = useState<"normalized" | "raw">("normalized");

  const competitors = [
    { name: "Public Storage", size: "10 × 10", price: "$89/mo", promo: "1st Mo $1", status: "Extracted" },
    { name: "Extra Space", size: "10 × 10", price: "$94/mo", promo: "Online 15% off", status: "Extracted" },
    { name: "CubeSmart", size: "10 × 10", price: "$82/mo", promo: "No Promo", status: "Extracted" },
  ];

  return (
    <div className="project-visual project-visual--pricing">
      <Chrome app="storentic / pricepilot" />
      <div className="mock-body">
        <div className="pricing-head">
          <div>
            <span className="mock-eyebrow">PLAYWRIGHT SCRAPER + GROQ PARSER</span>
            <p className="pricing-title">Competitor Extraction Engine</p>
          </div>
          <div className="view-toggle">
            <button
              type="button"
              className={`view-pill ${view === "normalized" ? "is-active" : ""}`}
              onClick={() => setView("normalized")}
            >
              Normalized Data
            </button>
            <button
              type="button"
              className={`view-pill ${view === "raw" ? "is-active" : ""}`}
              onClick={() => setView("raw")}
            >
              Raw DOM Sample
            </button>
          </div>
        </div>

        {view === "normalized" ? (
          <>
            <div className="price-table">
              <div className="price-row price-row--head">
                <span>Competitor</span>
                <span>Unit Size</span>
                <span>Live Price</span>
                <span>Promo Detected</span>
              </div>
              {competitors.map((comp) => (
                <div className="price-row" key={comp.name}>
                  <span className="competitor">{comp.name}</span>
                  <span>{comp.size}</span>
                  <strong>{comp.price}</strong>
                  <span className="trend">{comp.promo}</span>
                </div>
              ))}
            </div>

            <div className="pricing-foot">
              <span>
                <i>✦</i> Pandas normalization: 14 market variables cleaned
              </span>
              <span>Cron: Hourly sync</span>
            </div>
          </>
        ) : (
          <div className="raw-dom-preview">
            <div className="code-header">
              <span>Playwright Headless Target DOM:</span>
              <span className="code-lang">HTML &rarr; JSON</span>
            </div>
            <pre>
              {`<div class="unit-card-v2_dynamic" data-sku="stor-9821">
  <span class="unit-title">10x10 Climate Controlled</span>
  <div class="pricing-rate-special">
    <span class="strikethrough">$110</span>
    <span class="live-rate">$89.00</span>
    <em class="badge">1st Month $1 Special</em>
  </div>
</div>
<!-- Extracted & Validated via Groq JSON Schema -->`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function PortalVisual() {
  const [autopay, setAutopay] = useState(true);

  return (
    <div className="project-visual project-visual--portal">
      <Chrome app="tenant / portal" />
      <div className="mock-body">
        <div className="portal-head">
          <div className="portal-avatar">AR</div>
          <div>
            <span className="mock-eyebrow">TENANT SELF-SERVICE</span>
            <p className="portal-name">Unit #204 — 10×15 Climate Controlled</p>
          </div>
          <span className="portal-status">
            <i />
            Active Lease
          </span>
        </div>

        <div className="portal-balance">
          <div>
            <span>Current Balance</span>
            <strong>
              <small>$</small>0.00
            </strong>
            <p>Paid through next renewal cycle</p>
          </div>
          <span className="portal-pay" style={{ opacity: 0.7 }}>Paid in Full</span>
        </div>

        <div className="portal-grid">
          <div className="portal-panel">
            <div className="portal-panel__head">
              <span>Autopay Status</span>
              <button
                type="button"
                className={`toggle ${autopay ? "is-active" : ""}`}
                onClick={() => setAutopay((prev) => !prev)}
                aria-label="Toggle autopay"
              >
                <i />
              </button>
            </div>
            <p>Visa ending in 4242</p>
            <span>{autopay ? "Enrolled · Renews automatically" : "Disabled · Manual pay required"}</span>
          </div>
          <div className="portal-panel">
            <div className="portal-panel__head">
              <span>Gate Access PIN</span>
              <span>#4829</span>
            </div>
            <p>Keyless gate &amp; elevator code</p>
            <span>Facility hours: 6:00 AM – 10:00 PM</span>
          </div>
        </div>

        <div className="portal-transactions">
          <span className="mock-eyebrow">MONTHLY BREAKDOWN</span>
          <div>
            <span>Base Unit Rent</span>
            <strong>$125.00</strong>
          </div>
          <div>
            <span>Property Protection Tier 1</span>
            <strong>$12.00</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function VerityVisual() {
  const queries = [
    {
      id: "q1",
      question: "Are multi-page citation boundaries preserved in the response?",
      answer:
        "Yes. The ingestion pipeline indexes text in 500-token chunks with strict page metadata. Claims link directly back to the exact source PDF page.",
      source: "Verity_Architecture_Spec.pdf · Page 4",
      similarity: "0.93 cosine (pgvector)",
      confidence: "100% Grounded",
      quote:
        "\"Citation boundaries are enforced at ingest: every chunk retains start_page, end_page, and sha256 document checksums to ensure unforgeable evidence links.\"",
    },
    {
      id: "q2",
      question: "How does retrieval behave when the embedding model is unavailable?",
      answer:
        "The system executes a graceful fallback to PostgreSQL Full-Text Search (tsvector/tsquery), labeling results as keyword-only in the UI.",
      source: "Failover_Policy_v2.pdf · Page 12",
      similarity: "Keyword RRF Fallback",
      confidence: "Fallback Mode",
      quote:
        "\"When Groq or local embedding services timeout, the search service degrades to reciprocal rank fusion over PostgreSQL native text indexes.\"",
    },
    {
      id: "q3",
      question: "What test coverage protects against regressions?",
      answer:
        "The repository includes 166 backend JUnit/Mockito tests with Testcontainers for live Postgres, 17 Vitest tests, and a Playwright E2E suite.",
      source: "CI_Build_Report.pdf · Page 1",
      similarity: "0.89 cosine (pgvector)",
      confidence: "Verified by CI",
      quote:
        "\"166 passing backend tests, 17 frontend unit tests, 4 Playwright smoke tests executing on every commit in GitHub Actions.\"",
    },
  ];

  const [activeQuery, setActiveQuery] = useState(queries[0]);
  const [showQuote, setShowQuote] = useState(false);

  return (
    <div className="project-visual project-visual--verity">
      <Chrome app="verity / cited-research" />
      <div className="mock-body">
        <div className="verity-head">
          <div>
            <span className="mock-eyebrow">HYBRID RAG INTERACTIVE PLAYGROUND</span>
            <p className="verity-title">Test Grounded Document Citations</p>
          </div>
          <span className="verity-badge">{activeQuery.similarity}</span>
        </div>

        {/* Clickable Query Selector */}
        <div className="verity-queries">
          {queries.map((q) => (
            <button
              key={q.id}
              type="button"
              className={`query-pill ${activeQuery.id === q.id ? "is-active" : ""}`}
              onClick={() => {
                setActiveQuery(q);
                setShowQuote(false);
              }}
            >
              {q.question}
            </button>
          ))}
        </div>

        <div className="verity-layout">
          <div className="verity-answer">
            <div className="verity-answer__head">
              <span className="mock-eyebrow">GROUNDED ANSWER</span>
              <span className="verity-status-tag">{activeQuery.confidence}</span>
            </div>
            <p className="verity-answer__text">{activeQuery.answer}</p>

            <div className="verity-citations">
              <button
                type="button"
                className="citation-pill"
                onClick={() => setShowQuote((prev) => !prev)}
                title="Click to inspect exact document passage"
              >
                <span>[1] {activeQuery.source}</span>
                <span className="citation-pill__hint">{showQuote ? "▲ Hide excerpt" : "▼ Inspect excerpt"}</span>
              </button>
            </div>

            {showQuote && (
              <div className="citation-quote-box">
                <span className="quote-label">Exact Document Excerpt:</span>
                <p>{activeQuery.quote}</p>
              </div>
            )}
          </div>
        </div>

        <div className="verity-foot">
          <span>Spring Boot 3 · pgvector · Testcontainers</span>
          <span>166 Tests Passed</span>
        </div>
      </div>
    </div>
  );
}

function QuestLearnVisual() {
  const nodes = [
    { id: "01", x: 60, y: 44, label: "Foundations", state: "done", xp: "100 XP", format: "JSONB Quiz" },
    { id: "02", x: 180, y: 44, label: "Components", state: "done", xp: "150 XP", format: "Code Drag-and-Drop" },
    { id: "03", x: 300, y: 44, label: "State & Hooks", state: "active", xp: "250 XP", format: "Interactive Viva" },
    { id: "04", x: 120, y: 118, label: "Routing", state: "locked", xp: "150 XP", format: "Prerequisite Required" },
    { id: "05", x: 240, y: 118, label: "Testing", state: "locked", xp: "300 XP", format: "Vitest + Playwright" },
  ];

  const [selectedNode, setSelectedNode] = useState(nodes[2]);

  return (
    <div className="project-visual project-visual--questlearn">
      <Chrome app="questlearn / skill-tree" />
      <div className="mock-body">
        <div className="quest-head">
          <div>
            <span className="mock-eyebrow">INTERACTIVE SKILL TREE</span>
            <p className="quest-title">React Systems &amp; Engineering</p>
          </div>
          <span className="quest-level">LEVEL 4 ARCHITECT</span>
        </div>

        <div className="quest-stats">
          <div className="quest-stat">
            <span>TOTAL XP</span>
            <strong>1,450</strong>
          </div>
          <div className="quest-stat">
            <span>STREAK</span>
            <strong>7 Days</strong>
          </div>
          <div className="quest-stat">
            <span>ACTIVE NODE</span>
            <strong>{selectedNode.label}</strong>
          </div>
        </div>

        <div className="quest-tree">
          <svg viewBox="0 0 420 160" role="presentation">
            <path className="quest-edge quest-edge--done" d="M60 44H180" />
            <path className="quest-edge quest-edge--done" d="M180 44H300" />
            <path className="quest-edge" d="M180 44 120 118M180 44 240 118" />
            {nodes.map((node) => (
              <g
                className={`quest-node quest-node--${node.state} ${selectedNode.id === node.id ? "is-selected" : ""}`}
                key={node.id}
                transform={`translate(${node.x} ${node.y})`}
                onClick={() => setSelectedNode(node)}
                style={{ cursor: "pointer" }}
              >
                <circle r="18" />
                <text className="quest-node__number" y="3">
                  {node.id}
                </text>
                <text className="quest-node__label" y="32">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Selected Node Details Bar */}
        <div className="node-detail-bar">
          <div className="node-detail-info">
            <span className="node-badge node-badge--state">{selectedNode.state.toUpperCase()}</span>
            <strong>{selectedNode.label}</strong>
            <span>({selectedNode.format})</span>
          </div>
          <span className="node-reward">{selectedNode.xp}</span>
        </div>

        <div className="quest-foot">
          <span>Server-Side XP Validation</span>
          <span>Groq Whisper Voice Viva</span>
        </div>
      </div>
    </div>
  );
}

function CollegeVisual() {
  const rows = [
    { subject: "Data Structures & Algorithms", attendance: "92%", status: "On Track", state: "ok" },
    { subject: "Database Management Systems", attendance: "88%", status: "On Track", state: "ok" },
    { subject: "Operating Systems", attendance: "85%", status: "On Track", state: "ok" },
  ];

  return (
    <div className="project-visual project-visual--college">
      <Chrome app="campus / portal" />
      <div className="mock-body">
        <div className="college-head">
          <div>
            <span className="mock-eyebrow">ACADEMIC EXCELLENCE</span>
            <p className="college-title">Bengal College of Engineering &amp; Technology</p>
          </div>
          <span className="college-role">B.TECH CSE &apos;27</span>
        </div>

        <div className="college-stats">
          <div className="college-stat">
            <span>Specialization</span>
            <strong>Computer Science</strong>
          </div>
          <div className="college-stat">
            <span>Status</span>
            <strong>Full-Time Student</strong>
          </div>
          <div className="college-stat">
            <span>Graduation</span>
            <strong>2027</strong>
          </div>
        </div>

        <div className="college-table">
          <div className="college-row college-row--head">
            <span>Core Subject</span>
            <span>Attendance</span>
            <span>Standing</span>
          </div>
          {rows.map((row) => (
            <div className="college-row" key={row.subject}>
              <span className="college-subject">{row.subject}</span>
              <span>{row.attendance}</span>
              <span className={`is-${row.state}`}>{row.status}</span>
            </div>
          ))}
        </div>

        <div className="college-foot">
          <span>Systems &amp; Algorithms Core</span>
          <span>Competitive Programming &amp; Build Track</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectVisual({ variant }: ProjectVisualProps) {
  if (variant === "seo") return <SeoVisual />;
  if (variant === "pricing") return <PricingVisual />;
  if (variant === "portal") return <PortalVisual />;
  if (variant === "verity") return <VerityVisual />;
  if (variant === "questlearn") return <QuestLearnVisual />;
  return <CollegeVisual />;
}
