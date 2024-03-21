# Groups

Available groups in a Plone site can be created, queried, updated, and deleted by interacting with the `/@groups` endpoint on the portal root.
This requires an authenticated user.

## Get groups list

### Query function

Use the `getGroupsQuery` function to get the query for fetching the groups list.

### Hook

Use the `useGetGroups` hook to get the groups list.

## Get group

### Query function

Use the `getGroupQuery` function to get the query for fetching a group at a given path.

### Hook

Use the `useGetGroup` hook to get a group at a given path.

### Parameters

- **path**: string

  - **Required**: Yes

## Add group

### Mutation function

Use the `createGroupMutation` function to get the mutation for adding a group at a given path.

### Hook

Use the `useCreateGroup` hook to add a group at a given path.

### Parameters

- **path**: string

  - **Required**: Yes

- **data**: object

  - Required: Yes
  - It can have the following fields:

    `description: string`

    - **Required**: No

    `email: string`

    - **Required**: No

    `groupname: string`

    - **Required**: Yes

    `groups: string[]`

    - **Required**: No

    `roles: string[]`

    - **Required**: No

    `title: string`

    - **Required**: No

    `users: string[]`

    - **Required**: No

## Update group

### Mutation function

Use the `updateGroupMutation` function to get the mutation for updating an existing group at the given path.

### Hook

Use the `useUpdateGroup` hook to update an existing group at the given path.

### Parameters

- **path**: string

  - **Required**: Yes

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    `description: string`

    - **Required**: No

    `email: string`

    - **Required**: No

    `groupname: string`

    - **Required**: No

## Delete group

### Mutation function

Use the `deleteGroupMutation` function to get the mutation for deleting a group at the given path.

### Hook

Use the `useDeleteGroup` hook to delete a group at the given path.

### Parameters

- **path**: string

  - **Required**: Yes
