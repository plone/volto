# User schema

Users in Plone have a set of properties defined by a default set of fields such as `fullname`, `email`, `portrait`, and other fields.
These properties define the site user's profile and the user itself via the Plone UI, or the site managers can add them in a variety of ways including `PAS` plugins.

These fields are dynamic and customizable by integrators so they don't adhere to a fixed schema interface.
This dynamic schema is exposed by this endpoint to build the user's profile form.

## Get user schema

### Query function

Use the `getUserSchemaQuery` function to get the query for fetching the schema of the current user.

### Hook

Use the `useGetUserSchema` hook to get the schema of the current user.
