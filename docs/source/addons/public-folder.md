---
myst:
  html_meta:
    "description": "Add-on public folder"
    "property=og:description": "How to add static served files to the build from an add-on"
    "property=og:title": "Define static served files"
    "keywords": "Volto, Plone, Semantic UI, CSS, Volto theme"
---

# Add-on `public` folder

In the Volto build, some static files are added to the build, and then served along with the build files.
These files are not touched, nor transformed by the build, served as-it-is in the root of the Volto site.
It is useful to define files like:

- robots.txt
- favicon files
- manifest files

and other files alike.

## Define a `public` folder in an add-on

Create a `public` folder in you add-on if it's not created yet, and add there the files you want to end up to the `public` folder build.
The build will copy over the files taking into account the add-ons defined order, being the first one the default static files defined by Volto, then following the add-on order, will copy the files, so the last one defined will win.

