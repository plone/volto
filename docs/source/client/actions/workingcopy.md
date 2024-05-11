# Working copy

```{note}
This feature is available only on Plone 5 or greater.
```

Plone has a _working copy_ feature provided by the core package `plone.app.iterate`.
Users can create a working copy of a live content object, allowing independent editing before publishing, without altering the original object.

## Get working copy

### Query function

Use the `getWorkingcopyQuery` function to get the query for fetching the working copy of a content object.

### Hook

Use the `useGetWorkingcopy` hook to get the working copy of a content object.

### Parameters

- **path**: string

  - **Required:** Yes

## Add working copy

### Mutation function

Use the `createWorkingcopyMutation` function to get the mutation for adding a working copy of a content object.

### Hook

Use the `useCreateWorkingcopy` hook to add a working copy of a content object.

### Parameters

- **path**: string

  - **Required:** Yes

## Check in working copy

### Mutation function

Use the `checkinWorkingcopyMutation` function to get the mutation for checking in a working copy to update the original content object.

### Hook

Use the `useCheckinWorkingcopy` hook to check in a working copy to update the original content object.

### Parameters

- **path**: string

  - **Required:** Yes

## Delete working copy

### Mutation function

Use the `deleteWorkingcopyMutation` function to get the mutation for deleting a working copy.

### Hook

Use the `useDeleteWorkingcopy` hook to delete a working copy.

### Parameters

- **path**: string

  - **Required:** Yes
