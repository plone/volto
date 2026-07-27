# AGENTS.md

This file applies only to `packages/components` and its subdirectories.

## What This Package Is

- `@plone/components` provides reusable React components for Plone projects.
- It is intentionally presentational and should remain usable outside the main Volto app.
- Components are built on top of `react-aria-components` and ship both component code and CSS bundles.

## Component Model

- Stay close to the underlying React Aria Components API where possible.
- Keep data fetching, Redux wiring, and app-specific behavior out of this package.
- Public components usually require coordinated updates across component code, exports, styles, and stories.
- Quanta variants live alongside the base component implementation and should not drift into a separate architecture.

## Styles And Assets

- Basic styles live under `src/styles/basic/`.
- Quanta styles live under `src/styles/quanta/`.
- When adding or renaming a public component, check component exports, CSS bundle entry points, and any icon/story files that must move with it.

## Editing Rules

- TypeScript is mandatory for all new modules and features.
- Prefer extending existing component folders and conventions over adding new abstractions.
- Keep wrappers thin. If React Aria already handles a behavior, do not duplicate it here.
- When changing public API or exported component names, verify package exports explicitly.

## Validation

```sh
pnpm --filter @plone/components test --run
pnpm --filter @plone/components lint
pnpm --filter @plone/components build
pnpm --filter @plone/components check:ts
```
