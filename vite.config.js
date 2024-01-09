// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  define: {
    __isBrowser__: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    root: resolve(__dirname, ''),
    include: ['src/**/*.spec.js'],
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        home: resolve(__dirname, 'src/home/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '~styles': resolve(__dirname, 'src/styles'),
    },
  },
});
