# AGENTS.md

This file applies only to `packages/types` and its subdirectories.

## What This Package Is

- `@plone/types` provides **hand-curated TypeScript type definitions** for Plone domain objects.
- Files are `.d.ts` declaration files — no implementation code, no bundling step.
- The package is published as-is and can be imported directly from any TypeScript project.

## Type Organization

```
src/
  blocks/      # Block props and block component type definitions
  config/      # Configuration object typings (registry config, etc.)
  content/     # Content item types and REST API serialization shapes
  services/    # Plone REST API service response typings
  i18n.d.ts    # i18n types
  router.d.ts  # Router types
  utils.d.ts   # Shared utility types
  modules.d.ts # Module augmentation declarations
  index.d.ts   # Main entry point
```

## Extending Types in Your Project

Consumers can extend definitions using TypeScript module augmentation:

```ts
declare module '@plone/types' {
  export interface BlocksConfigData {
    myCustomBlock: BlockConfigBase;
  }
}
```

## Editing Rules

- This package contains **only `.d.ts` files**. Do not add `.ts` or `.tsx` implementation files.
- Types are curated by hand — keep them accurate against the Plone REST API response shapes.
- When adding new types, place them in the most appropriate domain folder and export from `src/index.d.ts`.
- Breaking changes to existing types affect all consumers. Prefer additive changes; document removals clearly.

## Validation

```sh
pnpm --filter @plone/types check:ts
```
