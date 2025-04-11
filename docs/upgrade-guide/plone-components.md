---
myst:
  html_meta:
    "description": "This upgrade guide lists all breaking changes in @plone/components and explains the steps that are necessary to upgrade to the latest version."
    "property=og:description": "This upgrade guide lists all breaking changes in @plone/components and explains the steps that are necessary to upgrade to the latest version."
    "property=og:title": "@plone/components Upgrade Guide"
    "keywords": "@plone/components, Plone, components, frontend, React, Upgrade, Guide"
---

(plone-components-upgrade-guide)=

# `@plone/components` Upgrade Guide

This is the upgrade guide for `@plone/components`. It lists all breaking changes in the package and explains the steps that are necessary to upgrade to the latest version.

## 4.0.0

### Refactored `Icon` component

The `Icon` component has been refactored to match the Tailwind naming conventions for icon sizes.
It still uses the `size` prop, but the possible values have changed.

The following sizes have been removed:
- `XXS`
- `XS`
- `S`
- `M`
- `L`
- `XL`
- `XXL`

The following sizes have been added:
- `2xs`
- `xs`
- `sm`
- `base`
- `lg`
- `xl`
- `2xl`
- `3xl`

The size is determined now by the calculation of using the CSS custom property `--quanta-icon-size` which is mapped to the `--spacing` CSS custom property by default.
By default in Tailwind, `--spacing` is set to `0.25rem` (4px), so the icon sizes are calculated as follows:
- `2xs`: `0.75rem` (12px)
- `xs`: `1rem` (16px)
- `sm`: `1.25rem` (20px)
- `base`: `1.5rem` (24px)
- `lg`: `1.75rem` (28px)
- `xl`: `2rem` (32px)
- `2xl`: `2.25rem` (36px)
- `3xl`: `2.5rem` (40px)

The default value is `base`, which is `24px`. The size can be changed by setting the `--quanta-icon-size` CSS custom property to a different value.
