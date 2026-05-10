# Aliases

A mechanism to redirect old URLs to new ones.

When an object is moved (renamed or cut-and-pasted into a different location), the redirection storage will remember the old path. 
It handles transitive references intelligently (for example a -> b, b -> c becomes a -> c), ignoring circular ones (for example attempting a -> a has no effect).

## Get aliases list

```{js:function} getAliasesListQuery

Use the `getAliasesListQuery` function to get the query for fetching the aliases list.

:hook: `useGetAliasesList`
```

## Get aliases

```{js:function} getAliasesQuery(path)

Use the `getAliasesQuery` function to get the query for fetching the aliases for a page.

:arg string path: Description of the `path` parameter.
:hook: `useGetAliases`
```

## Add aliases for many pages

```{js:function} createAliasesMutation(data)

Use the `createAliasesMutation` function to get the mutation for adding aliases for many pages.

:arg array data: It can have the following fields:
  - items: An array of objects with the following fields:
    - path: string
    - redirect_to: string
    - [datetime]: string
:hook: `useCreateAliases`
```

## Add aliases for a page

```{js:function} createAliasesMutation(path, data)

Use the `createAliasesMutation` function to get the mutation for adding aliases for a page.

:arg string path: Description of the `path` parameter.
:arg object data: It can have the following fields:
  -items: An array of objects with the following fields:
    -path: string
:hook: `useCreateAliases`
```

## Delete aliases

```{js:function} deleteAliasesMutation(path, data)

Use the `deleteAliasesMutation` function to get the mutation for deleting aliases for a page.

:arg string path: Description of the `path` parameter.
:arg object data: It can have the following fields:
  -items: An array of objects with the following fields:
    -path: string
:hook: `useDeleteAliases`
```