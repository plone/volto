---
myst:
  html_meta:
    "description": "Volto container description and developer notes"
    "property=og:description": "Volto container description and developer notes"
    "property=og:title": "Volto container"
    "keywords": "Volto, React, blocks, container, Plone"
---

(container-label)=

# Container

```{versionadded} Volto 17.0.0-alpha.10
```

A container in Volto is a core component that contains blocks.
A container consists of an Edit component that allows users to add, edit, or delete specific blocks inside the container.


## Building blocks using a container

When building a custom block that uses a container as its base, you must pass your block's properties into the container.


## Container properties

The container has particular properties.
Currently only one property is supported, although others may be added in future releases.

`Direction`
:   The arrangement of blocks in the container, either `horizontal` or `vertical`.
    The default value is `horizontal`.
