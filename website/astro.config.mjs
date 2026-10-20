// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { NOINDEX_PATHS } from './src/config/noindex.ts';

const PRODUCT_PREFIX = /^\/(products|hosting|domains|create|sell-online|email|agencies|solutions)\/./;

export default defineConfig({
  site: 'https://hosttiva.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((p) => new URL(page).pathname.replace(/\/$/, '') === p),
      // Split sitemaps (SRS §6): products, blog, tutorials; everything else stays in the default pages sitemap.
      chunks: {
        products: (item) => (PRODUCT_PREFIX.test(new URL(item.url).pathname) ? item : undefined),
        blog: (item) => (new URL(item.url).pathname.startsWith('/blog') ? item : undefined),
        tutorials: (item) => (new URL(item.url).pathname.startsWith('/tutorials') ? item : undefined),
      },
    }),
  ],
  // three.js (hero 3D) is a lazy-loaded ~130 KB gzip chunk; everything else is tiny.
  vite: { plugins: [tailwindcss()], build: { chunkSizeWarningLimit: 700 } },
});
