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

The Seven user interface (UI) is a fast, elegant, and intuitive React-based frontend for [Plone](https://plone.org).

Seven is the codename for the successor of Volto.
The codename is _temporary_; the final name of the product will be chosen when the release happens.
It is under active development [in its own branch `seven`](https://github.com/plone/volto/tree/seven) in parallel with both Volto 19 in the branch `main` and the current stable version Volto 18 in the branch `18.x.x`.



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

An integrator is someone who uses Seven to build a project.

-   {doc}`get-started/create-package` is a guide to bootstrap a new Seven project and start hacking.


### Users

A user of Volto is someone who edits content in a Plone content management system with Volto as the user interface.

-   {doc}`training:content-editing/index` provides information about how to manage content in a Plone site.


### Contributors

A contributor is someone who writes code or documentation for the Volto core packages.

-   {doc}`plone:contributing/first-time` is for people who have not yet made a contribution to Plone, Volto, or open source software.
-   {doc}`plone:contributing/index` is for people who have not yet signed the Plone Contributor Agreement or contributed to any other project under the GitHub Plone organization, including Volto.
-   {doc}`contributing/index` is for people who want to contribute to Seven.


## Table of contents

```{toctree}
:maxdepth: 1

get-started/index
development/index
configuration/index
conceptual-guides/index
how-to-guides/index
reference/index
reference/storybook
upgrade-guide/index
contributing/index
release-management-notes/index
release-notes/index
```

% Only check change log entries in Volto documentation—not when it is included in the main Plone documentation—to ensure links work and do not redirect.
% It is OK to ignore warnings, such as the following:
% docs/source/news/5280.bugfix: WARNING: document isn't included in any toctree
````{ifconfig} context in ("volto",)
```{toctree}
news*
```
````
