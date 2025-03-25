---
myst:
  html_meta:
    "description": "The Seven user interface (UI) is a React-based frontend for Plone."
    "property=og:description": "The Seven user interface (UI) is a React-based frontend for Plone."
    "property=og:title": "Seven"
    "keywords": "Seven, Plone, frontend, user interface, React"
---

(volto-index-label)=

# Seven

The Seven user interface (UI) is a React-based frontend for [Plone](https://plone.org).

Seven is the codename for the successor of Volto.
The codename is _temporary_, the final name of the product has to be decided in the future, by the community when the release happens.
It is being developed [in its own branch](https://github.com/plone/volto/tree/7) along side Volto (in main branch) as it happens during the next months.



## Rationale

Volto turned eight years old in 2025.
The Volto Team architected and implemented Volto using the libraries, frameworks, resources, and best practices that were available at that time.
Since then the React ecosystem has evolved, and so has the way of developing React applications.
React 19 is stable now, settling upon a common paradigm for efficient data fetching in both the server and the client.
Other React frameworks have embraced and leveraged this paradigm, battle testing them in production.

The Volto Team recognized this evolution, and made the decision to adapt the next version of Volto to these modern practices.


## Get started

The following sections guide you to begin your journey with Volto.


### Integrators

An integrator is someone who uses Volto to build a project.

-   {doc}`plone:install/create-project` is a guide to bootstrap a new Volto project and start hacking.
-   {doc}`development/overview` is intended for integrators to assess their knowledge and determine what gaps they would like to fill through available resources.
-   {doc}`tutorials/index` lists several tutorials and references for further research and learning.


### Users

A user of Volto is someone who edits content in a Plone content management system with Volto as the user interface.

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
conceptual-guides/index
```

% Only check change log entries in Volto documentation—not when it is included in the main Plone documentation—to ensure links work and do not redirect.
% It is OK to ignore warnings, such as the following:
% docs/source/news/5280.bugfix: WARNING: document isn't included in any toctree
````{ifconfig} context in ("volto",)
```{toctree}
news*
```
````
