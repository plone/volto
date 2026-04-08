# Working Copy

```{note}
This feature is available only on Plone 5 or greater.
```

Plone has a _working copy_ feature provided by the core package `plone.app.iterate`.
It allows the users to create a working copy of a published or live content object, and work with it until it is ready to be published without having to edit the original object.

## Get Working Copy

### Query function

Use the `getWorkingcopyQuery` function to get the query for fetching the working copy of a content object.

### Hook

Use the `useGetWorkingcopy` hook to get the working copy of a content object.

### Parameters

- **path**: string

  - **Required:** Yes

## Add Working Copy

### Mutation function

Use the `createWorkingcopyMutation` function to get the mutation for adding a working copy of a content object.

### Hook

Use the `useCreateWorkingcopy` hook to add a working copy of a content object.

### Parameters

- **path**: string

  - **Required:** Yes

## Check In Working Copy

### Mutation function

Use the `checkinWorkingcopyMutation` function to get the mutation for checking in a working copy to update the original content object.

### Hook

Use the `useCheckinWorkingcopy` hook to check in a working copy to update the original content object.

### Parameters

- **path**: string

  - **Required:** Yes

## Delete Working Copy

### Mutation function

Use the `deleteWorkingcopyMutation` function to get the mutation for deleting a working copy.

### Hook

Use the `useDeleteWorkingcopy` hook to delete a working copy.

### Parameters

- **path**: string

  - **Required:** Yes
