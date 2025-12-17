# Copy and Move

## Copying an object

To copy a content object, send a `POST` request to the `/@copy` endpoint at the destination's URL with the source object specified in the request body.
The source object can be specified either by URL, path, UID or `intid`:

## Moving an object

To move a content object, send a `POST` request to the `/@move` endpoint at the destination's URL with the source object specified in the request body.
The source object can be specified either by URL, path, UID or `intid`:

## Copy Content

### Mutation function

Use the `copyMutation` function to get the mutation for copying a content object.

### Hook

Use the `useCopy` hook to copy a content object.

### Parameters

- **data**: object

  - **Required:** Yes

    - It can have the following fields:

    - `source: string`

      - **Required:** Yes
      - The source object to copy. It can be specified either by URL, path, UID or `intid`.

## Move Content

### Mutation function

Use the `moveMutation` function to get the mutation for moving a content object.

### Hook

Use the `useMove` hook to move a content object.

### Parameters

- **data**: object

  - **Required:** Yes

    - It can have the following fields:

    - `source: string`

      - **Required:** Yes
      - The source object to move. It can be specified either by URL, path, UID or `intid`.
