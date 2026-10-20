---
myst:
  html_meta:
    "description": "Document your blocks, and get the documentation and schemas of a site's blocks from the @blocks-schema endpoint"
    "property=og:description": "Document your blocks, and get the documentation and schemas of a site's blocks from the @blocks-schema endpoint"
    "property=og:title": "Block documentation and the @blocks-schema endpoint"
    "keywords": "Volto, Plone, frontend, React, blocks, schema, documentation, agents, LLM, Markdown"
---

(blocks-schema)=

# Block documentation and the `@blocks-schema` endpoint

Only the frontend knows which blocks a site has, since core, add-ons, and the project's configuration all register and customize them.
The Volto server exposes this information at the `@blocks-schema` endpoint.
For each block, it returns its documentation, its variations, and the schema of its data.

Use it to generate reference documentation for a site, or to tell an agent, such as an LLM using the Plone MCP server, how to write block data that the site can render.

```{note}
`@blocks-schema` is served by the Volto server, not by the Plone REST API.
Request it from the frontend URL, for example `http://localhost:3000/@blocks-schema`.
```

(blocks-schema-documenting-a-block)=

## Document a block

Add a `docs` key to the block configuration.
Its value is Markdown, either a string or a function that returns one.

```js
config.blocks.blocksConfig.mainslider = {
  id: 'mainslider',
  title: 'Main slider',
  blockSchema: MainSliderSchema,
  docs: `Shows a slider with the pages chosen by an editor.

Each slide links to a content item and shows its lead image.

### Fields

- \`slides\`: a list of \`{ "href": [{ "@id": path }] }\` objects.

### Example

\`\`\`json
{
  "@type": "mainslider",
  "slides": [{ "href": [{ "@id": "/news/annual-report" }] }]
}
\`\`\`
`,
  // ...
};
```

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
    Refer to where they come from instead, such as the block's variations or the `@querystring` endpoint of the Plone REST API.

For larger blocks, keep the documentation in a `docs.js` file next to the block, and import it into the configuration.
The core blocks in Volto follow this pattern.

When the documentation depends on the configuration, use a function.
It receives the block configuration and an `intl` object.

```js
docs: ({ blockConfig }) =>
  `Places blocks side by side in columns.

The allowed blocks are ${blockConfig.allowedBlocks.join(', ')}.`,
```

A variation can have its own `docs` too, with the same format.
The endpoint shows them with the variation.

```{note}
The documentation is in English and is not translated.
The titles in the returned schemas are translated into the language of the request.
```

(blocks-schema-endpoint)=

## The `@blocks-schema` endpoint

The endpoint is public, because everything it returns is already part of the frontend code that every visitor downloads.

### List the blocks

```http
GET /@blocks-schema HTTP/1.1
```

This returns the ID, title, and summary of every registered block.

```json
{
  "@id": "/@blocks-schema",
  "items": [
    {
      "id": "slate",
      "title": "Text",
      "description": "Holds rich text: a paragraph, a heading, a list or a quote, with inline formatting and links."
    },
    {
      "id": "title",
      "title": "Title",
      "description": "Shows the title of the content item.",
      "restricted": true
    }
  ],
  "items_total": 2
}
```

`restricted` tells whether editors can add the block.
It is `true` when the block chooser never offers it, and `"context"` when that depends on the content.
See {ref}`blocks-schema-context`.

Add `?full=1` to get the full details of every block, as described in the next section.

### Get one block

```http
GET /@blocks-schema/teaser HTTP/1.1
```

This returns the block's documentation, schema, and variations.

```json
{
  "@id": "/@blocks-schema/teaser",
  "id": "teaser",
  "title": "Teaser",
  "docs": "Shows a card that links to one content item...",
  "schema": {
    "title": "Teaser",
    "fieldsets": ["..."],
    "properties": {"...": "..."},
    "required": []
  },
  "variations": [
    {
      "id": "default",
      "title": "Default",
      "isDefault": true,
      "schema": {"...": "..."}
    }
  ]
}
```

`schema` is the schema of the block data.
It is resolved the same way as in the block settings form: with the default variation's `schemaEnhancer`, and then the block's own `schemaEnhancer`.
Each variation has its own `schema`, resolved for that variation.
The schemas only contain values that can be represented in JSON, so widget components and functions are left out.

When a block has no `blockSchema`, `schema` is `null`.
When the schema of a block or of a variation can't be resolved, for example because its `blockSchema` function needs props that only exist in the editor, its `schema` is `null` and it has an `error`.
The rest of the response is not affected.

An unknown block ID returns a `404 Not Found`.

### Markdown

The endpoint also returns Markdown, either with `?format=md` or with an `Accept` header that asks for `text/markdown` and not for `application/json`.
JSON is the default.

```http
GET /@blocks-schema?format=md HTTP/1.1
```

The list returns a single document with a section for every block.
Each section contains the block's documentation, its variations, and its schema in a `json` code block.
A variation's schema is only included when it differs from the block's.
This format suits agents and generated reference documentation.

(blocks-schema-context)=

## Blocks for a content item

Add the path of a content item in front of the endpoint to get only the blocks that the block chooser offers when editing that item.

```http
GET /news/@blocks-schema HTTP/1.1
```

For this, the endpoint gets the content item with the `navroot` expander and the current user from the Plone REST API.
It then evaluates each block's `restricted` setting with the same `properties`, `navRoot`, `contentType`, and `user` as the block chooser.
If `restricted` throws an error, the block is treated as restricted.

The requests to the Plone REST API use the `auth_token` cookie of the request, the same as for server-side rendering.
Anonymous requests can only get public content.
If the Plone REST API returns `401 Unauthorized`, `403 Forbidden`, or `404 Not Found`, the endpoint returns the same status.

With a path, the endpoint returns one block with a `restricted` value of `true` or `false` for that content item.

```http
GET /news/@blocks-schema/listing HTTP/1.1
```

```{note}
The path only affects the `restricted` setting of the blocks.
Container blocks, such as the grid block, limit the blocks they can contain with `allowedBlocks` in their own configuration.
The documentation of such blocks describes which blocks they accept.
```

## Caching

Responses without a path are cached publicly for five minutes.
They vary on the `Accept` and `Accept-Language` headers.
Responses for a content item depend on the user, so they are private.
