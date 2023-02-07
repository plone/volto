---
myst:
  html_meta:
    "description": "Environment variables allow configuration of your Volto application at runtime."
    "property=og:description": "Environment variables allow configuration of your Volto application at runtime."
    "property=og:title": "Environment variables"
    "keywords": "Volto, React, Plone, Environment variables, Razzle,"
---

# Environment variables

All the environment variables defined at runtime that have the "RAZZLE_" prefix, are available in the browser under window.env

ex:
If we start the application with an env variable

```bash
RAZZLE_MY_VARIABLE=some_value build/server.js
```

In the frontend we can access this variable with:

```bash
window.env.RAZZLE_MY_VARIABLE
```

## Runtime environment variables

All the environment variables that are configurable work at runtime, not only at build time. This works since Volto 13 onwards.

````{note}
Before Volto 13, you'd do:

```bash
RAZZLE_API_PATH=https://plone.org yarn build && yarn start:prod
```

From Volto 13 onwards, you can now do:

```bash
yarn build && RAZZLE_API_PATH=https://plone.org yarn start:prod
```
````

This brings you a lot of power since you don't have to rebuild on every config change. You can also generate builds on your CI, then deploy them anywhere.


## Environment variables reference

### RAZZLE_LEGACY_TRAVERSE

From Volto 14 onwards, Seamless mode is the recommended way of setting up your depoloyments. However, it forces you to upgrade several packages in the backend (`plone.restapi` and `plone.rest`) and adjust your web server configuration accordingly.

In case you can't afford or change your deployment, you can still upgrade Volto by using the `RAZZLE_LEGACY_TRAVERSE` flag.

```bash
RAZZLE_LEGACY_TRAVERSE=true yarn start:prod
```

### VOLTO_ROBOTSTXT

You can override the robots.txt file with an environment variable called
`VOLTO_ROBOTSTXT`. This is useful when using the same build on multiple
websites (for example a test website) to forbid robots from crawling it.

```
$ VOLTO_ROBOTSTXT="User-agent: *
Disallow: /" yarn start
```

```{note}
If you want to use the `VOLTO_ROBOTSTXT` environment variable, make sure to
delete the file `public/robots.txt` from your project.
```

### DEBUG

It will enable the log several logging points scattered through the Volto code. It uses the `volto:` namespace.

```bash
DEBUG=volto:i18n yarn start
```

or

```bash
DEBUG=volto:shadowing yarn start
```

also

```bash
DEBUG=volto:* yarn start
```

#### `DEBUG_ADDONS_LOADER`

Set `DEBUG_ADDONS_LOADER=true` to have Volto generate a file, `addon-dependency-graph.dot` which contains a graph of all the loaded addons. You can use [Graphviz](https://graphviz.org/) to convert this file to an image with:

```
dot addon-dependency-graph.dot -Tsvg -o out.svg
```

#### Component shadowing errors (shadowing)

It displays the errors of the non-compliant customizations (in server console) if you are experiencing problems with a customization not working.

#### Internationalization errors (i18n)

It will enable the log of missing i18n messages (in console).

## Use add-ons via the `ADDONS` environment variable

You can use the `ADDONS` environment variable to enable and configure add-ons in your project.

When running your app, the add-ons will be loaded in the following order:

- the file `package.json`
- programmatically set in the file `volto.config.js`
- the environment variable `ADDONS`

In the environment variable `ADDONS`, you can specify:

- released (or published) packages that were installed previously in your environment and are already present in the `node_modules` directory,
- or addons located in the `packages` folder of your project, such as Volto's testing packages.

`ADDONS` can be used to temporarily add an add-on to your build for testing purposes.

```bash
yarn add volto-slate
ADDONS=volto-slate:asDefault yarn start
```

`ADDONS` can also be used to temporarily enable a feature or a set of customizations.

```bash
# given a folder './packages/coresandbox', like in vanilla Volto
ADDONS=coresandbox:multilingualFixture yarn start
```

You can specify multiple add-ons, seperated by commas:

```bash
ADDONS=test-addon,test-addon2 yarn start
```

You can specify profiles for installation:

```bash
ADDONS=test-addon:profile1,test-addon2:profile2 yarn start
```

The following code snippets demonstrate how to configure add-ons.
First in `package.json`:

```json
"addons": [
    "@kitconcept/volto-blocks-grid"
]
```

...next in `volto.config.js`:

```js
module.exports = {
    addons: ['@eeacms/volto-accordion-block']
}
```

...and finally using `ADDONS`:

```bash
yarn add volto-slate
ADDONS=volto-slate:asDefault yarn start
```

If you need to specify several add-ons, separate them with a semicolon (`;`):

```bash
yarn add volto-slate
ADDONS="volto-slate:asDefault;@kitconcept/volto-blocks-grid" yarn start
```

As a result, your app will load the add-ons in the following order:

- `@kitconcept/volto-blocks-grid`
- `@eeacms/volto-accordion-block`
- `volto-slate`

```{important}
The `ADDONS` key is a Volto specific configuration. Simply setting `ADDONS` doesn't download the javascript package. This has to be covered by another way, either installing the addon package (with yarn add) or loading it as a development package with mrs-developer.
```

## BUILD_DIR

This is a runtime-only environment variable that directs the build to run Volto from an especific location, other than the default folder `build`.

```bash
yarn
BUILD_DIR=dist node dist/server.js
```
