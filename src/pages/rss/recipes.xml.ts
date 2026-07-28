import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const recipes = await getCollection('recipes', ({data}: any) => !data.draft);
  const sorted = recipes.sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf());
  
  return rss({
    title: 'Mein Meera - Recipes',
    description: 'From my kitchen to yours',
    site: context.site!,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/recipes/${post.id}/`,
    })),
  });
}
