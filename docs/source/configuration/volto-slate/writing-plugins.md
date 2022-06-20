---
html_meta:
  "description": "How to write a volto-slate plugin"
  "property=og:description": "How to write a volto-slate plugin"
  "property=og:title": "Write a Volto-slate Plugin"
  "keywords": "Volto, Plone, frontend, React, Slate, Slate-React, volto-slate, plugins"
---

(writing-plugins-label)=

# How to write custom plugin

This section will guide through registering a custom plugin for volto-slate.

## Adding a tooltip to a text section

A plugin that will create a tooltip on selecting a text element in slate editor.

We'll start by creating a `index.js` file which will instantiate Element Editor.

```js
export default function install(config) {
  const opts = {
    title: 'Tooltip',
    pluginId: TOOLTIP,
    elementType: TOOLTIP,
    element: TooltipElement,
    isInlineElement: true,
    editSchema: TooltipEditorSchema,
    extensions: [withTooltip],
    hasValue: (formData) => !!formData,
    toolbarButtonIcon: tooltipSVG,
    messages: 'your custom edit/remove i18n messages',
  };
  const [installEditor] = makeInlineElementPlugin(opts);
  config = installEditor(config);
  return config;
}
```

The `makeInlineElementPlugin` builds the schema based plugin Editor with the given properties.

```{note}
For non-schema based plugins, you can build your own set of persistantHelpers which will render when the plugin is selected. See {ref}`persistent-helpers-label`. Eg: `simpleLinkPlugin`
```

### Add tooltip button

Register slate toolbar button for tooltip.

```js
const { slate } = config.settings;
slate.toolbarButtons = [...(slate.toolbarButtons || []), 'tooltip'];
slate.expandedToolbarButtons = [
  ...(slate.expandedToolbarButtons || []),
  'tooltip',
];
```

### View and Edit component for Element

Next step is to add a React component for Element, we will name it as `TooltipElement`. This will serve as a edit/view for our plugin element.

```js
import React from 'react';
import { Popup } from 'semantic-ui-react';

const TooltipElement = (props) => {
  const { attributes, children, element } = props;
  const { data = {} } = element;

  return (
    <Popup
      position={'left'}
      trigger={
        <span className={'with-popup'} {...attributes}>
          {children}
        </span>
      }
    >
      My tooltip content
    </Popup>
  );
};

export default TooltipElement;
```

### Element editor schema

The `makeInlineElementPlugin` takes a Schema for edit component of Element and saves the data in the editor.

```js
export const TooltipEditorSchema = {
  title: 'Add Tooltip',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['tooltip_pointing'],
    },
  ],
  properties: {
    tooltip_pointing: {
      title: 'Pointing',
      type: 'string',
      factory: 'Choice',
      choices: [
        ['pointing', 'Up'],
        ['right pointing', 'Right'],
        ['left pointing', 'Left'],
        ['pointing below', 'Down'],
      ],
    },
  },
  required: [],
};
```

### Create a withTooltip extension

Define Tooltip element as an inline node.

```js
export const withTooltip = (editor) => {
  const { normalizeNode, isInline } = editor; // we can also normalize plugin data here

  editor.isInline = (element) => {
    return element.type === TOOLTIP ? true : isInline(element);
  };

  return editor;
};
```

### Volto configuration registry

Finally register the plugin in volto configuration.

```js
import installEditor from './editor';
export default function install(config) {
  config.settings.tooltip = [...(config.settings.tooltip || []), TOOLTIP];
  config = installEditor(config);

  return config;
}
```
