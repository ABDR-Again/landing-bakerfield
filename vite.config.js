import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: './index.html',
        thankYou: './lead-submitted-thank-you.html'
      }
    }
  },
  css: {
    transformer: 'lightningcss',
  },
  plugins: [
    {
      name: 'defer-css',
      enforce: 'post',
      transformIndexHtml(html) {
        return html.replace(
          /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
          '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
        );
      }
    }
  ]
});
