import { withRegistry } from '@plone/registry/next-plugin';
import { type NextConfig } from 'next';

export function withPlone(prevConfig: NextConfig): NextConfig {
  const config = withRegistry(prevConfig);

  const { rewrites: previousRewriteFn } = config;

  // Rewrite to the backend to avoid CORS
  config.rewrites = async function () {
    const previousRewrites = previousRewriteFn ? await previousRewriteFn() : [];

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
      // TODO support the object notation for rewrites as well
      ...(Array.isArray(previousRewrites) ? previousRewrites : []),
      {
        source: '/\\+\\+api\\+\\+/:slug*',
        destination:
          // 'https://static.197.123.88.23.clients.your-server.de/api/:slug*',
          // `${apiServerURL}/:slug*`,
          `${apiServerURL}${vhmRewriteRule}/:slug*`,
      },
    ];
  };

  return config;
}
