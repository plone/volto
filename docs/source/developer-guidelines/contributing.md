---
myst:
  html_meta:
    "description": "A guide on how to contribute to Volto, the frontend for Plone."
    "property=og:description": "A guide on how to contribute to Volto, the frontend for Plone."
    "property=og:title": "Contributing to Volto"
    "keywords": "Volto, Plone, frontend, React, guidelines"
---

# Contributing to Volto

You may have an issue to report, make a feature request, report a security vulnerability, or you want to create a pull request.
You have come to the right place to learn how to do so.


## Reporting an issue or making a feature request

If you know the issue or feature request is for Volto, first search for an existing item in the [Volto issue tracker](https://github.com/plone/volto/issues).

If an issue does not already exist for your item, then you can [create a new issue or feature request in Volto](https://github.com/plone/volto/issues/new/choose).
When in doubt, create one in the [CMFPlone issue tracker](https://github.com/plone/Products.CMFPlone/issues).

In your report, please specify a few things:

- What are the steps to reproduce the problem?
- What do you expect when you follow those steps?
- What do you observe?
- Which Plone version are you using?
- Include relevant screenshots, error messages, and stack traces.

## Branch policy

```{include} ./branch-policy.md
```

## Create a pull request

You must sign the [Plone Contributor Agreement](https://plone.org/foundation/contributors-agreement) to contribute code and documentation to any Plone project.
This means that we can NOT accept pull requests from you until you do this.

All pull requests must include a note under the `(unreleased)` version under the appropriate subheading of [CHANGELOG.md](https://github.com/plone/volto/blob/master/CHANGELOG.md).
Do not edit already released versions.

If the feature includes a breaking change, you must include instructions for how to upgrade in the [upgrade guide](../upgrade-guide/index.md).

All text that can be shown in a browser must be translatable. Please mark all such
strings as translatable as defined in the [i18n guide](../recipes/i18n.md).


## Code Quality

All pull requests must pass tests, documentation builds, and other code quality checks.
Contributors are strongly encouraged to run these checks locally before creating a pull request.
These checks are enforced automatically on every pull request, so you might as well save time and frustration by doing these checks locally first.

Specifically:

-   {doc}`./linting`
-   {doc}`./testing`
-   {doc}`./acceptance-tests`


If after reading this you become hesitant, don't worry.
You can always create a pull request, mark it as "Draft", and improve the above points later, requesting help from the community.

Welcome to the Plone community, and thank you for contributing!
