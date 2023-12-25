# Aliases

A mechanism to redirect old URLs to new ones.

When an object is moved (renamed or cut/pasted into a different location), the redirection storage will remember the old path. 
Handles transitive references (for example a -> b, b -> c becomes a -> c) and ignores circular ones (for example attempting a -> a has no effect).

## Get aliases list

### Query function

Use the `getAliasesListQuery` function to get the query for fetching the aliases list.

### Hook

Use the `useGetAliasesList` hook to get the aliases list.

## Get aliases

### Query function

Use the `getAliasesQuery` function to get the query for fetching the aliases for a page.

### Hook

Use the `useGetAliases` hook to get the aliases for a page.

### Parameters

- **path**: string

  - **Required:** Yes

## Add aliases for many pages

### Mutation function

Use the `createAliasesMutation` function to get the mutation for adding aliases for many pages.

### Hook

Use the `useCreateAliases` hook to add aliases for many pages.

### Parameters

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `items: object[]`:

    - **Required:** Yes
    - An array of objects with the following fields:

      `path: string`

      - **Required:** Yes

      `datetime: string`

      - **Required:** No

      `redirect_to: string`

      - **Required:** Yes

## Add aliases for a page

### Mutation function

Use the `createAliasesMutation` function to get the mutation for adding aliases for a page.

### Hook

Use the `useCreateAliases` hook to add aliases for a page.

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `items: object[]`:

    - **Required:** Yes
    - An array of objects with the following fields:

      `path: string`

      - **Required:** Yes

## Delete aliases

### Mutation function

Use the `deleteAliasesMutation` function to get the mutation for deleting aliases for a page.

### Hook

Use the `useDeleteAliases` hook to delete aliases for a page.

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `items: object[]`:

    - **Required:** Yes
    - An array of objects with the following fields:

      `path: string`

      - **Required:** Yes
