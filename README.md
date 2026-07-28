# Mein Meera

> *Notes from the road, the kitchen, and somewhere in between.*

A personal journal-style blog by Meera Singh, built with [Astro](https://astro.build). Warm editorial design inspired by printed magazines — travel writing, personal essays, and recipes.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production (includes Pagefind search index)
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── content/          # Markdown/MDX content (source of truth)
│   ├── essays/       # Personal essays and reflections
│   ├── travel/       # Travel writing
│   └── recipes/      # Recipes with full frontmatter
├── components/       # Reusable Astro components
├── layouts/          # Page layouts (Base, Post, Recipe, Category)
├── pages/            # Routes and RSS feeds
├── styles/           # CSS design system
│   ├── global.css    # Tokens, reset, base styles
│   ├── typography.css # Font faces, prose, headings
│   ├── components.css # Shared component styles
│   ├── utilities.css  # Utility classes
│   └── print.css     # Print stylesheet for recipes
└── utils/            # Helper functions
```

## Writing Content

### Creating a new post

Add a `.mdx` file to the appropriate collection directory:

**Essay** → `src/content/essays/my-essay-slug.mdx`
```yaml
---
title: "Your essay title"
description: "A one-sentence description"
date: 2025-03-15
heroUrl: "https://images.unsplash.com/photo-xxx"
tags: ["reflection", "home"]
draft: false
---

Your essay content in Markdown...
```

**Travel** → `src/content/travel/my-trip-slug.mdx`
```yaml
---
title: "Your travel post title"
description: "A one-sentence description"
date: 2025-03-15
heroUrl: "https://images.unsplash.com/photo-xxx"
place: "Jaisalmer"
country: "India"
tripDate: "February 2025"
tags: ["rajasthan", "desert"]
draft: false
---
```

**Recipe** → `src/content/recipes/my-recipe-slug.mdx`
```yaml
---
title: "Your recipe title"
description: "A one-sentence description"
date: 2025-03-15
heroUrl: "https://images.unsplash.com/photo-xxx"
serves: "4"
prepTime: "15 minutes"
cookTime: "45 minutes"
difficulty: "Easy"
cuisine: "Indian"
tags: ["dal", "comfort-food"]
ingredients:
  - group: "For the dal"
    items:
      - "1 cup toor dal"
      - "4 cups water"
  - group: "For the tadka"
    items:
      - "2 tbsp ghee"
method:
  - "Wash the dal thoroughly."
  - "Cook in a pressure cooker."
notes: "Optional cooking notes"
draft: false
---

The MDX body is the recipe's story/headnote — personal memories,
origin of the dish, etc. The actual ingredients and method come
from the frontmatter and are rendered by the layout automatically.
```

### Draft posts

Set `draft: true` in frontmatter to hide a post from the site. It won't appear in any listings, feeds, or search.

---

## Deploying to GitHub Pages

### 1. Create a GitHub repository

Create a new repo (e.g., `mein-meera`) and push this code to `main`.

### 2. Enable GitHub Pages

Go to your repo on GitHub:

1. **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. That's it — the included workflow (`.github/workflows/deploy.yml`) handles the rest

Your site will be live at: `https://<username>.github.io/mein-meera/`

### 3. Update the site URL

In `astro.config.mjs`, replace the placeholder values:

```javascript
site: 'https://your-username.github.io',
base: '/mein-meera',
```

Also update the sitemap URL in `public/robots.txt`.

### 4. Using a custom domain (optional)

If you want to use a custom domain like `meinmeera.com`:

1. Add a `CNAME` file to the `public/` directory containing your domain:
   ```
   meinmeera.com
   ```

2. Update `astro.config.mjs`:
   ```javascript
   site: 'https://meinmeera.com',
   base: '/',
   ```

3. In GitHub: **Settings** → **Pages** → **Custom domain**, enter your domain

4. Configure your domain's DNS:
   - For apex domain: Add `A` records pointing to GitHub's IPs
   - For subdomain: Add a `CNAME` record pointing to `<username>.github.io`

   See: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## Features

- **Content Collections** — Type-safe frontmatter with Zod schemas
- **MDX Support** — Use components inside your Markdown
- **RSS Feeds** — All posts + per-category feeds at `/rss/`
- **Search** — Static client-side search via Pagefind
- **Recipe Structured Data** — JSON-LD for Google rich results
- **OG Images** — Auto-generated from post hero images
- **Print Stylesheet** — Clean recipe printing
- **Sitemap** — Auto-generated for SEO
- **Fully Responsive** — Mobile-first, tested at 375px / 768px / 1440px
- **Accessible** — Semantic HTML, keyboard navigation, focus states, AA contrast

## Fonts

The site uses self-hosted Google Fonts:
- **Fraunces** — Display/headings
- **EB Garamond** — Body text
- **Instrument Sans** — UI/meta

Font files go in `public/fonts/`. Download them from Google Fonts and convert to `.woff2`.

## License

Content © Meera Singh. Code is MIT.
