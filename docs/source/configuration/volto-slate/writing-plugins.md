---
html_meta:
  "description": "How to write a volto-slate plugin"
  "property=og:description": "How to write a volto-slate plugin"
  "property=og:title": "Write a volto-slate plugin"
  "keywords": "Volto, Plone, frontend, React, Slate, Slate-React, volto-slate, plugins"
---

(writing-plugins-label)=

# How to write custom plugins

This section will guide you through registering a custom plugin for `volto-slate`.

## Adding a tooltip to a text section

You will add a plugin that will create a tooltip when selecting a text element in a Slate editor.

Start by creating a file named `index.js`, which will instantiate {term}`elementEditor`.

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

The `makeInlineElementPlugin` builds the schem-based plugin `Editor` with the given properties.

```{note}
For non-schema based plugins, you can build your own set of `persistentHelpers`, which will render when the plugin is selected.
For example refer {ref}`persistent-helpers-label`.
```

### Add tooltip button

Register the Slate toolbar button for the tooltip.

```js
const { slate } = config.settings;
slate.toolbarButtons = [...(slate.toolbarButtons || []), 'tooltip'];
slate.expandedToolbarButtons = [
  ...(slate.expandedToolbarButtons || []),
  'tooltip',
];
```

### `View` and `Edit` components for `Element`

Next add a React component for `Element`
Name it as `TooltipElement`.
This will serve as an edit and view mode for our plugin element.

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

### `elementEditor` schema

The `makeInlineElementPlugin` takes a schema for an edit component of `Element`, and saves the data in the editor.

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

### Create a `withTooltip` extension

Define a `Tooltip` element as an inline node.

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

Finally register the plugin in Volto's configuration.

```js
import installEditor from './editor';
export default function install(config) {
  config.settings.tooltip = [...(config.settings.tooltip || []), TOOLTIP];
  config = installEditor(config);

  return config;
}
```
