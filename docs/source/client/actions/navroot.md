# Navigation root

Plone has a idea called {term}`navigation root` which provides a way to root catalog queries, searches, breadcrumbs, and other content types in a given section of the site.
Enables site managers in sub-sites or multilingual sites to confine searches or navigation queries within specific site sections, enhancing search precision.

## Get navigation root

### Query function

Use the `getNavrootQuery` function to get the query for fetching the navigation root for the given path.

### Hook

Use the `useGetNavroot` hook to get the navigation root for the given path.

### Parameters

- **path**: string

  - **Required:** Yes

- **language**: string

  - **Required:** No
