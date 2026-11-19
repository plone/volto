# AGENTS.md

This file applies to the entire monorepo root and all subdirectories unless a deeper `AGENTS.md` overrides it.
When working inside a package, always check for a package-level `AGENTS.md` first.

## Repository Overview

This repository is the Volto core monorepo for Plone 6.
It uses `pnpm` workspaces. Do not introduce `npm` or top-level `yarn` workflows.

Main areas:

- `packages/volto` - the main Volto application package
- `packages/volto-slate` - the Slate editor integration used by Volto
- `packages/components`, `packages/registry`, `packages/types` - reusable libraries
- `packages/scripts` - Node.js tooling and release helpers
- `packages/volto-razzle*`, `packages/volto-babel-preset-razzle` - Volto's Razzle toolchain forks
- `packages/coresandbox` - development-only core sandbox add-on
- `docs/` - Sphinx-based documentation

## Monorepo Rules

- Use `pnpm --filter <package>` for package-scoped work.
- Keep changes package-local unless a cross-package change is required by design.
- Before adding a dependency, check whether the same dependency already exists in the workspace root or a sibling package.

## Default Validation Commands

Run from the repo root unless a package-level file says otherwise:

```sh
pnpm install
pnpm lint
pnpm test:ci
pnpm prettier:fix
pnpm stylelint:fix
pnpm build
make docs-html
make acceptance-test
```

Prefer narrower validation while iterating:

```sh
pnpm --filter @plone/<package> <script>
```

## Volto-Specific Conventions

- TypeScript is recommended for all new modules and features across the repository.
- Refactoring existing code toward TypeScript during related changes is welcome, but it is not required.
- Volto is still a mixed codebase: the app packages are not TypeScript-only, and `packages/volto` remains heavily JavaScript-based.
- `packages/volto` uses Razzle, Less, Semantic UI, Storybook, and Cypress. Do not rewrite workflows there as if it were a Vite library package.
- The reusable libraries (`components`, `registry`) are progressively modernized and have stricter TypeScript-oriented validation.
- For editor work, treat `packages/volto` and `packages/volto-slate` as one functional area; changes in one often require tests or fixtures in the other.
- For docs or contributor guidance changes, validate with the docs targets in `Makefile` instead of package scripts.

## Editing Rules

- Read the nearest `AGENTS.md` before editing files.
- Prefer package-level build, lint, and test commands over full-repo runs.
- Do not change release automation or versioning scripts casually; many packages publish independently.
- Do not commit generated artifacts unless the existing workflow in that area expects them.
