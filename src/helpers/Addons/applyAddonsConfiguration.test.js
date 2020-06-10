import applyAddonsConfiguration from './applyAddonsConfiguration';
import packageJSON from '~/../package.json';

describe('applyAddonsConfiguration', () => {
  test('get the default export and applies it', () => {
    packageJSON.addons = ['./volto-addon1'];
    const defaultConfig = {};
    const config = applyAddonsConfiguration(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en'],
        navDepth: 1,
      },
    });
  });
  test('get the default export and applies it with several packages, last wins', () => {
    packageJSON.addons = ['./volto-addon1', './volto-addon2'];
    const defaultConfig = {};
    const config = applyAddonsConfiguration(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en', 'de'],
        navDepth: 3,
      },
    });
  });
  test('get the default export and applies it with several packages, last wins (2)', () => {
    packageJSON.addons = ['./volto-addon2', './volto-addon1'];
    const defaultConfig = {};
    const config = applyAddonsConfiguration(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en'],
        navDepth: 1,
      },
    });
  });
  test('get the default export and applies it with several packages, last wins (2)', () => {
    packageJSON.addons = ['./volto-addon2', './volto-addon1'];
    const defaultConfig = {};
    const config = applyAddonsConfiguration(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en'],
        navDepth: 1,
      },
    });
  });
  test('get the default export and applies it along with an additionalConfig', () => {
    packageJSON.addons = ['./volto-addon1', './volto-addon2:additionalConfig'];
    const defaultConfig = {};
    const config = applyAddonsConfiguration(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en', 'de'],
        navDepth: 6,
      },
    });
  });
  test('get the default export and applies it along with an additionalConfig and a second alternate config', () => {
    packageJSON.addons = [
      './volto-addon1',
      './volto-addon2:additionalConfig',
      './volto-addon3:additionalConfig,alternateAdditionalConfig',
    ];
    const defaultConfig = {};
    const config = applyAddonsConfiguration(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en', 'de'],
        navDepth: 10,
      },
    });
  });
  test('get the default export and applies it along with an additionalConfig and a second alternate config, last wins', () => {
    packageJSON.addons = [
      './volto-addon1',
      './volto-addon2:additionalConfig',
      './volto-addon3:alternateAdditionalConfig,additionalConfig',
    ];
    const defaultConfig = {};
    const config = applyAddonsConfiguration(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en', 'de'],
        navDepth: 6,
      },
    });
  });
  test('get an additionalConfig and a second alternate config, along with a default export and applies it, last wins', () => {
    packageJSON.addons = [
      './volto-addon2:additionalConfig',
      './volto-addon3:alternateAdditionalConfig,additionalConfig',
      './volto-addon1',
    ];
    const defaultConfig = {};
    const config = applyAddonsConfiguration(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en'],
        navDepth: 1,
      },
    });
  });
  test('ask for a non existing addon config', () => {
    packageJSON.addons = [
      './volto-addon1',
      './volto-addon2:additionalNonExistingConfig',
    ];
    const defaultConfig = {};
    const config = applyAddonsConfiguration(defaultConfig);
    expect(config).toStrictEqual({
      settings: {
        nonContentRoutes: [],
        supportedLanguages: ['en', 'de'],
        navDepth: 3,
      },
    });
  });
});
