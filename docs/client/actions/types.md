# Types

Available content types in a Plone site can be listed and queried by accessing the `/@types` endpoint on any context.

## Get Types List

### Query function

Use the `getTypesQuery` function to get the query for fetching the list of all available types.

### Hook

Use the `useGetTypes` hook to get the list of all available types.

## Get Type

### Query function

Use the `getTypeQuery` function to get the query for fetching the information about the content type provided.

### Hook

Use the `useGetType` hook to get the information about the content type provided.

### Parameters

- **contentPath**: string

  - **Required:** Yes

## Get Type Field

### Query function

Use the `getTypeFieldQuery` function to get the query for fetching the information about the field of the type provided.

### Hook

Use the `useGetTypeField` hook to get the information about the field of the type provided.

### Parameters

- **contentFieldPath**: string

  - **Required:** Yes

## Add Type Field/Fieldset

### Mutation function

Use the `createTypeFieldMutation` function to get the mutation for adding a field/fieldset to the type provided.

### Hook

Use the `useCreateTypeField` hook to add a field/fieldset to the type provided.

### Parameters

- **contentPath**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `description: string`

    - **Required:** Yes

    `factory: string`

    - **Required:** Yes

    `required: boolean`

    - **Required:** No

    `title: string`

    - **Required:** Yes

## Update Type Field/Fieldset

### Mutation function

Use the `updateTypeFieldMutation` function to get the mutation for updating a field/fieldset of the type provided.

### Hook

Use the `useUpdateTypeField` hook to update a field/fieldset of the type provided.

### Parameters

- **contentPath**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `description: string`

    - **Required:** No

    `maxLength: integer`

    - **Required:** No

    `minLength: integer`

    - **Required:** No

    `fields: string[]`

    - **Required:** No

    `required: boolean`

    - **Required:** No

    `title: string`

    - **Required:** No

    `properties: any`

    - **Required:** No

    `fieldsets: any[]`

    - **Required:** No
