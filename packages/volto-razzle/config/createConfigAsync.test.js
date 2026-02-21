import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs-extra';
import path from 'path';

describe('createConfigAsync .well-known handling', () => {
  let originalNodeEnv;
  const publicDir = path.resolve(process.cwd(), 'public');
  const createdPublicDir = !fs.existsSync(publicDir);

  beforeAll(async () => {
    originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    // Create public directory if it doesn't exist
    if (createdPublicDir) {
      await fs.ensureDir(publicDir);
    }
  });

  afterAll(async () => {
    process.env.NODE_ENV = originalNodeEnv;

    // Only remove if we created it
    if (createdPublicDir) {
      await fs.remove(publicDir);
    }
  });

  it('should configure CopyPlugin to allow .well-known dotfiles in production', async () => {
    // Import after setting up the directory
    const createConfigAsync = (await import('./createConfigAsync')).default;

    const config = await createConfigAsync(
      'web',
      'prod',
      {},
      { version: '5' },
      false,
      undefined, // Use default paths
      [],
      {
        forceRuntimeEnvVars: [],
        debug: { options: false, config: false },
        browserslist: ['>1%'],
        mediaPrefix: 'static/media',
        cssPrefix: 'static/css',
        jsPrefix: 'static/js',
        emitOnErrors: false,
      },
    );

    // Find CopyPlugin
    const copyPlugin = config.plugins.find(
      (p) => p && p.constructor && p.constructor.name === 'CopyPlugin',
    );

    if (!copyPlugin) {
      console.log(
        'Available plugins:',
        config.plugins.map((p) => p?.constructor?.name),
      );
      throw new Error(
        'CopyPlugin not found in webpack config. Make sure NODE_ENV=production and public directory exists.',
      );
    }

    // Debug: log the plugin structure
    console.log('CopyPlugin keys:', Object.keys(copyPlugin));
    console.log('CopyPlugin.options:', copyPlugin.options);
    console.log('CopyPlugin.patterns:', copyPlugin.patterns);

    // Try different ways to access patterns
    const patterns =
      copyPlugin.patterns ||
      copyPlugin.options?.patterns ||
      copyPlugin.pluginOptions?.patterns;

    if (!patterns) {
      console.log('Full copyPlugin:', JSON.stringify(copyPlugin, null, 2));
      throw new Error('Could not find patterns in CopyPlugin');
    }

    expect(patterns).toBeDefined();
    expect(patterns.length).toBeGreaterThanOrEqual(2);

    // Find the .well-known specific pattern
    const wellKnownPattern = patterns.find(
      (p) => p.from && p.from.includes('.well-known'),
    );

    // Find the general public pattern
    const generalPattern = patterns.find(
      (p) =>
        p.from && !p.from.includes('.well-known') && p.from.includes('public'),
    );

    // Assert .well-known pattern exists and allows dotfiles
    expect(wellKnownPattern).toBeDefined();
    expect(wellKnownPattern.globOptions.dot).toBe(true);
    expect(wellKnownPattern.noErrorOnMissing).toBe(true);

    // Assert general pattern blocks dotfiles and excludes .well-known
    expect(generalPattern).toBeDefined();
    expect(generalPattern.globOptions.dot).toBe(false);
    expect(
      generalPattern.globOptions.ignore.some((ignore) =>
        ignore.includes('.well-known'),
      ),
    ).toBe(true);
  });
});

describe('createConfigAsync css minimizer sourceMap option', () => {
  it('should propagate razzleOptions.enableSourceMaps to CssMinimizerPlugin.minimizerOptions.sourceMap', async () => {
    const createConfigAsync = (await import('./createConfigAsync')).default;

    const commonRazzleOptions = {
      forceRuntimeEnvVars: [],
      debug: { options: false, config: false },
      browserslist: ['>1%'],
      mediaPrefix: 'static/media',
      cssPrefix: 'static/css',
      jsPrefix: 'static/js',
      emitOnErrors: false,
    };

    // When enableSourceMaps = true
    const configWithMaps = await createConfigAsync(
      'web',
      'prod',
      {},
      { version: '5' },
      false,
      undefined,
      [],
      { ...commonRazzleOptions, enableSourceMaps: true },
    );

    const minimizersTrue = configWithMaps.optimization?.minimizer || [];
    const cssMinimizerTrue = minimizersTrue.find(
      (m) =>
        m && m.constructor && /CssMinimizerPlugin/.test(m.constructor.name),
    );
    expect(cssMinimizerTrue).toBeDefined();
    // plugin may store options in different properties depending on plugin implementation
    const findSourceMap = (obj, depth = 4) => {
      if (!obj || typeof obj !== 'object' || depth < 0) return undefined;
      if (Object.prototype.hasOwnProperty.call(obj, 'sourceMap'))
        return obj.sourceMap;
      for (const k of Object.keys(obj)) {
        try {
          const v = obj[k];
          const found = findSourceMap(v, depth - 1);
          if (found !== undefined) return found;
        } catch (e) {
          // ignore
        }
      }
      return undefined;
    };

    const sourceMapTrue =
      findSourceMap(cssMinimizerTrue) ??
      findSourceMap(cssMinimizerTrue?.options);
    if (sourceMapTrue === undefined) {
      console.log(
        'cssMinimizerTrue keys:',
        Object.keys(cssMinimizerTrue || {}),
      );
      console.log(
        'cssMinimizerTrue (shallow):',
        Object.entries(cssMinimizerTrue || {}).slice(0, 10),
      );
    }
    expect(sourceMapTrue).toBe(true);

    // When enableSourceMaps = false
    const configWithoutMaps = await createConfigAsync(
      'web',
      'prod',
      {},
      { version: '5' },
      false,
      undefined,
      [],
      { ...commonRazzleOptions, enableSourceMaps: false },
    );

    const minimizersFalse = configWithoutMaps.optimization?.minimizer || [];
    const cssMinimizerFalse = minimizersFalse.find(
      (m) =>
        m && m.constructor && /CssMinimizerPlugin/.test(m.constructor.name),
    );
    expect(cssMinimizerFalse).toBeDefined();
    const sourceMapFalse =
      findSourceMap(cssMinimizerFalse) ??
      findSourceMap(cssMinimizerFalse?.options);
    expect(sourceMapFalse).toBe(false);
  });
});
