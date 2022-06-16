---
html_meta:
  'description': 'Volto slate API documentation'
  'property=og:description': 'Volto slate API documentation.'
  'property=og:title': 'Volto slate API'
  'keywords': 'Volto, Plone, frontend, React, Volto slate, Editor,slate,API'
---

# API documentation

## Extensions

An extension in volto-slate is a function which takes slate's [editor](https://docs.slatejs.org/concepts/07-editor) object and return its extended version modifying and adding several functionalities.
<br>
For example: To define link elements as inline nodes, we override `isInline` from Editor object.

```js
export const isInline = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return element && element.type === 'link' ? true : isInline(element);
  };

  return editor;
};
```

## Plugins

Plugins are the way to extend the capabilites of volto-slate by adding extra features to Element Editor.

See [`default Plugins`](https://github.com/plone/volto/tree/slate-integration/packages/volto-slate/src/editor/plugins)

Refer {ref}`writing-plugins-label` for info on how to write your own plugin.

## Slate Editor

A Top level slate Editor component. It can be directly used in widgets to create a `slateJSON` field.<br/>
See [`RichTextSlate Widget`](https://github.com/plone/volto/blob/slate-integration/packages/volto-slate/src/widgets/RichTextWidget.jsx)

## Element Editor

A top wrapper of all plugins used in volto-slate which exposes plugins API in the form of `makeInlineElementPlugin`. It consists of various modules:

- <b>makeInlineElementPlugin</b>: Used to build and install a custom schema based plugin from Volto-slate API. It expects a set of options passed as a property to your plugin.
- <b>PluginEditor</b>: Editor component for your Plugin.
- <b>Toolbar Button</b>: Custom Plugin ToolbarButton.

```{note}
You will get to know more about Element Editor in {ref}`writing-plugins-label`
```

## Serializing

Conversion of slate JSON data into common formats like Text, HTML and Markdown. Common serializers used in volto-slate are `serializeNodes`, `serializeNodesToText` and `serializeNodesToHtml`.

## Deserializing

Transforming of aribitrary input into a Slate-compatible JSON structure. Volto-slate uses slate's own mechanism of deserialization using `slate-hyperscript` package. Deserialization helps control what data comes into slate per element. Its called before editor Element for a plugin.

See [`simpleLinkDeserializer`](https://github.com/plone/volto/blob/slate-integration/packages/volto-slate/src/editor/plugins/Link/extensions.js#L34)

## Normalization

Normalization ensures that the slate's data is always in its standard form. It is used as a part of extensions for a particluar Plugin or Slate editor itself.

Slate's data model should adhere to contraints provided in [slate documentation](https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints).

However, we can customize the functionality to add our own set of conditions by extending the `normalizeNode` method of slate editor.

For example, Remove all `img` nodes inside paragraphs node.

```js
const removeImgChild = (editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (Element.isElement(node) && node.type === 'p') {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Element.isElement(child) && child.type === 'img') {
          Transforms.removeNodes(editor, { at: childPath });
          return;
        }
      }
    }
    normalizeNode(entry);
  };

  return editor;
};
```
