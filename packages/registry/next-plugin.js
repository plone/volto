import path from 'path';
import { AddonRegistry } from '@plone/registry/addon-registry';
import { createAddonsLoader } from '@plone/registry/create-addons-loader';
import { createThemeAddonsLoader } from '@plone/registry/create-theme-loader';

/** @type {(config: import('next').NextConfig) => import('next').NextConfig} */
export function withPlone(config) {
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

  const addonsLoaderPath = createAddonsLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
  );

  const [addonsThemeLoaderVariablesPath, addonsThemeLoaderMainPath] =
    createThemeAddonsLoader(registry.getCustomThemeAddons());

  const addOns = Object.keys(registry.packages);

  config.transpilePackages = [...(config.transpilePackages || []), ...addOns];
  config.experimental = {
    ...(config.experimental || {}),
    optimizePackageImports: [
      ...(config.experimental?.optimizePackageImports || []),
      'react-aria-components',
      '@plone/components',
    ],
  };

  const { webpack: previousWebpackFn, rewrites: previousRewriteFn } = config;

  config.webpack = function (webpackConfig, context) {
    let newWebpackConfig = webpackConfig;
    if (previousWebpackFn) {
      newWebpackConfig = previousWebpackFn(webpackConfig, context);
    }
    newWebpackConfig.resolve.alias = {
      ...newWebpackConfig.resolve.alias,
      ...shadowAliases,
      // Remove in case that we have addons aliases (Volto add-ons which need the `src` path hack)
      // ...addonAliases,
      ...(registry.theme
        ? // Load the theme aliases from the theme config
          {
            addonsThemeCustomizationsVariables: addonsThemeLoaderVariablesPath,
            addonsThemeCustomizationsMain: addonsThemeLoaderMainPath,
          }
        : {}),
      'load-plone-registry-addons': addonsLoaderPath,
    };
    return newWebpackConfig;
  };

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
