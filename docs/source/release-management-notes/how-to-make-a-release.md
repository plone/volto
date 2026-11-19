---
myst:
  html_meta:
    "description": "How to make a Volto release"
    "property=og:description": "How to make a Volto release"
    "property=og:title": "How to make a Volto release"
    "keywords": "Volto, Plone, frontend, release, release-it, towncrier, prereleaser, npm, GitHub"
---

(how-to-make-a-release)=

# How to make a Volto release

This page describes how maintainers release Volto, `@plone/volto`, and the other packages in the Volto repository.

The release process uses the following tools.

-   [`release-it`](https://www.npmjs.com/package/release-it) bumps the version, commits, tags, pushes, creates the GitHub release, and publishes the package to npm.
-   [`towncrier`](https://towncrier.readthedocs.io/en/stable/) builds the change log of each package from its news fragments.
-   The `prereleaser` convenience script lists the packages that have pending changes, and releases them in the correct order.


## Requirements

To make a release, you must fulfill the following requirements.

-   Have permission to push to the `main` branch of the [`plone/volto`](https://github.com/plone/volto) repository.
-   Have permission to publish in the [`@plone` organization on npm](https://www.npmjs.com/org/plone), and be logged in to npm.
-   Have the [GitHub CLI](https://cli.github.com/) (`gh`) installed and logged in with an account that can create releases in the [Volto releases page](https://github.com/plone/volto/releases).
-   Have [`uv`](https://docs.astral.sh/uv/) installed.

To request these permissions, on GitHub tag `@plone/release-team`, or in Discord post to the [`release-team` channel](https://discord.com/channels/786421998426521600/897549410521714760).


### Permission to push to the `main` branch

The release process commits the version bump and the change log, tags the release, and pushes directly to the `main` branch.
The `main` branch is protected, so you need permission to push to it.


### Permission to publish to the npm registry

The packages are published to the npm registry under the `@plone` organization.
Only the current owners of the organization can grant you permission to publish.

Log in to npm before releasing.

```shell
npm login
```

If your npm account uses two-factor authentication, npm asks for a one-time password when publishing each package.


### Log in with the GitHub CLI

`release-it` creates a GitHub release for each package release, and it needs a GitHub token to do so.
The `release` scripts of each package take this token from the GitHub CLI.
They run `release-it` as follows.

```shell
GITHUB_TOKEN=${GITHUB_TOKEN:-$(gh auth token)} release-it
```

Install the GitHub CLI, then log in once.

```shell
gh auth login
```

You can check your login with the following command.

```shell
gh auth status
```

You don't need to create a GitHub personal access token or export `GITHUB_TOKEN` in your shell.
If the variable `GITHUB_TOKEN` is set, the release scripts use it instead of the GitHub CLI token.

```{warning}
Don't export `GITHUB_TOKEN` in your shell profile.
The GitHub CLI and other tools that rely on it, such as AI assistant integrations, give priority to `GITHUB_TOKEN` over your `gh auth login` credentials.
If `gh auth status` shows `(GITHUB_TOKEN)` instead of `(keyring)`, find and remove the line that exports it in your shell startup files.
```


### Install `uv`

The release process calls `towncrier` through `uvx`, the command that comes with `uv`.
`uvx` runs Python applications without installing them in your system first, similar to `npx` for Node.js.

Install `uv` with the following command, or with any of the other methods described in the [`uv` installation documentation](https://docs.astral.sh/uv/getting-started/installation/).

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Make sure `uvx` is on your `$PATH`.

```shell
uvx --version
```


## Before you start

Make sure your local `main` branch is up to date, and install the dependencies from the root of the repository.

```shell
git switch main
git pull
pnpm install
```


## Release with the `prereleaser` script

The `prereleaser` script is the recommended way to make a release.
Run it from the root of the repository.

It looks for the news fragments of each package, in other words, the changes that haven't been released yet.
It then prints a release plan with the packages that need a release, in the order in which they must be released.


### Check the release plan

To see the release plan without releasing anything, run the following command.

```shell
pnpm prereleaser
```

The following is sample output.

```console
Release plan
============

Core packages (level 1)
 1. @plone/registry (packages/registry) - 1 news fragment

Add-on packages (level 3)
 2. @plone/volto-slate (packages/volto-slate) - 2 news fragments

Application
 3. @plone/volto (packages/volto) - 5 news fragments
```

The packages are released in dependency order, so each package is released after the packages it depends on.

1.  `@plone/types`
2.  Core packages: `@plone/components` and `@plone/registry`
3.  Utilities packages: `@plone/babel-preset-razzle`, `@plone/scripts`, `@plone/razzle-dev-utils`, and `@plone/razzle`
4.  Add-on packages: `@plone/volto-slate`
5.  The application: `@plone/volto`

This order is defined in `RELEASE_GROUPS` in {file}`packages/scripts/preleaser.js`.
If you add a new releasable package, add it to the right group in that list.


### Run the releases

To release the packages in the plan, run the following command.

```shell
pnpm prereleaser --release
```

The script asks you for each package in the plan, one at a time.

```console
Release @plone/registry? [Y/n/q]
```

-   Press {kbd}`Enter` or {kbd}`Y` to release the package.
-   Press {kbd}`n` to skip the package and continue with the next one.
-   Press {kbd}`q` to stop the release sequence.

For each package that you release, the script runs `pnpm --filter <package> release`.
This starts `release-it` for that package, which does the following steps, asking for confirmation along the way.

1.  Asks you for the new version number.
2.  Builds the change log of the package with `towncrier`, and removes the released news fragments.
3.  Builds the package, for the packages that need a build step.
4.  Commits the changes, and tags the release.
5.  Pushes the commit and the tag to the `main` branch.
6.  Creates the GitHub release, with the change log of this version as release notes.
7.  Publishes the package to npm.

For `@plone/volto`, `release-it` also updates the translations and the type definitions before the version bump, and copies the release notes to the documentation.

If a release fails, the script stops.
Fix the problem, then run `pnpm prereleaser --release` again.
The packages that were already released no longer have news fragments, so they don't appear in the plan.


### Packages outside the release plan

The `prereleaser` script also lists the packages that have news fragments, but aren't part of the release plan, under {guilabel}`Changed packages outside the planned release chain`.
The script doesn't release these packages.
Release them manually, as described in the next section.


## Release a single package manually

You can release any package without the `prereleaser` script.
Run the following commands from the root of the repository.

To release a package, use the `release` script.

```shell
pnpm --filter <package> release
```

To preview a release without actually making one, use the `dry-release` script.

```shell
pnpm --filter <package> dry-release
```

To release an alpha version, use the `release-alpha` script.

```shell
pnpm --filter <package> release-alpha
```

To release an alpha version of the next major version, use the `release-major-alpha` script.

```shell
pnpm --filter <package> release-major-alpha
```

For example, to make a dry run of the release of `@plone/registry`, use the following command.

```shell
pnpm --filter @plone/registry dry-release
```
