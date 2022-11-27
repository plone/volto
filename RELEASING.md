# Releasing

For ease the release process, we use the utility [`release-it`](https://www.npmjs.com/package/release-it) which helps with the process, and [`towncrier`](https://towncrier.readthedocs.io) for creating and maintaining change logs.

## Release requirements

To start a release, you must fulfill the following requirements:

- Have permission to push to `master` branch
- Have permission on the [`@plone` organization on npm](https://www.npmjs.com/org/plone).
- Have an environment variable `GITHUB_TOKEN` with a GitHub personal token with permissions to write to the [Volto Release page on GitHub](https://github.com/plone/volto/releases).
- Install [`pipx`](https://pypa.github.io/pipx/) in your system.

You have to ask for these permissions to the members of the `@plone/release-team` via Github or Plone's Discord `release-team` channel.

### Permission to `master` branch

The release process involves pushing directly to the `master` branch.
Volto's `master` branch is protected, so the releaser needs to have permission for pushing to it.
At the moment of this writting, the `plone/volto-team` Github group have granted permissions for pushing to `master`.

### Permission to release Volto to npm registry

We push Volto's releases to the npm registry.
The releaser has to have permissions for pushing a release in the [`@plone` organization on npm](https://www.npmjs.com/org/plone).
Only the current Owners of this organization can grant permissions to the releaser.

### Have a GitHub personal token with permissions to write the Volto's Releases

The `release-it` library takes care of creating and pushing a GitHub Release for each release.
It requires you to get a have GitHub personal token with permissions to write the Volto's Releases.
This can be acquired in your GitHub profile page.
Once you have it, you need to setup in your system a `GITHUB_TOKEN` environment variable set containing it.

```shell
export GITHUB_TOKEN="my_looooong_github_token"
```

See `release-it` documentation of [GitHub releases](https://www.npmjs.com/package/release-it#github-releases) and GitHub documentation [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases).

### Install `pipx` in your system

The release process calls at some point at `towncrier` which is a Python library using the Python utility `pipx`.
This utility allows you to call and execute Python modules without having to have them installed previously in your system.
It's like the NodeJS `npx` utility and works pretty much in the same way.
If you are in a MacOS system, you can use:

```shell
brew install pipx
```

or follow more detailed instructions in [`pipx`](https://pypa.github.io/pipx/) documentation page.

## Running the release process

These are the commands for release Volto:

```shell
yarn release
```

a dry-release command for testing the output is also available:

```shell
yarn dry-release
```

and alpha release can also be cut using:

```shell
yarn release-alpha
```
