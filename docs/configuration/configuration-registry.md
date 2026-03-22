---
myst:
  html_meta:
    "description": "How to access and modify the configuration regisrey"
    "property=og:description": "How to access and modify the configuration registry"
    "property=og:title": "Customize Seven using the configuration registry"
    "keywords": "Seven, @plone/registry, registry, configuration"
---

# Customize Seven using the configuration registry

The registry is the central place for configuring your Seven application.
If the default location has not been modified, you can locate the configuration in the `settings.ts` file in the `config` folder of your add-on.
Existing entries can be modified or new entries can be added.

```ts
import type { ConfigType } from '@plone/registry';
import MyBlockInfo from 'my/addon/blocks/MyBlockInfo';

export default function install(config: ConfigType) {
  // Example: registering a new block
  config.blocks.blocksConfig.myBlock = MyBlockInfo;
  
  // Example: Adding a content type to the "most used" section
  //          of the content type menu in the toolbar 
  config.settings.mostUsedTypes = [
    // Make sure not to override existing entries,
    // but to keep existing values unless you actually want to
    ...config.settings.mostUsedTypes,
    'My Content Type',
  ];
  
  // Rest of your configuration goes here
  
  return config;
}
```

To then access the configuration in your code, the config can be imported from `@plone/registry`.

```ts
import config from '@plone/registry';

const mostUsedTypes = config.settings.mostUsedTypes;
// Value: ["Document", "Folder", "File", "My Content Type"]
```