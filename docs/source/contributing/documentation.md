---
myst:
  html_meta:
    "description": "Documentation in Volto"
    "property=og:description": "Documentation in Volto"
    "property=og:title": "Documentation in Volto"
    "keywords": "Volto, Plone, frontend, React, Documentation, MyST, Storybook, Vale, spell, grammar, style, check, linkcheck"
---

(volto-documentation-label)=

# Documentation

> "If it ain't documented, it's broken."

Documentation in Volto has two parts, {ref}`narrative <volto-documentation-narrative-label>` and {ref}`Storybook <volto-documentation-storybook-label>`.


(volto-documentation-narrative-label)=

## Narrative documentation

Volto follows the guidance of {doc}`plone:index` and uses the same tools when writing narrative documentation.

We use Sphinx to build and check documentation.

We use MyST, an extended flavor of Markdown that allows the use of reStructuredText and Sphinx extensions to provide a rich experience.

The {doc}`plone:index` also provides excellent references for writing high quality narrative documentation.

-   {doc}`plone:contributing/documentation/authors`
-   {doc}`plone:contributing/documentation/myst-reference`
-   {doc}`plone:contributing/documentation/themes-and-extensions`


### Building and checking the quality of narrative documentation

You can use Make commands to run Sphinx to build and check documentation.
All build and check documentation commands use the file `Makefile`.

In Volto, all documentation commands are prefixed with `docs-`.
You should run these commands from the root of the `volto` repository.

To see the all Make commands, use the following command.

```shell
make help
```

Else you can open `Makefile` to see other build formats.


#### Warnings from `make docs-*` commands

When running any of the documentation Make commands, you may safely ignore warnings such as the following:

```console
/system-file-to-path/volto/docs/source/news/5294.breaking: WARNING: document isn't included in any toctree
```

These warnings only check each of the changelog entries for valid MyST syntax.
We do not want to include them in the documentation through a toctree entry, because the release process copies them into the {doc}`../release-notes/index` and deletes them.
Thus it is safe to ignore warnings of this specific type, but you should heed all others.


#### `docs-html`

`docs-html` is the HTML version of the documentation.

```shell
make docs-html
```

Open `/docs/_build/html/index.html` in a web browser.


#### `docs-livehtml`

`docs-livehtml` rebuilds Sphinx documentation on changes, with live-reload in the browser.

```shell
make docs-livehtml
```

Open http://127.0.0.1:8000/ in a web browser.


#### `docs-linkcheck`

`docs-linkcheck` checks all links.
See {ref}`plone:authors-linkcheck-label` for configuration.

```shell
make docs-linkcheck
```

Open `/docs/_build/linkcheck/output.txt` for a list of broken links.


#### `docs-linkcheckbroken`

`docs-linkcheckbroken` runs `docs-linkcheck`, but returns only errors and provides coloring on the console.

```shell
make docs-linkcheckbroken
```

Open `/docs/_build/linkcheck/output.txt` for a list of broken links.


#### `docs-vale`

`docs-vale` checks for American English spelling, grammar, syntax, and the Microsoft Developer Style Guide.

```shell
make docs-vale
```

See the output on the console for suggestions.

```{seealso}
See {ref}`plone:authors-english-label` for basic usage.

See {ref}`plone:authors-advanced-vale-usage-label` for Vale configuration, integration with popular IDEs, and other tips.
```


(volto-documentation-storybook-label)=

## Storybook entry

[Storybook](https://storybook.js.org) is a tool that demonstrates the visual elements in a system.
Storybook provides a sandbox to build, test, and document these visual elements (components) in isolation, mock them to show different data, test edge cases.

Components include widgets, blocks, and basic and structural items.
When you develop a component, we encourage you to create or update its [Volto Storybook](https://6.docs.plone.org/storybook/) entry.
As an example of how to do that, you can copy the existing Storybook entry for the `RichTextWidget` component.

-   https://github.com/plone/volto/blob/main/packages/volto/src/components/theme/Widgets/RichTextWidget.stories.jsx#L3
-   https://github.com/plone/volto/blob/main/packages/volto/src/components/theme/Widgets/RichTextWidget.jsx

To build the Volto Storybook locally and test your entry, run the following command from the repository root.

```shell
make storybook-build
```


(link-to-storybook-entries-from-documentation)=

### Link to Storybook entries from documentation

To hyperlink to Storybook entries from the narrative documentation, you can use one of two syntaxes.

Use HTML syntax to enable hyperlinking in development, within Netlify preview builds, and when the main Plone documenation is updated.
Hyperlinking in development requires that you run both `make docs-html` and `make storybook-build` commands once, then whenever you update either the narrative documentation or the Storybook.

% sphinx-examples does not render HTML

```html
<a href="/storybook/index.html?path=/story/edit-widgets-colorpicker--default">color picker widget</a>
```

<a href="/storybook/index.html?path=/story/edit-widgets-colorpicker--default">color picker widget</a>

Use CommonMark syntax to point only to the main production Plone documentation.

```{example}
[color picker widget](https://6.docs.plone.org/storybook/index.html?path=/story/edit-widgets-colorpicker--default)
```
