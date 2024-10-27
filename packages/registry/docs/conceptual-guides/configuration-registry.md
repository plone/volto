# Configuration registry

The configuration registry supplements the add-on registry.
They both work together to provide extensibility and pluggability capabilities.
The configuration registry is a facility that stores app configuration to share in the app.
The add-ons save configuration from the registry using their default export function on app bootstrap time.
They retrieve this configuration as needed by the functionality and components they expose.

## Example use case - Pluggable block system

Let's say that your app is the user interface of a content management system (CMS).
This CMS uses blocks as its main fundamental unit of content.
The pages that the CMS builds are made up of these blocks.
The CMS has some basic available blocks, yet it's a requirement that integrators can register more blocks in a pluggable way.
This app will use the add-on registry to extend the basic CMS capabilities, so an external add-on can supplement their own add-ons to those in the basic CMS.

Let's assume we've defined a key in the registry `config.blocks.blocksConfig`, and defined a way to register the available blocks in the CMS as the keys in that object in the configuration registry:

```js
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
  };
```

The configuration registry will have other keys already set by default, which will compose the initial set of basic blocks used by the CMS.
Then the CMS will populate the available blocks in the user interface.

The add-on is meant to extend the initial configuration.
From the default export function of our add-on, you should provide the configuration of the new block:

```ts
export default function applyConfig(config: ConfigData) {
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
  };

  return config;
}
```

Once the app starts, the add-on registry will execute, in order, all the registered add-ons' default export functions, configuring the new block.
The add-on will then become available to the CMS when it asks the configuration registry for it.


## Configuration registry artifacts

The configuration registry also stores special elements that can be queried and retrieved in a pluggable way.

-   Components
-   Slots
-   Utilities

Some of the components are particular to the use case of a CMS, such as slots, but the abstraction can be ported and applied to different scenarios.
