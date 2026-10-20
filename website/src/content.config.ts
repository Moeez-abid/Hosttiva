import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Categories from SRS §5 "Blog categories".
export const BLOG_CATEGORIES = {
  'web-hosting': 'Web hosting',
  wordpress: 'WordPress',
  'domains-email': 'Domains and email',
  'cloud-vps': 'Cloud and VPS',
  'apps-pwa': 'PWA and application deployment',
  'ai-automation': 'AI, LLM, RAG, and automation',
  agencies: 'Agency and reseller hosting',
  gaming: 'Game-server hosting',
  'security-backups': 'Security and backups',
  updates: 'Hosttiva and Inventomo updates',
} as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    category: z.enum(Object.keys(BLOG_CATEGORIES) as [keyof typeof BLOG_CATEGORIES, ...(keyof typeof BLOG_CATEGORIES)[]]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Hosttiva team'),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Tutorials (SRS §5): step-by-step guides. Every H2 that starts with "1.", "2." … becomes a HowTo step.
const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tutorials' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** ISO 8601 duration, e.g. PT10M */
    totalTime: z.string().regex(/^PT\d+[HM]$/),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
    requirements: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, tutorials };
