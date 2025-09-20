---
myst:
  html_meta:
    "description": "Development conventions, rules and best practices"
    "property=og:description": "Development conventions, rules and best practices"
    "property=og:title": "Development conventions, rules and best practices"
    "keywords": "Plone, Seven, frontend, best practices, conventions, rules"
---

# Development conventions, rules and best practices

This document explains the conventions, rules, and best practices we follow in the Plone 7 frontend codebase.
We generally stick to the same models, artifacts, and conventions as in Volto, unless there's a good reason to change.
For example, the blocks model structure stays the same since it's well established and widely used.
Another example: in Volto, we use controlled forms everywhere.
Even though React Router 7 introduced a new way to handle forms, we stick to controlled forms for consistency.
Our widgets also follow almost the same interface as in Volto because controlled forms need controlled widgets.
The configuration system remains based on `@plone/registry`, and we keep improving it.
We follow the mantra: "if it works, don't change it."
This document highlights the differences and additions compared to Volto conventions.

## Storybook

Storybook is a tool for building UI components in isolation with React.
It helps you develop components by mocking their different states and interacting with them in a sandbox.
Seven follows a Storybook-first approach, so new components should be developed in Storybook first before adding them to the app.
This mainly applies to design system components (`@plone/components`), but you can also use it for other structural components (`@plone/layout`).

You can see the Storybook for this package at [Seven Storybook](https://plone-storybook.readthedocs.io/).

## Routes naming

When defining routes in React Router, follow these rules:

- Start routes with `@@` (like `/@@edit`).
- Use kebab-case for route names (like `/@@user-profile`).

## Add-on packages do not use a `src` folder

In the past, Volto add-ons had a `src` folder with all the code.
Since Volto add-ons weren't meant to be compiled, the build process had to be patched to make it work.
In Seven, we decided to drop the `src` folder and put all code directly in the package root.
This makes the build process work out of the box without any patching, following ecosystem conventions.
Otherwise, we'd have to patch the resolution process for every build or bundler tool.

## `@plone/components` package

This package is the design system for Plone 7.
It contains reusable UI components like buttons, forms, modals, and more.
When adding new components, make sure they are generic and reusable across the app.
Also, document them well and include Storybook stories to show how to use them and their different states.

There are two sets of components here:
- Tailwind-based components, which you can use directly and are styled with Tailwind CSS classes.
- Headless components, which provide functionality without styling, so you can style them however you want.

We also include a basic "baseline" CSS for the headless components to give you a common starting point.
These styles are very simple ("vanilla") and easy to override with your own styles.
You can also use these in Volto projects by installing the `@plone/components` package.

The Tailwind-based components are meant for public themes that also use Tailwind CSS, like the default Seven theme (`@plone/agave`).
They're also used in the CMS UI, which is based on Tailwind CSS.

Check out the Storybook for this package at [@plone/components Storybook](https://plone-components.readthedocs.io/).

## `@plone/layout` package

This package holds the structural components of the Plone 7 frontend, like the `Header`, `Footer`, and `ContentArea`.
These components handle the overall layout and structure of the app.
When adding new structural components, add them as slots so they can be easily customized.

You can see the Storybook for this package at [@plone/layout Storybook](https://plone-layout.readthedocs.io/).

This package needs to support all kinds of theming systems, so avoid using CSS framework-specific classes (like Tailwind CSS or Bootstrap) in these components.
That means all components here should be free of Tailwind or any other CSS framework.

## All structural components are slots

Slots let you define areas in your layout where components can be dynamically added.
In Seven, all structural components (like `Header`, `Footer`, `Sidebar`) are slots.
This makes it easy to customize the layout by adding or removing components without changing the core layout code.
Slots are defined in the `@plone/layout` package.
