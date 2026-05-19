# AGENTS.md

This file applies only to `packages/scripts` and its subdirectories.

## What This Package Is

- `@plone/scripts` contains Node.js tooling used by Volto development, release, i18n, and workspace automation.
- This is not a React package.

## Package Model

- Scripts are executed directly by Node and are consumed from other workspace packages.
- Templates and helper assets under this package are part of developer workflows, so compatibility matters more than clever abstractions.

## Editing Rules

- Prefer JavaScript for scripts and helpers here, even if they are TypeScript-adjacent. The runtime environment is Node, and the code is often executed directly from the command line or as part of npm scripts.
- Keep scripts portable and dependency-aware.
- Do not introduce frontend-only APIs or assumptions about a browser runtime.
- Favor simple direct scripts over deep helper layers unless multiple workflows already share the same behavior.

## Validation

This package has no dedicated test suite.
Validate by running the script or workflow you changed, for example:

```sh
node packages/scripts/<script-name>.js
pnpm --filter @plone/volto i18n
```
