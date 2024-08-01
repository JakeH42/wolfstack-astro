import { getCollection } from 'astro:content';
import { slugify } from '../js/utils';

type TagCount = {
  name: string;
  slug: string;
  count: number;
};

export async function getTagCounts() {
  const projectEntries = await getCollection('projects');
  const tagCounts: Record<string, TagCount> = {};

  projectEntries.forEach(entry => {
    entry.data.tags.forEach(tag => {
      const slugifiedTag = slugify(tag);
      if (!tagCounts[slugifiedTag]) {
        tagCounts[slugifiedTag] = {
          name: tag,
          slug: slugifiedTag,
          count: 0,
        };
      }
      tagCounts[slugifiedTag].count += 1;
    });
  });

  return tagCounts;
}