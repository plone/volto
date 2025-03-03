import { Package } from './addon-registry.cjs';
import 'dependency-graph';

declare function nameFromPackage(name: string): string;
declare function getAddonsLoaderCode(addons: string[], addonsInfo: Package[], loadProjectConfig?: boolean): string;
declare function createAddonsLoader(addons: string[], addonsInfo: Package[], { tempInProject, loadProjectConfig, }?: {
    tempInProject?: boolean;
    loadProjectConfig?: boolean;
}): string;

export { createAddonsLoader, getAddonsLoaderCode, nameFromPackage };
