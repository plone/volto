---
myst:
  html_meta:
    "description": "How to install an add-on in development mode in Volto (development or pre-release) in your Plone project"
    "property=og:description": "How to install an add-on in development mode in Volto (development or pre-release) in your Plone project"
    "property=og:title": "Install an add-on in development mode in Volto (development or pre-release)"
    "keywords": "Volto, Plone, add-on, pre-release, development, mode"
---

# Install an add-on in development mode in Volto (development or pre-release)

Use [`mrs-developer`](https://www.npmjs.com/package/mrs-developer) to manage the development cycle of Volto add-ons.
This tool pulls the remote code and configures the current project, making the add-on available for the build.
By doing this, you can develop both the project and the add-on product as if they were both part of the current codebase.

`mrs-developer` is included and installed by default when you generate a project with Cookieplone.
Use the following command to install the configuration of `mrs.developer.json` in your project.

```shell
make install
```


## Configure `mrs-developer`

{file}`mrs.developer.json` is the configuration file that instructs `mrs-developer` from where it should pull the packages.
Cookieplone includes an empty one for you.
Edit {file}`mrs.developer.json` and add the following code.

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

Now the add-on appears in `packages/acme-volto-foo-addon/`.

```{note}
The `package` property is optional.
Use it only if your package has a namespace.

`src` is required if the content of your add-on is located in the `src` directory.
Since that is the convention for all Volto add-on packages, you must always include it.
```

If you want to know more about `mrs-developer` config options, please refer to
[its npm page](https://www.npmjs.com/package/mrs-developer).


## Resolve import paths

```{versionadded} Volto 18.0.0-alpha.43
```

The Cookieplone setup uses `pnpm` to resolve import paths.
You have nothing to do here.


## Add-on development lifecycle

If you want to "disable" using the development version of an add-on, or keep a more stable version of `mrs.developer.json` in your source code repository, you can set its status by adding a `develop` key to {file}`mrs.developer.json` as shown.

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

Whenever you change a value in your {file}`mrs.developer.json`, you must run `make install` again.


## Add-on dependencies, yarn workspaces

If your add-on needs to bring in additional JavaScript package dependencies, you'll have to declare them as normal package dependencies.


## `pnpm` workspaces

Your need to configure your add-ons using a `pnpm` workspace.
You can configure them using the file {file}`pnpm-workspace.yaml` and declare all your development add-ons in there.

```yaml
packages:
  - 'core/packages/*'
  - 'packages/*'
```

If the add-on you are developing uses the `pnpm` setup, then you have to add the following to {file}`pnpm-workspace.yaml` detect them.

```yaml
packages:
  - 'core/packages'
  - 'packages/my-policy-addon'
  - 'packages/**/packages/*'
```

You can explicitly declare the add-ons, too.

```yaml
packages:
  - 'core/packages'
  - 'packages/my-policy-addon'
  - 'packages/my-development-mode-addon'
  - 'packages/**/packages/*'
```

```{important}
Run `make install` after any change in {file}`pnpm-workspace.yaml` to update the setup.
```
