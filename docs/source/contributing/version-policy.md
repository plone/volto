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


## Plone and Plone REST API

Volto relies on [Plone core (`Products.CMFPlone`)](https://github.com/plone/Products.CMFPlone) and [Plone REST API](https://github.com/plone/plone.restapi).
We will always support the [latest major Plone release](https://plone.org/download/releases) and the version of Plone REST API that ships with it.

Volto should work on old Plone versions as well, since Plone REST API supports Plone back to version 4.3 (including Archetypes).
We do not support or test Plone versions that were released before Volto existed.

```{seealso}
See also [Plone REST API Python and Plone compatability](https://github.com/plone/plone.restapi#python--plone-compatibility).
```


## Node.js

Volto always supports only [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).


## Branch policy

```{include} ./branch-policy.md
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

You should expect no breaking changes in a feature release.
However, the user interface may change.


#### Bugfix

A bugfix release indicates one or more bugs in Volto have been fixed.

```text
4.2.0 -> 4.2.1
```

There should be no breaking changes or changes to the user interface in a bugfix release.
It just fixed a bug.
