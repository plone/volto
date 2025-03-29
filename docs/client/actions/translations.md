# Translations

Translations endpoint is used to handle the translation information of the content objects.

## Get Translation

### Query function

Use the `getTranslationQuery` function to get the query for fetching the translation information of the given path.

### Hook

Use the `useGetTranslation` hook to get the translation information of the given path.

### Parameters

- **path**: string

  - **Required:** Yes

## Link Translation

### Mutation function

Use the `linkTranslationMutation` function to get the mutation for linking a translation to the given path.

### Hook

Use the `useLinkTranslation` hook to link a translation to the given path.

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `id: string`

    - **Required:** Yes

## Unlink Translation

### Mutation function

Use the `unlinkTranslationMutation` function to get the mutation for unlinking a translation from the given path.

### Hook

Use the `useUnlinkTranslation` hook to unlink a translation from the given path.

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `language: string`

    - **Required:** Yes
