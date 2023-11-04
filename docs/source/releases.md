---
myst:
  html_meta:
    "description": "Volto release management uses Semantic Versioning to communicate bugfixes, new features, and breaking changes."
    "property=og:description": "Volto release management uses Semantic Versioning to communicate bugfixes, new features, and breaking changes."
    "property=og:title": "Versioning policy"
    "keywords": "Volto, Plone, frontend, React, Release, Version, Semantic"
---

```{eval-rst}
:orphan:
```

(volto-versioning-policy)=

# Versioning policy

What you can expect from Volto releases and the Volto release management. Volto uses
Semantic Versioning to communicate bugfixes, new features, and breaking changes. It
supports Plone 5.2.x on Python 3, Plone 6, and LTS versions of Node.js.

## Semantic Versioning

Volto uses [Semantic Versioning](https://semver.org/) to communicate what users and developers can expect from a release.

We use a three-digits version scheme (e.g. `4.2.0`) following the [Breaking-Feature-Bugfix](
https://medium.com/sapioit/why-having-3-numbers-in-the-version-name-is-bad-92fc1f6bc73c) naming convention.

### Breaking (or Major release)

A `breaking` release indicates a `breaking change` that might break an application or third-party add-on that relies on Volto, e.g.

````
4.2.0 -> 5.0.0
````

For every `breaking` release, a detailed documentation of what in a breaking change release can be found in our {doc}`./upgrade-guide/index`.

We sometimes might want to indicate a major

### Feature

A `feature` release indicates that a new feature has been added to Volto in a non-breaking fashion, e.g.:

````
4.2.0 -> 4.3.0
````

You do not have to expect any breaking changes from such a release. Though, it can happen that the user interface changed due to a new feature that has been added.

### Bugfix

A `bugfix` release indicates one or more bugs in Volto have been fixed, e.g.:

````
4.2.0 -> 4.2.1
````

You do not have to expect any breaking changes or UX/UI changes from such a release. It just fixed a bug.


## Plone / Plone REST API

Volto relies on Plone (core) and [Plone REST API](https://pypi.org/project/plone.restapi/). We will always support the latest major Plone Release (currently Plone 5.2) that ships with Plone REST API.

Volto should work on old Plone versions as well since Plone REST API supports Plone back to version 4.3 (including Archetypes). Though, we do not actively support versions or test Plone versions that have been released long before Volto existed.

## Node.js

Volto always supports only LTS versions of [Node.js ](https://github.com/nodejs/release#release-schedule).
