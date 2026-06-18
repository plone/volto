---
myst:
  html_meta:
    "description": "How Seven add-on scaffolds derive a deployment app from the checked out Seven sources."
    "property=og:description": "How Seven add-on scaffolds derive a deployment app from the checked out Seven sources."
    "property=og:title": "Seven Add-on Deployment App"
    "keywords": "Seven, add-on, deployment, React Router, workspace, SaaS, Vercel"
---

# Seven add-on deployment app

Seven add-on scaffolds optimize for development first.
They check out the current Seven sources in {file}`core/`, add the local add-on through {file}`registry.config.ts`, and run Seven directly from that workspace.

That development story is good for hacking on Seven and the add-on at the same time, but it is not the best deployment surface for SaaS platforms such as Vercel.
The scaffold root is a development orchestrator, not a standard React Router 7 application.

## The problem

The development workspace relies on a few assumptions that are natural locally, but fragile in SaaS builds.

- Seven lives in {file}`core/apps/seven`, not at the deploy root.
- Root scripts proxy into Seven through workspace filters.
- Dependencies use {file}`workspace:*` and {file}`catalog:` entries that are convenient in the monorepo, but not suitable as-is for a deploy-only install.
- The deploy platform needs an actual RR7 application root with its own {file}`app/`, {file}`react-router.config.ts`, {file}`vite.config.ts`, and ordinary dependencies.

## The transitional solution

The scaffold now provides a generated deployment app under {file}`.deploy/`.

The {file}`.deploy/` directory is a normal RR7 application derived from {file}`core/apps/seven` and the current add-on scaffold state.
It keeps the local development workflow unchanged, while creating a deploy-oriented application root that can be built independently from the checked-out Seven workspace layout.

The generation step performs the following work.

- Copies the Seven RR7 application from {file}`core/apps/seven` into {file}`.deploy/`.
- Copies the local {file}`registry.config.ts` so add-on registration stays the same.
- Copies the local add-on package into {file}`.deploy/packages/seven-add-on`.
- Rewrites {file}`workspace:*` and {file}`catalog:` dependency specifiers to exact versions using the checked-out Seven snapshot and {file}`core/catalog.json`.
- Writes a simplified deploy-facing {file}`package.json` and {file}`tsconfig.json`.
- Installs {file}`.deploy/` as an isolated project, not as part of the parent pnpm workspace.
- Loads the generated Vite add-on extender only when {file}`.plone/vite.loader.js` exists, and otherwise falls back to the base Seven Vite configuration.

This gives SaaS builds a project root that looks like a normal React Router application, while preserving the existing development workflow that runs against the checked-out Seven sources.

## Modes

The scaffold now has two explicit modes.

### Development mode

Development mode continues to use the checked-out Seven workspace directly.

- `make install` or `make install-dev`
- `make start` or `make start-dev`
- `make build` or `make build-dev`

These commands keep the existing local workflow unchanged.

### Deploy mode

Deploy mode generates and builds the deployment app.

- `make install-deploy`
- `make start-deploy`
- `make start-prod-deploy`
- `make build-deploy`

These commands operate on {file}`.deploy/`.

- `start-deploy` runs the generated deployment app in development mode.
- `start-prod-deploy` runs the generated deployment app in production mode with `react-router-serve`.

The deploy helper scripts cache a source hash in {file}`.deploy/.deploy-state.json`.
If the Seven app, the add-on package, or the scaffold inputs did not change, the generator, install, and build steps are skipped automatically.

Use `make clean-deploy` when you want to remove the generated deployment app and force a full regeneration on the next deploy-mode command.

## CI and SaaS contract

The recommended automated verification path is:

- `make install-deploy`
- `make build-deploy`
- optionally `timeout 20s make start-prod-deploy` as a smoke test

The scaffold now includes a GitHub Actions workflow at {file}`.github/workflows/deploy-workspace.yml` that performs exactly that verification for deploy-related changes.

For Vercel, the intended contract is:

- Root Directory: repository root
- Install Command: `make install-deploy`
- Build Command: `make build-deploy`
- Production start for local parity: `make start-prod-deploy`

In production-like environments, set at least:

- `COOKIE_SECRET`
- `PLONE_API_PATH`, when the backend is not exposed at the default path expected by the app

This keeps the platform-facing behavior aligned with the local deploy-mode workflow instead of the development workspace orchestration path.

## Current package-level assumptions exposed by deploy mode

The generated deployment app currently compensates for several assumptions that are available implicitly in the Seven workspace, but are not yet encoded in the respective packages.

These are the main ones discovered so far.

- `@plone/components` exports `./vite-plugin-svgr` in its package metadata, but the installed package did not contain {file}`vite-plugin-svgr.js` in the generated deploy install.
  The deploy generator currently vendors that file into {file}`.deploy/`.
- Seven's app-level deploy dependencies are incomplete for isolated installs.
  The generated deploy manifest currently adds:
  `vite-plugin-svgr`, `@svgr/plugin-svgo`, `@svgr/plugin-jsx`, and `tailwindcss-react-aria-components`.
- Several `@plone/*` packages import from `seven/...` and expect the host application package to identify itself as `seven`.
  The generated deploy package now uses the `seven` package name to preserve that contract.
- Several `@plone/*` packages import files such as `seven/app/root`, `seven/app/middleware.server`, `seven/registry.config`, and `seven/.plone/publicui.css`.
  The generated deploy package now exposes those paths explicitly and aliases `seven` to the deploy root.
- The scaffold's add-on {file}`registry.config.ts` extends `seven/registry.config`.
  In an isolated deploy app, that becomes a self-import unless the base Seven registry config is copied separately.
  The generated deployment app now keeps a {file}`registry.base.config.ts` file and rewrites the scaffold registry wrapper to import that file instead.

These workarounds are intentionally documented here so they can be moved over time into the packages that really own them.

## Why this exists

This generated deployment app is a transitional construct.

It preserves the current "run the checked-out Seven sources" development model, but it starts converging on the desired long-term shape: a true RR7 host application that can be deployed without teaching SaaS platforms about the internal development workspace layout.

In other words:

- development mode stays source-first
- deploy mode becomes application-first

This separation makes the deployment contract explicit and testable.

## Current scope

The current implementation intentionally focuses on the generated deployment app.
It does not yet replace the development root with a thin RR7 host shell.

That larger refactor can build on the same ideas later:

- a clear development mode
- a clear deploy mode
- exact deploy-safe dependency resolution
- a deploy root that resembles a normal RR7 application
