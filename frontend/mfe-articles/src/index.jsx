/**
 * Single-SPA lifecycle entry point for @rootcause/articles
 *
 * Single-SPA calls these 3 exported functions to control this micro-app:
 *   bootstrap — runs once on first activation (setup, nothing needed here)
 *   mount     — URL matches /articles → render React app into the DOM
 *   unmount   — URL leaves /articles  → tear down React app, free memory
 *
 * We implement these manually using React 18's createRoot directly,
 * which avoids any wrapper library and keeps things simple.
 */
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

let root = null;

export function bootstrap() {
  return Promise.resolve();
}

export function mount() {
  const container = document.getElementById("rc-articles");
  root = createRoot(container);
  root.render(<App />);
  return Promise.resolve();
}

export function unmount() {
  if (root) {
    root.unmount();
    root = null;
  }
  return Promise.resolve();
}
