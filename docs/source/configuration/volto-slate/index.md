---
myst:
  html_meta:
    "description": "What is volto-slate"
    "property=og:description": "What is volto-slate"
    "property=og:title": "volto-slate"
    "keywords": "Volto, Plone, frontend, React, Slate, volto-slate"
---

(volto-slate-label)=

# `volto-slate`

`volto-slate` is an interactive default text editor for Volto, developed on top of {term}`Slate`.
It offers enhanced WYSIWYG functionality and behavior.
See a [brief elevator pitch for `volto-slate`](https://www.youtube.com/watch?v=SOz-rk5e4_w).

We believe that Volto's rich text form editor (the Volto Composite Page editor) needs strong integration between the rich text capabilities and the rest of the Volto blocks.
Some examples of the kind of strong integration we have in mind:

-   Pasting complex documents inside a `volto-slate` text block will create multiple Volto blocks.
    Images will be converted to Volto image blocks, tables will be converted to Volto table blocks, and so on.
-   The text block accepts drag-and-drop images, and it will upload them as Volto image blocks.
-   `volto-slate` has a {guilabel}`Table` button with the familiar {guilabel}`size` input, but it creates a table block.

Although this add-on is in an early alpha stage, we have solved most of the big issues.
The API has stabilized, and we have already started several add-ons based on it, including [`volto-slate-metadata-mentions`](https://github.com/eea/volto-slate-metadata-mentions/) and [`volto-slate-zotero`](https://github.com/eea/volto-slate-zotero).


(volto-slate-why-another-wysiywg-editor-label)=

## Why another WYSIWYG editor?

Some of the main reasons that drove us to create `volto-slate`, instead of enhancing Volto's Draft.js implementation, include the following:

-   Volto's Draft.js implementation depends on `draft-js-plugins`, a third-party project that introduces its own set of bugs and maintenance issues.
-   Slate has a modern, developer-friendly API that makes developing plugins easier.
    Getting the editor in a plugin is as easy as `const editor = useSlate()`.
    We can override core functionality, something that is built in as pluggable, directly in Slate.
-   Volto's Draft.js-based implementation depends on Redraft for its final output, which comes with its own bugs and issues.
    While it is nice to have view-mode components, this is something that `volto-slate` implements just as well.
-   Because Slate's internal storage uses a tree modeled on the {term}`DOM` pattern, its final rendered output is very clean.
    Note: the Slate editor value is a JSON object, similar to the Draft.js-based implementation.


(volto-slate-contents-label)=

## Contents

```{toctree}
:maxdepth: 2

api
configuration-settings
writing-plugins
```
