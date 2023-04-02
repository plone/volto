---
myst:
  html_meta:
    "description": "A guide on how to contribute to Volto, the frontend for Plone."
    "property=og:description": "A guide on how to contribute to Volto, the frontend for Plone."
    "property=og:title": "Contributing to Volto"
    "keywords": "Volto, Plone, frontend, React, guidelines"
---

# Contributing to Volto

First read {doc}`plone:contributing/index`.
Volto follows those guidelines with a few specific variations, as described in this chapter.

If after reading this you become hesitant, don't worry.
You can always create a pull request, mark it as "Draft", and improve the following points later, requesting help from the community.


## Sign and return the Plone Contributor Agreement

See {ref}`Plone Contributor Agreement <contributing-sign-and-return-the-plone-contributor-agreement-label>`.


## Reporting an issue or making a feature request

If you know the issue or feature request is for Volto, first search for an existing item in the [Volto issue tracker](https://github.com/plone/volto/issues).

If an issue does not already exist for your item, then you can [create a new issue or feature request in Volto](https://github.com/plone/volto/issues/new/choose).
When in doubt, create one in the [CMFPlone issue tracker](https://github.com/plone/Products.CMFPlone/issues).

In your report, please specify a few things:

-   What are the steps to reproduce the problem?
-   What do you expect when you follow those steps?
-   What do you observe?
-   Which Plone version are you using?
-   Include relevant screenshots, error messages, and stack traces.


## Branch policy

```{include} ./branch-policy.md
```


## Translations

All text that can be shown in a browser must be translatable.
Please mark all such strings as translatable as defined in the [i18n guide](../recipes/i18n.md).


## Volto change log entry

Volto requires that you include a change log entry or news item with your contribution.
Your attribution must be in the format of `@github_username`.

```{seealso}
For details see {ref}`contributing-change-log-label`.
```


## Documenting your changes

If the feature includes a breaking change, you must include instructions for how to upgrade in the [upgrade guide](../upgrade-guide/index.md).


## Code quality

All pull requests must pass tests, documentation builds, and other code quality checks.
These checks are enforced automatically on every pull request, so you might as well save time and frustration by doing these checks locally first.

Specifically:

-   {doc}`./linting`
-   {doc}`./testing`
-   {doc}`./acceptance-tests`
