## Plugin configuration

There are multiple types of plugins:

1. `TextBlockEdit` extensions
2. `TextBlockEdit` keyboard handlers
3. `SlateEditor` plugins
4. `SlateEditor` extensions

To configure a new volto-slate plugin as in the (3) list item above, you need to do something like this:

1. create a new directory inside the `plugins` directory
2. inside it create an `index.js` file with contents similar to these:

```js
export default function install(config) {
  const settings = config.settings;
  settings.slate.buttons = [
    ...settings.slate.buttons,
    'block-quote': <BlockButton ... />
  ];

  return config;
}
```

3. add the reference to this install function inside the `plugins/index.js` file

## Available plugin extension points

Their initializations can be found inside `/src/editor/config.jsx`.

- `slate.buttons` - _Object_. Define new buttons as properties of this object with `string` keys
- `slate.toolbarButtons` - _List_. Add new buttons to the hovering toolbar
- `slate.expandedToolbarButtons` - _List_. Add new buttons to the expanded (fixed) toolbar
- `slate.elements` - _Object_. Define new block elements as properties of this object with `string` keys
- `slate.extensions` - _List_. Decorator functions receiving a Slate.js `Editor` instance and returning a modified `Editor` instance object
- `slate.nodeTypesToHighlight` - _List_. Slate.js type strings (e.g. `"paragraph"`, `"image"` etc.) for the types to be highlighted in the `SlateEditor`
- `slate.htmlTagsToSlate` - _Object_. Contains properties like this: if the property's key is `A`, the value of this property is a function receiving an `editor` parameter of type (Slate.js) `Editor` and an `el` Slate Element and this function handles link deserialization (`A` is the HTML tag name for links).

### For all the extension points of List type listed above

If replacing it with a new list reference, please take into account the old list stored in the previous reference.

### In addition to the above extension points

Besides all these Volto Slate extension points there are all the other extension points of Volto for Volto Addons such as adding a new block type (the method of adding a new block type from a Volto Slate plugin is used in the `Footnote` plugin).
