import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const essays = await getCollection('essays', ({data}: any) => !data.draft);
  const sorted = essays.sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf());
  
  return rss({
    title: 'Mein Meera - Essays',
    description: 'Thoughts, reflections, and notes',
    site: context.site!,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/essays/${post.id}/`,
    })),
  });
}
