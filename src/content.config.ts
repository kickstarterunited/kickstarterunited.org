// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    // Maybe we'll have a use for these later!
    // description: z.optional(z.string()),
    // author: z.optional(z.string()),
    // image: z.optional(
    //   z.object({
    //     url: z.string(),
    //     alt: z.string()
    //   })
    // ),
    tags: z.array(z.string()),
    hidden: z.optional(z.boolean())
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = { blog };
