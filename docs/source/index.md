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

Volto is a React-based frontend for the [Plone CMS](https://plone.org). It is the recommended and default UI for new Plone 6.0 and newer sites. 

The Volto frontend has reached almost parity parity with Plone Classic UI, the html based frontend that has been bundled with Plone since its earliest versions.
The Volto UI provided an attractive proposition to developers and integrators: integration with
a javascript based frontend development world and access to the large ecosystem of React
libraries and addons.
Volto allows experienced React/frontend developers to quickly start working with Plone with their React based knowledge without specialised specialised server rendered template languages and Plone custom frameworks. 

Thanks to the use of the Plone RESTAPI interface, it is fully compatible with Plone's Dexterity content type framework.
Its editor power comes from the innovative Pastanaga Editor, which replaces the typical richtext editing experience provided by for example the TinyMCE editor.
Volto has streamlined blocks based editor where text, image and special function blocks can be mixed and matched effortlessly by editors.

To start developing a new Volto project you should have some React and
modern JavaScript knowledge.
Follow the {doc}`getting-started/install` guide to bootstrap a new Volto project!

The officially announced Plone 6 major/minor releases which include the Classic-UI interface and the content backend with the REST api that is used by Volto, are released independently and loosely coupled. 

* Plone 6.0 that was released in december 20222, is intended to be used with Volto 16.X and later

* Plone 6.1 now planned to be released at the end of 2023, has Volto 17 as the advised frontend. Volto 17.0 was released just before PloneConf 2023.  

With some careful planning and more depth knowledge, you can use different combinations of Volto and the Plone backend, but you might run into some features being limited or not matching.
Earlier versions of Plone (5.X) provide the backend for Volto versions < 16.0. 
If you just start with developing for Plone, we advise you to stick with the recommended bundled versions for the Volto frontend and the Plone backend.  


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
user-manual/index
contributing/index
release-notes/index
```
