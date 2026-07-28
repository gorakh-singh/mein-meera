import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const travel = await getCollection('travel', ({data}: any) => !data.draft);
  const sorted = travel.sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf());
  
  return rss({
    title: 'Mein Meera - Travel',
    description: 'Stories and tips from travels around the world',
    site: context.site!,
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/travel/${post.id}/`,
    })),
  });
}
