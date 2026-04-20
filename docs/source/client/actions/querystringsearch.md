# `Querystring` search

The `@querystring-search` endpoint returns search results that can be filtered on search criteria.

## Get `querystring` search

### Query function

Use the `getQuerystringSearchQuery` function to get the query for fetching the search results for a page.

### Hook

Use the `useGetQuerystringSearch` hook to get the search results for a page.

### Parameters

- **query**: object[]

  - **Required**: Yes
  - An array of objects with the following fields:

    - **i**: string

      - **Required**: Yes
      - The index of the filter (the name of the field to which this filter is applied).

    - **o**: string

      - **Required**: Yes
      - The operator of the filter.

    - **v**: string[]

      - **Required**: Yes
      - The value of the filter.

- **b_start**: string

  - **Required**: No

- **b_size**: string

  - **Required**: No

- **limit**: string

  - **Required**: No

- **sort_on**: string

  - **Required**: No

- **sort_order**: string

  - **Required**: No

- **fullobjects**: boolean

  - **Required**: No

## Get `querystring` search using `POST` request

### Mutation function

Use the `postQuerystringSearchMutation` function to get the mutation for fetching the search results for a page.

### Hook

Use the `usePostQuerystringSearch` hook to get the search results for a page.

### Parameters

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    - `query: object[]`

    - **Required**: Yes
    - An array of objects with the following fields:

      - `i: string`

        - **Required**: Yes
        - The index of the filter (the name of the field to which this filter is applied).

      - `o: string`

        - **Required**: Yes
        - The operator of the filter.

      - `v: array`

        - **Required**: Yes
        - The value of the filter.

    - `b_start: string`

      - **Required**: No
      - The start index of the search results.

    - `b_size: string`

      - **Required**: No
      - The size of the search results.

    - `limit: string`

      - **Required**: No
      - The limit of the search results.

    - `sort_on: string`

      - **Required**: No
      - The field to sort on.

    - `sort_order: string`

      - **Required**: No
      - The order to sort on.

    - `fullobjects: boolean`

      - **Required**: No
      - Whether to return the full objects or not.
