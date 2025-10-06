---
myst:
  html_meta:
    "description": "How to fetch additional data in the root loader"
    "property=og:description": "How to fetch additional data in the root loader"
    "property=og:title": "Fetch additional data in the root loader"
    "keywords": "Seven, @plone/registry, registry, configuration, guide, root, data, fetching"
---

# How to fetch additional data in the root loader

You can fetch additional data in the root loader by creating utility functions that will be called when fetching the root data.

For example, you can create a utility function that fetches data from an external database and adds it to the root loader data.
Since this kind of utility should only be run and included in the server bundle, register the utility in your add-on's `packages/<add-on-name>/config/server.ts` file.

Use the following code as an example:

```{code-block} ts
:caption: packages/\<add-on-name>/config/server.ts
import type { ConfigType } from '@plone/registry';
import prisma from '../lib/prisma';

export default function install(config: ConfigType) {
  config.registerUtility({
    name: 'Likes',
    type: 'rootLoaderData',
    method: async ({ path }) => {
      const like = await prisma.urlLike.findUnique({
        where: { pathname: path },
      });
      return {
        likes: {
          pathname: path,
          count: like?.count ?? 0,
        },
      };
    },
  });

  return config;
}
```

Where the `method` function fetches the number of likes for the current path from an external database using Prisma.
The `type` should be set to `rootLoaderData` to indicate that this utility is for fetching additional data in the root loader.
You can set the `name` to any string that describes the utility.

## Accessing the additional data in your components

You can access the additional data in your components using the `useLoaderData` hook from `react-router`.

```ts
import { useRouteLoaderData } from 'react-router';
//...
const rootData = useRouteLoaderData<RootLoader>('root');
const likes = rootData?.likes;
//...
```

It is recommended that you return the data of the utility under a unique key (in this case `likes`) to avoid conflicts with other utilities that might return data for the root loader.
