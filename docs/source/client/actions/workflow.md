# Workflow

```{note}
Currently the workflow support is limited to executing transitions on content.
```

In Plone, content almost always has a {term}`workflow` attached.
We can get the current state and history of an object by issuing a `GET` request for any context:

## Get Workflow

### Query function

Use the `getWorkflowQuery` function to get the query for fetching the workflow for the given path.

### Hook

Use the `useGetWorkflow` hook to get the workflow for the given path.

### Parameters

- **path**: string

  - **Required:** Yes

## Add Workflow

### Mutation function

Use the `createWorkflowMutation` function to get the mutation for adding a workflow to the given path.

### Hook

Use the `useCreateWorkflow` hook to add a workflow to the given path.

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `comment: string`

    - **Required:** No

    `effective: string`

    - **Required:** No

    `expires: string`

    - **Required:** No

    `include_children: boolean`

    - **Required:** No
