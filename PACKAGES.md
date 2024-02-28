# Plone frontend packages

## Core packages

- `@plone/registry`
- `@plone/client`
- `@plone/components`

### Rules

They can't depend on any other `@plone/*` package, with only one exception: `@plone/types`.
They must be published in a traditional way, bundled.
This bundle must work on both commonjs and ESM environments.

## Special development packages

- `@plone/types`

### Rules

This package contains `.d.ts` typing definitions, curated by hand.
Due to the nature of this package, it does not need bundling.
It's publised "as it is", so you can import the type definitions from anywhere in your code.

## Utility packages

- `@plone/blocks`
- `@plone/helpers`
- `@plone/drivers`
- `@plone/rsc`

They can depend on core packages and other utility packages.
They must be published in a traditional way, bundled.
This bundle must work on both commonjs and ESM environments.
