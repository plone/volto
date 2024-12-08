# Plone frontend packages

This document describes the packages that come with Volto, the default frontend for Plone 6.

These packages are part of Plone's API-first story.
Most of them are experimental and are marked in their respective `README` files.
Plone 6.1.x (Volto 18) depends on:
- `@plone/registry`
- `@plone/scripts`
- `@plone/volto-slate`

and as a development dependency:
- `@plone/types`

Plone 6.0.x (Volto 17 and below) does not use any of them.

These packages are expected to be used and become part of Plone 7.
Some of them might become part of Plone 6.1.x minor versions.

The packages are divided into three categories or types:

- core
- utilities
- add-ons


## `@plone/types`

Plone types is a special development package.
It contains the Plone typings for TypeScript.
It's considered a core package, and it's the only package that the other core packages can rely on as a `devDependency` in your project configuration.

This package contains `.d.ts` typing definitions, curated by hand.
Due to the nature of this package, it does not need to be built nor bundled.
It is published "as is", so you can import the type definitions from anywhere in your code.


## Core packages

-   `@plone/client`
-   `@plone/components`
-   `@plone/registry`


### Rules

Core packages must not depend on any other `@plone/*` package, with only one exception, `@plone/types`.
They must be published and bundled in a traditional (transpiled) way.
The bundle of these packages must work on both CommonJS and ECMAScript Module (ESM) environments.


## Utilities packages

-   `@plone/providers`
-   `@plone/helpers`
-   `@plone/drivers`
-   `@plone/rsc`


### Rules

Utility packages can depend on core packages and other utility packages.
They must be published in the traditional way, as a bundle.
This bundle must work on both CommonJS and ESM environments.


## Add-on packages

-   `@plone/blocks`
-   `@plone/slots`
-   `@plone/theming`
-   `@plone/contents`


### Rules

Add-on or feature packages, can depend on any other package.
You must distribute them as source code, and not transpile them.
They must provide a default configuration registry loader as the default main entry point export.
Unlike Volto add-ons, do *NOT* place the code in the `src` folder.
If you do not transpile the package, the direct resolution must work out of the box, where both the bundler and TypeScript resolution are direct.
They must be loadable as any other add-on, and contain an add-on registry compatible `install`-able default export.


## Development utility packages

These are packages that are not bundled, and they are used in conjunction with Volto core or Volto projects.
They contain utilities that are useful for the development of a Volto project.
Some of them are released:

- `@plone/scripts`
- `@plone/generator-volto` (deprecated)

Some of them are used by the build, and separated in packages for convenience.

- `tsconfig`


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
