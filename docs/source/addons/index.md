---
myst:
  html_meta:
    "description": "Volto add-ons extend the core functionality of the Plone CMS user interface."
    "property=og:description": "Volto add-ons extend the core functionality of the Plone CMS user interface."
    "property=og:title": "Volto add-ons"
    "keywords": "Volto, add-on, extensions, user interface, frontend, Plone"
---

%TODO: Move under Conceptual guides as an explanation. Maybe we should rename this file to `add-on-concepts.md`? Or maybe change the title to "Volto add-on concepts"? Or both?
%This file in its current state is not an index, as it contains too much explanation and even some how-to content. Don't cross the streams! An index should be a landing page with navigation to other pages with minimal explanation.
%Let's focus the purpose of this page to be an index for the add-on explanation only. We'll need to move some chunks elsewhere.
# Volto add-ons

Volto has a built-in extensible and pluggable system to enhance the Plone CMS user interface.
This system is implemented through the [`@plone/registry`](https://plone-registry.readthedocs.io/) package.
% Question: add-on products or add-on packages?
% Answer: Neither. People use npmjs.com to deploy add-ons as "packages", I'd call them "packages". "add-ons" is also OK. We can explain that an add-on is one kind of package. That also helps educate developers not to modify Volto source code for a project, and drive home the "add-on" and "package" mentality. Also "add-on products" or "add-on packages" is verbose, and "add-on products" is just weird and Plone-y. I'm not sure where "products" came from.
It helps developers extend Volto in a pluggable way through {term}`add-on`s.

%TODO: This matches with https://plone-registry.readthedocs.io/conceptual-guides/add-on-registry.html#what-is-an-add-on. Copy here when that one is ready.
%This should be a separate page, not included here. [@stevepiercy]
```{include} what-is-an-add-on.md
```

## How-To's
```{toctree}
:maxdepth: 1

how-an-add-on-works
add-on-configuration-pipeline
```

% All of the following content reads more like an introduction to a how-to guide than explanation. I think it should be moved to the how-to guide.
## Configure Volto add-ons

Volto can be configured to use multiple add-ons.
You have to install the code, then enable the add-on in the configuration.
You can install the code by installing a released add-on package in the setup, or use a development add-on package.
A development add-on package can be either local to the Plone project or as a checkout from a repository.

### Install a released add-on

Most add-ons are installed from a release.
Many Volto add-ons are available from JavaScript package registries, such as [npm Registry](https://www.npmjs.com/).
These are the instructions for the stable release.

{doc}`../development/addons/how-to-install-an-add-on-stable`

### Install a development or pre-release add-on

These are the instructions to install a development or pre-release add-on.

{doc}`../development/addons/how-to-install-an-add-on-prerelease`

### Install an add-on in development mode

You can develop an add-on at the same time you develop a project.
These are the instructions for the stable release.

{doc}`../development/addons/how-to-install-an-add-on-dev-stable`

### Installing an add-on in development mode (development or pre-release)

{doc}`../development/addons/how-to-install-an-add-on-dev-prerelease`

### Loading add-on configuration

Add-ons can provide configuration:

{doc}`../development/addons/how-to-load-add-on-configuration`

## Creating add-ons

In case you want to create your own add-on, here you can find the instructions:

{doc}`../development/addons/how-to-create-an-add-on-stable`

### Creating add-ons (development or pre-release)

{doc}`../development/addons/how-to-create-an-add-on-prerelease`
