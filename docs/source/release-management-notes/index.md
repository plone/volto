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

```{seealso}
Read the [Plone Release Schedule](https://plone.org/download/release-schedule) for details of how Volto's release management works in Plone.
```


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
- Current list of default Blocks included in Volto
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

- CMS user interface fundamental components (`./src/components/manage`)
- CMS user interface control panels
- Libraries used by Volto

```{note}
In general, the CMSUI is not considered public API, because the customization/modification in a project is not usual, and the overall experience is tied to these components.
So we give preference to maintain a good user experience over not backporting changes that could be breaking to the product but could be beneficial for the vast majority of use cases.
For example, if a bug is fixed in the CMSUI and it would be declared as breaking, it would never make it to older versions.
Same for a useful improvement to any CMSUI feature or a new feature, they would never be able to make it to older versions.
```

### Examples

If there is a change in the CMS user interface that implies a change of behavior and/or change of markup that improves the overall user experience, it's not considered a breaking change.
It will be properly expressed and notified in the changelog notes of a minor change.

Any change to a control panel.

If a bug is found in the text block, and the solution involves an upgrade of the Slate library, then it won't be considered a breaking change.
This is true, even if that upgrade implies a breaking change in itself.
