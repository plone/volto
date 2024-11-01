---
myst:
  html_meta:
    "description": "How does a Volto add-on work?"
    "property=og:description": "How does a Volto add-on work?"
    "property=og:title": "How does a Volto add-on work?"
    "keywords": "Volto, Plone, add-ons, JavaScript, dependencies"
---
%This is not explanation, but a how-to guide.
# How does a Volto add-on work?


## Add-on configuration

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

```{note}
An add-on's default configuration method will always be loaded.
```

See [@kitconcept/volto-button-block](https://github.com/kitconcept/volto-button-block) as an example.


### Providing optional add-on configurations

You can export additional configuration functions from your add-on's main
`index.js`.

```js
import applyConfig, {loadOptionalBlocks,overrideSomeDefaultBlock} from './config';

export { loadOptionalBlocks, overrideSomeDefaultBlock };
export default applyConfig;
```

```{seealso}
{doc}`../development/add-ons/load-add-on-configuration`
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
