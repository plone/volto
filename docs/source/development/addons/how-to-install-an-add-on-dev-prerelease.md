---
myst:
  html_meta:
    "description": "How to install a frontend add-on in development mode in your Plone project"
    "property=og:description": "How to install a frontend add-on in development mode in your Plone project"
    "property=og:title": "How to install a frontend add-on in development mode"
    "keywords": "Volto, Plone, Volto add-on, unreleased, development"
---

# How to install a frontend add-on in development mode (development or pre-release)

We use `mrs-developer` tool to manage the development cycle of Volto add-ons.
This tool help us to pull the remote code and configure the current project to have the add-on(s) available for the build.

[Eric Brehault](https://github.com/ebrehault) ported this amazing Python tool,
which provides a way to pull a package from git and set it up as a dependency
for the current project codebase.

To facilitate addon development lifecycle we recommend using
[mrs-developer](https://www.npmjs.com/package/mrs-developer).

By doing this, you can develop both the project and the add-on product as if
they were both part of the current codebase. Once the add-on development is
done, you can publish the package to an npm repository.

`mrs-developer` is included and installed by default when you generate a project with Cookieplone.
There is a `Makefile` command that installs the configuration of `mrs.developer.json` in your project.

```shell
make install
```

## mrs.developer.json

This is the configuration file that instructs `mrs-developer` from where it has
to pull the packages.
The generator includes an empty one for you, edit `mrs.developer.json` and add:

```json
{
  "acme-volto-foo-addon": {
    "output": "packages",
    "package": "@acme/volto-foo-addon",
    "url": "git@github.com:acme/my-volto-addon.git",
    "path": "src"
  }
}
```

Then run:

```bash
make install
```

Now the addon is found in `packages/acme-volto-foo-addon`.

```{note}
`package` property is optional, set it up only if your package has a scope (namespace).
`src` is required if the content of your addon is located in the `src`
directory (but, as that is the convention recommended for all Volto add-on
packages, you will always include it)
```

If you want to know more about `mrs-developer` config options, please refer to
[its npm page](https://www.npmjs.com/package/mrs-developer).

## tsconfig.json / jsconfig.json

Cookieplone setup does not require that `mrs-developer` tweaks the base `tsconfig.json/jsconfig.json`, since `pnpm` takes care of the resolution "the right way".
This is different from the `yarn` setup, that required it.

### Addon development lifecycle

If you want to "disable" using the development version of an addon, or keep
a more stable version of `mrs.developer.json` in your source code repository,
you can set its developing status by adding a `develop` key:

```json
{
  "acme-volto-foo-addon": {
    "output": "packages",
    "package": "@acme/volto-foo-addon",
    "url": "git@github.com:acme/my-volto-addon.git",
    "path": "src",
    "develop": true
  }
}
```

You can toggle that key to `false` and run `make install` again.

### Addon dependencies

If your addon needs to bring in additional JavaScript package dependencies,
you'll have to declare them as normal package dependencies.

### `pnpm` workspaces

Your add-on needs to be detected by your setup as a workspace.
You can configure them using `pnpm-workspace.yaml` file and declare every development add-on in there.

```yaml
packages:
  - 'core/packages/*'
  - 'packages/*'
```

If the add-on you are developing uses the `pnpm` setup as well (recommended), then you have to add:

```yaml
packages:
  - 'core/packages'
  - 'packages/my-policy-addon'
  - 'packages/**/packages/*'
```

for detecting them.
Declaring the add-ons explicitly works too:

```yaml
packages:
  - 'core/packages'
  - 'packages/my-policy-addon'
  - 'packages/my-development-mode-addon'
  - 'packages/**/packages/*'
```

```{warning}
Don't forget to run `make install` after any change in this files to update the setup.
```
