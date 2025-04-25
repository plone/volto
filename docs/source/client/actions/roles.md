# Roles

Available roles in a Plone site can be queried by interacting with the `/@roles` endpoint on the portal root.
This action requires an authenticated user.

## Get Roles

### Query function

Use the `getRolesQuery` function to get the query for fetching the list of all roles in the portal.

### Hook

Use the `useGetRoles` hook to get the list of all roles in the portal.
