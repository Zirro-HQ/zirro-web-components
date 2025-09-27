import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.test.tsx',
        'src/**/*.spec.tsx',
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ZirroWebComponents',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        // Preserve CSS imports
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name as string;
        },
      },
    },
    // Generate source maps for debugging
    sourcemap: true,
    // Ensure clean builds
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // Development server configuration
  server: {
    port: 3001,
    open: true,
  },
  // CSS configuration
  css: {
    postcss: './postcss.config.js',
  },
});
