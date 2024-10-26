# Plone on Next.js

This is a proof of concept of a [Next.js](https://nextjs.org) app, using the app router and the `@plone/client` and `@plone/components` library.
This is intended to serve as both a playground for the development of both packages and as a demo of Plone using Next.js.

> [!WARNING]
> This package or app is experimental.
> The community offers no support whatsoever for it.
> Breaking changes may occur without notice.

## Development

To start, from the root of the monorepo, issue the following commands in a shell session.

```shell
pnpm install
pnpm build:deps && pnpm build:components
pnpm --filter plone-nextjs run dev
```

Then start the Plone backend:

```shell
make backend-docker-start
```

## Deployment at Vercel

For deploying your app at Vercel, you need to create the environment variable `API_SERVER_URL` in Vercel's deployment control panel, specifying the URL where your backend API server is deployed, and the route where the API is located, as shown.

```shell
API_SERVER_URL=https://my-server-DNS-name.tld/api
```

For production deployments, you will need to force the deployment URL, otherwise you will have issues with CORS.
To do so, set another environment variable for the production URL, `NEXT_PRODUCTION_URL`.
This URL needs to be scheme-less, without `http` or `https`, and consist only of the domain name:

```shell
NEXT_PRODUCTION_URL=my-nextjs-production-DNS-name.tld
```

### Application rewrite configuragtion

To avoid issues with CORS and maintain the server counterpart private, your Next.js app should have a rewrite, configured as follows:

```jsx
const nextConfig = {
  // Rewrite to the backend to avoid CORS
  async rewrites() {
    let apiServerURL, vhmRewriteRule;
    if (
      process.env.API_SERVER_URL &&
      (process.env.NEXT_PRODUCTION_URL || process.env.NEXT_PUBLIC_VERCEL_URL)
    ) {
      // We are in Vercel
      apiServerURL = process.env.API_SERVER_URL;
      vhmRewriteRule = `/VirtualHostBase/https/${
        process.env.NEXT_PRODUCTION_URL
          ? // We are in the production deployment
            process.env.NEXT_PRODUCTION_URL
          : // We are in the preview deployment
            process.env.NEXT_PUBLIC_VERCEL_URL
      }%3A443/Plone/%2B%2Bapi%2B%2B/VirtualHostRoot`;
    } else if (process.env.API_SERVER_URL) {
      // We are in development
      apiServerURL = process.env.API_SERVER_URL;
      vhmRewriteRule =
        '/VirtualHostBase/http/localhost%3A3000/Plone/%2B%2Bapi%2B%2B/VirtualHostRoot';
    } else {
      // We are in development and the API_SERVER_URL is not set, so we use a local backend
      apiServerURL = 'http://localhost:8080';
      vhmRewriteRule =
        '/VirtualHostBase/http/localhost%3A3000/Plone/%2B%2Bapi%2B%2B/VirtualHostRoot';
    }

    return [
      {
        source: '/\\+\\+api\\+\\+/:slug*',
        destination:
          `${apiServerURL}${vhmRewriteRule}/:slug*`,
      },
    ];
  },
};
```

Plone Client uses the `++api++` prefix as default, so you should create a redirect in your app pointing to the API server, but using Plone's traditional virtual host management configuration.

Next.js rewrites are picky with the `destination` field, because its rewrite library does not support URLs with regular expression operators.
Therefore, you can't use the usual `++api++` route for the rewrite.
This will allow you to infer the current server URL—even in deployed branches and pull requests—without touching the rewrite rules.
You will fallback to configure a `api` route in your reverse proxy of choice.

### Plone backend

You have to deploy the Plone backend elsewhere, since Vercel is serverless oriented.
You need to set up the rewrite rule in Next.js's `rewrite` feature as shown in the previous section.

You will fallback to configure an `api` route in your reverse proxy of choice.

For example, if you use `traefik`:

```yaml
## VHM rewrite /api/ (Plone Next.js)
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

## Getting started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`.
The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and its API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/).
Your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
