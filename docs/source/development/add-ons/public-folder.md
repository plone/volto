---
myst:
  html_meta:
    "description": "How to add static served files from your add-on to your build"
    "property=og:description": "How to add static served files to the build from an add-on"
    "property=og:title": "Add static files from your add-on to your build"
    "keywords": "Volto, Plone, Semantic UI, CSS, Volto theme, add-on, static, assets, files, build"
---

# How to add static files from your add-on to your build

In the Volto build process, you can add static files to your build, then serve them along with the compiled files.
Static files are not transformed or compiled by the build process.
They are served as is from the root of the Volto site.
It is useful to define static files such as the following:

-   {file}`robots.txt`
-   favicon files
-   manifest files
-   any other static files


## Procedure to include static files

Create a folder named `public` at the root of your add-on, and add the static files to it.
The build process will copy the files, taking into account all add-ons' defined order.
The build process copies first the static files defined by Volto, then the static files from add-ons as defined by their configuration order.
The last defined file overwrites any previously defined files.

