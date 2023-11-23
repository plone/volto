# Turborepo starter

This is an official Turborepo starter.


## Usage

To create a Turborepo, run the following command:

```sh
npx create-turbo@latest
```


## What's inside?

This Turborepo includes the following packages and apps.


### Apps and packages

-   `docs`: a [Next.js](https://nextjs.org/) app
-   `web`: another [Next.js](https://nextjs.org/) app
-   `ui`: a stub React component library shared by both `web` and `docs` applications
-   `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package and app uses 100% [TypeScript](https://www.typescriptlang.org/).


### Utilities

This Turborepo includes the following tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting


### Build

To build all apps and packages, run the following command:

```shell
cd my-turborepo
pnpm build
```


### Develop

To develop all apps and packages, run the following command:

```shell
cd my-turborepo
pnpm dev
```


### Remote Caching

Turborepo can use a technique known as [remote caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, allowing you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally.
To enable remote caching, you will need an account with Vercel.
If you don't have an account, you can [create one](https://vercel.com/signup), then enter the following commands:

```shell
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your remote cache by running the following command from the root of your Turborepo:

```shell
npx turbo link
```


## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
