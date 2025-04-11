---
myst:
  html_meta:
    "description": "This upgrade guide lists all breaking changes in Seven and explains the steps that are necessary to upgrade to the latest version."
    "property=og:description": "This upgrade guide lists all breaking changes in Seven and explains the steps that are necessary to upgrade to the latest version."
    "property=og:title": "Upgrade Guide"
    "keywords": "Seven, Plone, frontend, React, Upgrade, Guide"
---

(seven-upgrade-guide)=

# Upgrade Guide

This upgrade guide lists all breaking changes in Seven and explains the steps that are necessary to upgrade to the latest version.
Seven uses Semantic Versioning.
For more information see {doc}`../contributing/version-policy`.

````{note}
[Cookieplone](https://github.com/plone/cookieplone) is the official project generator for Plone.
We keep Cookieplone up to date and in sync with the current Volto release.

To make it easier for you to maintain your projects, you should keep all your code inside your project add-ons.
If you do so, when you want to upgrade your project, you can generate a new project using Cookieplone with the same name as your old one, and copy over your add-ons to the new project.
It is usually better and quicker to move your items into new locations and copy your dependencies than dealing with following the upgrade steps, regardless of whether you have modified the boilerplate.

```{seealso}
{ref}`upgrade-18-cookieplone-label`
```
````

(seven-upgrade-guide-1.x.x)=

## Upgrading to Seven
