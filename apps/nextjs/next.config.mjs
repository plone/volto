import path from 'path';
import AddonConfigurationRegistry from '@plone/registry/src/addon-registry';
import createAddonsLoader from '@plone/registry/src/create-addons-loader';

const projectRootPath = path.resolve('.');
const registry = new AddonConfigurationRegistry(projectRootPath);

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'src/lib/components/src/styles')],
  // },

  webpack(
    config,
    // { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) {
    const addonsLoaderPath = createAddonsLoader(
      registry.getAddonDependencies(),
      registry.getAddons(),
    );
    console.log(addonsLoaderPath);

    config.resolve.alias = {
      ...config.resolve.alias,
      '../fonts': path.resolve('src/lib/components/src/fonts'),
      ...registry.getAddonCustomizationPaths(),
      ...registry.getAddonsFromEnvVarCustomizationPaths(),
      ...registry.getProjectCustomizationPaths(),
      'load-volto-addons': addonsLoaderPath,
      ...registry.getResolveAliases(),
    };

    return config;
  },

  transpilePackages: Object.keys(registry.packages),

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
          // 'https://static.197.123.88.23.clients.your-server.de/api/:slug*',
          // `${apiServerURL}/:slug*`,
          `${apiServerURL}${vhmRewriteRule}/:slug*`,
      },
    ];
  },
};

export default nextConfig;
