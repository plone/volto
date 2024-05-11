# Site

The `@site` endpoint provides general site-wide information, such as the site title, logo, and other information.
It uses the `zope2.View` permission, which requires appropriate authorization.

## Get site

### Query function

Use the `getSiteQuery` function to get the query for fetching the site information.

### Hook

Use the `useGetSite` hook to get the site information.
