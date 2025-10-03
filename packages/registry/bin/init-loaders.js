// This script was created to initialize and create the loaders for the Plone registry.
// Nowadays it is not used in the build process, but it's still needed for initialize
// the unit tests before they run.
// It was used when React Router was evaluating `routes.ts` before running vite build.
// See https://github.com/remix-run/react-router/issues/13078#issuecomment-2863445977
import path from 'path';
import { AddonRegistry } from '@plone/registry/addon-registry';
import { createAddonsLoader } from '@plone/registry/create-addons-loader';
import { createAddonsServerLoader } from '@plone/registry/create-addons-loader-server';
import { createAddonsStyleLoader } from '@plone/registry/create-addons-styles-loader';
import { createAddonsLocalesLoader } from '@plone/registry/create-addons-locales-loader';

function initPloneRegistryLoaders() {
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

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

  return { registry, shadowAliases, addonsLoaderPath };
}

initPloneRegistryLoaders();
