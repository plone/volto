---
myst:
  html_meta:
    "description": "Volto is the React-based frontend for the Plone CMS. It is the default UI for the Plone 6 release."
    "property=og:description": "Volto is the React-based frontend for the Plone CMS. It is the default UI for the Plone 6 release."
    "property=og:title": "Frontend"
    "keywords": "Volto, Plone, frontend, React"
---

(volto-index-label)=

# Frontend

Volto is a React-based frontend for the [Plone CMS](https://plone.org). It will
become the default UI for the upcoming Plone 6 release.

Although it hasn't reached yet full parity with Plone "classic" UI, Volto
provides a very attractive proposition to its early adopters: integration with
the modern frontend development world, access to the huge ecosystem of React
libraries and addons and not least, open Plone as a development platform for
non-Plone trained programmers.

Thanks to the use of the Plone API framework, it is fully compatible with
Plone's Dexterity content type framework (and even the older Archetypes
framework). But its power comes from the innovative Pastanaga Editor,
which replaces the typical richtext editing experience provided by the
TinyMCE editor with a streamlined Mosaic-like editor based on "blocks".

Thanks to their simplicity and easy access to advanced frontend integration,
the Volto blocks can provide a fast development experience that reduces
developer frustration and improves end-user experience.

To start developing a new Volto project you should have minimal React and
modern Javascript knowledge. Follow the
{doc}`getting-started/install` guide to bootstrap a new Volto
project and start hacking!

```{toctree}
:maxdepth: 2

getting-started/index
configuration/index
theming/index
recipes/index
blocks/index
addons/index
backend/index
deploying/index
upgrade-guide/index
developer-guidelines/index
user-manual/index
release-notes/index
```
