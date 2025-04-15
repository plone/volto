import fs from 'fs';
import { transform } from '@babel/core';
import {
  createAddonsLoader,
  getAddonsLoaderCode,
  nameFromPackage,
} from '@plone/registry/create-addons-loader';
import jiti from 'jiti';

describe('create-addons-loader code generation', () => {
  test('no addon creates simple loader, default = no loadProjectConfig', () => {
    const code = getAddonsLoaderCode([]);
    expect(code).toBe(`/*
Don't change this file manually.
It is autogenerated by @plone/registry.
Instead, change the "addons" registration in the app.
*/

const addonsInfo = {};
export { addonsInfo };

const safeWrapper = (func) => (config) => {
  const res = func(config);
  if (typeof res === 'undefined') {
    throw new Error("Configuration function doesn't return config");
  }
  return res;
}

const load = (config) => {
  const addonLoaders = [];
  if(!addonLoaders.every((el) => typeof el === "function")) {
    throw new TypeError(
      'Each addon has to provide a function applying its configuration to the projects configuration.',
    );
  }
  return addonLoaders.reduce((acc, apply) => safeWrapper(apply)(acc), config);
};
export default load;
`);
  });

  test('no addon creates simple loader, loadProjectConfig set to true', () => {
    const code = getAddonsLoaderCode([], {}, true);
    expect(code).toBe(`/*
Don't change this file manually.
It is autogenerated by @plone/registry.
Instead, change the "addons" registration in the app.
*/

const addonsInfo = {};
export { addonsInfo };

const safeWrapper = (func) => (config) => {
  const res = func(config);
  if (typeof res === 'undefined') {
    throw new Error("Configuration function doesn't return config");
  }
  return res;
}

const load = (config) => {
  const addonLoaders = [];
  if(!addonLoaders.every((el) => typeof el === "function")) {
    throw new TypeError(
      'Each addon has to provide a function applying its configuration to the projects configuration.',
    );
  }
  return addonLoaders.reduce((acc, apply) => safeWrapper(apply)(acc), config);
};
export default load;
`);
  });

  test('one addon creates loader', () => {
    const code = getAddonsLoaderCode(['volto-addon1']);
    expect(code.indexOf("import voltoAddon1 from 'volto-addon1';") > 0).toBe(
      true,
    );
  });

  test('two addons create loaders', () => {
    const code = getAddonsLoaderCode(['volto-addon1', 'volto-addon2']);
    expect(
      code.indexOf(`
import voltoAddon1 from 'volto-addon1';
import voltoAddon2 from 'volto-addon2';`) > 0,
    ).toBe(true);
  });

  test('one addons plus one extra creates loader', () => {
    const code = getAddonsLoaderCode(['volto-addon1:loadExtra1']);
    expect(
      code.indexOf(`
import voltoAddon1, { loadExtra1 as loadExtra10 } from 'volto-addon1';
`) > 0,
    ).toBe(true);
  });

  test('one addons plus two extras creates loader', () => {
    const code = getAddonsLoaderCode(['volto-addon1:loadExtra1,loadExtra2']);
    expect(
      code.indexOf(`
import voltoAddon1, { loadExtra1 as loadExtra10, loadExtra2 as loadExtra21 } from 'volto-addon1';
`) > 0,
    ).toBe(true);
  });

  test('two addons plus extras creates loader', () => {
    const code = getAddonsLoaderCode([
      'volto-addon1:loadExtra1,loadExtra2',
      'volto-addon2:loadExtra3,loadExtra4',
    ]);
    expect(
      code.indexOf(`
import voltoAddon1, { loadExtra1 as loadExtra10, loadExtra2 as loadExtra21 } from 'volto-addon1';
import voltoAddon2, { loadExtra3 as loadExtra32, loadExtra4 as loadExtra43 } from 'volto-addon2';
`) > 0,
    ).toBe(true);
  });
});

describe('create-addons-loader default name generation', () => {
  const getName = nameFromPackage;

  test('passing a simple word returns a word', () => {
    expect(getName('something')).toBe('something');
  });

  test('passing a kebab-name returns a word', () => {
    expect(getName('volto-something-else')).toBe('voltoSomethingElse');
  });

  test('passing a simple relative path returns random string', () => {
    const rand = getName('../../');
    expect(rand.length).toBe(10);
    expect(new RegExp(/[abcdefghjk]+/).exec(rand)[0].length > 0).toBe(true);
  });
  test('passing a tilda relative path with addon strips tilda', () => {
    const name = getName('~/addons/volto-addon1');
    expect(name).toBe('addonsvoltoAddon1');
  });
  test('passing a namespace package strips @', () => {
    const name = getName('@plone/volto-addon1');
    expect(name).toBe('plonevoltoAddon1');
  });
  test('passing a tilda relative path strips tilda', () => {
    const name = getName('~/../');
    expect(name.length).toBe(10);
    expect(new RegExp(/[abcdefghjk]+/).exec(name)[0].length > 0).toBe(true);
  });
  test('passing a backspaced path strips backspace', () => {
    const name = getName('c:\\nodeprojects');
    expect(name).toBe('cnodeprojects');
  });
});

const _import = jiti(import.meta.url, { esmResolve: true });

function transpile(fpath) {
  const code = fs.readFileSync(fpath, 'utf-8');
  const output = transform(code, {
    root: '.',
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  });
  fs.writeFileSync(fpath, output.code);
}

function makeAddonLoader(addons, load = true) {
  addons = addons.map((name) =>
    name.includes(':')
      ? `${_import.resolve(name.split(':')[0])}:${name.substring(
          name.indexOf(':') + 1,
          name.length,
        )}`
      : _import.resolve(name),
  );

  const loaderPath = createAddonsLoader(addons);
  transpile(loaderPath);

  if (load) {
    return _import(loaderPath).default;
  } else {
    return loaderPath;
  }
}

describe('create-addons-loader apply configuration', () => {
  test('get the default export and applies it', () => {
    const defaultConfig = {};
    const loader = makeAddonLoader(['./fixtures/volto-addon1']);
    const config = loader(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en'],
        navDepth: 1,
      },
    });
  });

  test('get the default export and applies it with several packages, last wins', () => {
    const defaultConfig = {};
    const loader = makeAddonLoader([
      './fixtures/volto-addon1',
      './fixtures/volto-addon2',
    ]);
    const config = loader(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en', 'de'],
        navDepth: 3,
      },
    });
  });

  test('get the default export and applies it with several packages, last wins (2)', () => {
    const defaultConfig = {};
    const loader = makeAddonLoader([
      './fixtures/volto-addon2',
      './fixtures/volto-addon1',
    ]);
    const config = loader(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en'],
        navDepth: 1,
      },
    });
  });

  test('get the default export and applies it along with an additionalConfig', () => {
    const defaultConfig = {};
    const loader = makeAddonLoader([
      './fixtures/volto-addon1',
      './fixtures/volto-addon2:additionalConfig',
    ]);
    const config = loader(defaultConfig);

    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en', 'de'],
        navDepth: 6,
      },
    });
  });

  test('get the default export and applies it along with an additionalConfig and a second alternate config', () => {
    const defaultConfig = {};
    const loader = makeAddonLoader([
      './fixtures/volto-addon1',
      './fixtures/volto-addon2:additionalConfig',
      './fixtures/volto-addon3:additionalConfig,alternateAdditionalConfig',
    ]);
    const config = loader(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en', 'de'],
        navDepth: 10,
      },
    });
  });

  test('get the default export and applies it along with an additionalConfig and a second alternate config, last wins', () => {
    const defaultConfig = {};
    const loader = makeAddonLoader([
      './fixtures/volto-addon1',
      './fixtures/volto-addon2:additionalConfig',
      './fixtures/volto-addon3:alternateAdditionalConfig,additionalConfig',
    ]);
    const config = loader(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en', 'de'],
        navDepth: 6,
      },
    });
  });

  test('get an additionalConfig and a second alternate config, along with a default export and applies it, last wins', () => {
    const defaultConfig = {};
    const loader = makeAddonLoader([
      './fixtures/volto-addon2:additionalConfig',
      './fixtures/volto-addon3:alternateAdditionalConfig,additionalConfig',
      './fixtures/volto-addon1',
    ]);
    const config = loader(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en'],
        navDepth: 1,
      },
    });
  });

  test('ask for a non existing addon config will break loader', () => {
    const defaultConfig = {};
    const loader = makeAddonLoader(
      [
        './fixtures/volto-addon1',
        './fixtures/volto-addon2:additionalNonExistingConfig',
      ],
      true,
    );
    expect(() => loader(defaultConfig)).toThrow(TypeError);
  });
});
