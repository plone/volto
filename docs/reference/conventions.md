---
myst:
  html_meta:
    "description": "Development conventions, rules and best practices"
    "property=og:description": "Development conventions, rules and best practices"
    "property=og:title": "Development conventions, rules and best practices"
    "keywords": "Plone, Seven, frontend, best practices, conventions, rules"
---

# Development conventions, rules and best practices

This document describes the conventions, rules and best practices followed in the Plone 7 frontend codebase.
In general, we will continue using the same models, artifacts and conventions as in Volto, unless there is a good reason to change them.
For example, the blocks model structure won't change, as it is already well established and used in many projects.
Another use case: in Volto we use controlled forms everywhere, and although React Router 7 introduced a new way to handle forms, we will stick to controlled forms for consistency.
Same for our widgets, which will adhere to almost the same interface as in Volto, as controlled forms need controlled widgets.
The configuration system will continue the same, based in `@plone/registry`, while we will continue improving it.
We will stick to the mantra: "if it works, don't change it".
This document contains the differences and additions to the Volto conventions.

## Storybook

Storybook is a tool for developing UI components in isolation for React.
It helps you to develop your component while mocking the different states of your components and interact with them in a sandbox environment.
Seven follows a Storybook-first approach, meaning that all new components should be developed in Storybook first, before being integrated into the application.
It mainly applies to components that are part of the design system (`@plone/components`), but can also be used for other structural components (`@plone/layout`).

See {doc}`/storybook` or Seven [Storybook](https://plone-storybook.readthedocs.io/).

## Routes naming

When defining routes in React Router, please follow these conventions:

- Prepend routes with `@@` (e.g., `/@@edit`).
- Use kebab-case for route names (e.g., `/@@user-profile`).

## Add-on packages do not use a `src` folder

In the past, Volto add-ons used to be normal packages with a `src` folder containing all the code.
Since Volto add-ons were not meant to be compiled, the build resolution process had to adjust and be patched in order to make it work.
In Seven, we decided to not use a `src` folder anymore, and all the code is directly in the root of the package.
This allows the build process to work out of the box without any patching following the ecosystem conventions, otherwise we would have to patch the resolution process for every build or bundler tool used.

## `@plone/components` package

This package will continue to be the design system of Plone 7, containing all the reusable UI components such as buttons, forms, modals, etc.
When adding new components, please ensure they are generic and reusable across different parts of the application.
The components should be well-documented and include Storybook stories to showcase their usage and different states.

This package contains two sets of components:
- Tailwind-based components, which can be used directly in the application and are styled using Tailwind CSS classes.
- Headless components, which provide the functionality without any styling, allowing developers to style them as they see fit.

It includes also a "baseline" CSS for the headless components in case that you want to start from a common ground.
These styles are very basic ("vanilla") and can be easily overridden by your own styles.
They can be used today in Volto projects as well, by installing the `@plone/components` package.

The Tailwind-based components are meant to be used in public themes based also on Tailwind CSS, such as the default Seven theme (`@plone/agave`).
They are the ones used in the CMS UI interface as well, which is also based on Tailwind CSS.

The package has a Storybook setup published in [@plone/components Storybook](https://plone-components.readthedocs.io/).

## `@plone/layout` package

This package contains the structural components of the Plone 7 frontend, such as the `Header`, `Footer`, and `ContentArea`.
These components are responsible for the overall layout and structure of the application.
When adding new structural components, please ensure they are added as slots to allow for easy customization.

The package has a Storybook setup published in [@plone/layout Storybook](https://plone-layout.readthedocs.io/).

This package has to support all kind of theming system, so please avoid using any CSS framework specific classes (e.g., Tailwind CSS, Bootstrap, etc.) in the components.
Thus, all the components inside should be Tailwind-free.

## All structural components are slots

Slots are a powerful feature in Plone 7 that allow you to define areas in your layout where components can be dynamically inserted.
In Seven all structural components (e.g., `Header`, `Footer`, `Sidebar`) are slots.
This way, you can easily customize the layout by adding or removing components from these slots without modifying the core layout code.
Slots are defined in the `@plone/layout` package.
