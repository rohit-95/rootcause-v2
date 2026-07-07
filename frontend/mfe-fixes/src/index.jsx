/**
 * Single-SPA lifecycle entry point for @rootcause/fixes
 * Handles /fixes, /stories, and /architectures.
 */
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

let root = null;

export function bootstrap() {
  return Promise.resolve();
}

export function mount() {
  const container = document.getElementById("rc-fixes");
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
