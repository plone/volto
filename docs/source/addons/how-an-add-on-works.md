---
myst:
  html_meta:
    "description": "How does a Volto add-on work?"
    "property=og:description": "How does a Volto add-on works?"
    "property=og:title": "How does a Volto add-on works?"
    "keywords": "Volto, Plone, Volto add-ons, JavaScript, JavaScript dependencies"
---
% Explanation
# How does a Volto add-on work?

Volto add-on packages are just CommonJS/ESM packages.
Their main purpose is encapsulate logic, configuration and customizations in a reusable way.
The only requirement is that they point the `main` key of their `package.json` to a module that exports, as a default function that acts as a Volto configuration loader.

Similarly to how you develop a Plone backend Python add-on, you can control all aspects of Volto from a Volto add-on.

This gives you the ability to move all your project configuration, components, customizations and even theme files to an add-on.
This has the advantage to render the project configuration empty and expendable, so you could at any point not only reuse the add-on(s) outside the current project, but also have the project as simply boilerplate that could be replaced at any point (for example, a Volto version upgrade).

An add-on can be published in an npm registry, just as any other package.
However, Volto add-ons should not be transpiled.
They should be released as "source" packages.

See [@kitconcept/volto-button-block](https://github.com/kitconcept/volto-button-block) as an example.

### Add-on configuration

The default export of your add-on main `index.js` file should be a function with
the signature `config => config`.
That is, it should take the `global` configuration object and return it, possibly mutated or changed.
So your main `index.js` will look like:

```js
export default function applyConfig(config) {
  config.blocks.blocksConfig.faq_viewer = {
    id: 'faq_viewer',
    title: 'FAQ Viewer',
    edit: FAQBlockEdit,
    view: FAQBlockView,
    icon: chartIcon,
    group: 'common',
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
}
```

And the `package.json` file of your add-on:

```json
{
  "main": "src/index.js",
}
```

In effect, Volto does the equivalent of:

```
import installMyVoltoAddon from 'my-volto-addon'

// ... in the configuration registry setup step:
const configRegistry = installMyVoltoAddon(defaultRegistry);
```

So the Volto add-on needs to export a default function that receives the Volto configuration registry, is free to change the registry as it sees fit, then it needs to return that registry.

Volto will chain-execute all the add-on configuration functions to compute the final configuration registry.

```{info}
An add-on's default configuration method will always be loaded.
```

### Providing optional add-on configurations

You can export additional configuration functions from your add-on's main
`index.js`.

```js
import applyConfig, {loadOptionalBlocks,overrideSomeDefaultBlock} from './config';

export { loadOptionalBlocks, overrideSomeDefaultBlock };
export default applyConfig;
```

```{seealso}
{doc}`./how-to-load-addon-configuration`
```

## Customizations

Add-on packages can include customization folders, just like the Volto projects.
The customizations are resolved in the order: add-ons (as sorted in the `addons` key of your project's `package.json`) then the customizations in the Volto project, last one wins.

```{tip}
See the {ref}`advanced-customization-scenarios-label` section on how to enhance this pattern and how to include customizations inside add-ons.
```

## Add-on dependencies

Add-ons can depend on any other JavaScript package, but they can also depend on other Volto add-ons.
To do this, specify the name of your Volto add-on dependency in your `dependencies` key of `package.json` and create a new `addons` key in the `package.json` of your add-on, where you specify the extra Volto add-on dependency.

By doing this, the add-ons can "chain-load" one another, so you don't have to keep track of intermediary dependencies.

```json
{
  "name": "volto-slate",

  "addons": ["@eeacms/volto-object-widget"]
}
```
