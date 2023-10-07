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

## Report an issue or make a feature request

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

(contributing-install-volto-for-development-label)=

## Install Volto for development

To make changes to Volto, you need to run it from a copy of the [`plone/volto` GitHub repository](https://github.com/plone/volto/).

### Prerequisites

You need all the requirements already mentioned in {doc}`plone:install-packages-prerequisites-label`.

### Clone the Volto repository

```shell
git clone https://github.com/plone/volto.git
```

### Start the Plone backend

While developing Volto, you need to have the Plone backend running.
If you don't already have the backend installed, the easiest way is to run the following command inside the Volto repository:

```shell
make start-backend-docker
```

### Install Node.js dependencies

```shell
yarn
```

### Start Volto

```
yarn start
```

### Open Volto in your browser

Browse to [http://localhost:3000](http://localhost:3000).


(contributing-translations-label)=

## Translations

All text that can be shown in a browser must be translatable.
Please mark all such strings as translatable as defined in the [i18n guide](../recipes/i18n.md).

### Branch policy for translations

Due to the nature of `main` and `16.x.x` branches, some developments that may land in `main` may not be backported to `16.x.x`. This means that many translations that may come with those developments will be useless in the `16.x.x` branch and thus porting them to `16.x.x` makes no sense.

When contributing translations, please create pull requests directly from branches created from `16.x.x`, and point your pull requests to that exact branch instead of `main`.


(contributing-change-log-entry-label)=

## Change log entry

Volto requires that you include a change log entry or news item with your contribution.
Your attribution must be in the format of `@github_username`.

```{seealso}
For details see {ref}`contributing-change-log-label`.
```


(contributing-documenting-your-changes-label)=

## Document your changes

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
