// This script was created to initialize and create the loaders for the Plone registry.
// Nowadays it is not used in the build process, but it's still needed for initialize
// the unit tests before they run.
// It was used when React Router was evaluating `routes.ts` before running vite build.
// See https://github.com/remix-run/react-router/issues/13078#issuecomment-2863445977
import fs from 'fs';
import path from 'path';
import { createServer } from 'vite';
import { AddonRegistry } from '@plone/registry/addon-registry';
import { createAddonsLoader } from '@plone/registry/create-addons-loader';
import { createAddonsServerLoader } from '@plone/registry/create-addons-loader-server';
import { createAddonsStyleLoader } from '@plone/registry/create-addons-styles-loader';
import { createAddonsLocalesLoader } from '@plone/registry/create-addons-locales-loader';
import { PloneRegistryVitePlugin } from '@plone/registry/vite-plugin';
import config from '@plone/registry';

async function evaluateAddons(addonsLoaderPath) {
  const projectRootPath = path.resolve('.');

  const ploneDir = path.join(projectRootPath, '.plone');

  const server = await createServer({
    root: projectRootPath,
    configFile: false,
    server: { middlewareMode: true },
    plugins: [PloneRegistryVitePlugin()],
  });

  try {
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
  } finally {
    await server.close();
  }
}

async function initPloneRegistryLoaders() {
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

  const ploneDir = path.join(projectRootPath, '.plone');
  if (!fs.existsSync(ploneDir)) {
    fs.mkdirSync(ploneDir, { recursive: true });
  }

  const addonsLoaderPath = createAddonsLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
    { tempInProject: true },
  );

  await evaluateAddons(addonsLoaderPath);

  createAddonsServerLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
  );
  createAddonsStyleLoader(registry);
  createAddonsLocalesLoader(registry);

  return { registry, shadowAliases, addonsLoaderPath };
}

initPloneRegistryLoaders();
