# Plone on NextJS

This is a PoC of a [NextJS](https://nextjs.org) app using the app router and the `@plone/client` and `@plone/components` library. This is intended to serve as playground for the development of both packages and as demo of Plone using NextJS.

## Development

To start, from the root of the monorepo:

```shell
pnpm install
pnpm --filter plone-nextjs run dev
```

A running Plone backend instance should be running:

```shell
make start-backend-docker
```

## Deployment at Vercel

### Vercel

We are introducing an environment variable `API_SERVER_URL`.
We have to create this environment variable in the Vercel deployment's control panel, specifying the URL where your backend API server is deployed and the route where the api is located (see next section). (eg. API_SERVER_URL=https://my_server_DNS_name/api).

### Application rewrite config

In order to avoid CORS and maintain the server counterpart private, our NextJS app should have a rewrite and should be configured as follows:

```
const nextConfig = {
  // Rewrite to the backend to avoid CORS
  async rewrites() {
    const apiServerURL =
      process.env.API_SERVER_URL ||
      'http://localhost:8080/Plone/%2B%2Bapi%2B%2B';

    return [
      {
        source: '/\\+\\+api\\+\\+/:slug*',
        destination:
          `${apiServerURL}/VirtualHostBase/https/${process.env.NEXT_PUBLIC_VERCEL_URL}%3A443/Plone/%2B%2Bapi%2B%2B/VirtualHostRoot/:slug*`,
      },
    ];
  },
};
```

Plone Client is using the `++api++` prefix as default, so we should create a redirect in our app pointing to the api server, but using the traditional Plone's VHM config.

NextJS rewrites are picky on the `destination` field because the library that is used for it does not support URLS with regex operators.
Therefore, we can't use the usual `++api++` route for the rewrite.
This will allow us to infer the current server URL (even in deployed branches/PRs) without touching the rewrite rules.
We will fallback to configure a `api` route in our reverse proxy of choice.

### Plone backend

You have to deploy the Plone backend elsewhere, since Vercel is serverless oriented.
We need to setup the rewrite rule in NextJS's `rewrite` feature as shown in the previous section.

We will fallback to configure a `api` route in our reverse proxy of choice.

If we are using `traefik`:

```
        ## VHM rewrite /api/ (Plone NextJS)
        - "traefik.http.middlewares.mw-backend-vhm-api.replacepathregex.regex=^/api($$|/.*)"
        ## We remove the incoming /api and just use the path
        - "traefik.http.middlewares.mw-backend-vhm-api.replacepathregex.replacement=$$1"

        ## /api router
        - traefik.http.routers.rt-backend-api.rule=Host(`my_server_DNS_name`) && PathPrefix(`/api`)
        - traefik.http.routers.rt-backend-api.entrypoints=https
        - traefik.http.routers.rt-backend-api.tls=true
        - traefik.http.routers.rt-backend-api.service=svc-backend
        - traefik.http.routers.rt-backend-api.middlewares=gzip,mw-backend-vhm-api
```

## About this app

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
