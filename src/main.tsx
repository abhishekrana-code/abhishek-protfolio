import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { parseRoute } from "./seo";
import "./styles.css";

const legacyMatch = /^#work\/([^/]+)$/.exec(window.location.hash);

if (legacyMatch) {
  window.history.replaceState(null, "", `/work/${legacyMatch[1]}`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App route={parseRoute(window.location.pathname)} />
  </StrictMode>,
);
