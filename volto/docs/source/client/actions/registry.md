# Registry

Registry records can be addressed through the `@registry` endpoint on the Plone site.
To address a specific record, the fully qualified dotted name of the registry record has to be passed as a path segment, for example, `/plone/@registy/my.record`.

Reading or writing registry records require the `cmf.ManagePortal` permission.

## Get Registry List

### Query function

Use the `getRegistriesQuery` function to get the query for fetching the list of all available registry records.

### Hook

Use the `useGetRegistries` hook to get the list of all available registry records.

## Get Registry

### Query function

Use the `getRegistryQuery` function to get the query for fetching a registry record at a given path.

### Hook

Use the `useGetRegistry` hook to get a registry record at a given path.

### Parameters

- **path**: string

  - **Required:** Yes

## Update Registry

### Mutation function

Use the `updateRegistryMutation` function to get the mutation for updating a registry record at a given path.

### Hook

Use the `useUpdateRegistry` hook to update a registry record at a given path.

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: record(string)

  - **Required:** Yes
