import path from 'path';
import { AddonRegistry } from './addon-registry';
import { createAddonsLoader } from './create-addons-loader';
import { createAddonsStyleLoader } from './create-addons-styles-loader';

function initPloneRegistryLoaders() {
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

  const addonsLoaderPath = createAddonsLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
    { tempInProject: true },
  );

  createAddonsStyleLoader(registry.getAddonStyles());

  return { registry, shadowAliases, addonsLoaderPath };
}

initPloneRegistryLoaders();
