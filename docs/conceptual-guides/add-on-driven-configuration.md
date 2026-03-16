---
myst:
  html_meta:
    "description": "Add-on driven configuration"
    "property=og:description": "Add-on driven configuration"
    "property=og:title": "Add-on driven configuration"
    "keywords": "Seven, add-ons, configuration"
---

# Add-on driven configuration

Seven is a frontend framework that can be extended using add-ons.
Add-ons can provide configuration to customize or extend the default configuration of Seven.

See {ref}`what-is-an-addon` for more information about add-ons.

## Default add-on

You need a default add-on that provides the entry-point configuration for your app.
The {term}`cookieplone` generator includes this default add-on when you scaffold a project, whether you create a frontend-only add-on or a full-fledged Plone project including both backend and frontend.
After scaffolding, the default add-on lives in {file}`packages/<add-on-name>` for a frontend add-on, or in {file}`frontend/packages/<add-on-name>` for a Plone project.

See {doc}`cookieplone-frontend-add-on` for more information about the anatomy of a frontend add-on.

## Adding more add-ons

You can add as many add-ons as your app needs, whether they are released third-party packages or ones you create yourself.
You decide how to structure your app and how many add-ons to use.
You can split functionality across multiple add-ons, or create a single add-on that contains all configuration for your app.

See {doc}`../how-to-guides/register-an-add-on` for more information about how to register add-ons in your app.

## Configuration precedence

The configuration provided by add-ons is applied in the order the add-ons are registered.
The last add-on registered takes precedence over the others.
