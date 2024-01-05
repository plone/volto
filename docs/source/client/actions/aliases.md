# Aliases

A mechanism to redirect old URLs to new ones.

When an object is moved (renamed or cut/pasted into a different location), the redirection storage will remember the old path. 
Handles transitive references (for example a -> b, b -> c becomes a -> c) and ignores circular ones (for example attempting a -> a has no effect).

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

:arg object data : It can have the following fields:
  :arg object[] items: An array of objects with the following fields:
    :arg string path:
    :arg string redirect_to:
    :arg string [datetime]:
:hook: `useCreateAliases`
```

## Add aliases for a page

```{js:function} createAliasesMutation(path, data)

Use the `createAliasesMutation` function to get the mutation for adding aliases for a page.

:arg string path: Description of the `path` parameter.
:arg object data: It can have the following fields:
  :arg object[] items: An array of objects with the following fields:
    :arg string path:
:hook: `useCreateAliases`
```

## Delete aliases

```{js:function} deleteAliasesMutation(path, data)

Use the `deleteAliasesMutation` function to get the mutation for deleting aliases for a page.

:arg string path: Description of the `path` parameter.
:arg object data: It can have the following fields:
  :arg object[] items: An array of objects with the following fields:
    :arg string path:
:hook: `useDeleteAliases`
```