---
myst:
  html_meta:
    "description": "Developing a project"
    "property=og:description": "Developing a project"
    "property=og:title": "AppExtras component"
    "keywords": "Volto, Plone, frontend, React, app extra component"
---

(frontend-developing-a-project-label)=

# Developing a project

When you start developing a Plone project, it is recommended that you use Plone's cookiecutter boilerplate generator.
See {ref}`install-packages-1-label` for more information.

The generator will output the project folder structure.
It is organized in `frontend`, `backend` and `devops`.
It also contains the convenience `Makefile` commands to perform all the usual actions while developing.

## Add-on first approach

Developing for Plone's frontend means add code to a Volto project.
This frontend files of the project are created under the `frontend` folder.
The generator also creates a default add-on in the `src/addons` folder.
The project is already configured to use this add-on.
Add your code and customizations to this add-on, and Volto will catch them up.
This add-on is configured as a theme add-on, so you are able to customize the look and feel of your site as well.
