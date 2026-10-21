// Build-time Open Graph images: /og/<page path>.png for products, key pages, blog posts and tutorials.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { BLOG_CATEGORIES, KB_CATEGORIES } from '../../content.config';
import { STATIC_OG, PRODUCT_OG, ogSvg, type OgEntry } from '../../lib/og';

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  const tutorials = await getCollection('tutorials', (t) => !t.data.draft);
  const kb = await getCollection('kb', (a) => !a.data.draft);
  const entries: OgEntry[] = [
    ...STATIC_OG,
    ...PRODUCT_OG,
    ...posts.map((p) => ({ slug: `blog/${p.id}`, title: p.data.title, subtitle: p.data.description, section: BLOG_CATEGORIES[p.data.category] })),
    ...tutorials.map((t) => ({ slug: `tutorials/${t.id}`, title: t.data.title, subtitle: t.data.description, section: 'Tutorial' })),
    ...kb.map((a) => ({ slug: `knowledgebase/${a.id}`, title: a.data.title, subtitle: a.data.description, section: KB_CATEGORIES[a.data.category].label })),
  ];
  return entries.map((entry) => ({ params: { slug: entry.slug }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await sharp(Buffer.from(ogSvg((props as { entry: OgEntry }).entry))).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
