import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Collection "blog" — pronta per il futuro blog/news.
 * Basta aggiungere file .md (o .mdx) in `src/content/blog/`.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string(),
      category: z.enum([
        'Judo',
        'Karate',
        'Difesa Personale',
        'Psicomotricità',
        'Galleria',
        'Eventi',
        'Società',
      ]),
      tags: z.array(z.string()).default([]),
      image: image().optional(),
      imageAlt: z.string().default(''),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
