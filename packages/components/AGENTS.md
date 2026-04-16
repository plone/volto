# AGENTS.md

This file applies only to `packages/components` and its subdirectories.

## What This Package Is

- `@plone/components` is a thin wrapper layer around `react-aria-components`.
- Components should be usable out of the box in Seven and in Volto.
- Keep components presentational and lightweight. Avoid adding app-specific behavior, data logic, or i18n machinery here.

## Component Model

- Prefer staying very close to the underlying React Aria Components API.
- Do not reinvent component behavior that RAC already provides.
- Add Plone value mainly through packaging, small ergonomic wrappers, and styling.
- Some components, such as `Breadcrumbs`, are intentionally adapted for Seven/Volto and REST API use cases. In those cases, the wrapper props and helpers may shape data for that environment, but the underlying RAC behavior should remain intact.
- Even adapted components should still behave like thin proxies: keep forwarding supported props through to the underlying RAC component so upstream RAC documentation and expectations continue to apply.

## Two Flavours

- Components may exist in two flavours:
  - basic: CSS-styled components
  - Quanta styles for a few CSS-styled components in `src/styles/quanta/`: CSS assets for Quanta-styled output
  - Quanta components: the Tailwind-styled React components, named with the `.quanta.tsx` suffix
- Both flavours live under the same component folder in `src/components/<ComponentName>/`.
- Basic components are exported from `src/index.ts`.
- Tailwind Quanta components are exported from `src/quanta/index.ts` and are the real Quanta component implementation.
- Keep tree-shaking in mind when adding exports or shared helpers.

## Styles

- Built CSS lives under `src/styles`.
- Basic component styles live in `src/styles/basic/`, usually one CSS file per component, and are bundled from `src/styles/basic/main.css`.
- `src/styles/quanta/` contains CSS-based Quanta style definitions and is bundled from `src/styles/quanta/main.css`.
- Do not confuse `src/styles/quanta/` with the Tailwind Quanta component implementation. The Tailwind components are the `.quanta.tsx` files in `src/components`.
- Other `src/styles` folders are for shared assets such as static files and fonts.
- When adding or renaming a styled component, make sure the corresponding style entry is wired into the appropriate `main.css`.

## Stories

- Every public component should have a Storybook story.
- Keep stories colocated with the component in the same folder.
- If both basic and Quanta variants are public, prefer stories for both.

## Icons

- Raw SVG icons live in `src/icons`.
- Ready-to-use React icon components live in `src/components/icons`.
- When adding an SVG icon, also add its React component counterpart and export it from the relevant index when needed.
- Keep SVG and React component names aligned.

## Editing Rules

- Keep changes minimal and package-local.
- Prefer extending existing component folders and patterns over introducing new abstractions.
- If adding a new public component, check all relevant pieces:
  - component file
  - optional `.quanta.tsx` variant
  - stories
  - styles
  - exports
  - tests when behavior is non-trivial

## Validation

- Prefer targeted checks from this package:
  - `pnpm --filter @plone/components test --run`
  - `pnpm --filter @plone/components lint`
  - `pnpm --filter @plone/components build`
- Run `pnpm --filter @plone/components eslint:fix` after editing component code. This package uses formatting/lint tooling that reorders Tailwind utilities, so apply it before finishing changes.
