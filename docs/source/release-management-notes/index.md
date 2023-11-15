---
myst:
  html_meta:
    "description": "Release management notes for Volto"
    "property=og:description": "Release management notes for Volto"
    "property=og:title": "Volto release management notes"
    "keywords": "Volto, Plone, frontend, Release Notes, change log, changelog, change history"
---

# Release management notes

This chapter describes how maintainers manage the releases of Volto.

## Definition of breaking

A breaking change refers to a modification, enhancement, or update made to Volto's code base that has the potential to disrupt or "break" an existing Volto-based project's functionality, tests, or customizations.

Breaking changes typically require users or contributors to update their code base, configurations, or customizations of their Volto projects to accommodate the new changes, as they may no longer be compatible with the updated Volto version.

It is essential for maintainers to communicate and document breaking changes clearly to help users and collaborators understand the impact and take appropriate actions to adapt to the new version of the project.
This is why the Volto's {ref}`volto-upgrade-guide` exists.

We define a {ref}`release-management-public-api` and a {ref}`release-management-private-api` to classify the types of changes in Volto.


(release-management-public-api)=

## Public API

The public API is composed of the following Volto components:

- Public Components (`./src/components/theme`)
- CMS user interface fundamental components (`./src/components/manage`)
- Current list of default Blocks included in Volto
- CMS user interface control panels
- Volto helpers (`./src/helpers`)

The following section describes the changes that are considered "breaking" in the Volto Public API.


### DOM structure and default styling

Any change to the DOM structure of any Volto component that renders HTML is considered a breaking change.
This is because Volto projects rely on the DOM of the stable version for styling and look and feel customizations.

The removal of any property or tag is also considered a breaking change.
This especially includes `className` props that would cause existing CSS to fail.

The addition of DOM elements is also considered a breaking change, because it could result in delivering unstyled or uncustomized content in a Volto project.

```{note}
Exceptions: it is not considered a breaking change when the change to the DOM is the addition or introduction of a property, such as the addition of a class name to a component or tag.
```


(release-management-private-api)=

## Private API

The private API is everything that is considered "internal" to Volto and it is intended only to be used by Volto itself.

The following Volto components are considered Private API:

- Libraries used by Volto

### Example

If a bug is found in the text block, and the solution involves an upgrade of the Slate library, then it won't be considered a breaking change.
This is true, even if that upgrade implies a breaking change in itself.
