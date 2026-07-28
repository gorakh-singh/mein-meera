import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─────────────────────────────────────────────
// Essays collection
// ─────────────────────────────────────────────
const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    heroUrl: z.string().url(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// ─────────────────────────────────────────────
// Travel collection
// ─────────────────────────────────────────────
const travel = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/travel' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    heroUrl: z.string().url(),
    place: z.string(),
    country: z.string(),
    tripDate: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// ─────────────────────────────────────────────
// Recipes collection
// ─────────────────────────────────────────────
const recipes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    heroUrl: z.string().url(),
    serves: z.string(),
    prepTime: z.string(),
    cookTime: z.string(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    cuisine: z.string(),
    tags: z.array(z.string()).default([]),
    ingredients: z.array(z.object({
      group: z.string().optional(),
      items: z.array(z.string()),
    })),
    method: z.array(z.string()),
    notes: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { essays, travel, recipes };
