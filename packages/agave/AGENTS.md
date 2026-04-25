# AGENTS.md

This file applies only to `packages/agave` and its subdirectories.

## What This Package Is

- `@plone/agave` is the **example base theme for Seven** (Plone 7).
- It is a CSS-only theme that consumes design tokens and primitives from `@plone/theming`.
- It is intended as a starting point that end users will most likely **remove and replace** with their own custom theme.
- TypeScript or React code may be added in the future if needed, but this is not planned — keep it CSS-first.

## Package Model

- CSS lives under `styles/`.
- Import from `@plone/theming` for foundational tokens (colors, typography, spacing). Do not redefine what `@plone/theming` already provides.
- Keep styles scoped and avoid leaking global resets or overrides that other packages would not expect.
- Do not add app-specific logic (routing, data fetching, state management) here.

## Editing Rules

- Keep changes minimal and theme-local.
- When restyling an element, check if `@plone/theming` already provides a token or utility for it before adding new CSS variables.
- If TypeScript or React code ever becomes necessary, discuss it explicitly before adding it — the CSS-only constraint is intentional.
- This package has Storybook configured. If you add visual changes, verify them in Storybook.

## Validation

This package has no dedicated test or lint script.
Use Storybook to verify visual output:

```sh
pnpm --filter @plone/agave storybook
```

For repo-wide CSS linting:

```sh
pnpm stylelint
```
