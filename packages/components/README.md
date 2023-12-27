# @plone/components

[![NPM](https://img.shields.io/npm/v/@plone/components.svg)](https://www.npmjs.com/package/@plone/components)
[![Build Status](https://github.com/plone/components/actions/workflows/code.yml/badge.svg)](https://github.com/plone/components/actions)
[![Build Status](https://github.com/plone/components/actions/workflows/unit.yml/badge.svg)](https://github.com/plone/components/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ff1f19ce-9b19-48f9-94a8-d533b53d4a9a/deploy-status)](https://app.netlify.com/sites/plone-components/deploys)

This package contains ReactJS components for use Plone as a headless CMS.

The purpose of this package is to provide a third party design system free and agnostic set of baseline components to build upon.

## Components list

### Fundamentals

- Container
- Input
- Icon

### Structural

- Breadcrumbs

## Demo / Storybook

https://plone-components.netlify.app/

## Development

This package follows a style guide (Storybook) driven development. The components are developed in isolation, given their own Storybook stories.

The components are expected to be data-driven-less. So they won't rely internally in any data retrieval facility or utilities.
They receive the necessary data as props. In that regard, they should be "dumb" components that only take care of rendering. This should be specially true for the most basic components.

### Headless UI component library

This package has the form of a headless UI component library. A headless UI component library provide "white label" components that you later can style with your own styles. It is not tied to any heavy specific styling nor any CSS framework. The vanilla CSS provided allow you to "drop-in" your own CSS framework, build and existing styling into the components.

This post explains extensively its benefits:

https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268

### `react-aria-components`

`@plone/components` is based on Adobe's [`react-aria-components` library](https://react-spectrum.adobe.com/react-aria/react-aria-components.html). React Aria Components is a library of unstyled components built on top of the React Aria hooks. It provides a simpler way to build accessible components with custom styles, while offering the flexibility to drop down to hooks for even more customizability where needed.

## Releases

The release policy for this package follows a quick 1.0.0 release, as opposed to have a excessive long lasted alpha/beta road to 1.0.0. This is because the development of this package is expected to happen during the next years.

Breaking changes will be stated properly using semantic versioning, however an upgrade guide won't be supplied until the package is considered "ready for production". The team will communicate this state properly when the moment comes.

## PLIP #4352

This package is the result of the execution of the [Plone Improvement Proposal #4352](https://github.com/plone/volto/issues/4352).
