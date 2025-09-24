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

Level 1 and 2 packages are published as traditional bundles that work in both CommonJS and ESM environments.
They are meant to be consumed as libraries, so your app bundler can include them without any extra build step.
The distinction between levels 1 and 2 preserves the dependency graph, keeping core packages independent of the rest.

Level 3 packages ship as source code, which means they do not need to be transpiled before use.

Level 1 and 2 packages must not depend on level 3 packages.

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

`@plone/client`
:   JavaScript API client for Plone backend.

`@plone/components`
:   Unified React components for Plone.

`@plone/registry`
:   Configuration registry.


## Utilities packages (level 2)

These packages provide useful tools and helpers.
They can depend on core packages and other utility packages.
They are also published as traditional bundles that work in CommonJS and ESM environments.

The utility packages are:

`@plone/providers`
:   Data flow providers.

`@plone/helpers`
:   Utility functions and helpers.

`@plone/react-router`
:   React Router 7 integration.


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

`@plone/blocks`
:   Core blocks.

`@plone/layout`
:   Structural page elements and layout helper components.

`@plone/theming`
:   Base theming styles, baseline CSS, and Tailwind.

`@plone/publicui`
:   Public-facing UI components.

`@plone/cmsui`
:   CMSUI components.

`@plone/plate`
:   Rich text editor integration and plugins.

`@plone/contents`
:   Browse and manage content.

## Development utility packages

These packages are used today to develop Seven core.

### `@plone/tooling`

`@plone/tooling` centralizes the configuration and dependencies for tooling around the Plone frontend modular architecture.

It provides shared Storybook, Cypress, ESLint, and other configurations.

They are used in Seven projects and add-ons as well, so they can share the same setup and tooling as Seven core.

### `tsconfig`

The `tsconfig` package provides a base TypeScript configuration for all Plone packages.
It helps ensure consistency in TypeScript settings across the codebase.
Nowadays, it's used by all packages in the Seven monorepo, but it's not used in Seven projects or add-ons.
