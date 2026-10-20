// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { NOINDEX_PATHS } from './src/config/noindex.ts';

export default defineConfig({
  site: 'https://hosttiva.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((p) => new URL(page).pathname.replace(/\/$/, '') === p),
    }),
  ],
  // three.js (hero 3D) is a lazy-loaded ~130 KB gzip chunk; everything else is tiny.
  vite: { plugins: [tailwindcss()], build: { chunkSizeWarningLimit: 700 } },
});
