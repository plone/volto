import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts', 'src/components/Icons/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
});
