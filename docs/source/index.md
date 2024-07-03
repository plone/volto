---
myst:
  html_meta:
    "description": "Volto is the React-based frontend for the Plone CMS. It is the default UI for the Plone 6 release."
    "property=og:description": "Volto is the React-based frontend for the Plone CMS. It is the default UI for the Plone 6 release."
    "property=og:title": "Frontend"
    "keywords": "Volto, Plone, frontend, React"
---

(volto-index-label)=

# Frontend

TEST

Test again

Volto is a React-based frontend for the [Plone CMS](https://plone.org).
It is the default frontend starting with the Plone 6 release.

Volto provides an attractive proposition: integration with the modern frontend development world, access to the huge ecosystem of React libraries and add-ons, combined with the ability to use the mature Plone CMS backend as a development platform.

Thanks to the use of the Plone REST API, it is fully compatible with Plone's content type framework.
But its power comes from the innovative Pastanaga editor, which provides a flexible WYSIWYG editing interface based on "blocks".

Thanks to their simplicity and easy access to advanced frontend integration, Volto blocks can provide a fast development experience that reduces developer frustration and improves end-user experience.


## Get started

Choose from the following sections to begin your journey with Volto.


### Integrators

An integrator is someone who uses Volto to build a project.

-   {doc}`plone:install/create-project` is a guide to bootstrap a new Volto project and start hacking.
-   {doc}`development/overview` is intended for integrators to assess their knowledge and determine what gaps they would like to fill through available resources.
-   {doc}`tutorials/index` lists several tutorials and references for further research and learning.


### Users

A user of Volto is someone who edits content in a Plone content management system with Volto as the frontend.

-   {doc}`user-manual/index` provides information about how to manage content in a Plone site.


### Contributors

A contributor is someone who writes code or documentation for the Volto core packages.

-   {doc}`plone:contributing/first-time` is for people who have not yet made a contribution to Plone, Volto, or open source software.
-   {doc}`plone:contributing/index` is for people who have not yet signed the Plone Contributor Agreement or contributed to any other project under the GitHub Plone organization, including Volto.
-   {doc}`contributing/index` is for people who want to contribute to Volto.


## Table of Contents

```{toctree}
:maxdepth: 1

development/index
configuration/index
theming/index
blocks/index
addons/index
backend/index
deploying/index
upgrade-guide/index
client/index
user-manual/index
tutorials/index
contributing/index
release-notes/index
release-management-notes/index
```

% Only check change log entries in Volto documentation—not when it is included in the main Plone documentation—to ensure links work and do not redirect.
% It is OK to ignore warnings, such as the following:
% docs/source/news/5280.bugfix: WARNING: document isn't included in any toctree
````{ifconfig} context in ("volto",)
```{toctree}
news*
```
````
