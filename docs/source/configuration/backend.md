---
myst:
  html_meta:
    "description": "Prepare the Plone backend content API for Volto in order to fully support all volto features"
    "property=og:description": "Prepare the Plone backend content API for Volto in order to fully support all volto features"
    "property=og:title": "Backend configuration"
    "keywords": "Volto, Plone, frontend, React, backend configuration"
---

# Backend configuration

## `plone.volto`
In order to fully support all Volto features, the Plone backend content API needs to be prepared for Volto. The add-on `plone.volto` does all the heavy lifting for you and is ready to use in your own projects. We used it in our Getting Started section.

This package is slightly opinionated but provides the correct default settings for when
you want to start with Volto. If you have advanced needs or want to move the setting to
your own integration package instead, just take a look at the features it provides,
copy the ones you need for your project and create your own integration package.

https://github.com/plone/plone.volto

```{tip}
From Volto 5.1 and above, Volto features an internal proxy to your API server. So
you don't have to deal with CORS issues. It's enabled by default, pointing to the server specified in the `devProxyToApiPath` Volto settings
(http://localhost:8080/Plone). See [here](../configuration/internalproxy.md) for more information.
```
