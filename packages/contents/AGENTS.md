# AGENTS.md

This file applies only to `packages/contents` and its subdirectories.

## What This Package Is

- `@plone/contents` provides the folder contents views for Seven.
- It is the Seven-specific evolution of Volto's contents view, split into smaller React Aria Components based pieces.
- Keep the package focused on contents-specific behavior, route wiring, and composition. Do not turn it into a generic component library.

## Architecture

- Prefer granular components and package-local composition over large monolithic views.
- Keep route modules thin. Data loading, mutations, and UI state should stay clearly separated.
- Use React Aria Components patterns consistently. Do not reintroduce legacy Volto/Semantic UI style abstractions here.
- Shadowing matters in this package. Favor small, replaceable components and avoid tightly coupled internal helpers when a public seam is enough.

## Styling Direction

- The current implementation still uses package-local CSS files for several parts of the UI.
- Treat that CSS-based styling as transitional, not the target end state.
- The package should be refactored toward the `@plone/components` Quanta implementation, using Quanta/Tailwind-native components and patterns instead of bespoke CSS where possible.
- Do not add more ad hoc CSS if the same result can be achieved by composing or extending Quanta components.
- If CSS is temporarily necessary, keep it narrowly scoped and easy to delete during the Quanta refactor.

## Routes And Mutations

- Route files live under `routes/` and should stay focused on auth, request parsing, and Plone client calls.
- Keep mutation contracts explicit and small. Prefer passing the minimum payload required for delete, paste, and ordering actions.
- Error handling should remain compatible with React Router error boundaries and toast reporting.

## Components

- Components live under `components/` and should remain granular.
- Prefer package-local components over adding Seven-wide abstractions unless reuse is already proven.
- When touching table cells, actions, or popovers, preserve the shadowing-friendly split between:
  - table/container orchestration
  - per-item rendering
  - action popovers and modals
- Keep accessibility intact when composing RAC primitives.

## Validation

- Prefer targeted checks from this package:
  - `pnpm --filter @plone/contents test --run`
  - `pnpm --filter @plone/contents check-ts`
- Acceptance tests live under `packages/contents/acceptance/tests/`.
- Run contents acceptance tests from the repo root with:
  - `pnpm exec playwright test packages/contents/acceptance/tests --config=playwright.config.ts --project=chromium`
- For a single spec, run:
  - `pnpm exec playwright test packages/contents/acceptance/tests/contents.test.ts --config=playwright.config.ts --project=chromium`
- At the moment, expect validation gaps:
  - the package now has acceptance smoke tests, but still lacks package-local unit/integration tests
  - `check-ts` may surface workspace-wide issues outside this package, so separate package-local regressions from existing repo noise
