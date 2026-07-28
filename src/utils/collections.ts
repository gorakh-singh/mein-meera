/**
 * Collection utility helpers for fetching, sorting, and filtering posts.
 */
import { getCollection } from 'astro:content';

type CollectionName = 'essays' | 'travel' | 'recipes';

export interface PostEntry {
  id: string;
  data: {
    title: string;
    description: string;
    date: Date;
    heroUrl: string;
    tags: string[];
    draft: boolean;
    [key: string]: unknown;
  };
  body?: string;
  collection: CollectionName;
}

/**
 * Get all published posts from a single collection, sorted by date descending.
 */
export async function getPublishedPosts(collection: CollectionName): Promise<PostEntry[]> {
  const posts = await getCollection(collection, ({ data }) => !data.draft);
  return posts
    .map((p) => ({ ...p, collection }))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()) as PostEntry[];
}

/**
 * Get all published posts across all collections, sorted by date descending.
 */
export async function getAllPublishedPosts(): Promise<PostEntry[]> {
  const [essays, travel, recipes] = await Promise.all([
    getPublishedPosts('essays'),
    getPublishedPosts('travel'),
    getPublishedPosts('recipes'),
  ]);

  return [...essays, ...travel, ...recipes].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
}

/**
 * Get all unique tags across all collections.
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPublishedPosts();
  const tagSet = new Set<string>();
  allPosts.forEach((post) => {
    post.data.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Find related posts by shared tags, excluding the current post.
 */
export async function getRelatedPosts(
  currentId: string,
  currentCollection: CollectionName,
  tags: string[],
  limit: number = 3
): Promise<PostEntry[]> {
  const allPosts = await getAllPublishedPosts();

  return allPosts
    .filter((post) => !(post.id === currentId && post.collection === currentCollection))
    .map((post) => {
      const sharedTags = post.data.tags.filter((tag) => tags.includes(tag));
      return { ...post, relevance: sharedTags.length };
    })
    .filter((post) => post.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance || b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, limit);
}

/**
 * Get posts for pagination.
 */
export function paginate<T>(items: T[], page: number, pageSize: number = 12) {
  const totalPages = Math.ceil(items.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    currentPage: page,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
