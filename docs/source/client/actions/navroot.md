# Navigation root

Plone has a concept called {term}`navigation root` which provides a way to root catalog queries, searches, breadcrumbs, and other content types in a given section of the site.
This feature is useful when working with subsites or multilingual sites, because it allows the site manager to restrict searches or navigation queries to a specific location in the site.

## Get Navigation Root

### Query function

Use the `getNavrootQuery` function to get the query for fetching the navigation root for the given path.

### Hook

Use the `useGetNavroot` hook to get the navigation root for the given path.

### Parameters

- **path**: string

  - **Required:** Yes

- **language**: string

  - **Required:** No
