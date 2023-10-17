---
myst:
  html_meta:
    "description": "Developing a Volto project"
    "property=og:description": "Developing a Volto project"
    "property=og:title": "AppExtras component"
    "keywords": "Volto, Plone, frontend, React, app extra component"
---

(frontend-developing-a-project-label)=

# Developing a project

When you start developing a Plone project, it is recommended that you use Plone's cookiecutter boilerplate generator.
See {doc}`plone:install/install-from-packages` for more information.

The generator will output the project folder structure.
It is organized in three folders named `frontend`, `backend`, and `devops`, each of which corresponds to its primary use.
It also contains the convenience `Makefile` commands to perform all the usual actions while developing.

## Add-on first approach

Developing for Plone's frontend means to add code to a Volto project.
The frontend files of the project are created in the `frontend` folder.
The generator also creates a default add-on in the `frontend/src/addons` folder.
The project is already configured to use this add-on.
Add your code and customizations to this add-on, and Volto will load them on start up or a restart.
This add-on is configured as a theme add-on, so you are able to customize the look and feel of your site as well.

```{seealso}
For more information about how to develop a Volto project as an add-on, see {doc}`training:voltoaddons/index`.
```
