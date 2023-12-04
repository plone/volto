# Relations

Plone's relations represent binary relationships between content objects.

A single relation is defined by source, target, and relation name.

You can define relations either with content type schema fields `RelationChoice` or `RelationList`, or with types `isReferencing` or `iterate-working-copy`.

- Relations based on fields of a content type schema are editable by users.
- The relations `isReferencing` (block text links to a Plone content object) and `iterate-working-copy` (working copy is enabled and the content object is a working copy) are not editable.
  They are created and deleted with links in text, respectively creating and deleting working copies.

## Get Relations List

### Query function

Use the `getRelationsListQuery` function to get the query for fetching the list of all existing relations user has access to.

### Hook

Use the `useGetRelationsList` hook to get the list of all existing relations user has access to.

## Get Relations

### Query function

Use the `getRelationsQuery` function to get the query for fetching the relations for the given parameters.

### Hook

Use the `useGetRelations` hook to get the relations for the given parameters.

### Parameters

- **source**: string

  - **Required**: No

- **relation**: string

  - **Required**: No

- **onlyBroken**: boolean

  - **Required**: No

## Add Relation

### Mutation function

Use the `createRelationsMutation` function to get the mutation for adding a relation for the given parameters.

### Hook

Use the `useCreateRelations` hook to add a relation for the given parameters.

### Parameters

- **data**: object[]

  - **Required**: Yes
  - An array of objects with the following fields:

    `source: string`

    - **Required**: Yes

    `target: string`

    - **Required**: Yes

    `relation: string`

    - **Required**: Yes

## Fix Relation

### Mutation function

Use the `fixRelationsMutation` function to get the mutation for fixing broken relations.

### Hook

Use the `useFixRelations` hook to fix broken relations.

### Parameters

- **data**: object

  - **Required**: No
  - It can have the following fields:

    `flush: boolean`

    - **Required**: No

## Delete Relation

### Mutation function

Use the `deleteRelationsMutation` function to get the mutation for deleting a relation for the given parameters.

### Hook

Use the `useDeleteRelations` hook to delete a relation for the given parameters.

### Parameters

- **data**: object[]

  - **Required**: Yes
  - An array of objects with the following fields:

    `items: object[]`

    - **Required**: No
    - An array of objects with the following fields:

      `source: string`

      - **Required**: Yes

      `target: string`

      - **Required**: Yes

      `relation: string`

      - **Required**: Yes

    `source: string`

    - **Required**: No

    `target: string`

    - **Required**: No

    `relation: string`

    - **Required**: No
