const path = require('path');
const AddonConfigurationRegistry = require('../addon-registry');
const {
  buildDependencyGraph,
  getAddonsLoaderChain,
} = AddonConfigurationRegistry;

describe('AddonConfigurationRegistry', () => {
  it('works in Volto', () => {
    const base = path.join(__dirname, '..');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.projectRootPath).toStrictEqual(base);
    expect(reg.addonNames).toStrictEqual([]);
  });

  it('works in a mock project directory', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);

    const voltoPath = `${base}/node_modules/@plone/volto`;

    expect(reg.projectRootPath).toStrictEqual(base);
    expect(reg.voltoPath).toStrictEqual(voltoPath);

    expect(reg.addonNames).toStrictEqual([
      'test-addon',
      'test-released-addon',
      'test-released-source-addon',
      'test-released-unmentioned',
    ]);

    expect(reg.packages).toEqual({
      'test-addon': {
        extraConfigLoaders: [],
        isPublishedPackage: false,
        modulePath: `${base}/addons/test-addon/src`,
        name: 'test-addon',
        packageJson: `${base}/addons/test-addon/package.json`,
        addons: ['test-released-dummy'],
      },
      'test-released-addon': {
        extraConfigLoaders: ['extra'],
        isPublishedPackage: true,
        modulePath: `${base}/node_modules/test-released-addon`,
        name: 'test-released-addon',
        packageJson: `${base}/node_modules/test-released-addon/package.json`,
        addons: ['test-released-unmentioned:extra1,extra2'],
        // serverConfig: `${base}/node_modules/test-released-addon/server.config.js`,
      },
      'test-released-source-addon': {
        extraConfigLoaders: [],
        isPublishedPackage: true,
        modulePath: `${base}/node_modules/test-released-source-addon/src`,
        name: 'test-released-source-addon',
        packageJson: `${base}/node_modules/test-released-source-addon/package.json`,
        razzleExtender: `${base}/node_modules/test-released-source-addon/razzle.extend.js`,
        addons: [],
      },
      'test-released-unmentioned': {
        addons: [],
        isPublishedPackage: true,
        modulePath:
          '/home/tibi/work/volto/__tests__/fixtures/test-volto-project/node_modules/test-released-unmentioned',
        name: 'test-released-unmentioned',
        packageJson:
          '/home/tibi/work/volto/__tests__/fixtures/test-volto-project/node_modules/test-released-unmentioned/package.json',
      },
      'test-released-dummy': {
        addons: ['test-released-unmentioned'],
        isPublishedPackage: false,
        modulePath:
          '/home/tibi/work/volto/__tests__/fixtures/test-volto-project/addons/test-released-dummy',
        name: 'test-released-dummy',
        packageJson:
          '/home/tibi/work/volto/__tests__/fixtures/test-volto-project/addons/test-released-dummy/package.json',
      },
      // 'test-unmentioned-addon': {
      //   addons: [],
      //   isPublishedPackage: false,
      //   modulePath:
      //     '/home/tibi/work/volto/__tests__/fixtures/test-volto-project/addons/test-unmentioned-addon/src',
      //   name: 'test-unmentioned-addon',
      //   packageJson:
      //     '/home/tibi/work/volto/__tests__/fixtures/test-volto-project/addons/test-unmentioned-addon/package.json',
      // },
    });
  });

  it('provides aliases for addons', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.getResolveAliases()).toStrictEqual({
      'test-addon': `${base}/addons/test-addon/src`,
      'test-released-addon': `${base}/node_modules/test-released-addon`,
      'test-released-dummy':
        '/home/tibi/work/volto/__tests__/fixtures/test-volto-project/addons/test-released-dummy',
      'test-released-source-addon': `${base}/node_modules/test-released-source-addon/src`,
      'test-released-unmentioned':
        '/home/tibi/work/volto/__tests__/fixtures/test-volto-project/node_modules/test-released-unmentioned',
      // 'test-unmentioned-addon':
      //   '/home/tibi/work/volto/__tests__/fixtures/test-volto-project/addons/test-unmentioned-addon/src',
    });
  });

  it('provides addon extenders', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.getAddonExtenders().length).toBe(1);
  });

  it('provides a list of addon records ordered by initial package declaration', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);
    const addons = reg.getAddons();
    expect(addons.map((a) => a.name)).toStrictEqual([
      'test-released-unmentioned',
      'test-released-dummy',
      'test-addon',
      'test-released-addon',
      'test-released-source-addon',
    ]);
  });

  it('provides customization paths declared in a Volto project', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.getProjectCustomizationPaths()).toStrictEqual({
      '@plone/volto/client': `${base}/src/customizations/client.js`,
      'test-addon/testaddon': `${base}/src/custom-addons/test-addon/testaddon.js`,
      '@plone/volto/server': `${base}/src/customizations/server.jsx`,
    });
  });

  it('provides customization paths declared in addons', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.getAddonCustomizationPaths()).toStrictEqual({
      '@plone/volto/client': `${base}/node_modules/test-released-source-addon/src/customizations/client.js`,
      '@plone/volto/server': `${base}/addons/test-addon/src/custom-addons/volto/server.jsx`,
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
