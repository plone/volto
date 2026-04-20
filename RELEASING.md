# Releasing

To ease the release process, we use the utility [`release-it`](https://www.npmjs.com/package/release-it) which helps with the process, and [`towncrier`](https://towncrier.readthedocs.io/en/stable/) for creating and maintaining change logs.

## Release requirements

To start a release, you must fulfill the following requirements:

- Have permission to push to `main` branch
- Have permission on the [`@plone` organization on npm](https://www.npmjs.com/org/plone).
- Have an environment variable `GITHUB_TOKEN` with a GitHub personal token with permissions to write to the [Volto Release page on GitHub](https://github.com/plone/volto/releases).
- Install [`pipx`](https://pipx.pypa.io/stable/) in your system.

To request these permissions, on GitHub tag `@plone/release-team`, or in Discord post to the [`release-team` channel](https://discord.com/channels/786421998426521600/897549410521714760).

### Permission to push to `main` branch

The release process involves pushing directly to the `main` branch.
Volto's `main` branch is protected, so the releaser needs to have permission for pushing to it.
At the moment of this writing, members of the GitHub group `@plone/volto-team` have permission to push to `main`.

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

Install {term}`pipx` for your active Python, and ensure it is on your `$PATH`.
Carefully read the console output for further instructions, if needed.

```shell
python3 -m pip install pipx
pipx ensurepath
```


## Running the release process

There are two phases to make a Volto release.
First run `prereleaser`, then run release commands.


### `prereleaser` command

This command checks which packages are pending to release so you have a guide on the pending packages release order.
This is recommended order to release pending packages:

- `@plone/types`
- `@plone/registry`
- `@plone/components`
- `@plone/volto-scripts`
- `@plone/volto-slate`
- `@plone/volto`

When you run `pnpm prereleaser`, it will check for any pending releases.
The following is sample output.

```console
packages/slots/news/7260.internal
packages/components/news/7260.internal
packages/client/news/7321.internal
packages/client/news/7260.internal
packages/blocks/news/7260.internal
[
  'packages/volto',
  'packages/volto-slate',
  'packages/components',
  'packages/client',
]
```

Based on the output from the `prereleaser` command, review the list of packages pending release.
Proceed to release each package in the recommended order, starting with the first package in the list and continuing sequentially.
This ensures dependencies are handled correctly and the release process is smooth.

### Release commands

Use the `release` command to make a package release.

```shell
pnpm --filter <nameofthepackage> release
```

To perform a release dry run, in other words, to preview a release without actually making one, use the `dry-release` command.

```shell
pnpm --filter <nameofthepackage> dry-release
```

To cut an alpha release, use the `release-alpha` command.

```shell
pnpm --filter <nameofthepackage> release-alpha
```
