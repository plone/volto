import path from 'path';
import {
  AddonRegistry,
  buildDependencyGraph,
  getAddonsLoaderChain,
} from '../src/addon-registry/addon-registry';
import { vi, describe, it, expect, test, beforeEach, afterEach } from 'vitest';

vi.mock(
  'fixtures/test-volto-project/node_modules/@plone/volto/package.json',
  () => ({
    // TODO: mock the packages folder inside the mocked @plone/volto to work with resolves
    coreAddons: {},
  }),
  { virtual: true },
);

describe('AddonRegistry - get()', () => {
  it('Basic information', () => {
    const base = path.join(
      import.meta.dirname,
      'fixtures',
      'test-volto-project',
    );
    const { addons, shadowAliases, theme } = AddonRegistry.init(base);
    expect(addons).toStrictEqual([
      'test-released-unmentioned:extra1,extra2',
      'test-released-dummy',
      'test-addon',
      'test-released-addon:extra',
      'test-released-source-addon',
      'my-volto-config-addon',
    ]);
    expect(shadowAliases).toStrictEqual([
      {
        find: 'test-released-source-addon/index',
        replacement: `${base}/addons/test-addon/src/custom-addons/test-released-source-addon/index.js`,
      },
      {
        find: '@plone/volto/server',
        replacement: `${base}/addons/test-addon/src/custom-addons/volto/server.jsx`,
      },
      {
        find: '@root/marker',
        replacement: `${base}/node_modules/test-released-source-addon/src/customizations/@root/marker.js`,
      },
      {
        find: '@plone/volto/routes',
        replacement: `${base}/node_modules/test-released-source-addon/src/customizations/routes.tsx`,
      },
      {
        find: '@plone/volto/client',
        replacement: `${base}/node_modules/test-released-source-addon/src/customizations/client.js`,
      },
      {
        find: '@plone/volto/TSComponent',
        replacement: `${base}/node_modules/test-released-source-addon/src/customizations/TSComponent.jsx`,
      },
      {
        find: '@plone/volto/LanguageSwitcher',
        replacement: `${base}/node_modules/test-released-source-addon/src/customizations/LanguageSwitcher.js`,
      },
    ]);
    expect(theme).toStrictEqual(undefined);
  });
});

describe('AddonRegistry - Project', () => {
  it('works in a mock project directory', () => {
    const base = path.join(
      import.meta.dirname,
      'fixtures',
      'test-volto-project',
    );
    const { registry } = AddonRegistry.init(base);

    const voltoPath = `${base}/node_modules/@plone/volto`;

    expect(registry.projectRootPath).toStrictEqual(base);
    expect(registry.voltoPath).toStrictEqual(voltoPath);

    expect(registry.addonNames).toStrictEqual([
      'test-addon',
      'test-released-addon',
      'test-released-source-addon',
      'my-volto-config-addon',
      'test-released-dummy',
      'test-released-unmentioned',
    ]);

    expect(registry.packages).toEqual({
      'test-addon': {
        isPublishedPackage: false,
        modulePath: `${base}/addons/test-addon/src`,
        name: 'test-addon',
        packageJson: `${base}/addons/test-addon/package.json`,
        addons: ['test-released-dummy'],
        isRegisteredAddon: true,
        version: '0.0.0',
      },
      'test-released-addon': {
        basePath: `${base}/node_modules/test-released-addon`,
        isPublishedPackage: true,
        modulePath: `${base}/node_modules/test-released-addon`,
        name: 'test-released-addon',
        packageJson: `${base}/node_modules/test-released-addon/package.json`,
        addons: ['test-released-unmentioned:extra1,extra2'],
        isRegisteredAddon: true,
        tsConfigPaths: null,
        version: '0.0.0',
      },
      'test-released-source-addon': {
        basePath: `${base}/node_modules/test-released-source-addon`,
        isPublishedPackage: true,
        modulePath: `${base}/node_modules/test-released-source-addon/src`,
        name: 'test-released-source-addon',
        packageJson: `${base}/node_modules/test-released-source-addon/package.json`,
        razzleExtender: `${base}/node_modules/test-released-source-addon/razzle.extend.js`,
        addons: [],
        isRegisteredAddon: true,
        tsConfigPaths: null,
        version: '0.0.0',
      },
      'test-released-unmentioned': {
        addons: [],
        basePath: `${base}/node_modules/test-released-unmentioned`,
        isPublishedPackage: true,
        modulePath: `${base}/node_modules/test-released-unmentioned`,
        name: 'test-released-unmentioned',
        packageJson: `${base}/node_modules/test-released-unmentioned/package.json`,
        isRegisteredAddon: true,
        tsConfigPaths: null,
        version: '0.0.0',
      },
      'my-volto-config-addon': {
        addons: ['test-released-dummy'],
        isPublishedPackage: false,
        modulePath: `${base}/addons/my-volto-config-addon/src`,
        name: 'my-volto-config-addon',
        packageJson: `${base}/addons/my-volto-config-addon/package.json`,
        isRegisteredAddon: true,
        version: '0.0.0',
      },
      'test-released-dummy': {
        addons: ['test-released-unmentioned'],
        isPublishedPackage: false,
        modulePath: `${base}/addons/test-released-dummy`,
        name: 'test-released-dummy',
        packageJson: `${base}/addons/test-released-dummy/package.json`,
        isRegisteredAddon: true,
        version: '0.0.0',
      },
    });
  });

  it('provides aliases for addons', () => {
    const base = path.join(
      import.meta.dirname,
      'fixtures',
      'test-volto-project',
    );
    const { registry } = AddonRegistry.init(base);
    expect(registry.getResolveAliases()).toStrictEqual({
      'my-volto-config-addon': `${base}/addons/my-volto-config-addon/src`,
      'test-addon': `${base}/addons/test-addon/src`,
      'test-released-addon': `${base}/node_modules/test-released-addon`,
      'test-released-dummy': `${base}/addons/test-released-dummy`,
      'test-released-source-addon': `${base}/node_modules/test-released-source-addon/src`,
      'test-released-unmentioned': `${base}/node_modules/test-released-unmentioned`,
    });
  });

  it('provides addon extenders', () => {
    const base = path.join(
      import.meta.dirname,
      'fixtures',
      'test-volto-project',
    );
    const { registry } = AddonRegistry.init(base);
    expect(registry.getAddonExtenders().length).toBe(1);
  });

  it('provides a list of addon records ordered by initial package declaration', () => {
    const base = path.join(
      import.meta.dirname,
      'fixtures',
      'test-volto-project',
    );
    const { registry } = AddonRegistry.init(base);
    const addons = registry.getAddons();
    expect(addons.map((a) => a.name)).toStrictEqual([
      'test-released-unmentioned',
      'test-released-dummy',
      'test-addon',
      'test-released-addon',
      'test-released-source-addon',
      'my-volto-config-addon',
    ]);
  });

  it('provides customization paths declared in a Volto project', () => {
    const base = path.join(
      import.meta.dirname,
      'fixtures',
      'test-volto-project',
    );
    const { registry } = AddonRegistry.init(base);
    expect(registry.getProjectCustomizationPaths()).toStrictEqual({
      '@plone/volto/LanguageSwitcher': `${base}/src/customizations/LanguageSwitcher.js`,
      '@plone/volto/TSComponent': `${base}/src/customizations/TSComponent.jsx`,
      '@plone/volto/client': `${base}/src/customizations/client.js`,
      '@plone/volto/routes': `${base}/src/customizations/routes.tsx`,
      'test-addon/testaddon': `${base}/src/custom-addons/test-addon/testaddon.js`,
      '@plone/volto/server': `${base}/src/customizations/server.jsx`,
    });
  });

  it('provides customization paths declared in addons', () => {
    const base = path.join(
      import.meta.dirname,
      'fixtures',
      'test-volto-project',
    );
    const { registry } = AddonRegistry.init(base);
    expect(registry.getAddonCustomizationPaths()).toStrictEqual({
      '@plone/volto/LanguageSwitcher': `${base}/node_modules/test-released-source-addon/src/customizations/LanguageSwitcher.js`,
      '@plone/volto/TSComponent': `${base}/node_modules/test-released-source-addon/src/customizations/TSComponent.jsx`,
      '@plone/volto/client': `${base}/node_modules/test-released-source-addon/src/customizations/client.js`,
      '@plone/volto/routes': `${base}/node_modules/test-released-source-addon/src/customizations/routes.tsx`,
      '@plone/volto/server': `${base}/addons/test-addon/src/custom-addons/volto/server.jsx`,
      '@root/marker': `${base}/node_modules/test-released-source-addon/src/customizations/@root/marker.js`,
      'test-released-source-addon/index': `${base}/addons/test-addon/src/custom-addons/test-released-source-addon/index.js`,
    });
  });
});

describe('Addon chain loading dependencies', () => {
  const depTree = {
    add0: ['add1'],
    add1: ['add2:e0', 'add4'],
    add2: ['add3:e6', 'add5', 'add6'],
    add3: ['add0'],
    add4: ['add2:e1,e3'],
    add5: ['add6'],
  };
  const extractor = (name) => depTree[name] || [];

  test('no addons', () => {
    const graph = buildDependencyGraph([], extractor);
    const deps = getAddonsLoaderChain(graph);
    expect(deps).toEqual([]);
  });

  test('one addon', () => {
    const graph = buildDependencyGraph(['volto-addon1'], extractor);
    const deps = getAddonsLoaderChain(graph);
    expect(deps).toEqual(['volto-addon1']);
  });

  test('two addons', () => {
    const graph = buildDependencyGraph(
      ['volto-addon1', 'volto-addon2'],
      extractor,
    );
    const deps = getAddonsLoaderChain(graph);
    expect(deps).toEqual(['volto-addon1', 'volto-addon2']);
  });

  test('one addon with dependency', () => {
    const graph = buildDependencyGraph(['add5'], extractor);
    const deps = getAddonsLoaderChain(graph);
    expect(deps).toEqual(['add6', 'add5']);
  });

  test('one addon with circular dependencies', () => {
    const graph = buildDependencyGraph(['add0'], extractor);
    const deps = getAddonsLoaderChain(graph);
    expect(deps).toEqual([
      'add3:e6',
      'add6',
      'add5',
      'add2:e0,e1,e3',
      'add4',
      'add1',
      'add0',
    ]);
  });
});

describe('Addon via env var - Released addon (same as dev add-on, when resolved via workspaces)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      ADDONS: 'test-released-via-addons-env-var',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('addons can be specified on the fly using ADDONS env var - Released addon', () => {
    const base = path.join(
      import.meta.dirname,
      'fixtures',
      'test-volto-project',
    );
    const { registry } = AddonRegistry.init(base);
    expect(
      Object.keys(registry.packages).includes(
        'test-released-via-addons-env-var',
      ),
    ).toBe(true);
  });
});

describe('Add-on via config file provided using an env var', () => {
  const originalEnv = process.env;
  const base = path.join(import.meta.dirname, 'fixtures', 'test-volto-project');

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('VOLTOCONFIG - provides a list of addon records ordered using an env var for providing the configuration file', () => {
    process.env = {
      ...originalEnv,
      VOLTOCONFIG: `${base}/volto.config.envvar.js`,
    };
    const { registry } = AddonRegistry.init(base);
    const addons = registry.getAddons();
    expect(addons.map((a) => a.name)).toStrictEqual([
      'test-released-unmentioned',
      'test-released-dummy',
      'test-addon',
      'test-released-addon',
      'test-released-source-addon',
      'my-volto-config-addon-via-env-var',
    ]);
  });

  it('[REGISTRYCONFIG - provides a list of addon records ordered using an env var for providing the configuration file', () => {
    process.env = {
      ...originalEnv,
      REGISTRYCONFIG: `${base}/volto.config.envvar.js`,
    };

    const { registry } = AddonRegistry.init(base);
    const addons = registry.getAddons();
    expect(addons.map((a) => a.name)).toStrictEqual([
      'test-released-unmentioned',
      'test-released-dummy',
      'test-addon',
      'test-released-addon',
      'test-released-source-addon',
      'my-volto-config-addon-via-env-var',
    ]);
  });
});
