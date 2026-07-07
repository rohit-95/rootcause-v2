import { registerApplication, start } from "single-spa";

/*
  This is the brain of the microfrontend setup.
  Each registerApplication() call tells Single-SPA:
    1. NAME    — the app's unique identifier
    2. APP     — how to load the bundle (dynamic import via import map)
    3. ACTIVE  — a function that returns true when this app should be shown
                 (based on window.location.pathname)
*/

// ── ACTIVE (built and running) ────────────────────────────────────────

registerApplication({
  name: "@rootcause/articles",
  app: () => import(/* webpackIgnore: true */ "@rootcause/articles"),
  activeWhen: (location) => location.pathname.startsWith("/articles"),
});

registerApplication({
  name: "@rootcause/home",
  app: () => import(/* webpackIgnore: true */ "@rootcause/home"),
  // Home also owns the static /about and /roadmap pages — no separate MFE needed for those.
  activeWhen: (location) =>
    location.pathname === "/" ||
    location.pathname === "/about" ||
    location.pathname === "/roadmap",
});

registerApplication({
  name: "@rootcause/fixes",
  app: () => import(/* webpackIgnore: true */ "@rootcause/fixes"),
  activeWhen: (location) =>
    location.pathname.startsWith("/fixes") ||
    location.pathname.startsWith("/stories") ||
    location.pathname.startsWith("/architectures"),
});

// ── TODO: uncomment each one as you build and run it ─────────────────

// registerApplication({
//   name: "@rootcause/interview",
//   app: () => import(/* webpackIgnore: true */ "@rootcause/interview"),
//   activeWhen: (location) => location.pathname.startsWith("/interview-prep"),
// });

// registerApplication({
//   name: "@rootcause/payment",
//   app: () => import(/* webpackIgnore: true */ "@rootcause/payment"),
//   activeWhen: (location) =>
//     location.pathname.startsWith("/checkout") ||
//     location.pathname.startsWith("/download"),
// });

// Boot Single-SPA — must be called after all registerApplication() calls
start({
  urlRerouteOnly: true, // Only re-route if URL actually changes (better performance)
});
