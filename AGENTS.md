# AGENTS.md

This file applies to the entire monorepo root and all of its packages.
Each package also has its own `AGENTS.md` with more specific guidance — always prefer the package-level file when working inside a specific package.

## Repository Overview

This is a **pnpm monorepo** (`pnpm-workspace.yaml`) containing:

- `apps/seven` — the main Seven (Plone 7) application
- `packages/*` — shared libraries that make up the Seven stack and tooling

The package manager is **pnpm**. Do not use `npm` or `yarn`.

## Two Stacks in This Repo

### Seven (Plone 7) — the active stack

Every package except `volto` and `volto-slate` belongs to the **Seven** stack, an API-first, React-based frontend for Plone 7.
Seven is composed of focused packages that are assembled into `apps/seven`:

| Layer                      | Packages                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------- |
| App shell                  | `apps/seven`                                                                        |
| Public UI (visitor-facing) | `@plone/publicui`, `@plone/layout`, `@plone/blocks`                                 |
| CMS UI (editor-facing)     | `@plone/cmsui`, `@plone/contents`, `@plone/plate`, `@plone/blocks`, `@plone/layout` |
| Shared infrastructure      | `@plone/client`, `@plone/registry`, `@plone/react-router`                           |
| Utilities and types        | `@plone/helpers`, `@plone/types`                                                    |
| Theming                    | `@plone/theming`, `@plone/agave`, `@plone/components`                               |
| Tooling                    | `@plone/tooling`, `@plone/scripts`, `tsconfig`                                      |

### Volto (Plone 6) — reference only

`packages/volto` and `packages/volto-slate` are the stable Plone 6 frontend.
They are present **for reference only** during Seven development and will be deleted once they are no longer useful.
Do not make significant changes to these packages.

## Working in a Package

Always scope your commands to the package you are working in using pnpm's `--filter` flag:

```sh
pnpm --filter @plone/<package> test --run
pnpm --filter @plone/<package> build
pnpm --filter @plone/<package> check-ts
```

Each package has its own `AGENTS.md` describing its purpose, architecture, and the exact validation commands to run.

## Global Commands

Run these from the repo root when working across multiple packages or on the full app:

```sh
# Install dependencies
pnpm install

# Build all publishable packages (registry, client, components, react-router, helpers)
pnpm build:deps

# Lint the entire repo
pnpm lint

# Run all package tests
pnpm test:ci

# Format all TypeScript/JavaScript files
pnpm prettier:fix

# Lint and auto-fix CSS
pnpm stylelint:fix

# Run Playwright acceptance tests
pnpm acceptance-test

# Check typings
pnpm check-ts
```

## General Conventions

- **TypeScript** is the default for all new code. Avoid adding plain `.js` files to Seven packages.
- **Vitest** is the test runner across all Seven packages (not Jest).
- **Vite** is the bundler for application code; **tsup** is used for library packages.
- Keep changes **package-local** unless there is a clear cross-cutting reason.
- When adding a new package dependency, check whether it already exists in a sibling package or the workspace root before adding it.
- Do not commit secrets, credentials, or environment-specific values.

## Editing Rules

- Read the package-level `AGENTS.md` before touching code in any package.
- Prefer targeted, package-scoped validation over global runs when iterating.
- Do not modify `volto` or `volto-slate` unless explicitly instructed — they are reference code.
