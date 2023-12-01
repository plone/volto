const path = require('path');
const AddonConfigurationRegistry = require('../addon-registry');
const WebpackRelativeResolver = require('../webpack-plugins/webpack-relative-resolver');

const base = path.join(__dirname, '..');
const makeRegistry = () => {
  const registry = new AddonConfigurationRegistry(base);
  registry.packages = {
    '@plone/volto-addon': {
      modulePath: '/somewhere/volto-addon/src',
    },
  };
  return registry;
};

const makeInstalledVoltoRequest = () => ({
  context: {
    issuer: '/myvoltoproject/node_modules/@plone/volto/src/components/index.js',
  },
  path: '/myvoltoproject/node_modules/@plone/volto/src/components',
  request: './manage/Form/InlineForm',
});

const makeLocalVoltoRequest = () => ({
  context: {
    issuer: `${base}/src/components/index.js`,
  },
  path: `${base}/src/components`,
  request: './manage/Form/InlineForm',
});

const makeInstalledAddonRequest = () => ({
  context: {
    issuer:
      '/myvoltoproject/node_modules/@plone/volto-addon/src/components/index.js',
  },
  path: '/myvoltoproject/node_modules/@plone/volto-addon/src/components',
  request: './manage/Form/InlineForm',
});

const makeLocalAddonRequest = () => ({
  context: {
    issuer: `/somewhere/volto-addon/src/components/index.js`,
  },
  path: `/somewhere/volto-addon/src/components`,
  request: './manage/Form/InlineForm',
});

const makeForeignRequest = () => ({
  context: {
    issuer: `/somewhere/node_modules/@some/react-pkg/index.js`,
  },
  path: `/somewhere/node_modules/@some/react-pkg`,
  request: './manage/Form/InlineForm',
});

describe('WebpackRelativeResolver', () => {
  it('knows about volto and its addons', () => {
    const resolver = new WebpackRelativeResolver(makeRegistry());
    expect(resolver.voltoPaths['@plone/volto/']).toStrictEqual(`${base}/src`);
    expect(resolver.voltoPaths['@plone/volto-addon']).toStrictEqual(
      '/somewhere/volto-addon/src',
    );
  });

  it('applies to installed Volto', () => {
    const resolver = new WebpackRelativeResolver(makeRegistry());
    expect(resolver.isAddon(makeLocalVoltoRequest())).toStrictEqual(true);
  });

  it('handles "standalone Volto" resolve requests', () => {
    const resolver = new WebpackRelativeResolver(makeRegistry());
    const req = makeLocalVoltoRequest();
    const resolvePath = resolver.getResolvePath(req);
    expect(resolvePath).toStrictEqual(
      '@plone/volto/components/manage/Form/InlineForm',
    );
  });

  it('handles "installed Volto" resolve requests', () => {
    const registry = makeRegistry();
    registry.voltoPath = '/myvoltoproject/node_modules/@plone/volto';
    const resolver = new WebpackRelativeResolver(registry);

    const req = makeInstalledVoltoRequest();
    const resolvePath = resolver.getResolvePath(req);
    expect(resolvePath).toStrictEqual(
      '@plone/volto/components/manage/Form/InlineForm',
    );
  });

  it('handles "installed addon" resolve requests', () => {
    const registry = makeRegistry();
    registry.packages['@plone/volto-addon'] = {
      modulePath: '/myvoltoproject/node_modules/@plone/volto-addon/src',
    };
    const resolver = new WebpackRelativeResolver(registry);
    const req = makeInstalledAddonRequest();
    const resolvePath = resolver.getResolvePath(req);
    expect(resolvePath).toStrictEqual(
      '@plone/volto-addon/components/manage/Form/InlineForm',
    );
  });

  it('handles "local addon" resolve requests', () => {
    const resolver = new WebpackRelativeResolver(makeRegistry());
    const req = makeLocalAddonRequest();
    const resolvePath = resolver.getResolvePath(req);
    expect(resolvePath).toStrictEqual(
      '@plone/volto-addon/components/manage/Form/InlineForm',
    );
  });
});

describe('functions as a Webpack resolver plugin', () => {
  it('resolves addon module paths', () => {
    const plugin = new WebpackRelativeResolver(makeRegistry());
    const req = makeLocalAddonRequest();
    const flag = [];
    const resolved = [];

    const resolver = {
      ensureHook(typ) {
        return this;
      },
      getHook(typ) {
        return this;
      },
      tapAsync: (name, callback) => {
        callback(req, {});
      },
      doResolve(type, req, _, resolveContext, callback) {
        flag.push(true);
        resolved.push(req.request);
      },
    };

    plugin.apply(resolver);
    expect(flag).toStrictEqual([true]);
    expect(resolved).toStrictEqual([
      '@plone/volto-addon/components/manage/Form/InlineForm',
    ]);
  });

  it('does nothing on non-addon paths', () => {
    const plugin = new WebpackRelativeResolver(makeRegistry());
    const req = makeForeignRequest();
    const flag = [];
    const resolved = [];

    const resolver = {
      ensureHook(typ) {
        return this;
      },
      getHook(typ) {
        return this;
      },
      tapAsync: (name, callback) => {
        callback(req, {}, () => flag.push(true));
      },
      doResolve(type, req, _, resolveContext, callback) {
        flag.push(true);
        resolved.push(req.request);
      },
    };

    plugin.apply(resolver);
    expect(flag).toStrictEqual([true]);
    expect(resolved).toStrictEqual([]);
  });
});
