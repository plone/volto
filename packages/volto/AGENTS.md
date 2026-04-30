# AGENTS.md

This file applies only to `packages/volto` and its subdirectories.

## What This Package Is

- `@plone/volto` is the main Plone 6 frontend application package.
- It is a React application built with Volto's Razzle-based toolchain.
- This package is still mostly JavaScript, with selective TypeScript support.

## Architecture Notes

- The app is driven by configuration registry patterns, add-on extensibility, Redux state, and block-based editing.
- `src/components/` contains most UI and editor code.
- `src/config/` and registry-related wiring define app composition and extensibility points.
- `theme/` contains Less and Semantic UI customization.
- `cypress/` contains acceptance coverage and fixtures.

## Editing Rules

- Prefer TypeScript for all new modules and features, even though this package still contains substantial JavaScript.
- Refactoring touched code toward TypeScript is welcome, but not required.
- Respect add-on extensibility. Prefer configuration and composition points over hardcoded behavior when touching core features.
- Keep block changes aligned with existing editor/view separation and serialization expectations.
- Do not treat this package like a standalone Vite library; its build, theming, and test workflows are app-specific.
- When editing runtime code that depends on `@plone/registry`, `@plone/components`, or `@plone/volto-slate`, validate the integration instead of only linting local files.
- Be careful with imports from sibling packages. If a dependency is a workspace package, prefer its public API over deep internal paths.

## Validation

Choose the narrowest useful set:

```sh
pnpm --filter @plone/volto test --run
pnpm --filter @plone/volto test:ci
pnpm --filter @plone/volto lint
pnpm --filter @plone/volto check:ts
pnpm --filter @plone/volto build
pnpm --filter @plone/volto storybook
make ci-acceptance-test-run-all
```

## Additional Guidance

- For style changes, use the package's lint and stylelint commands.
- For i18n changes, validate with `pnpm --filter @plone/volto i18n:ci`.
- For docs-related work inside this package, also consider the Sphinx docs under the repo root.
