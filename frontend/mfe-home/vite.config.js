import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },

  server: {
    port: 3001,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  build: {
    lib: {
      entry: "src/index.jsx",
      formats: ["es"],
      fileName: () => "mfe-home.js",
    },
    outDir: "dist",
    rollupOptions: {
      external: ["react", "react-dom/client", "single-spa"],
    },
  },

  preview: {
    port: 3001,
    strictPort: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
});
