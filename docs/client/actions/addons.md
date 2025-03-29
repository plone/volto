# Add-ons

Add-on product records can be addressed through the `@addons` endpoint in a Plone site.
In order to address a specific record, the profile ID has to be passed as a path segment, such as `/plone/@addons/plone.session`.

Reading or writing add-ons metadata requires the `cmf.ManagePortal` permission.

## Get add-ons list

### Query function

Use the `getAddonsQuery` function to get the query for fetching the add-ons at a given path.

### Hook

Use the `useGetAddons` hook to get the add-ons at a given path.

## Get add-on

### Query function

Use the `getAddonQuery` function to get the query for fetching an add-on at a given path.

### Hook

Use the `useGetAddon` hook to get an add-on at a given path.

### Parameters

- **addonId**: string

  - **Required**: Yes

## Install add-ons

### Mutation function

Use the `installAddonMutation` function to get the mutation for installing an add-on at a given path.

### Hook

Use the `useInstallAddon` hook to install an add-on at a given path.

### Parameters

- **addonId**: string

  - **Required**: Yes

## Uninstall add-ons

### Mutation function

Use the `uninstallAddonMutation` function to get the mutation for uninstalling an add-on at a given path.

### Hook

Use the `useUninstallAddon` hook to uninstall an add-on at a given path.

### Parameters

- **addonId**: string

  - **Required**: Yes

## Install add-ons profile

### Mutation function

Use the `installAddonProfileMutation` function to get the mutation for installing an add-on profile at a given path.

### Hook

Use the `useInstallProfileAddon` hook to install an add-on profile at a given path.

### Parameters

- **addonId**: string

  - **Required**: Yes

- **profile**: string

  - **Required**: Yes

## Upgrade add-ons

### Mutation function

Use the `upgradeAddonMutation` function to get the mutation for upgrading an add-on at a given path.

### Hook

Use the `useUpgradeAddon` hook to upgrade an add-on at a given path.

### Parameters

- **addonId**: string

  - **Required**: Yes
