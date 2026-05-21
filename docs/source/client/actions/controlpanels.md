# Control panels

Control panels in Plone allow you to configure the global site setup of a Plone site.
The `@controlpanels` endpoint in `plone.restapi` allows you to list all existing control panels in a Plone site, and to retrieve or edit the settings of a specific control panel.

## Get control panels list

### Query function

Use the `getControlpanelsQuery` function to get the query for fetching the control panels list.

### Hook

Use the `useGetControlpanels` hook to get the control panels list.

## Get control panel

### Query function

Use the `getControlpanelQuery` function to get the query for fetching a control panel at a given path.

### Hook

Use the `useGetControlpanel` hook to get a control panel at a given path.

### Parameters

- **path**: string

  - **Required**: Yes

## Add custom elements in control panel

### Mutation function

Use the `createControlpanelMutation` function to get the mutation for adding a custom element in the control panel at a given path.

### Hook

Use the `useCreateControlpanel` hook to add a custom element in the control panel at a given path.

### Parameters

- **data**: any

  - **Required**: Yes

## Update custom elements in control panel

### Mutation function

Use the `updateControlpanelMutation` function to get the mutation for updating a custom element in the control panel at a given path.

### Hook

Use the `useUpdateControlpanel` hook to update a custom element in the control panel at a given path.

### Parameters

- **data**: any

  - **Required**: Yes

## Delete custom elements in control panel

### Mutation function

Use the `deleteControlpanelMutation` function to get the mutation for deleting a custom element in the control panel at a given path.

### Hook

Use the `useDeleteControlpanel` hook to delete a custom element in the control panel at a given path.

### Parameters

- **path**: string

  - **Required**: Yes

- **data**: any

  - **Required**: Yes
