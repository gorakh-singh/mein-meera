// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // ↓ Change these two lines before deploying to GitHub Pages
  // site: 'https://YOUR-USERNAME.github.io',
  // base: '/YOUR-REPO-NAME',
  site: 'http://localhost:4321',
  base: '/',

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
