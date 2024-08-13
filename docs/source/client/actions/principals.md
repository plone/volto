# Principals

This endpoint will search for all the available principals in the local PAS plugins when given a query string.
We define a principal as any user or group in the system.
This endpoint requires an authenticated user.

## Principals Search

### Query function

Use the `getPrincipalsQuery` function to get the query for fetching the principals for the given query string.

### Hook

Use the `useGetPrincipals` hook to get the principals for the given query string.

### Parameters

- **search**: string

  - **Required:** Yes
