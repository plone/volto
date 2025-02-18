# Aliases

A mechanism to redirect old URLs to new ones.

When an object is moved (renamed or cut/pasted into a different location), the redirection storage will remember the old path. It is smart enough to deal with transitive references (if we have a -> b and then add b -> c, it is replaced by a reference a -> c) and circular references (attempting to add a -> a does nothing).

## Get Aliases List

### Query function

Use the `getAliasesListQuery` function to get the query for fetching the aliases list.

### Hook

Use the `useGetAliasesList` hook to get the aliases list.

## Get Aliases

### Query function

Use the `getAliasesQuery` function to get the query for fetching the aliases for a page.

### Hook

Use the `useGetAliases` hook to get the aliases for a page.

### Parameters

- **path**: string

  - **Required:** Yes

## Add Aliases for Multiple Pages

### Mutation function

Use the `createAliasesMutation` function to get the mutation for adding aliases for multiple pages.

### Hook

Use the `useCreateAliases` hook to add aliases for multiple pages.

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

## Add Aliases for a Page

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

## Delete Aliases

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
