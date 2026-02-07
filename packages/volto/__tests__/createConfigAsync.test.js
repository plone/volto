import { describe, it, expect, vi } from 'vitest';

// Import createConfigAsync to test
import createConfigAsync from '../../volto-razzle/config/createConfigAsync';

// Mock env.js
vi.mock('../../volto-razzle/config/env', () => ({
  getClientEnv: () => ({
    raw: {
      HOST: 'localhost',
      CLIENT_PUBLIC_PATH: '/',
      PUBLIC_PATH: '/',
    },
    stringified: {},
  }),
}));

// Mock paths
vi.mock('../../volto-razzle/config/paths', () => ({
  appPath: '/app',
  appPublic: '/app/public',
  appBuild: '/app/build',
  appBuildPublic: '/app/build/public',
  appAssetsManifest: '/app/build/assets.json',
  appClientIndexJs: '/app/src/client.js',
}));

// Mock fs so public dir exists
vi.mock('fs-extra', () => ({
  existsSync: () => true,
}));

vi.mock('webpack', () => ({
  WatchIgnorePlugin: class {},
  DefinePlugin: class {},
  ProvidePlugin: class {},
}));

vi.mock('mini-css-extract-plugin', () => ({
  default: class {
    static loader = 'mini-css';
  },
}));

vi.mock('webpack-manifest-plugin', () => ({
  WebpackManifestPlugin: class {},
}));

vi.mock('webpackbar', () => ({
  default: class {},
}));

vi.mock('html-webpack-plugin', () => ({
  default: class {},
}));

vi.mock('terser-webpack-plugin', () => ({
  default: class {},
}));

vi.mock('css-minimizer-webpack-plugin', () => ({
  default: class {},
}));

vi.mock('@pmmmwh/react-refresh-webpack-plugin', () => ({
  default: class {},
}));

vi.mock('razzle-start-server-webpack-plugin', () => ({
  default: class {},
}));

vi.mock('razzle-dev-utils/webpackMajor', () => 5);
vi.mock('razzle-dev-utils/devServerMajor', () => 4);

describe('createConfigAsync – .well-known handling', () => {
  it('blocks dotfiles except .well-known', async () => {
    const config = await createConfigAsync(
      'web',
      'prod',
      {},
      { version: '5' },
      false,
      undefined,
      [],
      {
        forceRuntimeEnvVars: [],
        debug: { options: false },
      },
    );

    // Find CopyPlugin in the returned config
    const copyPlugin = config.plugins.find((p) => p.patterns);
    expect(copyPlugin).toBeDefined();

    const patterns = copyPlugin.patterns;
    expect(patterns).toBeDefined();
    expect(patterns).toHaveLength(2);

    const [general, wellKnown] = patterns;

    // Test 1: General public copy blocks dotfiles
    expect(general.globOptions.dot).toBe(false);
    expect(
      general.globOptions.ignore.some((p) => p.includes('.well-known')),
    ).toBe(true);

    // Test 2: Explicit .well-known rule allows dotfiles
    expect(wellKnown.from).toContain('.well-known');
    expect(wellKnown.globOptions.dot).toBe(true);
    expect(wellKnown.noErrorOnMissing).toBe(true);
  });
});
