# Vocabularies

Vocabularies are a set of allowed choices that back a particular field.
They contain so-called _terms_ which represent those allowed choices.

## Get Vocabularies List

### Query function

Use the `getVocabulariesListQuery` function to get the query for fetching the list of all available vocabularies.

### Hook

Use the `useGetVocabulariesList` hook to get the list of all available vocabularies.

## Get Vocabularies

### Query function

Use the `getVocabulariesQuery` function to get the query for fetching the vocabularies for the given path.

### Hook

Use the `useGetVocabularies` hook to get the vocabularies for the given path.

### Parameters

- **path**: string

  - **Required:** Yes

- **title**: string

  - **Required:** No

- **token**: string

  - **Required:** No

- **tokens**: string[]

  - **Required:** No
