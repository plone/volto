---
myst:
  html_meta:
    "description": "How to install an add-on in development mode in Volto 17 in your Plone project"
    "property=og:description": "How to install an add-on in development mode in Volto 17 in your Plone project"
    "property=og:title": "Install an add-on in development mode in Volto 17"
    "keywords": "Volto, Plone, add-on, stable, development, mode"
---

# Install an add-on in development mode in Volto 17

Use [`mrs-developer`](https://www.npmjs.com/package/mrs-developer) to manage the development cycle of Volto add-ons.
This tool pulls the remote code and configures the current project, making the add-on available for the build.
By doing this, you can develop both the project and the add-on product as if they were both part of the current codebase.

`mrs-developer` is included and installed by default when you generate a project with the generator.
Use the following command to install the configuration of `mrs.developer.json` in your project.

```shell
make install
```


## Configure `mrs-developer`

{file}`mrs.developer.json` is the configuration file that instructs `mrs-developer` from where it should pull the packages.
The generator includes an empty one for you.
Edit {file}`mrs.developer.json` and add the following code.

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

Now the add-on appears in `src/addons/`.

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

Your project uses a file to configure import paths, either {file}`tsconfig.json` or {file}`jsconfig.json` at the Volto project root.
`mrs-developer` automatically manages the content of this file for you.
If you choose not to use `mrs-developer`, you'll have to manually add configuration to this file.

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


```{warning}
Both values for `paths` and `baseUrl` must match your project's layout.
```

```{tip}
You should use the `src` path inside your package and point the `main` key in {file}`package.json` to the {file}`index.js` file in {file}`src/index.js`.
```


## Add-on development lifecycle

If you want to "disable" using the development version of an add-on, or keep a more stable version of `mrs.developer.json` in your source code repository, you can set its status by adding a `develop` key to {file}`mrs.developer.json` as shown.

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

Whenever you change a value in your {file}`mrs.developer.json`, you must run `make install` again.


## Add-on dependencies, yarn workspaces

If your add-on needs to bring in additional JavaScript package dependencies, you'll have to set your add-on package as a "Yarn workspace".
You should add a `workspaces` key to the {file}`package.json` of your Volto project.

```json
"workspaces": ["src/addons/my-volto-addon"],
```

It is common practice to use a star (`*`) glob pattern for the workspaces.

```json
"workspaces": ["src/addons/*"],
```

If you do this, make sure to always clean up the `src/addons` folder whenever you toggle the development status of an add-on, as the existence of the add-on folder under `src/addons` will still influence yarn.
To do so, run `make install` again to remove the no longer required package.
