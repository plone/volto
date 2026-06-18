---
myst:
  html_meta:
    "description": "The edit component part of a block anatomy is specially different to the view component because they have to support the UX for editing the block."
    "property=og:description": "The edit component part of a block anatomy is specially different to the view component because they have to support the UX for editing the block."
    "property=og:title": "Blocks - Edit components"
    "keywords": "Volto, Plone, frontend, React, Blocks, Edit, components"
---

# Blocks - Edit components

The edit component part of a block anatomy is specially different to the view component because they have to support the UX for editing the block.
This UX can be very complex depending on the kind of block and the feature that it is trying to provide.
The project requirements will tell how far you should go with the UX story of each block, and how complex it will become.
You can use all the props that the edit component is receiving to model the UX for the block and how it will render.

See the complete list of {ref}`block-edit-component-props-label`.

We have several UI/UX artifacts in order to model our block edit component UX.
The sidebar and the object browser are the main ones.

## Sidebar

We can use the new sidebar when building our block's edit components.
The sidebar is a new UI asset that is available in Volto 4.
You need to instantiate it this way:

% ex-01: Basic sidebar portal example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Basic sidebar portal example
:end-before: // Sidebar popup basic example
```

Everything that's inside the `SidebarPortal` component will be rendered in the sidebar. 

For a more complete example with form integration:

% ex-02: Advanced sidebar portal with form
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Advanced sidebar portal with form example
:end-before: // Sidebar popup example
```

If you need an extra layer of configuration within `SidebarPortal`, you can use `SidebarPopup`.

% ex-04: Sidebar popup example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Sidebar popup basic example
:end-before: // Complete sidebar example with form
```

## Schema driven automated block settings forms

A helper component is available in core in order to simplify the task of defining and rendering the settings for a block: the `BlockDataForm` component.

```{note}
`BlockDataForm` is a convenience component around the already available in core `InlineForm` that takes care of some aspects exclusively for Volto Blocks, like Variants and schemaExtenders. You can still use `InlineForm` across Volto, but using `BlockDataForm` is recommended for the blocks settings use case.
```

The edit block settings component needs to be described by a schema that matches the format used to serialize the content type definitions. The widgets that will be used in rendering the form follow the same algorithm that is used for the regular metadata fields for the content types. As an example of schema, it could look like this:

% ex-05: Iframe schema example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: js
:start-after: // Iframe schema example
:end-before: // ===== Object Browser Examples =====
```

To render this form and make it available to the edit component:

% ex-02: Advanced sidebar portal with form
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Advanced sidebar portal with form example
:end-before: // Sidebar popup example
```

## Object Browser

Volto 4 has a new object browser component that allows you to select an existing content object from the site.
It has the form of an HOC (High Order Component), so you have to wrap the component you want to be able to call the object browser from with it, like this:

% ex-06: withObjectBrowser HOC example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Basic HOC example
:end-before: // Open object browser examples
```

The HOC component `withObjectBrowser` wraps your component by making available this props:

- isObjectBrowserOpen - (Bool) tells if the browser is currently open
- openObjectBrowser - handler for opening the browser
- closeObjectBrowser - handler for closing the browser

By default, it's enabled for all the component tree under the Blocks Editor, so it's available already for all the blocks in edit mode.
However, if you need to instantiate it somewhere else, you can do it anyways by wrapping your component with it.

```{note}
The default image block in Volto features both the Sidebar and the object browser, take a look at its source code in case you need more context on how they work.
```

(openobjectbrowser-handler-api-label)=

### openObjectBrowser handler API

If you want to open an `ObjectBrowser` from your Block, you need to call the `openObjectBrowser` function you'll find in the props of your block component.
This function has this signature:

```
@param {Object} object ObjectBrowser configuration.
@param {string} object.mode Quick mode, defaults to `image`.
@param {string} object.dataName Name of the block data property to write the selected item.
@param {string} object.onSelectItem Function that will be called on item selection.
```

These are some examples on how to use it:

% ex-07: openObjectBrowser usage examples
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Open object browser examples
:end-before: // Object browser widget examples
```

### ObjectBrowserWidget

This widget shows an objectBrowser to find content/contents on site.

It is the default widget for vocabulary fields that uses `plone.app.vocabularies.Catalog`.

It works in 3 different mode:

- `image`: The field value is an object.
  The path of selected item is saved in `url` property of value object. (`fieldName: {url:''}`)
- `link`: The field value is an object.
  The path of selected item is saved in `href` property of value object. (`fieldName: {href:''}`)
- `multiple`: The field value is an array of objects.

#### `return` prop

The object widget returns always an array, even if it's meant to have only one object in return. In order to fix that situation and do not issue a breaking change, a `return` prop is being introduced, so if its value is `single`, then it returns a single value:

% ex-08: ObjectBrowserWidget example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Object browser widget examples
:end-before: // Plone specific examples
```

```{note}
This situation will be fixed in subsequent Volto releases.
```

#### PropDataName vs dataName

- `dataName` is the prop inside `data` object, used for `link` and `image` mode.
- `PropDataName` is the name of field which value is `data`. It's used for `multiple` mode.

For example:

% ex-09: Content example with object browser fields
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: js
:start-after: // Content example with object browser fields
:end-before: // Blocks schema example with object browser widget
```

if we use object browser widget for fields:

- `related_pages`: propDataName is `related_pages` and `dataName` is `null`.
- `image`: dataName is `url` and `propDataName` is `null`.
- `link`: dataName is `href` and `propDataName` is `null`.

#### Usage in blocks schema

Used in along with `InlineForm`, one can instantiate and configure it using the widget props like this:

% ex-10: Blocks schema example with object browser widget
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: js
:start-after: // Blocks schema example with object browser widget
:end-before: // Iframe schema example
```

#### selectedItemAttrs

You can select the attributes from the object (coming from the metadata brain from
@search endpoint used in the browser) using the `selectedItemAttrs` prop as shown in the
last example.

#### allowExternals

You can allow users to type manually an URL (internal or external). Once validated, it
will tokenize the value. As a feature, you can paste an internal URL (eg. the user copy
the URL from the browser, and paste it in the widget) and will be converted to a
tokenized value, as if it was selected via the Object Browser widget.

#### ObjectBrowserWidgetMode()

Returns the component widget with `mode` passed as argument.

The default mode for ObjectBrowserWidget is multiple. If you would like to use this widget with link or image mode as widget field for a specific field id (for example), you could specify in in config.js as:

% ex-11: ObjectBrowserWidgetMode example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Widget mode configuration
:end-before: // ===== Sidebar Examples =====
```

#### Selectable types

If `selectableTypes` is set in `widgetOptions.pattern_options`, then only items whose content type has a name that is defined in `widgetOptions.pattern_options.selectableTypes` will be selectable.

% ex-12: Selectable types example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Object browser widget examples
:end-before: // Plone specific examples
```

You can also set the `selectableTypes` from `plone` when declaring a field for `contenttype`:

% ex-13: Plone selectable types example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Plone specific examples
:end-before: // Widget mode configuration
```

#### `maximumSelectionSize`

If `maximumSelectionSize` is set in `widgetOptions.pattern_options`, the widget allows to select at most the `maximumSelectionSize` number of items defined in `widgetOptions.pattern_options.maximumSelectionSize`.

% ex-14: Maximum selection size example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Object browser widget examples
:end-before: // Plone specific examples
```

You can also set the `maximumSelectionSize` from `plone` when declaring a field for `contenttype`:

% ex-15: Plone maximum selection size examples
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // Plone specific examples
:end-before: // Widget mode configuration
```

#### `onlyFolderishSelectable`

If `onlyFolderishSelectable` is set to `true` in `widgetOptions.pattern_options`, only folderish (container) items can be selected. This is useful when you want users to select only folders or other container-type content.

```jsx
<ObjectBrowserWidget ... widgetOptions={{pattern_options:{onlyFolderishSelectable:true}}}>
```

You can also set the `onlyFolderishSelectable` from `plone` when declaring a field for `contenttype`:

```jsx
form.widget(
  'location',
  RelatedItemsFieldWidget,
  (vocabulary = 'plone.app.vocabularies.Catalog'),
  (pattern_options = {
    onlyFolderishSelectable: true,
  }),
);
```

You can combine `onlyFolderishSelectable` with other options like `selectableTypes` and `maximumSelectionSize`:

```jsx
form.widget(
  'location',
  RelatedItemsFieldWidget,
  (vocabulary = 'plone.app.vocabularies.Catalog'),
  (pattern_options = {
    onlyFolderishSelectable: true,
    selectableTypes: ['Folder'],
    maximumSelectionSize: 1,
  }),
);
```

#### Direct prop passing to ObjectBrowserWidget

You can also pass `onlyFolderishSelectable`, `selectableTypes`, and `maximumSelectionSize` directly as props to the `ObjectBrowserWidget` component (in addition to or instead of using `widgetOptions.pattern_options`):

```jsx
<ObjectBrowserWidget
  id="location"
  mode="link"
  onChange={(id, data) => console.log(data)}
  onlyFolderishSelectable={true}
  selectableTypes={['Folder']}
  maximumSelectionSize={1}
/>
```

This approach is useful when you're using `ObjectBrowserWidget` directly in your components rather than through the schema-driven form system. The widget will prioritize values from `widgetOptions.pattern_options` if both are provided.

## Reusing the blocks engine in your components

You can render a blocks engine form with the `BlocksForm` component.

% ex-16: BlocksForm component example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // ===== DragDropList Example =====
:end-before: // ===== Constants =====
```

The current block engine is available as the separate `BlocksForm` component,
used to be a part of the `Form.jsx` component. It has been previously exposed
as the [`@eeacms/volto-blocks-form`](https://github.com/eea/volto-blocks-form)
addon and reused in several other addons, so you can find integration examples
in addons such as
[`volto-columns-block`](https://github.com/eea/volto-columns-block),
[`volto-accordion-block`](https://github.com/rohberg/volto-accordion-block),
[`@eeacms/volto-accordion-block`](https://github.com/eea/volto-accordion-block),
[`@eeacms/volto-grid-block`](https://github.com/eea/volto-accordion-block), but
probably the simplest implementation to follow is in the
[`@eeacms/volto-group-block`](https://github.com/eea/volto-group-block)

Notice that the `BlocksForm` component allows overriding the edit block
wrapper and allows passing a custom `blocksConfig` configuration object, for
example to filter or add new blocks.

You can also reuse the DragDropList component as a separate component:

% ex-17: DragDropList component example
```{literalinclude} ../_examples/blocks/basic/block-examples.jsx
:language: jsx
:start-after: // ===== DragDropList Example =====
:end-before: // ===== Constants =====
```

Check the source code of `volto-columns-block` and
[`volto-taxonomy`](https://github.com/eea/volto-taxonomy/) for details on
how to reuse this component.
