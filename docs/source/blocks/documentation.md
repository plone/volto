---
myst:
  html_meta:
    "description": "Document your blocks in Markdown files next to them, for agents, reference documentation, and other developers"
    "property=og:description": "Document your blocks in Markdown files next to them, for agents, reference documentation, and other developers"
    "property=og:title": "Document your blocks"
    "keywords": "Volto, Plone, frontend, React, blocks, documentation, agents, LLM, Markdown"
---

(blocks-documentation)=

# Document your blocks

A block's schema says which fields it has, but not what they mean, which values belong together, or what a complete block looks like.
That knowledge usually lives only in the block's code and in its developers' heads.

Volto lets each block carry its own documentation, written in Markdown next to the block.
The documentation describes the data that the block stores, so that anyone who writes that data gets it right:

-   agents, such as an LLM that creates pages through the Plone MCP server,
-   reference documentation generated for a site,
-   and developers who work with the block.

Only the frontend knows which blocks a site has, since core, add-ons, and the project's configuration all register and customize them.
So the Volto server publishes the documentation, together with each block's schema and variations, at the `@blocks-schema` endpoint.
See {doc}`../reference/blocks-schema-endpoint`.

(blocks-documentation-writing)=

## Write the documentation of a block

Write the documentation of a block in a Markdown file next to it, with a name that ends in `.block.md`, such as `docs.block.md`.
Its frontmatter names the block by its ID.

````markdown
---
block: mainslider
---

Shows a slider with the pages chosen by an editor.

Each slide links to a content item and shows its lead image.

### Fields

- `slides`: a list of `{ "href": [{ "@id": path }] }` objects.

### Example

```json
{
  "@type": "mainslider",
  "slides": [{ "href": [{ "@id": "/news/annual-report" }] }]
}
```
````

There is nothing to register.
When Volto builds, it collects the `*.block.md` files of core Volto and of every add-on, and only the {doc}`@blocks-schema endpoint <../reference/blocks-schema-endpoint>` uses them.
They are not part of the block configuration, and they are not included in the code sent to the browser.
The endpoint only returns them to authenticated users.
Still, any user who can log in can read them, so don't put anything in them that only some users should see.

If two files document the same block, the one from the add-on that loads later wins.
This lets an add-on or a project replace the documentation of a core block.

Follow these conventions, so the documentation reads well in every format.

-   The first paragraph is the summary of the block.
    The endpoint uses it as the block's `description` in the list of blocks.
-   Use `###` for headings inside the documentation.
    The endpoint puts each block under a `##` heading.
-   Describe the stored data, not the editor interface.
    For example, explain the format of a field, which values it accepts, and which fields go together.
-   Add at least one complete example of the block data in a `json` code block.
-   Don't repeat what the schema already says.
    The endpoint returns the schema next to the documentation.
-   Don't write values that depend on the configuration or on the site into the documentation, such as the available variations or the catalog indexes of a query.
    Use a placeholder, or refer to where they come from, such as the `@querystring` endpoint of the Plone REST API.

## Document a variation

To document a variation, add another file with the `variation` in its frontmatter.

```markdown
---
block: listing
variation: imageGallery
---

Shows the images of the items as a gallery.
```

The endpoint shows it with the variation.

(blocks-documentation-document-models)=

## Document models

A document model is how content stores its blocks.
Volto's is `plone.blocks`: the blocks keyed by ID in the `blocks` field, and their order in `blocks_layout.items`.
An add-on can store the blocks of some content types differently.
For example, the Plone Aurora editor stores a whole page as one Plate document in a single block, with the `plone.plate` document model.

The `@blocks-schema` endpoint announces the document model of the content in `document_model`, and returns its documentation in `document`.
See {ref}`blocks-schema-document-model`.

### Document a document model

Document a document model in a `*.block.md` file whose frontmatter names it with `document_model`.

````markdown
---
document_model: plone.blocks
---

Content stores its blocks in two fields.
`blocks` maps each block ID to the block data, with the block type in `@type`.
`blocks_layout.items` lists the block IDs in the order they are shown.

```json
{
  "blocks": { "7c9d2b1e": { "@type": "title" } },
  "blocks_layout": { "items": ["7c9d2b1e"] }
}
```
````

Volto documents `plone.blocks` in {file}`packages/volto/src/components/manage/Blocks/document-model.block.md`.
As for blocks, the file from the add-on that loads later wins.
Use `###` for headings inside it, because the endpoint puts it under a `##` heading.

### Document an element

A document model can have native elements that aren't blocks, such as the paragraphs and headings of a Plate document.
Document an element in a `*.block.md` file whose frontmatter names it with `element`, and gives it a `title`.
One file can document several elements, separated by commas.

```markdown
---
element: h2, h3, h4
title: Heading
---

A heading of the page.
```

The endpoint only returns the elements that the document model lists.

### Add a document model

Register a document model as a `documentModel` utility, named by its ID.

```js
config.registerUtility({
  name: 'plone.plate',
  type: 'documentModel',
  method: () => ({
    id: 'plone.plate',
    version: 1,
    // The content types that use it, from the add-on's own configuration.
    types: () => config.settings.PlateEditorContentTypes,
    // The items of the list: the elements, then the blocks.
    items: ({ elements, blocks }) => [
      ...elements(['p', 'h2', 'h3']),
      ...blocks(['plateimage']),
    ],
    // One item, or `undefined` for a 404.
    item: (id, { element, block }) =>
      element(id) || (id === 'plateimage' ? block(id) : undefined),
  }),
});
```

`version` is the version of the stored data.
Increase it when the data changes in a way that clients of the previous version can't read.

`types` returns the content types that use the document model.
Read them from the configuration that decides how the frontend edits those types, so that they are only listed in one place.
Content types that no document model lists use `plone.blocks`.

`items` and `item` receive helpers that build the items as the endpoint does.

`blocks(keys)`
:   The summaries of the blocks offered for the content.
    With a list of keys, the summaries of those blocks, whether they are offered or not.

`block(key)`
:   The documentation, schema, and variations of one block.

`elements(names)`
:   The summaries of the documented elements, or of the given ones.

`element(name)`
:   The documentation of one element.

They also receive the `blocksConfig`, the `context` of the content, if any, and an `intl` object.
Without `items` or `item`, the endpoint returns the blocks, as for `plone.blocks`.

(blocks-documentation-placeholders)=

## Placeholders

`{{key}}` in the documentation is replaced with the value of that key in the block configuration.
A list becomes a comma-separated list of code spans, and a string or a number is inserted as it is.
For example, the grid block's documentation says:

```markdown
It holds up to {{maxLength}} blocks.
The allowed blocks are {{allowedBlocks}}.
```

Only top-level keys of the block configuration are available.
If a key has no such value, the placeholder is removed and the server logs a warning.
To write `{{` literally, escape it as `\{{`.

## Tailor the documentation

For special cases, a block's configuration can have a `docs` function.
It receives the block configuration, an `intl` object, and the `markdown` of the block's file with its placeholders filled in.
It returns the documentation to use.

```js
config.blocks.blocksConfig.mainslider = {
  // ...
  docs: ({ blockConfig, markdown }) =>
    `${markdown}\n\nThis site shows ${blockConfig.slidesToShow} slides at a time.`,
};
```

If it throws or doesn't return a string, the endpoint uses the file's documentation.

```{note}
The documentation is in English and is not translated.
The titles in the returned schemas are translated into the language of the request.
```
