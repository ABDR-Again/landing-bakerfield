import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    minify: 'terser',
    cssMinify: 'lightningcss',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    transformer: 'lightningcss',
  },
});
