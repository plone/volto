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

Volto is a React-based frontend for the [Plone CMS](https://plone.org).
It is the default frontend starting with the Plone 6 release.

Volto provides an attractive proposition: integration with the modern frontend development world, access to the huge ecosystem of React libraries and addons, combined with the ability to use the mature Plone CMS backend as a development platform.

Thanks to the use of the Plone REST API, it is fully compatible with Plone's content type framework. But its power comes from the innovative Pastanaga editor, which provides a flexible WYSIWYG editing interfaces based on "blocks".

Thanks to their simplicity and easy access to advanced frontend integration, Volto blocks can provide a fast development experience that reduces developer frustration and improves end-user experience.

To start developing a new Volto project you should have minimal React and modern JavaScript knowledge. Follow the {doc}`plone:install/install-from-packages` guide to bootstrap a new Volto project and start hacking!

```{toctree}
:maxdepth: 2

getting-started/index
configuration/index
theming/index
recipes/index
blocks/index
addons/index
client/index
backend/index
deploying/index
upgrade-guide/index
user-manual/index
contributing/index
release-notes/index
```

% Only check change log entries in Volto documentation—not when it is included in the main Plone documentation—to ensure links work and do not redirect.
% It is OK to ignore warnings, such as the following:
% docs/source/news/5280.bugfix: WARNING: document isn't included in any toctree
````{ifconfig} context in ("volto",)
```{toctree}
news*
```
````
