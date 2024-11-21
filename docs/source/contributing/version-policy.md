---
myst:
  html_meta:
    "description": "Volto release management uses Semantic Versioning to communicate bugfixes, new features, and breaking changes."
    "property=og:description": "Volto release management uses Semantic Versioning to communicate bugfixes, new features, and breaking changes."
    "property=og:title": "Version policy"
    "keywords": "Volto, Plone, frontend, React, Release, Version, Semantic"
---

(volto-versioning-policy)=

# Version policy

This chapter describes the versions of software that Volto supports and how Volto communicates its releases through its branch policy.


(volto-generator-compatibility-with-volto-label)=

## `volto-generator` compatibility with Volto

`volto-generator` is a tool that generates a Volto project.
The following table describes the compatibility between versions of `volto-generator` and Volto.

| Generator version | Volto version |
|-------------------|---------------|
| 9.x               | 18.x.x        |
| 7.x and 8.x       | 17.x.x        |
| 6.x               | 16.x.x        |


(version-policy-plone-python-and-plone-rest-api-compatibility)=

## Plone, Python, and Plone REST API compatibility

Volto is the default UI for Plone 6.
It will work for all released Plone 6 versions.

Volto relies on [Plone core (`Products.CMFPlone`)](https://github.com/plone/Products.CMFPlone) and [Plone REST API](https://github.com/plone/plone.restapi).
We will always support the [latest major Plone release](https://plone.org/download/releases) and the version of Plone REST API that ships with it.

The versions of Python that are supported in Volto depend on the version of Plone that you use.

| Plone | Python       | Volto        |
| ----- | ------------ | ------------ |
| 6.0   | 3.8-3.11     | 16.0 or 17.0 |
| 5.2   | 2.7, 3.6-3.8 | 15.0         |

On Plone 6, we recommend using the known good set (KGS) of package versions that are specified in the Plone release.

On Plone 5, Volto is currently tested with the following packages pinned to specific versions, and we recommend using the same versions, which are:

-   `plone.restapi` 9.2.0
-   `plone.rest` 3.0.1
-   `plone.volto` 4.1.0

For the Plone 5 series, the [latest released version of Plone 5](https://plone.org/download/releases) is recommended.

Volto should work on older Plone versions as well, since Plone REST API supports Plone back to version 4.3 (including Archetypes).

We do not support or test Plone versions that were released before Volto existed.

```{seealso}
See also [Plone REST API Python and Plone compatibility](https://github.com/plone/plone.restapi#python--plone-compatibility).
```


(version-policy-node-js)=

## Node.js

Volto runs using [Node.js](https://nodejs.org/en).
Volto supports only the latest two [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).
We recommend using the current LTS version.

- Node.js 22 LTS: Supported since Volto 18.
- Node.js 20 LTS: Supported since Volto 17.
- Node.js 18: No longer supported. It was supported in Volto 16 - 17.
- Node.js 16: No longer supported. It was supported in Volto 14 - 16.
- Node.js 14: No longer supported. It was supported in Volto 8.8.0 - 16.
- Node.js 12: No longer supported. It was supported in Volto 4 - 15.
- Node.js 10: No longer supported. It was supported in Volto 1 - 12.


(version-policy-supported-browsers)=

## Supported browsers

Volto works well with the current version of any modern browser—including Chrome, Firefox, Safari, and Edge—as well as their mobile flavors.

We do not guarantee that outdated browsers, such as Internet Explorer 11, are supported by Volto.


## Branch policy

```{include} ../_inc/_branch-policy.md
```


(volto-versioning-policy-semantic-versioning-label)=

### Semantic Versioning

Volto uses [Semantic Versioning](https://semver.org/) to communicate bugfixes, new features, and breaking changes in a release.
We use a three-digit dotted version scheme that follows the [Breaking-Feature-Bugfix](
https://medium.com/sapioit/why-having-3-numbers-in-the-version-name-is-bad-92fc1f6bc73c) naming convention.

The following sections show examples of the terms and changes in version numbering used to indicate each type of release.


#### Breaking (or major release)

A breaking or major release indicates a breaking change that might break an application or third-party add-on that relies on Volto.

```text
4.2.0 -> 5.0.0
```

For every breaking release, detailed documentation of the breaking changes is in our {doc}`../upgrade-guide/index`.


#### Feature

A feature release indicates that new features have been added to Volto in a non-breaking fashion.

```text
4.2.0 -> 4.3.0
```

You should expect no breaking changes in a feature release, including new DOM elements.
However, the user interface may change.
If so, the feature must be under a feature flag and disabled by default, such that it is opt-in.


#### Bugfix

A bugfix release indicates one or more bugs in Volto have been fixed.

```text
4.2.0 -> 4.2.1
```

There should be no breaking changes or changes to the user interface in a bugfix release.
It just fixed a bug.
