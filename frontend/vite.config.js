import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// API routes served by the backend on :3001. Page navigations (Accept: text/html)
// fall through to the SPA, matching the old CRA "proxy" behavior, since some
// client routes (e.g. /contacts/:id) share a prefix with API routes.
const apiPrefixes = ["/users", "/contacts", "/prompts", "/promptResponses", "/me"];

const proxyToBackend = {
  target: "http://localhost:3001",
  bypass: (req) => (req.headers.accept?.includes("text/html") ? "/index.html" : undefined),
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: Object.fromEntries(apiPrefixes.map((prefix) => [prefix, proxyToBackend])),
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
