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
addon-configuration-pipeline
how-to-install-an-addon-stable
how-to-install-an-addon-prerelease
how-to-install-an-addon-dev-stable
how-to-install-an-addon-dev-prerelease
how-to-load-addon-configuration
how-to-create-an-addon-stable
how-to-create-an-addon-prerelease
how-to-testing-addons
how-to-extend-webpack-addon
how-to-extend-eslint-addon
how-to-troubleshoot-transpilation
i18n
best-practices
theme
public-folder
```

```{include} ./what-is-an-addon.md
```

## Configuring Volto to use a frontend add-on

Volto can be configured to use multiple add-ons.
You have to install the code and then enable the add-on in the configuration.
You can install the code by installing a released add-on package in the setup, or use a development add-on package.
A development add-on package can be either local to the Plone project or as a repo checkout.

### Installing a released add-on

This is the most common use case, you want to install a Volto add-on that has been released as a in npm registry (or alike).
These are the instructions for the stable release.

{doc}`./how-to-install-an-addon-stable`

### Installing a released add-on (development or pre-release)

These are the instructions for the development or pre-release.

{doc}`./how-to-install-an-addon-prerelease`

### Installing an add-on in development mode

It is also usual that you develop an add-on at the same time that you are developing a project.
These are the instructions for the stable release.

{doc}`./how-to-install-an-addon-dev-stable`

### Installing an add-on in development mode (development or pre-release)

{doc}`./how-to-install-an-addon-dev-prerelease`

### Loading add-on configuration

Add-ons can provide configuration:

{doc}`./how-to-load-addon-configuration`

## Creating add-ons

In case you want to create your own add-on, here you can find the instructions:

{doc}`./how-to-create-an-addon-stable`

### Creating add-ons (development or pre-release)

{doc}`./how-to-create-an-addon-prerelease`
