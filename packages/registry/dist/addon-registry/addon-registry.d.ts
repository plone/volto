import { DepGraph } from 'dependency-graph';

type Package = {
    name: string;
    version: string;
    isPublishedPackage: boolean;
    isRegisteredAddon: boolean;
    modulePath: string;
    packageJson: string;
    basePath?: string;
    tsConfigPaths?: [string, any] | null;
    addons: Array<string>;
    razzleExtender?: string;
    eslintExtender?: string;
};
type VoltoConfigJS = {
    addons: Array<string>;
    theme: string;
};
type Aliases = Record<string, string>;
type AliasesObject = {
    find: string;
    replacement: string;
}[];
type CoreAddons = {
    [x: string]: {
        package: string;
    };
};
type PackageJsonObject = {
    type: 'module' | 'commonjs';
    addons: Array<string>;
    coreAddons: CoreAddons;
    theme: string;
    customizationPaths: string[];
};
type AddonRegistryGet = {
    /** The ordered list of addons */
    addons: Array<string>;
    /** The theme name */
    theme: string;
    /** The customizations (shadows) aliases */
    shadowAliases: AliasesObject;
    /** The add-ons aliases - Only for Volto add-ons for which code lives inside `src` */
    addonAliases: AliasesObject;
};
declare function buildDependencyGraph(addons: Array<string>, extractDependency: (name: string) => Array<string>): DepGraph<string | []>;
/**
 * Given an addons loader string, it generates an addons loader string with
 * a resolved chain of dependencies
 */
declare function getAddonsLoaderChain(graph: DepGraph<string | []>): string[];
/**
 * A registry to discover and publish information about the structure of Volto
 * projects and their addons.
 *
 * The registry builds information about both addons and other development
 * packages, structured as an object with the following information:
 *
 * - name
 * - isPublishedPackage (just for info, to distinguish addons from other Javascript development packages)
 * - modulePath (the path that would be resolved from Javascript package name)
 * - packageJson (the path to the addon's package.json file)
 * - extraConfigLoaders (names for extra functions to be loaded from the addon
 *   for configuration purposes)
 * - razzleExtender (the path to the addon's razzle.extend.js path, to allow
 *   addons to customize the webpack configuration)
 *
 */
declare class AddonRegistry {
    packageJson: PackageJsonObject;
    voltoConfigJS: VoltoConfigJS;
    projectRootPath: string;
    isVoltoProject: boolean;
    voltoPath: string;
    coreAddons: CoreAddons;
    resultantMergedAddons: Array<string>;
    addonNames: Array<string>;
    packages: Record<string, Package>;
    customizations: any;
    theme: any;
    dependencyGraph: DepGraph<string | []>;
    constructor(projectRootPath: string);
    get(): AddonRegistryGet;
    static init(projectRootPath: string): {
        registry: AddonRegistry;
        addons: string[];
        theme: any;
        shadowAliases: AliasesObject;
    };
    isESM: () => boolean;
    /**
     * Gets the registry configuration from the project's config file (.js, .cjs, .ts, .mts).
     * It tries first if there's an environment variable pointing to the config file.
     * If it doesn't exist, it tries to load one from the local project.
     * If it doesn't exist, it returns an empty config object.
     */
    getRegistryConfig(projectRootPath: string): VoltoConfigJS;
    /**
     * Gets the `tsconfig.json` `compilerOptions.baseUrl` and `compilerOptions.paths`
     * Returns a tuple `[baseUrl, pathsConfig]`
     *
     */
    getTSConfigPaths(rootPath?: string): [string, Record<string, string[]> | undefined];
    /**
     * Volto is able to register packages while in development thanks to
     * `mrs-developer`. It uses the JS/TS environment config `compilerOptions.paths`
     * to resolve them through the system.
     */
    initDevelopmentPackages(): void;
    /**
     * Given an add-on name, it registers it as a development package
     *
     */
    initDevelopmentPackage(name: string): void;
    /**
     * Add path to the "src" of npm-released packages. These packages can
     * release their source code in src, or transpile. The "main" of their
     * package.json needs to point to the module that exports `applyConfig` as
     * default.
     */
    initPublishedPackages(): void;
    initPublishedPackage(name: string): void;
    initAddonsFromEnvVar(): void;
    initAddonFromEnvVar(name: string): void;
    /**
     * Allow addons to provide various extenders.
     *
     * The razzle.extend.js modules (named razzle.extend.js) needs to provide
     * two functions:
     * `plugins(defaultPlugins) => plugins` and
     * `modify(...) => config`
     *
     * The eslint.extend.js
     */
    initAddonExtenders(): void;
    /**
     * Returns the addon records, respects order from package.json:addons
     */
    getAddons(): Package[];
    getAddonExtenders(): (string | undefined)[];
    getEslintExtenders(): (string | undefined)[];
    /**
     * Returns the list of add-on style files (<addon-path>/styles/main.css) that contain styles
     */
    getAddonStyles(): string[];
    getCustomThemeAddons(): {
        variables: string[];
        main: string[];
    };
    /**
     * Returns a list of aliases given the defined paths in `tsconfig.json`
     */
    getAliasesFromTSConfig(basePath: string, tsConfig: [string, any]): {
        [x: string]: string;
    };
    /**
     * Returns a mapping name:diskpath to be uses in webpack's resolve aliases.
     * It includes all registered add-ons and their `src` paths, and also the paths
     * defined in the `tsconfig.json` files of the add-ons.
     */
    getResolveAliases(): {};
    /**
     * Retrieves a mapping (to be used in resolve aliases) of module name to
     * filestype paths, to be used as customization paths.
     *
     * There are two styles of customizations: "classic style" and "addons style"
     *
     * In the classic style, the customization folders are only used to customize
     * Volto itself, so inside it we'll find a mirror of the Volto project
     * structure.
     *
     * In the "addons style" customization folder, we allow customization of
     * addons along with Volto customization, so we need separate folders. By
     * convention, we use a folder called "volto" inside customizations folder
     * and separate folder for each addon, identified by its addon (package) name.
     */
    getCustomizationPaths(packageJson: PackageJsonObject, rootPath: string): Aliases;
    getProjectCustomizationPaths(): Aliases;
    /**
     * Allow addons to customize Volto and other addons.
     *
     * We follow the same logic for overriding as the main `package.json:addons`.
     * First declared addon gets overridden by subsequent declared addons. That
     * means: customization in volto-addonA will potentially be rewritten by
     * customizations in volto-addonB if the declaration in package.json is like:
     * `addons:volto-addonA,volto-addonB`
     */
    getAddonCustomizationPaths(): Aliases;
    /**
     * Allow packages from addons set in env vars to customize Volto and other addons.
     *
     * Same as the above one, but specific for Volto addons coming from env vars
     *
     * This is no longer necessary in the pnpm setup, as all valid packages have to be
     * released or declared as a workspace
     *
     */
    getAddonsFromEnvVarCustomizationPaths(): never[] | Aliases;
    /**
     * Returns an agregated, dependency-resolved list of addon loader strings
     */
    getAddonDependencies(): string[];
    getDotDependencyGraph(): string;
}

export { AddonRegistry, type Package, buildDependencyGraph, getAddonsLoaderChain };
