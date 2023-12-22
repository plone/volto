# Locking

Locking is a mechanism to prevent users from accidentally overriding each other's changes.

When a user edits a content object in Plone, the object is locked until the user hits the {guilabel}`Save` or {guilabel}`Cancel` button.
If a second user tries to edit the object at the same time, she will see a message that this object is locked.

The API consumer can create, read, update, and delete a content-type lock.

## Get Lock Info

### Query function

Use the `getLockQuery` function to get the query for fetching the lock info for a page.

### Hook

Use the `useGetLock` hook to get the lock info for a page.

### Parameters

- **path**: string

  - **Required:** Yes

## Add Lock

### Mutation function

Use the `createLockMutation` function to get the mutation for adding a lock for a page.

### Hook

Use the `useCreateLock` hook to add a lock for a page.

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `stealable: boolean`

    - **Required:** No
    - If `true`, the another user can unlock the lock.

    `timeout: integer`

    - **Required:** No
    - The timeout of the lock in seconds. If not given, the default timeout is used.

## Update Lock

### Mutation function

Use the `updateLockMutation` function to get the mutation for updating a lock for a page.

### Hook

Use the `useUpdateLock` hook to update a lock for a page.

### Parameters

- **path**: string

  - **Required:** Yes

- **locktoken**: string

  - **Required:** Yes

## Delete Lock

### Mutation function

Use the `deleteLockMutation` function to get the mutation for deleting a lock for a page.

### Hook

Use the `useDeleteLock` hook to delete a lock for a page.

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** No
  - It can have the following fields:

    `force: boolean`

    - **Required:** No
    - Set force `true` to unlock an object locked by another user.
