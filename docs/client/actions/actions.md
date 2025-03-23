# Actions

Plone has the concept of configurable actions called `portal_actions`.
Each action defines an `id`, a `title`, the required permissions, and a condition that will be checked to decide whether the action will be available for a user.
Actions are sorted by categories.

Actions can be used to build user interface elements that adapt to the available actions.
An example is the Plone toolbar where the `object_tabs` (view, edit, folder contents, sharing) and the `user_actions` (login, logout, preferences) are used to display to the user only those actions that are allowed for the currently logged in user.

The available actions for the currently logged in user can be retrieved by calling the `@actions` endpoint on a specific context.
This also works for unauthenticated users.

## Get Actions

### Query function

Use the `getActionsQuery` function to get the query for fetching the actions at a given path.

### Hook

Use the `useGetActions` hook to get the actions at a given path.

### Parameters

- **path**: string

  - **Required**: Yes
