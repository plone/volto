import fs from 'fs';
import path from 'path';
import { AddonRegistry } from '@plone/registry/addon-registry';
import { createAddonsLoader } from '@plone/registry/create-addons-loader';
import { createAddonsServerLoader } from '@plone/registry/create-addons-loader-server';
import { createThemeAddonsLoader } from '@plone/registry/create-theme-loader';
import { createAddonsStyleLoader } from '@plone/registry/create-addons-styles-loader';
import { createAddonsLocalesLoader } from '@plone/registry/create-addons-locales-loader';
import config from '@plone/registry';

export function relativeToAbsoluteImportPlugin(options) {
  const { packages } = options;

  const entries = Object.entries(packages);

  return {
    name: 'relative-to-absolute-imports',
    enforce: 'pre',

    async transform(code, id) {
      const normalizedId = id.split('?')[0];

      const match = entries.find(([, pkgInfo]) =>
        normalizedId.startsWith(pkgInfo.basePath),
      );

      if (!match) return;

      const [, pkgInfo] = match;

      const transformedCode = code.replace(
        /from\s+['"]((?:\.\.?)\/?[^'"]*)['"]/g,
        (full, relImport) => {
          const absImportPath = path.resolve(
            path.dirname(normalizedId),
            relImport,
          );
          const relativePath = path
            .relative(pkgInfo.basePath, absImportPath)
            .replace(/\\/g, '/');
          return `from '${pkgInfo.name}/${relativePath}'`;
        },
      );

      return {
        code: transformedCode,
        map: null,
      };
    },
  };
}

export const PloneRegistryVitePlugin = () => {
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

  const ploneDir = path.join(process.cwd(), '.plone');
  if (!fs.existsSync(ploneDir)) {
    fs.mkdirSync(ploneDir, { recursive: true });
  }

  const addonsLoaderPath = createAddonsLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
    { tempInProject: true },
  );
  createAddonsServerLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
  );
  createAddonsStyleLoader(registry);
  createAddonsLocalesLoader(registry);

  const [addonsThemeLoaderVariablesPath, addonsThemeLoaderMainPath] =
    createThemeAddonsLoader(registry.getCustomThemeAddons());

  const addOns = Object.keys(registry.packages);

  const addonAliases = Object.values(registry.packages).map((pkg) => ({
    find: pkg.name,
    replacement: path.resolve(pkg.basePath),
  }));

  return [
    relativeToAbsoluteImportPlugin({
      packages: registry.packages,
    }),
    {
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
            // This is still needed for internal resolution to "self"
            // in combination with shadowing
            ...addonAliases,
            // ToDo: Deprecate `theme` feature in Seven
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
            // This is no longer needed in Seven
            {
              find: '@plone/registry/addons-loader',
              replacement: addonsLoaderPath,
            },
          ],
        },
      }),
    },
    {
      name: 'plone-registry-after',
      enforce: 'pre',
      async configureServer(server) {
        // This is needed to ensure that all the build plugins are in place
        await server.environments.client.pluginContainer.buildStart();

        const { default: loader, addonsInfo } =
          await server.ssrLoadModule(addonsLoaderPath);

        fs.writeFileSync(
          path.join(ploneDir, 'registry.routes.json'),
          JSON.stringify(loader(config).routes, null, 2),
        );
        fs.writeFileSync(
          path.join(ploneDir, 'registry.addonsInfo.json'),
          JSON.stringify(addonsInfo, null, 2),
        );
      },
    },
  ];
};
