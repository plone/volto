# Upgrade

A Plone site needs to be in sync with the version available on the file system.
The `@upgrade` endpoint exposes upgrade information about the Plone backend, and supports running the upgrade of the site.

## Get upgrade information

### Query function

Use the `getUpgradeQuery` function to get the query for fetching the upgrade information about the Plone backend.

### Hook

Use the `useGetUpgrade` hook to get the upgrade information about the Plone backend.

## Run upgrade

### Mutation function

Use the `runUpgradeMutation` function to get the mutation for running the upgrade of the Plone backend.

### Hook

Use the `useRunUpgrade` hook to run the upgrade of the Plone backend.

### Parameters

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    - `dry_run: boolean`

    - **Required**: Yes
    - If true, the upgrade will be run in dry-run mode.
