// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, 'src'),
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
        main: resolve(__dirname, 'src/home/index.html'),
        login: resolve(__dirname, 'src/login/index.html'),
      },
    },
  },
});
