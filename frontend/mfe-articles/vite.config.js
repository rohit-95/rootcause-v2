import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Replace Node.js globals with static values at build time
  // single-spa-react and React use process.env.NODE_ENV internally
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },

  server: {
    port: 3003,
    strictPort: true,
    headers: {
      // Required so the shell on localhost:9000 can load this bundle
      "Access-Control-Allow-Origin": "*",
    },
  },

  build: {
    // Output as an ES module library — this is what Single-SPA loads via the import map
    lib: {
      entry: "src/index.jsx",
      formats: ["es"],
      fileName: () => "mfe-articles.js",
    },
    // Output to a folder served by a static server on port 3003
    outDir: "dist",
    rollupOptions: {
      // Don't bundle react/react-dom/single-spa — the shell provides them via import map
      external: ["react", "react-dom/client", "single-spa"],
    },
  },

  // Static file server — serves dist/mfe-articles.js on port 3003
  // Used with `npm run serve` after build, or alongside --watch
  preview: {
    port: 3003,
    strictPort: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
});
