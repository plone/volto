import path from 'path';
import { AddonRegistry } from '@plone/registry/addon-registry';
import { createAddonsLoader } from '@plone/registry/create-addons-loader';
import { createThemeAddonsLoader } from '@plone/registry/create-theme-loader';
import { createAddonsStyleLoader } from '@plone/registry/create-addons-styles-loader';

export const PloneRegistryVitePlugin = () => {
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

  const addonsLoaderPath = createAddonsLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
    { tempInProject: true },
  );

  createAddonsStyleLoader(registry.getAddonStyles());

  const [addonsThemeLoaderVariablesPath, addonsThemeLoaderMainPath] =
    createThemeAddonsLoader(registry.getCustomThemeAddons());

  const addOns = Object.keys(registry.packages);

  return {
    name: 'plone-registry',
    enforce: 'pre',
    config: () => ({
      ssr: {
        optimizeDeps: {
          exclude: addOns,
        },
      },
      esbuild: {
        supported: {
          'top-level-await': true, //browsers can handle top-level-await features
        },
      },
      optimizeDeps: {
        exclude: addOns,
      },
      resolve: {
        alias: [
          ...shadowAliases,
          // Remove in case that we have addons aliases (Volto add-ons which need the `src` path hack)
          // ...addonAliases,
          ...(registry.theme
            ? // Load the theme aliases from the theme config
              [
                {
                  find: 'addonsThemeCustomizationsVariables',
                  replacement: addonsThemeLoaderVariablesPath,
                },
                {
                  find: 'addonsThemeCustomizationsMain',
                  replacement: addonsThemeLoaderMainPath,
                },
              ]
            : []),
          {
            find: '@plone/registry/addons-loader',
            replacement: addonsLoaderPath,
          },
        ],
      },
    }),
  };
};
