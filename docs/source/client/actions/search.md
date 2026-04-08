# Search

Content in a Plone site can be searched for by invoking the `/@search` endpoint in any context:

A search is _contextual_ by default.
In other words, it is bound to a specific context—a _collection_ in HTTP REST terms—and searches within that collection and any sub-collections.

A Plone site is also a collection.
We therefore have a global search by invoking the `/@search` endpoint on the site root.
We also have contextual searches by invoking that endpoint on any other context.
All searches use the same pattern.

## Get Search

### Query function

Use the `getSearchQuery` function to get the query for fetching the search results for the given query.

### Hook

Use the `useGetSearch` hook to get the search results for the given query.

### Parameters

- **query**: object

  - **Required:** Yes
  - It can have the following fields:

    `path: object`

    - **Required:** No
    - It can have the following fields:

      `query: string | string[]`

      - **Required:** Yes

      `depth: number`

      - **Required:** No

    `sort_on: string | string[]`

    - **Required:** No

    `SearchableText: string`

    - **Required:** No

    `metadata_fields: string | string[]`

    - **Required:** No

    `fullobjects: number`

    - **Required:** No
    - Set to 1 to return full objects.

    `Any other search parameters`

    - **Required:** No
