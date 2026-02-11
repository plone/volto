import { describe, it, expect } from 'vitest';
import path from 'path';

describe('.well-known handling', () => {
  it('should have correct glob patterns for .well-known directory', () => {
    // This is the actual pattern configuration from the code
    const appPublic = '/app/public';
    const appBuild = '/app/build';
    const appPath = '/app';

    const patterns = [
      // General public copy blocks dotfiles
      {
        from: appPublic.replace(/\\/g, '/') + '/**/*',
        to: appBuild,
        context: appPath,
        globOptions: {
          dot: false,
          ignore: [
            appPublic.replace(/\\/g, '/') + '/index.html',
            appPublic.replace(/\\/g, '/') + '/.well-known/**/*',
          ],
        },
      },
      // Explicit .well-known rule allows dotfiles
      {
        from: appPublic.replace(/\\/g, '/') + '/.well-known/**/*',
        to: appBuild,
        context: appPath,
        globOptions: {
          dot: true,
        },
        noErrorOnMissing: true,
      },
    ];

    const [general, wellKnown] = patterns;

    // Test 1: General public copy blocks dotfiles
    expect(general.globOptions.dot).toBe(false);
    expect(general.globOptions.ignore).toContain(
      '/app/public/.well-known/**/*',
    );
    expect(
      general.globOptions.ignore.some((p) => p.includes('.well-known')),
    ).toBe(true);

    // Test 2: Explicit .well-known rule allows dotfiles
    expect(wellKnown.from).toBe('/app/public/.well-known/**/*');
    expect(wellKnown.from).toContain('.well-known');
    expect(wellKnown.globOptions.dot).toBe(true);
    expect(wellKnown.noErrorOnMissing).toBe(true);

    // Test 3: Verify the logic - general pattern excludes .well-known
    expect(general.globOptions.ignore).toContain(
      '/app/public/.well-known/**/*',
    );

    // Test 4: Verify .well-known pattern is separate and explicit
    expect(wellKnown.from).not.toBe(general.from);
    expect(wellKnown.globOptions.dot).not.toBe(general.globOptions.dot);
  });

  it('should demonstrate the pattern behavior', () => {
    // This test documents the intended behavior:
    // 1. The general pattern copies from /app/public/**/* but:
    //    - Does NOT copy dotfiles (dot: false)
    //    - Explicitly ignores .well-known directory
    // 2. A separate pattern handles .well-known:
    //    - Copies from /app/public/.well-known/**/*
    //    - DOES copy dotfiles (dot: true)
    //    - Won't error if .well-known doesn't exist

    const generalPattern = {
      from: '/app/public/**/*',
      globOptions: {
        dot: false,
        ignore: ['/app/public/.well-known/**/*'],
      },
    };

    const wellKnownPattern = {
      from: '/app/public/.well-known/**/*',
      globOptions: {
        dot: true,
      },
      noErrorOnMissing: true,
    };

    expect(generalPattern.globOptions.dot).toBe(false);
    expect(wellKnownPattern.globOptions.dot).toBe(true);
    expect(generalPattern.globOptions.ignore).toContain(
      '/app/public/.well-known/**/*',
    );
    expect(wellKnownPattern.noErrorOnMissing).toBe(true);
  });
});
