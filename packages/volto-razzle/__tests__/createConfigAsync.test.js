const createConfigAsync = require('../createConfigAsync');

// Mock fs to simulate presence of the public directory
jest.mock('fs-extra', () => ({
  existsSync: () => true,
}));

// Mock 'paths' to ensure consistent test behavior on any machine
jest.mock('../paths', () => ({
  appPublic: '/mock/root/public',
  appBuild: '/mock/root/build',
  appPath: '/mock/root',
  appNodeModules: '/mock/root/node_modules',
  appHtml: '/mock/root/public/index.html', // Added to satisfy template check if needed
  appAssetsManifest: '/mock/root/build/assets.json',
}));

// Mock Webpack to prevent plugins from crashing the test
jest.mock('webpack', () => ({
  DefinePlugin: class {},
  HashedModuleIdsPlugin: class {},
  optimize: {
    AggressiveMergingPlugin: class {},
    LimitChunkCountPlugin: class {},
  },
  WatchIgnorePlugin: class {},
  HotModuleReplacementPlugin: class {},
}));

// Mock other plugins to avoid load errors
jest.mock(
  'mini-css-extract-plugin',
  () =>
    class {
      static loader = 'css-loader';
    },
);
jest.mock('webpack-manifest-plugin', () => ({
  WebpackManifestPlugin: class {},
}));
jest.mock('webpackbar', () => class {});

describe('createConfigAsync - CopyPlugin Logic', () => {
  let config;
  let patterns;

  beforeAll(async () => {
    // Generate the production configuration
    config = await createConfigAsync(
      'web',
      'prod',
      {
        // Use 'prod' to match Razzle environment checks
        plugins: [],
        module: { rules: [] },
        resolve: { alias: {} },
      },
      {},
      false,
    ); // Added missing args to match function signature

    // Extract the patterns from CopyPlugin
    const copyPlugin = config.plugins.find(
      (p) => p.constructor.name === 'CopyPlugin',
    );

    // Safety check to ensure the mock worked
    if (!copyPlugin)
      throw new Error(
        'CopyPlugin not found! fs.existsSync mock might have failed.',
      );

    patterns = copyPlugin.patterns || copyPlugin.options.patterns;
  });

  it('Pattern 1: Should copy general assets but IGNORE dotfiles and .well-known', () => {
    // Find the general pattern (copies from public root)
    const generalPattern = patterns.find(
      (p) =>
        p.from.includes('/mock/root/public') && !p.from.includes('.well-known'),
    );

    expect(generalPattern).toBeDefined();

    // Requirement 1: Block dotfiles like .env, .git, .DS_Store
    expect(generalPattern.globOptions.dot).toBe(false);

    // Explicitly ignore .well-known (so Pattern 2 can handle it)
    const ignoresWellKnown = generalPattern.globOptions.ignore.some(
      (ignoreItem) => ignoreItem.includes('.well-known/**/*'),
    );
    expect(ignoresWellKnown).toBe(true);
  });

  it('Pattern 2: Should explicitly copy .well-known and ALLOW dotfiles inside it', () => {
    // Find the specific pattern targeting .well-known
    const wellKnownPattern = patterns.find((p) =>
      p.from.includes('.well-known'),
    );

    expect(wellKnownPattern).toBeDefined();

    // Requirement 2: .well-known files are explicitly allowed
    expect(wellKnownPattern.from).toContain(
      '/mock/root/public/.well-known/**/*',
    );

    // Requirement 3: Allow hidden files (like .verification-code) inside .well-known
    expect(wellKnownPattern.globOptions.dot).toBe(true);

    // Requirement 4: Ensure build doesn't crash if folder is missing
    expect(wellKnownPattern.noErrorOnMissing).toBe(true);
  });
});
