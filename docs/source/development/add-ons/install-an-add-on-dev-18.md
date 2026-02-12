---
myst:
  html_meta:
    "description": "How to install an add-on in development mode in Volto 18 in your Plone project"
    "property=og:description": "How to install an add-on in development mode in Volto 18 in your Plone project"
    "property=og:title": "Install an add-on in development mode in Volto 18"
    "keywords": "Volto, Plone, add-on, development, mode"
---

# Install an add-on in development mode in Volto 18

Use [`mrs-developer`](https://www.npmjs.com/package/mrs-developer) to manage the development cycle of Volto add-ons.
This tool pulls the remote code and configures the current project, making the add-on available for the build.
By doing this, you can develop both the project and the add-on product as if they were both part of the current codebase.

`mrs-developer` is included and installed by default when you generate a project with Cookieplone.
Use the following command to install the configuration of `mrs.developer.json` in your project.

```shell
make install
```

Next, you need to add the add-on to the `addons` key of your Plone project's {file}`package.json`.

```json
{
  "name": "my-volto-project",
  "addons": [
    "name-of-add-on"
  ]
}
```

```{seealso}
Alternatively, you can use {file}`volto.config.js` to declare add-ons in your Plone project.
See {doc}`../../configuration/volto-config-js`.
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

```{seealso}
See [`mrs-developer` configuration options](https://www.npmjs.com/package/mrs-developer).
```


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


## Add-on dependencies

If your add-on needs to bring in additional JavaScript package dependencies, you'll have to declare them as normal package dependencies.


## `pnpm` workspaces

You need to configure your add-ons using a `pnpm` workspace.
You can configure them using the file {file}`pnpm-workspace.yaml` and declare all your development add-ons in there.

```yaml
packages:
  - 'core/packages/*'
  - 'packages/*'
```

If the add-on you are developing was created using {term}`Cookieplone`, then you have to add the following to {file}`pnpm-workspace.yaml` detect them.

```yaml
packages:
  - 'core/packages'
  - 'packages/my-policy-addon'
  - 'packages/**/packages/*'
```

Note the nesting of `packages` since a {term}`Cookieplone` generated add-on will have a `packages` folder in itself.
You can explicitly declare the add-ons, too.

```yaml
packages:
  - 'core/packages'
  - 'packages/my-policy-addon'
  - 'packages/my-development-mode-addon/packages/my-development-mode-addon'
  - 'packages/**/packages/*'
```

```{important}
Run `make install` after any change in {file}`pnpm-workspace.yaml` to update the setup.
```
