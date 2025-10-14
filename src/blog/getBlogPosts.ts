import { getCollection, type CollectionEntry } from "astro:content";

export function sortBlogEntries(entries: CollectionEntry<"blog">[]) {
  entries.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

async function getBlogPosts() {
  const allPosts = await getCollection("blog");
  const filteredPosts = allPosts.filter((post) => !post.data.hidden);
  sortBlogEntries(filteredPosts);
  return filteredPosts;
}

export const allBlogPosts = await getBlogPosts();
