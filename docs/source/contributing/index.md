---
myst:
  html_meta:
    "description": "How to contribute to Volto, the frontend for Plone."
    "property=og:description": "How to contribute to Volto, the frontend for Plone."
    "property=og:title": "How to contribute to Volto, the frontend for Plone."
    "keywords": "Plone, Volto, contributing, developer, guidelines"
---

(contributing-to-volto-label)=

# Contributing to Volto

First read {doc}`plone:contributing/index`.
Volto follows those guidelines with a few specific variations, as described in this chapter.


(contributing-reporting-an-issue-or-making-a-feature-request-label)=

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


(contributing-volto-sign-and-return-the-plone-contributor-agreement-label)=

## Sign and return the Plone Contributor Agreement

The Volto Team reviews pull requests only from people with a GitHub account who have signed and returned the {ref}`Plone Contributor Agreement <plone:contributing-sign-and-return-the-plone-contributor-agreement-label>`, and subsequently been assigned to a Plone Team in GitHub.


(contributing-branch-policy-label)=

## Branch policy

```{include} ./branch-policy.md
```


(contributing-translations-label)=

## Translations

All text that can be shown in a browser must be translatable.
Please mark all such strings as translatable as defined in the [i18n guide](../recipes/i18n.md).


(contributing-change-log-entry-label)=

## Change log entry

Volto requires that you include a change log entry or news item with your contribution.
Your attribution must be in the format of `@github_username`.

```{seealso}
For details see {ref}`contributing-change-log-label`.
```


(contributing-documenting-your-changes-label)=

## Documenting your changes

If the feature includes a breaking change, you must include instructions for how to upgrade in the [upgrade guide](../upgrade-guide/index.md).


(contributing-code-quality-label)=

## Code quality

All pull requests must pass tests, documentation builds, and other code quality checks.
These checks are enforced automatically on every pull request, so you might as well save time and frustration by doing these checks locally first.

Specifically:

-   {doc}`./linting`
-   {doc}`./testing`
-   {doc}`./acceptance-tests`


(contributing-developer-guidelines-label)=

## Developer guidelines

Development and configuration of Volto is managed through your {ref}`choice of Plone installation method <install-index-choose-installation-method-label>`.
You may choose to install Plone via {ref}`containers <install-containers-label>` or from its {ref}`packages <install-packages-1-label>`.

```{todo}
When referring to installation and configuration of Plone's backend, this part of the Volto documentation may have obsolete content.
The most current information for installing and configuring Plone is in {ref}`install-index-label`.
Please report any issues in the [Volto issue tracker](https://github.com/plone/volto/issues/).
```

```{toctree}
:maxdepth: 1

design-principles
style-guide
language-features
linting
react
redux
routing
icons
testing
acceptance-tests
accessibility-guidelines
typescript
volto-core-addons
```


(contributing-final-advice-label)=

## Final advice

If you become hesitant after reading the foregoing, don't worry.
You can always create a pull request, mark it as "Draft", and improve these points later while requesting help from the community.
