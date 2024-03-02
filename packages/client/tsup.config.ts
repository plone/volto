import type { Options } from 'tsup';

const config: Options = {
  entry: ['src/index.ts', 'src/provider.tsx'],
  dts: true,
  clean: true,
  minify: true,
  bundle: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  target: 'es2020',
  skipNodeModulesBundle: true,
  tsconfig: './tsconfig.json',
};

export default config;
