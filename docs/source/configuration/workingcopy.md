---
myst:
  html_meta:
    "description": "Enable working copy support in Volto's configuration object"
    "property=og:description": "Enable working copy support in Volto's configuration object"
    "property=og:title": "Working copy support"
    "keywords": "Volto, Plone, frontend, React, working copy, app iterate"
---

# Working copy support

Volto provides support for Plone's Working Copy feature. You need to install the `plone.app.iterate` add-on in your Plone site. You can do that in Plone's Add-ons control panel or using the `GenericSetup` facility.

## Features

Volto working copy support features include:

- "Checkout" any content (except Plone site object) and create a working copy of that content
- Work on the working copy
- "Check in" the working copy by applying the changes into the original (baseline) object
- Cancel the working copy if required

## Volto configuration

```{deprecated} Volto 18.8.0

This setting is no longer used.
```

If you have an older version of volto, you also need to enable working copy support in Volto's configuration object:

```js
import config from '@plone/volto/registry'

config.settings.hasWorkingCopySupport = true;
```
