---
myst:
  html_meta:
    "description": "Volto add-ons extend the core functionality of the Plone CMS frontend."
    "property=og:description": "Volto add-ons extend the core functionality of the Plone CMS frontend."
    "property=og:title": "Volto add-ons"
    "keywords": "Volto, add-on, extensions, frontend, Plone"
---

%TODO: This is Explanation
# Volto add-ons

Volto has a built-in extensible and pluggable system.
This system is implemented through the [`@plone/registry`](https://plone-registry.readthedocs.io/) package.
% Question: add-on products or add-on packages?
% Answer: Neither. People use npmjs.com to deploy add-ons as "packages", I'd call them "packages". "add-ons" is also OK. We can explain that an add-on is one kind of package. That also helps educate developers not to modify Volto source code for a project, and drive home the "add-on" and "package" mentality. Also "add-on products" or "add-on packages" is verbose, and "add-on products" is just weird and Plone-y. I'm not sure where "products" came from.
It helps developers extend Volto in a pluggable way through {term}`add-on`s.

%TODO: This matches with https://plone-registry.readthedocs.io/conceptual-guides/add-on-registry.html#what-is-an-add-on. Copy here when that one is ready.
% Why copy here? It is an Explanation. An Index is navigation or orientation only. We need to purge content from this index.md.

```{include} what-is-an-add-on.md
```

## How-To's
```{toctree}
:maxdepth: 1

how-an-add-on-works
add-on-configuration-pipeline
```

## Configuring Volto to use a frontend add-on

Volto can be configured to use multiple add-ons.
You have to install the code and then enable the add-on in the configuration.
You can install the code by installing a released add-on package in the setup, or use a development add-on package.
A development add-on package can be either local to the Plone project or as a repo checkout.

### Installing a released add-on

This is the most common use case, you want to install a Volto add-on that has been released as a in npm registry (or alike).
These are the instructions for the stable release.

{doc}`../development/addons/how-to-install-an-add-on-stable`

### Installing a released add-on (development or pre-release)

These are the instructions for the development or pre-release.

{doc}`../development/addons/how-to-install-an-add-on-prerelease`

### Installing an add-on in development mode

It is also usual that you develop an add-on at the same time that you are developing a project.
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
