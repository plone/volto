import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), react()],
  build: {
    lib: {
      entry: [path.resolve(__dirname, 'src/index.ts')],
      name: 'PloneComponents',
    },
    cssMinify: 'lightningcss',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-aria',
        'react-aria-components',
        '@react-spectrum/utils',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  css: {
    transformer: 'lightningcss',
  },
});
