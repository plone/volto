# Plone frontend packages

This document describes the packages that come with Volto, the default frontend for Plone 6.


## `@plone/types`

Plone types is a special development package.
It contains the Plone typings for TypeScript.
It's considered a core package, and it's the only package that the other core packages can rely on as
a `devDependency` in your project configuration.

This package contains `.d.ts` typing definitions, curated by hand.
Due to the nature of this package, it does not need bundling.
It's published "as is", so you can import the type definitions from anywhere in your code.


## Core packages

-   `@plone/registry`
-   `@plone/client`
-   `@plone/components`


### Rules

Core packages must not depend on any other `@plone/*` package, with only one exception, `@plone/types`.
They must be published and bundled in a traditional (transpiled) way.
The bundle of these packages must work on both CommonJS and ECMAScript Module (ESM) environments.

## Feature packages

-   `@plone/contents`


## Utility packages

-   `@plone/blocks`
-   `@plone/helpers`
-   `@plone/drivers`
-   `@plone/rsc`


### Rules

Utility packages can depend on core packages and other utility packages.
They must be published in a traditional way, bundled.
This bundle must work on both CommonJS and ESM environments.


## Development utility packages

These are packages that are not bundled, and they are used in conjunction with Volto core or Volto projects.
They contain utilities that are useful for the development of a Volto project.
Some of them are released:

- `@plone/scripts`
- `@plone/generator-volto`

Some of them are used by the build, and separated in packages for convenience.

- `tsconfig`
- `parcel-optimizer-react-client`


## Volto add-ons packages

These Volto add-ons are packages used by Volto core.
They are always loaded, so they are also called "core packages".
The Volto add-ons are not transpiled or bundled.
They are supposed to be used and built along with a Volto project build.

- `@plone/volto-slate`


## Volto testing add-on packages

These packages are used when testing Volto core.
They contain fixtures that configure features or components that the vanilla Volto core does not have by default.
Once their fixtures are loaded, they can be tested, for example, in acceptance tests.

- `@plone/volto-coresandbox`
