---
myst:
  html_meta:
    "description": "Environment variables allow configuration of your Volto application at runtime."
    "property=og:description": "Environment variables allow configuration of your Volto application at runtime."
    "property=og:title": "Environment variables"
    "keywords": "Volto, React, Plone, Environment variables, Razzle,"
---

# Environment variables

This page describes environment variables and their usage for configuration of your Volto application at runtime.


## Runtime environment variables

```{versionadded} 13
```

All configurable environment variables work at runtime, not only at build time.
You could, for example, build your Volto application, then start it in production with the `RAZZLE_API_PATH` environment variable.

```shell
pnpm build && RAZZLE_API_PATH=https://plone.org pnpm start:prod
```

This brings you a lot of power since you don't have to rebuild on every configuration change.
You can also generate builds on your continuous integration, then deploy them anywhere.


## Environment variable reference

````{glossary}
:sorted:
`RAZZLE_LEGACY_TRAVERSE`
    If `true`, Volto will construct API URLs without the `/++api++` prefix.

    This is not needed if you are using {doc}`../deploying/seamless-mode`, which is the recommended way to set up your deployments since Volto 14.

    However, if you are not able to upgrade the packages `plone.restapi` (8.12.1 or greater) and `plone.rest` (2.0.0a1 or greater) in the backend, you can adjust your web server configuration and use the `RAZZLE_LEGACY_TRAVERSE` flag.

    ```shell
    RAZZLE_LEGACY_TRAVERSE=true pnpm start:prod
    ```

`VOLTO_ROBOTSTXT`
    You can override the {file}`robots.txt` file with an environment variable called `VOLTO_ROBOTSTXT`.
    This is useful when using the same build on multiple websites (for example a test website) to forbid robots from crawling it.
    The following example is a two-line shell command.

    ```shell
    VOLTO_ROBOTSTXT="User-agent: *
    Disallow: /" pnpm start
    ```

    ```{note}
    If you want to use the `VOLTO_ROBOTSTXT` environment variable, your must delete the file `public/robots.txt` from your project to avoid a conflict.
    ```

`DEBUG`
    It enables several logging points scattered throughout the Volto code.
    It uses the `volto:` namespace.
    You can use it in any number of named scopes, all of which are additive and do not cancel one another, or everywhere.

    `shadowing` enables component shadowing errors.
    It displays the errors of the non-compliant customizations in the server console.
    It helps you identify problems with a customization that does not work as you expect.

    ```shell
    DEBUG=volto:shadowing pnpm start
    ```

    `i18n` enables the log of missing internationalization messages in the console.

    ```shell
    DEBUG=volto:i18n pnpm start
    ```

    `*` enables logging everywhere it exists in Volto.

    ```shell
    DEBUG=volto:* pnpm start
    ```

`DEBUG_ADDONS_LOADER`
    Set `DEBUG_ADDONS_LOADER=true` to have Volto generate a file, {file}`addon-dependency-graph.dot`, which contains a graph of all the loaded add-ons.
    You can use [Graphviz](https://graphviz.org/) to convert this file to an image with:

    ```
    dot addon-dependency-graph.dot -Tsvg -o out.svg
    ```

`ADDONS`
    You can use the `ADDONS` environment variable to enable and configure add-ons in your project.

    When running your app, the add-ons will be loaded in the following order:

    -   the file `package.json`
    -   programmatically set in the file `volto.config.js`
    -   the environment variable `ADDONS`

    In the environment variable `ADDONS`, you can specify:

    -   released (or published) packages that were installed previously in your environment and are already present in the `node_modules` directory,
    -   or add-ons located in the `packages` folder of your project, such as Volto's testing packages.

    `ADDONS` can be used to temporarily add an add-on to your build for testing purposes.

    ```shell
    pnpm add @kitconcept/volto-light-theme
    ADDONS=@kitconcept/volto-light-theme pnpm start
    ```

    `ADDONS` can also be used to temporarily enable a feature or a set of customizations.

    ```shell
    # given a folder './packages/coresandbox', like in vanilla Volto
    ADDONS=coresandbox:multilingualFixture pnpm start
    ```

    If you need to specify several add-ons, separate them with a semicolon (`;`):

    ```shell
    ADDONS="test-addon;test-addon2" pnpm start
    ```


    You can specify profiles for installation:

    ```shell
    ADDONS="test-addon:profile1;test-addon2:profile2" pnpm start
    ```

    The following code snippets demonstrate how to configure add-ons.

    First in `package.json`:

    ```json
    "addons": [
        "@kitconcept/volto-blocks-grid"
    ]
    ```

    Then in `volto.config.js`:

    ```js
    module.exports = {
        addons: ['@eeacms/volto-accordion-block']
    }
    ```

    And finally using `ADDONS`:

    ```shell
    pnpm add volto-slate
    ADDONS=volto-slate:asDefault pnpm start
    ```

    As a result, your app will load the add-ons in the following order:

    -   `@kitconcept/volto-blocks-grid`
    -   `@eeacms/volto-accordion-block`
    -   `volto-slate`

    ```{important}
    The `ADDONS` key is a Volto specific configuration.
    Simply setting `ADDONS` doesn't download the JavaScript package.
    This has to be covered another way, by either installing the add-on package (with `pnpm add`), or loading it as a development package with `mrs-developer`.
    ```

`BUILD_DIR`
    This is a runtime-only environment variable that directs the build to run Volto from a specific location, other than the default folder `build`.

    ```shell
    pnpm install
    BUILD_DIR=dist node dist/server.js
    ```

`VOLTOCONFIG`
    This environment variable allows you to specify a custom location for {file}`volto.config.js`.

    It can be relative to the current project or absolute.

    ```shell
    VOLTOCONFIG=../../volto.config.js pnpm start
    ```

`SITE_DEFAULT_LANGUAGE`
    This is a runtime environment variable that sets the `config.settings.defaultLanguage`, allowing you to specify the default language of a site.

    ```shell
    SITE_DEFAULT_LANGUAGE=ca pnpm start
    ```
````


## Access environment variables in a browser

All environment variables defined at runtime with the "RAZZLE_" prefix are available in your browser under the `window.env` global object.
For example, start the application with an environment variable as shown.

```shell
RAZZLE_MY_VARIABLE=some_value build/server.js
```

In the frontend, you can access this variable in your code with the following.

```shell
window.env.RAZZLE_MY_VARIABLE
```
