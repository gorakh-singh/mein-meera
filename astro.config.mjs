// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // ↓ Set site to your GitHub Pages URL, base to your repo name
  // e.g. if your repo is github.com/meera/mein-meera → base: '/mein-meera'
  site: 'https://gorakh-singh.github.io',
  base: '/mein-meera',

  output: 'static',

  integrations: [
    mdx(),
    sitemap(),
  ],

  image: {
    // Allow Unsplash images for development placeholders
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  vite: {
    build: {
      // Keep CSS readable in dev, minified in prod
      cssMinify: true,
    },
  },
});
