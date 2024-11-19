import path from 'path';
import { AddonRegistry } from '@plone/registry/addon-registry';
import { createAddonsLoader } from '@plone/registry/create-addons-loader';
import { createThemeAddonsLoader } from '@plone/registry/create-theme-loader';

/** @type {(config: import('next').NextConfig) => import('next').NextConfig} */
export function withRegistry(config) {
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

  const { webpack: previousWebpackFn } = config;

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
      'load-registry-addons': addonsLoaderPath,
    };
    return newWebpackConfig;
  };

  return config;
}
