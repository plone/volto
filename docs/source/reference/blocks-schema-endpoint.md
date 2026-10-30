---
myst:
  html_meta:
    "description": "Reference of the @blocks-schema endpoint of the Volto server, which returns the documentation, schemas, and variations of a site's blocks"
    "property=og:description": "Reference of the @blocks-schema endpoint of the Volto server, which returns the documentation, schemas, and variations of a site's blocks"
    "property=og:title": "The @blocks-schema endpoint"
    "keywords": "Volto, Plone, frontend, blocks, schema, endpoint, Markdown, agents"
---

(blocks-schema-endpoint)=

# The `@blocks-schema` endpoint

The `@blocks-schema` endpoint of the Volto server describes the blocks registered on a site.
For each block, it returns its documentation, the schema of its data, and its variations.
To learn how to write the documentation that it returns, see {doc}`../blocks/documentation`.

```{note}
`@blocks-schema` is served by the Volto server, not by the Plone REST API.
Request it from the frontend URL, for example `http://localhost:3000/@blocks-schema`.
```

(blocks-schema-endpoint-authentication)=

## Authentication

The endpoint requires an authenticated user, because block documentation only exists on the server and can contain information meant for editors.
Any valid Plone token works, whatever the user's roles, including users defined in the Zope root, such as `admin`.

Send the token in one of these ways.

-   The `auth_token` cookie, which Volto sets when a user logs in.
-   An `Authorization: Bearer <token>` header, which suits agents and other API clients.
    It takes precedence over the cookie.
    Volto reads this header only for this endpoint, not for server-side rendering.

```http
GET /@blocks-schema HTTP/1.1
Authorization: Bearer <token>
```

Get a token from the `@login` endpoint of the Plone REST API.

Volto can't verify a token by itself, so it asks the Plone REST API for the token's user.
To avoid asking again for every request, it remembers a valid token for one minute at most, and never past the token's expiry.

Without a valid token, the endpoint returns `401 Unauthorized` with a `WWW-Authenticate: Bearer` header.

## List the blocks

```http
GET /@blocks-schema HTTP/1.1
```

This returns the ID, title, and summary of every registered block.
The summary is the first paragraph of the block's documentation.
Each block's `@id` is the URL of that block, which returns its documentation and schema, as described in the next section.

```json
{
  "@id": "http://localhost:3000/@blocks-schema",
  "items": [
    {
      "@id": "http://localhost:3000/@blocks-schema/slate",
      "id": "slate",
      "title": "Text",
      "description": "Holds rich text: a paragraph, a heading, a list or a quote, with inline formatting and links."
    },
    {
      "@id": "http://localhost:3000/@blocks-schema/title",
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

The URLs are built from the URL the client called, including the content path, if any.
Behind a proxy, the `Host` and `X-Forwarded-Proto` headers that reach Volto must be those of the public site.

## Get one block

```http
GET /@blocks-schema/teaser HTTP/1.1
```

This returns the block's documentation, schema, and variations.
`docs` is the block's documentation, with its placeholders filled in, and a variation with its own documentation has `docs` too.

```json
{
  "@id": "http://localhost:3000/@blocks-schema/teaser",
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

## Markdown

The endpoint also returns Markdown, when the `Accept` header asks for `text/markdown` and not for `application/json`.
JSON is the default.

```http
GET /@blocks-schema HTTP/1.1
Accept: text/markdown
```

The list is a Markdown list, with a link to each block, its ID, and its summary.
A block returns a section with its documentation, its variations, and its schema in a `json` code block.
A variation's schema is only included when it differs from the block's.

(blocks-schema-context)=

## Blocks for a content item

Add the path of a content item in front of the endpoint to get only the blocks that the block chooser offers when editing that item.

```http
GET /news/@blocks-schema HTTP/1.1
```

For this, the endpoint gets the content item with the `navroot` expander and the current user from the Plone REST API.
It then evaluates each block's `restricted` setting with the same `properties`, `navRoot`, `contentType`, and `user` as the block chooser.
If `restricted` throws an error, the block is treated as restricted.

The requests to the Plone REST API use the token of the request, so the user must be able to view the content item.
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

All responses are private, because they need authentication.
Responses without a path can be reused by the client for five minutes.
Responses for a content item depend on the content, so they are not reused.
Responses vary on the `Accept`, `Accept-Language`, `Authorization`, and `Cookie` headers.

