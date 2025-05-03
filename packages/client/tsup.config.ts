import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts', 'src/bla.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
});
