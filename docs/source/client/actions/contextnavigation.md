# Context navigation

The `@contextnavigation` endpoint uses the same semantics as the classic Plone navigation `portlet`. Instead of storing the `portlet` configuration in a `portlet` assignment storage, you can pass these as parameters to the service or expand the part.

## Get context navigation

### Query function

Use the `getContextNavigationQuery` function to get the query for fetching the context navigation for a page.

### Hook

Use the `useGetContextNavigation` hook to get the context navigation for a page.

### Parameters

- **path**: string

  - **Required:** Yes
