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

```{toctree}
:maxdepth: 1

how-an-add-on-works
add-on-configuration-pipeline
how-to-install-an-add-on-stable
how-to-install-an-add-on-prerelease
how-to-install-an-add-on-dev-stable
how-to-install-an-add-on-dev-prerelease
how-to-load-add-on-configuration
how-to-create-an-add-on-stable
how-to-create-an-add-on-prerelease
how-to-test-add-ons
how-to-test-add-ons-prerelease
how-to-extend-webpack-add-on
how-to-extend-eslint-add-on
how-to-troubleshoot-transpilation
i18n
best-practices
theme
public-folder
```

```{include} what-is-an-add-on.md
```

## Configuring Volto to use a frontend add-on

Volto can be configured to use multiple add-ons.
You have to install the code and then enable the add-on in the configuration.
You can install the code by installing a released add-on package in the setup, or use a development add-on package.
A development add-on package can be either local to the Plone project or as a repo checkout.

### Installing a released add-on

This is the most common use case, you want to install a Volto add-on that has been released as a in npm registry (or alike).
These are the instructions for the stable release.

{doc}`how-to-install-an-add-on-stable`

### Installing a released add-on (development or pre-release)

These are the instructions for the development or pre-release.

{doc}`how-to-install-an-add-on-prerelease`

### Installing an add-on in development mode

It is also usual that you develop an add-on at the same time that you are developing a project.
These are the instructions for the stable release.

{doc}`how-to-install-an-add-on-dev-stable`

### Installing an add-on in development mode (development or pre-release)

{doc}`how-to-install-an-add-on-dev-prerelease`

### Loading add-on configuration

Add-ons can provide configuration:

{doc}`how-to-load-add-on-configuration`

## Creating add-ons

In case you want to create your own add-on, here you can find the instructions:

{doc}`how-to-create-an-add-on-stable`

### Creating add-ons (development or pre-release)

{doc}`how-to-create-an-add-on-prerelease`
