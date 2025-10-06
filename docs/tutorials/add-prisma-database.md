
# External Prisma database support for a Seven add-on

This tutorial will show you how to add a small "Like" counter button to any Seven content object.
It will persist its value in an external database using {term}`Prisma`.
It also demonstrates how to create API routes and slots in Seven and how to share data from the server to the client through the root loader.
In this tutorial you will:

- install Prisma inside an existing Seven add-on
- model a `UrlLike` table backed by SQLite for local development
- expose API endpoints that read and update the like counter
- surface the latest count in a slot component rendered on every page

Prisma is an open-source toolkit that simplifies database access.

```{seealso}
[Prisma documentation](https://www.prisma.io/docs/)
```

```{note}
The main purpose of this tutorial is to demonstrate how to integrate Prisma with Seven.
You can also use the same approach but saving to a Plone REST API endpoint.
It is not meant to be a complete, production-ready implementation of a like button.
The complete code of this tutorial is in the GitHub repository [`collective/seven-training-addon`](https://github.com/collective/seven-training-addon).
```

## Prerequisites

- A Seven add-on scaffolded with {term}`cookieplone`
- {term}`pnpm` installed and configured for the workspace
- Basic familiarity with TypeScript and React Router code in a Seven project

If you still need an add-on skeleton, follow {doc}`../get-started/create-package` before you continue.

## Install Prisma in your add-on

Run this command from the repo root to install Prisma and its client in your add-on package:

```shell
pnpm --filter <add-on-name> add @prisma/client prisma @types/node
```

````{warning}
pnpm requires that you approve the builds of this packages, by running `pnpm approve-builds` command.
Follow the instructions in the terminal to approve the builds.

```shell
❯ pnpm approve-builds
? Choose which packages to build (Press <space> to select, <a> to toggle all, <i> to invert selection) …
  ● @prisma/client
  ● @prisma/engines
❯ ● prisma
```
````

In your add-on's {file}`package/<add-on-name>/package.json`, add these convenience scripts to work with the Prisma client:

```{code-block} json
:caption: packages/\<add-on-name>/package.json
"scripts": {
    // Other scripts...
    "prisma:generate": "prisma generate",
    "prisma:db:push": "prisma db push",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
}
```

Keep any existing scripts you already have in place.
Only add the Prisma entries.

## Set up the Prisma schema

Create {file}`packages/<add-on-name>/prisma/schema.prisma` with the data model that will hold each page's like counter:

```{code-block}
:caption: packages/\<add-on-name>/prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model UrlLike {
  id        Int      @id @default(autoincrement())
  pathname  String   @unique
  count     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

This schema configures Prisma to generate its client into {file}`packages/<add-on-name>/generated/prisma` and to store data in SQLite by default.
Replace the provider if you want to target PostgreSQL, MySQL, MongoDB, or any other Prisma-supported database in production.

The URL of the database is read from the `DATABASE_URL` environment variable.

The development database will use SQLite for simplicity.
It will be stored in a file named {file}`dev.db` in your add-on folder {file}`packages/<add-on-name>/prisma`.

Set up an environment variable:

```shell
export DATABASE_URL="file:./dev.db"
```

Alternatively, pass down the environment variable when starting your development server:

```shell
DATABASE_URL="file:./dev.db" pnpm dev
```

## Create a reusable Prisma client helper

Seven will import Prisma from multiple files.
Add a tiny helper that keeps one shared instance alive across hot reloads.

```{code-block} ts
:caption: packages/\<add-on-name>/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

type GlobalWithPrisma = typeof globalThis & { prisma?: PrismaClient };
const globalForPrisma = globalThis as GlobalWithPrisma;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

## Generate the Prisma client and push the schema

Generate the Prisma client code and sync the schema to the database with the following commands.

```shell
pnpm --filter <add-on-name> run prisma:generate
pnpm --filter <add-on-name> run prisma:db:push
```

You should now see {file}`packages/<add-on-name>/prisma/dev.db` and the generated client files.

## Create a `/@likes` route to interact with the database

Create a new file named {file}`api.likes.ts` in the {file}`routes` folder of your add-on ({file}`package/<add-on-name>/routes/api.likes.ts`).
It will read and increment the like counter.

```{code-block} tsx
:caption: packages/\<add-on-name>/routes/api.likes.ts
import type { ActionFunctionArgs } from 'react-router';
import prisma from '../lib/prisma';

type LikePayload = { count: number; pathname: string };

// GET /@likes/* → current count for the requested pathname
export async function loader({ params }: ActionFunctionArgs) {
  const pathname = params['*'] ? `/${params['*']}` : '/';
  const like = await prisma.urlLike.findUnique({ where: { pathname } });
  const payload: LikePayload = {
    pathname,
    count: like?.count ?? 0,
  };

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST /@likes/* → increment and return the updated record
export async function action({ params }: ActionFunctionArgs) {
  const pathname = params['*'] ? `/${params['*']}` : '/';
  const updatedRecord = await prisma.urlLike.upsert({
    where: { pathname },
    update: { count: { increment: 1 } },
    create: { pathname, count: 1 },
  });

  return new Response(JSON.stringify(updatedRecord), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

Let's declare the route in Seven.
First, create a {file}`config` folder in your add-on at {file}`package/<add-on-name>/config`.
You'll store all your add-on configurations in this folder.

Then, create a file in this folder {file}`package/<add-on-name>/config/routes.ts` with the following code.

```{code-block} ts
:caption: packages/\<add-on-name>/config/routes.ts
import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'route',
    path: '@likes/*',
    file: '<add-on-name>/routes/api.likes.ts',
    options: {
      id: 'likes',
    },
  });

  return config;
}
```

Replace `<add-on-name>` with the actual package directory name you generated with cookieplone before using the snippets below.

Wire it up in your add-on's {file}`package/<add-on-name>/index.ts` file:

```{code-block} ts
:caption: packages/\<add-on-name>/index.ts
import type { ConfigType } from '@plone/registry';
import installRoutes from './config/routes';

export default function install(config: ConfigType) {
  installRoutes(config);

  return config;
}
```

Accessing the route with a GET request, for example, `/@likes/some/url/path`, will return the number of likes for that current URL.
Sending a POST request will increment the like count for that URL.

## Create a likes slot

Create a new file named {file}`LikeButton.tsx` in the {file}`slots` folder of your add-on ({file}`package/<add-on-name>/slots/LikeButton.tsx`).

```{code-block} tsx
:caption: packages/\<add-on-name>/slots/LikeButton.tsx
import type { RootLoader } from 'seven/app/root';
import { Button } from '@plone/components/quanta';
import { useFetcher, useParams, useRouteLoaderData } from 'react-router';

export default function LikeButton() {
  const fetcher = useFetcher();
  const params = useParams();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const pathname = params['*'] ? `/${params['*']}` : '/';
  const rootCount = rootData?.likes?.count ?? 0;
  const fetcherRecord = fetcher.data as { count?: number } | undefined;
  const fetcherCount =
    typeof fetcherRecord?.count === 'number' ? fetcherRecord.count : undefined;
  const likeCount = fetcherCount ?? rootCount;

  return (
    <div className="text-center mt-10">
      <fetcher.Form
        method="post"
        action={`/@likes${pathname}`}
        className="inline"
      >
        <Button
          variant="primary"
          accent
          type="submit"
          isDisabled={fetcher.state === 'submitting'}
        >
          👍 Like ({likeCount})
        </Button>
      </fetcher.Form>
      {typeof fetcherCount === 'number' && (
        <div className="text-green-500 my-2">Thanks for liking!</div>
      )}
    </div>
  );
}

```

This component uses the `useFetcher` hook from `react-router` to send a POST request to the `/@likes/*` route when the button is clicked.
It also uses the `useRouteLoaderData` hook to get the current number of likes for the URL from the root loader data.

Next, declare the slot in Seven.
First, create a {file}`slots.ts` file in the {file}`config` folder of your add-on at {file}`package/<add-on-name>/config/slots.ts` with the following code:

```{code-block} ts
:caption: packages/\<add-on-name>/config/slots.ts
import type { ConfigType } from '@plone/registry';
import LikeButton from '../slots/LikeButton';

export default function install(config: ConfigType) {
  config.registerSlotComponent({
    name: 'LikeButton',
    slot: 'contentArea',
    component: LikeButton,
  });

  return config;
}
```

Update `packages/<add-on-name>/index.ts` again so both the route and the slot install:

```{code-block} ts
:caption: packages/\<add-on-name>/index.ts
:emphasize-lines: 3, 7
import type { ConfigType } from '@plone/registry';
import installRoutes from './config/routes';
import installSlots from './config/slots';

export default function install(config: ConfigType) {
  installRoutes(config);
  installSlots(config);

  return config;
}
```

## Provide likes data from the root loader

Seven lets add-ons contribute data to the root loader through utilities.
Create {file}`packages/<add-on-name>/config/server.ts` so every request exposes the current like counter to the client.
Next, register a utility function of the type `rootLoaderData` that will be called in the root loader of Seven.
Create a new file {file}`server.ts` in the {file}`config` folder of your add-on at {file}`package/<add-on-name>/config/server.ts` with the following code.

```{code-block} ts
:caption: packages/\<add-on-name>/config/server.ts
import type { ConfigType } from '@plone/registry';
import prisma from '../lib/prisma';

export default function install(config: ConfigType) {
  config.registerUtility({
    name: 'Likes',
    type: 'rootLoaderData',
    method: async ({ path }) => {
      const like = await prisma.urlLike.findUnique({ where: { pathname: path } });
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

Seven will call this function in the root loader, passing the current path as an argument.
The data will be available in the `LikeButton` component via the `useRouteLoaderData` hook.
With this utility in place, `LikeButton` can read the latest count from the root loader, and React Router will revalidate the loader automatically after each POST.

## Run the development server

Now, run the development server of your add-on with the following command:

```shell
DATABASE_URL="file:./dev.db" pnpm dev
```
