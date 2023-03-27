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

## Sign and send us the Plone Contributors Agreement

You must sign the [Plone Contributor Agreement](https://plone.org/foundation/contributors-agreement) to contribute code and documentation to any Plone project.
This means that we can NOT accept pull requests from you from any location until you do this.


## First Time Contributors: work from a fork

When we have received and it has been process by a communty member, you will be added to the Plone organisation and added to the Contributors Team on GitHub. 
You can create issues, add comments to existing issues, and discuss the development of Plone with others.
Creating branches and editing code on our main repositories is restricted and granted to members who have been active in the Plone community for a while and have shown continued interest to contributing.

- First, verify that your issue is valid by creating it and discussing it with other developers.
- Then, create a fork of the repo in your own workspace, work on your code and make commits. 
- When you want to run our code quality checks, create a Pull Request from your repo/branch to the main repository.
- As a security measure, the first run of code Quality checks need to be [approved by a member in our Developers Team](https://docs.github.com/en/actions/managing-workflow-runs/approving-workflow-runs-from-public-forks)
- A Developer with full access to the workflow will need to review and approve your Pull request.

Please be aware that as long as you are working from a fork, you are the only developer being able to commit to your branch.
Collaboration between developers on bigger pull requests is only efficient when these are done on branch on the main repo. 
Therefore: as your first time contribution don't choose a too big problem to solve.



## Documenting your changes 

All pull requests must include a `towncrier` news item.
This is a file that is placed in the root of the repository directory at `/news`.
Its format must be `###.type`, where `###` is the referenced GitHub issue or pull request number, `.` is the literal extension delimiter, and `type` is one of the following strings.

- `breaking` for breaking changes
- `bugfix` for bug fixes
- `documentation` for documentation
- `feature` for new features
- `internal` for internal changes

If the feature includes a breaking change, you must include instructions for how to upgrade in the [upgrade guide](../upgrade-guide/index.md).

All text that can be shown in a browser must be translatable. Please mark all such
strings as translatable as defined in the [i18n guide](../recipes/i18n.md).


## Code Quality

All pull requests must pass tests, documentation builds, and other code quality checks.
Developers are strongly encouraged to run these checks locally before creating a pull request.
Contributors without full Developer access will need to create a Pull request first and get approval for their first PR from a Developer.
These checks are enforced automatically on every pull request, so you might as well save time and frustration by doing these checks locally first.

Specifically:

-   {doc}`./linting`
-   {doc}`./testing`
-   {doc}`./acceptance-tests`


If after reading this you become hesitant, don't worry.
You can always create a pull request, mark it as "Draft", and improve the above points later, requesting help from the community.

Welcome to the Plone community, and thank you for contributing!
