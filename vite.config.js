// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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
  plugins: [
    VitePWA({
      manifest: {
        name: 'PetDex',
        short_name: 'PetDex',
        icons: [
          {
            src: "/favicon/android-icon-36x36.ico",
            sizes: "36x36",
            type: "image/png"
          },
          {
            src: "/favicon/android-icon-48x48.ico",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/favicon/android-icon-72x72.ico",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "/favicon/android-icon-96x96.ico",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/favicon/android-icon-144x144.ico",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/favicon/android-icon-192x192.ico",
            sizes: "192x192",
            type: "image/png"
          }
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone'
      }
    })
  ]
});
