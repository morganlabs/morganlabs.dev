import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection as get_collection } from "astro:content";

export async function GET(ctx: APIContext) {
  const posts = (await get_collection("blog")).map(
    ({
      slug,
      data: { title, kicker: description, published: pubDate, tags },
    }) =>
      ({
        title,
        description,
        pubDate,
        tags,
        link: `/blog/${slug}`,
      }) as RSSFeedItem,
  );

  return rss({
    title: "morganlabs' blog",
    description:
      "These blog posts contain a mix of shower thoughts, rambles, computing, and much more. Enjoy!",
    site: ctx.site || "https://morganlabs.dev",
    items: posts,
  });
}
