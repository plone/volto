import path from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true }), react()],
  build: {
    lib: {
      entry: [
        path.resolve(__dirname, 'src/index.ts'),
        path.resolve(__dirname, 'src/provider.tsx'),
      ],
      name: 'PloneRESTAPIClient',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@tanstack/react-query', 'axios', 'zod'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tanstack/react-query': 'reactQuery',
          axios: 'axios',
          zod: 'zod',
        },
      },
    },
  },
});
