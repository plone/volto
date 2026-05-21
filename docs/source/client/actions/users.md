# Users

Available users in a Plone site can be created, queried, updated, and deleted by interacting with the `/@users` endpoint on portal root.
This action requires an authenticated user:

## Get users list

### Query function

Use the `getUsersQuery` function to get the query for fetching the list of all users in the portal.

### Hook

Use the `useGetUsers` hook to get the list of all users in the portal.

### Parameters

- **query**: string

  - **Required**: No

- **`groupsFilter`**: string[]

  - **Required**: No

- **search**: string

  - **Required**: No

- **limit**: number

  - **Required**: No

## Get user

### Query function

Use the `getUserQuery` function to get the query for fetching the information about an individual user at the given path.

### Hook

Use the `useGetUser` hook to get the information about an individual user at the given path.

### Parameters

- **path**: string

  - **Required**: Yes

## Add user

### Mutation function

Use the `createUserMutation` function to get the mutation for adding a new user at the given path.

### Hook

Use the `useCreateUser` hook to add a new user at the given path.

### Parameters

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    `description: string`

    - **Required**: No

    `email: string`

    - **Required**: Yes

    `fullname: string`

    - **Required**: No

    `home_page: string`

    - **Required**: No

    `location: string`

    - **Required**: No

    `sendPasswordReset: boolean`

    - **Required**: No

    `password: string`

    - **Required**: No

    `roles: string[]`

    - **Required**: No

    `username: string`

    - **Required**: Yes

## Update user

### Mutation function

Use the `updateUserMutation` function to get the mutation for updating an existing user at the given path.

### Hook

Use the `useUpdateUser` hook to update an existing user at the given path.

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

    `fullname: string`

    - **Required**: No

    `home_page: string`

    - **Required**: No

    `location: string`

    - **Required**: No

    `username: string`

    - **Required**: No

    `portrait: object`

    - **Required**: No

## Delete user

### Mutation function

Use the `deleteUserMutation` function to get the mutation for deleting an existing user at the given path.

### Hook

Use the `useDeleteUser` hook to delete an existing user at the given path.

### Parameters

- **path**: string

  - **Required**: Yes

## Update user password

### Mutation function

Use the `updatePasswordMutation` function to get the mutation for updating an existing user password at the given path.

### Hook

Use the `useUpdatePassword` hook to update an existing user password at the given path.

### Parameters

- **path**: string

  - **Required**: Yes

- **data**: object

  - **Required**: Yes
  - The data object can contain the following fields:

    `old-password: string`

    - **Required**: Yes

    `new-password: string`

    - **Required**: Yes

## Reset user password

### Mutation function

Use the `resetPasswordMutation` function to get the mutation for resetting an existing user password at the given path.

### Hook

Use the `useResetPassword` hook to reset an existing user password at the given path.

### Parameters

- **path**: string

  - **Required**: Yes

## Reset user password with token

### Mutation function

Use the `resetPasswordWithTokenMutation` function to get the mutation for resetting an existing user password at the given path.

### Hook

Use the `useResetPasswordWithToken` hook to reset an existing user password at the given path.

### Parameters

- **path**: string

  - **Required**: Yes

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    `reset_token: string`

    - **Required**: Yes

    `new_password: string`

    - **Required**: Yes
