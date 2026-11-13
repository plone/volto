---
block: search
---

Shows a list of content items that visitors can search, sort and filter with facets. Unlike the listing block, results change as the visitor interacts with the block.

The base query in `query` has the same shape as the listing block's `querystring`: an object that contains a `query` list of criteria, not the list itself. It filters the results before the visitor's own search is applied. Use `{ "query": [] }` to start from all content. The criteria that a site supports depend on its configuration, so get the available indexes and operations from the `@querystring` endpoint of the Plone REST API.

### Fields

- `query`: the base query, with `query` (list of `{ "i", "o", "v" }` criteria), and optional `sort_on`, `sort_order`, `b_size` and `limit`. `b_size` and `limit` are strings, for example `"10"`.
- `showSearchInput`, `showSortOn`, `showTotalResults`: booleans that show the search field, the sort menu and the result count.
- `facets`: list of facets, each `{ "title", "field", "type" }`, where `field` is a catalog index and `type` is one of the facet widgets configured for the block (Volto ships `selectFacet`, `checkboxFacet`, `daterangeFacet` and `toggleFacet`). Optional `hidden` and `advanced` booleans.
- `variation`: where the facets are placed. See the block's variations for the available ones.
- `headline`: optional heading.

### Example

```json
{
  "@type": "search",
  "headline": "News",
  "query": {
    "query": [
      {
        "i": "portal_type",
        "o": "plone.app.querystring.operation.selection.any",
        "v": ["News Item"]
      }
    ],
    "sort_on": "effective",
    "sort_order": "descending",
    "b_size": "10"
  },
  "showSearchInput": true,
  "showSortOn": true,
  "showTotalResults": true,
  "facets": [
    { "title": "Topic", "field": "Subject", "type": "checkboxFacet" }
  ],
  "variation": "facetsRightSide"
}
```
