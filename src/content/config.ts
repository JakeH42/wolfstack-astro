import { z, defineCollection } from 'astro:content';

// Define the schema with tags as an array of strings
const projects = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string(),
    featuredImage: z.object({
      src: image().refine((img) => img.width >= 900, {
        message: "Featured image must be at least 900 pixels wide!",
      }),
      alt: z.string(),
    }),
    projectUrl: z.string(),
    tags: z.array(z.string()),
  }),
});

// Export the collections object
export const collections = {
  projects,
};