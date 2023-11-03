---
myst:
  html_meta:
    "description": "Release Process Information"
    "property=og:description": "Volto Release Notes for the Plone content management system"
    "property=og:title": "Volto Release Notes"
    "keywords": "Volto, Plone, frontend, Release Notes, change log, changelog, change history"
---

# Release Management Notes

## Definition of Breaking

A breaking change refers to a modification, enhancement, or update made to the Volto's codebase that has the potential to disrupt or "break" the existing Volto-based projects functionality, tests or customizations.

Breaking changes typically require users or contributors to update their code base, configurations, or customizations of their Volto projects to accommodate the new changes, as they may no longer be compatible with the updated Volto version.

It is essential for maintainers to communicate and document breaking changes clearly to help users and collaborators understand the impact and take appropriate actions to adapt to the new version of the project.This is why the Volto's {ref}`volto-upgrade-guide` exists.

We define a "Public API" and a "Private API" to classify types of changes in Volto.

## Public API

The public API is composed of the following Volto components:

- Public Components (./src/components/theme)
- CMSUI fundamental components (./src/components/manage)
- Current list of default Blocks included in Volto
- CMSUI control panels ?
- Volto helpers (./src/helpers)

These are the changes that are considered "breaking" in Volto Public API.

### DOM structure and default styling

Any change done to the DOM structure of any Volto component that renders HTML is considered a breaking change.
This is because Volto projects rely on the DOM of the stable version they are using for styling and look and feel customizations.

The removal of any property or tag is also considered a breaking change.
This specially includes `className` props that would cause existing CSS to fail.

The addition of DOM is also considered a breaking change since it would potentially result in deliver unstyled or not customized in a Volto project.

```{note}
Exceptions: It is not considered a breaking change when the change to the DOM is the addition or introduction of a property. eg. the addition of a class name to a component or tag.
```

## Private API

The private API is everything that is considered "internal" to Volto and it is intended only to be used by Volto itself.

The following Volto components are considered Private API:

- Libraries used by Volto

### Example

If a bug is found in the text block and the solution involves to upgrade the Slate library, it won't be considered a breaking change.
Even if that upgrade implies a breaking change on itself.
