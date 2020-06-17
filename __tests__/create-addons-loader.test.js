const fs = require('fs');
const transform = require('@babel/core').transform;

const getLoader = require('../create-addons-loader');

describe('create-addons-loader code generation', () => {
  test('no addon creates simple loader', () => {
    const code = getLoader.getAddonsLoaderCode([]);
    expect(code).toBe(`
export default(config) => {
  const addonLoaders = [];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
  });

  test('one addon creates loader', () => {
    const code = getLoader.getAddonsLoaderCode(['volto-addon1']);
    expect(code).toBe(`import voltoAddon1 from 'volto-addon1';

export default(config) => {
  const addonLoaders = [voltoAddon1];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
  });

  test('two addons create loaders', () => {
    const code = getLoader.getAddonsLoaderCode([
      'volto-addon1',
      'volto-addon2',
    ]);
    expect(code).toBe(`import voltoAddon1 from 'volto-addon1';
import voltoAddon2 from 'volto-addon2';

export default(config) => {
  const addonLoaders = [voltoAddon1, voltoAddon2];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
  });

  test('one addons plus one extra creates loader', () => {
    const code = getLoader.getAddonsLoaderCode(['volto-addon1:loadExtra1']);
    expect(code).toBe(`import voltoAddon1, { loadExtra1 } from 'volto-addon1';

export default(config) => {
  const addonLoaders = [voltoAddon1, loadExtra1];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
  });

  test('one addons plus two extras creates loader', () => {
    const code = getLoader.getAddonsLoaderCode([
      'volto-addon1:loadExtra1,loadExtra2',
    ]);
    expect(code)
      .toBe(`import voltoAddon1, { loadExtra1, loadExtra2 } from 'volto-addon1';

export default(config) => {
  const addonLoaders = [voltoAddon1, loadExtra1, loadExtra2];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
  });

  test('two addons plus extras creates loader', () => {
    const code = getLoader.getAddonsLoaderCode([
      'volto-addon1:loadExtra1,loadExtra2',
      'volto-addon2:loadExtra3,loadExtra4',
    ]);
    expect(code)
      .toBe(`import voltoAddon1, { loadExtra1, loadExtra2 } from 'volto-addon1';
import voltoAddon2, { loadExtra3, loadExtra4 } from 'volto-addon2';

export default(config) => {
  const addonLoaders = [voltoAddon1, loadExtra1, loadExtra2, voltoAddon2, loadExtra3, loadExtra4];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
  });
});

describe('create-addons-loader default name generation', () => {
  const getName = getLoader.nameFromPackage;

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
  test('passing a tilda relative path strips tilda', () => {
    const name = getName('~/../');
    expect(name.length).toBe(10);
    expect(new RegExp(/[abcdefghjk]+/).exec(name)[0].length > 0).toBe(true);
  });
});

function transpile(fpath) {
  const code = fs.readFileSync(fpath, 'utf-8');
  const output = transform(code, {
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  });
  fs.writeFileSync(fpath, output.code);
}

describe('create-addons-loader apply configuration', () => {
  test('get the default export and applies it', () => {
    const addon1 = require.resolve('./fixtures/volto-addon1');

    const loaderPath = getLoader([addon1]);
    transpile(loaderPath);

    const loader = require(loaderPath).default;
    const defaultConfig = {};
    const config = loader(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en'],
        navDepth: 1,
      },
    });
  });

  // test('get the default export and applies it with several packages, last wins', () => {
  //   packageJSON.addons = ['./volto-addon1', './volto-addon2'];
  //   const defaultConfig = {};
  //   const config = applyAddonsConfiguration(defaultConfig);
  //   expect(config).toStrictEqual({
  //     settings: {
  //       nonContentRoutes: [],
  //       supportedLanguages: ['en', 'de'],
  //       navDepth: 3,
  //     },
  //   });
  // });
  // test('get the default export and applies it with several packages, last wins (2)', () => {
  //   packageJSON.addons = ['./volto-addon2', './volto-addon1'];
  //   const defaultConfig = {};
  //   const config = applyAddonsConfiguration(defaultConfig);
  //   expect(config).toStrictEqual({
  //     settings: {
  //       nonContentRoutes: [],
  //       supportedLanguages: ['en'],
  //       navDepth: 1,
  //     },
  //   });
  // });
  // test('get the default export and applies it with several packages, last wins (2)', () => {
  //   packageJSON.addons = ['./volto-addon2', './volto-addon1'];
  //   const defaultConfig = {};
  //   const config = applyAddonsConfiguration(defaultConfig);
  //   expect(config).toStrictEqual({
  //     settings: {
  //       nonContentRoutes: [],
  //       supportedLanguages: ['en'],
  //       navDepth: 1,
  //     },
  //   });
  // });
  // test('get the default export and applies it along with an additionalConfig', () => {
  //   packageJSON.addons = ['./volto-addon1', './volto-addon2:additionalConfig'];
  //   const defaultConfig = {};
  //   const config = applyAddonsConfiguration(defaultConfig);
  //   expect(config).toStrictEqual({
  //     settings: {
  //       nonContentRoutes: [],
  //       supportedLanguages: ['en', 'de'],
  //       navDepth: 6,
  //     },
  //   });
  // });
  // test('get the default export and applies it along with an additionalConfig and a second alternate config', () => {
  //   packageJSON.addons = [
  //     './volto-addon1',
  //     './volto-addon2:additionalConfig',
  //     './volto-addon3:additionalConfig,alternateAdditionalConfig',
  //   ];
  //   const defaultConfig = {};
  //   const config = applyAddonsConfiguration(defaultConfig);
  //   expect(config).toStrictEqual({
  //     settings: {
  //       nonContentRoutes: [],
  //       supportedLanguages: ['en', 'de'],
  //       navDepth: 10,
  //     },
  //   });
  // });
  // test('get the default export and applies it along with an additionalConfig and a second alternate config, last wins', () => {
  //   packageJSON.addons = [
  //     './volto-addon1',
  //     './volto-addon2:additionalConfig',
  //     './volto-addon3:alternateAdditionalConfig,additionalConfig',
  //   ];
  //   const defaultConfig = {};
  //   const config = applyAddonsConfiguration(defaultConfig);
  //   expect(config).toStrictEqual({
  //     settings: {
  //       nonContentRoutes: [],
  //       supportedLanguages: ['en', 'de'],
  //       navDepth: 6,
  //     },
  //   });
  // });
  // test('get an additionalConfig and a second alternate config, along with a default export and applies it, last wins', () => {
  //   packageJSON.addons = [
  //     './volto-addon2:additionalConfig',
  //     './volto-addon3:alternateAdditionalConfig,additionalConfig',
  //     './volto-addon1',
  //   ];
  //   const defaultConfig = {};
  //   const config = applyAddonsConfiguration(defaultConfig);
  //   expect(config).toStrictEqual({
  //     settings: {
  //       nonContentRoutes: [],
  //       supportedLanguages: ['en'],
  //       navDepth: 1,
  //     },
  //   });
  // });
  // test('ask for a non existing addon config', () => {
  //   packageJSON.addons = [
  //     './volto-addon1',
  //     './volto-addon2:additionalNonExistingConfig',
  //   ];
  //   const defaultConfig = {};
  //   const config = applyAddonsConfiguration(defaultConfig);
  //   expect(config).toStrictEqual({
  //     settings: {
  //       nonContentRoutes: [],
  //       supportedLanguages: ['en', 'de'],
  //       navDepth: 3,
  //     },
  //   });
  // });
});
