# History

The `@history` endpoint exposes history and versioning information on previous versions of the content.
Each change or workflow change on a content object or file is listed.
It also allows to revert to a previous version of the file.

## Get History

### Query function

Use the `getHistoryQuery` function to get the query for fetching the history for a page.

### Hook

Use the `useGetHistory` hook to get the history for a page.

### Parameters

- **path**: string

  - **Required**: Yes

## Get Versioned History

### Query function

Use the `getHistoryVersionedQuery` function to get the query for fetching the versioned history for a page.

### Hook

Use the `useGetHistoryVersioned` hook to get the versioned history for a page.

### Parameters

- **path**: string

  - **Required**: Yes

- **version**: string

  - **Required**: Yes

## Revert to Version

### Mutation function

Use the `revertHistoryMutation` function to get the mutation for reverting to a previous version of a page.

### Hook

Use the `useRevertHistory` hook to revert to a previous version of a page.

### Parameters

- **path**: string

  - **Required**: Yes

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    `version: number`

    - **Required**: Yes
