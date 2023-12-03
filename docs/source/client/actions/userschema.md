# User schema

Users in Plone have a set of properties defined by a default set of fields such as `fullname`, `email`, `portrait`, and so on.
These properties define the site user's profile and the user itself via the Plone UI, or the site managers can add them in a variety of ways including PAS plugins.

These fields are dynamic and customizable by integrators so they do not adhere to a fixed schema interface.
This dynamic schema is exposed by this endpoint in order to build the user's profile form.

## Get User Schema

### Query function

Use the `getUserSchemaQuery` function to get the query for fetching the schema of the current user.

### Hook

Use the `useGetUserSchema` hook to get the schema of the current user.
