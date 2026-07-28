import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const essays = await getCollection('essays', ({data}: any) => !data.draft);
  const travel = await getCollection('travel', ({data}: any) => !data.draft);
  const recipes = await getCollection('recipes', ({data}: any) => !data.draft);
  const all = [...essays.map((p: any)=>({...p, _col:'essays'})), ...travel.map((p: any)=>({...p, _col:'travel'})), ...recipes.map((p: any)=>({...p, _col:'recipes'}))]
    .sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf());
  
  return rss({
    title: 'Mein Meera',
    description: 'Notes from the road, the kitchen, and somewhere in between',
    site: context.site!,
    items: all.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post._col}/${post.id}/`,
    })),
  });
}
