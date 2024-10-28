---
myst:
  html_meta:
    "description": "How to install a frontend add-on in development mode in your Plone project"
    "property=og:description": "How to install a frontend add-on in development mode in your Plone project"
    "property=og:title": "How to install a frontend add-on in development mode"
    "keywords": "Volto, Plone, Volto add-on, unreleased, development"
---

# How to install a frontend add-on in development mode (stable release)

We use `mrs-developer` tool to manage the development cycle of Volto add-ons.
This tool help us to pull the remote code and configure the current project to have the add-on(s) available for the build.

## Add `mrs-developer` dependency and related script

[Eric Brehault](https://github.com/ebrehault) ported this amazing Python tool,
which provides a way to pull a package from git and set it up as a dependency
for the current project codebase.

To facilitate addon development lifecycle we recommend using
[mrs-developer](https://www.npmjs.com/package/mrs-developer).

By doing this, you can develop both the project and the add-on product as if
they were both part of the current codebase. Once the add-on development is
done, you can publish the package to an npm repository.

`mrs-developer` is included and installed by default when you generate a project with the generator.
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

Now the addon is found in `src/addons/`.

```{note}
`package` property is optional, set it up only if your package has a scope (namespace).
`src` is required if the content of your addon is located in the `src`
directory (but, as that is the convention recommended for all Volto add-on
packages, you will always include it)
```

If you want to know more about `mrs-developer` config options, please refer to
[its npm page](https://www.npmjs.com/package/mrs-developer).

## tsconfig.json / jsconfig.json

`mrs-developer` automatically manages the contents of this file for you, but if you choose not
to use mrs-developer, you'll have to add something like this to your
`tsconfig.json` or `jsconfig.json` file in the Volto project root:

```json
{
    "compilerOptions": {
        "paths": {
            "acme-volto-foo-addon": [
                "addons/acme-volto-foo-addon/src"
            ]
        },
        "baseUrl": "src"
    }
}
```

This is required so the project "knows" about your package in development and the imports to work correctly.

```{warning}
Please note that both `paths` and `baseUrl` are required to match your
project layout.
```

```{tip}
You should use the `src` path inside your package and point the `main` key
in `package.json` to the `index.js` file in `src/index.js`.
```

### Addon development lifecycle

If you want to "disable" using the development version of an addon, or keep
a more stable version of `mrs.developer.json` in your source code repository,
you can set its developing status by adding a `develop` key:

```json
{
  "acme-volto-foo-addon": {
    "package": "@acme/volto-foo-addon",
    "url": "git@github.com:acme/my-volto-addon.git",
    "path": "src",
    "develop": true
  }
}
```

You can toggle that key to `false` and run `make install` again.

### Addon dependencies, yarn workspaces

If your addon needs to bring in additional JavaScript package dependencies,
you'll have to set your addon package as a "Yarn workspace". You do this by
adding a `workspaces` key to the the `package.json` of your Volto project:

```json
"workspaces": ["src/addons/my-volto-addon"],
```

It is common practice to use a star glob pattern for the workspaces:

```json
"workspaces": ["src/addons/*"],
```

If you do this, make sure to always cleanup the `src/addons` folder whenever
you toggle the development status of an addon, as the existence of the addon
folder under the `src/addons` will still influence yarn.
Running `make install` again will do the trick and remove the not required anymore package.
