---
html_meta:
  "description": "What is volto-slate"
  "property=og:description": "What is volto-slate"
  "property=og:title": "volto-slate"
  "keywords": "Volto, Plone, frontend, React, Slate, volto-slate"
---

# Volto slate

An interactive default text editor for Volto, developed on top of [slate](https://docs.slatejs.org/) which offers enhanced WYSIWYG functionality and behavior. See a brief elevator pitch for volto-slate: https://youtu.be/SOz-rk5e4_w

We believe that, Volto's richtext form editor (the Volto
Composite Page editor) needs strong integration between the rich text
capabilities and the rest of the Volto blocks. Some examples of the kind of
strong integration we have in mind:

- Pasting complex documents inside a volto-slate text block will create
  multiple Volto blocks: images will be converted to Volto Image blocks, tables
  will be converted to Volto Table blocks, etc.
- The text block accepts drag&drop images and it will upload them as Volto Image blocks.
- volto-slate has a Table button with the familiar size input, but it create a Table block

While this addon is still in an early alpha stage, we've solved most of the big
issues, the API starts to stabilize and we've already started several addons
based on it: https://github.com/eea/volto-slate-metadata-mentions/ and
https://github.com/eea/volto-slate-zotero

## Why

Some of the main reasons that drove us to create volto-slate instead of
enhancing Volto's draftjs implementation:

- Volto's draftjs implementation depends on draft-js-plugins, a third-party
  project that introduces its own set of bugs and maintanance issues
- Slate has a modern, developer-friendly api that makes developing plugins
  something easy to do. Getting the editor in a plugin is as easy as `const editor = useSlate()`, overriding core functionality is something that's built
  in as pluggable, directly in Slate.

- Volto's draft based implementation depends on Redraft for its final output,
  which comes with its own bugs and issues. While it is nice to have view-mode
  components, this is something that volto-slate implements just as well.
- Because Slate's internal storage uses a tree modeled on the DOM pattern, its
  final rendered output is very clean. Note: The Slate editor value is a JSON
  object, similar to the Draftjs based implementation.

# Concepts

```{toctree}
:maxdepth: 2

api-documentation
configuration-settings
writing-plugins
```
