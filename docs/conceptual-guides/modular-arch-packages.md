---
myst:
  html_meta:
    "description": "Plone's frontend modular architecture packages"
    "property=og:description": "Plone's frontend modular architecture packages"
    "property=og:title": "Plone's frontend modular architecture packages"
    "keywords": "Plone, modular architecture, packages, frontend, user interface, conceptual guide"
---

# Plone's frontend modular architecture packages

This document explains how packages are organized, and what role they play in the system, within Plone's frontend modular architecture.

These packages are expected to be used and become part of Plone 7.

These packages are grouped into a few categories to make it easier to understand their purpose.

Core packages (level 1)
:   The foundation pieces everyone builds on.

Utilities packages (level 2)
:   Helpful tools and helpers used by add-on packages.

Add-on packages (level 3)
:   Feature packages that add UI elements and functionality.

Development utility packages
:   Tools to help with building and developing.


## `@plone/types`

`@plone/types` is a special package used during development.
It contains TypeScript type definitions for Plone.
It's considered a core package, and it's the only package that the other core packages can rely on as a `devDependency` in your project configuration.

This package contains `.d.ts` typing definitions, curated by hand.
It doesn't need to be built or bundled.
It's published as-is, so you can import the type info wherever you need it.


## Core packages (level 1)

These are the essential building blocks of the frontend.
They provide the main features and APIs that other packages rely on.
They don't depend on any other `@plone/*` packages except `@plone/types`.

Core packages are published as traditional transpiled bundles.
Their bundles work in both CommonJS and ECMAScript Module (ESM) environments.

The core packages are:
- `@plone/client`
- `@plone/components`
- `@plone/registry`


## Utilities packages (level 2)

These packages provide useful tools and helpers.
They can depend on core packages and other utility packages.
They are also published as traditional bundles that work in CommonJS and ESM environments.

The utility packages are:
- `@plone/providers`
- `@plone/helpers`
- `@plone/react-router`


## Add-on packages (level 3)

Add-ons add extra features or UI elements to your project.
They can depend on any other package.

Unlike core and utility packages, add-ons are distributed as source code, not bundled.
This means they don't need to be transpiled before use.

They provide a default configuration registry loader as their main export.
Also, unlike Volto add-ons, their code is _not_ placed inside a {file}`src` folder.

This setup allows bundlers and TypeScript to resolve them directly without extra steps.
They can be loaded like any other add-on and include an installable default export for configuration.

The add-on packages are:
- `@plone/blocks` - core blocks.
- `@plone/layout` - structural page elements and layout helper components.
- `@plone/theming` - base theming styles, baseline CSS and Tailwind
- `@plone/publicui` - public-facing UI components.
- `@plone/cmsui` - CMSUI components.
- `@plone/plate` - rich text editor integration and plugins.
- `@plone/contents` - browse and manage content.

## Development utility packages

These packages are used today for develop Seven core.

### `@plone/tooling`

It centralizes the configuration and dependencies for tooling around the Plone frontend modular architecture.

It provides shared Storybook, Cypress, ESLint, and other configurations.

They are used in Seven projects and add-ons as well, so they can share the same setup and tooling as Seven core.

### `tsconfig`

The `tsconfig` package provides a base TypeScript configuration for all Plone packages.
It helps ensure consistency in TypeScript settings across the codebase.
Nowadays it's used by all packages in the Seven monorepo, but it's not used in Seven projects or add-ons.
