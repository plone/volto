import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: [path.resolve(__dirname, 'src/index.ts')],
      name: 'PloneComponents',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-aria',
        'react-aria-components',
        '@react-spectrum/utils',
        'classnames',
        'lodash',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
