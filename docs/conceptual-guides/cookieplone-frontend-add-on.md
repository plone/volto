---
myst:
  html_meta:
    "description": "An explanation of the anatomy of a frontend add-on"
    "property=og:description": "An explanation of the anatomy of a frontend add-on"
    "property=og:title": "Frontend add-on anatomy"
    "keywords": "Seven, cookieplone, template, add-on, anatomy"
---

# Frontend add-on anatomy

This chapter explains the anatomy of a frontend add-on in Seven that was created with {term}`cookieplone`.

## Root folder structure

After you create a frontend add-on with the cookieplone generator as described in {doc}`../get-started/create-package`, the code lives in the folder {file}`packages/<add-on-name>`.

The generated project contains the following files and folders:

{file}`registry.config.ts`
: This file is the main entry point for your add-on configuration.
  You can programmatically register add-ons in your app.
  By default, it registers both your add-on and the official Seven add-ons.
  The default Seven set includes the {term}`CMSUI` add-ons, but you can opt in to use only the {term}`Public UI` add-ons when building a public site without CMS functionality.
  The default content is:

  ```ts
  import { addons } from 'seven/registry.config';

  addons.push('<add-on-name>'); // <add-on-name> being the actual name of your add-on

  export { addons };
  ```

{file}`mrs-developer.json`
: This file configures the {term}`mrs-developer` tool.
  mrs-developer helps manage multiple repositories and packages in a monorepo.
  By default, it checks out the official Seven repository.
  This default is mandatory and you should not remove it.
  You can add external packages if your project requires them.
  Add them to the {file}`packages` folder via the `output` key using a configuration, as shown in the following example:

  ```{code-block} python
  :caption: mrs-developer.json
  :emphasize-lines: 10-18
  {
    "core": {
      "output": "./",
      "package": "@plone/volto",
      "url": "git@github.com:plone/volto.git",
      "https": "https://github.com/plone/volto.git",
      "branch": "seven",
      "filterBlobs": true
    },
    "volto-light-theme": {
      "develop": true,
      "output": "./packages",
      "package": "@kitconcept/volto-light-theme",
      "url": "git@github.com:kitconcept/volto-light-theme.git",
      "https": "https://github.com/kitconcept/volto-light-theme.git",
      "tag": "7.2.0",
      "filterBlobs": true
    },
  }
  ```

{file}`package.json`
: The root {file}`package.json` contains metadata for the monorepo.
  In normal circumstances, you do not need to change this file.
  It serves as glue to keep the workspace working.
  Because it contains the main pnpm entry point, you can override dependencies with `pnpm.overrides` if needed.

{file}`pnpm-workspace.yaml`
: This file configures the pnpm workspace.
  It lists the packages that are part of the workspace.
  In normal circumstances, you do not need to change this file.
  It automatically picks up packages in {file}`packages/*` and nested external packages in {file}`packages/**/packages/*`.

## Add-on folder structure

The add-on folder {file}`packages/<add-on-name>` contains the folowing files and folders:

{file}`packages/<add-on-name>/package.json`
:   This file contains the metadata for your add-on package.
    The most relevant keys are the following.

    `name`
    : The name of your add-on package.

    `version`
    : The version of your add-on package.

    `main`
    :   The entry point for the add-on configuration loader.
        By default, it points to `index.ts`, which exports the function that `@plone/registry` calls to load your add-on configuration.

    `peerDependencies`
    :   The peer dependencies for your add-on package.
        By default, it includes a peer dependency on `@plone/registry`, which provides the add-on registry and loader.

    `dependencies`
    :   The runtime dependencies for your add-on package.
        Add any additional dependencies your add-on needs here.

    `devDependencies`
    :   The development dependencies for your add-on package.
        Add any development-only dependencies here.

    ```{tip}
    Avoid adding dependencies to the monorepo root's {file}`package.json`.
    Instead, add them to your add-on's {file}`package.json`.
    This ensures dependencies resolve correctly when your add-on is used in other projects.
    ```

{file}`packages/<add-on-name>/index.ts`
: This file is the main entry point for your add-on.
  It exports a default function called by the `@plone/registry` configuration loader.
  The function receives your app configuration as a parameter, which you can mutate to customize or extend defaults.
  The default content is the following.

  ```ts
  import type { ConfigType } from '@plone/registry';

  export default function loadConfig(config: ConfigType) {
    // You can mutate the configuration object in here
    return config;
  }
  ```

  ```{note}
  This file is not in a {file}`src` folder.
  Seven add-ons do not use a {file}`src` folder.
  See {ref}`add-on-packages-do-not-use-src-folder` for more information.
  ```

{file}`packages/<add-on-name>/locales/{lang}.json`
: This folder contains localization files for your add-on.
  Add one file per supported language.

## Tooling

The project includes the following tooling configurations:

{file}`tsconfig.json`
: This file is the TypeScript configuration for your add-on.

{file}`eslint.config.mjs`
: This file configures ESLint.
  It extends the default Seven configuration, and you can customize it if needed.
  In normal circumstances, you do not need to change this file.

{file}`.prettierrc`
: This file configures Prettier.
  In normal circumstances, you do not need to change this folder.

{file}`.stylelintrc`
: This file configures Stylelint.
  In normal circumstances, you do not need to change this folder.

{file}`Makefile`
: This file provides convenience make commands for common tasks.

{file}`Dockerfile`
: This file builds a Docker image for your project.
  You can use it to build and run the project in a containerized environment.
  In normal circumstances, you do not need to change this file.
  If you're building an add-on package, it's likely that you don't need this file at all.

{file}`.storybook`
: This folder contains the Storybook configuration for your add-on.
  Storybook builds and previews React UI components in isolation.
  In normal circumstances, you do not need to change this folder.
  If your add-on contains UI components, add stories to showcase them.

{file}`.github`
: This folder contains GitHub Actions workflows for linting, testing, and building your add-on.
  In normal circumstances, you do not need to change this folder.
  Customize the workflows if you need a tailored CI/CD process.

{file}`cypress`
: This folder contains Cypress end-to-end tests for your add-on.
  Add tests in {file}`cypress/tests` using the `*.cy.ts` naming convention.
  In normal circumstances, you do not need to change the Cypress configuration.

## Seven core checkout

The Seven core repository is checked out in the {file}`core` folder.
This checkout is mandatory and you should not remove it.
It is managed by mrs-developer.

### Update Seven

After a Seven release, update your checkout by changing the `tag` key in the `core` section of {file}`mrs-developer.json`:

```{code-block} python
:caption: mrs-developer.json
:emphasize-lines: 7
{
  "core": {
    "output": "./",
    "package": "@plone/volto",
    "url": "git@github.com:plone/volto.git",
    "https": "https://github.com/plone/volto.git",
    "tag": "1.0.0",
    "filterBlobs": true
  },
}
```

Then run:

```shell
make install
```

```{important}
During the alpha and beta phases of Seven, you should not use the `tag` key, but the `branch` key instead, pointing to the `seven` branch.
```
