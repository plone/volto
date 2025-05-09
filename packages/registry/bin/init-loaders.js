// This script was created to initialize and create the loaders for the Plone registry.
// It was used when React Router was evaluating `routes.ts` before running vite build.
// See https://github.com/remix-run/react-router/issues/13078#issuecomment-2863445977
import path from 'path';
import { AddonRegistry } from '@plone/registry/addon-registry';
import { createAddonsLoader } from '@plone/registry/create-addons-loader';
import { createAddonsStyleLoader } from '@plone/registry/create-addons-styles-loader';

function initPloneRegistryLoaders() {
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

  const addonsLoaderPath = createAddonsLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
    { tempInProject: true },
  );

  createAddonsStyleLoader(registry);

  return { registry, shadowAliases, addonsLoaderPath };
}

initPloneRegistryLoaders();
