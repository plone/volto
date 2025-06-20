---
myst:
  html_meta:
    "description": "This upgrade guide lists all breaking changes in Volto and explains the steps that are necessary to upgrade to the latest version."
    "property=og:description": "This upgrade guide lists all breaking changes in Volto and explains the steps that are necessary to upgrade to the latest version."
    "property=og:title": "Upgrade Guide"
    "keywords": "Volto, Plone, frontend, React, Upgrade, Guide"
---

(volto-upgrade-guide)=

# Upgrade Guide

This upgrade guide lists all breaking changes in Volto and explains the steps that are necessary to upgrade to the latest version.
Volto uses Semantic Versioning.
For more information see {doc}`../contributing/version-policy`.

````{note}
[Cookieplone](https://github.com/plone/cookieplone) is the official project generator for Plone.
We keep Cookieplone up to date and in sync with the current Volto release.

To make it easier for you to maintain your projects, you should keep all your code inside your project add-ons.
If you do so, when you want to upgrade your project, you can generate a new project using Cookieplone with the same name as your old one, and copy over your add-ons to the new project.
It is usually better and quicker to move your items into new locations and copy your dependencies than dealing with following the upgrade steps, regardless of whether you have modified the boilerplate.

```{seealso}
{ref}`upgrade-18-cookieplone-label`
```
````

(volto-upgrade-guide-19.x.x)=

## Upgrading to Volto 19.x.x

(19-removed-support-for-loading-configuration-from-project-label)=

### Removed support for loading configuration from project
```{versionremoved} Volto 19
```
This breaking change fulfills [PLIP 6396](https://github.com/plone/volto/issues/6396).

The old fashioned project structure was deprecated in Volto 18.0.0-alpha.43, in favor of the "add-on driven development" in Plone.
It now uses a policy add-on package to configure your project, and is provided by [Cookieplone](https://github.com/plone/cookieplone).
The old fashioned structure was created by the deprecated `@plone/generator-volto` package, and was based on the Razzle setup using a middle-man project artifact.
There's nothing that limits to move all the config from a project to an add-on package.
See {ref}`upgrade-18-cookieplone-label` for details.


### Plone 5 is no longer tested
```{versionremoved} Volto 19
```

Volto 19 no longer includes automated tests for compatibility with Plone 5.
While it may still work with Plone 5 backends in some cases, we recommend upgrading to Plone 6 for full compatibility and support.


### Removed packages `@plone/generator-volto`, `@plone/volto-guillotina`, and `@plone/volto-testing`
```{versionremoved} Volto 19
```

These packages have been removed from the Volto repository as they are no longer maintained:

- `@plone/generator-volto`: Deprecated in favor of [Cookieplone](https://github.com/plone/cookieplone)
- `@plone/volto-guillotina`: No longer actively maintained
- `@plone/volto-testing`: Testing functionality is now integrated directly in Volto core

### Removed language settings
```{versionremoved} Volto 19
```

The `defaultLanguage` and `isMultilingual` settings have been removed.
Instead, these values are fetched from the backend API.
The `supportedLanguages` setting now only controls which locales are included in the build.


### Renamed literal "Head title" to "Kicker" in Teaser block
```{versionadded} Volto 19.0.0-alpha.3
```

The default (English) literal "Head title" in the `teaser` block has been renamed to "Kicker" for accuracy and clarity.
The `head_title` property and the translation id (`head_title`) in the `teaser` block settings has been kept for backwards compatibility.

(upgrading-to-volto-18-x-x)=

## Upgrading to Volto 18.x.x

(upgrade-18-cookieplone-label)=

### Cookieplone is now the recommended project and add-on generator for Volto 18

```{versionadded} Volto 18.0.0-alpha.43
```

[Cookieplone](https://github.com/plone/cookieplone) is now the recommended way to develop Volto projects, using it as a boilerplate project generator.
Cookieplone uses the frontend code installed using `pnpm` instead of `yarn`.
This affects the way that the Plone Release Team generates the Sponsored OSS Docker images, since they must be compatible with the `pnpm` setup.

Since Volto `18.0.0-alpha.43`, the Docker image [`plone-frontend`](https://hub.docker.com/r/plone/plone-frontend) uses `pnpm`.

To migrate your projects to the new setup, take the following steps.

1.  From the root of your project, create the new project structure with Cookieplone using the `frontend_addon` template using the following command.

    ```shell
    pipx run cookieplone frontend_addon
    ```

1.  Take the contents of the {file}`src` folder in the old structure, and copy them over to `packages/<your-addon-name>/src/`.

```{seealso}
-   {doc}`../development/add-ons/create-an-add-on-18`
-   [update for Volto 18 codesyntax/volto-maplibre-block#4](https://github.com/codesyntax/volto-maplibre-block/pull/4)
-   [update for volto 18 codesyntax/volto-countup-block#5](https://github.com/codesyntax/volto-countup-block/pull/5)
```

For developers that won't migrate their projects to the new setup with `pnpm` instead of `yarn`, the Release Team will generate a new Docker image named `plone-frontend:18-yarn` for the Volto 18 series of alpha releases.

Support for `yarn` will be dropped in Volto 19.

```{deprecated} Volto 18.0.0-alpha.43
The `yarn`-based generator [`@plone/generator-volto`](https://www.npmjs.com/package/@plone/generator-volto) package and project boilerplates generated from it are deprecated and will not receive any further updates.
The recommended way of generating a boilerplate project is [Cookieplone](https://github.com/plone/cookieplone).
Please update your code to use the `pnpm`-based setup.
```

### Node.js version support: adding 22, dropping 18

Added support for Node.js 22.
It is the long-term support (LTS) release effective 2024-10-29.

Long-term support for {term}`Node.js` 18 by the Node.js community will end on 2025-04-30.
Volto 18 no longer supports Node.js 18, since Volto only supports the latest two LTS versions.
Volto might continue to work on Node.js 18, but it is not tested in CI.

Please update your projects to a supported Node.js version, either 20 or 22.
Version 22 is recommended, as the latest LTS version of Node.js.


### Volto's internal `dependencies` and `devDependencies` are now properly sorted out

```{deprecated} Volto 18.0.0-alpha.43
This step is only valid for projects that continue to use the `yarn`-based generator and haven't updated to Cookieplone `pnpm`-based setups.
See {ref}`upgrade-18-cookieplone-label` for details.
```

Volto internal `dependencies` and `devDependencies` have been correctly sorted out.
This means that Volto no longer will force `devDependencies` as `dependencies` just to make sure that they get installed in Volto projects.
This provoked undesired hoisting problems, and forced the build to not behave correctly in some situations.
This also aligns with the best practices in the JavaScript world, and will make the packagers work better.

This change means that your projects will now have to declare all their dependencies.
For this purpose, we have developed a {ref}`new utility <upgrade-guide-new-dependencies-synchronizer-label>` that synchronizes the `dependencies` and `devDependencies` of your projects with those in Volto core.
It is mandatory that you run the utility to make Volto version 18.0.0-alpha.21 or later work in your projects.
This opens the door to use {term}`pnpm` in projects, too, and other goodies.

```{versionremoved} Volto 18.0.0-alpha.33
The setting `config.settings.serverConfig.extractScripts.errorPages` has been removed.
```

Now scripts are added to error pages, regardless of whether they are in production mode.
This setting is no longer necessary.


(upgrade-guide-new-dependencies-synchronizer-label)=

### New dependencies synchronizer

```{deprecated} Volto 18.0.0-alpha.43
This step is only valid for projects that continue to use the `yarn`-based generator and haven't updated to Cookieplone `pnpm`-based setups.
See {ref}`upgrade-18-cookieplone-label` for details.
```

```{versionadded} Volto 18.0.0-alpha.21
```

```{versionadded} @plone/scripts 3.6.1
```

Volto now has a script to ease the upgrades in Volto projects, called `volto-update-deps`.
It's included as part of the `@plone/scripts` package.
This script synchronizes the local dependencies of your project with those in Volto core.
It preserves your dependencies.

To run the procedure, in your project's `package.json`, update the `@plone/volto` version to the one to which you want to upgrade, such as `18.0.0-alpha.21`.
Then update the version of `@plone/scripts` to at least version `3.6.1`.
The following example shows the minimum valid versions to use under the `dependencies` key.

```json
"dependencies": {
  "@plone/volto": "18.0.0-alpha.21",
  "@plone/scripts": "^3.6.1"
}
```

Then run `yarn` in your project to update the packages.

```shell
yarn
```

After this, the `volto-update-deps` script will be available in your environment.
Now you can run the script to synchronize dependencies:

```shell
yarn volto-update-deps
```

It should synchronize the versions in your project's `dependencies` and `devDependencies` with those in Volto core.
It will add the missing ones, and update the current ones.
It will preserve the existing ones.
It is recommended that you check the resultant changes to assess that everything is fine.
Run yarn again to update the versions.

```shell
yarn
```

Verify that your project works well by running the development server.

```shell
yarn start
```

### Volto runs now on React 18.2.0

We have updated Volto to use React 18.
This has been the latest published stable version since June 2022.
This aligns Volto with the latests developments in the React ecosystem and opens the door to up to date software and React features, like client side `Suspense` and others:

- Concurrent rendering in client (Suspense)
- Automatic batching updates
- Transitions
- New hooks `useId`, `useTransition`, `useDeferredValue`, `useSyncExternalStore`, and other hooks

### `draftJS` dependency and `text`, `table`, and `hero` blocks removed

In Volto 16, the `text` block powered by the `Draft.js` library was deprecated, and it was announced that it would be removed in Volto 18.
Two other blocks, `table` and `hero`, that depended on `Draft.js` were also removed.

If you still need these blocks in your site, you can copy over the block code and settings into your project.
You can also migrate these blocks to use either `slate` or `slateTable` blocks.
The `hero` block can be replaced by the `teaser` block, but a migration is also needed.
See {ref}`existing-projects-using-core-draftjs-opting-to-migrate-to-slate`.

### `react-portal` dependency removed

`react-portal` is deprecated and it was removed from Volto.
The Volto code that relied on it was mainly CMS UI components.
If your project relies on it, either in your code or the shadowed components you may have, you should update to use the standard React API, `createPortal`.
You can update your shadows taking the modified components as templates.
As a last resort, you can install `react-portal` as a dependency of your project.
However, this is discouraged, because the React 18 rendering could have unexpected side effects.
It is recommended that you use the React API instead.

### `@plone/registry` moved to ESM

`@plone/registry` and [other packages on which Volto depends](https://github.com/plone/volto/tree/main/packages) are now stand-alone releases in the monorepo structure released in 18.0.0-alpha.4.

Also, the `@plone/registry` package has been moved to ESM.
The add-on registry scripts have also been refactored to TypeScript.
For maximum compatibility with CommonJS builds, the default exports have been moved to named exports.
The modules affected are now built, and the import paths have changed, too.
These changes force some import path changes that you should patch in your Plone project or add-on boilerplates.

```{note}
As always, when something changes in the boilerplate project generator, you may generate a new project with Cookieplone and move your code into it, instead of manually editing multiple files.
See {ref}`upgrade-18-cookieplone-label` for details.
```

For example, in your project's {file}`.eslintrc.js`:

```diff
 const fs = require('fs');
 const projectRootPath = __dirname;
-const AddonConfigurationRegistry = require('@plone/registry/src/addon-registry');
+const { AddonRegistry } = require('@plone/registry/addon-registry');

 let voltoPath = './node_modules/@plone/volto';

@@ -17,15 +17,15 @@ if (configFile) {
     voltoPath = `./${jsConfig.baseUrl}/${pathsConfig['@plone/volto'][0]}`;
 }

-const reg = new AddonConfigurationRegistry(__dirname);
+const { registry } = AddonRegistry.init(__dirname);

 // Extends ESlint configuration for adding the aliases to `src` directories in Volto addons
-const addonAliases = Object.keys(reg.packages).map((o) => [
+const addonAliases = Object.keys(registry.packages).map((o) => [
   o,
-  reg.packages[o].modulePath,
+  registry.packages[o].modulePath,
 ]);

-const addonExtenders = reg.getEslintExtenders().map((m) => require(m));
+const addonExtenders = registry.getEslintExtenders().map((m) => require(m));

       alias: {
         map: [
           ['@plone/volto', '@plone/volto/src'],
-          ['@plone/volto-slate', '@plone/volto/packages/volto-slate/src'],
-          ['@plone/registry', '@plone/volto/packages/registry/src'],
-          ['@plone/types', '@plone/volto/packages/types'],
+          ['@plone/volto-slate', '@plone/volto-slate/src'],
           ...addonAliases,
           ['@package', `${__dirname}/src`],
```

Also in the Storybook configuration {file}`.storybook/main.js`.

```diff
-    const AddonConfigurationRegistry = require('@plone/registry/src/addon-registry');
+    const { AddonRegistry } = require('@plone/registry/addon-registry');

-    const registry = new AddonConfigurationRegistry(projectRootPath);
+    const { registry } = AddonRegistry.init(projectRootPath);
```

```{versionadded} Volto 18.0.0-alpha.47
```

```{versionadded} @plone/registry 3.0.0-alpha.0
```

### Upgraded Slate libraries

The support libraries for Slate integration have been upgraded, mainly for bug fixes.
This is a breaking change.
The deprecated prop `value` in the main editor component setting is no longer supported, and has been replaced by `initialValue`.

If you use this component in your add-ons or projects directly, you need to replace the name of the prop.

```{note}
In your add-ons and projects, we advise you to always use the public components provided by Volto, instead of directly using the support libraries packaged in Volto.
```

### Remove the disabled property from fields in the source content in babel view

This change improves UX of the Babel view (translation form) since a disabled field cannot be selected to be copied over.

### `volto-slate` Cypress helpers moved to its own module

There were some Cypress helpers for `volto-slate` along with the other definitions of Cypress commands.
The Cypress command definitions are intended to be loaded only once, whereas the helpers can be imported any number of times.
Therefore, we moved the helpers to its own module:

```js
import { slateBeforeEach } from '@plone/volto/cypress/support/commands';
```

becomes:

```js
import { slateBeforeEach } from '@plone/volto/cypress/support/helpers';
```

### Storybook 8

Storybook was upgraded from version 6 to 8 in core and in the project generator.
This section is relevant if you have Storybook stories in your project or add-on.
The versions will be upgraded automatically using the `volto-update-deps` script.
The configuration of your project must also be updated with the new one.
Replace the `.storybook` folder in your project with this one:

https://github.com/plone/volto/tree/5605131868689778bbdca0c3003a40cb9f153c1a/packages/generator-volto/generators/app/templates/.storybook

Finally, in your project's or add-on's {file}`package.json` file, update the `scripts` key with the key/value pairs, as shown in the following diff.

```diff
-    "storybook": "start-storybook -p 6006",
-    "build-storybook": "build-storybook"
+    "storybook": "storybook dev -p 6006",
+    "build-storybook": "storybook build"
```

```{seealso}
[Migration guide from Storybook 6.x to 8.0](https://storybook.js.org/docs/migration-guide/from-older-version)
```

If you haven't customized the configuration, the migration is straightforward.
The stories format (CSF) is almost the same.
However, writing stories directly in MDX was removed in Storybook 8.
The `.stories.mdx` extension is no longer supported.

```{note}
Although it is technically possible to keep the old version running, the script `volto-update-deps` will try to update to Storybook 8 every time you run it.
```

### Form component passes down `id` of the current fieldset

There was a bug where a fieldset's generated value would be not valid.
This has been fixed by passing down the `id` instead of the `title` to the fieldset's value.
If your tests rely on the old fieldset's generated value for selecting fields, your tests could break, in which case you should amend them to use the updated fieldset's value instead.

### Changes from the original slots feature

Now `config.getSlots` in the configuration registry takes the argument `location` instead of `pathname`.
This allows more expressive conditions to fulfill the use case of the `Add` form.

### Improve container detection

The mechanism to detect if a block is a container or not has been improved and the config setting `config.settings.containerBlockTypes` is no longer needed, and core won't check for it anymore.

### New naming convention for `Makefile` commands

A new naming convention for `Makefile` commands has been implemented in Volto 18.
This convention has been applied to all Volto tools, including the new boilerplate generators that use cookiecutter.
The conventions is as follows:

- Use kebab-case, where each word is separated by a hyphen.
- Use hierarchical or taxonomic ranking, where the thing being operated upon is defined by `[thing]-[subthing]-[subsubthing]`.
- `[thing]` may be omitted when it is the project itself.
- The final term is the action to be performed upon the `[thing]`.

Every Makefile command now has a description.
To view a complete list of Makefile commands with their description, you can issue the following command.

```shell
make help
```

The following table lists the old and new Makefile commands and the new commands' description.

| Command | Revised Command | Revised Description | Comments |
|---|---|---|---|
| help | help | Show this help |  |
| start | start | Starts Volto, allowing reloading of the add-on during development |  |
| start-frontend |  |  | Removed |
| build | build | Build a production bundle for distribution | Added |
| build-frontend |  |  | Removed |
| test | test | Run unit tests |  |
| clean | clean | Clean development environment |  |
| setup | install | Set up development environment | Renamed to be consistent with the add-on setups |
| bin/python | bin/python | Create a Python virtual environment with the latest pip, and install documentation requirements |  |
| docs-clean | docs-clean | Clean current and legacy docs build directories, and Python virtual environment |  |
| docs-news | docs-news | Create or update the symlink from docs to volto package |  |
| docs-html | docs-html | Build html |  |
| docs-livehtml | docs-livehtml | Rebuild Sphinx documentation on changes, with live-reload in the browser |  |
| docs-linkcheck | docs-linkcheck | Run linkcheck |  |
| docs-linkcheckbroken | docs-linkcheckbroken | Run linkcheck and show only broken links |  |
| docs-vale | docs-vale | Install (once) and run Vale style, grammar, and spell checks |  |
| rtd-pr-preview | docs-rtd-pr-preview | Build previews of pull requests that have documentation changes on Read the Docs via CI |  |
| docs-test | docs-test | Clean docs build, then run linkcheckbroken, vale |  |
| copyreleasenotestodocs | release-notes-copy-to-docs | Copy release notes into documentation |  |
| storybook-build | storybook-build | Build Storybook |  |
|  | storybook-start | Start Storybook server on port 6006 | Added |
| patches |  |  | Removed |
| cypress-install | cypress-install | Install Cypress for acceptance tests |  |
| build-deps | build-deps | Build dependencies |  |
| corepackagebump |  |  | Removed |
| start-backend-docker | backend-docker-start | Starts a Docker-based backend for development |  |
| start-backend-docker-detached | backend-docker-detached-start | Starts a Docker-based backend in detached mode (daemon) |  |
| stop-backend-docker-detached | backend-docker-detached-stop | Stops the Docker-based backend in detached mode (daemon) |  |
| start-backend-docker-no-cors | backend-docker-start-no-cors | Starts the Docker-based backend without CORS in detached mode (daemon) |  |
| start-frontend-docker | frontend-docker-start | Starts a Docker-based frontend for development |  |
| start-backend-docker-guillotina |  |  | Removed |
| stop-backend-docker-guillotina |  |  | Removed |
| start-test-acceptance-frontend-dev | acceptance-frontend-dev-start | Start acceptance frontend in development mode |  |
| test-acceptance-server | acceptance-backend-start | Start backend acceptance server |  |
| start-test-acceptance-server | ci-acceptance-backend-start | Start backend acceptance server in headless mode for CI |  |
| start-test-acceptance-frontend | acceptance-frontend-prod-start | Start acceptance frontend in production mode |  |
| test-acceptance | acceptance-test | Start Cypress in interactive mode |  |
| test-acceptance-headless | ci-acceptance-test | Run Cypress tests in headless mode for CI |  |
| full-test-acceptance | ci-acceptance-test-run-all | With a single command, start both the acceptance frontend and backend acceptance server, and run Cypress tests in headless mode |  |
| start-test-acceptance-frontend-seamless | deployment-acceptance-frontend-prod-start | Start acceptance frontend in production mode for deployment |  |
| test-acceptance-seamless | deployment-acceptance-test | Start Cypress in interactive mode for tests in deployment |  |
| start-test-acceptance-web-server-seamless | deployment-acceptance-web-server-start | Start the reverse proxy (Traefik) on port 80 for deployment |  |
| full-test-acceptance-seamless | deployment-ci-acceptance-test-run-all | Run in one command the backend, frontend, and the cypress tests in headless mode for CI for deployment |  |
| start-test-acceptance-frontend-project | project-acceptance-frontend-prod-start | Start acceptance frontend in production mode for project tests |  |
| start-test-acceptance-server-coresandbox | coresandbox-acceptance-backend-start | Start backend acceptance server for core sandbox tests |  |
| start-test-acceptance-frontend-coresandbox | coresandbox-acceptance-frontend-prod-start | Start acceptance frontend in production mode for core sandbox tests |  |
| start-test-acceptance-frontend-coresandbox-dev | coresandbox-acceptance-frontend-dev-start | Start acceptance frontend in development mode for core sandbox tests |  |
| test-acceptance-coresandbox | coresandbox-acceptance-test | Start Cypress in interactive mode for core sandbox tests |  |
| test-acceptance-coresandbox-headless | coresandbox-ci-acceptance-test | Run Cypress tests in headless mode for CI for core sandbox tests |  |
| full-test-acceptance-coresandbox | coresandbox-ci-acceptance-test-run-all | With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for core sandbox tests |  |
| start-test-acceptance-server-multilingual | multilingual-acceptance-backend-start | Start backend acceptance server for multilingual tests |  |
| start-test-acceptance-frontend-multilingual | multilingual-acceptance-frontend-prod-start | Start acceptance frontend in production mode for multilingual tests |  |
| test-acceptance-multilingual | multilingual-acceptance-test | Start Cypress in interactive mode for multilingual tests |  |
| test-acceptance-multilingual-headless | multilingual-ci-acceptance-test | Run Cypress tests in headless mode for CI for multilingual tests |  |
| full-test-acceptance-multilingual | multilingual-ci-acceptance-test-run-all | With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for multilingual tests |  |
| start-test-acceptance-server-seamless-multilingual | deployment-multilingual-acceptance-backend-start | Start backend acceptance server for multilingual tests for deployment |  |
| start-test-acceptance-frontend-seamless-multilingual | deployment-multilingual-acceptance-frontend-prod-start | Start acceptance frontend in production mode for multilingual tests for deployment |  |
| test-acceptance-seamless-multilingual | deployment-multilingual-acceptance-test | Start Cypress in interactive mode for multilingual tests for deployment |  |
| test-acceptance-seamless-multilingual-headless | deployment-multilingual-ci-acceptance-test | Run Cypress tests in headless mode for CI for multilingual tests for deployment |  |
| full-test-acceptance-seamless-multilingual | deployment-multilingual-ci-acceptance-test-run-all | With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for multilingual tests for deployment |  |
| start-test-acceptance-server-workingcopy | working-copy-acceptance-backend-start | Start backend acceptance server for working copy tests |  |
| start-test-acceptance-frontend-workingcopy | working-copy-acceptance-frontend-prod-start | Start acceptance frontend in production mode for working copy tests |  |
| test-acceptance-workingcopy | working-copy-acceptance-test | Start Cypress in interactive mode for working copy tests |  |
| test-acceptance-workingcopy-headless | working-copy-ci-acceptance-test | Run Cypress tests in headless mode for CI for working copy tests |  |
| full-test-acceptance-workingcopy | working-copy-ci-acceptance-test-run-all | With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for working copy tests |  |
| start-test-acceptance-server-guillotina | guillotina-acceptance-backend-start | Start backend acceptance server for Guillotina tests |  |
| start-test-acceptance-frontend-guillotina | guillotina-acceptance-frontend-prod-start | Start acceptance frontend in production mode for Guillotina tests |  |
| test-acceptance-guillotina | guillotina-acceptance-test | Start Cypress in interactive mode for Guillotina tests |  |
| test-acceptance-guillotina-headless | guillotina-ci-acceptance-test | Run Cypress tests in headless mode for CI for Guillotina tests |  |
| full-test-acceptance-guillotina | guillotina-ci-acceptance-test-run-all | With a single command, run the backend, frontend, and the Cypress tests in headless mode for CI for Guillotina tests |  |
| start-test-acceptance-server-5 | plone5-acceptance-backend-start | Start backend acceptance server for Plone 5 tests |  |
| start-test-acceptance-server-detached | acceptance-server-detached-start | Starts test acceptance server main fixture in detached mode (daemon) |  |
| stop-test-acceptance-server-detached | acceptance-server-detached-stop | Stop test acceptance server main fixture in detached mode (daemon) |  |


The documentation has been updated as well to reflect this change.


### New image upload widget component

Previously the image upload widget component was integrated into the image block edit component.
Now the image upload widget component is its own component, and you can reuse it in other blocks.

If you shadow the image block edit component, make sure it continues to work as you expect, or update it to use the new image upload widget component.

The new image upload widget component's user experience also changed.
The input field is now a row of buttons.
The input field's placeholder text was moved above the buttons.
Together these changes improve usability both on small screens and in small containers, such as when the widget is in grid block elements.


### Renamed the `constants/Languages` module

`src/constants/Languages.js` has been renamed to `src/constants/Languages.cjs` since, in fact, it's a CommonJS module.
This change is needed for consistency with module suffixes in Volto core, in preparation for replacing Razzle with a modern builder.

The only Volto component that makes use of it is `PersonalPreferences`.
If you shadow it, then you should update this component.
For the rest, it is unlikely that your code refers to this module, since it's used internally by Volto itself.


### Renamed `test-setup-config` module

`test-setup-config.js` has been renamed to `test-setup-config.jsx` since, in fact, it contains JSX.
This change is needed for consistency with module suffixes in Volto core, in preparation for replacing Razzle with a modern builder.

It is unlikely that your code uses it, unless you heavily customized the Jest testing pipeline.


### Removed `react-share` library and `SocialSharing` component

The `react-share` library and `SocialSharing` component has not been used in the core since some time ago, and it is more suitable as an add-on and not in core.
If you still use it, you can add it to your main add-on dependency, and extract the `SocialSharing` component from Volto 17 as a custom component in your add-on code.


### Refactor of `FormValidation` module

The `packages/volto/src/helpers/FormValidation/FormValidation.jsx` module has been heavily refactored.
Some helper functions have been moved to `packages/volto/src/helpers/FormValidation/validators.ts`.
None of those functions were exported in the first place, so no imports will be broken.
If you shadowed the module {file}`packages/volto/src/helpers/FormValidation/FormValidation.jsx`, you should review it and update it accordingly.

```{seealso}
{doc}`../configuration/validation`
```

### Field validation for blocks

`BlockDataForm` component now gets a new prop `errors`.
This prop must be assigned with the new prop passed down from the blocks engine `blocksErrors`.
If not passed down, the block can't display any field validation error.

```jsx
// More component code above here

  const {
    block,
    blocksConfig,
    contentType,
    data,
    navRoot,
    onChangeBlock,
    blocksErrors,
  } = props;

return (
  <BlockDataForm
    block={block}
    schema={schema}
    title={schema.title}
    onChangeField={(id: string, value: any) => {
      onChangeBlock(block, {
        ...data,
        [id]: value,
      });
    }}
    onChangeBlock={onChangeBlock}
    formData={data}
    blocksConfig={blocksConfig}
    navRoot={navRoot}
    contentType={contentType}
    errors={blocksErrors}
  />
)
```

### `SchemaWidget` widget registration change

Previously in the widget mapping, the `SchemaWidget` was registered in the `id` object and assigned to the `schema` key.
Due to this common key name, this definition could leak the widget and be applied to unwanted fields.
The `SchemaWidget` is now registered under the `widget` object.
If you use it in your project or add-ons, you should update the field definition, and add the `widget` property.

```ts
// more form definition above...
schema: {
  title: 'Schema',
  widget: 'schema'
}
// rest of the form definition...
```

### Tags in slot

The `Tags` component has been moved to the `belowContent` slot.
It now receives the `content` property instead of the `tags` property.

### Table of Contents block markup change

The `View` component for the Table of Contents block was updated to use a `nav` element instead of a `div`.
If you've applied custom styles or shadowed this component, you might need to make adjustments.

### Update needed to project boilerplate generated with `@plone/generator-volto`

```{versionadded} Volto 18.0.0-alpha.42
Effective with Volto 18.0.0-alpha.42, a new feature introduced a breaking change in the boilerplates created using `@plone/generator-volto` 9.0.0-alpha.17 and earlier.
```

```{deprecated} Volto 18.0.0-alpha.43
The `yarn`-based generator [`@plone/generator-volto`](https://www.npmjs.com/package/@plone/generator-volto) package and project boilerplates generated from it are deprecated and will not receive any further updates.
The recommended way of generating a project boilerplate is [Cookieplone](https://github.com/plone/cookieplone).
Please update your code to use the `pnpm` based setup.
```

You need to change your {file}`razzle.config.js` file in the root of your boilerplate.

```diff
razzle.config.js
@@ -27,12 +27,14 @@ const customModifyWebpackConfig = ({
   webpackConfig,
   webpackObject,
   options,
+  paths,
 }) => {
   const config = modifyWebpackConfig({
     env: { target, dev },
     webpackConfig,
     webpackObject,
     options,
+    paths,
   });
   // add custom code here..
   return config;
```

The change involves adding a new `paths` argument to the `customModifyWebpackConfig` function.

### Added rule for ESlint to detect missing key property in iterators.

The `react/jsx-key` rule has been enabled in ESlint for catching missing `key` in JSX iterators.
You might catch some violations in your project or add-on code after running ESlint.
Adding the missing `key` property whenever the violation is reported will fix it.

### Add missing overrides to projects in `package.json`

This will fix some issues with Hot Module Reload in projects.
It's required in Volto `18.0.0-alpha.47` and later, otherwise the site breaks in development mode.
Add this object to the `pnpm` key in your project {file}`package.json`.

```json
  "pnpm": {
    "overrides": {
			"@pmmmwh/react-refresh-webpack-plugin": "^0.5.15",
			"react-refresh": "^0.14.2"
    }
  },
```

```{versionadded} Volto 18.0.0-alpha.47
```

```{versionadded} @plone/registry 3.0.0-alpha.0
```

### Deprecation notices for Volto 18

#### `@plone/generator-volto`

```{deprecated} Volto 18.0.0
```

The Node.js-based Volto project boilerplate generator is deprecated from Volto 18 onwards.
It is marked as deprecated, archived, and it won't receive any further updates.
Although you can still migrate your project to Volto 18 using this boilerplate, you should migrate to using [Cookieplone](https://github.com/plone/cookieplone).
See {ref}`upgrade-18-cookieplone-label` for details.


##### Alternative

Migrate your project to use a [Cookieplone](https://github.com/plone/cookieplone) boilerplate.

#### Volto project configurations

```{deprecated} Volto 18.0.0
```

Configuring Volto using {file}`src/config.js` at the project level is deprecated in Volto 18, and will be removed in Volto 19.

```{seealso}
See https://github.com/plone/volto/issues/6396 for details.
```

##### Alternative

You should configure your projects in a policy add-on.
You can move your project to use [Cookieplone](https://github.com/plone/cookieplone) which provides the necessary boilerplate for it.

#### Semantic UI

```{deprecated} Volto 18.0.0
```

The Semantic UI library is not maintained anymore, and will be removed in Plone 7.
You should no longer use Semantic UI in add-ons and projects.

```{seealso}
Related PLIPs:

- https://github.com/plone/volto/issues/6321
- https://github.com/plone/volto/issues/6323
```

##### Alternatives

You can use any supported component framework of your choice for implementing new components, especially in the public theme side.
If you create new widgets or components for the CMSUI—in other words, the non-public side—you should use the [`@plone/components`](https://github.com/plone/volto/tree/main/packages/components) library as an alternative.
Even though it's still in the development phase, it will be completed in the next few months, and will be supported in the future.

#### `lodash` library

```{deprecated} Volto 18.0.0
```

`lodash` is deprecated in Volto 18, and will be removed in Plone 7.

`lodash` has not received any updates since 2021.
It has performance issues from bloated bundles and it's not prepared for ESM.
Lots of `lodash` utility helpers can be replaced with vanilla ES.
These issues cause concern about its future maintainability.

In place of `lodash`, Plone 7 will use both the `lodash-es` library, which is ESM ready, and modern vanilla ES alternatives whenever possible.

##### Alternatives

```{seealso}
The following links suggest alternatives to `lodash`.

-   https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
-   https://javascript.plainenglish.io/you-dont-need-lodash-how-i-gave-up-lodash-693c8b96a07c

If you still need some of the utilities in `lodash` and cannot use vanilla ES, you can use `lodash-es` instead.
```

#### `@loadable/component` and Volto `Loadables` framework

```{deprecated} Volto 18.0.0
```

`@loadable/component` and the Volto `Loadables` framework is deprecated in Volto 18, and will be removed from Plone 7.
It's a Webpack-only library, and it does not have Vite plugin support.
Since React 18, this library is no longer necessary, as it has the initial implementation of the "concurrent mode".
React 19 will further improve it and add more features around it.

##### Alternatives

Use plain React 18 lazy load features and its idioms for lazy load components.

```jsx
const myLazyComponent = lazy(()=> import('@plone/volto/components/theme/MyLazyComponent/MyLazyComponent'))

const RandomComponent = (props) => (
    <React.Suspense>
        <MyLazyComponent />
    </React.Suspense>
)
```

There's no support for pre-loading or lazy loading entire libraries as in `@loadable/component`.
With the removal of barrel imports files, as described in the next deprecation notice, it is now unnecessary.

#### Removal of barrel import files

```{deprecated} Volto 18.0.0
```

Volto previously used barrel imports, which are centralized files where other imports are re-exported, to improve the developer user experience.
With barrel imports, a developer only needs to remember to import from the re-exported place, not the full path.

Since the barrel imports directly import all the code, a lot of imports ended up in the same main chunk of code.
It became a bad practice.
Modern bundlers, such as Vite, rely upon the import path to determine whether to bundle code together or not, reducing the bundle size.

The barrel imports must be removed to increase the natural number of chunks that Volto divides on—especially on routes—resulting in code splitting done the right and natural way.
This forces us to rewrite all the imports everywhere—including core, projects, and add-ons—once we implement it.
The barrel imports files include the following in Volto.

-   {file}`src/components/index.js`
-   {file}`src/helpers/index.js`
-   {file}`src/actions/index.js`
-   {file}`src/hooks/index.js`

They also include the following in the `@plone/volto-slate` package.

-   {file}`src/actions/index.js`
-   {file}`src/editor/ui/index.js`
-   {file}`src/utils/index.js`

##### Alternative

Implement only direct imports in code, preparing now for the upcoming change.

```diff
-import { BodyClass } from '@plone/volto/helpers';
+import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
```

Once this is implemented, a code modification will be provided for a smooth migration.


(volto-upgrade-guide-17.x.x)=

## Upgrading to Volto 17.x.x

### Ending support for Node.js 14 and 16

Long Term Support (LTS) for {term}`Node.js` 14 by the Node.js community ended in April 2023.
Long Term Support for Node.js 16 by the Node.js community ended in September 2023.
Volto 17 no longer supports Node.js 14 or 16.
Please update your projects to a supported Node.js version (18 or 20).
Version 18 is recommended, as the current LTS version of Node.js.

### Webpack 5

Volto 17 now uses Webpack 5.
If you customized `razzle.config.js` for your project to change Webpack configuration
or use Webpack plugins, you might need to make adjustments.

### Razzle upgraded to version `4.2.18`

Razzle has been upgraded to version `4.2.18`.
It is recommended that you update your project's dependency on Razzle to this version in order to avoid duplication.

### Upgraded linters, ESlint, Prettier and Stylelint

The main linters have been upgraded.
Once updated, you may find new violations in your project or add-on code.
It is recommended that you run again all the linters and fix all the violations once you update it to Volto 17.
Upgrade your local dependencies in projects and add-ons by editing your {file}`package.json` as follows:

```diff
"devDependencies": {
-    "eslint-config-prettier": "8.10.0",
+    "eslint-config-prettier": "9.0.0",
-    "eslint-plugin-prettier": "3.4.1",
+    "eslint-plugin-prettier": "5.0.0",
-    "prettier": "2.0.5",
+    "prettier": "3.0.3",
-    "stylelint": "14.0.1",
-    "stylelint-config-idiomatic-order": "8.1.0",
-    "stylelint-config-prettier": "8.0.1",
-    "stylelint-prettier": "1.1.2",
+    "stylelint": "15.10.3",
+    "stylelint-config-idiomatic-order": "9.0.0",
+    "stylelint-prettier": "4.0.2",
}
```


### TypeScript support in Volto

```{versionadded} Volto 17.0.0-alpha.27
```

We added full support of TypeScript in Volto core.

No existing code has been migrated.
You may write code in either JavaScript or TypeScript.
The choice is yours.

Previously developers had the option to support TypeScript only in their Volto add-ons.
Now it's available in Volto projects, as long as you upgrade your project dependencies.

To support TypeScript in your projects, you must update your project as follows.

Edit your {file}`package.json`:

```diff
"scripts": {
-    "lint": "./node_modules/eslint/bin/eslint.js --max-warnings=0 'src/**/*.{js,jsx}'",
-    "lint:fix": "./node_modules/eslint/bin/eslint.js --max-warnings=0 --fix 'src/**/*.{js,jsx}'",
-    "lint:ci": "./node_modules/eslint/bin/eslint.js --max-warnings=0 -f checkstyle 'src/**/*.{js,jsx}' > eslint.xml",
+    "lint": "./node_modules/eslint/bin/eslint.js --max-warnings=0 'src/**/*.{js,jsx,ts,tsx,json}'",
+    "lint:fix": "./node_modules/eslint/bin/eslint.js --fix 'src/**/*.{js,jsx,ts,tsx,json}'",
+    "lint:ci": "./node_modules/eslint/bin/eslint.js --max-warnings=0 -f checkstyle 'src/**/*.{js,jsx,ts,tsx,json}' > eslint.xml",
}
```

```diff
"devDependencies": {
+     "@plone/scripts": ^3.0.0,
+     "@typescript-eslint/eslint-plugin": "6.7.0",
+     "@typescript-eslint/parser": "6.7.0",
+     "stylelint-prettier": "1.1.2",
+     "ts-jest": "^26.4.2",
+     "ts-loader": "9.4.4",
+     "typescript": "5.2.2"
}
```

```{note}
After making this change, you might experience hoisting problems and some packages can't be found on start.
In that case, make sure you reset your `yarn.lock` by deleting it and start with a clean environment.
```

To use TypeScript in your projects, you'll need to introduce a TypeScript configuration file {file}`tsconfig.json`, and remove the existing file {file}`jsconfig.json`.
You can use the one provided by the generator as a template, or use your own:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "commonjs",
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {},
    "baseUrl": "src"
  },
  "include": ["src"],
  "exclude": [
    "node_modules",
    "build",
    "public",
    "coverage",
    "src/**/*.test.{js,jsx,ts,tsx}",
    "src/**/*.spec.{js,jsx,ts,tsx}",
    "src/**/*.stories.{js,jsx,ts,tsx}"
  ]
}
```

If you use `mrs-developer` in your project, update the command in {file}`Makefile`:

```diff
--- a/Makefile
+++ b/Makefile
preinstall: ## Preinstall task, checks if missdev (mrs-developer) is present and runs it

 .PHONY: develop
 develop: ## Runs missdev in the local project (mrs.developer.json should be present)
-       npx -p mrs-developer missdev --config=jsconfig.json --output=addons --fetch-https
+       if [ -f $$(pwd)/jsconfig.json ]; then npx -p mrs-developer missdev --config=jsconfig.json --output=addons --fetch-https; fi
+       if [ ! -f $$(pwd)/jsconfig.json ]; then npx -p mrs-developer missdev --output=addons --fetch-https; fi
```

````{note}
After editing your {file}`Makefile`, run `mrs-developer` with the following command, so the configuration gets in the right place ({file}`tsconfig.json`).
```shell
make develop
```
````

### Upgrade ESlint and use `@babel/eslint-parser`

```{versionchanged} Volto 17.0.0-alpha.27
```

ESlint uses a library to parse the language under analysis.
The one used was long deprecated and didn't supported both TypeScript and JavaScript.
We upgraded the ESlint parser to use `@babel/eslint-parser`.
This means when you upgrade your project, some new violations may appear.
Once upgraded, run the linters again to make sure that your code is free of violations.

### `BlockChooser` component now uses `popperjs` internally

Technically not a breaking, the API nor the component contract has changed, but it's worth noting this change in here.

```{versionadded} Volto 17.0.0-alpha.1
The `BlockChooser` component now uses `popperjs` library to position itself in the screen.
It spawns at the end of the body instead of inner the block that called it.
This is better from the UI point of view, since any other element can take precedence in the CSS element flow, preventing the block chooser to get overlapped by anything else.
```

If you have customized the `BlockChooser` in any way could be that this now could interact with your customizations.

### Removed `hamburgers` library

The `hamburgers` library was removed from core Volto, replaced by a much more lightweight approach.
If your theme or add-ons relied on it, add it again as a dependency in them, or adopt the CSS part that you are using in them.

### Fixed i18n script by taking into account the real add-on order

By fixing this, we may break how the locales were applied, since the order will now be correct.
Please check the translations of your project and add-ons, and verify that the translations are still correct.
This could be especially true if you did translation overrides, two add-ons were using different translations for the same `msgid`, or there were conflicting `msgid`s in different add-ons.

### Use proper heading tag (depending on the headline) in default listing template

This change fixes a bug with the accessibility in listings.

### Use `apiExpanders` to improve performance

By default, Volto is now configured to use all possible `apiExpanders` in Plone RESTAPI in order to reduce the XHR requests to only one request.

If you want to retain the old behavior (and no use `apiExpanders` at all), you need to add this configuration to your project/add-on configuration that will remove all `apiExpanders`:

```js
config.settings.apiExpanders = [];
```

### Cypress upgraded to 13.1.0

As usual in a Volto major version release, Cypress has been upgraded to the latest version to date.
We are moving from Cypress 11 to Cypress 13.
There are no major changes to the way the tests are implemented and run.

However, it could be that your Cypress boilerplate must be updated in your projects and add-ons if you use `@testing-library/cypress` in your tests.
This is due to a change in how the default commands are now built internally and in `@testing-library/cypress`.

You need to move the import:

```js
import '@testing-library/cypress/add-commands';
```

from {file}`cypress/support/commands.js` to {file}`cypress/support/e2e.js`, in case you have it in there.

This is because the overrides that `@testing-library/cypress` introduce can be run only once.
Since there are some commands that can call exports in {file}`cypress/support/commands.js`, this import may be run more than once, and then it errors.
So you have to make sure that import is run only once while the tests are run.

Check the official [Cypress Migration Guide](https://docs.cypress.io/app/references/migration-guide) for more information.

### New Image component

```{versionadded} Volto 17.0.0-alpha.21
A new image component has been added to core to render optimized images.
It requires the latest version of `plone.restapi` (>=8.42.0) installed in the backend to work properly.
```

### Removed Teaser block utils

The `utils.js` file of the Teaser block was removed because it is no longer used.
You can consider removing it if you were shadowing it in your project.

(grid-block-migration-from-kitconcept-volto-blocks-grid-label)=

### Grid block migration from `@kitconcept/volto-blocks-grid`

```{versionadded} Volto 17.0.0-alpha.16
```

```{seealso}
{doc}`../blocks/core/grid`
```

The grid block was added to Volto in version 17.0.0-alpha.16.
It is based on the `@kitconcept/volto-blocks-grid` add-on version 7.x.x.

If you previously used `@kitconcept/volto-blocks-grid` in your project based on a Volto version before 17.0.0-alpha.16, then your site will show two available block types both named `Grid`.
You need to disable one of them based on the following information.

The Volto core grid block uses the Volto default internal blocks-in-block architecture.
This differs from the grid block data structure in the add-on `@kitconcept/volto-blocks-grid`.
Because of this difference, they are not compatible, and a data migration is necessary from the add-on to the Volto grid block.
This migration is not yet available.

However, the Volto core grid block uses a different internal name, `gridBlock`, so both block types can coexist.
Nonetheless, it is recommended to enable only one grid block type for your users, and eventually use a single version to avoid unexpected behaviors and bugs.

You can disable the one you won't use with one of the following configuration settings.

```js
// This disables the `@kitconcept/volto-blocks-grid` grid block
config.blocks.blocksConfig.__grid.restricted = true;

// This disables the Volto core grid block
config.blocks.blocksConfig.gridBlock.restricted = true;
```

As long as you keep the add-on in place, your existing blocks will work as expected, even if you restrict the block.
We recommend that you disable the `@kitconcept/volto-blocks-grid` block and use the new Volto core grid block for new content.


(volto-upgrade-guide-16.x.x)=

## Upgrading to Volto 16.x.x

### `volto-slate` is now in core

From Volto 16.0.0-alpha.15 onwards, `volto-slate` is integrated into Volto core and enabled as the default text block.
The previous text block `text` based on `draftJS` is now deprecated and is restricted (hidden) in Volto bootstrap.
This is a major change and should be planned in advance before you install 16.0.0-alpha.15 or later.

```{versionadded} Volto 16.0.0-alpha.15
`volto-slate` added to Volto core as the default text block.
```

```{deprecated} Volto 16.0.0-alpha.15
`text` text block based on `draftJS` is now deprecated and will be removed from core in Volto 18.
```

```{note}
Volto 16 is the version used in Plone 6.0.x.
Volto 16 has the [same maintenance and support schedule as Plone 6.0](https://plone.org/download/release-schedule).

Although `draftJS` text block deployments are now deprecated, they are supported in Volto 16, will be supported in Volto 17, but will be removed in Volto 18.
As such, you are strongly encouraged to migrate existing sites that use `draftJS` text blocks to `slate` text blocks.

See below for more information.
```

These are the possible scenarios:

- New projects
- Existing projects, already using `volto-slate` add-on
- Existing projects using core `draftJS`, opting to continue using `draftJS`
- Existing projects using core `draftJS`, opting to start using `slate` without migrating (possible, but not recommended)
- Existing projects using core `draftJS`, opting to migrate to `slate`

#### New projects

New projects are unaffected, since they will use `slate` as the default text block from the beginning.

#### Existing projects, already using `volto-slate` add-on

For projects already using `volto-slate`, take the following steps in your project configuration:

- Remove `volto-slate` add-on from your project build dependencies.
- Add these lines to the Jest configuration in your project's `package.json`:

```diff
--- a/package.json
+++ b/package.json
@@ -57,6 +57,7 @@
       "^.+\\.js(x)?$": "babel-jest",
       "^.+\\.css$": "jest-css-modules",
       "^.+\\.scss$": "jest-css-modules",
+      "^.+\\.less$": "jest-css-modules",
       "^.+\\.(png)$": "jest-file",
       "^.+\\.(jpg)$": "jest-file",
       "^.+\\.(svg)$": "./node_modules/@plone/volto/jest-svgsystem-transform.js"
@@ -67,6 +68,7 @@
     "moduleNameMapper": {
       "@plone/volto/babel": "<rootDir>/node_modules/@plone/volto/babel",
       "@plone/volto/(.*)$": "<rootDir>/node_modules/@plone/volto/src/$1",
+      "@plone/volto-slate": "<rootDir>/node_modules/@plone/volto/packages/volto-slate/src",
```

- If any of your code depends on `volto-slate` code, update your imports by adding the namespace `@plone/` to the original `volto-slate` import.

```diff
- import { DetachedTextBlockEditor } from 'volto-slate/blocks/Text/DetachedTextBlockEditor';
+ import { DetachedTextBlockEditor } from '@plone/volto-slate/blocks/Text/DetachedTextBlockEditor';
```

(existing-projects-using-core-draftjs-opting-to-migrate-to-slate)=

#### Existing projects using core `draftJS`, opting to continue using `draftJS`

You will have to configure your project to continue using `draftJS`, for example, in your `config.js` or in your add-on:

```js
import { WysiwygWidget } from '@plone/volto/components';

config.settings.defaultBlockType = 'text'
config.blocks.blocksConfig.table.restricted = false;
config.blocks.blocksConfig.slateTable.restricted = true;
config.widgets.widget.richtext = WysiwygWidget;
```

#### Existing projects using core `draftJS`, opting to start using `slate` without migrating (possible, but not recommended)

Still a valid option, especially if you don't have the budget for it, the old content based on the legacy `text` block will be still be functional.
New text blocks in new content will be created with the new `slate` text block.

It is recommended to go the extra mile and migrate the `text` blocks to `slate` blocks for maximum future compatibility.

#### Existing projects using core `draftJS`, opting to migrate to `slate`

Use the `blocks-conversion-tool`.
See https://github.com/plone/blocks-conversion-tool for more information.

### Deprecating Node.js 12

Since April 30, 2022, Node.js 12 is out of Long Term Support by the Node.js community.
Node.js 12 is deprecated in Volto 13.
Please update your projects to a Node.js LTS version, where either 14 or 16 is supported at the moment of this writing.
Version 16 is recommended.

### Upgraded to Razzle 4

```{versionadded} Volto 16.0.0-alpha.38
Volto has upgraded from Razzle 3 to Razzle 4.
You should perform these steps in case you are upgrading to this version or above.
```

#### Steps after upgrade

A few updates may be needed in existing projects:

1.  Add the `cache` directory to `.gitignore`.
2.  If `package.json` includes scripts that run `razzle test` with the `--env=jest-environment-jsdom-sixteen` option, update them to use `--env=jsdom` instead.
3.  Update the `jest` configuration in `package.json` to replace the `jest-css-modules` transform:

    ```diff
    "jest": {
      "transform": {
    -     "^.+\\.css$": "jest-css-modules",
    -     "^.+\\.scss$": "jest-css-modules"
      },
      "moduleNameMapper": {
    +     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
      }
    }
    ```

4.  Add the option `--noninteractive` to the build script.

    ```diff
    -    "build": "razzle build",
    +    "build": "razzle build --noninteractive",
    ```

5.  If you use custom Razzle plugins, update them to use the new format with multiple functions.
    The old format still works, but is deprecated.

    ```{seealso}
    See https://razzlejs.org/docs/upgrade-guide#plugins
    ```

6.  If you have customized webpack loader configuration related to CSS, make sure it is updated to be compatible with PostCSS 8.
7.  It's recommended that you remove your existing `node_modules` and start clean.
8.  If the add-ons you are using are not yet updated to the latest `@plone/scripts`, it's also recommended that you force the version in your build, setting this in `package.json`:

    ```json
    "resolutions": {
      "**/@plone/scripts": "^2.0.0"
    }
    ```

#### Upgrade and update add-ons dependency on `@plone/scripts`

```{note}
This applies only to Volto add-ons.
```

Most probably you are using `@plone/scripts` in your add-on, since it's used in i18n messageid generation and has other add-on utilities.
When upgrading to Volto 16.0.0-alpha.38 or above, you should upgrade `@plone/scripts` to version 2.0.0 or above.
It's also recommended you move it from `dependencies` to `devDependencies`.

```diff
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
     }
   },
   "devDependencies": {
+    "@plone/scripts": "2.0.0",
     "release-it": "^14.14.2"
   },
-  "dependencies": {
-    "@plone/scripts": "*"
-  }
+  "dependencies": {}
 }
```

You should also do a final step, and change the `babel.config.js`, removing the preset from `razzle/babel` to `razzle`:

```diff
diff --git a/babel.config.js b/babel.config.js
index 2f4e1e8..51bd52b 100644
--- a/babel.config.js
+++ b/babel.config.js
@@ -1,6 +1,6 @@
 module.exports = function (api) {
   api.cache(true);
-  const presets = ['razzle/babel'];
+  const presets = ['razzle'];
   const plugins = [
     [
       'react-intl', // React Intl extractor, required for the whole i18n infrastructure to work
```

### Jest is downgraded from version 27 to 26

Razzle 4 internal API is only compatible with Jest up to version 26.

### Upgrade to use yarn 3

Volto was using the old, classic yarn (v1).
It has become quite obsolete and yarn has evolved a lot in recent years.
We updated Volto to be able to use it, however some changes have to be made in your project's configuration:

1.  Enable yarn 3 in your project, adding `.yarnrc.yml`:

    ```yaml
    defaultSemverRangePrefix: ""

    nodeLinker: node-modules
    ```

    Then, if you are using Node.js >=16.10 run:

    ```shell
    corepack enable
    yarn set version 3.2.3
    ```

    Corepack isn't included with Node.js in versions before 16.10.
    To address that, run:

    ```shell
    npm i -g corepack
    ```

    ```{important}
    It is highly recommended that you use the latest Node.js 16.
    ```

2.  Change your root project `Makefile` to include these commands:

    ```diff
    +.PHONY: install
    +install: ## Install the frontend
    +       @echo "Install frontend"
    +       $(MAKE) omelette
    +       $(MAKE) preinstall
    +       yarn install
    +
    +.PHONY: preinstall
    +preinstall: ## Preinstall task, checks if missdev (mrs-developer) is present and runs it
    +       if [ -f $$(pwd)/mrs.developer.json ]; then make develop; fi

    +
    +.PHONY: develop
    +develop: ## Runs missdev in the local project (mrs.developer.json should be present)
    +       npx -p mrs-developer missdev --config=jsconfig.json --output=addons --fetch-https
    +
    +.PHONY: omelette
    +omelette: ## Creates the omelette folder that contains a link to the installed version of Volto (a softlink pointing to node_modules/@plone/volto)
    +       if [ ! -d omelette ]; then ln -sf node_modules/@plone/volto omelette; fi
    +
    +.PHONY: patches
    +patches:
    +       /bin/bash patches/patchit.sh > /dev/null 2>&1 ||true
    ```

    You can copy the file over to your project if you have not made any amendment to it.

3.  Change your `package.json` scripts section:

    ```diff
      "version": "1.0.0",
      "scripts": {
        "start": "razzle start",
    -    "preinstall": "if [ -f $(pwd)/mrs.developer.json ]; then if [ -f $(pwd)/node_modules/.bin/missdev ]; then yarn develop; else yarn develop:npx; fi; fi",
    -    "omelette": "if [ ! -d omelette ]; then ln -sf node_modules/@plone/volto omelette; fi",
    -    "patches": "/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true",
    -    "postinstall": "yarn omelette && yarn patches",
    +    "postinstall": "make omelette && make patches",
    -    "patches": "/bin/bash patches/patchit.sh > /dev/null 2>&1 ||true",
    ```

    Yarn 3 no longer supports inline bash scripts in the `scripts` section.
    It does not support the `preinstall` lifecycle state, so we cannot trigger things while we run `yarn install` or just `yarn`.
    As a result, we moved all the commands related to the `preinstall` actions into `Makefile`, then updated the calls in both files as shown above.

    ````{important}
    After making the changes in this step, we will have to modify our development workflow, especially if we use actions that happened during the `preinstall` state.
    The most relevant one is updating the code that is managed by `mrs-developer`.
    If you follow the code above, you'll need to call these `Makefile` commands before each `yarn install`.
    It's recommended to use the `make install` command instead of just `yarn` or `yarn install`.

    ```shell
    make install
    ```

    Remember to update your CI scripts accordingly.
    ````

4.  Yarn 3 does not allow the use of commands not declared as direct dependencies.
    In your project, you should add `razzle` and `@plone/scripts` as development dependencies:

    ```diff
    devDependencies: {
    +        "@plone/scripts": "^2.1.2",
    +        "razzle": "4.2.17",
    ```

5.  Replace your project `yarn.lock` with Volto's, then run `yarn` again.

### Removed `date-fns` from build

The `date-fns` library has been removed from Volto's dependencies.
It was in the build because `Cypress` depended on it.
After `Cypress` was upgraded, it no longer depends on `date-fns`.
If your project still depends on `date-fns`, add it as a dependency of your project.

````{warning}
The `date-fns` version present in the build was quite old (1.x.x series).
Beware when using an updated version (2.x.x), as it may contain some breaking changes.


```{seealso}
https://dockyard.com/blog/2020/02/14/you-probably-don-t-need-moment-js-anymore
```

If you need to format dates in Volto, it's recommended to use the `FormattedDate` component in Volto core.
It uses modern recommendations for date formatting on the web.
````

### Upgraded core to use Cypress 11

Cypress has overhauled their testing application, beginning with Cypress 10.
It now includes native support of Apple silicon chip computers.
This dramatically improved the launch and test times on those machines.
It also includes the new "component" testing feature that might be appealing in the near future.

The only drawback is that they also overhauled the configuration, forcing migration from old configuration based on JSON files to a better JavaScript-based one.
They also changed and renamed some options.
Luckily, Cypress provides both good reporting when an old configuration is in place, and an interactive migration wizard.

Core configuration has been updated to use Cypress 11.
You will need to update your Cypress configuration from versions older than Cypress 10 if you want to use core's Cypress 11.
If you have already updated your configuration to use Cypress 10 or later in a previous upgrade, your configuration might already work with Cypress 11.
It is possible that forcing your project to use older versions might still work with old configurations.

```{seealso}
See https://docs.cypress.io/app/references/migration-guide#Migrating-to-Cypress-100 for more information.
```

### The complete configuration registry is passed to the add-ons and the project configuration pipeline

The core in versions prior to Volto 16.0.0-alpha.22 passed a simplified version of the configuration registry—in fact, a plain object primitive—to the add-on list and project configuration pipeline.

From Volto 16.0.0-alpha.22 onwards, the full configuration registry is passed through the pipeline.
This allows you to have access to the advanced registry features, like the new component registry.
You may want to update your configuration in case you updated the primitive using basic object operators (spread, and others) in the configuration object itself.
For example, this will not work anymore:

```js
return {
  ...config,
  blocks: {
    ...config.blocks,
    blocksConfig: {
      ...config.blocks.blocksConfig,
      ...addonBlocks,
      listing: listing(config),
    },
  },
  views: {
    ...config.views,
    contentTypesViews: {
      ...config.views.contentTypesViews,
      Folder: NewsAndEvents,
    },
  },
};
```

Using the spread operator while you mutate the configuration object is not required.
You can mutate the object properties directly, like:

```js
const applyConfig = (config) => {
  config.blocks.blocksConfig.testBlock = testBlock;
  config.blocks.blocksConfig.listing = listing(config);
  config.views.contentTypesViews.Folder = NewsAndEvents;

  return config;
};
```

The other rules apply, so make sure you return the `config` object after mutating it.

### Refactor the component registry API in the configuration registry

After a period of testing, this experimental feature has been refactored to adequate existing requirements.

#### Renamed `registry.resolve` to `registry.getComponent`

```diff
- registry.resolve(componentName)?.component;
+ registry.getComponent(componentName)?.component;
```

#### `registry.getComponent` signature changes

It maintains signature compatibility with `registry.resolve`, but introduces new arguments for greater flexibility.

See documentation for more information.

````{versionchanged} Volto 16.0.0-alpha.23
The `component` argument changed in 16.0.0-alpha.23.
The `component` key has been flattened for simplification and now it's mapped directly to the `component` argument of `registerComponent`:

```js
config.registerComponent({
    name: 'Teaser',
    component: MyTeaserDefaultComponent,
  });
```
````

### Main workflow change menu changed from Pastanaga UI simplification to Classic UI Plone implementation

Pastanaga UI envisioned a simplification of the classic Plone workflow change dropdown.
The transition names were too cryptic, and it was difficult to infer the destination state from them.
This simplification was meant to show the destination state as a transition name, simplifying the user experience.

This vision was partially implemented in Volto, bypassing the information coming from Plone, waiting for the next step: introduce this vision in Plone core (thus, change the workflow definitions) including this simplified mode, but maintaining the complete mode with the full transition names.

Since this never happened, we are going back to the Classic UI mode, so the dropdown will show the transition names.
When the simplified vision is implemented, we will revisit it.

#### Move Layout constants to `config.views.layoutViewsNamesMapping`.

The `constants` layout module was removed in favor of an object in the configuration registry, `config.views.layoutViewsNamesMapping`.

If you added or modified the Plone layout views literal mapping, you should now use this setting, and you can remove the module shadowing customization.

You can now add an i18n `id` for any layout that you create as well, since the `Display` component is now i18n aware.

This is the structure of `config.views.layoutViewsNamesMapping`:

```js
export const layoutViewsNamesMapping = {
  album_view: 'Album view',
  event_listing: 'Event listing',
  full_view: 'All content',
  listing_view: 'Listing view',
  summary_view: 'Summary view',
  tabular_view: 'Tabular view',
  layout_view: 'Mosaic layout',
  document_view: 'Document view',
  folder_listing: 'Folder listing',
  newsitem_view: 'News item view',
  link_redirect_view: 'Link redirect view',
  file_view: 'File view',
  image_view: 'Image view',
  event_view: 'Event view',
  view: 'Default view',
};
```

The keys are the name of the Plone layout, and the values are the i18n `id` (English as default message).

Then you can add the i18n message in your project's `src/config.js` or your add-on's `src/index.js`:

```js
import { defineMessages } from 'react-intl';
defineMessages({
  album_view: {
    id: 'Album view',
    defaultMessage: 'Album view',
  },
})
```

### `react-window` is no longer a Volto dependency

Volto used this library to generate dynamic "windowed/virtualized" select widget options.
It moved to use `react-virtualized` instead of `react-window` because it provides a broader feature set that Volto requires.
If you were using it in your project, you will need to include it as a direct dependency from now on.

### Change the way the style wrapper is enabled and how to add the `styles` field

During the alpha stage, we received feedback and determined that it's too difficult to deal with a separate way to define (and extend) the styles schema.
We decided it is best to deal with it as any other schema field and enhance it via schema enhancers.
This improves the developer experience, especially when dealing with variations that can provide their own styles and other schema fields.

```{deprecated} Volto 16.0.0-alpha.46
The options `enableStyling` and `stylesSchema` no longer work.
You need to provide them using your own block schema.
If you are extending an existing one, you should add it as a normal `schemaEnhancer` modification.
```

```{seealso}
See https://6.docs.plone.org/volto/blocks/block-style-wrapper.html for more documentation.
```

### Sentry integration moved from Volto core to add-on

The Sentry integration was implemented in Volto core at a time when Volto did not provide a good add-on story.
Since then, the add-on story has improved.
It now makes sense to extract this feature into its own add-on.
Integrate Sentry in your app with [`@plone-collective/volto-sentry`](https://www.npmjs.com/package/@plone-collective/volto-sentry).

```{versionchanged} Volto 16.0.0.alpha.45
```

### Upgrade `husky` to latest version

In case you use `husky` in your projects (like Volto does), you must adapt to the new way that `husky` defines {term}`hooks`.

You will have to add a script in your `package.json` file called `prepare`:

```diff
     "build": "razzle build --noninteractive",
+    "prepare": "husky install",
     "test": "razzle test --maxWorkers=50%",
```

After executing it, `husky` will install itself in the `.husky` folder of your project.
Then you need to create the default hook scripts in `.husky` that you want to execute.
You can copy over the Volto ones (take a look in Volto's `.husky` folder).

### Better defaults handling

````{versionadded} Volto 16.0.0-alpha.51
Prior to this version, we handled default values in schemas for blocks settings in a faulty and buggy manner.
The state inferred was not deterministic and depended on the fields with defaults present.

To correct this and allow Volto to handle defaults in a correct way, we have to pass down an additional prop to the `BlockDataForm` whenever we use it in our custom or add-on code, as in the following example.

```{code-block} jsx
:linenos:
:emphasize-lines: 10

  <BlockDataForm
    schema={schema}
    title={schema.title}
    onChangeField={(id, value) => {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        [id]: value,
      });
    }}
    onChangeBlock={onChangeBlock}
    formData={this.props.data}
    block={block}
  />
```
````


(volto-upgrade-guide-15.x.x)=

## Upgrading to Volto 15.x.x

### Updated react-cookie library

This fixes a use case where cookies could potentially be messed up if your site is under heavy load.
The old `react-cookie` library was not able to handle correctly the {term}`SSR` part, specially the one that
is shared in "Nobody's land" (not SSR, not under the React tree, actions, {term}`Redux middleware`).
Upgrading to the latest version of the `react-cookie` suite (`react-cookie`, `universal-cookie-express` and `universal-cookie`) will fix it.

You have to take action only in case you did some development involving cookies. The `react-cookie`
library has been updated to the latest version and its companion libraries
(`universal-cookie-express` and `universal-cookie`), and the API changed over the years. Please look into the documentation of these packages to get a grasp on the changes:

https://www.npmjs.com/package/react-cookie

https://www.npmjs.com/package/universal-cookie-express

https://www.npmjs.com/package/universal-cookie

### Update your Rich Text Editor configuration

DraftJS libraries are now lazy-loaded, and some changes have been introduced in the way that the rich text editor is bootstrapped. In case you have extended the rich text editor configuration in your projects you have to update your `src/config.js`:

The old way:

```js
export default function applyConfig(config) {
  config.settings = {
    ...config.settings,
    listBlockTypes = [
      ...config.settings.listBlockTypes,
      'my-list-item',
    ]
  }
  return config;
}

```

The new way:

```js
export default function applyConfig(config) {
  const { richtextEditorSettings } = config.settings;
  config.settings.richtextEditorSettings = (props) => {
    const result = richtextEditorSettings(props);
    result.listBlockTypes = [...result.listBlockTypes, 'my-list-item']
    return result;
  }
  return config;
}
```

### Language Switcher no longer takes care of the sync of the language

This responsibility has been transferred in full to the API {term}`Redux middleware`, if you have shadowed either `LanguageSwitcher` or `MultilingualRedirector` (during the alpha phase) components, please update them.
Not doing so won't break your project, but they won't get the latest features and bug fixes, and probably will update the language cookie twice.

### LinkView component markup change

The `LinkView` component with the literal `The link address is: <the link>` is now wrapped in a `<p>` block instead of a `<span>` block.
Please check if you have a CSS bound to that node and adjust accordingly.

### Rename core-sandbox fixture to coresandbox

Only applying to Volto core development, for the sake of consistency with the other fixtures, `core-sandbox` fixture it's been renamed to `coresandbox` in all scripts and related file paths and filenames.

### Extend the original intent and rename `RAZZLE_TESTING_ADDONS` to `ADDONS`

Originally the `RAZZLE_TESTING_ADDONS` environment variable was an escape hatch to load some components and configurations not present in vanilla Volto.
One could enable them at will.
Initially thought as fixtures for acceptance tests, the original intent has been repurposed and extended to just `ADDONS`.
One could extend the `ADDONS` list configuration via this environment variable.

It works for published packages, such as those add-ons that live in the `packages` folder locally to your project.
This is similar to the testing add-ons from vanilla Volto.

### Remove and deprecate `lang` cookie

Initially, Volto used a `lang` named cookie to keep track of the current language. However, Plone was using a cookie named `I18N_LANGUAGE` for the same purpose, we updated Volto to use both at some point. We decided to deprecate the `lang` one in favor of the used in Plone core. If someone relied on this cookie for some reason or feature, should change to use `I18N_LANGUAGE` instead.

### Use `@root` alias instead of `~`

A new `@root` alias has been set up to replace the `~` alias.
Support for the `~` alias is still in place, but we now mark it as deprecated.
The use of `~` will be removed in Volto 16.

```{deprecated} Volto 15.0
```

## Upgrading to Volto 14.x.x

### Revisited, rethought and refactored seamless mode

Seamless mode was released as experimental in Volto 13. However, after a period of testing some issues were detected so the feature has been rethought and refactored.

If you want to take full advantage of seamless mode you should upgrade your backend to the latest `plone.restapi` (8.12.1 or greater) and `plone.rest` (2.0.0a1 or greater) versions.

If you were already using Seamless mode in your deployments, you should update them as explained in the deployment documentation (link just below).

```{warning}
The proxy in development mode will only work using the new traversal `++api++`. You need to upgrade your development environment to include the requirements explained above.
```

Read the full documentation about Seamless mode: {doc}`../deploying/seamless-mode`.

### Update i18n configuration for projects and add-ons

The i18n script and infrastructure have been moved to their own package since we needed them
to be independent of Volto itself.
This was necessary for being able to use them from the
add-ons without having to install the whole Volto package (which is not possible).

`@plone/scripts` package is the placeholder of the script, which has also been improved
alongside the infrastructure (Babel config) for it to run.

**Steps for migration**:

#### Projects

In a project's `package.json` replace the `scripts` `i18n` line with this one:

```diff
   "scripts": {
-    "i18n": "NODE_ENV=production node src/i18n.js"
+    "i18n": "rm -rf build/messages && NODE_ENV=production i18n"
+  },
```

#### Add-ons

If you are an add-on maintainer, remove the `src/i18n.js` script, since it's useless.
Within the `scripts` section of `package.json` apply the following change:

```diff
   "scripts": {
-    "i18n": "NODE_ENV=production node node_modules/@plone/volto/src/i18n.js",
+    "i18n": "rm -rf build/messages && NODE_ENV=production i18n --addon",
```


afterwards add this to the `dependencies` list:

```diff
+  "dependencies": {
+    "@plone/scripts": "*"
   }
```

Apply the following diff to your add-on's `babel.config.js`:

```diff
-module.exports = require('@plone/volto/babel');
+module.exports = function (api) {
+  api.cache(true);
+  const presets = ['razzle/babel'];
+  const plugins = [
+    [
+      'react-intl', // React Intl extractor, required for the whole i18n infrastructure to work
+      {
+        messagesDir: './build/messages/',
+      },
+    ],
+  ];
+
+  return {
+    plugins,
+    presets,
+  };
+};
```

```{note}
For convenience the `i18n` script is now an executable in the Node.js environment.
```

### Removal of the old configuration system based on imports

As announced in the deprecation notice in Volto 12 release, from Volto 14 onwards, the old
configuration system based on imports will stop working. Migrate your Volto configuration
for your projects before upgrading to Volto 14.

More information: :ref:`frontend-upgrade-guide-volto-configuration-registry-label`.

### Content locking

Not really a breaking change, but it's worth noting it. By default, Volto 14 comes with
{doc}`../configuration/locking` enabled, if the backend supports it. Thus:

- Upgrade Plone RestAPI
  - `plone.restapi`>=`8.9.0` (Plone 5+)
  - `plone.restapi`>=`7.4.0` (Plone 4)
- Update `plone:CORSPolicy` to include `Lock-Token` within `allow_headers`:

```xml
  <plone:CORSPolicy
    allow_origin="http://localhost:3000,http://127.0.0.1:3000"
    allow_methods="DELETE,GET,OPTIONS,PATCH,POST,PUT"
    allow_credentials="true"
    expose_headers="Content-Length,X-My-Header"
    allow_headers="Accept,Authorization,Content-Type,X-Custom-Header,Origin,Lock-Token"
    max_age="3600"
    />
```

### Blocks chooser now uses the title instead of the id of the block as translation source

The `BlockChooser` component now uses the `title` of the block as source for translating
the block title. Before, it took the `id` of the block, which is utterly wrong and misleading. There is a chance that this change will trigger untranslated blocks titles in your projects and add-ons.

### Variation field now uses the title instead of the id of the variation as translation source

Following the same convention as the above change, `Variation` field coming from the block enhancers now uses the `title` of the block as source for translating
the variation title. Before, it took the `id` of the block, which as stated before, is wrong and misleading. There is a chance that  this change will trigger untranslated variation titles in your projects and add-ons.

### Listing block no longer retrieve fullobjects by default

The query used by the listing block always used the `fullobjects` flag, which fully serialized (and thus, wake from the db) the resultant response items. This was causing performance issues. From Volto 14, the results will get the normal catalog query metadata results. You'll need to adapt your code to get the appropriate data if required and/or use the metadata counterparts. If your custom code depends on this behavior and you don't have time to adapt now, there's a scape hatch: set an additional `fullobjects` key to `true` per variation in the variation of the listing block config object:

```js
    variations: [
      {
        id: 'default',
        isDefault: true,
        title: 'Default',
        template: DefaultListingBlockTemplate,
        fullobjects: true
      },
    ]
```

```{note}
This feature needs at least `plone.restapi >= 8.13.0` and `plone.volto 3.1a4`. You need to update the catalog from your existing objects in your database, if you have already a production site in place, in order to have the new metadata filled in the catalog.
```

### New mobile navigation menu

The mobile navigation menu has been improved using a customizable `CSSTransition` group animation. It is a breaking change since this change introduces new classes and HTML to accomplish it. A new `NavItems` helper (presentational) component has been introduced as well. However, the API of the component hasn't changed so your customizations/shadowed components (if any) are safe. If you want to use the new stock menu and interaction, and you have customizations/shadowed components, you need to update them using the stock one.

### Adjusted main Logo component styling

In order to match the Plone logo and in lieu to use a better generic icon starting point, the `Logo.jsx` component and `.logo-nav-wrapper` styling have been adjusted. The logo is not constrained by default to `64px` and the wrapper now centers vertically. Please check that your project logo placeholder is still in good shape after upgrade.

### Move `theme.js` import to top of the client code

This is not a strict breaking change, but it's worth mentioning it as it might be important to keep in mind, especially if you are using inline CSS imports in your code, it might change your CSS cascade apply order. However, if you use the theme approach adding `custom.overrides`/`custom.less` files, you are good to go since they are applied in the same batch.

### `getVocabulary` action changed its signature

The `getVocabulary` action has changed API. Before, it used separate positional arguments, but now it uses named arguments by passing a single object as the argument.  You'll have to adjust any call you do if you are using this action in custom code to the new API.

## Upgrading to Volto 13.x.x

### Deprecating Node.js 10

Since April 30th, 2021 Node.js 10 is out of Long Term Support by the Node.js community, so
we are deprecating it in Volto 13. Please update your projects to a Node.js LTS version
(12 or 14 at the moment of this writing).

### Seamless mode is the default in development mode

Not really a breaking change, but it's worth noting it. By default, Volto 13 in
development mode uses the internal proxy in seamless mode otherwise configured
differently. To learn more about the seamless mode read: {doc}`../deploying/seamless-mode`
and {doc}`../configuration/zero-config-builds`.

### Refactored Listing block using schemas and ObjectWidget

The Listing block has been heavily refactored using schema forms and `BlockDataForm`
as well as the other new internal artifacts to leverage blocks variations and extensions at the same time
simplifying it.

Furthermore, the "More..." link it's now opt-in, instead of always-in. If your
projects rely on it, you should set the block setting
`config.blocks.blocksConfig.listing.showLinkMore` to `true`.

The advantage of this is that now you can use the `QuerystringWidget` with schema based
data forms in a reusable way in your custom blocks. See the Listing block code for
further references.

#### Migrate your existing listing blocks

**(Updated: 2021/06/12)** If you have an existing Volto installation and you are using
listing blocks, you must run an upgrade step in order to match the new listing
internals. You can find this upgrade step in the `plone.volto` package. You can run
the step from there if you have installed `plone.volto` in your project, it's named
`Migrate listing blocks from Volto 12 to Volto 13`. You can find it in the `Add-ons`
control panel. Alternatively, you can transfer it to your own integration packages and
run it from there.

https://github.com/plone/plone.volto/blob/6f5382c74f668935527e962490b81cb72bf3bc94/src/kitconcept/volto/upgrades.py#L6-L54

```python
def from12to13_migrate_listings(context):
    def migrate_listing(originBlocks):
        blocks = deepcopy(originBlocks)
        for blockid in blocks:
            block = blocks[blockid]
            if block["@type"] == "listing":
                if block.get("template", False) and not block.get("variation", False):
                    block["variation"] = block["template"]
                    del block["template"]
                if block.get("template", False) and block.get("variation", False):
                    del block["template"]

                # Migrate to internal structure
                if not block.get("querystring", False):
                    # Creates if it is not created
                    block["querystring"] = {}
                if block.get("query", False) or block.get("query") == []:
                    block["querystring"]["query"] = block["query"]
                    del block["query"]
                if block.get("sort_on", False):
                    block["querystring"]["sort_on"] = block["sort_on"]
                    del block["sort_on"]
                if block.get("sort_order", False):
                    block["querystring"]["sort_order"] = block["sort_order"]
                    if isinstance(block["sort_order"], bool):
                        block["querystring"]["sort_order"] = (
                            "descending" if block["sort_order"] else "ascending"
                        )
                    else:
                        block["querystring"]["sort_order"] = block["sort_order"]
                    block["querystring"]["sort_order_boolean"] = (
                        True
                        if block["sort_order"] == "descending" or block["sort_order"]
                        else False
                    )
                    del block["sort_order"]
                if block.get("limit", False):
                    block["querystring"]["limit"] = block["limit"]
                    del block["limit"]
                if block.get("batch_size", False):
                    block["querystring"]["batch_size"] = block["batch_size"]
                    del block["batch_size"]
                if block.get("depth", False):
                    block["querystring"]["depth"] = block["depth"]
                    del block["depth"]

                # batch_size to b_size, idempotent
                if block["querystring"].get("batch_size", False):
                    block["querystring"]["b_size"] = block["querystring"]["batch_size"]
                    del block["querystring"]["batch_size"]

                print(f"Migrated listing in {obj.absolute_url()}")

        return blocks

    pc = api.portal.get_tool("portal_catalog")
    for brain in pc.unrestrictedSearchResults(object_provides=IBlocks.__identifier__):
        obj = brain.getObject()
        obj.blocks = migrate_listing(obj.blocks)
```

If you have trouble configuring the upgrade step in your own package, you can take a
look and configure it as in `plone.volto` as shown in this PR:
https://github.com/kitconcept/kitconcept.volto/pull/29

```{note}
When an official integration package exists, these upgrade steps in the backend
will be provided in there.
```

#### Update your custom variations (templates) in your project listing blocks

In the case that you have custom templates for your listing blocks in your projects, it's required that you update the definitions to match the new core variations syntax.

Going from this:

```js
config.blocks.blocksConfig.listing.templates = {
  ...config.blocks.blocksConfig.listing.templates,
  mycustomvariationid: {
    label: 'My custom listing variation',
    template: MyCustomListingBlockTemplate,
  }
}
```

To this:

```js
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'mycustomvariationid',
      isDefault: false,
      title: 'My custom listing variation',
      template: MyCustomListingBlockTemplate,
    }
  ]
```

### Control panel icons are now SVG based instead of font based

It was long due, the control panel overview route `/controlpanel` is now using SVG icons
from the Pastanaga icon set, instead of the deprecated font ones. If you have customized
or created a control panel and you are using it in Volto, you should update it and use
the config registry setting: `controlPanelsIcons` and add the name of your control panel and the related SVG like:

```js
import myfancyiconSVG from '@plone/volto/icons/myfancyicon.svg';
import config from '@plone/volto/registry'

config.settings.controlPanelsIcons.mynewcontrolpanelid = myfancyiconSVG;
```

### Login form UI and accessibility updated

Not really a breaking change, but it's worth to note that we changed the look and feel of
the login form and improved its usability and accessibility. Another move towards the new
Quanta look and feel.

### Changes in the Table block feature set and messages

The "inverted" option in Table Block was removed since it was useless with the current
CSS set. Better naming of options and labels in table block (English). Updating the i18n
messages for the used translations is advisable, but not required.

## Upgrading to Volto 12.x.x


(frontend-upgrade-guide-volto-configuration-registry-label)=

### Volto configuration registry

The configuration object in Volto is located in the `~/config` module and uses it as
container of Volto's config taking advantage of the ES6 module system. So we "import"
the config every time we need it, then the exported config data in that module
"magically" is there whenever we want to access to it.

It's been a while since we were experiencing undesired side effects from "circular import
dependency" problems in Volto, due to the very nature of the solution (importing the
`~/config`). Although they aren't very noticeable, they are there, waiting to bite
us. In fact, circular dependencies are common in Node.js world, and the very nature of
how it works make them "workable" thanks to the Node.js own import resolution algorithm.
So the "build" always works, although we have the circular dependencies, but that leads to weird problems
like (just to mention one of them) the {term}`hot module replacement` (HMR) not working properly.

That's why in this version we are introducing the new Volto's Configuration Registry.
It's a centralized singleton that is populated from the core config module and can be
modified by the add-ons and the project itself. The code, instead of using imports to get
it, imports the singleton and then access the proper registry key inside it (`settings`,
`blocks`, `views`, etc...)

### Changes in your code (and local customizations)

This was the old way:
```js
import { settings } from '~/config'
...

console.log(settings.apiPath)
...
```

and this is the new way:

```js
import config from '@plone/volto/registry'
...

console.log(config.settings.apiPath)
...
```

```{important}
The old way of using the import to get Volto's configuration will still be working as
long as you support it in your project `src/config` but it will be deprecated and
will stop working from *Volto 14* onwards.

It is *highly* advisable that you use the new configuration registry right away. Your
custom code (and Volto customizations using the shadowing engine) has to adapt to the
new way of reading the config from the new Volto's Configuration. However, it won't be
mandatory until Volto 14, leaving the community time to adapt their code and projects.
```

````{tip}
If you are an add-on maintainer, and you migrate your add-on to be Volto 12 compatible,
it's recommended that you add it as `peerDependencies` for Volto 12.

```json
  "peerDependencies": {
    "@plone/volto": ">=12.0.0"
  }
```
````

#### Changes in your project's `routes` module

```diff
--- a/src/routes.js
+++ b/src/routes.js
@@ -5,7 +5,7 @@

 import { App } from '@plone/volto/components';
 import { defaultRoutes } from '@plone/volto/routes';
-import { addonRoutes } from '~/config';
+import config from '@plone/volto/registry';

 /**
  * Routes array.
@@ -18,7 +18,7 @@ const routes = [
     component: App, // Change this if you want a different component
     routes: [
       // Add your routes here
-      ...(addonRoutes || []),
+      ...(config.addonRoutes || []),
       ...defaultRoutes,
     ],
   },
```

#### Changes in your project's `config` module

Remove the imports and the exports in your `src/config.js`:

```diff
--- a/src/config.js
+++ b/src/config.js
@@ -12,30 +12,11 @@
  * }
  */

-import {
-  settings as defaultSettings,
-  views as defaultViews,
-  widgets as defaultWidgets,
-  blocks as defaultBlocks,
-  addonReducers as defaultAddonReducers,
-  addonRoutes as defaultAddonRoutes,
-} from '@plone/volto/config';
+import '@plone/volto/config';

-export const settings = {
-  ...defaultSettings,
-};
-
-export const views = {
-  ...defaultViews,
-};
-
-export const widgets = {
-  ...defaultWidgets,
-};
-
-export const blocks = {
-  ...defaultBlocks,
-};
-
-export const addonRoutes = [...defaultAddonRoutes];
-export const addonReducers = { ...defaultAddonReducers };
```

notice from the diff, that you must add this import *AFTER* all your imports:

```js
// All your imports required for the config here BEFORE this line
import '@plone/volto/config';
```

Then add this function as default export at the end of your `src/config.js` module:

```js
export default function applyConfig(config) {
  // Add here your project config
  return config;
}
```

It has the same signature, and it's used like the `applyConfig()` function in `index.js`
module add-ons. You should place your project's configuration here and mutate the config
like you would do it in add-ons.

Let's show it in an example. Let's say you have this config in your project's `src/config` module:

```js
export const settings = {
  ...defaultSettings,
  navDepth: 3,
};
```

then you'll add the `applyConfig()` function as default export and copy that settings key in it:

```js
export default function applyConfig(config) {
  config.settings = {
    ...config.settings,
    navDepth: 3,
  };
  return config;
}
```

```{warning}
The add-ons you might be using might need to migrate to use the new
configuration registry too. Make sure all of them are already migrated to Volto 12.

```{tip}
Although this might be daunting, the migration is quite straightforward, and the refactoring
of the required code can be undergone through a series of "search and replace" in your IDE of choice.
```

#### Changes in your project's `package.json`

You need to update the `setupFiles` key of your `jest` configuration:

```diff
     "setupFiles": [
-      "@plone/volto/test-setup.js"
+      "@plone/volto/test-setup-globals.js",
+      "@plone/volto/test-setup-config.js"
     ],
```

#### Changes in snapshots tests in your project

Please note that your tests' snapshots will also change because of the new testing mocks
(in widgets, blocks and in views). You should review them, make sure that the mocks are
there instead of the real mocked components and accept them.

### Alternative - both configurations coexisting

```{warning}
This configuration is *not recommended* and might lead to inconsistencies and has been tested
only partially and can you can find unseen problems. This method is only a workaround in case the
add-ons you are using are not yet migrated, or you can't migrate your code. And in
any case, as stated above, it will be deprecated and will stop working in Volto 14.
```

Make the following changes to your `src/config.js`, first remove the main imports, and add
the import to the new config registry:

```diff
-import {
-  settings as defaultSettings,
-  views as defaultViews,
-  widgets as defaultWidgets,
-  blocks as defaultBlocks,
-  addonReducers as defaultAddonReducers,
-  addonRoutes as defaultAddonRoutes,
-} from '@plone/volto/config';
+import ConfigRegistry from '@plone/volto/registry';
```

then *after the last existing import* in your existing `src/config.js` add:

```js
import * as voltoDefaultConfig from '@plone/volto/config';
```

Remove all the default exports, but save your config for later use:

```diff
-export const settings = {
-  ...defaultSettings,
-};
-
-export const views = {
-  ...defaultViews,
-};
-
-export const widgets = {
-  ...defaultWidgets,
-};
-
-export const blocks = {
-  ...defaultBlocks,
-};
-
-export const addonRoutes = [...defaultAddonRoutes];
-export const addonReducers = { ...defaultAddonReducers };
```

showing in the diff the default ones, you should have your configuration inside those, like:

```js
export const settings = {
  ...defaultSettings,
  navDepth: 3,
};
```

At the end of your `src/config.js`:

```diff
+const localconfig = {
+  ...voltoDefaultConfig,
+};
+
+const applyLocalConfig = applyConfig(localconfig);
+
+ConfigRegistry.settings = applyLocalConfig.settings;
+ConfigRegistry.blocks = applyLocalConfig.blocks;
+ConfigRegistry.views = applyLocalConfig.views;
+ConfigRegistry.widgets = applyLocalConfig.widgets;
+ConfigRegistry.addonRoutes = applyLocalConfig.addonRoutes;
+ConfigRegistry.addonReducers = applyLocalConfig.addonReducers;
+
+export const settings = applyLocalConfig.settings;
+export const blocks = applyLocalConfig.blocks;
+export const views = applyLocalConfig.views;
+export const widgets = applyLocalConfig.widgets;
+export const addonRoutes = applyLocalConfig.addonRoutes;
+export const addonReducers = applyLocalConfig.addonReducers;
```

Migrate your config to the new config registry style, **but not** as a default export, at
the end of `src/config.js`:

```diff
+function applyConfig(config) {
+  config.settings = {
+    ...config.settings,
+    navDepth: 3,
+  };
```

```{note}
Although you can keep both ways of using Volto's config it is
recommended you use the new registry based configuration as soon as possible, as we
discourage you to continue using the old way.
```

## Upgrading to Volto 11.x.x

### AlignBlock component new placement and import path

Due to problems with circular dependencies, the `AlignBlock` was moved to helpers and used from there.
Unfortunately, it was proven to be worse overall. We moved it (with a known workaround) to its rightful place again.

If your code is importing it from helpers, you should update it to the new path:

```diff
- import { AlignBlock } from '@plone/volto/helpers';
+ import AlignBlock from '@plone/volto/components/manage/Sidebar/AlignBlock';
```

### id is removed from FormFieldWrapper

We have removed the id from the FormFieldWrapper because it coincides with the label id if we don't provide the fieldset.

If you have cypress tests which depends on this id then just remove the id from the test and if the test fails then just add `.react-select-container` instead of your id. See https://github.com/plone/volto/pull/2102 for more details.

### New Default Listing Template

```{note}
If you have customized the default listing template this change possibly does not have an effect on your project.
```

The default Template for the Listing Block now no longer contains an image. The old default Template has been renamed to "Summary". This will lead to every Listing Block in your Project that uses the default Template to now use the new default Template, and thus, no longer showing the image.

To resolve this you can change the template of the affected Listing Blocks either manually or by writing a backend script for that.

## Upgrading to Volto 10.x.x

### Remove the Razzle plugins patch

```{warning}
If you haven't upgraded your project to Volto 9.x.x and followed the upgrade guide
instructions, you are set, and you do not need to do anything.

In order to have support for Razzle plugins as local modules we introduced a patch in
9.0.0 that addressed the lack of support in Razzle 3.3.7 . Unfortunately, not only did that
introduced more headaches than benefits, but inadvertently we introduced a bug on the
patch. We've found a workaround to still support plugins as local modules without
patching Razzle, however that forces you to delete the patch introduced in your projects
if you followed the 9.x.x upgrade guide steps.
```

### getContent changes

The content is no longer fetched from Volto with the `fullobjects` flag in the
request. If your code relied on children being fully serialized with their
parent, you should refactor it. Alternatively, you can set
`settings.bbb_getContentFetchesFullobjects` to `true` to get the old behavior.

### `@testing-library/react` upgrade notice

`@testing-library/react` has been upgraded too, and it comes with some internal API
changes too, so if you make heavy use of it in your tests, you might need to update your
testing code to adapt to the changes. Please refer to the `@testing-library/react` documentation for further information if needed.

## Upgrading to Volto 9.x.x

### Internal upgrade to use Razzle 3.3.7

```{note}
If you haven't customized your `razzle.config.js` in your project, or have any
custom plugin in place, you don't have to do anything.
```

Razzle is the isometric build system for both the server and the client parts on top
of which Volto is built. Recently, it has been under heavy development and some new
exciting features have been added to it. The Razzle configuration is now more flexible
and extensible than ever.

This change *might* be breaking for you if you customized the `razzle.config.js` heavily
in your projects. Since the new version adds a new way to extend Razzle configuration,
you should adapt your extensions to the new way of doing it. See the documentation for
more information: https://razzlejs.org/docs/customization#extending-webpack

It also unifies the way things are extended in Razzle plugins as well, so if you are
using any official or third party Razzle plugins you should upgrade them to the latest
version. If you have developed your own Razzle plugin, you should adapt its signature as
well. See the documentation for more information:
https://razzlejs.org/docs/customization#plugins

Razzle 3.3 also has some new *experimental* features, that will be default in the
upcoming Razzle 4, such as the new *React Fast Refresh* feature, which fixes the
annoying breaking of the router after any live refresh.

See the documentation of Razzle for more information: https://razzlejs.org/

#### Changes involved

We need to patch an internal Razzle utility in order to allow the use of non-released
Razzle plugins. This feature will be in Razzle 4, unfortunately at this point the
development of the Razzle 3 branch is freezed already, so we need to amend the original
using the patch. The patch will be obsolete and no longer required once we move to
Razzle 4 (see https://github.com/jaredpalmer/razzle/pull/1467).

```{note}
Since Volto 9.2.0 the next step IS NOT required anymore.
```

~~Copy (and overwrite) the `patches` folder into your local project
or, if you want to be more accurate,
just copy `patches/razzle-plugins.patch` file and overwrite `patches/patchit.sh` file.~~

### Babel config housekeeping

Historically, Volto was using "stage-0" TC-39 proposals. The configuration was starting
to show its age, since Babel 7 decided to stop maintaining the presets for stages, we
moved to use a static configuration instead of a managed one. That lead to a "living on
the edge" situation since we supported proposals that didn't make the cut. For more
information about the TC39 approval process read (https://tc39.es/process-document/)

We decided to put a bit of order to the chaos and declare that Volto will support only
stage-4 approved proposals. They are supported by `@babel/preset-env` out of the box and
provide a good sensible default baseline for Volto.

Proposal deprecations:

- @babel/plugin-proposal-decorators
- @babel/plugin-proposal-function-bind
- @babel/plugin-proposal-do-expressions
- @babel/plugin-proposal-logical-assignment-operators
- @babel/plugin-proposal-pipeline-operator
- @babel/plugin-proposal-function-sent

In fact, Volto core only used the first one (decorators) and we made the move to not use
them anymore a long time ago. However, if you were using some of the other presets, your code will stop
compiling. Migrate your code or if you want to use the proposal anyways, you'll need to
provide the configuration to your own project (babel.config.js) in your project root
folder.

You might still be using the old-style connecting of your components to the {term}`Redux` store using
`@connect` decorator, in that case, take a look at any connected component in Volto to
have a glimpse on how to migrate the code.

If you were not using any of the deprecated proposals (the most common use case), then
you are good to go, and you don't have to do anything.

### Hoisting problems on some setups

Some people were experimenting weird {term}`hoisting` issues when installing dependencies. This
was caused by Babel deprecated proposals packages and its peer dependencies that
sometimes conflicted with other installed packages.

Volto's new Babel configuration uses the configuration provided by `babel-razzle-preset`
package (Razzle dependency) and delegates the dependencies management to it, except a
few Babel plugins that Volto still needs to work.

In order for your projects not have any problem with the new configuration and comply
with the new model, you need to remove any local dependency on `@babel/core` and let
Volto handle them.

```diff
diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@ -183,7 +183,6 @@
     "node": "^10 || ^12 "
   },
   "dependencies": {
-    "@babel/core": "7.11.1",
     "@plone/volto": "8.9.2",
     "mrs-developer": "1.2.0",
```

### Recommended `browserslist` in `package.json`

Not a breaking change, but you might want to narrow the targets your Volto project is
targeting. This might improve your build times, as well as your bundle size. This is
the recommended `browserlist` you should include in your local `package.json`.

```json
  "browserslist": [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie 11",
    "not dead"
  ],
```

```{note}
Please notice that it does not target dead and deprecated browsers by its vendors.
```

### New webpack resolver plugin

A new webpack resolver plugin has been integrated with Volto, it reroutes
'local' resolve requests (for example `import Something from './Something'`) to
'absolute' resolve requests (like
`import Something from '@plone/myaddon/Something`). This allows the
shadow-based customization mechanisms to work consistently with add-ons and
Volto.

This is not a breaking change, and it shouldn't affect any existing code, but by
its very nature, a resolver plugin has the potential to introduce unexpected
behavior. Just be aware of its existence and take it into consideration if you
notice anything strange.

### Content Types icons

Helper method `getIcon` from `Url` has been removed in favor of `getContentIcon`
from `Content` which is now configurable.

See {term}`contentIcons`.

## Upgrading to Volto 8.x.x

### Upgrade package.json testing configuration

The `dummy-addons-loader.js` file has been renamed to `jest-addons-loader.js`,
to be more in line with the rest of the existing files. You should add the
following value to the `moduleNameMapper` property of the `jest` key in your
project's package.json:

```json
"load-volto-addons": "<rootDir>/node_modules/@plone/volto/jest-addons-loader.js",
```

## Upgrading to Volto 7.x.x

A misspelled file has been renamed. If you import `strickthrough.svg` in your
project, you'll now find that file at `@plone/volto/icons/strikethrough.svg`.

### New webpack resolve alias for Volto themes

As a "nice to have", a new resolve alias is provided that points to Volto's
theme folder. So, in your project's `theme.config` file, you can replace:

```less
@themesFolder: '../../node_modules/@plone/volto/theme/themes';
@siteFolder: "../../theme";
@fontPath : "../../@{theme}/assets/fonts";
```
with:

```less
@themesFolder: '~volto-themes';
@siteFolder: '~@package/../theme';
@fontPath: "~volto-themes/@{theme}/assets/fonts";
```

You might consider moving your theme files to a subfolder called `site`, to
prepare for the arrival of add-ons theming and their overrides.  In that case,
you would set your `@siteFolder` to:

```
@siteFolder: '~@package/../theme/site';
```

## Upgrading to Volto 6.x.x

First, update the `package.json` of your Volto project to Volto 6.x.x.

```json
  "dependencies": {
    "@plone/volto": "6.0.0",
  }
```

```{note}
This release includes a number of changes to the internal dependencies. If you have problems building your project, you might need to remove your `node_modules` and, ultimately, also remove your `yarn.lock` file. Then run again `yarn` for rebuilding the dependencies.
```

### Upgrade to Node.js 12

We have now dependencies that requires `node >=10.19.0`. Although Node.js 10 has still LTS
"maintenance" treatment (see https://github.com/nodejs/release#release-schedule) the recommended path
is that you use from now on Node.js 12 which is LTS since last October.

### New Razzle version and related development dependencies

The underlying Razzle package has been upgraded, and although that doesn't bring any
changes in Volto itself, a lot of development dependencies have been upgraded, and they should be updated in your local projects as well. Might be that the builds will continue working if you don't update them, but it's better for you to do so for a better development experience.

### Upgrade local dependencies versions

You need to update `devDependencies` in `package.json` in your local environment:

```json
  "devDependencies": {
    "eslint-plugin-prettier": "3.1.3",
    "prettier": "2.0.5",
    "stylelint-config-idiomatic-order": "8.1.0",
    "stylelint-config-prettier": "8.0.1",
    "stylelint-prettier": "1.1.2",
  }
```

and remove entirely the `resolutions` key:

```json
  "resolutions": {
    "@plone/volto/razzle/webpack-dev-server": "3.2.0"
  }
```

### Update `package.json` config

Add this key to the `jest.moduleNameMapper`:

```json
"jest":
  "moduleNameMapper": {
    "@plone/volto/babel": "<rootDir>/node_modules/@plone/volto/babel",
  }
```

because the new version of Jest is a bit more picky when importing externals. Attention, this mapping needs to be the first, it needs to come before the ``@plone/volto/(.*)$`` key.

### Prettier

Prettier has been updated, introducing some breaking formatting changes. It's recommended that you upgrade your local version of `prettier` and reformat your code with it using:

`yarn prettier:fix`

### Stylelint

`stylelint` has been upgraded too, and it introduces some changes in the declaration
of the styles order. It's recommended that you upgrade your local version of `prettier` and reformat your code with it using:

`yarn stylelint:fix`

### CSS modules are not supported anymore

Razzle does not support them anymore, so neither do we. If you need them, you could add
a Webpack config in your local `razzle.config.js`.

### Update your eslint config

Introduced in the Volto 5 series, it's recommended that you update your local ESLint config. In the past, we used `.eslintrc` file to do so. In order to support automatically Volto add-ons, you should remove it and use a JS based config named `.eslintrc.js` with this content:

```js
const path = require('path');
const projectRootPath = path.resolve('.');
const packageJson = require(path.join(projectRootPath, 'package.json'));

// Extends ESlint configuration for adding the aliases to `src` directories in Volto add-ons
const addonsAliases = [];
if (packageJson.addons) {
  const addons = packageJson.addons;
  addons.forEach(addon => {
    const addonPath = `${addon}/src`;
    addonsAliases.push([addon, addonPath]);
  });
}

module.exports = {
  extends: './node_modules/@plone/volto/.eslintrc',
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', '@plone/volto/src'],
          ...addonsAliases,
          ['@package', './src'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
};
```

### New wrappers in block editor

We have improved the overall UX of the block drag and drop feature by using the library
`react-beautiful-dnd` in the block editor. It introduces new wrappers (belonging to the
lib machinery) in the structure. The original structure and class names are still in
there (as children of these wrappers) to maintain maximum backwards compatibility. Those
might be cleaned up in next major versions, so if for some reason you have customized
the styling of your blocks in edit mode relying on the old structure, you might want to
review and adapt them.

### Update `config.js`

```{note}
This is required since Volto version 6.1.0 [1541](https://github.com/plone/volto/pull/1541)
```

Add these lines of code to the `config.js` of your project:

```js
import {
  addonRoutes as defaultAddonRoutes,
  addonReducers as defaultAddonReducers,
} from '@plone/volto/config';

export const addonRoutes = [...defaultAddonRoutes];
export const addonReducers = { ...defaultAddonReducers };
```

Update the `routes.js` of your project:

```js
import { addonRoutes } from '~/config';

const routes = [
  {
    path: '/',
    component: App, // Change this if you want a different component
    routes: [
      // Add your routes here
      ...(addonRoutes || []),
      ...defaultRoutes,
    ],
  },
];
```

## Upgrading to Volto 5.x.x

First, update the `package.json` of your Volto project to Volto 5.x.x.

```json
  "dependencies": {
    "@plone/volto": "5.0.0",
  }
```

### New lazy loading boilerplate

Volto is now capable of splitting and lazy loading components. This allows for better
performance and reduced bundle sizes, the client also has to parse and load less code,
improving the user experience, especially on mobile devices.

The boilerplate includes changes in the structural foundation of Volto itself. So if you
have updated in your projects any of these components:

- `src/helpers/Html/Html.jsx`
- `src/components/theme/App/App.jsx`
- `src/server.jsx`
- `src/client.jsx`

you should adapt them to the newest changes in Volto source code. You can do that by
diffing the new ones with your versions.

### Testing lazy loaded components

The whole process has been designed to have a minimal impact in existing projects.
However, only one thing should be changed in your components tests, especially if your components are composed of original Volto components (not Semantic UI ones, though).

You should adapt them by mocking the Volto component or resolve (await) in an
async construction before the test is fired. See this Codepen example:

https://codesandbox.io/s/loadable-async-tests-l2bx9

```jsx
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Component1, Component2 } from "./components";

describe("CustomComponent", () => {
  it("rendered lazily", async () => {
    const { container, getByText } = render(<App />);

    await Component1;
    await Component2;

    expect(container.firstChild).toMatchSnapshot();
    expect(getByText("Component1"));
    expect(getByText("Component2"));
  });
```

There is also another pattern used in Volto core for testing you can transform your test
to be async aware like this:

```diff
--- a/src/components/manage/Preferences/PersonalPreferences.test.jsx
+++ b/src/components/manage/Preferences/PersonalPreferences.test.jsx
@@ -3,6 +3,7 @@ import renderer from 'react-test-renderer';
 import { Provider } from 'react-intl-redux';
 import configureStore from 'redux-mock-store';
 import { MemoryRouter } from 'react-router-dom';
+import { wait } from '@testing-library/react';

 import PersonalPreferences from './PersonalPreferences';

@@ -13,7 +14,7 @@ jest.mock('react-portal', () => ({
 }));

 describe('PersonalPreferences', () => {
-  it('renders a personal preferences component', () => {
+  it('renders a personal preferences component', async () => {
     const store = mockStore({
       intl: {
         locale: 'en',
@@ -36,7 +37,8 @@ describe('PersonalPreferences', () => {
         </MemoryRouter>
       </Provider>,
     );
-    const json = component.toJSON();
-    expect(json).toMatchSnapshot();
+    await wait(() => {
+      expect(component.toJSON()).toMatchSnapshot();
+    });
   });
 });
```

### Helmet title it's now centralized in `View.jsx`

All the calls for updating the title in the document performed by `Helmet` are now
centralized in the `View.jsx` components. It's recommended to remove all the Helmet
calls for updating the title from your components especially if you are using some
SEO add-ons for Volto, since not doing that could interfere with them.

## Upgrading to Volto 4.x.x

First, update your `package.json` to Volto 4.x.x.

```json
  "dependencies": {
    "@plone/volto": "4.0.0",
  }
```

### New initial blocks per content type setting in Alpha 37

Not a breaking change, but now there's a new setting in Blocks, `initialBlocks` where you can define the initial blocks for all content types. You can override the default ('title' and a 'text' block) and provide your own by modifying the configuration object:

```js
const initialBlocks = {
    Document: ['leadimage', 'title', 'text', 'listing' ]
};
```

provide an empty object if you don't want to define any additional initial blocks and keep the default.

```js
const initialBlocks = {};
```

### ImageSidebar moved to Image Block directory in Alpha 29

For better resource grouping, the `ImageSidebar` component has been moved to the `Image` block component directory: `components/manage/Blocks/Image`

### Copy `yarn.lock` from `volto-starter-kit` in Alpha 17

Due to changes in the dependency tree, it's required to use a specific `yarn.lock` file by deleting it and copy the one here: https://github.com/plone/volto-starter-kit/blob/master/yarn.lock before upgrading to Volto alpha 17.

### Forked Helmet into Volto core

Due to the inactivity of the Helmet project, we decided to fork it to the core. It's part of the Volto helpers now. You have to update your imports accordingly. Please notice that now it's a named import:

```diff
--- a/src/components/Views/ReportView.jsx
+++ b/src/components/Views/ReportView.jsx
@@ -1,6 +1,6 @@
 import React from 'react';
 import PropTypes from 'prop-types';
-import Helmet from 'react-helmet';
+import { Helmet } from '@plone/volto/helpers';
 import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
 import { format, parse } from 'date-fns';
 import { filter, map } from 'lodash';
```

### Alpha 16 is a brownbag release

There was a problem with the projects using Volto eslint config when upgrading to the latest versions related to typescript, we will take of that in the near future. So skip this version.

### Stylelint and prettier config in Alpha 14

In your project's boilerplate, you need to update the stylelint and prettier configuration accordingly to the changes made in Alpha 14 in `package.json` like this:

```diff
diff --git a/package.json b/package.json
index 7c8194c..5c63469 100644
--- a/package.json
+++ b/package.json
@@ -46,26 +46,51 @@
   },
   "prettier": {
     "trailingComma": "all",
-    "singleQuote": true
+    "singleQuote": true,
+    "overrides": [
+      {
+        "files": "*.overrides",
+        "options": {
+          "parser": "less"
+        }
+      }
+    ]
   },
   "stylelint": {
     "extends": [
-      "stylelint-config-standard",
-      "stylelint-config-idiomatic-order",
-      "./node_modules/prettier-stylelint/config.js"
-    ]
+      "stylelint-config-idiomatic-order"
+    ],
+    "plugins": [
+      "stylelint-prettier"
+    ],
+    "rules": {
+      "prettier/prettier": true,
+      "rule-empty-line-before": [
+        "always-multi-line",
+        {
+          "except": [
+            "first-nested"
+          ],
+          "ignore": [
+            "after-comment"
+          ]
+        }
+      ]
+    },
+    "ignoreFiles": "theme/themes/default/**/*.overrides"
   },
   "engines": {
     "node": "^10 || ^12"
   },
   "dependencies": {
-    "@plone/volto": "4.0.0-alpha.10"
+    "@plone/volto": "4.0.0-alpha.14"
   },
   "devDependencies": {
     "eslint-plugin-prettier": "3.0.1",
-    "postcss-overrides": "3.1.4",
-    "prettier": "1.17.0",
-    "prettier-stylelint": "0.4.2"
+    "prettier": "1.19.1",
+    "stylelint-config-idiomatic-order": "6.2.0",
+    "stylelint-config-prettier": "6.0.0",
+    "stylelint-prettier": "1.1.1"
   },
   "resolutions": {
     "@plone/volto/razzle/webpack-dev-server": "3.2.0"
```

````{note}
If you are linting actively your project, the build might be broken after this update. You should run:
```
$ yarn prettier:fix
$ yarn stylelint:fix
```
then commit the changes.
````

### openObjectBrowser API change in Alpha 11

The API of the `ObjectBrowser` component changed in alpha 11 to make it more flexible.
In case you had custom blocks using it, you have to update the call in case you were using a `link` mode:

```diff
@@ -42,7 +42,7 @@ const OtherComp = ({
                     href: '',
                   });
                 }
-              : () => openObjectBrowser('link')
+              : () => openObjectBrowser({ mode: 'link' })
           }
           onChange={(name, value) => {
             onChangeBlock(block, {
```

See {ref}`openobjectbrowser-handler-api-label` for more details.

### Renaming Tiles into Blocks

An internal renaming to use the term `Blocks` everywhere was done to unify naming through the code and the documentation.

Plone RESTAPI was updated for that purpose too, and running an upgrade step (do so in Plone's Addons control panel) is required in order to migrate the data. No step is required if you are using a brand-new ZODB.

This is the version compatibility table across all the packages involved:

Volto 4 - `plone.restapi` >= 5.0.0 - `kitconcept.voltodemo` >= 2.0

```{note}
The renaming happened in Volto 4 alpha.10 and plone.restapi 5.0.0. Volto 4 alpha versions under that release use older versions of `plone.restapi` and `kitconcept.voltodemo`, however if you are using alpha releases it's recommended to upgrade to the latest alpha or the final release of Volto 4.
```

The project configuration should also be updated, in your `src/config.js`:

```diff
diff --git a/src/config.js b/src/config.js
index f1fe9c2..9517c38 100644
--- a/src/config.js
+++ b/src/config.js
@@ -16,7 +16,7 @@ import {
   settings as defaultSettings,
   views as defaultViews,
   widgets as defaultWidgets,
-  tiles as defaultTiles,
+  blocks as defaultBlocks,
 } from '@plone/volto/config';

 export const settings = {
@@ -31,6 +31,6 @@ export const widgets = {
   ...defaultWidgets,
 };

-export const tiles = {
-  ...defaultTiles,
+export const blocks = {
+  ...defaultBlocks,
 };
```

### Add theme customization to your project

Volto 4 now also expects a file named `src/theme.js` with this content by default:

```js
import 'semantic-ui-less/semantic.less';
import '@plone/volto/../theme/themes/pastanaga/extras/extras.less';
```

### Remove enzyme configuration

Enzyme has been removed, in favor of `@testing-library/react`, and the configuration should be removed in `package.json`:

``` diff
diff --git a/package.json b/package.json
index 27c7f8d..8f5f088 100644
--- a/package.json
+++ b/package.json
@@ -44,9 +44,6 @@
       "default",
       "jest-junit"
     ],
-    "snapshotSerializers": [
-      "enzyme-to-json/serializer"
-    ],
     "transform": {
       "^.+\\.js(x)?$": "babel-jest",
       "^.+\\.css$": "jest-css-modules",
```

### Blocks engine - Blocks configuration object

The blocks engine was updated and there are some important breaking changes, in case that
you've developed custom blocks. The configuration object is now unified and expresses all
the properties to model a block. This is how a block in the `defaultBlocks` object looks
like:

```js
const defaultBlocks = {
  title: {
    id: 'title', // The name (id) of the block
    title: 'Title', // The display name of the block
    icon: titleSVG, // The icon used in the block chooser
    group: 'text', // The group (blocks can be grouped, displayed in the chooser)
    view: ViewTitleBlock, // The view mode component
    edit: EditTitleBlock, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in in the chooser
    mostUsed: false, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
  },
  ...
```

There is an additional object `groupBlocksOrder` that contains an array with the order
that the blocks group should appear:

```js
const groupBlocksOrder = [
  { id: 'mostUsed', title: 'Most used' },
  { id: 'text', title: 'Text' },
  { id: 'media', title: 'Media' },
  { id: 'common', title: 'Common' },
];
```

You should adapt and merge the configuration of your own custom blocks to match the
`defaultBlocks` and `groupBlocksOrder` one. You can modify the order of the groups and
create your own as well.

### Blocks engine - Simplification of the edit blocks wrapper

The edit block wrapper boilerplate was quite big, and for bootstrapping an edit block you had to copy it from an existing block. Now all this boilerplate has been transferred to the Blocks Engine, so bootstrapping the edit component of a block is easier and does not require any pre-existing code.

In order to upgrade your blocks you should simplify the outer `<div>` (took as an example the Title block):

``` diff
--- a/src/components/manage/Blocks/Title/Edit.jsx
+++ b/src/components/manage/Blocks/Title/Edit.jsx
@@ -138,11 +138,7 @@ class Edit extends Component {
       return <div />;
     }
     return (
-      <div
-        role="presentation"
-        onClick={() => this.props.onSelectBlock(this.props.block)}
-        className={cx('block title', { selected: this.props.selected })}
-      >
+      <>
         <Editor
           onChange={this.onChange}
           editorState={this.state.editorState}
@@ -185,7 +181,7 @@ class Edit extends Component {
             this.node = node;
           }}
         />
-      </div>
+      </>
     );
   }
 }
```

The blocks engine now takes care of the keyboard navigation of the blocks, so you need to remove the outer `<div>` from your custom block, then your block doesn't have to react to the change on `this.props.selected` either, because it's also something that the blocks engine already does for you.

The focus management is also transferred to the engine, so it's not needed for your block to manage the focus. However, if your block does indeed require to manage its own focus, then you should mark it with the `blockHasOwnFocusManagement` property in the blocks configuration object:

```{code-block} jsx
:linenos:
:emphasize-lines: 10
    text: {
      id: 'text',
      title: 'Text',
      icon: textSVG,
      group: 'text',
      view: ViewTextBlock,
      edit: EditTextBlock,
      restricted: false,
      mostUsed: false,
      blockHasOwnFocusManagement: true,
    },
```

### Default view renaming

The default view for content types `DocumentView.jsx` has been renamed to a more appropriate `DefaultView.jsx`. This view contains the code for rendering blocks in case the content type has been Blocks enabled. Enable Blocks on your content types by composing the view of your content type using `DefaultView` component.

### Deprecations

- The old messages container has been removed since it's not used any more by Volto. We changed it to use the `Toast` library.
- Improved the Pastanaga Editor block wrapper container layout, deprecating the hack `.ui.wrapper > *`.

## Upgrading to Volto 3.x

Volto was upgraded to use Razzle 3.0.0 which is not a breaking change itself,
but it forces some changes in the boilerplate on your Volto projects. You
should change the babel config by deleting .babelrc file and creating a new
file `babel.config.js` with these contents:

```js
module.exports = require('@plone/volto/babel');
```

Then update your `package.json` to Volto 3.x.

```json
  "dependencies": {
    "@plone/volto": "3.0.0",
  }
```

Volto 3.x is compatible with the new changes introduced in the vocabularies
endpoint in `plone.restapi` 4.0.0. If you custom-build a widget based in the
Volto ones, you should update them as well. Volto updated its own widget set to
support them:

- `components/manage/Widgets/ArrayWidget`
- `components/manage/Widgets/SelectWidget`
- `components/manage/Widgets/TokenWidget`

They all use `react-select` third party library for render it.

## Upgrading to Volto 2.x

### Improved Blocks HOC

The Blocks HOC (High Order Component) was changed to lift off some
features from the blocks themselves, and now it takes care of them by itself.

- The delete block feature was moved to it
- The keylisteners for navigating through blocks was moved to it
- The properties passed down to the blocks are improved and documented

This change only applies to your existing blocks, you have to update them
accordingly by deleting the trash icon and action from the end of your blocks

```jsx
{this.props.selected && (
  <Button
    icon
    basic
    onClick={() => this.props.onDeleteBlock(this.props.block)}
    className="block-delete-button"
  >
    <Icon name={trashSVG} size="18px" />
  </Button>
)}
```

Modify the parent element of your block making these changes:

```jsx
<div
  role="presentation"
  onClick={() => this.props.onSelectBlock(this.props.block)}
  className={cx('block hero', {
    selected: this.props.selected,
  })}
  tabIndex={0}
  onKeyDown={e =>
    this.props.handleKeyDown(
      e,
      this.props.index,
      this.props.block,
      this.node
    )
  }
  ref={node => {
    this.node = node;
  }}
>
```

- Add the keylisteners to the parent element of your block

```jsx
  onKeyDown={e =>
    this.props.handleKeyDown(
      e,
      this.props.index,
      this.props.block,
      this.node
    )
  }
```

- Add a ref to it and assign it to `this.node`.

```jsx
  ref={node => {
    this.node = node;
  }}
```

- Add a proper role for it

```jsx
  role="presentation"
```

Take a look into the implementation of the default Volto blocks to get a grasp
on all the edge cases related to keyboard navigation and how to deal with them.

### Reordering of the internal CSS, added extra files

The internal Volto CSS has been tidied up and reordered, for that reason, some
other extras have been introduced and the theme.config in your project needs to
be updated by making sure you have these two extras in the
`theme.config` file:

```less
/* Extras */
@main        : 'pastanaga';
@custom      : 'pastanaga';
```
