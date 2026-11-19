---
block: listing
---

Shows a list of content items that match a catalog query, such as the latest news or upcoming events. The list updates as content is added. To link to specific items chosen by hand, use teasers instead.

The query is stored in `querystring`. The criteria that a site supports depend on its configuration, so get the available indexes and operations from the `@querystring` endpoint of the Plone REST API.

### Fields

- `querystring`: an object with:
  - `query`: list of criteria, each `{ "i": index, "o": operation, "v": value }`. Operations are full names, such as `plone.app.querystring.operation.selection.any`.
  - `sort_on`, `sort_order` (`ascending` or `descending`): optional sorting. For descending order, also set `sort_order_boolean` to `true`.
  - `b_size` (items per page) and `limit` (maximum number of items): optional, given as strings, for example `"10"`.
- `variation`: how the items are shown. See the block's variations for the available ones.
- `headline`, `headlineTag`: optional heading above the list.

### Example

```json
{
  "@type": "listing",
  "headline": "Latest news",
  "headlineTag": "h2",
  "variation": "summary",
  "querystring": {
    "query": [
      {
        "i": "portal_type",
        "o": "plone.app.querystring.operation.selection.any",
        "v": ["News Item"]
      },
      {
        "i": "path",
        "o": "plone.app.querystring.operation.string.absolutePath",
        "v": "/news"
      }
    ],
    "sort_on": "effective",
    "sort_order": "descending",
    "sort_order_boolean": true,
    "b_size": "6"
  }
}
```
