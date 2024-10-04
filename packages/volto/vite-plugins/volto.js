import fs from 'fs';
import path from 'path';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';
import { svgLoader } from './svg';

import AddonConfigurationRegistry from '@plone/registry/src/addon-registry';
import createAddonsLoader from '@plone/registry/src/create-addons-loader';
import createThemeAddonsLoader from '@plone/registry/src/create-theme-addons-loader';
import { poToJson } from '@plone/scripts/i18n.cjs';

export const VoltoVitePlugin = () => {
  const projectRootPath = path.resolve('.');
  const registry = new AddonConfigurationRegistry(projectRootPath);
  console.log(
    registry,
    // registry.getAddonsFromEnvVarCustomizationPaths(),
    registry.getResolveAliases('vite'),
    registry.getAddonCustomizationPaths('vite'),
    // registry.getAddonsFromEnvVarCustomizationPaths(),
  );
  const addonsLoaderPath = createAddonsLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
  );

  const [addonsThemeLoaderVariablesPath, addonsThemeLoaderMainPath] =
    createThemeAddonsLoader(registry.getCustomThemeAddons());

  let themeConfigPath, themePath;
  if (registry.theme) {
    // The themes should be located in `src/theme`
    themePath = registry.packages[registry.theme].modulePath;
    themeConfigPath = `${themePath}/theme/theme.config`;
  }

  const addOns = Object.keys(registry.packages);

  // Compile language JSON files from po files
  poToJson({ registry, addonMode: false });

  return [
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                convertPathData: false,
                removeViewBox: false,
              },
            },
          },
          'removeTitle',
          'removeUselessStrokeAndFill',
        ],
      },
    }),
    {
      name: 'volto',
      enforce: 'pre',
      config: () => ({
        envPrefix: 'VOLTO_',
        ssr: {
          optimizeDeps: {
            exclude: addOns,
          },
          // external: ['lodash', 'semantic-ui-react'],
          noExternal: ['use-deep-compare-effect'],
        },
        esbuild: {
          supported: {
            'top-level-await': true, //browsers can handle top-level-await features
          },
        },
        optimizeDeps: {
          exclude: addOns,
          esbuildOptions: {
            plugins: [fixReactVirtualized],
          },
        },
        resolve: {
          alias: [
            { find: /^~/, replacement: '' },
            ...registry.getAddonCustomizationPaths('vite'),
            ...registry.getAddonsFromEnvVarCustomizationPaths('vite'),
            ...registry.getResolveAliases('vite'),
            {
              find: '@plone/volto/config',
              replacement: path.resolve(__dirname, '../src/config'),
            },
            {
              find: '@plone/volto',
              replacement: path.resolve(__dirname, '../src/'),
            },
            { find: '@root', replacement: path.resolve(__dirname, '../src/') },
            {
              find: '@root/../themes',
              replacement: path.resolve(__dirname, '../theme/'),
            },
            {
              find: '@plone/volto-slate',
              replacement: path.resolve(__dirname, '../../volto-slate/src/'),
            },
            ...(registry.theme
              ? // Load the theme config from the theme
                [
                  { find: '../../theme.config', replacement: themeConfigPath },
                  {
                    find: 'addonsThemeCustomizationsVariables',
                    replacement: addonsThemeLoaderVariablesPath,
                  },
                  {
                    find: 'addonsThemeCustomizationsMain',
                    replacement: addonsThemeLoaderMainPath,
                  },
                ]
              : // Load the theme config from SemanticUI
                [
                  {
                    find: '../../theme.config',
                    replacement: path.resolve(
                      __dirname,
                      '../theme/theme.config',
                    ),
                  },
                ]),
            { find: 'load-volto-addons', replacement: addonsLoaderPath },
            {
              find: 'volto-themes',
              replacement: path.resolve(__dirname, '../theme/themes'),
            },
            // This is needed to make lodash work with Vite as lodash-es is full ESM
            {
              find: 'lodash',
              replacement: 'lodash-es',
            },
          ],
        },
      }),
    },
    (() => {
      return {
        name: 'debug',
        enforce: 'post',
        apply: false,
        configResolved: (resolvedConfig) => {
          console.log(resolvedConfig.resolve.alias);
        },
      };
    })(),
  ];
};

// configResolved(resolvedConfig) {
//   // store the resolved config
//   console.log(resolvedConfig.define);
// },
// writeBundle(options, bundle) {
//   const outputDir = options.dir || options.outDir || 'dist';
//   const ssrEntryPath = path.join(outputDir, 'entry-server.js');

//   if (fs.existsSync(ssrEntryPath)) {
//     // Read the contents of the entry-server.js
//     let code = fs.readFileSync(ssrEntryPath, 'utf-8');

//     // Modify the code to replace any placeholders or adjust the process.env access
//     code = code.replace(
//       /dist = {};/g,
//       'dist = {process: {env: {}}}; dist.process.env = process.env;',
//     );

//     // Write the modified code back to the file
//     fs.writeFileSync(ssrEntryPath, code, 'utf-8');
//     console.log(`Modified ${ssrEntryPath} to use process.env variables.`);
//   }
// },
