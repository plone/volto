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
Configuration is typically located either in the index.ts file at the add-ons root level or in config/settings.ts.
In this file, existing entries can be modified or new ones added as needed.

```ts
import type { ConfigType } from '@plone/registry';
import MyBlockInfo from 'my/addon/blocks/MyBlockInfo';

export default function install(config: ConfigType) {
  // Example: registering a new block
  config.blocks.blocksConfig.myBlock = MyBlockInfo;
  
  // Example: Adding a content type to the "most used" section
  //          of the content type menu in the toolbar 
  config.settings.mostUsedTypes = [
    // Keep existing entries and append the new one
    // to avoid overwriting them (unless intentional)
    ...config.settings.mostUsedTypes,
    'My Content Type',
  ];
  
  // Rest of the configuration goes here
  
  return config;
}
```

The configuration can then be used in your code using the `config` exported from `@plone/registry`.

```ts
import config from '@plone/registry';

const mostUsedTypes = config.settings.mostUsedTypes;
// Value: ["Document", "Folder", "File", "My Content Type"]
```