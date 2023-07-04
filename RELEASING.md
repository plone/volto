# Releasing

To ease the release process, we use the utility [`release-it`](https://www.npmjs.com/package/release-it) which helps with the process, and [`towncrier`](https://towncrier.readthedocs.io) for creating and maintaining change logs.

## Release requirements

To start a release, you must fulfill the following requirements:

- Have permission to push to `master` branch
- Have permission on the [`@plone` organization on npm](https://www.npmjs.com/org/plone).
- Have an environment variable `GITHUB_TOKEN` with a GitHub personal token with permissions to write to the [Volto Release page on GitHub](https://github.com/plone/volto/releases).
- Install [`pipx`](https://pypa.github.io/pipx/) in your system.

To request these permissions, on GitHub tag `@plone/release-team`, or in Discord post to the [`release-team` channel](https://discord.com/channels/786421998426521600/897549410521714760).

### Permission to push to `master` branch

The release process involves pushing directly to the `master` branch.
Volto's `master` branch is protected, so the releaser needs to have permission for pushing to it.
At the moment of this writing, members of the GitHub group `@plone/volto-team` have permission to push to `master`.

### Permission to release Volto to npm registry

We push Volto's releases to the npm registry.
The releaser has to have permissions for pushing a release in the [`@plone` organization on npm](https://www.npmjs.com/org/plone).
Only the current Owners of this organization can grant permissions to the releaser.

### Have a GitHub personal token with permissions to write the Volto's Releases

The `release-it` library takes care of creating and pushing a GitHub Release for each release.
It requires you to get a GitHub personal token with permission to write to the Volto's Releases.
This can be acquired in your GitHub profile page.
When making a release, export the environment variable `GITHUB_TOKEN` in your shell session.

```shell
export GITHUB_TOKEN="my_looooong_github_token"
```

See `release-it` documentation of [GitHub releases](https://www.npmjs.com/package/release-it#github-releases) and GitHub documentation [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases).

### Install `pipx` in your system

The release process calls `towncrier`.
It is a Python library that uses the Python utility `pipx`.
This utility allows you to call and execute Python modules without installing them as a prerequisite in your system.
It works similar to the NodeJS `npx` utility.
On macOS, you can install `pipx` into your system:

```shell
brew install pipx
```

Or follow detailed instructions in the `pipx` documentation for [Installation](https://pypa.github.io/pipx/installation/).

## Running the release process

These are the commands to make a Volto release:

```shell
yarn release
```

A dry-release command for testing the output is also available:

```shell
yarn dry-release
```

An alpha release can be cut using:

```shell
yarn release-alpha
```
