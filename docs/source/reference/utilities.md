---
myst:
  html_meta:
    "description": "How to type Volto utilities via UtilityTypeMap"
    "property=og:description": "How to type Volto utilities via UtilityTypeMap"
    "property=og:title": "Typing utilities"
    "keywords": "Volto, Plone, utilities, typing, TypeScript"
---

# Typing utilities

`registerUtility`, `getUtility`, and `getUtilities` now bind their method signatures to the utility `type`. You can declare the expected method shape for a given type using the `UtilityTypeMap` interface from `@plone/types`.

## Declare utility method types

Extend `UtilityTypeMap` via module augmentation (for example in `src/types/volto.d.ts`):

```ts
// src/types/volto.d.ts
declare module '@plone/types' {
  interface UtilityTypeMap {
    rootContentSubRequest: (options: { path: string }) => Promise<unknown>;
    // Add more utility types here
  }
}
```

## Typed registry usage

Once declared, utilities of that `type` are strongly typed:

```ts
import config from '@plone/registry';

config.registerUtility({
  name: 'rootContent',
  type: 'rootContentSubRequest',
  method: async ({ path }) => fetch(path).then((res) => res.json()),
});

const { method } = config.getUtility({
  name: 'rootContent',
  type: 'rootContentSubRequest',
});

// method is (options: { path: string }) => Promise<unknown>
method({ path: '/news' });
```

`getUtilities({ type: 'rootContentSubRequest' })` returns an array whose `.method` matches the declared signature.

## Fallback for unknown types

Utility types you do not declare in `UtilityTypeMap` stay permissive and accept `(...args: any[]) => any`, preserving backward compatibility.
