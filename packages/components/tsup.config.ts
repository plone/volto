import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/quanta/index.ts',
    'src/components/icons/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});
