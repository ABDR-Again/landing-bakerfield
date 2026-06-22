import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    target: 'esnext',
  },
  css: {
    transformer: 'lightningcss',
  },
});
