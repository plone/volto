---
myst:
  html_meta:
    "description": "volto-slate API"
    "property=og:description": "volto-slate API"
    "property=og:title": "volto-slate API"
    "keywords": "Volto, Plone, frontend, React, volto-slate, Editor, Slate, API"
---

(volto-slate-api-label)=

# `volto-slate` API

The `volto-slate` API provides methods to integrate the Slate editor into projects that use Plone's React-based frontend Volto.


(volto-slate-api-extensions-label)=

## Extensions

An extension in `volto-slate` is a function which takes Slate's [`Editor` object](https://docs.slatejs.org/concepts/07-editor) and returns its extended version
This allows a developer to modify and add several functionalities to a Slate `Editor`.
For example, to define link elements as inline nodes, we override `isInline` from the `Editor` object.

```js
export const isInline = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return element && element.type === 'link' ? true : isInline(element);
  };

  return editor;
};
```


(volto-slate-api-plugins-label)=

## Plugins

Plugins are the way to extend the capabilities of `volto-slate` by adding extra features to {term}`elementEditor`.

See the [default plugins](https://github.com/plone/volto/tree/main/packages/volto-slate/src/editor/plugins).

Refer to {ref}`writing-plugins-label` for how to write your own plugin.


(volto-slate-api-SlateEditor-component-label)=

## `SlateEditor` component

`SlateEditor` is a top-level React component.
It can be directly used in widgets to create a `slateJSON` field.
For example, the following snippet creates a rich text `SlateEditor` component:

```jsx
<FormFieldWrapper {...props} draggable={false} className="slate_wysiwyg">
  <div
    className="slate_wysiwyg_box"
    role="textbox"
    tabIndex="-1"
    onClick={() => {}}
    onKeyDown={() => {}}
  >
    <SlateEditor
      className={className}
      readOnly={readOnly}
      id={id}
      name={id}
      value={value}
      onChange={(newValue) => {
        onChange(id, newValue);
      }}
      block={block}
      selected={selected}
      properties={properties}
      placeholder={placeholder}
    />
  </div>
</FormFieldWrapper>
```


(volto-slate-api-elementEditor-label)=

## `elementEditor`

The {term}`elementEditor` is a top-level wrapper of all plugins used in `volto-slate` that exposes the plugins API in the form of `makeInlineElementPlugin`.
It consists of various modules:

`makeInlineElementPlugin`
:   Used to build and install a custom schema based plugin from `volto-slate` API.
    It expects a set of options passed as a property to your plugin.

`PluginEditor`
:   Editor component for your Plugin.

`ToolbarButton`
:   Custom plugin `ToolbarButton`.

```{note}
You will get to know more about `elementEditor` in {ref}`writing-plugins-label`.
```


(volto-slate-api-serialization-label)=

## Serialization

Serialization is the conversion of Slate JSON data into common formats such as text, HTML, and Markdown.
Common serializers used in `volto-slate` are `serializeNodes`, `serializeNodesToText`, and `serializeNodesToHtml`.


(volto-slate-api-deserialization-label)=

## Deserialization

Deserialization is the transformation of arbitrary inputs into a Slate-compatible JSON structure.
`volto-slate` uses Slate's own mechanism of deserialization using `slate-hyperscript` package.
Deserialization helps control what data comes into Slate per element.
It is called before the `editorElement` component for a plugin.

Following is the deserialization method for `simpleLink` plugin:

```js
export const simpleLinkDeserializer = (editor, el) => {
  let parent = el;

  let children = Array.from(parent.childNodes)
    .map((el) => deserialize(editor, el))
    .flat();

  if (!children.length) children = [{ text: '' }];

  const attrs = {
    type: SIMPLELINK,
    data: {
      url: el.getAttribute('href'),
    },
  };

  return jsx('element', attrs, children);
};
```


(volto-slate-api-normalization-label)=

## Normalization

Normalization ensures that Slate's data is always in its standard form.
It is used as a part of the extensions for a particular plugin or a Slate editor itself.

Slate's data model should adhere to constraints provided in [Slate's Normalizing documentation](https://docs.slatejs.org/concepts/11-normalizing#built-in-constraints).

However, we can customize the functionality to add our own set of conditions by extending the `normalizeNode` method of the Slate editor.

For example, remove all `img` nodes inside `p` nodes.

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
