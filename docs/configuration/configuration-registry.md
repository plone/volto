---
myst:
  html_meta:
    "description": "How to access and modify the configuration registry"
    "property=og:description": "How to access and modify the configuration registry"
    "property=og:title": "Customize Seven using the configuration registry"
    "keywords": "Seven, @plone/registry, registry, configuration"
---

# Customize Seven using the configuration registry

The registry is the central place for configuring your Seven application.
Configuration is typically located in the {file}`index.ts` file at the add-on's root level and inside the `config` directory, if it exists.
In this file, you can modify existing entries or add new ones.

```ts
import type { ConfigType } from '@plone/registry';
import MyBlockInfo from 'my/addon/blocks/MyBlockInfo';

export default function install(config: ConfigType) {
  // Register a new block
  config.blocks.blocksConfig.myBlock = MyBlockInfo;
  
  // Add a content type to the "most used" section
  // of the content type menu in the toolbar
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

You can then use the configuration in your code using the `config` exported from `@plone/registry`.

```ts
import config from '@plone/registry';

const mostUsedTypes = config.settings.mostUsedTypes;
// Value: ["Document", "Folder", "File", "My Content Type"]
```